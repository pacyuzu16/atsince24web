import Image from "next/image"
import { Check, Linkedin, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About @Since24 - Our Story, Mission & Team | Electronic Appliances Rwanda",
  description: "Learn about @Since24's journey, mission, and values. Founded in 2024, we're dedicated to simplifying everyday living through solar water heaters, water pumps, and gate motors with professional installation in Rwanda.",
  keywords: [
    "about @Since24",
    "@Since24 company",
    "@Since24 Rwanda",
    "solar water heater company Rwanda",
    "water pump supplier Rwanda",
    "gate motor company Rwanda",
    "automatic gate opener company Rwanda",
    "installation services company Rwanda",
    "solar water heater Kigali",
    "water pump Kigali",
    "gate motor Kigali",
    "professional installation Rwanda",
    "sustainable technology company Rwanda",
    "eco-friendly solutions Rwanda",
    "energy saving solutions Rwanda"
  ],
  openGraph: {
    title: "About @Since24 - Our Story, Mission & Team",
    description: "Learn about @Since24's journey, mission, and values. Founded in 2024, we're dedicated to simplifying everyday living through solar water heaters, water pumps, and gate motors with professional installation in Rwanda.",
    url: "https://atsince24.com/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "@Since24 - About Our Company",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About @Since24 - Our Story, Mission & Team",
    description: "Learn about @Since24's journey, mission, and values. Founded in 2024, we're dedicated to simplifying everyday living through solar water heaters, water pumps, and gate motors with professional installation in Rwanda.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://atsince24.com/about",
  },
}

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  contact?: {
    email?: string
    linkedin?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "john-smith",
    name: "Aimé Sincere NIYONKURU",
    role: "Founder & CEO",
    bio: "With years of experience , I Sincere founded @since24 with a vision to simplify everyday living through innovative technology.",
    image: "/placeholder.svg?height=400&width=400",
    contact: {
      email: "atsince24@gmail.com",
      // linkedin: "https://linkedin.com/in/aimesincere",
    },
  },
  {
    id: "cyuzuzo-pacifique",
    name: "CYUZUZO PACIFIQUE",
    role: "IT Specialist",
    bio: "Manages @since24's technology and web presence, keeping our digital platforms and infrastructure running smoothly, securely, and reliably.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-900 to-[#0a1f56] text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">About @since24</h1>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Learn about our journey, mission, and the values that drive us to deliver excellence in electronic
            appliances and installations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> */}
          <div className="items-center text-center">
            {/* <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="@since24 Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div> */}

            <div>
              <h2 className="text-3xl font-light tracking-tight text-brand-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2024, @since24 started with a simple goal: to make reliable solar water heaters, water
                  pumps, and gate motors easy to get and properly installed in Rwanda. Too often, good equipment is let
                  down by poor installation and weak after-sales support - and we set out to change that.
                </p>
                <p>
                  Today, @since24 supplies and installs solar water heaters, water pumps, and gate motors for homes and
                  businesses across the country, guided by our philosophy: "The art of Simple Life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight text-brand-dark mb-6">Our Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-medium text-brand-dark mb-4">Mission</h3>
              <p className="text-gray-600">
                To make everyday life simpler with dependable solar water heaters, water pumps, and gate motors -
                backed by expert installation and honest after-sales support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-medium text-brand-dark mb-4">Vision</h3>
              <p className="text-gray-600">
                To become Rwanda's most trusted name for solar water heaters, water pumps, and gate motors - helping
                more homes and businesses run reliably and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight text-brand-dark mb-6">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide every aspect of our business, from product development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-brand-dark mb-4">Innovation</h3>
              <p className="text-gray-600 mb-4">
                We continuously explore new technologies and design approaches to create products that are ahead of the
                curve.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Research-driven development</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Embracing emerging technologies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-brand-dark mb-4">Quality</h3>
              <p className="text-gray-600 mb-4">
                We never compromise on the quality of our products, materials, or service delivery.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Rigorous testing protocols</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Quality materials and components</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-brand-dark mb-4">Sustainability</h3>
              <p className="text-gray-600 mb-4">
                We design products with energy efficiency and environmental impact in mind.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Energy-efficient designs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-brand-blue mr-2 mt-1" />
                  <span className="text-gray-600 text-sm">Eco-friendly manufacturing processes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight text-brand-dark mb-6">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind @since24. Our diverse team combines expertise, passion, and
              innovation to deliver exceptional products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-medium text-brand-dark mb-1">{member.name}</h2>
                  <p className="text-brand-blue mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                  {member.contact && (
                    <div className="flex space-x-3">
                      {member.contact.email && (
                        <a
                          href={`mailto:${member.contact.email}`}
                          className="text-gray-500 hover:text-brand-blue transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.contact.linkedin && (
                        <a
                          href={member.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-brand-blue transition-colors"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About @Since24",
            "description": "Learn about @Since24's journey, mission, and values. Founded in 2024, we're dedicated to simplifying everyday living through solar water heaters, water pumps, and gate motors with professional installation in Rwanda.",
            "url": "https://atsince24.com/about",
            "mainEntity": {
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
                "email": "atsince24@gmail.com",
                "telephone": "+250 788 825 011"
              },
              "founder": {
                "@type": "Person",
                "name": "Aimé Sincere NIYONKURU",
                "jobTitle": "Founder & CEO",
                "description": "With years of experience, I Sincere founded @since24 with a vision to simplify everyday living through innovative technology."
              },
              "employee": [
                {
                  "@type": "Person",
                  "name": "Aimé Sincere NIYONKURU",
                  "jobTitle": "Founder & CEO",
                  "description": "With years of experience, I Sincere founded @since24 with a vision to simplify everyday living through innovative technology."
                },
                {
                  "@type": "Person",
                  "name": "CYUZUZO PACIFIQUE",
                  "jobTitle": "IT Specialist",
                  "description": "Manages @since24's technology and web presence, keeping our digital platforms and infrastructure running smoothly, securely, and reliably."
                }
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
            }
          })
        }}
      />
    </>
  )
}
