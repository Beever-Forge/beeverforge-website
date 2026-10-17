# BeeverForge website

The English V1 is published at `/v1/`. It presents the Community core, the Enterprise direction, a capability matrix, the planned workflow, and the same inquiry form used on the existing homepage. The V1 uses a white base and cool neutral surfaces.

The GitHub Pages workflow publishes the existing root, shared assets, thank-you page and `/v1/`. The root is preserved. `/v1/` remains `noindex` and absent from the sitemap while it lives alongside the existing homepage.

To preview locally, serve the repository root with any static HTTP server and open `/v1/`. The Cloudflare Worker permits submissions from `beeverforge.com` and `www.beeverforge.com`; it intentionally rejects localhost.

## Brand assets

Approved BeeverForge master assets are kept in `assets/`. The wordmark is supplied as the approved vector artwork and must not be recreated as text.

## Deployment

The site is ready for GitHub Pages or any static hosting provider. Publish the repository root as the web root and point `beeverforge.com` to the hosting provider. HTTPS must be enabled before the canonical, Open Graph and sitemap URLs are indexed.
