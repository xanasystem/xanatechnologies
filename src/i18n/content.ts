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
  };
  ecosystem: {
    h2: string;
    text: string;
  };
  xanaSystem: {
    label: string;
    h2: string;
    text: string;
    cta: string;
    externalLabel: string;
  };
  womanOnMars: {
    label: string;
    h2: string;
    text: string;
    cta: string;
    externalLabel: string;
  };
  numbers: {
    h2: string;
    metrics: { value: string; label: string }[];
  };
  industry: {
    label: string;
    h2: string;
    text: string;
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
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
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
        { id: 'ecosystem', label: 'Ecosystem' },
        { id: 'xana-system', label: 'Xana System' },
        { id: 'woman-on-mars', label: 'Woman on Mars' },
        { id: 'expertise', label: 'Expertise' },
        { id: 'custom-solutions', label: 'Custom Solutions' },
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
    },
    ecosystem: {
      h2: 'One startup. Two specialized brands.',
      text: 'Xana System provides the product technology. Woman on Mars brings strategy and digital execution. Xana Technologies connects both when a challenge requires more than one answer.',
    },
    xanaSystem: {
      label: 'PRODUCT TECHNOLOGY',
      h2: 'Xana System',
      text: 'A product platform combining Product Information Management (PIM) and Digital Asset Management (DAM) to organize, enrich, and publish product content across digital catalogs, catalog apps, and B2B systems.',
      cta: 'Explore Xana System',
      externalLabel: 'Opens xanasystem.com',
    },
    womanOnMars: {
      label: 'STRATEGY & DIGITAL EXECUTION',
      h2: 'Woman on Mars',
      text: 'A digital strategy and marketing brand for companies that need clearer positioning, stronger communication, automation, AI-powered content, business applications, web and app design, and custom digital solutions.',
      cta: 'Discover Woman on Mars',
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
      h2: 'Product launch specialists for the tile, stone, and interior design industries.',
      text: 'We understand complex catalogs, visual products, technical data, multichannel distribution, and the pressure to bring new collections to market with accuracy.',
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
      fields: {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
      },
      optionalHelper: 'Optional.',
      submit: 'Send Message',
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
        { id: 'ecosystem', label: 'Ecosistema' },
        { id: 'xana-system', label: 'Xana System' },
        { id: 'woman-on-mars', label: 'Woman on Mars' },
        { id: 'expertise', label: 'Experiencia' },
        { id: 'custom-solutions', label: 'Soluciones a medida' },
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
    },
    ecosystem: {
      h2: 'Una startup. Dos marcas especializadas.',
      text: 'Xana System aporta la tecnología de producto. Woman on Mars suma estrategia y ejecución digital. Xana Technologies conecta ambas capacidades cuando un reto necesita más de una respuesta.',
    },
    xanaSystem: {
      label: 'TECNOLOGÍA DE PRODUCTO',
      h2: 'Xana System',
      text: 'Una plataforma de producto que combina Product Information Management (PIM) y Digital Asset Management (DAM) para organizar, enriquecer y publicar contenido de producto en catálogos digitales, apps de catálogo y sistemas B2B.',
      cta: 'Descubre Xana System',
      externalLabel: 'Abre xanasystem.com',
    },
    womanOnMars: {
      label: 'ESTRATEGIA Y EJECUCIÓN DIGITAL',
      h2: 'Woman on Mars',
      text: 'Una marca de estrategia y marketing digital para empresas que necesitan un posicionamiento más claro, una comunicación más sólida, automatización, contenidos con IA, aplicaciones de negocio, diseño web y app y soluciones digitales a medida.',
      cta: 'Descubre Woman on Mars',
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
      h2: 'Especialistas en lanzamientos de producto para los sectores del tile, la piedra y el diseño de interiores.',
      text: 'Entendemos los catálogos complejos, el producto visual, los datos técnicos, la distribución multicanal y la precisión necesaria para lanzar nuevas colecciones al mercado.',
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
      fields: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Email',
        phone: 'Teléfono',
        message: 'Mensaje',
      },
      optionalHelper: 'Opcional.',
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
      legalLinks: [
        { label: 'Política de Privacidad', href: '/es/privacidad' },
        { label: 'Política de Cookies', href: '/es/cookies' },
      ],
      copyright: 'Xana Technologies. Todos los derechos reservados.',
      languageSwitch: 'English',
    },
  },
};
