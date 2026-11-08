import test from 'node:test';
import assert from 'node:assert/strict';
import { validateOutgoingText } from '../server/utils/outboundLength.ts';

test('accepts nonempty outgoing text and the exact length boundary', () => {
  assert.equal(validateOutgoingText('Habari'), true);
  assert.equal(validateOutgoingText('a'.repeat(4096)), true);
  assert.equal(validateOutgoingText('Habari\nJohn\t!\r\n'), true);
});

test('rejects empty, oversized and non-text messages', () => {
  assert.equal(validateOutgoingText(''), false);
  assert.equal(validateOutgoingText(' \n\t '), false);
  assert.equal(validateOutgoingText('a'.repeat(4097)), false);
  assert.equal(validateOutgoingText(null), false);
  assert.equal(validateOutgoingText({ message: 'Hello' }), false);
});

test('rejects hidden control characters in outbound text', () => {
  assert.equal(validateOutgoingText('Hello\u0000world'), false);
  assert.equal(validateOutgoingText('Hello\u001Bworld'), false);
  assert.equal(validateOutgoingText('Hello\u007Fworld'), false);
});

test('outboundLength blocks invisible direction marks',()=>{
 for (const code of [0x200E,0x200F,0x202E,0x2066]) assert.equal(validateOutgoingText('Hello'+String.fromCharCode(code)),false);
});
