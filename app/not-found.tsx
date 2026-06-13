import Link from "next/link"
import Image from "next/image"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/images/logo.png"
          alt="@since24 Logo"
          width={180}
          height={60}
          className="h-12 w-auto"
          priority
        />
      </Link>

      <p className="text-7xl md:text-8xl font-light tracking-tight text-brand-blue">404</p>
      <h1 className="mt-4 text-2xl md:text-3xl font-medium text-brand-dark">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Sorry, the page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-6 py-3 font-medium text-white transition-colors hover:bg-brand-blue/90"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors hover:bg-brand-blue/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Products
        </Link>
      </div>
    </div>
  )
}
