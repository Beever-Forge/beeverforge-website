# BeeverForge website

Three complete preview directions for the BeeverForge marketing site:

- `/v1/` — institutional clarity and buying decisions
- `/v2/` — product workflow and interactive stage explorer
- `/v3/` — strategy, portfolio and architecture narrative

This is a dependency-free static site. Generate the English previews with `node scripts/build-previews.mjs`, then serve the repository root with `python -m http.server 8765`. Open `http://localhost:8765/v1/`, `/v2/` or `/v3/`.

The generator shares product copy, the capability matrix, workflow steps and metadata. `assets/previews.css` gives each version its own composition; `assets/previews.js` handles navigation and the V2 explorer. The existing homepage contact form is reused with the same Cloudflare Worker endpoint, fields and `assets/site.js` submission logic. On localhost, the live Worker rejects the origin by design; the form works when served on the allowlisted public domain. A mailto fallback is available in every preview.

Each preview has `noindex,follow`, its own canonical and Open Graph URL, and is absent from `sitemap.xml`. The existing public homepage and deployment workflow remain unchanged. That workflow copies only the root and assets to GitHub Pages; pushing this review branch does not publish the previews. The domain was shown as active with SSL in Hostinger hPanel on October 18, 2026, but that does not establish Hostinger as the web host.

See [PRODUCT_MATRIX.md](PRODUCT_MATRIX.md) for sources and availability, and [REVIEW.md](REVIEW.md) for local checks.

## After choosing a direction

1. Confirm the preferred version and the actual availability of Enterprise capabilities.
2. Move the chosen composition to `/`, update the root canonical and social metadata, and include only the root in the public sitemap. Remove the comparison routes or retain them as `noindex` previews; redirect removed routes to `/`.
3. Test the reused contact form from the deployed origin, then verify DNS, HTTPS and direct routes before allowing indexation.
4. Inventory equivalent `openfactory.digital` URLs and plan their redirects separately. Changing the former domain requires authorization.

## Brand assets

Approved BeeverForge master assets are in `assets/`. The wordmark is official vector artwork and must not be recreated as text.

## Deployment

The site can be published with GitHub Pages or another static hosting provider. GitHub stores the code; the service serving the files is the host. Hostinger currently administers the domain. Publishing to the main domain, changing DNS and replacing the public homepage require approval of the selected version.
