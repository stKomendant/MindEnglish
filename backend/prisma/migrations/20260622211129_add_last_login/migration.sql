-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastLogin" TIMESTAMP(3),
ALTER COLUMN "verificationToken" DROP NOT NULL,
ALTER COLUMN "verificationTokenExpiresAt" DROP NOT NULL;
