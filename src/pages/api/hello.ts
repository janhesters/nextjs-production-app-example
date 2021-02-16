import type { NextApiHandler } from 'next';

const handler: NextApiHandler<{ name: string }> = (request, response) => {
  response.statusCode = 200;
  response.json({ name: 'John Doe' });
};

export default handler;
