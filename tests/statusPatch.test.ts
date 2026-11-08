import test from 'node:test';
import assert from 'node:assert/strict';
import {parseStatusPatch} from '../server/utils/statusPatch.ts';
test('status patch only accepts allowlisted settings', () => {
 assert.deepEqual(parseStatusPatch({aiAutoResponder:false}),{aiAutoResponder:false});
 assert.equal(parseStatusPatch({connected:true}),null);
 assert.equal(parseStatusPatch({__proto__:null, batteryLevel:900}),null);
 assert.equal(parseStatusPatch({aiPersona:'x'.repeat(501)}),null);
 assert.equal(parseStatusPatch({aiAutoResponder:'false'}),null);
});
