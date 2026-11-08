export function appointmentWithinWindow(isoDate: string, now: number, hours=24): boolean {
  if (typeof isoDate !== 'string' || isoDate.length > 35 || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(isoDate)) return false;
  const time=Date.parse(isoDate);
  return Number.isFinite(now)&&Number.isFinite(time)&&Number.isFinite(hours)&&hours>=0&&hours<=8760&&time>=now&&time-now<=hours*3600000;
}
