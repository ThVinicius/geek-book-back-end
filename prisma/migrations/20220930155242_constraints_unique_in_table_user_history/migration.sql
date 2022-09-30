/*
  Warnings:

  - A unique constraint covering the columns `[userId,collectionId]` on the table `userHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userHistory_userId_collectionId_key" ON "userHistory"("userId", "collectionId");
