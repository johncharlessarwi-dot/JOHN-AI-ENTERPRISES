import type { Invoice, PaymentTransaction, Quotation } from '../businessAutomationService';
import { validInvoiceAmount } from './invoiceAmounts';
import { normalizeTanzaniaPhone } from './phoneNormalization';

function record(input: unknown): Record<string, unknown> {
  return input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {};
}

function text(input: unknown, max: number): string | null {
  if (typeof input !== 'string' || input.length > max || /[\u0000-\u001f\u007f]/u.test(input)) return null;
  return input.trim() || null;
}

function oneOf<const T extends string>(value: unknown, choices: readonly T[]): value is T {
  return typeof value === 'string' && choices.some(choice => choice === value);
}

function validDate(value: unknown): value is string {
  if (typeof value !== 'string' || value.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
}

export function parseQuotation(input: unknown): Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'> | null {
  const { amountTzs, status, customerName: name, customerPhone: phone, serviceTitle: title } = record(input);
  const customerName = text(name, 120);
  const customerPhone = typeof phone === 'string' ? normalizeTanzaniaPhone(phone) : null;
  const serviceTitle = text(title, 160);
  if (!customerName || !customerPhone || !serviceTitle || !validInvoiceAmount(amountTzs) ||
      !oneOf(status, ['Draft', 'Sent', 'Approved', 'Converted to Invoice'])) return null;
  return { customerName, customerPhone, serviceTitle, amountTzs, status };
}

export function parseInvoice(input: unknown): Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'> | null {
  const { amountTzs, paymentMethod, status, dueDate, customerName: name, serviceTitle: title } = record(input);
  const customerName = text(name, 120);
  const serviceTitle = text(title, 160);
  if (!customerName || !serviceTitle || !validInvoiceAmount(amountTzs) || !validDate(dueDate) ||
      !oneOf(paymentMethod, ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Bank Transfer', 'Cash']) ||
      !oneOf(status, ['Paid', 'Pending', 'Overdue'])) return null;
  return { customerName, serviceTitle, amountTzs, paymentMethod, status, dueDate };
}

export function parsePayment(input: unknown): Omit<PaymentTransaction, 'id' | 'timestamp'> | null {
  const { amountTzs, gateway, status, referenceId: reference, customerName: name, customerPhone: phone } = record(input);
  const referenceId = text(reference, 100);
  const customerName = text(name, 120);
  const customerPhone = typeof phone === 'string' ? normalizeTanzaniaPhone(phone) : null;
  if (!referenceId || !customerName || !customerPhone || !validInvoiceAmount(amountTzs) ||
      !oneOf(gateway, ['Vodacom M-Pesa', 'Tigo Pesa', 'Airtel Money', 'CRDB Bank', 'NMB Bank']) ||
      !oneOf(status, ['Completed', 'Pending', 'Failed'])) return null;
  return { referenceId, customerPhone, customerName, gateway, amountTzs, status };
}
