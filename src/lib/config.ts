// API Configuration - uses environment variables
// In development: VITE_API_URL=http://localhost:3000
// In production: Set your production URL

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const ENVIRONMENT = import.meta.env.MODE || 'development';

export const isDevelopment = ENVIRONMENT === 'development';
export const isProduction = ENVIRONMENT === 'production';
