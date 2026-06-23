import { NextResponse } from "next/server"
import { saveSubmission, isDbConfigured, type SubmissionType } from "@/lib/db"

// The business's own Formspree forms (these IDs are public by design).
const FORMSPREE: Record<SubmissionType, string> = {
  contact: "https://formspree.io/f/meepvvgr",
  quote: "https://formspree.io/f/xbdpqqov",
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const type: SubmissionType =
    body.type === "quote" || body.formType === "Quote Request" ? "quote" : "contact"

  // 1) Forward to Formspree — this is what emails the business. Critical path.
  let emailed = false
  try {
    const res = await fetch(FORMSPREE[type], {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    })
    emailed = res.ok
  } catch {
    emailed = false
  }

  // 2) Best-effort: store the submission so it appears in /admin. Never let a
  //    DB problem break the form — the email above is the source of truth.
  if (isDbConfigured()) {
    try {
      await saveSubmission({
        type,
        name: typeof body.name === "string" ? body.name : undefined,
        email: typeof body.email === "string" ? body.email : undefined,
        phone: typeof body.phone === "string" ? body.phone : undefined,
        subject: typeof body.subject === "string" ? body.subject : undefined,
        product: typeof body.product === "string" ? body.product : undefined,
        message: typeof body.message === "string" ? body.message : undefined,
      })
    } catch (err) {
      console.error("Failed to store submission:", err)
    }
  }

  if (!emailed) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
