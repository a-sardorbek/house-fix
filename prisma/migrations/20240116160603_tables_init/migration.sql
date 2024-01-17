-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('silver', 'gold', 'platinium');

-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('client', 'customer', 'guest');

-- CreateEnum
CREATE TYPE "house_type" AS ENUM ('rent', 'sale', 'none');

-- CreateEnum
CREATE TYPE "entity_status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),
    "status" "user_status" NOT NULL DEFAULT 'silver',
    "type" "user_type" NOT NULL DEFAULT 'guest',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "location" JSONB DEFAULT '{}',
    "status" "entity_status" NOT NULL DEFAULT 'inactive',
    "type" "house_type" NOT NULL DEFAULT 'none',
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "house_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_file" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "logo" VARCHAR NOT NULL,
    "house_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "resource_file_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- AddForeignKey
ALTER TABLE "house" ADD CONSTRAINT "house_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_file" ADD CONSTRAINT "resource_file_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
