/*
  Warnings:

  - You are about to drop the column `psychologist_id` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_psychologist_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "psychologist_id";
