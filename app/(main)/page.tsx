import HeroCarousel from "@/components/hero-carousel"
import FeaturedProducts from "@/components/featured-products"
import WhyChooseUs from "@/components/why-choose-us"
import Cta from "@/components/cta"
import Testimonials from "@/components/testimonials"
import InstallationServices from "@/components/installation-services"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
  description: "@Since24 supplies and installs solar water heaters, water pumps (booster & submersible borehole), and automatic gate openers (gate motors) in Kigali and across Rwanda. Energy efficient, durable, with professional installation and after-sales support.",
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
    "Rwanda"
  ],
  openGraph: {
    title: "Solar Water Heaters, Water Pumps & Gate Motors in Rwanda | @Since24",
    description: "@Since24 supplies and installs solar water heaters, water pumps, and automatic gate openers (gate motors) in Kigali and across Rwanda.",
    url: "https://atsince24.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "@Since24 - Premium Electronic Appliances & Installation Services in Rwanda",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Water Heaters, Water Pumps & Gate Motors in Rwanda | @Since24",
    description: "@Since24 supplies and installs solar water heaters, water pumps, and automatic gate openers (gate motors) in Kigali and across Rwanda.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://atsince24.com",
  },
}

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Cta />
      <FeaturedProducts />
      <InstallationServices />
      <WhyChooseUs />
      <Testimonials />

      {/* Structured Data for Home Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "@Since24",
            "url": "https://atsince24.com",
            "description": "Premium electronic appliances and professional installation services in Rwanda",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://atsince24.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "@Since24",
            "description": "Premium electronic appliances and professional installation services in Rwanda",
            "url": "https://atsince24.com",
            "telephone": "+250-788-825-011",
            "email": "atsince24@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "RW",
              "addressRegion": "Kigali"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -1.9441,
              "longitude": 30.0619
            },
            "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-17:00",
            "priceRange": "$$",
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
    </>
  )
}
