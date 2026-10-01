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
  items: { label: string; value: string }[];
}

export const useCvStore = defineStore('cv', {
  state: () => ({
    profile: {
      name: 'Brais Vázquez',
      title: 'Front-end Developer',
      summary: 'Senior Front-end Developer with over a decade of professional experience specializing in Vue, ES6, and Pinia to build high-performance, scalable applications. Expert in architecting Design Systems and custom components from Figma using HTML, Sass, BEM and practicing Atomic Design making use of both vibe coding and traditional JS.'
    },
    sidebar: [
      {
        title: 'Contact',
        items: [
          { label: 'Email', value: 'braisva@gmail.com' },
          { label: 'LinkedIn', value: 'linkedin.com/in/braisvazquez' },
          { label: 'GitHub', value: 'github.com/mad-js-dev' },
          { label: 'Location', value: 'Spain' },
        ]
      },
      {
        title: 'Skills',
        items: [
          { label: 'Core', value: 'Vue 3, TypeScript, Pinia, ES6+' },
          { label: 'Styling', value: 'Tailwind CSS, SASS, BEM' },
          { label: 'Tools', value: 'Git, Figma, Vite, Vitest' },
          { label: 'Other', value: 'REST APIs, Agile/Scrum, AEM' },
        ]
      },
      {
        title: 'Education',
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
        description: 'Custom ERP system development for one of the largest apparel retailers in Spain. Development and maintenance of components in a Vue.js based environment. Worked in a multidisciplinary team under SCRUM methodologies.',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp2',
        period: 'February 2024 – June 2024',
        company: 'KEAPPS / Worldline',
        role: 'Front-end Developer',
        description: 'Self-service train ticket kiosk application development for UK Railroads. Multidisciplinary team under Kanban organization. Creation based on an old version of the app (migration from Vue 2 to 3) while keeping flexibility to adapt to other types of digital kiosks (ie. Fast food industry).',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Agile/Scrum', 'Figma']
      },
      {
        id: 'exp3',
        period: 'July 2019 – September 2022',
        company: 'Netcentric',
        role: 'Front-end Developer / Team Lead',
        description: 'SPA development around the Adobe Experience Manager (AEM) platform. Creation of complex interactive experiences that connected to the platform allows authors to modify or add information live. Multinational multi-language sites & CMS (AEM) creation for major players in their own markets like Siemens or Allianz.',
        techStack: ['HTML5', 'Vue 3', 'TypeScript', 'Pinia', 'AEM', 'SASS', 'BEM', 'Atomic Design', 'Git', 'REST APIs', 'Figma']
      },
      {
        id: 'exp4',
        period: 'April 2013 – March 2015',
        company: 'Asid',
        role: 'Front-end Developer',
        description: 'MVP for a b-pub publishing SP.NET tool platform integrate. Responsible for integrating layouts based on Figma designs.',
        techStack: ['ASP.NET MVC', 'HTML5', 'JS', 'REST APIs', 'SASS (BEM)', 'Figma', 'jQuery']
      },
      {
        id: 'exp5',
        period: 'May 2015 – January 2018',
        company: 'Altran',
        role: 'Front-end Developer',
        description: 'Served as a front-end developer for one of Spain\'s oldest bookselling companies, contributing to the development of a React-based MVP as part of a three-person team. Worked as a front-end developer within an outsourced multidisciplinary team for a company managing over 200 websites focused on travel solutions tailored to the Book of Every traveler audience. Analyzed and developed Design Systems and style guides for the Generalitat de Catalunya.',
        techStack: ['HTML5', 'React', 'Vue 3', 'TypeScript', 'SASS', 'BEM', 'Atomic Design', 'JS', 'jQuery', 'Design Systems', 'Static Build']
      },
      {
        id: 'exp6',
        period: 'February 2011 – January 2012',
        company: 'Clickart SL',
        role: 'Front-end Developer',
        description: 'Microsites development for publications for the PLANET group, as they were transitioning into a proprietary CMS.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'Bootstrap 2']
      },
      {
        id: 'exp7',
        period: 'May 2009 – March 2010',
        company: 'UNIPRENSA, S.A.',
        role: 'Front-end Developer',
        description: 'Web management & development improvements for Guia Ocio magazine, Organic SEO improvements duplicating visits from 20K to 40k monthly and inclusion of an internal ads platform for promoting the site business.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery', 'SEO', 'Google Analytics']
      },
      {
        id: 'exp8',
        period: 'January 2009 – April 2009',
        company: 'ADMEDIA STUDIO',
        role: 'Front-end Intern',
        description: 'Creation of websites for an agency specialized in Guerrilla marketing.',
        techStack: ['HTML4', 'CSS', 'JS', 'jQuery']
      },
      {
        id: 'exp9',
        period: 'January 2007 – April 2008',
        company: 'PROMOWEBSITE',
        role: 'Front-end Intern',
        description: 'Design and animation of banners for a company specialized on promoting cottage & country houses for vacations.',
        techStack: ['Adobe Flash', 'AS']
      }
    ]
  }),
})
