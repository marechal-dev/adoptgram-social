-- CreateEnum
CREATE TYPE "PET_SIZE" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PET_ENERGY_LEVEL" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "ADOPTION_REQUIREMENT_TYPE" AS ENUM ('SPACE', 'MEDICAL');

-- CreateEnum
CREATE TYPE "MEDIA_TYPE" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "common_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "common_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "title" TEXT NOT NULL,
    "representative_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "bio" TEXT,
    "pix_key" TEXT,
    "whatsapp" TEXT NOT NULL,
    "telephone_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localizations" (
    "id" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "cep" TEXT NOT NULL,
    "addressLine" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "localizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "common_user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("common_user_id","organization_id")
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
    "size" "PET_SIZE" NOT NULL,
    "energy_level" "PET_ENERGY_LEVEL" NOT NULL,
    "owner_organization_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirementType" "ADOPTION_REQUIREMENT_TYPE" NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "textContent" TEXT,
    "likes" INTEGER NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "post_Id" TEXT NOT NULL,
    "commenter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "type" "MEDIA_TYPE" NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE UNIQUE INDEX "organizations_cnpj_key" ON "organizations"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "localizations_organizationId_key" ON "localizations"("organizationId");

-- CreateIndex
CREATE INDEX "localization_cep_idx" ON "localizations"("cep");

-- CreateIndex
CREATE INDEX "org_id_fk_idx" ON "pets"("owner_organization_id");

-- CreateIndex
CREATE INDEX "is_castrated_idx" ON "pets"("is_castrated");

-- CreateIndex
CREATE INDEX "adoption_requirement_pet_id_idx" ON "adoption_requirements"("petId");

-- CreateIndex
CREATE INDEX "post_organization_id_idx" ON "posts"("organization_id");

-- CreateIndex
CREATE INDEX "commenter_id_comment_idx" ON "comments"("commenter_id");

-- CreateIndex
CREATE INDEX "comment_post_id_idx" ON "comments"("post_Id");

-- CreateIndex
CREATE INDEX "media_post_id_idx" ON "medias"("post_id");

-- AddForeignKey
ALTER TABLE "localizations" ADD CONSTRAINT "localizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_common_user_id_fkey" FOREIGN KEY ("common_user_id") REFERENCES "common_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_organization_id_fkey" FOREIGN KEY ("owner_organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "common_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
