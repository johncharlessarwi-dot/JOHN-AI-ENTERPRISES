import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeAudience} from '../server/utils/broadcastAudience.ts';
test('broadcastAudience regression',()=>{ assert.equal(normalizeAudience(' VIP '),'vip'); assert.equal(normalizeAudience('unknown'),'all'); });
