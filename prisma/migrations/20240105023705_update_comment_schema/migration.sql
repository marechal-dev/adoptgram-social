/*
  Warnings:

  - You are about to drop the column `commenter_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comments` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_commenter_id_fkey";

-- DropIndex
DROP INDEX "commenter_id_comment_idx";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "commenter_id",
DROP COLUMN "updatedAt",
ADD COLUMN     "creator_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "commenter_id_comment_idx" ON "comments"("creator_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "common_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
