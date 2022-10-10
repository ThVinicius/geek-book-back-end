-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_userCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_userCollectionId_fkey" FOREIGN KEY ("userCollectionId") REFERENCES "userCollections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
