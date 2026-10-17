# BeeverForge contact worker

The public site posts Enterprise inquiries to this Cloudflare Worker. The worker validates the request, limits repeat submissions and uses Resend server-side. The Resend API key must be stored as the Worker secret `RESEND_API_KEY`; it is never committed or sent to a browser.

Deployment requires a logged-in Cloudflare account and a verified `send.beeverforge.com` domain in Resend:

```sh
npx wrangler secret put RESEND_API_KEY
npx wrangler deploy
```

After deployment, copy the Worker URL ending in `/contact` to `contactEndpoint` in `scripts/build.mjs`, run `node scripts/build.mjs`, then publish the site.
