import { getSubmissions, isDbConfigured } from "@/lib/db"
import MessagesClient, { type Message } from "./MessagesClient"

export const dynamic = "force-dynamic"

export default async function MessagesPage() {
  let dbReady = isDbConfigured()
  let messages: Message[] = []

  if (dbReady) {
    try {
      const rows = await getSubmissions("contact")
      messages = rows.map((r) => ({
        id: r.id,
        name: r.name ?? "",
        email: r.email ?? "",
        subject: r.subject ?? "(no subject)",
        message: r.message ?? "",
        date: r.created_at,
        read: r.is_read,
      }))
    } catch {
      dbReady = false
    }
  }

  return <MessagesClient initial={messages} dbReady={dbReady} />
}
