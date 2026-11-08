import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeAudience} from '../server/utils/broadcastAudience.ts';
test('broadcastAudience regression',()=>{ assert.equal(normalizeAudience(' VIP '),'vip'); assert.equal(normalizeAudience('unknown'),'leads'); });

test('broadcast audience rejects malformed and oversized selectors',()=>{
 assert.equal(normalizeAudience(null),'leads');
 assert.equal(normalizeAudience('a'.repeat(1000)),'leads');
});
