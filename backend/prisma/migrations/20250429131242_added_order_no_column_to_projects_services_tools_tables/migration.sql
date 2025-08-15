/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "createdAt",
ADD COLUMN     "orderNo" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "orderNo" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "orderNo" SERIAL NOT NULL;
