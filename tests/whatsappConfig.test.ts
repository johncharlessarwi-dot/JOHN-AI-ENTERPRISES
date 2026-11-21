import test from 'node:test';
import assert from 'node:assert/strict';
import { parseWhatsAppConfigUpdate, publicWhatsAppConfig } from '../server/utils/whatsappConfig.ts';

test('gateway settings responses include only approved public fields', () => {
  const config = { provider: 'meta_cloud' as const, phoneNumberId: '1234', accessToken: 'test-only', webhookVerifyToken: 'test-only', additionalField: 'test-only' };
  assert.deepEqual(JSON.parse(JSON.stringify(publicWhatsAppConfig(config))), {
    provider: 'meta_cloud', phoneNumberId: '1234', accessToken: '[REDACTED]',
  });
});

test('resubmitting masked settings preserves credentials and permits editable fields', () => {
  assert.deepEqual(parseWhatsAppConfigUpdate({ accessToken: '[REDACTED]', wabaId: '1234' }), { wabaId: '1234' });
  assert.deepEqual(parseWhatsAppConfigUpdate({ provider: 'baileys', accessToken: '' }), { provider: 'baileys', accessToken: '' });
});

test('updates reject server-only fields and invalid field types', () => {
  for (const body of [null, [], { webhookVerifyToken: '' }, { provider: 'other' }, { wabaId: 1234 }, { phoneNumberId: 'x'.repeat(65) }]) {
    assert.equal(parseWhatsAppConfigUpdate(body), null);
  }
});
