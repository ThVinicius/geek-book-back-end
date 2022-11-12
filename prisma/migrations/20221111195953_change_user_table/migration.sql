-- CreateEnum
CREATE TYPE "OAuthType" AS ENUM ('EMAIL', 'GITHUB');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authorizeType" "OAuthType" NOT NULL DEFAULT 'EMAIL',
ALTER COLUMN "password" DROP NOT NULL;
