export function parseKnowledgeDocument(input: unknown): {title:string; category:string; size:string} | null {
 if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
 const source=input as Record<string,unknown>;
 const title=source.title, category=source.category ?? 'General', size=source.size ?? '1.2 MB';
 if (typeof title !== 'string' || title.trim().length < 1 || title.length > 180) return null;
 if (typeof category !== 'string' || category.trim().length < 1 || category.length > 80) return null;
 if (typeof size !== 'string' || !/^\d+(?:\.\d{1,2})? (?:KB|MB|GB)$/.test(size) || size.length > 18) return null;
 return {title:title.trim(),category:category.trim(),size};
}
