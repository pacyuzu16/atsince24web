import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { isAuthenticated } from "@/lib/auth"
import { isDbConfigured } from "@/lib/db"

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const id = Number(body.id)
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  try {
    if (typeof body.is_read === "boolean") {
      await sql`UPDATE submissions SET is_read = ${body.is_read} WHERE id = ${id};`
    }
    if (typeof body.status === "string" && ["pending", "contacted", "completed"].includes(body.status)) {
      await sql`UPDATE submissions SET status = ${body.status} WHERE id = ${id};`
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Failed to update submission:", err)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const id = Number(body.id)
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  try {
    await sql`DELETE FROM submissions WHERE id = ${id};`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Failed to delete submission:", err)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
