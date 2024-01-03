-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_time_intervals` DROP FOREIGN KEY `user_time_intervals_user_id_fkey`;

-- RenameIndex
ALTER TABLE `Account` RENAME INDEX `Account_user_id_fkey` TO `Account_user_id_idx`;

-- RenameIndex
ALTER TABLE `Session` RENAME INDEX `Session_user_id_fkey` TO `Session_user_id_idx`;
