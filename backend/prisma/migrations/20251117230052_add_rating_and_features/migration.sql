-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'SEDAN';
ALTER TYPE "Category" ADD VALUE 'SPORTS';
ALTER TYPE "Category" ADD VALUE 'ELECTRIC';

-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0.0;
