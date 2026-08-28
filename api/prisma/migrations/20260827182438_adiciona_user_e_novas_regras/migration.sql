/*
  Warnings:

  - You are about to drop the column `password` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Psychologist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Psychologist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Psychologist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Psychologist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentSource" AS ENUM ('WEBSITE', 'MANUAL');

-- DropIndex
DROP INDEX "Patient_email_key";

-- DropIndex
DROP INDEX "Psychologist_email_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "source" "AppointmentSource" NOT NULL DEFAULT 'WEBSITE',
ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "password",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Psychologist" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Psychologist_user_id_key" ON "Psychologist"("user_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Psychologist" ADD CONSTRAINT "Psychologist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
