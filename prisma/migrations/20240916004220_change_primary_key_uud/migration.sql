/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Employer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EmployersOnEmployees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `employerId` on the `EmployersOnEmployees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `employeeId` on the `EmployersOnEmployees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerId` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `Section` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "EmployersOnEmployees" DROP CONSTRAINT "EmployersOnEmployees_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployersOnEmployees" DROP CONSTRAINT "EmployersOnEmployees_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_id_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_id_fkey";

-- DropIndex
DROP INDEX "Employee_uuid_key";

-- DropIndex
DROP INDEX "Employer_uuid_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_pkey",
ADD CONSTRAINT "Employer_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "EmployersOnEmployees" DROP CONSTRAINT "EmployersOnEmployees_pkey",
DROP COLUMN "employerId",
ADD COLUMN     "employerId" UUID NOT NULL,
DROP COLUMN "employeeId",
ADD COLUMN     "employeeId" UUID NOT NULL,
ADD CONSTRAINT "EmployersOnEmployees_pkey" PRIMARY KEY ("employerId", "employeeId");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" UUID NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Section" DROP CONSTRAINT "Section_pkey",
ALTER COLUMN "isActive" DROP NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" UUID NOT NULL,
ADD CONSTRAINT "Section_pkey" PRIMARY KEY ("uuid");

-- AddForeignKey
ALTER TABLE "EmployersOnEmployees" ADD CONSTRAINT "EmployersOnEmployees_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployersOnEmployees" ADD CONSTRAINT "EmployersOnEmployees_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Employee"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
