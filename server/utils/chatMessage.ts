import { validateOutgoingText } from './outboundLength';

export function parseChatMessage(input: unknown): { text: string; sender: 'customer' | 'agent' } | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = input as Record<string,unknown>;
  if (!validateOutgoingText(data.text)) return null;
  const sender = data.sender ?? 'customer';
  if (sender !== 'customer' && sender !== 'agent') return null;
  return { text: data.text, sender };
}
