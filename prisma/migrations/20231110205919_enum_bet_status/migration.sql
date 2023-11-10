/*
  Warnings:

  - The `status` column on the `bets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('PENDING', 'LOST', 'WON');

-- AlterTable
ALTER TABLE "bets" DROP COLUMN "status",
ADD COLUMN     "status" "BetStatus" NOT NULL DEFAULT 'PENDING';
