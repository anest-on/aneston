-- CreateTable
CREATE TABLE `user_time_intervals` (
    `id` VARCHAR(191) NOT NULL,
    `week_day` INTEGER NOT NULL,
    `time_start_in_minutes` INTEGER NOT NULL,
    `time_end_in_minutes` INTEGER NOT NULL,
    `appointment_time` INTEGER NOT NULL,
    `interval_times` JSON NULL,
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `user_time_intervals_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_time_intervals` ADD CONSTRAINT `user_time_intervals_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
