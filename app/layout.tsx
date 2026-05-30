import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Aluminium, Glass & Fabrication Experts in Palanpur, Gujarat`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    title: `${site.name} | Premium Aluminium & Glass Solutions`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Premium Aluminium & Glass Solutions`,
    description: site.description,
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#06121f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  image: `${site.url}/og.jpg`,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHours: "Mo-Sa 09:00-20:00",
  areaServed: "Gujarat",
  makesOffer: site.keywords.map((k) => ({ "@type": "Offer", name: k })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
