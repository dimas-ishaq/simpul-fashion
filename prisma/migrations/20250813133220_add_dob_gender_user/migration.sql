-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "gender" "public"."Gender";
