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

## Pending before publish (from briefing)

- Apply official brand manual (logo SVG, colors, fonts) → `tokens.css` + Header/Footer wordmark.
- Contact form (see "Contact form" section below): set the env vars in Vercel (Brevo key + Turnstile keys from engineering), publish the Firewall rate-limit rule on `/api/contact`, allowlist the office IP, send a real test.
- Legal pages: `/privacy`, `/cookies`, `/es/privacidad`, `/es/cookies` — copy the exact current legal text (EN + ES).
- Funding & grants: real program logos + official wording in `Funding.astro`.
- OG image at `public/og-image.jpg`.
- Confirm: Company/Phone optional vs required; legal company name for footer; whether "tile" stays or becomes "cerámica" in ES; social profile URLs; sitemap/robots.

## Contact form

Same system as the Magna Cerámica project (full docs in that repo under `docs/forms/`). The form in `src/components/Contact.astro` posts `FormData` to `src/pages/api/contact.ts` (`prerender = false`, runs as a Vercel function via `@astrojs/vercel`; all pages stay static). `src/form.config.ts` reads recipients/sender/subject from env vars; `.env.example` documents them. Recipient is `FORM_TO` (default `sales@xanasystem.com`) and is never in the HTML.

Security layers (do **not** remove any):

- **Turnstile** (Cloudflare) + **honeypot** (`company` field, must be empty) + **two-layer validation** (client UX in the component, server is the source of truth in the endpoint — same rules). Required: `email`, `message`, `privacy`; optional: `name`, `phone`, `region`, `country`.
- **Secrets** (`BREVO_API_KEY`, `TURNSTILE_SECRET_KEY`) live only in Vercel env vars; `.env` is gitignored. Only `PUBLIC_TURNSTILE_SITE_KEY` reaches the browser.
- **Vercel Firewall rate limit** on `/api/contact`: 5 requests / 10 min, Fixed Window, keyed by IP, Deny (persistent). Office IP allowlisted with an Allow rule ordered **above** it. Configured in the Vercel dashboard, not in code.

Email goes through Brevo's JSON API from the shared verified domain `forms.xanasystem.com` (DKIM set up). A `200`/`ok` means Brevo accepted the call, not that the mail was delivered — trace via Brevo transactional logs (`messageId` is logged). Adding a field means editing three places: the `<input>` + client rule, the server read/validate/`escapeHtml`, and the email `htmlContent`.

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
