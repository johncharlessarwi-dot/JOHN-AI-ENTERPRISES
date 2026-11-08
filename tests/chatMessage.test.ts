import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChatMessage } from '../server/utils/chatMessage.ts';

test('chat messages accept bounded customer text',()=>assert.deepEqual(parseChatMessage({text:'Habari'}),{text:'Habari',sender:'customer'}));
test('chat messages reject spoofed sender roles',()=>assert.equal(parseChatMessage({text:'Hello',sender:'SUPER_ADMIN'}),null));
test('chat messages reject oversized and nontext bodies',()=>{
 assert.equal(parseChatMessage({text:'x'.repeat(5000)}),null);
 assert.equal(parseChatMessage({text:{role:'system'}}),null);
});
