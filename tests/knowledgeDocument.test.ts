import test from 'node:test';
import assert from 'node:assert/strict';
import {parseKnowledgeDocument} from '../server/utils/knowledgeDocument.ts';
test('knowledge document parser rejects malformed metadata',()=>{
 assert.deepEqual(parseKnowledgeDocument({title:' Guide '}),{title:'Guide',category:'General',size:'1.2 MB'});
 for(const input of [null,[],{title:''},{title:1},{title:'x'.repeat(181)},{title:'Guide',size:'<script>'},{title:'Guide',category:{}}]) assert.equal(parseKnowledgeDocument(input),null);
});
