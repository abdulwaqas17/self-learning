-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `connect_me_for` VARCHAR(191) NULL,
    `profile_pic_key` VARCHAR(191) NULL,
    `profile_pic_url` VARCHAR(191) NULL,
    `company_logo_key` VARCHAR(191) NULL,
    `company_logo_url` VARCHAR(191) NULL,
    `profile_completed` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
