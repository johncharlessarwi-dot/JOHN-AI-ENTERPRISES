import test from 'node:test';
import assert from 'node:assert/strict';
import {retryDelayMs} from '../server/utils/retrySchedule.ts';
test('retrySchedule regression',()=>{ assert.equal(retryDelayMs(0),500); assert.equal(retryDelayMs(20),60000); });
