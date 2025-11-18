/*
  Warnings:

  - Added the required column `pickupLocation` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnLocation` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnTime` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "pickupLocation" TEXT NOT NULL,
ADD COLUMN     "pickupTime" TEXT NOT NULL,
ADD COLUMN     "returnLocation" TEXT NOT NULL,
ADD COLUMN     "returnTime" TEXT NOT NULL;
