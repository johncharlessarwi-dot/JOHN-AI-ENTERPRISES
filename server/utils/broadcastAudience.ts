export function normalizeAudience(input: unknown): 'all'|'leads'|'customers'|'vip' {
  if (typeof input !== 'string' || input.length > 32) return 'leads';
  const value = input.trim().toLowerCase();
  return ['all','leads','customers','vip'].includes(value) ? value as 'all'|'leads'|'customers'|'vip' : 'leads';
}
