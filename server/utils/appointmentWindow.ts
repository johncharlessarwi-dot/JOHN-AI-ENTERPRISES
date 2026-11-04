export function appointmentWithinWindow(isoDate: string, now: number, hours=24): boolean { const time=Date.parse(isoDate); return Number.isFinite(time)&&time>=now&&time-now<=hours*3600000; }
