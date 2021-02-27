import { asyncPipe } from './async-pipe';

type RequestArguments = {
  body?: Record<string, unknown>;
  method?: string;
  route: string;
  token?: string;
};

const liftedFetch = async ({
  body,
  method = 'GET',
  route,
  token,
}: RequestArguments) =>
  await fetch(route, {
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    method,
  });

const toJson = async (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    const json = await response.json();
    return json;
  } catch {
    return {
      context: `Nothing parsed in toJson. The response's type was: ${response.type}.`,
    };
  }
};

/**
 * @returns JSON of request if the response is ok, otherwise it throws.
 */
const request = asyncPipe(liftedFetch, toJson);

export default request;
