import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_TRACKING_ID } from "@/lib/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Marco Contin Digital - Siti web veloci e automazioni per PMI",
    template: `%s | Marco Contin Digital`,
  },
  description: "Specialista digitale per PMI Veneto. Stack moderni React/Next.js, performance <2s, automazioni business. Approccio industriale al web. Badia Polesine, servizio Italia.",
  keywords: [
    "sviluppo web PMI",
    "siti web veloci",
    "automazioni business", 
    "React Next.js",
    "PMI Veneto",
    "sviluppatore Padova",
    "performance web",
    "Marco Contin",
    "consulenza digitale",
    "stack moderni",
  ],
  authors: [
    {
      name: "Contin Digital",
      url: siteConfig.url,
    },
  ],
  creator: "Contin Digital",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@contindigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
        {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
      </body>
    </html>
  );
}
