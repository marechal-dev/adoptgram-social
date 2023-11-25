/*
  Warnings:

  - Made the column `textContent` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "textContent" SET NOT NULL;

-- CreateIndex
CREATE INDEX "follow_common_user_id_idx" ON "follows"("common_user_id");

-- CreateIndex
CREATE INDEX "follow_organization_id_idx" ON "follows"("organization_id");
