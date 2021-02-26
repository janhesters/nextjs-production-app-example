import Cors from 'cors';
import express, { RequestHandler } from 'express';
import { NextApiHandler } from 'next';
import request from 'supertest';

import runMiddleware from './run-middleware';

const PATH = '/middleware-test';
const app = express();

const cors = Cors();

const handler: NextApiHandler = async (request, response) => {
  await runMiddleware(request, response, cors);
  response.json({ cors: response.getHeader('Access-Control-Allow-Origin') });
};

app.get(PATH, (handler as unknown) as RequestHandler);

describe('run middleware', () => {
  it('runs express middleware', async () => {
    const response = await request(app).get(PATH).expect(200);

    const actual = response.body.cors;
    const expected = '*';

    expect(actual).toEqual(expected);
  });
});
