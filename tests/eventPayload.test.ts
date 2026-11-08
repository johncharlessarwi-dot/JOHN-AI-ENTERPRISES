import test from 'node:test';
import assert from 'node:assert/strict';
import {safeEventSummary} from '../server/utils/eventPayload.ts';
test('eventPayload regression',()=>{ assert.deepEqual(safeEventSummary('sent','2026'),{event:'sent',timestamp:'2026'}); });

test('event summaries reject malformed runtime values',()=>{
 assert.deepEqual(safeEventSummary(null,42),{event:'',timestamp:''});
});
test('event summaries remove directional spoofing controls',()=>{
 assert.equal(safeEventSummary('sent'+String.fromCharCode(0x202E),'2026').event,'sent');
});
