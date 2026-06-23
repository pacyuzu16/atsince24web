import type { Metadata } from "next"

interface ProductMetadata {
    [key: string]: {
        title: string
        description: string
        keywords: string[]
        images: string[]

    }
}

const productMetadata: ProductMetadata = {
    "solar-water-heater": {
        title: "Solar Water Heater Rwanda | Eco-Friendly Water Heating Solutions | @Since24",
        description: "Solar water heaters in Rwanda with pressurized and non-pressurized options. Cut your energy bills by up to 50% with eco-friendly hot water. Professional installation included.",
        keywords: [
            "solar water heater Rwanda",
            "solar water heater Kigali",
            "pressurized solar water heater",
            "non-pressurized solar water heater",
            "eco-friendly water heating Rwanda",
            "energy saving water heater Rwanda",
            "solar water heater installation Rwanda",
            "solar water heater price Rwanda",
            "solar water heater maintenance Rwanda",
            "sustainable water heating Rwanda",
            "green energy Rwanda",
            "solar technology Rwanda"
        ],
        images: [
            "https://res.cloudinary.com/ddlhho2lk/image/upload/v1751191716/%40since24/ln7pbfnsqzlnz1kvxhyp.jpg"
        ]
    },
    "automatic-gate-opener": {
        title: "Automatic Gate Opener & Gate Motor Rwanda | Sliding & Swing Gate Motors | @Since24",
        description: "Professional gate motors and automatic gate openers in Rwanda for sliding and swing gates, with remote control and smartphone integration. Enhanced security and convenience for homes and businesses. Expert installation included.",
        keywords: [
            "gate motor Rwanda",
            "gate motor Kigali",
            "sliding gate motor Rwanda",
            "swing gate motor Rwanda",
            "automatic gate opener Rwanda",
            "automatic gate opener Kigali",
            "gate motor price Rwanda",
            "gate automation Rwanda",
            "remote control gate opener Rwanda",
            "gate motor installation Rwanda",
            "commercial gate motor Rwanda",
            "residential gate motor Rwanda"
        ],
        images: [
            "https://res.cloudinary.com/ddlhho2lk/image/upload/v1751200214/%40since24/mvcomqc5ife4jp6yt4eo.jpg"
        ]
    },
    "water-pump": {
        title: "Water Pump Rwanda | Booster & Submersible Borehole Pumps | @Since24",
        description: "Reliable water pumps in Rwanda - surface, booster, and submersible borehole pumps for strong, steady water pressure in homes, businesses, and farms. Energy efficient, durable, with professional installation included.",
        keywords: [
            "water pump Rwanda",
            "water pump Kigali",
            "water booster pump Rwanda",
            "submersible pump Rwanda",
            "borehole pump Rwanda",
            "water pressure pump Rwanda",
            "surface water pump Rwanda",
            "domestic water pump Rwanda",
            "irrigation pump Rwanda",
            "water pump price Rwanda",
            "water pump installation Rwanda",
            "water pump for home Rwanda"
        ],
        images: [
            "/images/og-image.jpg"
        ]
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = productMetadata[slug]

    if (!product) {
        return {
            title: "Product Not Found | @Since24",
            description: "The requested product could not be found.",
        }
    }

    return {
        title: product.title,
        description: product.description,
        keywords: product.keywords,
        openGraph: {
            title: product.title,
            description: product.description,
            url: `https://atsince24.com/products/${slug}`,
            images: [
                {
                    url: product.images[0],
                    width: 1200,
                    height: 630,
                    alt: product.title,
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.description,
            images: product.images,
        },
        alternates: {
            canonical: `https://atsince24.com/products/${slug}`,
        },
    }
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
} 