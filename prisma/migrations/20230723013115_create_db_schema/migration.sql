-- CreateEnum
CREATE TYPE "pet_size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "pet_energy_level" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "adoption_requirement_type" AS ENUM ('SPACE', 'MEDICAL');

-- CreateEnum
CREATE TYPE "media_type" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "common_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "first_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "common_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "title" TEXT NOT NULL,
    "representative_name" TEXT NOT NULL,
    "bio" TEXT,
    "pix_key" TEXT,
    "whatsapp" TEXT NOT NULL,
    "residential_number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "is_castrated" BOOLEAN NOT NULL,
    "require_medical_attention" BOOLEAN NOT NULL,
    "is_vaccinated" BOOLEAN NOT NULL,
    "size" "pet_size" NOT NULL,
    "energy_level" "pet_energy_level" NOT NULL,
    "organization_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "textContent" TEXT,
    "likes" INTEGER NOT NULL,
    "organization_profile_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "post_Id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "common_user_profile_id" TEXT NOT NULL,
    "organization_profile_id" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("common_user_profile_id","organization_profile_id")
);

-- CreateTable
CREATE TABLE "organizations_addresses" (
    "id" TEXT NOT NULL,
    "first_line" TEXT NOT NULL,
    "second_line" TEXT,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "organizations_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "requirementType" "adoption_requirement_type" NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "type" "media_type" NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "common_users_username_key" ON "common_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "common_users_email_key" ON "common_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "common_users_cpf_key" ON "common_users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_username_key" ON "organizations"("username");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE INDEX "org_id_fk_idx" ON "pets"("organization_id");

-- CreateIndex
CREATE INDEX "is_castrated_idx" ON "pets"("is_castrated");

-- CreateIndex
CREATE INDEX "post_org_id_idx" ON "posts"("organization_profile_id");

-- CreateIndex
CREATE INDEX "comment_post_id_idx" ON "comments"("post_Id");

-- CreateIndex
CREATE INDEX "follow_common_user_profile_idx" ON "follows"("common_user_profile_id");

-- CreateIndex
CREATE INDEX "follow_organization_profile_idx" ON "follows"("organization_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_addresses_organization_id_key" ON "organizations_addresses"("organization_id");

-- CreateIndex
CREATE INDEX "address_org_id_idx" ON "organizations_addresses"("organization_id");

-- CreateIndex
CREATE INDEX "address_cep_idx" ON "organizations_addresses" USING HASH ("cep");

-- CreateIndex
CREATE INDEX "adoption_requirements_pet_id_idx" ON "adoption_requirements"("pet_id");

-- CreateIndex
CREATE INDEX "media_post_id_idx" ON "medias"("post_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_organization_profile_id_fkey" FOREIGN KEY ("organization_profile_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_common_user_profile_id_fkey" FOREIGN KEY ("common_user_profile_id") REFERENCES "common_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_organization_profile_id_fkey" FOREIGN KEY ("organization_profile_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_addresses" ADD CONSTRAINT "organizations_addresses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
