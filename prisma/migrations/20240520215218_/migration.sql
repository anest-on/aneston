-- CreateEnum
CREATE TYPE "AppointmentStatusEnum" AS ENUM ('DONE', 'UNDONE', 'CANCELED');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "appointment_status" "AppointmentStatusEnum" NOT NULL DEFAULT 'UNDONE';
