/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hotelId,id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Room_hotelId_roomNumber_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomNumber";

-- CreateIndex
CREATE UNIQUE INDEX "Room_hotelId_id_key" ON "Room"("hotelId", "id");
