import type React from "react"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import AdminDashboard from "./AdminLayoutClient"

export const metadata = {
  title: "@since24 Admin Dashboard",
  description: "Admin dashboard for @since24 website",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check against a signed session cookie.
  if (!(await isAuthenticated())) {
    redirect("/staff-login")
  }

  return <AdminDashboard>{children}</AdminDashboard>
}
