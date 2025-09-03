// Site Configuration Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface MainNavItem extends NavItem {
  description?: string;
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[];
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  features?: string[];
  pricing?: {
    starting: number;
    currency: string;
  };
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
  timeline?: string;
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  url?: string;
  featured?: boolean;
}