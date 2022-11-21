/*
  Warnings:

  - You are about to drop the `Mentee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_id_mentee_fkey`;

-- DropTable
DROP TABLE `Mentee`;

-- CreateTable
CREATE TABLE `Mentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NOT NULL,
    `profile_description` VARCHAR(191) NOT NULL,
    `bookbank_image` VARCHAR(191) NOT NULL,
    `citizenId` VARCHAR(191) NOT NULL,
    `citizen_image` VARCHAR(191) NOT NULL,
    `telephone_number` VARCHAR(191) NOT NULL,
    `bookbank_number` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `price_rate` INTEGER NOT NULL DEFAULT 250,
    `date_time_booking` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_id_mentee_fkey` FOREIGN KEY (`id_mentee`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
