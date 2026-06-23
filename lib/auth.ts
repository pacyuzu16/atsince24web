import crypto from "crypto"
import { cookies } from "next/headers"

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours, in seconds

function secret(): string {
  // ADMIN_SESSION_SECRET must be set in production. The fallback only keeps
  // local builds working and is intentionally not secure.
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me"
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

/** Validate a username/password against the server-side env credentials. */
export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME || "admin"
  const p = process.env.ADMIN_PASSWORD || "123"
  return username === u && password === p
}

export function createSessionToken(username: string): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined | null): { u: string } | null {
  if (!token) return null
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return null
  if (!safeEqual(sign(payload), sig)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString())
    if (typeof data.exp !== "number" || Date.now() > data.exp) return null
    return { u: String(data.u) }
  } catch {
    return null
  }
}

/** Server-side check used by the admin layout guard. */
export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return verifySessionToken(token) !== null
}
