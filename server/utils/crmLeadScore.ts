export function clampLeadScore(score: number): number { return Number.isFinite(score) ? Math.min(100,Math.max(0,Math.round(score))) : 0; }
