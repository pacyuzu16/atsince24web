import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Solar Water Heaters, Water Pumps & Gate Motors in Rwanda",
    description: "Shop @Since24's core range in Rwanda: solar water heaters, water pumps (booster & submersible borehole), and automatic gate openers (gate motors). Energy efficient, durable, with professional installation in Kigali and across Rwanda.",
    keywords: [
        "solar water heater Rwanda",
        "solar water heater Kigali",
        "water pump Rwanda",
        "water booster pump Rwanda",
        "submersible borehole pump Rwanda",
        "gate motor Rwanda",
        "automatic gate opener Rwanda",
        "sliding gate motor Rwanda",
        "swing gate motor Rwanda",
        "solar water heater price Rwanda",
        "water pump price Rwanda",
        "gate motor price Rwanda",
        "installation services Rwanda",
        "Kigali",
        "Rwanda"
    ],
    openGraph: {
        title: "Solar Water Heaters, Water Pumps & Gate Motors | @Since24 Rwanda",
        description: "Shop @Since24's core range in Rwanda: solar water heaters, water pumps, and automatic gate openers (gate motors). Professional installation across Rwanda.",
        url: "https://atsince24.com/products",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "@Since24 - Solar Water Heaters, Water Pumps & Gate Motors",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Solar Water Heaters, Water Pumps & Gate Motors | @Since24 Rwanda",
        description: "Shop @Since24's core range in Rwanda: solar water heaters, water pumps, and automatic gate openers (gate motors).",
        images: ["/images/og-image.jpg"],
    },
    alternates: {
        canonical: "https://atsince24.com/products",
    },
}

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}

            {/* Structured Data for Products Page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Solar Water Heaters, Water Pumps & Gate Motors",
                        "description": "@Since24's core products available in Rwanda: solar water heaters, water pumps, and automatic gate openers (gate motors)",
                        "url": "https://atsince24.com/products",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "item": {
                                    "@type": "Service",
                                    "name": "Solar Water Heater",
                                    "description": "Eco-friendly water heating solution with pressurized and non-pressurized options",
                                    "url": "https://atsince24.com/products/solar-water-heater",
                                    "category": "Solar Water Heating",
                                    "brand": {
                                        "@type": "Brand",
                                        "name": "@Since24"
                                    }
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "item": {
                                    "@type": "Service",
                                    "name": "Water Pump",
                                    "description": "Surface, booster, and submersible borehole water pumps for strong, steady water pressure",
                                    "url": "https://atsince24.com/products/water-pump",
                                    "category": "Water Pumps",
                                    "brand": {
                                        "@type": "Brand",
                                        "name": "@Since24"
                                    }
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "item": {
                                    "@type": "Service",
                                    "name": "Automatic Gate Opener (Gate Motor)",
                                    "description": "Gate motors and automatic openers for sliding and swing gates - enhanced security and convenience",
                                    "url": "https://atsince24.com/products/automatic-gate-opener",
                                    "category": "Gate Motors & Automation",
                                    "brand": {
                                        "@type": "Brand",
                                        "name": "@Since24"
                                    }
                                }
                            }
                        ]
                    })
                }}
            />
        </>
    )
} 