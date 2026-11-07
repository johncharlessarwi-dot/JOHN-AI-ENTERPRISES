import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyApiToken } from '../server/utils/apiAccess.ts';
import { validWebhookTimestamp } from '../server/utils/webhookTimestamp.ts';
import { normalizeTanzaniaPhone } from '../server/utils/phoneNormalization.ts';
import { validateOutgoingText } from '../server/utils/outboundLength.ts';
import { appointmentWithinWindow } from '../server/utils/appointmentWindow.ts';
import { taskIsOverdue } from '../server/utils/taskUrgency.ts';
import { safeEventSummary } from '../server/utils/eventPayload.ts';
import { normalizeAudience } from '../server/utils/broadcastAudience.ts';
import { formatTzs } from '../server/utils/currencyTzs.ts';

const API_TOKEN = 'abcdefghijklmnopqrstuvwxyz0123456789';


test("accept valid enterprise API bearer token", () => {
  assert.equal(verifyApiToken('Bearer ' + API_TOKEN, API_TOKEN), true);
});

test("reject missing enterprise API header", () => {
  assert.equal(verifyApiToken(undefined, API_TOKEN), false);
});

test("reject missing enterprise server secret", () => {
  assert.equal(verifyApiToken('Bearer ' + API_TOKEN, undefined), false);
});

test("reject undersized enterprise server secret", () => {
  assert.equal(verifyApiToken('Bearer short', 'short'), false);
});

test("reject overly long enterprise server secret", () => {
  assert.equal(verifyApiToken('Bearer ' + API_TOKEN, 'x'.repeat(513)), false);
});

test("reject invalid enterprise token scheme", () => {
  assert.equal(verifyApiToken('Basic ' + API_TOKEN, API_TOKEN), false);
});

test("reject malformed enterprise authorization whitespace", () => {
  assert.equal(verifyApiToken('Bearer  ' + API_TOKEN, API_TOKEN), false);
});

test("reject incorrect enterprise API token", () => {
  assert.equal(verifyApiToken('Bearer ' + 'z'.repeat(36), API_TOKEN), false);
});

test("reject enterprise token prefix only", () => {
  assert.equal(verifyApiToken('Bearer ' + API_TOKEN.slice(0, 33), API_TOKEN), false);
});

test("reject enterprise token control characters", () => {
  assert.equal(verifyApiToken('Bearer ' + API_TOKEN + '\n', API_TOKEN), false);
});

test("reject non-string enterprise authorization", () => {
  assert.equal(verifyApiToken(123, API_TOKEN), false);
});
