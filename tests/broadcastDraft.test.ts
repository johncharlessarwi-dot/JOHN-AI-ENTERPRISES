import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBroadcastDraft } from '../server/utils/broadcastDraft.ts';

test('broadcast draft normalizes audience and language',()=>{
 assert.deepEqual(parseBroadcastDraft({campaignTitle:' Offer ',targetAudience:'VIP',promptText:'Special service offer',language:'English'}),{campaignTitle:'Offer',targetAudience:'vip',promptText:'Special service offer',language:'English'});
});
test('broadcast draft rejects unbounded prompts',()=>{
 assert.equal(parseBroadcastDraft({campaignTitle:'Offer',promptText:'x'.repeat(4000)}),null);
 assert.equal(parseBroadcastDraft(null),null);
});
