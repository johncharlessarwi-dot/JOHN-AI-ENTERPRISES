import test from 'node:test';
import assert from 'node:assert/strict';
import {taskIsOverdue} from '../server/utils/taskUrgency.ts';
test('taskUrgency regression',()=>{ assert.equal(taskIsOverdue('2026-11-01','2026-11-04'),true); });

test('task urgency ignores noncanonical dates',()=>{
 assert.equal(taskIsOverdue('11/01/2026','2026-11-04'),false);
 assert.equal(taskIsOverdue('2026-11-01T00:00:00Z','2026-11-04'),false);
});

test('rejects impossible calendar dates instead of silently normalizing', () => {
  assert.equal(taskIsOverdue('2026-02-30', '2026-03-01'), false);
  assert.equal(taskIsOverdue('2026-02-28', '2026-02-30'), false);
});
