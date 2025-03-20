/*
  Warnings:

  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE', 'SUITE');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "roomtype" "RoomType" NOT NULL DEFAULT 'SINGLE';
