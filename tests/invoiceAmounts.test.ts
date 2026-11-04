import test from 'node:test';
import assert from 'node:assert/strict';
import {validInvoiceAmount} from '../server/utils/invoiceAmounts.ts';
test('invoiceAmounts regression',()=>{ assert.equal(validInvoiceAmount(25000),true); assert.equal(validInvoiceAmount(-1),false); });
