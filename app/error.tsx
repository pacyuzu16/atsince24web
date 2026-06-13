"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 text-center">
      <h1 className="text-2xl md:text-3xl font-medium text-brand-dark">Something went wrong</h1>
      <p className="mt-3 max-w-md text-gray-600">
        An unexpected error occurred. You can try again, or head back to the homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-6 py-3 font-medium text-white transition-colors hover:bg-brand-blue/90"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-brand-blue px-6 py-3 font-medium text-brand-blue transition-colors hover:bg-brand-blue/5"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
