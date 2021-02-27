import { MagicAdminSDKError } from '@magic-sdk/admin/dist/core/sdk-exceptions';
import type { NextApiHandler } from 'next';
import { setTokenCookie } from 'utils/cookies';
import magic from 'utils/magic';
import { encryptSession } from 'utils/sessions';
import type { ApiErrorResponse } from 'utils/types';

type SuccessResponse = {
  done: true;
};

type LoginHandlerResponse = ApiErrorResponse | SuccessResponse;

const loginHandler: NextApiHandler<LoginHandlerResponse> = async (
  request,
  response,
) => {
  try {
    if (request.method === 'GET') {
      const authHeaders = request.headers.authorization;

      if (authHeaders) {
        const didToken = magic.utils.parseAuthorizationHeader(authHeaders);
        const metadata = await magic.users.getMetadataByToken(didToken);
        const session = { ...metadata };
        const token = await encryptSession(session);
        setTokenCookie(response, token);
        return response.status(200).json({ done: true });
      }

      return response
        .status(400)
        .json({ message: 'No token found in request.' });
    }

    const message = 'This endpoint only supports the GET method.';
    return response.status(405).json({ message });
  } catch (error) {
    if (error instanceof MagicAdminSDKError) {
      if (error.message.includes('`Bearer {token}`')) {
        const message =
          "Malformed authorization header. It should be: 'Bearer ${token}'.";
        return response.status(400).json({ message });
      }

      if (error.message.includes('malformed')) {
        const message = 'Malformed token. Please include a valid DID token.';
        return response.status(400).json({ message });
      }

      if (error?.data[0]?.message?.includes('not authorized')) {
        return response.status(401).json({ message: 'Not authorized' });
      }
    }

    return response.status(error.code || 500).json({ message: error.message });
  }
};

export default loginHandler;
