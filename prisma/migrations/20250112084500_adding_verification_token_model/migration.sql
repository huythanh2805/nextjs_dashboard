-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "exprire" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_email_key" ON "VerificationToken"("token", "email");
