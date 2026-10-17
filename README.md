# BeeverForge website

The final dark design candidate is in `final-preview/` on branch `feat/final-dark-preview`. It is a local, non-indexable preview awaiting visual approval. This branch also prepares `index.html` and the matching thank-you page for the eventual root release; nothing changes on the public site until the draft PR is merged. See [FINAL_PREVIEW.md](FINAL_PREVIEW.md) for product-status evidence and release steps.

The English V1 and V2 are published at `/v1/` and `/v2/`. Both present the Community core, the Enterprise direction, a capability matrix, the planned workflow, and the same inquiry form used on the existing homepage. V1 uses a white base and cool neutral surfaces. V2 uses a predominantly graphite product interface.

The GitHub Pages workflow publishes the existing root, shared assets, thank-you page, `/v1/` and `/v2/`. The root is preserved. Both concept routes remain `noindex` and absent from the sitemap while they live alongside the existing homepage.

To preview locally, serve the repository root with any static HTTP server and open `/v1/` or `/v2/`. The Cloudflare Worker permits submissions from `beeverforge.com` and `www.beeverforge.com`; it intentionally rejects localhost.

## Brand assets

Approved BeeverForge master assets are kept in `assets/`. The wordmark is supplied as the approved vector artwork and must not be recreated as text.

## Deployment

The site is ready for GitHub Pages or any static hosting provider. Publish the repository root as the web root and point `beeverforge.com` to the hosting provider. HTTPS must be enabled before the canonical, Open Graph and sitemap URLs are indexed.
