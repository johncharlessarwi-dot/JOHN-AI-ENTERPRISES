export function canSendMarketing(consent: boolean, optedOut: boolean): boolean { return consent===true && optedOut===false; }
