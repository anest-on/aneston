/*
  Warnings:

  - You are about to drop the `ThirdPartyUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `access_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `access_type` ENUM('OWNER', 'FULL_ACCESS', 'DASHBOARD_ACCESS') NOT NULL,
    ADD COLUMN `confirm_password` VARCHAR(191) NULL,
    ADD COLUMN `doctorId` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ThirdPartyUser`;
