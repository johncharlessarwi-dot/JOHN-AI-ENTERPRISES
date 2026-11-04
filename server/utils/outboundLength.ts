export function validateOutgoingText(value: unknown): value is string { return typeof value==='string' && value.trim().length>0 && value.length<=4096; }
