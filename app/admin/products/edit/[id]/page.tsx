"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProductForm } from "../../components/product-form"
import { useToast } from "@/components/ui/use-toast"

// Mock data for products
const mockProducts = {
  "solar-water-heater": {
    id: "solar-water-heater",
    name: "Solar Water Heater",
    price: "RWF 750,000",
    description: "Eco-friendly water heating solution with pressurized and non-pressurized options.",
    longDescription:
      "Our premium Solar Water Heaters harness the power of the sun to provide you with hot water while reducing your energy bills. Available in both pressurized and non-pressurized variants, these systems are designed for durability and efficiency in various climate conditions.",
    whyChoose: [
      {
        title: "Superior Efficiency in All Climates",
        description:
          "Our evacuated vacuum tube technology ensures optimal heat absorption, providing hot water even on cloudy days or in colder climates. The vacuum insulation minimizes heat loss, outperforming traditional flat plate collectors.",
      },
      {
        title: "Significant Energy Savings",
        description:
          "By utilizing solar energy, you can reduce your energy bills by up to 50%. The system's design ensures rapid heat transfer and high absorption efficiency, leading to lower utility costs.",
      },
      {
        title: "Environmentally Friendly",
        description:
          "SolarWaterHeater reduces reliance on fossil fuels, decreasing greenhouse gas emissions and contributing to a sustainable future.",
      },
    ],
    motivationalBanner:
      "🌞 Harness the Sun with Solar Water Heater: Efficient, Eco-Friendly, and Economical. Make the Switch Today!",
    category: "solar",
    comingSoon: false,
    installationIncluded: true,
    specs: {
      "Energy Source": "Solar",
      Material: "Stainless Steel",
      Warranty: "5 Years",
    },
    useCases: ["Residential homes", "Small businesses", "Hotels and guesthouses"],
  },
  "automatic-gate-opener": {
    id: "automatic-gate-opener",
    name: "Automatic Gate Opener",
    price: "RWF 450,000",
    description: "Smart gate solutions for enhanced security and convenience.",
    longDescription:
      "Our Automatic Gate Openers combine security with convenience, allowing you to control access to your property with ease. With remote control operation and optional smartphone integration, you can manage your gate from anywhere.",
    whyChoose: [
      {
        title: "Enhanced Security",
        description:
          "Our automatic gate openers provide an additional layer of security for your property, controlling who enters and exits.",
      },
      {
        title: "Convenience at Your Fingertips",
        description:
          "Open and close your gate with a remote control or smartphone app, without leaving your vehicle or home.",
      },
    ],
    motivationalBanner:
      "🔐 Upgrade Your Property with Automatic Gate Opener: Security, Convenience, and Peace of Mind in One Solution!",
    category: "gate",
    comingSoon: false,
    installationIncluded: true,
    specs: {
      Power: "AC/DC with Battery Backup",
      Material: "Aluminum and Steel",
    },
    useCases: ["Residential driveways", "Commercial properties"],
  },
  "water-pump": {
    id: "water-pump",
    name: "Water Pump",
    price: "RWF 250,000",
    description: "Reliable water pumps delivering strong, steady water pressure for homes, businesses, and farms.",
    longDescription:
      "Our Water Pumps provide a dependable water supply and consistent pressure for residential, commercial, and agricultural use. From surface and booster pumps to submersible borehole pumps, we supply energy-efficient, durable pumps with professional installation.",
    whyChoose: [
      {
        title: "Strong, Consistent Pressure",
        description: "Enjoy steady water flow to every tap and outlet, even in multi-storey buildings.",
      },
      {
        title: "Energy Efficient & Durable",
        description: "High-efficiency motors and corrosion-resistant builds keep running costs low and reliability high.",
      },
    ],
    motivationalBanner: "💧 Never Run Dry: Our Water Pumps Deliver Strong, Reliable Water Pressure Wherever You Need It!",
    category: "water",
    comingSoon: false,
    installationIncluded: true,
    specs: {
      "Pump Types": "Surface, Booster, Submersible",
      "Power Range": "0.5HP - 2HP",
    },
    useCases: ["Home water supply", "Boreholes and wells", "Irrigation and farming"],
  },
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const productId = params.id as string

  const [product, setProduct] = useState<typeof mockProducts[keyof typeof mockProducts] | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    if (productId && mockProducts[productId as keyof typeof mockProducts]) {
      setProduct(mockProducts[productId as keyof typeof mockProducts]);
      setIsLoading(false);
    } else {
      toast({
        title: "Product not found",
        description: "The product you're trying to edit doesn't exist",
        variant: "destructive",
      })
      router.push("/admin/products")
    }
  }, [productId, router, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return <ProductForm initialData={product ?? undefined} isEditing />
}
