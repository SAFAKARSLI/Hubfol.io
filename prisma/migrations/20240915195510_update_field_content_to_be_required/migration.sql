/*
  Warnings:

  - Made the column `content` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "content" SET NOT NULL;
