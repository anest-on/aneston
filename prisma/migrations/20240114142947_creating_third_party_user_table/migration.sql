-- CreateTable
CREATE TABLE `ThirdPartyUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `position` ENUM('FULL_ACCESS', 'DASHBOARD_ACCESS') NOT NULL DEFAULT 'DASHBOARD_ACCESS',
    `doctor_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ThirdPartyUser_email_key`(`email`),
    INDEX `ThirdPartyUser_doctor_id_idx`(`doctor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
