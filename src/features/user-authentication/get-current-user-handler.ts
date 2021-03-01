import type { NextApiHandler } from 'next';
import { getSession } from 'utils/sessions';
import type { ApiErrorResponse } from 'utils/types';

import { UserSession } from './types';

type SuccessResponse = {
  user: UserSession | null;
};

type GetCurrentUserHandlerResponse = ApiErrorResponse | SuccessResponse;

const getCurrentUserHandler: NextApiHandler<GetCurrentUserHandlerResponse> = async (
  request,
  response,
) => {
  if (request.method === 'GET') {
    const session = await getSession(request);
    // eslint-disable-next-line unicorn/no-null
    return response.status(200).json({ user: session || null });
  }

  const message = 'This endpoint only supports the GET method.';
  return response.status(405).json({ message });
};

export default getCurrentUserHandler;
