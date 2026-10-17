# Preview review — October 18, 2026

## Sources

- Google Drive: `BeeverForge_Entrega_Final.md` and the consolidated Brand Guidelines v1 (PDF and text) were read. The manual confirms the brand decisions approved on October 17, 2026. The wordmark SVGs in this checkout match the official masters extracted in the workspace.
- Community: README and `docs/STATUS.md` from local `openfactory-core` commit `da345623` (October 13, 2026). STATUS describes a snapshot dated August 26, 2026. The previous OpenFactory website was also consulted. Enterprise claims are labeled according to the owner's brief.
- CastelloSoft was reviewed in the browser as a quality reference; its visual identity was not copied.
- Hostinger showed an active domain and SSL, but did not establish that Hostinger hosts this website. The repository has a GitHub Pages workflow for `main`.
- The attached Enterprise flow image was unavailable in this conversation and absent from `sources/`; the diagrams follow the detailed written sequence in the brief.

## Local checks

With a local static server, direct navigation and reload at `/v1/`, `/v2/` and `/v3/` returned HTTP 200 in Chromium at 1440 × 900 and 390 × 844. All six cases had one `h1`, no horizontal overflow, JavaScript errors, broken images or missing internal anchors. The mobile menu opened and closed with its button and Escape. The V2 stage explorer changed panels. Full screenshots are in `review/`.

The initial navigation `load` times measured on localhost, without CPU or network throttling, ranged from 29 to 76 ms across the six cases in the final run. Reported additional resource transfer was 38,951 B for V1 and V3 and 29,586 B for V2. These are local laboratory observations, not Lighthouse scores or real-user data.

Preview SEO: rendered HTML content, distinct titles and descriptions, `lang=en`, one `h1`, images with dimensions and alt text, `noindex,follow`, per-route canonicals and Open Graph URLs, and no preview URLs in the sitemap. `robots.txt` permits crawlers to read `noindex`. Structured data states only the organization and brand URL. The public root remains unchanged.

The existing homepage form and its Cloudflare/Resend configuration were reused in the previews. Resend showed a delivered test to `contact@beeverforge.com`, and the message was visible in the receiving mailbox on October 17, 2026. The V1 form submission and thank-you redirect passed with a mocked 202 response in the browser. A live submit from localhost is blocked by the Worker's public-origin allowlist. No new inquiry was sent during this review.

Pending: confirmation of SSO, RBAC and support availability; implementation and integration of Enterprise modules; choice of hosting and preferred concept; Lighthouse audit on a representative deployment; redirects from the previous domain. No DNS or public deployment was changed.
