/*
  Warnings:

  - You are about to drop the `adoption_requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adoption_requirements" DROP CONSTRAINT "adoption_requirements_petId_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "likes" SET DEFAULT 0;

-- DropTable
DROP TABLE "adoption_requirements";
