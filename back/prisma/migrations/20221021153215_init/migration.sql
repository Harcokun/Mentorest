/*
  Warnings:

  - You are about to drop the column `bookbankImage` on the `Mentee` table. All the data in the column will be lost.
  - Added the required column `bookbank_image` to the `Mentee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookbank_number` to the `Mentee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone_number` to the `Mentee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mentee` DROP COLUMN `bookbankImage`,
    ADD COLUMN `bookbank_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `bookbank_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `telephone_number` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PaymentImg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentImg` ADD CONSTRAINT `PaymentImg_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
