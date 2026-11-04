import test from 'node:test';
import assert from 'node:assert/strict';
import {redactCredential} from '../server/utils/redactSecrets.ts';
test('redactSecrets regression',()=>{ assert.equal(redactCredential('token'),'[REDACTED]'); assert.equal(redactCredential(''),''); });
