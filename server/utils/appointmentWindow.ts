export function appointmentWithinWindow(isoDate: string, now: number, hours=24): boolean {
  if (typeof isoDate !== 'string' || isoDate.length > 35 || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(isoDate)) return false;
  const time=Date.parse(isoDate);
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  const day = Number(isoDate.slice(8, 10));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return false;
  return Number.isFinite(now)&&Number.isFinite(time)&&Number.isFinite(hours)&&hours>=0&&hours<=8760&&time>=now&&time-now<=hours*3600000;
}
