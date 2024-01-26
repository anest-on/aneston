/*
  Warnings:

  - You are about to alter the column `access_type` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `access_type` VARCHAR(191) NULL;
