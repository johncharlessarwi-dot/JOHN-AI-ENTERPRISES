import { normalizeAudience } from './broadcastAudience';

export function parseBroadcastDraft(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = input as Record<string,unknown>;
  if (typeof data.campaignTitle !== 'string' || data.campaignTitle.trim().length < 2 || data.campaignTitle.length > 120) return null;
  if (typeof data.promptText !== 'string' || data.promptText.trim().length < 5 || data.promptText.length > 2000) return null;
  const language = data.language === 'English' ? 'English' : 'Swahili';
  return { campaignTitle: data.campaignTitle.trim(), targetAudience: normalizeAudience(data.targetAudience), promptText: data.promptText.trim(), language };
}
