/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "type" DROP DEFAULT;

-- DropTable
DROP TABLE "Bookmark";

-- CreateTable
CREATE TABLE "BookMark" (
    "id" SERIAL NOT NULL,
    "createdAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "BookMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnBookMarks" (
    "bookmarkId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnBookMarks_pkey" PRIMARY KEY ("bookmarkId","categoryId")
);

-- CreateIndex
CREATE INDEX "CategoriesOnBookMarks_bookmarkId_idx" ON "CategoriesOnBookMarks"("bookmarkId");

-- CreateIndex
CREATE INDEX "CategoriesOnBookMarks_categoryId_idx" ON "CategoriesOnBookMarks"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoriesOnBookMarks" ADD CONSTRAINT "CategoriesOnBookMarks_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnBookMarks" ADD CONSTRAINT "CategoriesOnBookMarks_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "BookMark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
