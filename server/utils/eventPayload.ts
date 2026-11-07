export function safeEventSummary(event: string, timestamp: string) { return {event:event.replace(/[\u0000-\u001f\u007f]/g,'').slice(0,64),timestamp}; }
