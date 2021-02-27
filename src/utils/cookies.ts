import { parse, serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const TOKEN_NAME = 'magic-auth-token';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setTokenCookie<T>(response: NextApiResponse<T>, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  response.setHeader('Set-Cookie', cookie);
}

function removeTokenCookie<T>(response: NextApiResponse<T>) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  response.setHeader('Set-Cookie', cookie);
}

function parseCookies(request: NextApiRequest) {
  if (request.cookies) {
    return request.cookies;
  }

  const cookie = request.headers?.cookie;
  return parse(cookie || '');
}

function getTokenCookie(request: NextApiRequest) {
  const cookies = parseCookies(request);
  return cookies[TOKEN_NAME];
}

export { getTokenCookie, removeTokenCookie, setTokenCookie };
