/*
  Warnings:

  - Added the required column `address` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `state` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CITY" AS ENUM ('RG', 'PEL');

-- CreateEnum
CREATE TYPE "STATE" AS ENUM ('RS');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" "CITY" NOT NULL,
DROP COLUMN "state",
ADD COLUMN     "state" "STATE" NOT NULL;
