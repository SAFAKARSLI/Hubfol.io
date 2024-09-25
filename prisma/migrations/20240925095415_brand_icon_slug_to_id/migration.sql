/*
  Warnings:

  - The primary key for the `BrandIcons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `BrandIcons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `BrandIcons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BrandIcons_uuid_key";

-- AlterTable
ALTER TABLE "BrandIcons" DROP CONSTRAINT "BrandIcons_pkey",
DROP COLUMN "uuid",
ADD CONSTRAINT "BrandIcons_pkey" PRIMARY KEY ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BrandIcons_slug_key" ON "BrandIcons"("slug");
