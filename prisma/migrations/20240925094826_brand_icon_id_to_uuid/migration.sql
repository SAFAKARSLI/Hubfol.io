/*
  Warnings:

  - The primary key for the `BrandIcons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BrandIcons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BrandIcons" DROP CONSTRAINT "BrandIcons_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BrandIcons_pkey" PRIMARY KEY ("uuid");
