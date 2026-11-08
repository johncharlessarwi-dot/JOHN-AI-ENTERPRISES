import test from 'node:test';
import assert from 'node:assert/strict';
import { allowLocalDevApiBypass } from '../server/utils/devApiAccess.ts';

test('developer bypass requires explicit opt in from loopback',()=>{
 assert.equal(allowLocalDevApiBypass('development','true','127.0.0.1'),true);
 assert.equal(allowLocalDevApiBypass('development','true','::1'),true);
 assert.equal(allowLocalDevApiBypass('development','true','203.0.113.10'),false);
 assert.equal(allowLocalDevApiBypass('production','true','127.0.0.1'),false);
 assert.equal(allowLocalDevApiBypass('development',undefined,'127.0.0.1'),false);
});
