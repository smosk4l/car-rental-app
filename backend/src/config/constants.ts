export const SERVER_CONFIG = {
  DEFAULT_PORT: 5001,
  DEFAULT_NODE_ENV: 'development',
  DEFAULT_FRONTEND_URL: 'http://localhost:3000',
} as const;

export const JWT_CONFIG = {
  DEFAULT_EXPIRES_IN: '7d',
} as const;

export const DB_CONFIG = {
  DEFAULT_CONNECTION_STRING:
    'postgresql://postgres:password@localhost:5433/car_rental_db?schema=public',
} as const;
