// -----------------------------------------------------------------------------
// Bilingual content for the Xana Technologies corporate landing.
// English is the reference version for brand voice; Spanish is a natural
// adaptation (not a literal translation). Both locales keep the same numbers,
// destinations, consents and legal messages. Source: briefing docs 01–03.
// -----------------------------------------------------------------------------

export type Locale = 'en' | 'es';

export const locales: Locale[] = ['en', 'es'];

export const XANA_SYSTEM_URL = 'https://xanasystem-web.vercel.app';
export const WOMAN_ON_MARS_URL = 'https://womanonmars.com';

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
     *  then a second beat: supporting paragraph + bold closing line. */
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
    /** Bold line under the intro (Figma): where the company operates. */
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
    errors: {
      required: string;
      email: string;
      privacy: string;
    };
  };
  funding: {
    h2: string;
    intro: string;
  };
  footer: {
    ctaEyebrow: string;
    ctaHeadline: string;
    ctaButton: string;
    brandsTitle: string;
    exploreTitle: string;
    legalTitle: string;
    customSolutionsLink: string;
    legalLinks: { label: string; href: string }[];
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
        'Not every challenge calls for the same solution. That’s why we approach Digital Acceleration in two different ways.',
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
        'We combine **strategy, innovation, marketing, AI and technology** to create smarter ways to bring products to market, connect with customers and support sales.',
        'We explore and apply new digital opportunities with a clear commercial focus: **turning ideas into action and bringing products closer to the market.**',
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
      text: "Share your challenge with Xana Technologies. We'll identify the right brand, product, team, or development path.",
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
      errors: {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        privacy: 'You must accept the Privacy Policy to continue.',
      },
    },
    funding: {
      h2: 'Funding & Institutional Support',
      intro:
        'Xana Technologies has participated in the following programs and initiatives.',
    },
    footer: {
      ctaEyebrow: "Let's work together",
      ctaHeadline: 'Have a challenge? Let’s find the right route.',
      ctaButton: 'Get in touch',
      brandsTitle: 'Brands',
      exploreTitle: 'Explore',
      legalTitle: 'Legal',
      customSolutionsLink: 'Custom Solutions',
      legalLinks: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookies Policy', href: '/cookies' },
      ],
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
        line1: 'La tecnología debería hacer las cosas',
        line2: 'más simples, rápidas y fáciles.',
        body:
          'Y funciona mejor cuando acompaña a la estrategia y al marketing. Creamos soluciones tecnológicas construidas alrededor de la estrategia de tu negocio para reducir la complejidad, facilitar el trabajo diario y ayudar a tu empresa a avanzar más rápido.',
        closing: 'Eso es lo que significa para nosotros la Aceleración Digital.',
      },
    },
    brands: {
      headline1: 'Retos distintos.',
      headline2: 'Dos formas de abordarlos',
      intro:
        'No todos los retos piden la misma solución. Por eso abordamos la Aceleración Digital de dos maneras distintas.',
    },
    xanaSystem: {
      label: 'TECNOLOGÍA DE PRODUCTO',
      h2: 'Xana System',
      text: 'Una plataforma de producto que combina Product Information Management (PIM) y Digital Asset Management (DAM) para organizar, enriquecer y publicar contenido de producto en catálogos digitales, apps de catálogo y sistemas B2B.',
      tagline: 'Enriquecimiento de producto + Velocidad al mercado',
      paragraphs: [
        'Gestiona y enriquece **la información de producto y los activos digitales** para convertir datos básicos en contenido de producto completo, visual y listo para el mercado.',
        'Publica tu contenido de producto en **cualquier canal o plataforma**. Y cuando la velocidad importa, nuestros propios **catálogos web y app** te permiten salir antes, con todo sincronizado.',
      ],
      closing: 'Gestiona en un solo lugar. Publica en todas partes. Siempre actualizado.',
      cta: 'Xana System',
      externalLabel: 'Abre xanasystem.com',
    },
    womanOnMars: {
      label: 'ESTRATEGIA Y EJECUCIÓN DIGITAL',
      h2: 'Woman on Mars',
      text: 'Una marca de estrategia y marketing digital para empresas que necesitan un posicionamiento más claro, una comunicación más sólida, automatización, contenidos con IA, aplicaciones de negocio, diseño web y app y soluciones digitales a medida.',
      tagline: 'Estrategia + Innovación + Marketing',
      paragraphs: [
        'Combinamos **estrategia, innovación, marketing, IA y tecnología** para crear formas más inteligentes de llevar productos al mercado, conectar con los clientes e impulsar las ventas.',
        'Exploramos y aplicamos nuevas oportunidades digitales con un enfoque comercial claro: **convertir ideas en acción y acercar los productos al mercado.**',
      ],
      closing: 'Woman on Mars. Donde el marketing se encuentra con la tecnología.',
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
      h2: 'Cuéntanos en qué estás trabajando.',
      text: 'Comparte tu reto con Xana Technologies. Identificaremos la marca, el producto, el equipo o la vía de desarrollo más adecuada.',
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
      errors: {
        required: 'Este campo es obligatorio.',
        email: 'Introduce un email válido.',
        privacy: 'Debes aceptar la Política de Privacidad para continuar.',
      },
    },
    funding: {
      h2: 'Ayudas y apoyo institucional',
      intro:
        'Xana Technologies ha participado en los siguientes programas e iniciativas.',
    },
    footer: {
      ctaEyebrow: 'Trabajemos juntos',
      ctaHeadline: '¿Tienes un reto? Encontremos la ruta adecuada.',
      ctaButton: 'Hablemos',
      brandsTitle: 'Marcas',
      exploreTitle: 'Explorar',
      legalTitle: 'Legal',
      customSolutionsLink: 'Soluciones a medida',
      legalLinks: [
        { label: 'Política de Privacidad', href: '/es/privacidad' },
        { label: 'Política de Cookies', href: '/es/cookies' },
      ],
      copyright: 'Xana Technologies. Todos los derechos reservados.',
      languageSwitch: 'English',
    },
  },
};
