/*
  Warnings:

  - You are about to drop the `userHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userHistory" DROP CONSTRAINT "userHistory_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "userHistory" DROP CONSTRAINT "userHistory_userId_fkey";

-- DropTable
DROP TABLE "userHistory";

-- CreateTable
CREATE TABLE "userCollections" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "lastSeen" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userCollections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userCollections_userId_collectionId_key" ON "userCollections"("userId", "collectionId");

-- AddForeignKey
ALTER TABLE "userCollections" ADD CONSTRAINT "userCollections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCollections" ADD CONSTRAINT "userCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
