/*
  Warnings:

  - The `status` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "status",
ADD COLUMN     "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT';

-- DropEnum
DROP TYPE "STATUS";
