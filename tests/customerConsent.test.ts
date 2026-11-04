import test from 'node:test';
import assert from 'node:assert/strict';
import {canSendMarketing} from '../server/utils/customerConsent.ts';
test('customerConsent regression',()=>{ assert.equal(canSendMarketing(true,false),true); assert.equal(canSendMarketing(true,true),false); });
