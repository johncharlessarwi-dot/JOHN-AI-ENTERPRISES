export function validInvoiceAmount(amount: unknown): amount is number { return typeof amount==='number' && Number.isSafeInteger(amount) && amount>0 && amount<=1_000_000_000; }
