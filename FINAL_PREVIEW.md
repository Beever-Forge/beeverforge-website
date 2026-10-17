# Final BeeverForge website — release record

The final dark website was published at `https://beeverforge.com/` through pull request #4 and GitHub Pages deployment run `39079362850` on October 18, 2026. The root is indexable with a self canonical and Open Graph URL. The sitemap lists only `/`. V1 and V2 are `noindex` client-side redirects to the root; GitHub Pages does not provide HTTP 301 redirects through this static artifact. The old OpenFactory domain was not changed.

## Product sources and availability

- V1 supplied the editorial content, comparison, FAQ and conversion foundation. The previous homepage supplied the connected product lifecycle narrative and stage outputs.
- Community claims derive from the open `openfactory-core` README and `docs/STATUS.md` reviewed during the preceding versions. Adapters, checks and policies still depend on each installation's configuration.
- On October 18, 2026, the product owner confirmed that Enterprise is commercially available and that SSO, RBAC, Prototype Builder, Portfolio Manager, Virtual Architect and BeeverForge support are all available. This is an owner confirmation; this website review did not independently test the private Enterprise implementation. No protocol, hosting mode or SLA is claimed.
- The existing Cloudflare Worker endpoint and `assets/site.js` submission logic are reused. No new live inquiry was sent during this release review.

## Design

The site uses official SVG brand artwork, graphite `#1F1F24`, restrained gold `#D4A24C` and Helvetica Neue/Helvetica/Arial support typography. It has no off-white section backgrounds. The eight-stage lifecycle is always visible and follows V1's editorial buying path rather than V2's tabbed layout. Screenshots are in `review/final-desktop.png`, `review/final-mobile.png` and the first-screen companion images.

## Verification

Local Chromium checks at 1440 × 900 and 390 × 844 passed for direct access, reload, anchors, images, mobile navigation, reduced motion, no horizontal overflow and no script errors. The form reached the thank-you page using a mocked 202 response; no live inquiry was sent. All four existing Cloudflare Worker tests passed.

After deployment, HTTPS root access and reload returned 200 in desktop and mobile Chromium. The final stylesheet and images loaded, the root metadata was correct, V1/V2 reached the root, and the thank-you route was available. A read-only Worker CORS preflight from `https://beeverforge.com` returned 204 with the expected allowed origin. This verifies browser permission to call the endpoint, not actual email delivery from the new page.

Local unthrottled browser `load` measured 57 ms on desktop and 50 ms on mobile, with 45,162 transferred bytes and five requests in each run. These are laboratory observations on localhost, not Lighthouse scores or real-user data. Sampled contrast ratios were 16.41:1 for white on graphite, 11.11:1 for muted text on graphite and 7.09:1 for gold on graphite; these samples are not a full accessibility audit.
