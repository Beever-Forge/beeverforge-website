# Final dark design preview

The static preview is at `/final-preview/` in this branch. Serve the repository root locally and open that path. The public homepage, V1, V2, GitHub Pages workflow, DNS and sitemap are unchanged. The preview is `noindex` and is not included in the public deployment artifact.

## Product sources and availability

- The V1 editorial content and capability matrix provide the content foundation. The current homepage provides the connected product lifecycle narrative and stage outputs.
- Community statements are grounded in the open `openfactory-core` README and `docs/STATUS.md` reviewed for the preceding versions. Integration and checks still depend on setup and project policy.
- On October 18, 2026, the product owner confirmed that Enterprise is available commercially and that SSO, RBAC, Prototype Builder, Portfolio Manager, Virtual Architect and BeeverForge support are all available. This is an owner statement; this website review does not independently test the private Enterprise implementation. No protocols, hosting mode or SLA are claimed.
- The existing Cloudflare Worker form endpoint and `assets/site.js` submission logic are reused. The Worker accepts the public BeeverForge origins, not localhost. Local form testing uses a mocked response and sends no inquiry.

## Visual direction

The design uses the approved graphite `#1F1F24`, official SVG wordmark, Helvetica Neue/Helvetica/Arial support typography and restrained gold `#D4A24C`. There are no off-white section backgrounds. V1's editorial buying path is retained. The lifecycle is an eight-stage, always-visible diagram rather than V2's tabbed explorer.

## Local review

Chromium checks passed at 1440 × 900 and 390 × 844: direct access and reload returned 200, one `h1`, working anchors and images, no horizontal page overflow or script errors. The mobile menu opened and closed by button and Escape. The page honors reduced motion. The existing form completed its thank-you redirect with a mocked 202 response; no live inquiry was sent. All four existing Cloudflare Worker tests passed. Screenshots are in `review/final-desktop.png`, `review/final-mobile.png` and their first-screen companions.

Local, unthrottled browser navigation measured `load` at 57 ms on desktop and 50 ms on mobile, with 45,162 transferred bytes and five requests in each run. These are laboratory observations on localhost, not Lighthouse scores or real-user data. Sampled contrast ratios were 16.41:1 for white text on graphite, 11.11:1 for muted text on graphite and 7.09:1 for gold on graphite. These samples do not replace a full accessibility audit.

## Before publishing at the root

After visual approval, adapt this page for `/`: change the brand link to `/`, set `robots` to indexable, add the root canonical and `og:url`, remove preview copy, and make `scripts/build.mjs` generate the approved page so the Pages workflow cannot overwrite it. Update `sitemap.xml` and decide redirects or continued `noindex` treatment for V1 and V2. Test the live form from the public domain and verify the published root before treating the release as complete.
