/** Allow unauthenticated developer API access only by explicit opt-in on loopback. */
export function allowLocalDevApiBypass(nodeEnv: unknown, flag: unknown, remoteAddress: unknown): boolean {
  return nodeEnv === 'development' && flag === 'true' &&
    (remoteAddress === '127.0.0.1' || remoteAddress === '::1' || remoteAddress === '::ffff:127.0.0.1');
}
