/*
  Warnings:

  - You are about to drop the column `englishLevel` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_courseId_englishLevel_order_key";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "englishLevel";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_courseId_order_key" ON "Lesson"("courseId", "order");
