import { CookieOptions } from 'express';

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite:
    process.env.NODE_ENV === 'production' ? 'none' : ('strict' as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite:
    process.env.NODE_ENV === 'production' ? 'none' : ('strict' as const),
  maxAge: 10 * 60 * 1000,
  path: '/',
};
