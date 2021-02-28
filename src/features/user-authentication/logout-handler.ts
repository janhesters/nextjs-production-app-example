import type { NextApiHandler } from 'next';
import { removeTokenCookie } from 'utils/cookies';
import magic from 'utils/magic';
import { getSession } from 'utils/sessions';

const logoutHandler: NextApiHandler = async (request, response) => {
  const session = await getSession(request);

  if (session) {
    await magic.users.logoutByIssuer(session.issuer);
  }

  removeTokenCookie(response);
  response.writeHead(302, { Location: '/' });
  response.end();
};

export default logoutHandler;
