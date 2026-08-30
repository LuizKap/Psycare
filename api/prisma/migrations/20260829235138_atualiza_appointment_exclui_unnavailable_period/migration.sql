/*
  Warnings:

  - You are about to drop the column `source` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `UnavailablePeriod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `psychologist_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UnavailablePeriod" DROP CONSTRAINT "UnavailablePeriod_psychologist_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "source",
ADD COLUMN     "psychologist_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
DROP COLUMN "phone",
ALTER COLUMN "user_id" SET NOT NULL;

-- DropTable
DROP TABLE "UnavailablePeriod";

-- DropEnum
DROP TYPE "AppointmentSource";

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
