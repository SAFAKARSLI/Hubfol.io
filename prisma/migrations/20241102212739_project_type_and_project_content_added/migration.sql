/*
  Warnings:

  - You are about to drop the column `url` on the `Project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PROJECT_CONTENT_TYPE" AS ENUM ('URL', 'FILE');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "url",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "type" "PROJECT_CONTENT_TYPE" NOT NULL DEFAULT 'URL';
