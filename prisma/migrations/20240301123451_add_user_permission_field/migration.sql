-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;
