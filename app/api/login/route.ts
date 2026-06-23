import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { checkCredentials, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth"

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { username, password } = body
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !checkCredentials(username, password)
  ) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const token = createSessionToken(username)
  ;(await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })

  return NextResponse.json({ ok: true })
}
