/*
  Warnings:

  - You are about to drop the column `doctorId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `doctorId`,
    ADD COLUMN `doctor_id` VARCHAR(191) NULL;
