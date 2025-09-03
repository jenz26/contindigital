import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Contin Digital',
  description:
    'Agenzia digitale specializzata in sviluppo web, SEO, marketing digitale e consulenza tecnologica per PMI. Trasformiamo idee in soluzioni digitali innovative.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://contindigital.vercel.app',
  ogImage: '/images/og-image.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/company/contin-digital',
  },
};

export const navigationItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Servizi',
    href: '/servizi',
  },
  {
    title: 'Chi Siamo',
    href: '/chi-siamo',
  },
  {
    title: 'Portfolio',
    href: '/portfolio',
  },
  {
    title: 'Contatti',
    href: '/contatti',
  },
];

export const services = [
  {
    id: 'sviluppo-web',
    title: 'Sviluppo Web',
    description: 'Siti web moderni, responsive e ottimizzati per le performance',
    slug: 'sviluppo-web',
    icon: 'Code',
    features: [
      'Next.js & React',
      'TypeScript',
      'Responsive Design',
      'SEO Optimized',
      'Core Web Vitals',
    ],
    pricing: {
      starting: 2500,
      currency: 'EUR',
    },
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Marketing',
    description: 'Strategie SEO avanzate per aumentare la visibilità online',
    slug: 'seo-marketing',
    icon: 'TrendingUp',
    features: [
      'SEO Audit Completo',
      'Keyword Research',
      'Content Strategy',
      'Link Building',
      'Local SEO',
    ],
    pricing: {
      starting: 800,
      currency: 'EUR',
    },
  },
  {
    id: 'consulenza-digitale',
    title: 'Consulenza Digitale',
    description: 'Supporto strategico per la trasformazione digitale',
    slug: 'consulenza-digitale',
    icon: 'Lightbulb',
    features: [
      'Digital Strategy',
      'Technology Audit',
      'Process Optimization',
      'Training & Support',
      'Growth Planning',
    ],
    pricing: {
      starting: 150,
      currency: 'EUR',
    },
  },
];