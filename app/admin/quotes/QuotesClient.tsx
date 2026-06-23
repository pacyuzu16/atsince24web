"use client"

import { useState } from "react"
import { Search, Trash2, MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export type QuoteStatus = "pending" | "contacted" | "completed"

export interface Quote {
  id: number
  name: string
  email: string
  phone: string
  product: string
  message: string
  date: string
  status: QuoteStatus
}

function getStatusBadge(status: QuoteStatus) {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <XCircle className="mr-1 h-3.5 w-3.5" />
          Pending
        </span>
      )
    case "contacted":
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Contacted
        </span>
      )
    case "completed":
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Completed
        </span>
      )
  }
}

export default function QuotesClient({ initial, dbReady }: { initial: Quote[]; dbReady: boolean }) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>(initial)

  const filteredQuotes = quotes.filter(
    (q) =>
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return
    setQuotes((prev) => prev.filter((q) => q.id !== id))
    try {
      await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
    } catch {
      /* best-effort */
    }
    toast({ title: "Quote request deleted", description: "The request has been removed", duration: 3000 })
  }

  const handleUpdateStatus = (id: number, status: QuoteStatus) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
    fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => {})
    toast({ title: "Status updated", description: `Marked as ${status}`, duration: 3000 })
  }

  const openQuoteDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light tracking-tight">Quote Requests</h2>
        <p className="text-gray-500 mt-1">Quote requests submitted by customers</p>
      </div>

      {!dbReady && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          The submissions database isn&apos;t connected yet, so quote requests can&apos;t be shown here. New requests are
          still emailed to you via Formspree. Connect a database (Vercel Postgres) to see them listed.
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Quote Requests</CardTitle>
              <CardDescription>
                {filteredQuotes.length} request{filteredQuotes.length !== 1 ? "s" : ""} in total
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search quote requests..."
                className="pl-8 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Customer</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Product</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                    <th className="h-12 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.length > 0 ? (
                    filteredQuotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className={`border-b transition-colors hover:bg-gray-50 ${
                          quote.status === "pending" ? "bg-yellow-50" : ""
                        }`}
                      >
                        <td className="p-4 align-middle font-medium">
                          {quote.name || "(no name)"}
                          <div className="text-xs text-gray-500">{quote.phone}</div>
                        </td>
                        <td className="p-4 align-middle">
                          <button
                            onClick={() => openQuoteDialog(quote)}
                            className="text-left hover:underline focus:outline-none"
                          >
                            {quote.product || "(no product)"}
                          </button>
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell">
                          {new Date(quote.date).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle">{getStatusBadge(quote.status)}</td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openQuoteDialog(quote)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, "pending")}>
                                <XCircle
                                  className={`mr-2 h-4 w-4 ${quote.status === "pending" ? "text-yellow-500" : ""}`}
                                />
                                <span className={quote.status === "pending" ? "font-medium" : ""}>Pending</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, "contacted")}>
                                <CheckCircle
                                  className={`mr-2 h-4 w-4 ${quote.status === "contacted" ? "text-blue-500" : ""}`}
                                />
                                <span className={quote.status === "contacted" ? "font-medium" : ""}>Contacted</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, "completed")}>
                                <CheckCircle
                                  className={`mr-2 h-4 w-4 ${quote.status === "completed" ? "text-green-500" : ""}`}
                                />
                                <span className={quote.status === "completed" ? "font-medium" : ""}>Completed</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(quote.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        {dbReady ? "No quote requests yet" : "No quote requests to show"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedQuote && (
          <DialogContent className="sm:max-w-2xl max-w-[95vw] w-full overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Quote Request: {selectedQuote.product || "(no product)"}</DialogTitle>
              <DialogDescription>Status: {getStatusBadge(selectedQuote.status)}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">{selectedQuote.name || "(no name)"}</p>
                    <p className="text-sm">Email: {selectedQuote.email}</p>
                    <p className="text-sm">Phone: {selectedQuote.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Request Details</h4>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">{selectedQuote.product || "(no product)"}</p>
                    <p className="text-sm">Date: {new Date(selectedQuote.date).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <div className="mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">{selectedQuote.message}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
              <div className="flex flex-wrap gap-2">
                {(["pending", "contacted", "completed"] as QuoteStatus[]).map((s) => (
                  <Button
                    key={s}
                    variant={selectedQuote.status === s ? "default" : "outline"}
                    onClick={() => {
                      handleUpdateStatus(selectedQuote.id, s)
                      setSelectedQuote({ ...selectedQuote, status: s })
                    }}
                    className={`${
                      selectedQuote.status === s
                        ? s === "pending"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : s === "contacted"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-green-600 hover:bg-green-700"
                        : ""
                    } text-xs sm:text-sm`}
                    size="sm"
                  >
                    Mark as {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Button>
                ))}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  handleDelete(selectedQuote.id)
                  setIsDialogOpen(false)
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
