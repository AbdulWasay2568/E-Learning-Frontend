/*
  Warnings:

  - Added the required column `description` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Lecture" ADD COLUMN     "description" TEXT NOT NULL;
