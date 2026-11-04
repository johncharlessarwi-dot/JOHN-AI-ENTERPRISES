import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeTanzaniaPhone} from '../server/utils/phoneNormalization.ts';
test('phoneNormalization regression',()=>{ assert.equal(normalizeTanzaniaPhone('0698 170 989'),'+255698170989'); assert.equal(normalizeTanzaniaPhone('123'),null); });
