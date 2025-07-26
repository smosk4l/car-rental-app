import { PrismaClient } from '@prisma/client';
import { serverConfig } from '../config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (serverConfig.nodeEnv !== 'production') globalForPrisma.prisma = prisma;
