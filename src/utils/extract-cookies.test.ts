import { extractCookies, shapeFlags } from './extract-cookies';

const sampleHeaders = {
  vary: 'Origin',
  'access-control-allow-credentials': 'true',
  'set-cookie': [
    'refresh_token=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxOVBEL0RqVUlXV2lvUmZhWlhuWWdJTExaUGJ2cW4xcWRVPSIsImlhdCI6MTU2MjIwMTAzNywiZXhwIjoxNTYyODA1ODM3LCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiI5MmQzMmY4Ni05ZmYzLTQ5OTgtOWE1Zi1jZDNkZWU1YTRmYmQifQ.6omhdrHChv4cPhfhvwz6xMK7RPsc-SCtWxHTIkBLRrw.kaJG83X6V9YBHwYPlCQ61X7KOsX7wFSfD7hnEdP0pmg; Domain=localhost; Path=/tokens; HttpOnly; SameSite=Strict',
  ],
  etag: 'W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"',
  date: 'Thu, 04 Jul 2019 00:43:57 GMT',
  connection: 'close',
};

describe('shapeFlags: shapes an array of ["Flag=Value"] pairs into an object', () => {
  const [, ...flags] = sampleHeaders['set-cookie'][0].split('; ');
  const output = shapeFlags(flags);

  it('returns an object of { flag: value } entries', () =>
    Object.entries({
      Domain: 'localhost',
      Path: '/tokens',
      HttpOnly: true,
      SameSite: 'Strict',
    }).forEach(flagEntry => {
      const [flagName, expected] = flagEntry;

      const actual = output[flagName];

      expect(actual).toEqual(expected);
    }));

  it('sets value to true for flags without values (boolean flags)', () => {
    const actual = output.HttpOnly;
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('given a cookie with a single flag: should strip the trailing ";" character', () => {
    const singleFlagHeaders = {
      'set-cookie': ['cookiename=cookievalue; Domain=oneflag'],
    };
    const [, ...flags] = singleFlagHeaders['set-cookie'][0].split('; ');

    const actual = shapeFlags(flags);
    const expected = { Domain: 'oneflag' };

    expect(actual).toEqual(expected);
  });
});

describe('extractCookies: extracts and shapes response cookies from the set-cookie header', () => {
  const output = extractCookies(sampleHeaders);

  it('returns an object of { cookieName: { value, flags } } shape', () => {
    expect(output.refresh_token).toBeDefined();
    expect(output.refresh_token.value).toBeDefined();
    expect(output.refresh_token.flags).toBeDefined();
  });

  it('extracts the value of a given cookie', () => {
    const actual = output.refresh_token.value;
    const expected =
      's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxOVBEL0RqVUlXV2lvUmZhWlhuWWdJTExaUGJ2cW4xcWRVPSIsImlhdCI6MTU2MjIwMTAzNywiZXhwIjoxNTYyODA1ODM3LCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiI5MmQzMmY4Ni05ZmYzLTQ5OTgtOWE1Zi1jZDNkZWU1YTRmYmQifQ.6omhdrHChv4cPhfhvwz6xMK7RPsc-SCtWxHTIkBLRrw.kaJG83X6V9YBHwYPlCQ61X7KOsX7wFSfD7hnEdP0pmg';

    expect(actual).toEqual(expected);
  });

  it('extracts and shapes the flags of the cookie', () => {
    const [, ...flags] = sampleHeaders['set-cookie'][0].split('; ');

    const actual = output.refresh_token.flags;
    const expected = shapeFlags(flags);

    expect(actual).toEqual(expected);
  });

  it('cookie has no additional flags: cookieName.flags is an empty object', () => {
    const noFlagsHeaders = {
      'set-cookie': [
        'refresh_token=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxOVBEL0RqVUlXV2lvUmZhWlhuWWdJTExaUGJ2cW4xcWRVPSIsImlhdCI6MTU2MjIwMTAzNywiZXhwIjoxNTYyODA1ODM3LCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiI5MmQzMmY4Ni05ZmYzLTQ5OTgtOWE1Zi1jZDNkZWU1YTRmYmQifQ.6omhdrHChv4cPhfhvwz6xMK7RPsc-SCtWxHTIkBLRrw.kaJG83X6V9YBHwYPlCQ61X7KOsX7wFSfD7hnEdP0pmg;',
      ],
    };
    const output = extractCookies(noFlagsHeaders);

    const actual = output.refresh_token.flags;
    const expected = {};

    expect(actual).toEqual(expected);
  });

  it('supports multiple cookie entries', () => {
    const multipleCookiesHeaders = {
      'set-cookie': [
        'someothercookie=cookievalue; Domain=test;',
        'refresh_token=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxOVBEL0RqVUlXV2lvUmZhWlhuWWdJTExaUGJ2cW4xcWRVPSIsImlhdCI6MTU2MjIwMTAzNywiZXhwIjoxNTYyODA1ODM3LCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiI5MmQzMmY4Ni05ZmYzLTQ5OTgtOWE1Zi1jZDNkZWU1YTRmYmQifQ.6omhdrHChv4cPhfhvwz6xMK7RPsc-SCtWxHTIkBLRrw.kaJG83X6V9YBHwYPlCQ61X7KOsX7wFSfD7hnEdP0pmg;',
      ],
    };

    const output = extractCookies(multipleCookiesHeaders);

    ['refresh_token', 'someothercookie'].forEach(cookieName =>
      expect(output[cookieName]).toBeDefined(),
    );

    expect(output.someothercookie.value).toEqual('cookievalue');
    expect(output.someothercookie.flags).toEqual({ Domain: 'test' });
  });
});
