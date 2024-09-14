/*
  Warnings:

  - You are about to drop the column `hourly_rate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `icon_link` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "hourly_rate",
DROP COLUMN "phone_number",
ADD COLUMN     "hourlyRate" DOUBLE PRECISION,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "phone_number",
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "icon_link",
ADD COLUMN     "iconLink" TEXT;
