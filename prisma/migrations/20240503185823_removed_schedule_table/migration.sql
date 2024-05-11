/*
  Warnings:

  - Added the required column `schedule_date` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "schedule_date" TEXT NOT NULL;
