import dotenv from 'dotenv';
import { SERVER_CONFIG, JWT_CONFIG } from './constants';

dotenv.config();

export const serverConfig = {
  port: parseInt(process.env.PORT || SERVER_CONFIG.DEFAULT_PORT.toString(), 10),
  nodeEnv: process.env.NODE_ENV || SERVER_CONFIG.DEFAULT_NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL || SERVER_CONFIG.DEFAULT_FRONTEND_URL,
} as const;

export const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: (process.env.JWT_EXPIRES_IN || JWT_CONFIG.DEFAULT_EXPIRES_IN) as string,
} as const;

export const dbConfig = {
  url: process.env.DATABASE_URL,
} as const;

export const validateConfig = (): void => {
  const missingVars: string[] = [];

  if (!jwtConfig.secret) {
    missingVars.push('JWT_SECRET');
  }

  if (!dbConfig.url) {
    missingVars.push('DATABASE_URL');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};
