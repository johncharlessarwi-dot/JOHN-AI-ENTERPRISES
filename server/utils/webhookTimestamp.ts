export function validWebhookTimestamp(timestamp: number, now=Date.now(), toleranceMs=300000): boolean { return Number.isFinite(timestamp) && Math.abs(now-timestamp)<=toleranceMs; }
