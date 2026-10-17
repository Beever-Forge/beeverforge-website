# BeeverForge website

The final English website is published at [beeverforge.com](https://beeverforge.com/). It presents the available Community and Enterprise editions, the connected product lifecycle, a capability comparison, frequently asked questions and an Enterprise inquiry form.

The static source for the homepage is `final-preview/index.html`. `node scripts/build.mjs` produces the publishable `index.html` with the root canonical, Open Graph URL and indexable robots directive. The GitHub Pages workflow runs this build, then deploys the root, shared assets and thank-you page. The V1 and V2 routes are retained as `noindex` client-side redirects to `/`; they are not listed in `sitemap.xml`. The original OpenFactory domain has not been changed.

Serve the repository root with any static HTTP server for local development. The Cloudflare Worker contact endpoint accepts the public `beeverforge.com` and `www.beeverforge.com` origins; localhost is intentionally excluded. The Resend credential remains in the Worker secret store, not in this repository.

See [FINAL_PREVIEW.md](FINAL_PREVIEW.md) for design, product-status evidence and verification details.

## Brand assets

Approved BeeverForge SVG assets are in `assets/`. Preserve the official vector wordmark rather than recreating it as text.

## Hosting

GitHub holds the code; GitHub Pages serves the static website. Hostinger administers the domain. GitHub Pages HTTPS is enforced for `beeverforge.com`. The existing Cloudflare Worker handles form submissions independently of the static site.
