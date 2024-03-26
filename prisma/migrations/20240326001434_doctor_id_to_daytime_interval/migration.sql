/*
  Warnings:

  - You are about to drop the column `interval_times` on the `user_time_intervals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "daytime_intervals" ADD COLUMN     "doctor_id" TEXT;

-- AlterTable
ALTER TABLE "user_time_intervals" DROP COLUMN "interval_times";
