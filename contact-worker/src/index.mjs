const json = (body, status = 200, origin = '') => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=UTF-8',
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin',
    'x-content-type-options': 'nosniff',
  },
});

const text = (value, limit) => typeof value === 'string' && value.trim().length <= limit ? value.trim() : '';
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);

export const allowedOrigin = (origin, env) => (env.ALLOWED_ORIGINS || '')
  .split(',').map((item) => item.trim()).includes(origin) ? origin : '';

export const parseInquiry = (payload) => {
  const name = text(payload.name, 120);
  const email = text(payload.email, 254);
  const company = text(payload.company, 160);
  const interest = text(payload.interest, 160);
  const message = text(payload.message, 5000);
  const source = ['v1', 'v2', 'v3'].includes(payload.source) ? payload.source : 'website';
  if (typeof payload.website === 'string' && payload.website.trim()) return { spam: true };
  if (!name || !company || !interest || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { name, email, company, interest, message, source };
};

export const buildEmail = (inquiry, env) => ({
  from: env.CONTACT_SENDER,
  to: [env.CONTACT_RECIPIENT],
  reply_to: inquiry.email,
  subject: `Enterprise inquiry from ${inquiry.name}`,
  text: `BeeverForge Enterprise inquiry\n\nName: ${inquiry.name}\nWork email: ${inquiry.email}\nCompany: ${inquiry.company}\nInterest: ${inquiry.interest}\nSource: ${inquiry.source}\n\nMessage:\n${inquiry.message}`,
  html: `<h1>BeeverForge Enterprise inquiry</h1><p><strong>Name:</strong> ${escapeHtml(inquiry.name)}<br><strong>Work email:</strong> ${escapeHtml(inquiry.email)}<br><strong>Company:</strong> ${escapeHtml(inquiry.company)}<br><strong>Interest:</strong> ${escapeHtml(inquiry.interest)}<br><strong>Source:</strong> ${escapeHtml(inquiry.source)}</p><p><strong>Message</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`,
});

const withinRateLimit = async (request, ctx) => {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const key = new Request(`https://beeverforge-rate-limit.invalid/${encodeURIComponent(ip)}`);
  const cache = caches.default;
  if (await cache.match(key)) return false;
  ctx.waitUntil(cache.put(key, new Response('', { headers: { 'cache-control': 'max-age=60' } })));
  return true;
};

export default {
  async fetch(request, env, ctx) {
    const origin = allowedOrigin(request.headers.get('origin') || '', env);
    if (request.method === 'OPTIONS') return origin ? new Response(null, { status: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'vary': 'Origin' } }) : new Response(null, { status: 403 });
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/contact' || !origin) return json({ error: 'Not found' }, 404, origin);
    if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Unsupported request' }, 415, origin);
    if (!(await withinRateLimit(request, ctx))) return json({ error: 'Please wait a minute before sending another inquiry.' }, 429, origin);
    let payload;
    try { payload = await request.json(); } catch { return json({ error: 'Invalid request' }, 400, origin); }
    const inquiry = parseInquiry(payload);
    if (!inquiry) return json({ error: 'Please check the required fields and try again.' }, 400, origin);
    if (inquiry.spam) return json({ ok: true }, 200, origin);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify(buildEmail(inquiry, env)),
    });
    if (!response.ok) return json({ error: 'Unable to send the inquiry right now.' }, 502, origin);
    return json({ ok: true }, 202, origin);
  },
};
