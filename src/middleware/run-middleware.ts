import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NextFunction = (error?: any) => void;

type Middleware = (
  request: NextApiRequest,
  response: NextApiResponse,
  next: NextFunction,
) => void;

const runMiddleware = (
  request: NextApiRequest,
  response: NextApiResponse,
  middleware: Middleware,
) =>
  new Promise((resolve, reject) => {
    middleware(request, response, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

export default runMiddleware;
