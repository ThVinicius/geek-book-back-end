/*
  Warnings:

  - A unique constraint covering the columns `[name,categoryId]` on the table `collections` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "collections_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "collections_name_categoryId_key" ON "collections"("name", "categoryId");
