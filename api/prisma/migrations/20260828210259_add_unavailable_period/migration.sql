/*
  Warnings:

  - The values [CANCELLED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('SCHEDULED', 'COMPLETED', 'IN_PROGRESS');
ALTER TABLE "public"."Appointment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Appointment" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "public"."AppointmentStatus_old";
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- CreateTable
CREATE TABLE "UnavailablePeriod" (
    "id" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "psychologist_id" TEXT NOT NULL,

    CONSTRAINT "UnavailablePeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnavailablePeriod" ADD CONSTRAINT "UnavailablePeriod_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
