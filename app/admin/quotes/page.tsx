import { getSubmissions, isDbConfigured } from "@/lib/db"
import QuotesClient, { type Quote } from "./QuotesClient"

export const dynamic = "force-dynamic"

export default async function QuotesPage() {
  let dbReady = isDbConfigured()
  let quotes: Quote[] = []

  if (dbReady) {
    try {
      const rows = await getSubmissions("quote")
      quotes = rows.map((r) => ({
        id: r.id,
        name: r.name ?? "",
        email: r.email ?? "",
        phone: r.phone ?? "",
        product: r.product ?? r.subject ?? "(no product)",
        message: r.message ?? "",
        date: r.created_at,
        status: r.status ?? "pending",
      }))
    } catch {
      dbReady = false
    }
  }

  return <QuotesClient initial={quotes} dbReady={dbReady} />
}
