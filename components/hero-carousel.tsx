"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  title: string
  description: string
  image: string
  cta?: {
    text: string
    link: string
  }
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Solar Water Heaters",
    description: "Harness the power of the sun for efficient, eco-friendly water heating - installed by our own team.",
    image: "/images/solar-water-heater-install.jpg",
    cta: {
      text: "Explore Products",
      link: "/products/solar-water-heater",
    },
  },
  {
    id: 5,
    title: "Reliable Water Pumps",
    description: "Strong, steady water pressure for homes, businesses, and farms - surface, booster, and borehole pumps.",
    image: "/images/water-pump.jpg",
    cta: {
      text: "View Water Pumps",
      link: "/products/water-pump",
    },
  },
  {
    id: 2,
    title: "Automatic Gate Openers & Gate Motors",
    description: "Secure your property with reliable gate motors for sliding and swing gates - remote control and easy access.",
    image: "/images/gate-motors.jpg",
    cta: {
      text: "View Gate Motors",
      link: "/products/automatic-gate-opener",
    },
  },
  {
    id: 3,
    title: "Professional Installation Across Rwanda",
    description: "Our own team supplies and installs solar water heaters, water pumps, and gate motors - flawless setup, every time.",
    image: "/images/swh-install-team.jpg",
    cta: {
      text: "Explore Products",
      link: "/products",
    },
  },
  {
    id: 4,
    title: "Visit Us in Kigali",
    description: "Find @Since24 at KN 8 Ave, Muhima - your trusted local supplier for solar water heaters, water pumps, and gate motors.",
    image: "/images/since24-shop.jpg",
    cta: {
      text: "Get in Touch",
      link: "/contact",
    },
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Auto-advance: pauses on hover/focus, and the timer resets whenever the
  // slide changes (so manual navigation gives a full interval before the next).
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 3500)
    return () => clearInterval(interval)
  }, [currentSlide, isPaused])

  return (
    <div
      className="relative h-[94vh] w-full overflow-hidden pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover h-full w-full"
            priority={index === 0}
          />
          <div className="relative z-20 h-full flex flex-col justify-center container mx-auto">
            <div className="max-w-2xl animate-fade-in pl-16 md:pl-20" style={{ animationDelay: "0.3s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">{slide.description}</p>
              {slide.cta && (
                <Button asChild className="bg-white text-brand-blue hover:bg-gray-100">
                  <a href={slide.cta.link}>{slide.cta.text}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
