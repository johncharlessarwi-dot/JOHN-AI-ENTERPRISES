import test from 'node:test';
import assert from 'node:assert/strict';
import {validWebhookTimestamp} from '../server/utils/webhookTimestamp.ts';
test('webhookTimestamp regression',()=>{ assert.equal(validWebhookTimestamp(1000,1000),true); assert.equal(validWebhookTimestamp(0,400000),false); });

test('webhook timestamp refuses relaxed replay windows',()=>{
 assert.equal(validWebhookTimestamp(0,0,3600000),false);
 assert.equal(validWebhookTimestamp(0,0,300000),true);
});
