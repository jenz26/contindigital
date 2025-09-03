import { AnalyticsEvent } from '@/types';

// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Microsoft Clarity
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Google Analytics Events
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common tracking events
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

export const trackContactForm = (formType: string) => {
  trackEvent({
    action: 'form_submit',
    category: 'contact',
    label: formType,
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent({
    action: 'service_view',
    category: 'engagement',
    label: serviceName,
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
  });
};

export const trackExternalLink = (url: string) => {
  trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: url,
  });
};

// Microsoft Clarity setup
export const initClarity = () => {
  if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function(c: any, l: Document, a: string, r: string, i: string) {
      // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-explicit-any
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement; 
      t.async = true; 
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0]; 
      y.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }
};

// Declare gtag types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity: (...args: any[]) => void;
  }
}