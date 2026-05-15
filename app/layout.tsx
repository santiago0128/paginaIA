import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { brand } from "@/lib/config/brand";
import { env } from "@/lib/config/env";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const googleTagId = env.NEXT_PUBLIC_GTAG_ID?.trim() ?? env.NEXT_PUBLIC_GA_ID?.trim() ?? "GT-NF7FBTG9";
const googleAnalyticsMeasurementId =
  env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? env.NEXT_PUBLIC_GA_ID?.trim() ?? "G-DH48DHR7L6";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: brand.seo.defaultTitle,
    template: brand.seo.titleTemplate,
  },
  description: brand.seo.defaultDescription,
  keywords: [...brand.seo.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: brand.seo.defaultTitle,
    description: brand.seo.defaultDescription,
    url: brand.siteUrl,
    siteName: brand.name,
    locale: brand.locale,
    type: "website",
    images: [{ url: brand.seo.ogImage, width: 1200, height: 630, alt: brand.seo.defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.defaultTitle,
    description: brand.seo.defaultDescription,
    images: [brand.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={brand.locale} className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        {env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {(googleTagId || googleAnalyticsMeasurementId) && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');
gtag('config', '${googleAnalyticsMeasurementId}');`}
            </Script>
          </>
        )}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
