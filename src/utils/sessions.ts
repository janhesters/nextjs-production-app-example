import Iron from '@hapi/iron';
import { UserSession } from 'features/user-authentication/types';
import type { NextApiRequest } from 'next';

import { getTokenCookie } from './cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

function encryptSession(session: Record<string, unknown>) {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

function getSession(request: NextApiRequest): '' | Promise<UserSession> {
  const token = getTokenCookie(request);
  return token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}

export { encryptSession, getSession };
