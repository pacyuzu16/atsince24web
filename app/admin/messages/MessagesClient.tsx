"use client"

import { useState } from "react"
import { Search, Trash2, MoreHorizontal, Mail, CheckCircle, Eye } from "lucide-react"
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

export interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

async function patchSubmission(id: number, is_read: boolean) {
  try {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_read }),
    })
  } catch {
    /* best-effort; local state already updated */
  }
}

export default function MessagesClient({
  initial,
  dbReady,
}: {
  initial: Message[]
  dbReady: boolean
}) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initial)

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    setMessages((prev) => prev.filter((m) => m.id !== id))
    try {
      await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
    } catch {
      /* best-effort */
    }
    toast({ title: "Message deleted", description: "The message has been removed", duration: 3000 })
  }

  const handleMarkAsRead = (id: number) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
    patchSubmission(id, true)
  }

  const handleMarkAsUnread = (id: number) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: false } : m)))
    patchSubmission(id, false)
  }

  const openMessageDialog = (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
    if (!message.read) handleMarkAsRead(message.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light tracking-tight">Contact Messages</h2>
        <p className="text-gray-500 mt-1">Messages submitted through the contact form</p>
      </div>

      {!dbReady && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          The submissions database isn&apos;t connected yet, so messages can&apos;t be shown here. New contact
          submissions are still emailed to you via Formspree. Connect a database (Vercel Postgres) to see them listed.
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""} in total
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search messages..."
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
                    <th className="h-12 px-4 text-left font-medium text-gray-500">From</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Subject</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500 hidden md:table-cell">Status</th>
                    <th className="h-12 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <tr
                        key={message.id}
                        className={`border-b transition-colors hover:bg-gray-50 ${!message.read ? "bg-blue-50" : ""}`}
                      >
                        <td className="p-4 align-middle font-medium">
                          {message.name || "(no name)"}
                          <div className="text-xs text-gray-500">{message.email}</div>
                        </td>
                        <td className="p-4 align-middle">
                          <button
                            onClick={() => openMessageDialog(message)}
                            className="text-left hover:underline focus:outline-none"
                          >
                            {message.subject || "(no subject)"}
                          </button>
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell">
                          {new Date(message.date).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell">
                          {message.read ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              <CheckCircle className="mr-1 h-3.5 w-3.5" />
                              Read
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              <Mail className="mr-1 h-3.5 w-3.5" />
                              New
                            </span>
                          )}
                        </td>
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
                              <DropdownMenuItem onClick={() => openMessageDialog(message)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Message
                              </DropdownMenuItem>
                              {message.read ? (
                                <DropdownMenuItem onClick={() => handleMarkAsUnread(message.id)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Mark as Unread
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(message.id)}>
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
                        {dbReady ? "No messages yet" : "No messages to show"}
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
        {selectedMessage && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject || "(no subject)"}</DialogTitle>
              <DialogDescription>
                From: {selectedMessage.name || "(no name)"} ({selectedMessage.email})
                <br />
                Date: {new Date(selectedMessage.date).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">{selectedMessage.message}</div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete(selectedMessage.id)
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
