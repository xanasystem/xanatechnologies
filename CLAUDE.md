# Xana Technologies — Landing

Bilingual corporate landing (EN default / ES) for `xanatechnologies.com`, built
with Astro (static). Xana Technologies is presented as a technology startup and
umbrella of two brands: **Xana System** (product tech → xanasystem.com) and
**Woman on Mars** (digital strategy → womanonmars.com), plus a **Custom
Solutions** route that leads to the corporate contact form.

## Project structure

- `src/i18n/content.ts` — all bilingual copy + metadata (source: briefing docs 01–03). Single source of truth for text.
- `src/styles/tokens.css` — **the swappable identity layer** (colors, type, spacing). Values are PLACEHOLDERS until the brand manual is applied. Change only this file to re-skin.
- `src/styles/global.css` — reset, base type, shared utilities/buttons.
- `src/layouts/Base.astro` — `<head>`, SEO (canonical, hreflang, OG, JSON-LD Organization + WebSite), header/footer, reveal-on-scroll.
- `src/components/` — one component per content block: Hero, Ecosystem, Brands (Xana System + Woman on Mars, equal weight), Numbers, Industry, CustomSolutions, SpainUsa, Contact, Funding, Header, Footer, Landing (composes all).
- `src/pages/index.astro` (EN, `/`) and `src/pages/es/index.astro` (ES, `/es/`).
- `src/layouts/Legal.astro` + `src/pages/{legal-notice,privacy-policy,cookies-policy}.astro` and `src/pages/es/{aviso-legal,politica-de-privacidad,politica-de-cookies}.astro` — legal pages. Routes are centralised in `LEGAL_ROUTES` (`content.ts`).
- `src/components/CookieConsent.astro` — cookie wall / privacy preferences + GTM loader (consent-gated).

## Go-live status (2026-09-09)

Done in the repo (follows the Xana "Protocolo de publicación estándar"):

- Legal pages: `/legal-notice/`, `/privacy-policy/`, `/cookies-policy/` and `/es/aviso-legal/`, `/es/politica-de-privacidad/`, `/es/politica-de-cookies/` (`src/layouts/Legal.astro`, `noindex, follow`, own hreflang). Aviso Legal + Cookies carried over from the old WordPress site; Privacy rewritten to the protocol's GDPR template (the WP one was CMS boilerplate) and keeps the App Catalog Platform deletion policy. Legal identity lives in `COMPANY` in `content.ts`.
- Cookie wall + "Privacy Preferences" (`src/components/CookieConsent.astro`, vanilla-cookieconsent, same as Magna Cerámica). GTM `PUBLIC_GTM_ID` (default `GTM-NFJ2KXRX`, the old site's container; its GA4 is `G-FWMNKS93QR`) loads only after the Tracking category is accepted; Consent Mode v2 defaults denied. Footer links open the modal via `data-cc="show-preferencesModal"`.
- Footer: 4 legal links + grant statements (IVACE/FEDER, XPANDE DIGITAL) with white (negative) logo strips in `public/img/funding/`, built by `node scripts/make-funding-strips.mjs` from the official assets in `scripts/funding-src/` (EU emblem WHITE from the Commission download center, Generalitat white from labora.gva.es, IVACE+i / Hacienda / Fondos Europeos / Cámara recoloured). Wording in `content.ts → funding.programs` (ES verbatim from the old footer, EN translated). Note IVACE uses its current IVACE+i mark, not the pre-2024 one of the old strip.
- SEO: `@astrojs/sitemap` (`/sitemap-index.xml`, legal + `/v2/` excluded), `public/robots.txt`, `public/og-image.jpg` (regenerate with `node scripts/make-og-image.mjs`), per-page title/description via `Base` props.
- 301s from every URL of the old WordPress sitemap in `astro.config.mjs`; `scripts/fix-redirect-slashes.mjs` runs after `astro build` so `/old-url/` (trailing slash) also matches. Vercel builds with `npm run build` (`vercel.json`).
- Kit Consulting page archived (unpublished) in `docs/archive/kit-consulting/`; `/kit-consulting/` → `/es/`.

Still pending (needs the user / third parties):

- Form env vars are all set in Vercel (`BREVO_API_KEY`, Turnstile keys, `FORM_*` with `FORM_FROM_EMAIL=no-reply@xanatechnologies.com`, `PUBLIC_GTM_ID`). Firewall rate limit on `/api/contact` + office IP allowlist still to confirm in the dashboard.
- Domain: add `xanatechnologies.com` + `www` to the Vercel project from the dashboard (CLI returned `domain_not_owned`: needs the TXT verification or the domain is attached to another Vercel account), then at DonDominio: A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`. Canonical is without `www`.
- Real form test EN + ES once keys are in; Search Console: submit `sitemap-index.xml`.
- Official brand manual (logo SVG, colors, fonts) → `tokens.css`; confirm "tile" vs "cerámica" in ES.

## Contact form

Same system as the Magna Cerámica project (full docs in that repo under `docs/forms/`). The form in `src/components/Contact.astro` posts `FormData` to `src/pages/api/contact.ts` (`prerender = false`, runs as a Vercel function via `@astrojs/vercel`; all pages stay static). `src/form.config.ts` reads recipients/sender/subject from env vars; `.env.example` documents them. Recipient is `FORM_TO` (default `sales@xanasystem.com`) and is never in the HTML.

Security layers (do **not** remove any):

- **Turnstile** (Cloudflare) + **honeypot** (`company` field, must be empty) + **two-layer validation** (client UX in the component, server is the source of truth in the endpoint — same rules). Required: `email`, `message`, `privacy`; optional: `name`, `phone`, `region`, `country`.
- **Secrets** (`BREVO_API_KEY`, `TURNSTILE_SECRET_KEY`) live only in Vercel env vars; `.env` is gitignored. Only `PUBLIC_TURNSTILE_SITE_KEY` reaches the browser.
- **Vercel Firewall rate limit** on `/api/contact`: 5 requests / 10 min, Fixed Window, keyed by IP, Deny (persistent). Office IP allowlisted with an Allow rule ordered **above** it. Configured in the Vercel dashboard, not in code.

Email goes through Brevo's JSON API. **Sender is `no-reply@xanatechnologies.com`** (`FORM_FROM_EMAIL`): the Brevo account in use has `xanatechnologies.com` authenticated (DKIM) but does *not* contain the shared `forms.xanasystem.com` domain the Magna docs assume — sending from it is rejected ("sender not valid"). A `200`/`ok` means Brevo accepted the call, not that the mail was delivered — trace via Brevo transactional logs (`messageId` is logged). The notification template is `renderNotificationEmail()` in `contact.ts` (table layout, inline styles; header `#0c182b` with centred white logo, no eyebrow/accent rules, gradient CTA like `.cta--grad`; logo loaded from the deployed site, override with `FORM_LOGO_URL`). Adding a field means editing three places: the `<input>` + client rule, the server read/validate/`escapeHtml`, and the email template.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
