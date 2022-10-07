-- CreateTable
CREATE TABLE "shares" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shortUrl" VARCHAR(9) NOT NULL,

    CONSTRAINT "shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shares_shortUrl_key" ON "shares"("shortUrl");

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
