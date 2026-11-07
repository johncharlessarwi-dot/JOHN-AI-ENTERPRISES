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

test("reject future webhook events beyond tolerance", () => {
  assert.equal(validWebhookTimestamp(400_001, 0, 300_000), false);
});

test("reject NaN webhook reference clocks", () => {
  assert.equal(validWebhookTimestamp(1000, NaN), false);
});

test("reject infinite webhook reference clocks", () => {
  assert.equal(validWebhookTimestamp(1000, Infinity), false);
});

test("reject negative webhook tolerance windows", () => {
  assert.equal(validWebhookTimestamp(1000, 1000, -1), false);
});

test("reject infinite webhook tolerance windows", () => {
  assert.equal(validWebhookTimestamp(1000, 1000, Infinity), false);
});

test("reject fractional webhook timestamps", () => {
  assert.equal(validWebhookTimestamp(1000.5, 1000), false);
});

test("accept valid webhook timestamp window", () => {
  assert.equal(validWebhookTimestamp(1000, 1000, 300_000), true);
});

test("reject nonstring Tanzania phone input", () => {
  assert.equal(normalizeTanzaniaPhone(123 as never), null);
});

test("reject oversized Tanzania phone input", () => {
  assert.equal(normalizeTanzaniaPhone('0'.repeat(65)), null);
});

test("reject newline-spoofed Tanzania phone", () => {
  assert.equal(normalizeTanzaniaPhone('0698170989\n'), null);
});

test("accept properly formatted Tanzania phone", () => {
  assert.equal(normalizeTanzaniaPhone('0698 170 989'), '+255698170989');
});

test("reject Unicode bidirectional outgoing spoof", () => {
  assert.equal(validateOutgoingText('Hello\u202Ehidden'), false);
});

test("allow ordinary multiline outgoing messages", () => {
  assert.equal(validateOutgoingText('Hello\nHabari'), true);
});
