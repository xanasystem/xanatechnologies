// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Pages that must stay out of the sitemap: design variants (noindex) and the
// legal pages (noindex, follow — same policy as the Magna Cerámica site).
const NOINDEX = [
  '/v2/', '/es/v2/',
  '/legal-notice/', '/privacy-policy/', '/cookies-policy/',
  '/es/aviso-legal/', '/es/politica-de-privacidad/', '/es/politica-de-cookies/',
];

// 301s from the previous WordPress site (page-sitemap.xml, 2026-09-09). The old
// site had Spanish at the root and English under /en/; the new one is the
// opposite. Product pages belong to Xana System now — sent to the ES/EN home.
const OLD_ES_PAGES = [
  '/xana-technologies', '/kit-consulting', '/soluciones-digital-merchandising',
  '/soluciones-inteligencia-artificial-old', '/soluciones-innovacion-ia',
  '/business-performance-aplications', '/product-manager-pim',
  '/portal-pedidos-b2b-commerce', '/catalogo-digital-web', '/catalogo-digital-app',
];
const OLD_EN_PAGES = [
  '/en/we-are-xana-technologies', '/en/artificial-inteligence-solutions-old',
  '/en/ai-innovation-solutions', '/en/digital-merchandising',
  '/en/business-performance-apps', '/en/pim-product-manager',
  '/en/orders-b2b-commerce', '/en/digital-web-catalog', '/en/app-digital-catalog',
];

/** @type {Record<string, import('astro').RedirectConfig>} */
const redirects = {
  '/en': '/',
  '/en/contact-us': '/#contact',
  '/contacto': '/es/#contact',
  '/en/legal-notice': '/legal-notice/',
  '/en/privacy-policy': '/privacy-policy/',
  '/en/cookies-policy': '/cookies-policy/',
  '/aviso-legal': '/es/aviso-legal/',
  '/politica-de-privacidad': '/es/politica-de-privacidad/',
  '/politica-de-cookies': '/es/politica-de-cookies/',
  ...Object.fromEntries(OLD_ES_PAGES.map((p) => [p, '/es/'])),
  ...Object.fromEntries(OLD_EN_PAGES.map((p) => [p, '/'])),
};

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

  redirects,

  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((p) => page.endsWith(p)),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
});
