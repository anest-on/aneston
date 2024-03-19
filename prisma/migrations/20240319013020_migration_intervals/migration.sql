/*
  Warnings:

  - Added the required column `updated_at` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "daytime_intervals" (
    "id" TEXT NOT NULL,
    "time_start_interval_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "interval_id" TEXT NOT NULL,

    CONSTRAINT "daytime_intervals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "daytime_intervals_interval_id_idx" ON "daytime_intervals"("interval_id");
