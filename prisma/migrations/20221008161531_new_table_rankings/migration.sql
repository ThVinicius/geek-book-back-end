-- CreateTable
CREATE TABLE "rankings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userCollectionId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rankings_userId_userCollectionId_position_key" ON "rankings"("userId", "userCollectionId", "position");

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_userCollectionId_fkey" FOREIGN KEY ("userCollectionId") REFERENCES "userCollections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
