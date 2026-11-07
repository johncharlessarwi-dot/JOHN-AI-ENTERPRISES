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
