import test from 'node:test';
import assert from 'node:assert/strict';
import {taskIsOverdue} from '../server/utils/taskUrgency.ts';
test('taskUrgency regression',()=>{ assert.equal(taskIsOverdue('2026-11-01','2026-11-04'),true); });

test('task urgency ignores noncanonical dates',()=>{
 assert.equal(taskIsOverdue('11/01/2026','2026-11-04'),false);
 assert.equal(taskIsOverdue('2026-11-01T00:00:00Z','2026-11-04'),false);
});
