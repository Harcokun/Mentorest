/*
  Warnings:

  - You are about to drop the `PaymentImg` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date_booking` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_img` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_booking` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PaymentImg` DROP FOREIGN KEY `PaymentImg_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `date_booking` VARCHAR(191) NOT NULL,
    ADD COLUMN `payment_img` VARCHAR(191) NOT NULL,
    ADD COLUMN `time_booking` VARCHAR(191) NOT NULL,
    MODIFY `url_conferrence` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `PaymentImg`;
