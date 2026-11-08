/** Never allow untrusted event labels or timestamps into logs unchanged. */
export function safeEventSummary(event: unknown, timestamp: unknown) {
  const sanitize = (value: unknown) => typeof value === 'string'
    ? value.replace(/[\\u0000-\\u001f\\u007f\\u202a-\\u202e\\u2066-\\u2069]/gi, '').slice(0,64)
    : '';
  return { event: sanitize(event), timestamp: sanitize(timestamp) };
}
