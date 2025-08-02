import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token from NextAuth session
apiClient.interceptors.request.use(
  async config => {
    if (typeof window !== 'undefined') {
      const session = (await getSession()) as Session | null;
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired or invalid - NextAuth will handle the redirect
      if (typeof window !== 'undefined') {
        const { signOut } = await import('next-auth/react');
        await signOut({ redirect: true, callbackUrl: '/auth/login' });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
