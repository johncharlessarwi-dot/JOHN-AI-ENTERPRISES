import test from 'node:test';
import assert from 'node:assert/strict';
import {validateOutgoingText} from '../server/utils/outboundLength.ts';
test('outboundLength regression',()=>{ assert.equal(validateOutgoingText('Habari'),true); assert.equal(validateOutgoingText(''),false); assert.equal(validateOutgoingText('a'.repeat(4097)),false); });
