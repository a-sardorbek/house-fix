/*
  Warnings:

  - The values [silver,gold,platinium] on the enum `user_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [customer] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `house` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resource_file` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "work_status" AS ENUM ('new', 'confirmed', 'finished');

-- CreateEnum
CREATE TYPE "billing_type" AS ENUM ('UZCARD', 'HUMO', 'MASTERCARD', 'VISA');

-- AlterEnum
BEGIN;
CREATE TYPE "user_status_new" AS ENUM ('active', 'inactive');
ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "status" TYPE "user_status_new" USING ("status"::text::"user_status_new");
ALTER TYPE "user_status" RENAME TO "user_status_old";
ALTER TYPE "user_status_new" RENAME TO "user_status";
DROP TYPE "user_status_old";
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'inactive';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('client', 'worker', 'guest');
ALTER TABLE "user" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "type" TYPE "user_type_new" USING ("type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT 'guest';
COMMIT;

-- DropForeignKey
ALTER TABLE "house" DROP CONSTRAINT "house_user_id_fkey";

-- DropForeignKey
ALTER TABLE "resource_file" DROP CONSTRAINT "resource_file_house_id_fkey";

-- DropIndex
DROP INDEX "user_user_name_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'inactive';

-- DropTable
DROP TABLE "house";

-- DropTable
DROP TABLE "resource_file";

-- DropEnum
DROP TYPE "entity_status";

-- DropEnum
DROP TYPE "house_type";

-- CreateTable
CREATE TABLE "work" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "status" "work_status" NOT NULL DEFAULT 'new',
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "type" "billing_type" NOT NULL,
    "user_id" UUID NOT NULL,
    "work_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work" ADD CONSTRAINT "work_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
