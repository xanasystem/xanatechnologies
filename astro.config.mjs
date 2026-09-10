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

// 301s from the previous WordPress site (page-sitemap.xml + SEO sheet
// "XT26_XanaTechnologies_Redirecciones_301", 2026-09-10). The old site had
// Spanish at the root and English under /en/; the new one is the opposite.
// Product pages belong to Xana System now and go to xanasystem.com.
// Catalog pages will live at xanasystem.com/catalogos, which does not exist
// yet: point them at the Xana System home (ES or EN, matching the old page's
// language) until the new site ships.
const XANASYSTEM_PIM = 'https://xanasystem.com/product-manager-pim/';
const XANASYSTEM_CATALOGS_ES = 'https://xanasystem.com/es';
const XANASYSTEM_CATALOGS_EN = 'https://xanasystem.com/';

const OLD_ES_PAGES_TO_HOME = [
  '/somos-xana-technologies', '/xana-technologies',
  '/business-performance-aplications', '/soluciones-b2b-performance-applications',
  '/soluciones-innovacion-ia', '/soluciones-inteligencia-artificial',
  '/soluciones-inteligencia-artificial-old', '/implantacion-inteligencia-artificial',
  '/innovacion-aceleracion-digital', '/transformacion-digital', '/desarrollo-a-medida',
  '/kit-consulting',
];
const OLD_EN_PAGES_TO_HOME = [
  '/en', '/en/we-are-xana-technologies',
  '/en/business-performance-apps', '/en/ai-innovation-solutions',
  '/en/artificial-intelligence-solutions', '/en/artificial-inteligence-solutions',
  '/en/artificial-inteligence-solutions-old',
];
const OLD_PAGES_TO_XANASYSTEM_PIM = ['/product-manager-pim', '/en/pim-product-manager'];
const OLD_ES_PAGES_TO_XANASYSTEM_CATALOGS = [
  '/catalogo-digital-web', '/catalogo-digital-app', '/soluciones-digital-merchandising',
  '/digital-merchandising', '/portal-pedidos-b2b-commerce', '/b2b-commerce',
];
const OLD_EN_PAGES_TO_XANASYSTEM_CATALOGS = [
  '/en/digital-web-catalog', '/en/app-digital-catalog', '/en/orders-b2b-commerce',
  '/en/digital-merchandising',
];

// NOTE: Astro strips trailing slashes from redirect sources, so the generated
// Vercel rules only match `/kit-consulting`, while WordPress linked
// `/kit-consulting/`. `scripts/fix-redirect-slashes.mjs` (run after
// `astro build`, see package.json) makes every 301 rule accept both forms.
/** @type {Record<string, import('astro').RedirectConfig>} */
const redirects = {
  '/contacto': '/es/#contact',
  '/en/contact-us': '/#contact',
  '/en/legal-notice': '/legal-notice/',
  '/en/privacy-policy': '/privacy-policy/',
  '/en/cookies-policy': '/cookies-policy/',
  '/aviso-legal': '/es/aviso-legal/',
  '/politica-privacidad': '/es/politica-de-privacidad/',
  '/politica-de-privacidad': '/es/politica-de-privacidad/',
  '/politica-de-cookies': '/es/politica-de-cookies/',
  ...Object.fromEntries(OLD_ES_PAGES_TO_HOME.map((p) => [p, '/es/'])),
  ...Object.fromEntries(OLD_EN_PAGES_TO_HOME.map((p) => [p, '/'])),
  ...Object.fromEntries(OLD_PAGES_TO_XANASYSTEM_PIM.map((p) => [p, XANASYSTEM_PIM])),
  ...Object.fromEntries(OLD_ES_PAGES_TO_XANASYSTEM_CATALOGS.map((p) => [p, XANASYSTEM_CATALOGS_ES])),
  ...Object.fromEntries(OLD_EN_PAGES_TO_XANASYSTEM_CATALOGS.map((p) => [p, XANASYSTEM_CATALOGS_EN])),
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
