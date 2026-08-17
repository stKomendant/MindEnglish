/*
  Warnings:

  - Added the required column `verificationTokin` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `virificationTokenExpiresAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verificationTokin" TEXT NOT NULL,
ADD COLUMN     "virificationTokenExpiresAt" TIMESTAMP(3) NOT NULL;
