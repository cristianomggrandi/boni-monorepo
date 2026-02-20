/*
  Warnings:

  - You are about to drop the `FavoriteBusiness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteBusiness" DROP CONSTRAINT "FavoriteBusiness_businessId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteBusiness" DROP CONSTRAINT "FavoriteBusiness_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteService" DROP CONSTRAINT "FavoriteService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteService" DROP CONSTRAINT "FavoriteService_userId_fkey";

-- DropTable
DROP TABLE "FavoriteBusiness";

-- DropTable
DROP TABLE "FavoriteService";

-- CreateTable
CREATE TABLE "_BusinessToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BusinessToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ServiceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ServiceToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusinessToUser_B_index" ON "_BusinessToUser"("B");

-- CreateIndex
CREATE INDEX "_ServiceToUser_B_index" ON "_ServiceToUser"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToUser" ADD CONSTRAINT "_ServiceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToUser" ADD CONSTRAINT "_ServiceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
