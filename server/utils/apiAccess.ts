import { timingSafeEqual } from 'node:crypto';

/** Production-only gate for private enterprise APIs. Never expose the token in a browser bundle. */
export function verifyApiToken(header: unknown, configuredToken: unknown): boolean {
  if (typeof configuredToken !== 'string' || configuredToken.length < 32 || configuredToken.length > 512) return false;
  if (typeof header !== 'string' || !/^Bearer [A-Za-z0-9._~+/-]{32,512}$/.test(header)) return false;
  const supplied = header.slice(7);
  const expected = Buffer.from(configuredToken, 'utf8');
  const actual = Buffer.from(supplied, 'utf8');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
