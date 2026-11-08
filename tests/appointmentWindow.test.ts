import test from 'node:test';
import assert from 'node:assert/strict';
import {appointmentWithinWindow} from '../server/utils/appointmentWindow.ts';
test('appointmentWindow regression',()=>{ assert.equal(appointmentWithinWindow('2026-11-05T00:00:00Z',Date.parse('2026-11-04T12:00:00Z')),true); });

test('appointment window rejects ambiguous dates',()=>{
 const now=Date.parse('2026-11-04T12:00:00Z');
 for(const value of ['11/05/2026','2026-11-05','2026-11-05T12:00:00','x'.repeat(1000)]) assert.equal(appointmentWithinWindow(value,now),false);
});
