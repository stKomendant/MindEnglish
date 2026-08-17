/*
  Warnings:

  - You are about to drop the column `verificationTokin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `virificationTokenExpiresAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `verificationToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationTokenExpiresAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verificationTokin",
DROP COLUMN "virificationTokenExpiresAt",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3) NOT NULL;
