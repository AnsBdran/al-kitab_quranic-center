/*
  Warnings:

  - A unique constraint covering the columns `[attendance_date,student_id]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_attendance_date_student_id_key" ON "Attendance"("attendance_date", "student_id");
