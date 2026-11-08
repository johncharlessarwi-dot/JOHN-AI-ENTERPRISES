export function taskIsOverdue(dueDate: string, today: string): boolean {
  const canonical = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof dueDate !== 'string' || typeof today !== 'string' || !canonical.test(dueDate) || !canonical.test(today)) return false;
  const due = Date.parse(dueDate), current = Date.parse(today);
  return Number.isFinite(due) && Number.isFinite(current) && new Date(due).toISOString().slice(0, 10) === dueDate && new Date(current).toISOString().slice(0, 10) === today && due < current;
}
