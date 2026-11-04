import test from 'node:test';
import assert from 'node:assert/strict';
import {formatTzs} from '../server/utils/currencyTzs.ts';
test('currencyTzs regression',()=>{ assert.equal(formatTzs(25000),'TZS 25,000'); });
