-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resetPasswordExpireAt" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
