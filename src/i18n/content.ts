// -----------------------------------------------------------------------------
// Bilingual content for the Xana Technologies corporate landing.
// English is the reference version for brand voice; Spanish is a natural
// adaptation (not a literal translation). Both locales keep the same numbers,
// destinations, consents and legal messages. Source: briefing docs 01–03.
// -----------------------------------------------------------------------------

export type Locale = 'en' | 'es';

export const locales: Locale[] = ['en', 'es'];

export const XANA_SYSTEM_URL = 'https://xanasystem.com';
export const WOMAN_ON_MARS_URL = 'https://womanonmars.com';
/** Company page linked from the previous xanatechnologies.com footer. */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/xanasystem/';

/** Legal identity (from the current Aviso Legal). Used by the legal pages. */
export const COMPANY = {
  legalName: 'Xana Technologies SL',
  taxId: 'B02903169',
  address: 'C/ Bélgica 135, bajo, 12006 Castellón, España',
  addressEn: 'C/ Bélgica 135, ground floor, 12006 Castellón, Spain',
  email: 'info@xanatechnologies.com',
  website: 'https://xanatechnologies.com',
};

/** Routes of the legal pages per locale (EN at root, ES under /es/). */
export const LEGAL_ROUTES: Record<Locale, { legal: string; privacy: string; cookies: string }> = {
  en: { legal: '/legal-notice/', privacy: '/privacy-policy/', cookies: '/cookies-policy/' },
  es: { legal: '/es/aviso-legal/', privacy: '/es/politica-de-privacidad/', cookies: '/es/politica-de-cookies/' },
};

/** One brand card (Figma node 80:567). `paragraphs` may carry **bold** spans. */
export interface BrandCopy {
  label: string;
  h2: string;
  text: string;
  /** Gradient subtitle inside the card. */
  tagline: string;
  /** Body paragraphs; `**text**` renders as <strong>. */
  paragraphs: string[];
  /** Bold closing line. */
  closing: string;
  cta: string;
  externalLabel: string;
}

export interface SiteContent {
  meta: {
    lang: string;
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    sections: { id: string; label: string }[];
    languageLabel: string; // aria-label for the language switcher
    skipToContent: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    support: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollCue: string;
    loaderLabel: string;
    /** Short line under the logo in the hero (Figma: "DIGITAL ACCELERATION"). */
    tagline: string;
  };
  ecosystem: {
    h2: string;
    text: string;
    /** Pinned statement (Figma node 83:585): line 1 plain, line 2 gradient,
     *  then a second beat: supporting paragraph + bold closing line.
     *  `body` may carry **bold** spans; `closing` may carry _italic_ spans. */
    statement: { line1: string; line2: string; body: string; closing: string };
  };
  /** Brands section header (Figma node 80:567). */
  brands: {
    headline1: string;
    headline2: string;
    intro: string;
  };
  xanaSystem: BrandCopy;
  womanOnMars: BrandCopy;
  numbers: {
    h2: string;
    metrics: { value: string; label: string }[];
  };
  industry: {
    label: string;
    h2: string;
    cards: { title: string; text: string }[];
    stats: { value: string; label: string }[];
    channelsPill: string;
    channels: string[];
  };
  customSolutions: {
    label: string;
    h2: string;
    text: string;
    cta: string;
  };
  spainUsa: {
    h2: string;
    text: string;
  };
  contact: {
    label: string;
    h2: string;
    text: string;
    /** Where the company operates; shown in the footer brand block. */
    tagline: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      region: string;
      country: string;
      message: string;
    };
    optionalHelper: string;
    submit: string;
    privacyConsent: string;
    marketingConsent: string;
    stateSending: string;
    stateSuccess: string;
    stateError: string;
    stateRateLimited: string;
    errors: {
      required: string;
      email: string;
      phone: string;
      privacy: string;
      verification: string;
    };
  };
  funding: {
    h2: string;
    intro: string;
    /** Official grant statements shown in the footer, each with its logo strip. */
    programs: { logo: string; alt: string; text: string }[];
  };
  footer: {
    /** Closing statement band above the link columns (Figma node 88:802):
     *  small eyebrow, bold headline (a `**span**` carries the brand gradient),
     *  light sub-line. */
    statement: { eyebrow: string; headline: string; sub: string };
    linksTitle: string;
    contactTitle: string;
    /** Label of the highlighted contact button in the footer. */
    contactButton: string;
    legalTitle: string;
    legalLinks: { label: string; href: string }[];
    /** Opens the cookie-consent preferences modal (vanilla-cookieconsent). */
    privacyPreferences: string;
    copyright: string;
    languageSwitch: string;
  };
}

export const content: Record<Locale, SiteContent> = {
  // ---------------------------------------------------------------------------
  // ENGLISH — reference version
  // ---------------------------------------------------------------------------
  en: {
    meta: {
      lang: 'en',
      title: 'Xana Technologies | Product Technology & Digital Strategy',
      description:
        'Xana Technologies is the technology startup behind Xana System and Woman on Mars, connecting product technology, digital strategy, AI, design, and development.',
      ogLocale: 'en_US',
    },
    nav: {
      sections: [
        { id: 'brands', label: 'Brands' },
        { id: 'contact', label: 'Contact' },
      ],
      languageLabel: 'Select language',
      skipToContent: 'Skip to content',
    },
    hero: {
      eyebrow: 'XANA TECHNOLOGIES · SPAIN — USA',
      h1: 'Product technology and digital strategy, connected.',
      support:
        'Xana Technologies is the technology startup behind Xana System and Woman on Mars. Two specialized brands connecting product data, digital platforms, strategy, marketing, automation, AI, design, and development.',
      ctaPrimary: 'Explore Xana System',
      ctaSecondary: 'Discover Woman on Mars',
      scrollCue: 'Explore',
      loaderLabel: 'Connecting systems',
      tagline: 'Digital acceleration',
    },
    ecosystem: {
      h2: 'One startup. Two specialized brands.',
      text: 'Xana System provides the product technology. Woman on Mars brings strategy and digital execution. Xana Technologies connects both when a challenge requires more than one answer.',
      statement: {
        line1: 'Technology should make things',
        line2: 'simpler, faster and easier.',
        body:
          'And it works best when it supports strategy and marketing. We create technology-driven solutions built around your business strategy to reduce complexity, make everyday work easier and help your company move forward faster.',
        closing: 'That’s what Digital Acceleration means to us.',
      },
    },
    brands: {
      headline1: 'Different Challenges.',
      headline2: 'Two ways to approach them',
      intro:
        'Not every challenge calls for the same solution. That’s why we take two different approaches.',
    },
    xanaSystem: {
      label: 'PRODUCT TECHNOLOGY',
      h2: 'Xana System',
      text: 'A product platform combining Product Information Management (PIM) and Digital Asset Management (DAM) to organize, enrich, and publish product content across digital catalogs, catalog apps, and B2B systems.',
      tagline: 'Product Enrichment + Speed to Market',
      paragraphs: [
        'Manage and enrich **product information and digital assets** to transform basic data into complete, visual and market-ready product content.',
        'Publish your product content to **any channel or platform**. And when speed matters, our own **web and app catalogs** let you go live faster, with everything seamlessly synchronized.',
      ],
      closing: 'Manage in one place. Publish everywhere. Always up to date.',
      cta: 'Xana System',
      externalLabel: 'Opens xanasystem.com',
    },
    womanOnMars: {
      label: 'STRATEGY & DIGITAL EXECUTION',
      h2: 'Woman on Mars',
      text: 'A digital strategy and marketing brand for companies that need clearer positioning, stronger communication, automation, AI-powered content, business applications, web and app design, and custom digital solutions.',
      tagline: 'Strategy + Innovation + Marketing',
      paragraphs: [
        'We define the strategy and use **innovation, AI and technology** to explore smarter ways to bring products to market, connect with customers and support sales.',
        'We apply emerging technologies to marketing with a clear commercial focus, **turning ideas into action and accelerating time to market.**',
      ],
      closing: 'Woman on Mars. Where marketing meets technology.',
      cta: 'Woman on Mars',
      externalLabel: 'Opens womanonmars.com',
    },
    numbers: {
      h2: 'Experience, measured in real work.',
      metrics: [
        { value: '50+', label: 'Clients' },
        { value: '10,000+', label: 'Products Managed' },
        { value: '100+', label: 'Projects' },
      ],
    },
    industry: {
      label: 'INDUSTRY EXPERTISE',
      h2: 'Built for tile, stone & interior design.',
      cards: [
        {
          title: 'Complex catalogs, organized',
          text: 'Product content structured, enriched, and ready to publish.',
        },
        {
          title: 'One product, every channel',
          text: 'Published in sync across web catalogs, apps, and B2B systems.',
        },
      ],
      stats: [
        { value: '10.000+', label: 'products' },
        { value: '50+', label: 'collections' },
      ],
      channelsPill: '6+ channels',
      channels: [
        'Web catalog', 'Catalog app', 'B2B portal', 'Marketplace',
        'PDF datasheet', 'ERP / PIM sync', 'Mobile app', 'Print catalog',
      ],
    },
    customSolutions: {
      label: 'CUSTOM SOLUTIONS',
      h2: 'One challenge. The right combination of expertise.',
      text: 'Xana Technologies evaluates each project and defines the best route: Xana System, Woman on Mars, a combination of both, or an independent custom development.',
      cta: 'Discuss a Custom Solution',
    },
    spainUsa: {
      h2: 'Spain — USA',
      text: 'Based in Spain, with commercial presence and clients in the United States. We combine local knowledge with an international approach to product, strategy, and digital delivery.',
    },
    contact: {
      label: 'CONTACT',
      h2: "Tell us what you're working on.",
      text: "Share your project with us. We'll help you find the right way to accelerate it.",
      tagline: 'Based in Spain and the U.S. Serving clients worldwide.',
      fields: {
        name: 'Full name',
        company: 'Company',
        email: 'Email',
        phone: 'Phone',
        region: 'Region',
        country: 'Country',
        message: 'How can we help?',
      },
      optionalHelper: 'Optional',
      submit: 'Send message',
      privacyConsent: 'I have read and accept the Privacy Policy.',
      marketingConsent:
        'I would like to receive occasional news and updates from Xana Technologies.',
      stateSending: 'Sending your message…',
      stateSuccess:
        "Thank you. We've received your message and will route it to the right team.",
      stateError:
        "We couldn't send your message. Please check the highlighted fields and try again.",
      stateRateLimited: 'Too many requests. Please wait a few minutes and try again.',
      errors: {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        phone: 'Enter a valid phone number.',
        privacy: 'You must accept the Privacy Policy to continue.',
        verification: 'Please complete the anti-bot verification.',
      },
    },
    funding: {
      h2: 'Funding & Institutional Support',
      intro:
        'Xana Technologies has participated in the following programs and initiatives.',
      programs: [
        {
          logo: '/img/funding/ivace-feder.webp',
          alt: 'Generalitat Valenciana · IVACE · Funded by the European Union',
          text:
            'Project "Applying Artificial Intelligence to improve data quality in a centralised product and digital catalogue management system", funded by Ivace through the SME innovation programme (INNOVA TeiC-CV), file number IMINOK/2023/52, and co-funded by the European Union through the European Regional Development Fund (ERDF).',
        },
        {
          logo: '/img/funding/xpande-feder.jpg',
          alt: 'Co-funded by the European Union · Ministerio de Hacienda · Fondos Europeos · Cámara de Comercio de España',
          text:
            'XANA TECHNOLOGIES SOCIEDAD LIMITADA has benefited from European Funds aimed at strengthening the sustainable growth and competitiveness of SMEs, under which it has launched an Action Plan to improve its competitiveness through digital transformation, online promotion and e-commerce in international markets during 2025-2026. It has done so with the support of the XPANDE DIGITAL Programme of the Castellón Chamber of Commerce. #EuropaSeSiente',
        },
      ],
    },
    footer: {
      statement: {
        eyebrow: 'Based in Spain and the U.S. Serving clients worldwide.',
        headline: '**15+ years of experience** built into how we think.',
        sub: 'Still curious.',
      },
      linksTitle: 'Links',
      contactTitle: 'Contact',
      contactButton: 'Contact',
      legalTitle: 'Legal',
      legalLinks: [
        { label: 'Privacy Policy', href: LEGAL_ROUTES.en.privacy },
        { label: 'Legal Notice', href: LEGAL_ROUTES.en.legal },
        { label: 'Cookies Policy', href: LEGAL_ROUTES.en.cookies },
      ],
      privacyPreferences: 'Privacy Preferences',
      copyright: 'Xana Technologies. All rights reserved.',
      languageSwitch: 'Español',
    },
  },

  // ---------------------------------------------------------------------------
  // SPANISH — natural adaptation
  // ---------------------------------------------------------------------------
  es: {
    meta: {
      lang: 'es',
      title: 'Xana Technologies | Tecnología de Producto y Estrategia Digital',
      description:
        'Xana Technologies es la startup tecnológica detrás de Xana System y Woman on Mars, conectando tecnología de producto, estrategia digital, IA, diseño y desarrollo.',
      ogLocale: 'es_ES',
    },
    nav: {
      sections: [
        { id: 'brands', label: 'Marcas' },
        { id: 'contact', label: 'Contacto' },
      ],
      languageLabel: 'Seleccionar idioma',
      skipToContent: 'Saltar al contenido',
    },
    hero: {
      eyebrow: 'XANA TECHNOLOGIES · SPAIN — USA',
      h1: 'Tecnología de producto y estrategia digital, conectadas.',
      support:
        'Xana Technologies es la startup tecnológica detrás de Xana System y Woman on Mars. Dos marcas especializadas que conectan datos de producto, plataformas digitales, estrategia, marketing, automatización, IA, diseño y desarrollo.',
      ctaPrimary: 'Descubre Xana System',
      ctaSecondary: 'Descubre Woman on Mars',
      scrollCue: 'Explora',
      loaderLabel: 'Conectando sistemas',
      tagline: 'Aceleración digital',
    },
    ecosystem: {
      h2: 'Una startup. Dos marcas especializadas.',
      text: 'Xana System aporta la tecnología de producto. Woman on Mars suma estrategia y ejecución digital. Xana Technologies conecta ambas capacidades cuando un reto necesita más de una respuesta.',
      statement: {
        line1: 'La tecnología debe hacer las cosas',
        line2: 'más sencillas, rápidas y fáciles.',
        body:
          'Y debe estar al servicio de la estrategia y el marketing. Creamos soluciones tecnológicas alineadas con tu estrategia de negocio para reducir la complejidad, facilitar el día a día y ayudar a tu empresa a avanzar más rápido.',
        closing: 'Eso es lo que significa para nosotros la _Aceleración Digital_.',
      },
    },
    brands: {
      headline1: 'Cada reto es único.',
      headline2: 'Dos maneras de abordarlo.',
      intro:
        'No todo requiere la misma solución. Por eso trabajamos desde dos enfoques diferentes.',
    },
    xanaSystem: {
      label: 'TECNOLOGÍA DE PRODUCTO',
      h2: 'Xana System',
      text: 'Una plataforma de producto que combina Product Information Management (PIM) y Digital Asset Management (DAM) para organizar, enriquecer y publicar contenido de producto en catálogos digitales, apps de catálogo y sistemas B2B.',
      tagline: 'Enriquecimiento de Producto + Speed to Market',
      paragraphs: [
        'Gestiona y enriquece **datos, imágenes, vídeos y otros activos digitales** para convertir información básica en contenido de producto completo, visual y preparado para vender.',
        'Publica en **cualquier canal o plataforma** o llega aún más rápido al mercado con nuestros propios **catálogos web y app**, siempre sincronizados con Xana System.',
      ],
      closing: 'Gestiona desde un solo lugar. Publica en múltiples canales. Siempre actualizado.',
      cta: 'Xana System',
      externalLabel: 'Abre xanasystem.com',
    },
    womanOnMars: {
      label: 'ESTRATEGIA Y EJECUCIÓN DIGITAL',
      h2: 'Woman on Mars',
      text: 'Una marca de estrategia y marketing digital para empresas que necesitan un posicionamiento más claro, una comunicación más sólida, automatización, contenidos con IA, aplicaciones de negocio, diseño web y app y soluciones digitales a medida.',
      tagline: 'Estrategia + Innovación + Marketing',
      paragraphs: [
        'Definimos la estrategia y, a partir de la **innovación, la IA y la tecnología**, exploramos nuevas formas de llevar productos al mercado, conectar con los clientes y apoyar las ventas.',
        'Aplicamos nuevas oportunidades tecnológicas al marketing con un claro enfoque comercial, **transformando ideas en acciones y acelerando la llegada al mercado.**',
      ],
      closing: 'Woman on Mars. Where marketing meets technology.',
      cta: 'Woman on Mars',
      externalLabel: 'Abre womanonmars.com',
    },
    numbers: {
      h2: 'Experiencia basada en trabajo real.',
      metrics: [
        { value: '50+', label: 'clientes' },
        { value: '10.000+', label: 'productos gestionados' },
        { value: '100+', label: 'proyectos' },
      ],
    },
    industry: {
      label: 'EXPERIENCIA SECTORIAL',
      h2: 'Hecho para tile, piedra y diseño de interiores.',
      cards: [
        {
          title: 'Catálogos complejos, ordenados',
          text: 'Contenido de producto estructurado, enriquecido y listo para publicar.',
        },
        {
          title: 'Un producto, todos los canales',
          text: 'Publicado y sincronizado en catálogos web, apps y sistemas B2B.',
        },
      ],
      stats: [
        { value: '10.000+', label: 'productos' },
        { value: '50+', label: 'colecciones' },
      ],
      channelsPill: '6+ canales',
      channels: [
        'Catálogo web', 'App de catálogo', 'Portal B2B', 'Marketplace',
        'Ficha PDF', 'Sync ERP / PIM', 'App móvil', 'Catálogo impreso',
      ],
    },
    customSolutions: {
      label: 'SOLUCIONES A MEDIDA',
      h2: 'Un reto. La combinación adecuada de capacidades.',
      text: 'Xana Technologies evalúa cada proyecto y define la mejor vía: Xana System, Woman on Mars, una combinación de ambas marcas o un desarrollo independiente a medida.',
      cta: 'Cuéntanos tu proyecto',
    },
    spainUsa: {
      h2: 'Spain — USA',
      text: 'Con base en España, presencia comercial y clientes en Estados Unidos. Combinamos conocimiento local con un enfoque internacional de producto, estrategia y ejecución digital.',
    },
    contact: {
      label: 'CONTACTO',
      h2: 'Cuéntanos qué te ronda por la cabeza.',
      text: 'Te ayudaremos a encontrar la mejor forma de acelerarlo.',
      tagline: 'Con base en España y EE. UU. Trabajamos con clientes en todo el mundo.',
      fields: {
        name: 'Nombre completo',
        company: 'Empresa',
        email: 'Email',
        phone: 'Teléfono',
        region: 'Región',
        country: 'País',
        message: '¿Cómo podemos ayudarte?',
      },
      optionalHelper: 'Opcional',
      submit: 'Enviar mensaje',
      privacyConsent: 'He leído y acepto la Política de Privacidad.',
      marketingConsent:
        'Quiero recibir ocasionalmente noticias y novedades de Xana Technologies.',
      stateSending: 'Enviando tu mensaje…',
      stateSuccess:
        'Gracias. Hemos recibido tu mensaje y lo dirigiremos al equipo adecuado.',
      stateError:
        'No hemos podido enviar tu mensaje. Revisa los campos indicados e inténtalo de nuevo.',
      stateRateLimited: 'Has enviado demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.',
      errors: {
        required: 'Este campo es obligatorio.',
        email: 'Introduce un email válido.',
        phone: 'Introduce un teléfono válido.',
        privacy: 'Debes aceptar la Política de Privacidad para continuar.',
        verification: 'Completa la verificación anti-bots.',
      },
    },
    funding: {
      h2: 'Ayudas y apoyo institucional',
      intro:
        'Xana Technologies ha participado en los siguientes programas e iniciativas.',
      // Official wording — copied verbatim from the previous xanatechnologies.com footer.
      programs: [
        {
          logo: '/img/funding/ivace-feder.webp',
          alt: 'Generalitat Valenciana · IVACE · Financiado por la Unión Europea',
          text:
            'Proyecto “Aplicación de Inteligencia Artificial para mejorar la calidad de los datos en un sistema de gestión centralizada de productos y catálogos digitales”, financiado por Ivace a través del programa innovación de Pyme (INNOVA TeiC-CV), con número de expediente IMINOK/2023/52 y cofinanciado por la unión europea a través del fondo europeo de desarrollo regional (Feder).',
        },
        {
          logo: '/img/funding/xpande-feder.jpg',
          alt: 'Cofinanciado por la Unión Europea · Ministerio de Hacienda · Fondos Europeos · Cámara de Comercio de España',
          text:
            'XANA TECHNOLOGIES SOCIEDAD LIMITADA ha sido beneficiaria de Fondos Europeos, cuyo objetivo es el refuerzo del crecimiento sostenible y la competitividad de las PYMES, y gracias al cual ha puesto en marcha un Plan de Acción con el objetivo de mejorar su competitividad mediante la transformación digital, la promoción online y el comercio electrónico en mercados internacionales durante el año 2025-2026. Para ello ha contado con el apoyo del Programa XPANDE DIGITAL de la Cámara de Comercio de Castellón. #EuropaSeSiente',
        },
      ],
    },
    footer: {
      statement: {
        eyebrow: 'Con presencia en España y Estados Unidos. Trabajamos con clientes en todo el mundo.',
        headline: 'Más de **15 años de experiencia** forman parte de nuestra manera de pensar.',
        sub: 'Y seguimos siendo curiosos e innovando.',
      },
      linksTitle: 'Enlaces',
      contactTitle: 'Contacto',
      contactButton: 'Contacto',
      legalTitle: 'Legal',
      legalLinks: [
        { label: 'Política de Privacidad', href: LEGAL_ROUTES.es.privacy },
        { label: 'Aviso Legal', href: LEGAL_ROUTES.es.legal },
        { label: 'Política de Cookies', href: LEGAL_ROUTES.es.cookies },
      ],
      privacyPreferences: 'Preferencias de privacidad',
      copyright: 'Xana Technologies. Todos los derechos reservados.',
      languageSwitch: 'English',
    },
  },
};
