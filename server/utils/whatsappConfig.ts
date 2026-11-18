import type { WhatsAppEngineConfig } from '../whatsappEngine';

export type WhatsAppConfigUpdate = Partial<Pick<WhatsAppEngineConfig,
  'provider' | 'accessToken' | 'phoneNumberId' | 'wabaId' | 'baileysSessionName'
>>;

const maskedToken = '[REDACTED]';
const settingLimits = { accessToken: 4096, phoneNumberId: 64, wabaId: 64, baileysSessionName: 128 } as const;
const textSettings = Object.keys(settingLimits) as (keyof typeof settingLimits)[];

export function parseWhatsAppConfigUpdate(input: unknown): WhatsAppConfigUpdate | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const source = input as Record<string, unknown>;
  if (Object.keys(source).some(key => key !== 'provider' && !Object.hasOwn(settingLimits, key))) return null;

  const update: WhatsAppConfigUpdate = {};
  if (Object.hasOwn(source, 'provider')) {
    if (source.provider !== 'meta_cloud' && source.provider !== 'baileys') return null;
    update.provider = source.provider;
  }
  for (const key of textSettings) {
    if (!Object.hasOwn(source, key)) continue;
    const value = source[key];
    if (typeof value !== 'string' || value.length > settingLimits[key] || /[\u0000-\u001f\u007f]/u.test(value)) return null;
    if (key === 'accessToken' && value === maskedToken) continue;
    update[key] = value;
  }
  return update;
}

export function publicWhatsAppConfig({ provider, phoneNumberId, wabaId, baileysSessionName, accessToken }: WhatsAppEngineConfig) {
  return { provider, phoneNumberId, wabaId, baileysSessionName, accessToken: accessToken ? maskedToken : '' };
}
