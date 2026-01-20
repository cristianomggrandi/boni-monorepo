/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessToService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceGroupId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToCategory" DROP CONSTRAINT "_BusinessToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToCategory" DROP CONSTRAINT "_BusinessToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToService" DROP CONSTRAINT "_BusinessToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToService" DROP CONSTRAINT "_BusinessToService_B_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "categoryId",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "serviceGroupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_BusinessToCategory";

-- DropTable
DROP TABLE "_BusinessToService";

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "businessId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessToBusinessCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BusinessToBusinessCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_name_key" ON "BusinessCategory"("name");

-- CreateIndex
CREATE INDEX "_BusinessToBusinessCategory_B_index" ON "_BusinessToBusinessCategory"("B");

-- AddForeignKey
ALTER TABLE "BusinessCategory" ADD CONSTRAINT "BusinessCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BusinessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceGroup" ADD CONSTRAINT "ServiceGroup_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceGroupId_fkey" FOREIGN KEY ("serviceGroupId") REFERENCES "ServiceGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToBusinessCategory" ADD CONSTRAINT "_BusinessToBusinessCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToBusinessCategory" ADD CONSTRAINT "_BusinessToBusinessCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "BusinessCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
