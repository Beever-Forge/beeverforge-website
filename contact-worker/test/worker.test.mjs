import assert from 'node:assert/strict';
import test from 'node:test';
import worker, { allowedOrigin, buildEmail, parseInquiry } from '../src/index.mjs';

const env = {
  ALLOWED_ORIGINS: 'https://beeverforge.com,https://www.beeverforge.com',
  CONTACT_RECIPIENT: 'contact@beeverforge.com',
  CONTACT_SENDER: 'BeeverForge website <inquiries@send.beeverforge.com>',
  RESEND_API_KEY: 'test-key',
};
const valid = { name: 'Morgan Reed', email: 'morgan@example.com', company: 'Example Co', interest: 'Prototype Builder', message: 'We need to connect our discovery process.', source: 'v1', website: '' };

test('allows only BeeverForge website origins', () => {
  assert.equal(allowedOrigin('https://beeverforge.com', env), 'https://beeverforge.com');
  assert.equal(allowedOrigin('https://attacker.example', env), '');
});

test('rejects missing fields and absorbs a filled honeypot', () => {
  assert.equal(parseInquiry({ ...valid, message: 'short' }), null);
  assert.deepEqual(parseInquiry({ ...valid, website: 'bot' }), { spam: true });
});

test('creates a fixed-recipient email and escapes visitor content', () => {
  const email = buildEmail({ ...valid, message: '<script>alert(1)</script>' }, env);
  assert.deepEqual(email.to, ['contact@beeverforge.com']);
  assert.equal(email.reply_to, 'morgan@example.com');
  assert.match(email.html, /&lt;script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
});

test('rejects cross-origin requests before calling Resend', async () => {
  const request = new Request('https://worker.example/contact', { method: 'POST', headers: { origin: 'https://attacker.example', 'content-type': 'application/json' }, body: JSON.stringify(valid) });
  const response = await worker.fetch(request, env, { waitUntil() {} });
  assert.equal(response.status, 404);
});
