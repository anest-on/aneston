/*
  Warnings:

  - You are about to drop the column `position` on the `ThirdPartyUser` table. All the data in the column will be lost.
  - Added the required column `password_confirmation` to the `ThirdPartyUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ThirdPartyUser` DROP COLUMN `position`,
    ADD COLUMN `access_type` ENUM('FULL_ACCESS', 'DASHBOARD_ACCESS') NOT NULL DEFAULT 'DASHBOARD_ACCESS',
    ADD COLUMN `password_confirmation` VARCHAR(191) NOT NULL;
