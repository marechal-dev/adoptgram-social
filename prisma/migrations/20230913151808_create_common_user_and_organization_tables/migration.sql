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
