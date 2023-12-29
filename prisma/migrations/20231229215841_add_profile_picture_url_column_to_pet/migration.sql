/*
  Warnings:

  - Added the required column `profile_picture_url` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "profile_picture_url" TEXT NOT NULL;
