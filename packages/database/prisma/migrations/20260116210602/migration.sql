/*
  Warnings:

  - You are about to drop the column `businessId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_businessId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "businessId";

-- CreateTable
CREATE TABLE "_BusinessToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BusinessToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusinessToService_B_index" ON "_BusinessToService"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToService" ADD CONSTRAINT "_BusinessToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToService" ADD CONSTRAINT "_BusinessToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
