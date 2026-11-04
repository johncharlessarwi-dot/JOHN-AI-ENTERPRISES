export function safeEventSummary(event: string, timestamp: string) { return {event:event.slice(0,64),timestamp}; }
