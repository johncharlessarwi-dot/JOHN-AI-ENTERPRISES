import test from 'node:test';
import assert from 'node:assert/strict';
import {safeEventSummary} from '../server/utils/eventPayload.ts';
test('eventPayload regression',()=>{ assert.deepEqual(safeEventSummary('sent','2026'),{event:'sent',timestamp:'2026'}); });
