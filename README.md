# BeeverForge website

The production website at [beeverforge.com](https://beeverforge.com/) has complete static pages in English (`/`), Spanish (`/es/`) and Brazilian Portuguese (`/pt/`). The approved vector identity, Community/Enterprise comparison, connected product lifecycle, FAQs and existing Enterprise inquiry form are shared across languages. Visitors can switch between dark and light modes; the choice is stored locally.

## Build

Edit the English editorial source in `final-preview/index.html` and its Spanish/Portuguese equivalents in `scripts/translations.tsv`. Run `node scripts/build.mjs` to generate all publishable pages, localized confirmation pages, retired-concept redirects and the sitemap. A local static server can serve the repository root for review. The source preview remains `noindex` and is not deployed.

The translation file has three tab-separated columns: exact English source text, Spanish, Portuguese. The build keeps the same semantic page structure across languages. Shared scripts and styles live in `assets/`.

## Contact

The form uses the existing Cloudflare Worker endpoint and Resend configuration. The Worker secret is not stored in this repository. The public Worker accepts `beeverforge.com` and `www.beeverforge.com` origins; localhost is intentionally excluded. Local form tests must mock the network response. The visible confirmation page appears only after an HTTP success response. The English, Spanish and Portuguese forms share the same fields, validation and endpoint.

Google Analytics 4 uses measurement ID `G-JH25XRDJHG`. The tag loads only after a visitor accepts analytics cookies; visitors can reject or change their choice through Cookie settings in the footer. A successful Enterprise inquiry is counted as a `generate_lead` event only when analytics consent has been granted.

## Hosting

GitHub holds the code and GitHub Pages serves the static website through `.github/workflows/deploy-pages.yml` on `main`. Hostinger administers the domain; no DNS change is needed for this release. The retired `/v1/` and `/v2/` routes redirect to `/` with `noindex`. The original OpenFactory domain has not been changed.

See [RELEASE.md](RELEASE.md) for verification and product-claim notes.
