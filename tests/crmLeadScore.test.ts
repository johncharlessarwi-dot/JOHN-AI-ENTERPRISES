import test from 'node:test';
import assert from 'node:assert/strict';
import {clampLeadScore} from '../server/utils/crmLeadScore.ts';
test('crmLeadScore regression',()=>{ assert.equal(clampLeadScore(109),100); assert.equal(clampLeadScore(-2),0); });
