// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Vercel adapter: only `src/pages/api/contact.ts` (prerender = false) runs on
  // the server; every page is still prerendered as static HTML.
  adapter: vercel(),

  // Production domain — used for canonical URLs, hreflang, sitemap and OG tags.
  site: 'https://xanatechnologies.com',

  // Bilingual routing: English is the default language (served at "/"),
  // Spanish is served under "/es/". English URLs are not prefixed.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
