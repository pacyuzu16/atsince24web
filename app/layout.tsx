import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://atsince24.com"),
  title: {
    default: "@Since24 - Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
    template: "%s | atSince24",
  },
  description:
    "@Since24 supplies and installs solar water heaters, water pumps, and automatic gate openers (gate motors) for homes and businesses in Kigali and across Rwanda. Energy efficient, durable, with professional installation.",
  keywords: [
    "solar water heater Rwanda",
    "solar water heater Kigali",
    "solar water heater price Rwanda",
    "water pump Rwanda",
    "water booster pump Rwanda",
    "submersible borehole pump Rwanda",
    "water pump price Rwanda",
    "gate motor Rwanda",
    "automatic gate opener Rwanda",
    "sliding gate motor Rwanda",
    "swing gate motor Rwanda",
    "gate motor Kigali",
    "installation services Rwanda",
    "professional installation Rwanda",
    "Kigali",
    "Rwanda",
  ],
  authors: [{ name: "@Since24", url: "https://atsince24.com" }],
  creator: "@Since24",
  publisher: "@Since24",
  category: "Technology",
  classification: "Electronic Appliances & Installation Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atsince24.com",
    title: "@Since24 - Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
    description: "Leading supplier and installer of solar water heaters, water pumps, and automatic gate openers (gate motors) in Kigali and across Rwanda.",
    siteName: "@Since24 - The Art of Simple Life",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "@Since24 - Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
        type: "image/jpeg",
      },
      {
        url: "/images/since24.png",
        width: 800,
        height: 600,
        alt: "@Since24 Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "@Since24 - Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
    description: "Leading supplier and installer of solar water heaters, water pumps, and automatic gate openers (gate motors) in Kigali and across Rwanda.",
    images: ["/images/og-image.jpg"],
    creator: "@since24",
    site: "@since24",
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
  // verification: {
  //   google: "", // Add your Google Search Console verification code here
  //   yandex: "", // Add your Yandex verification code here (optional)
  //   bing: "",   // Add your Bing Webmaster verification code here (optional)
  // },
  alternates: {
    canonical: "https://atsince24.com",
    languages: {
      "en-US": "https://atsince24.com",
      "en": "https://atsince24.com",
    },
  },
  other: {
    "geo.region": "RW",
    "geo.placename": "Rwanda",
    "geo.position": "-1.9441;30.0619", // Kigali coordinates
    "ICBM": "-1.9441, 30.0619",
    "DC.title": "@Since24 - The Art of Simple Life",
    "DC.creator": "@Since24",
    "DC.subject": "Electronic Appliances, Installation Services, Rwanda",
    "DC.description": "Solar water heaters, water pumps, and gate motors supplied and installed in Rwanda",
    "DC.publisher": "@Since24",
    "DC.contributor": "@Since24",
    "DC.date": "2025",
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://atsince24.com",
    "DC.language": "en",
    "DC.coverage": "Rwanda",
    "DC.rights": "Copyright @Since24 2025",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <meta name="theme-color" content="#0a1f56" />
        <meta name="msapplication-TileColor" content="#0a1f56" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="@Since24" />
        <meta name="application-name" content="@Since24" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "@Since24",
              "alternateName": "Since24",
              "url": "https://atsince24.com",
              "logo": "https://atsince24.com/images/logo.png",
              "description": "Solar water heaters, water pumps, and gate motors supplied and installed in Rwanda",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "RW",
                "addressRegion": "Kigali"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "atsince24@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/ATSINCE24",
                "https://www.instagram.com/atsince24",
                "https://x.com/Since24_Ltd"
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "Rwanda"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Solar Water Heaters, Water Pumps & Gate Motors",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Solar Water Heater",
                      "description": "Eco-friendly solar water heating with pressurized and non-pressurized options"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Water Pump",
                      "description": "Surface, booster, and submersible borehole pumps for strong, steady water pressure"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Automatic Gate Opener (Gate Motor)",
                      "description": "Gate motors and automatic openers for sliding and swing gates"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
