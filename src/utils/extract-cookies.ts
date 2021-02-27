const shapeFlags = (flags: string[]): Record<string, unknown> =>
  flags.reduce((shapedFlags, flag) => {
    const [flagName, rawValue] = flag.split('=');
    // edge case where a cookie has a single flag and "; " split results in trailing ";"
    const value = rawValue ? rawValue.replace(';', '') : true;
    return { ...shapedFlags, [flagName]: value };
  }, {});

type CookieHeaders = {
  'set-cookie'?: string[];
} & Record<string, unknown>;

type Cookie = {
  value: string;
  flags: Record<string, unknown>;
};

const extractCookies = (headers: CookieHeaders): Record<string, Cookie> => {
  const cookies: string[] = headers['set-cookie'] ?? [];

  return cookies.reduce((shapedCookies, cookieString) => {
    const [rawCookie, ...flags] = cookieString.split('; ');
    const [cookieName, value] = rawCookie.split('=');
    return {
      ...shapedCookies,
      [cookieName]: { value, flags: shapeFlags(flags) },
    };
  }, {});
};

export { extractCookies, shapeFlags };
