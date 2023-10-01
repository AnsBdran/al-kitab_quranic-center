/*
  Warnings:

  - You are about to drop the column `id_` on the `Student` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "id_",
ADD COLUMN     "student_id" TEXT NOT NULL;
