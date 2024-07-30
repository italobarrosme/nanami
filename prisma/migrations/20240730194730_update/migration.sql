/*
  Warnings:

  - Added the required column `toBenefit` to the `networks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toServe` to the `networks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "networks" ADD COLUMN     "emails" TEXT[],
ADD COLUMN     "numberContacts" TEXT[],
ADD COLUMN     "toBenefit" TEXT NOT NULL,
ADD COLUMN     "toServe" TEXT NOT NULL;
