const editable = ['aiAutoResponder', 'aiPersona'] as const;
export function parseStatusPatch(input: unknown): {aiAutoResponder?: boolean; aiPersona?: string} | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const source = input as Record<string, unknown>;
  if (Object.keys(source).some(key => !editable.includes(key as typeof editable[number]))) return null;
  const result: {aiAutoResponder?: boolean; aiPersona?: string} = {};
  if ('aiAutoResponder' in source) {
    if (typeof source.aiAutoResponder !== 'boolean') return null;
    result.aiAutoResponder = source.aiAutoResponder;
  }
  if ('aiPersona' in source) {
    if (typeof source.aiPersona !== 'string' || source.aiPersona.trim().length < 1 || source.aiPersona.length > 500) return null;
    result.aiPersona = source.aiPersona.trim();
  }
  return Object.keys(result).length ? result : null;
}
