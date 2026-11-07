export function formatTzs(amount: number): string { if(!Number.isSafeInteger(amount) || amount<0)throw new RangeError('Invalid TZS'); return `TZS ${Math.round(amount).toLocaleString('en-US')}`; }
