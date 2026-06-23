import { sql } from "@vercel/postgres"

export type SubmissionType = "contact" | "quote"

export interface SubmissionInput {
  type: SubmissionType
  name?: string
  email?: string
  phone?: string
  subject?: string
  product?: string
  message?: string
}

export type QuoteStatus = "pending" | "contacted" | "completed"

export interface SubmissionRow {
  id: number
  type: SubmissionType
  name: string | null
  email: string | null
  phone: string | null
  subject: string | null
  product: string | null
  message: string | null
  created_at: string
  is_read: boolean
  status: QuoteStatus
}

/** True once a Postgres connection string is present in the environment. */
export function isDbConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL,
  )
}

let tablesReady: Promise<void> | null = null

/** Lazily create the submissions table on first use (idempotent). */
function ensureTables(): Promise<void> {
  if (!tablesReady) {
    tablesReady = sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT,
        email TEXT,
        phone TEXT,
        subject TEXT,
        product TEXT,
        message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        status TEXT NOT NULL DEFAULT 'pending'
      );
    `
      // Add the column on databases created before `status` existed.
      .then(() => sql`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';`)
      .then(() => undefined)
  }
  return tablesReady
}

export async function saveSubmission(input: SubmissionInput): Promise<void> {
  await ensureTables()
  await sql`
    INSERT INTO submissions (type, name, email, phone, subject, product, message)
    VALUES (
      ${input.type},
      ${input.name ?? null},
      ${input.email ?? null},
      ${input.phone ?? null},
      ${input.subject ?? null},
      ${input.product ?? null},
      ${input.message ?? null}
    );
  `
}

export async function getSubmissions(type: SubmissionType): Promise<SubmissionRow[]> {
  await ensureTables()
  const { rows } = await sql<SubmissionRow>`
    SELECT * FROM submissions WHERE type = ${type} ORDER BY created_at DESC LIMIT 200;
  `
  return rows
}

export async function countUnread(type: SubmissionType): Promise<number> {
  await ensureTables()
  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text AS count FROM submissions WHERE type = ${type} AND is_read = FALSE;
  `
  return Number(rows[0]?.count ?? 0)
}
