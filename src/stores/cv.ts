import { defineStore } from 'pinia'

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  techStack: string[];
}

export interface UserProfile {
  name: string;
  title: string;
  summary: string;
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
      '--color-text-secondary': '#a38da3',
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
      title: 'Front-end Developer',
      summary: 'Senior Front-end Developer with over a decade of professional experience specializing in Vue, ES6, and Pinia to build high-performance, scalable applications. Expert in architecting Design Systems and custom components from Figma using HTML, Sass, BEM and practicing Atomic Design making use of both vibe coding and traditional JS.'
    },
    sidebar: [
      {
        title: 'Contact',
        icon: 'mail',
        items: [
          { label: 'Email', value: 'braisva@gmail.com' },
          { label: 'LinkedIn', value: 'linkedin.com/in/braisvazquez' },
          { label: 'GitHub', value: 'github.com/mad-js-dev' },
          { label: 'Location', value: 'Spain' },
        ]
      },
      {
        title: 'Skills',
        icon: 'cpu',
        items: [
          { label: 'Core', value: 'Vue 3, TypeScript, Pinia, ES6+' },
          { label: 'Styling', value: 'Tailwind CSS, SASS, BEM' },
          { label: 'Tools', value: 'Git, Figma, Vite, Vitest' },
          { label: 'Other', value: 'REST APIs, Agile/Scrum, AEM' },
        ]
      },
      {
        title: 'Education',
        icon: 'graduation',
        items: [
          { label: 'Degree', value: 'Engineering in Computer Science' },
          { label: 'Specialization', value: 'Front-end Architecture' },
        ]
      }
    ],
    experiences: [
      {
        id: 'exp1',
        period: 'July 2024 – October 2024',
        company: 'Luxsoft / Inditex',
        role: 'Front-end Developer',
        description: 'Developed and maintained critical user interface components for a large-scale enterprise ERP system at Inditex, one of the world\'s leading fashion retailers. Collaborated within multidisciplinary teams using Scrum to deliver high-quality features in a Vue 3 and TypeScript environment.',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp2',
        period: 'February 2024 – June 2024',
        company: 'KEAPPS / Worldline',
        role: 'Front-end Developer',
        description: 'Contributed to the front-end migration of a self-service ticketing application for UK Railroads, upgrading the system from Vue 2 to Vue 3. Implemented a flexible, modular architecture using Atomic Design, allowing the application to be efficiently adapted for other digital kiosk markets, such as the food and beverage industry.',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp3',
        period: 'July 2019 – September 2022',
        company: 'Netcentric',
        role: 'Front-end Developer / Team Lead',
        description: 'Front-end Developer at Netcentric, delivering complex, multi-language SPAs for a diverse portfolio of global clients, including market leaders such as Siemens and Allianz. Utilized the Adobe Experience Manager (AEM) platform to create intuitive interfaces for content authors, and stepped in as acting Team Lead during key project phases to ensure development continuity and team coordination.',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'Pinia', 'AEM', 'SASS', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Figma']
      },
      {
        id: 'exp4',
        period: 'April 2013 – March 2015',
        company: '3ASide',
        role: 'Front-end Developer',
        description: 'Collaborated on the development of an MVP for a job-publishing tool (ATS) integrated with an ASP.NET MVC platform. Focused on transforming complex Figma designs into responsive, high-fidelity user interfaces, ensuring a seamless transition from design to a functional product.',
        techStack: ['ASP.NET MVC', 'HTML5', 'JS', 'REST APIs', 'SASS (BEM)', 'Figma', 'jQuery']
      },
      {
        id: 'exp5',
        period: 'May 2015 – January 2018',
        company: 'Altran',
        role: 'Front-end Developer',
        description: 'Delivered diverse front-end solutions across multiple high-impact projects. Key achievements include contributing to a React-based MVP for a prestigious national bookselling company and developing scalable web solutions for a network of approximately 16 travel-focused websites. Additionally, analyzed and implemented comprehensive Design Systems and style guides for the Generalitat de Catalunya to ensure visual consistency across government digital services.',
        techStack: ['HTML5', 'React', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Atomic Design', 'JS', 'jQuery', 'Design Systems', 'Static Build']
      },
      {
        id: 'exp_book',
        period: 'January 2014 – March 2015',
        company: 'The Book of Everyone Bcn',
        role: 'Front-end Developer',
        description: 'Developed and optimized the front-end for a Barcelona-based startup specializing in the e-commerce production and distribution of personalized gift books. Implemented responsive user interfaces and managed the technical execution of high-conversion email marketing campaigns to drive customer acquisition and sales growth.',
        techStack: ['HTML5', 'Javascript (ES5)', 'jQuery', 'Sass', 'Static building', 'Emailing Campaigns']
      },
      {
        id: 'exp6',
        period: 'February 2011 – January 2012',
        company: 'Clickart SL',
        role: 'Front-end Developer',
        description: 'Developed a series of strategic microsites for publications under the PLANET group and contributed to the development of a specialized educational management system, supporting the organization across its two primary lines of business during a critical transition to proprietary CMS solutions.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'Bootstrap 2']
      },
      {
        id: 'exp7',
        period: 'May 2009 – March 2010',
        company: 'UNIPRENSA, S.A.',
        role: 'Front-end Developer',
        description: 'Managed and optimized the digital presence of Guia Ocio magazine, implementing organic SEO strategies that doubled monthly traffic from 20K to 40K visitors. Additionally, developed and integrated an internal advertising platform to monetize site traffic and support business growth.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'SEO', 'Google Analytics']
      },
      {
        id: 'exp8',
        period: 'January 2009 – April 2009',
        company: 'ADMEDIA STUDIO',
        role: 'Front-end Intern',
        description: 'Supported the development of a diverse range of promotional websites for an agency specializing in guerrilla marketing, focusing on creating high-impact visual experiences for varied client campaigns.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery']
      },
      {
        id: 'exp9',
        period: 'January 2007 – April 2008',
        company: 'PROMOWEBSITE',
        role: 'Front-end Intern',
        description: 'Created interactive digital assets and animated banners for a travel-promotion agency specializing in vacation rentals, focusing on enhancing user engagement through dynamic visual content.',
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