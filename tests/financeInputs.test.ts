import test from 'node:test';
import assert from 'node:assert/strict';
import { parseInvoice, parsePayment, parseQuotation } from '../server/utils/financeInputs.ts';

const customer = { customerName: ' Demo Customer ', customerPhone: '0712 000 001', amountTzs: 20_000 };
const invoice = { ...customer, serviceTitle: 'Consultation', paymentMethod: 'Cash', status: 'Pending', dueDate: '2028-02-29' };
const payment = { ...customer, referenceId: 'demo-reference', gateway: 'CRDB Bank', status: 'Pending' };

test('finance writes pick allowed fields and preserve server-generated fields', () => {
  const serverFields = { id: 'external', invoiceNumber: 'external', quotationNumber: 'external', timestamp: 'external', createdAt: 'external' };
  assert.deepEqual(parseQuotation({ ...customer, ...serverFields, serviceTitle: 'Consultation', status: 'Draft' }), {
    customerName: 'Demo Customer', customerPhone: '+255712000001', serviceTitle: 'Consultation', amountTzs: 20_000, status: 'Draft',
  });
  assert.deepEqual(parseInvoice({ ...invoice, ...serverFields }), {
    customerName: 'Demo Customer', serviceTitle: 'Consultation', amountTzs: 20_000, paymentMethod: 'Cash', status: 'Pending', dueDate: '2028-02-29',
  });
  assert.deepEqual(parsePayment({ ...payment, ...serverFields }), {
    referenceId: 'demo-reference', customerName: 'Demo Customer', customerPhone: '+255712000001', gateway: 'CRDB Bank', amountTzs: 20_000, status: 'Pending',
  });
});

test('finance writes reject invalid money, enumerations and dates', () => {
  for (const amountTzs of [0, -1, 0.5, '20000', 1_000_000_001]) {
    assert.equal(parseQuotation({ ...customer, amountTzs, serviceTitle: 'Consultation', status: 'Draft' }), null);
    assert.equal(parseInvoice({ ...invoice, amountTzs }), null);
    assert.equal(parsePayment({ ...payment, amountTzs }), null);
  }
  assert.equal(parseInvoice({ ...invoice, dueDate: '2027-02-29' }), null);
  assert.equal(parseInvoice({ ...invoice, paymentMethod: 'Other' }), null);
  assert.equal(parsePayment({ ...payment, status: 'Unknown' }), null);
  assert.equal(parsePayment({ ...payment, customerPhone: 'not a phone' }), null);
  assert.equal(parsePayment({ ...payment, referenceId: 'x'.repeat(101) }), null);
  assert.equal(parseQuotation(null), null);
});
