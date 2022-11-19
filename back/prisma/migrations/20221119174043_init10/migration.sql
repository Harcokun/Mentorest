/*
  Warnings:

  - You are about to drop the column `amount_payment` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `id_mentee` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `is_canceled` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `payment_done` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `id_mentor` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_img` to the `PaymentImg` table without a default value. This is not possible if the table is not empty.
  - Made the column `bookingId` on table `PaymentImg` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_id_mentee_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentImg` DROP FOREIGN KEY `PaymentImg_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `amount_payment`,
    DROP COLUMN `id_mentee`,
    DROP COLUMN `is_canceled`,
    DROP COLUMN `payment_done`,
    ADD COLUMN `id_mentor` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PaymentImg` ADD COLUMN `payment_img` VARCHAR(191) NOT NULL,
    MODIFY `bookingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_id_mentor_fkey` FOREIGN KEY (`id_mentor`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentImg` ADD CONSTRAINT `PaymentImg_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
