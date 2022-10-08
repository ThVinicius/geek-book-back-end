/*
  Warnings:

  - A unique constraint covering the columns `[userId,userCollectionId]` on the table `rankings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "rankings_userId_userCollectionId_position_key";

-- CreateIndex
CREATE UNIQUE INDEX "rankings_userId_userCollectionId_key" ON "rankings"("userId", "userCollectionId");
