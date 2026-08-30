/*
  Warnings:

  - A unique constraint covering the columns `[starts_at]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_starts_at_key" ON "Appointment"("starts_at");
