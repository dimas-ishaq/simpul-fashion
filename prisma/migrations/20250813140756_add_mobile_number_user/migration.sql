/*
  Warnings:

  - A unique constraint covering the columns `[mobile_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "mobile_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_number_key" ON "public"."User"("mobile_number");
