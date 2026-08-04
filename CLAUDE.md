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
- Wire the contact form to a real backend (set `<form action>` in `Contact.astro`); currently client-validates and simulates success.
- Legal pages: `/privacy`, `/cookies`, `/es/privacidad`, `/es/cookies` — copy the exact current legal text (EN + ES).
- Funding & grants: real program logos + official wording in `Funding.astro`.
- OG image at `public/og-image.jpg`.
- Confirm: Company/Phone optional vs required; legal company name for footer; whether "tile" stays or becomes "cerámica" in ES; social profile URLs; sitemap/robots.

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
