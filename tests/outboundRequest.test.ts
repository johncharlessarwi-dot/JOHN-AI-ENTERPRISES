import test from 'node:test';
import assert from 'node:assert/strict';
import {parseOutboundRequest} from '../server/utils/outboundRequest.ts';
test('outbound request validates recipient and message',()=>{
 assert.equal(parseOutboundRequest({recipient:'abc',messageBody:'Hello'}),null);
 assert.equal(parseOutboundRequest({recipient:'0712345678',messageBody:''}),null);
 assert.equal(parseOutboundRequest({recipient:'0712345678',messageBody:'Hello',options:{admin:true}}),null);
 assert.ok(parseOutboundRequest({recipient:'0712345678',messageBody:'Hello'}));
});
