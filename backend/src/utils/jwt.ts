import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  if (!jwtConfig.secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return (jwt as any).sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  if (!jwtConfig.secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return (jwt as any).verify(token, jwtConfig.secret) as JwtPayload;
};
