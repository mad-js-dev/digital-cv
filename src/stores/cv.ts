import { defineStore } from 'pinia'

export type Translation = {
  en: string;
  es: string;
  ca: string;
  [key: string]: string; // Index signature to allow dynamic language keys
};

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: Translation;
  description: Translation;
  techStack: string[];
}

export interface UserProfile {
  name: string;
  title: Translation;
  summary: Translation;
}

export interface SidebarSection {
  title: string; 
  icon: string;
  items: { label: string; value: string }[];
}

interface Palette {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export const PALETTES: Record<string, Palette> = {
  midnight: {
    light: {
      '--color-bg-page': '#f1f5f9',
      '--color-bg-main': '#f8fafc',
      '--color-bg-sidebar': '#2c3e50',
      '--color-text-primary': '#0f172a',
      '--color-text-secondary': '#475569',
      '--color-accent': '#e67e22',
    },
    dark: {
      '--color-bg-page': '#0f172a',
      '--color-bg-main': '#1e293b',
      '--color-bg-sidebar': '#0f172a',
      '--color-text-primary': '#e2e8f0',
      '--color-text-secondary': '#94a3b8',
      '--color-accent': '#f97316',
    },
  },
  forest: {
    light: {
      '--color-bg-page': '#f0f4f0',
      '--color-bg-main': '#f9fdf9',
      '--color-bg-sidebar': '#2d3a2d',
      '--color-text-primary': '#1a2e1a',
      '--color-text-secondary': '#4a634a',
      '--color-accent': '#c5a059',
    },
    dark: {
      '--color-bg-page': '#0a140a',
      '--color-bg-main': '#142214',
      '--color-bg-sidebar': '#0a140a',
      '--color-text-primary': '#d1dcd1',
      '--color-text-secondary': '#8a9d8a',
      '--color-accent': '#e5c17a',
    },
  },
  sunset: {
    light: {
      '--color-bg-page': '#fdf8f8',
      '--color-bg-main': '#fffafa',
      '--color-bg-sidebar': '#3b2d3d',
      '--color-text-primary': '#2d1b2d',
      '--color-text-secondary': '#6b536b',
      '--color-accent': '#ff7f50',
    },
    dark: {
      '--color-bg-page': '#1a0f1a',
      '--color-bg-main': '#2d1b2d',
      '--color-bg-sidebar': '#1a0f1a',
      '--color-text-primary': '#f5e6f5',
      '--color-text-secondary': '#a38da1',
      '--color-accent': '#ff9a7b',
    },
  },
  monochrome: {
    light: {
      '--color-bg-page': '#f5f5f5',
      '--color-bg-main': '#ffffff',
      '--color-bg-sidebar': '#1a1a1a',
      '--color-text-primary': '#000000',
      '--color-text-secondary': '#666666',
      '--color-accent': '#3b82f6',
    },
    dark: {
      '--color-bg-page': '#000000',
      '--color-bg-main': '#111111',
      '--color-bg-sidebar': '#000000',
      '--color-text-primary': '#eeeeee',
      '--color-text-secondary': '#888888',
      '--color-accent': '#60a5fa',
    },
  },
}

export const useCvStore = defineStore('cv', {
  state: () => ({
    themeName: (localStorage.getItem('themeName') as string) || 'midnight',
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    profile: {
      name: 'Brais Vázquez',
      title: { 
        en: 'Front-end Developer',
        es: 'Desarrollador Front-end',
        ca: 'Desenvolupador Front-end'
      },
      summary: {
        en: 'Senior Front-end Developer with over a decade of professional experience specializing in Vue, ES6, and Pinia to build high-performance, scalable applications. Expert in architecting Design Systems and custom components from Figma using HTML, Sass, BEM and practicing Atomic Design making use of both vibe coding and traditional JS.',
        es: 'Desarrollador Front-end Senior con más de una década de experiencia profesional especializado en Vue, ES6 y Pinia para crear aplicaciones escalables y de alto rendimiento. Experto en la arquitectura de Sistemas de Diseño y componentes personalizados desde Figma utilizando HTML, Sass, BEM y practicando el Diseño Atómico.',
        ca: 'Desenvolupador Front-end Senior amb més d\'una dècada d\'experiència professional especialitzat en Vue, ES6 i Pinia per crear aplicacions escalables i d\'alt rendiment. Expert en l\'arquitectura de Sistemes de Disseny i components personalitzats des de Figma utilitzant HTML, Sass, BEM i practicant el Disseny Atòmic.'
      }
    },
    sidebar: [
      {
        title: 'contact',
        icon: 'mail',
        items: [
          { label: 'email', value: 'braisva@gmail.com' },
          { label: 'linkedin', value: 'linkedin.com/in/braisvazquez' },
          { label: 'github', value: 'github.com/mad-js-dev' },
          { label: 'location', value: 'Spain' },
        ]
      },
      {
        title: 'skills',
        icon: 'cpu',
        items: [
          { label: 'core', value: 'Vue 3, TypeScript, Pinia, ES6+' },
          { label: 'styling', value: 'Tailwind CSS, SASS, BEM' },
          { label: 'tools', value: 'Git, Figma, Vite, Vitest' },
          { label: 'other', value: 'REST APIs, Agile/Scrum, AEM' },
        ]
      },
      {
        title: 'education',
        icon: 'graduation',
        items: [
          { label: 'degree', value: 'Engineering in Computer Science' },
          { label: 'specialization', value: 'Front-end Architecture' },
        ]
      }
    ],
    experiences: [
      {
        id: 'exp1',
        period: 'July 2024 – October 2024',
        company: 'Luxsoft / Inditex',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Developed and maintained critical user interface components for a large-scale enterprise ERP system at Inditex, one of the world\'s leading fashion retailers. Collaborated within multidisciplinary teams using Scrum to deliver high-quality features in a Vue 3 and TypeScript environment.',
          es: 'Desarrollo y mantenimiento de componentes críticos de interfaz de usuario para un sistema ERP empresarial a gran escala en Inditex, uno de los minoristas de moda líderes en el mundo. Colaboración en equipos multidisciplinares bajo Scrum para entregar funcionalidades de alta calidad en un entorno Vue 3 y TypeScript.',
          ca: 'Desenvolupment i manteniment de components crítics de la interfície d\'usuari per a un sistema ERP empresarial a gran escala a Inditex, un dels minoristes de moda líders del món. Col·laboració en equips multidisciplinaris sota Scrum per lliurar funcionalitats d\'alta qualitat en un entorn Vue 3 i TypeScript.'
        },
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp2',
        period: 'February 2024 – June 2024',
        company: 'KEAPPS / Worldline',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Contributed to the front-end migration of a self-service ticketing application for UK Railroads, upgrading the system from Vue 2 to Vue 3. Implemented a flexible, modular architecture using Atomic Design, allowing the application to be efficiently adapted for other digital kiosk markets, such as the food and beverage industry.',
          es: 'Contribución a la migración front-end de una aplicación de venta de billetes autoservicio para UK Railroads, actualizando el sistema de Vue 2 a Vue 3. Implementación de una arquitectura modular y flexible basada en Diseño Atómico, permitiendo la adaptación eficiente de la aplicación a otros mercados de quioscos digitales, como la industria de alimentos y bebidas.',
          ca: 'Contribució a la migració front-end d\'una aplicació de venda de bitllets autoservici per a UK Railroads, actualitzant el sistema de Vue 2 a Vue 3. Implementació d\'una arquitectura modular i flexible basada en el Disseny Atòmic, permetent l\'adaptació eficient de l\'aplicació a altres mercats de quioscos digitals, com la indústria d\'aliments i begudes.'
        },
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp3',
        period: 'July 2019 – September 2022',
        company: 'Netcentric',
        role: { 
          en: 'Front-end Developer / Team Lead',
          es: 'Desarrollador Front-end / Team Lead',
          ca: 'Desenvolupador Front-end / Team Lead'
        },
        description: {
          en: 'Front-end Developer at Netcentric, delivering complex, multi-language SPAs for a diverse portfolio of global clients, including market leaders such as Siemens and Allianz. Utilized the Adobe Experience Manager (AEM) platform to create intuitive interfaces for content authors, and stepped in as acting Team Lead during key project phases to ensure development continuity and team coordination.',
          es: 'Desarrollador Front-end en Netcentric, entregando SPAs complejas y multi-idioma para una cartera diversa de clientes globales, incluyendo líderes de mercado como Siemens y Allianz. Uso de Adobe Experience Manager (AEM) para crear interfaces intuitivas para autores de contenido, y desempeño como Team Lead interino durante fases clave del proyecto para asegurar la continuidad del desarrollo y la coordinación del equipo.',
          ca: 'Desenvolupador Front-end a Netcentric, lliurant SPAs complexes i multi-idioma per a una cartera diversa de clients globals, inclosos líders de mercat com Siemens i Allianz. Ús d\'Adobe Experience Manager (AEM) per crear interfícies intuïtives per als autors de continguts, i intervingui com a Team Lead interí durant fases clau del projecte per assegurar la continuïtat del desenvolupment i la coordinació de l\'equip.'
        },
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'Pinia', 'AEM', 'SASS', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Figma']
      },
      {
        id: 'exp4',
        period: 'April 2013 – March 2015',
        company: '3ASide',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Collaborated on the development of an MVP for a job-publishing tool (ATS) integrated with an ASP.NET MVC platform. Focused on transforming complex Figma designs into responsive, high-fidelity user interfaces, ensuring a seamless transition from design to a functional product.',
          es: 'Colaboración en el desarrollo de un MVP para una herramienta de publicación de ofertas de empleo (ATS) integrada en una plataforma ASP.NET MVC. Enfoque en transformar diseños complejos de Figma en interfaces de usuario responsivas y de alta fidelidad, asegurando una transición fluida desde el diseño hasta el producto funcional.',
          ca: 'Col·laboració en el desenvolupment d\'un MVP per a una eina de publicació d\'ofertes de feina (ATS) integrada en una plataforma ASP.NET MVC. Enfoque en transformar dissenys complexos de Figma en interfícies d\'usuari responsives i d\'alta fidelitat, assegurant una transició fluida des del disseny fins al producte funcional.'
        },
        techStack: ['ASP.NET MVC', 'HTML5', 'JS', 'REST APIs', 'SASS (BEM)', 'Figma', 'jQuery']
      },
      {
        id: 'exp5',
        period: 'May 2015 – January 2018',
        company: 'Altran',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Delivered diverse front-end solutions across multiple high-impact projects. Key achievements include contributing to a React-based MVP for a prestigious national bookselling company and developing scalable web solutions for a network of approximately 16 travel-focused websites. Additionally, analyzed and implemented comprehensive Design Systems and style guides for the Generalitat de Catalunya to ensure visual consistency across government digital services.',
          es: 'Entrega de diversas soluciones front-end en múltiples proyectos de alto impacto. Logros clave incluyen la contribución a un MVP basado en React para una prestigiosa librería nacional y el desarrollo de solucione web escalables para una red de aproximadamente 16 sitios web enfocados en viajes. Además, análisis e implementación de Sistemas de Diseño y guías de estilo integrales para la Generalitat de Catalunya para asegurar la consistencia visual en los servicios digitales gubernamentales.',
          ca: 'Lliurament de diverses solucions front-end en múltiples projectes d\'alt impacte. Logs clau inclouen la contribució a un MVP basat en React per a una prestigiosa llibreria nacional i el desenvolupment de solucions web escalables per a una xarxa d\'aproximadament 16 webs enfocades en viatges. A més, anàlisi i implementació de Sistemes de Disseny i guies d\'estil integrals per a la Generalitat de Catalunya per assegurar la consistència visual en els serveis digitals governamentals.'
        },
        techStack: ['HTML5', 'React', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Atomic Design', 'JS', 'jQuery', 'Design Systems', 'Static Build']
      },
      {
        id: 'exp_book',
        period: 'January 2014 – March 2015',
        company: 'The Book of Everyone Bcn',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Developed and optimized the front-end for a Barcelona-based startup specializing in the e-commerce production and distribution of personalized gift books. Implemented responsive user interfaces and managed the technical execution of high-conversion email marketing campaigns to drive customer acquisition and sales growth.',
          es: 'Desarrollo y optimización del front-end para una startup basada en Barcelona especializada en la producción y distribución de libros de regalo personalizados. Implementación de interfaces de usuario responsivas y gestión de la ejecución técnica de campañas de email marketing de alta conversión para impulsar la adquisición de clientes y el crecimiento de las ventas.',
          ca: 'Desenvolupment i optimització del front-end per a una startup basada a Barcelona especialitzada en la producció i distribució d\'ecommerce de llibres de regal personalitzats. Implementació d\'interfícies d\'usuari responsives i gestió de l\'execució tècnica de campanyes d\'email marketing d\'alta conversió per impulsar l\'adquisició de clients i el creixment de les vendes.'
        },
        techStack: ['HTML5', 'Javascript (ES5)', 'jQuery', 'Sass', 'Static building', 'Emailing Campaigns']
      },
      {
        id: 'exp6',
        period: 'February 2011 – January 2012',
        company: 'Clickart SL',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Developed a series of strategic microsites for publications under the PLANET group and contributed to the development of a specialized educational management system, supporting the organization across its two primary lines of business during a critical transition to proprietary CMS solutions.',
          es: 'Desarrollo de una serie de micrositios estratégicos para publicaciones del grupo PLANET y contribución al desarrollo de un sistema de gestión educativa especializado, apoyando a la organización en sus dos líneas principales de negocio durante una transición crítica a soluciones de CMS propietarias.',
          ca: 'Desenvolupment d\'una sèrie de micrositios estratègics per a publicacions del grup PLANET i contribució al desenvolupment d\'un sistema de gestió educativa especialitzat, recolzant l\'organització en les seves dues línies principals de negoci durant una transició crítica a solucions de CMS propietàries.'
        },
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'Bootstrap 2']
      },
      {
        id: 'exp7',
        period: 'May 2009 – March 2010',
        company: 'UNIPRENSA, S.A.',
        role: { 
          en: 'Front-end Developer',
          es: 'Desarrollador Front-end',
          ca: 'Desenvolupador Front-end'
        },
        description: {
          en: 'Managed and optimized the digital presence of Guia Ocio magazine, implementing organic SEO strategies that doubled monthly traffic from 20K to 40K visitors. Additionally, developed and integrated an internal advertising platform to monetize site traffic and support business growth.',
          es: 'Gestión y optimización de la presencia digital de la revista Guia Ocio, implementando estrategias de SEO orgánico que duplicaron las visitas mensuales de 20K a 40K. Además, desarrollo e integración de una plataforma de anuncios interna para monetizar el tráfico del sitio y apoyar el crecimiento del negocio.',
          ca: 'Gestió i optimització de la presència digital de la revista Guia Ocio, implementant estratègies de SEO orgànic que han duplicat les visites mensuals de 20K a 40K. A més, desenvolupment i integració d\'una plataforma d\'anuncis interna per monetitzar el trànsit del lloc i recolzar el creixment del negoci.'
        },
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'SEO', 'Google Analytics']
      },
      {
        id: 'exp8',
        period: 'January 2009 – April 2009',
        company: 'ADMEDIA STUDIO',
        role: { 
          en: 'Front-end Intern',
          es: 'Becario Front-end',
          ca: 'Becari Front-end'
        },
        description: {
          en: 'Supported the development of a diverse range of promotional websites for an agency specializing in guerrilla marketing, focusing on creating high-impact visual experiences for varied client campaigns.',
          es: 'Soporte en el desarrollo de una gama diversa de sitios web promocionales para una agencia especializada en marketing de guerrilla, enfocándose en la creación de experiencias visuales de alto impacto para diversas campañas de clientes.',
          ca: 'Suport al desenvolupment d\'una gamma diversa de webs promocionals per a una agència especialitzada en marketing de guerrilla, enfocant-se en la creació d\'experiències visuals d\'alt impacte per a diverses campanyes de clients.'
        },
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery']
      },
      {
        id: 'exp9',
        period: 'January 2007 – April 2008',
        company: 'PROMOWEBSITE',
        role: { 
          en: 'Front-end Intern',
          es: 'Becario Front-end',
          ca: 'Becari Front-end'
        },
        description: {
          en: 'Created interactive digital assets and animated banners for a travel-promotion agency specializing in vacation rentals, focusing on enhancing user engagement through dynamic visual content.',
          es: 'Creación de activos digitales interactivos y banners animados para una agencia de promoción de viajes especializada en alquileres vacacionales, enfocándose en mejorar la interacción del usuario a través de contenido visual dinámico.',
          ca: 'Creació d\'actius digitals interactius i banners animats per a una agència de promoció de viatges especialitzada en lloguers vacacionals, enfocant-se en millorar la interacció de l\'usuari a través de contingut visual dinàmic.'
        },
        techStack: ['Adobe Flash', 'AS']
      }
    ]
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      this.applyTheme();
    },
    setThemeName(name: string) {
      this.themeName = name;
      localStorage.setItem('themeName', name);
      this.applyTheme();
    },
    applyTheme() {
      const palette = PALETTES[this.themeName][this.theme];
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
      
      Object.entries(palette).forEach(([variable, value]) => {
        document.documentElement.style.setProperty(variable, value);
      });
    }
  },
})