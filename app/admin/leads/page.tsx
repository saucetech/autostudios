"use client"

import type React from "react"
import { useState } from "react"
import {
  Download,
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Search,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source: string
  submitted_at: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

interface LeadStats {
  total: number
  thisMonth: number
  thisWeek: number
  today: number
  topCompanies: { company: string; count: number }[]
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const fetchLeads = async (page = 1, search = "") => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      })

      if (search) {
        params.append("search", search)
      }

      const response = await fetch(`/api/leads?${params}`, {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads)
        setPagination(data.pagination)
        setAuthenticated(true)
      } else {
        alert("Invalid password")
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
      alert("Error fetching leads")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/leads?stats=true", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const downloadCSV = async () => {
    try {
      const response = await fetch("/api/leads?format=csv", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error downloading CSV:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads(1)
    fetchStats()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchLeads(1, searchQuery)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchLeads(page, searchQuery)
  }

  const refreshData = () => {
    fetchLeads(currentPage, searchQuery)
    fetchStats()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter password to access lead management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Checking..." : "Access Leads"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lead Management</h1>
            <p className="text-gray-400">Manage and track your website leads</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={refreshData}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-sm text-gray-400">Total Leads</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
                  <p className="text-sm text-gray-400">This Month</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.thisWeek}</p>
                  <p className="text-sm text-gray-400">This Week</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.today}</p>
                  <p className="text-sm text-gray-400">Today</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, company, or message..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setCurrentPage(1)
                  fetchLeads(1)
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {searchQuery ? `Search Results (${leads.length})` : `Leads (${pagination?.total || 0})`}
            </h2>
            {pagination && !searchQuery && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Company</th>
                  <th className="text-left p-4 font-medium">Phone</th>
                  <th className="text-left p-4 font-medium">Submitted</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4">
                      <a href={`mailto:${lead.email}`} className="text-blue-400 hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="p-4">{lead.company || "-"}</td>
                    <td className="p-4">
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="text-blue-400 hover:underline">
                          {lead.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-400">{new Date(lead.submitted_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && !searchQuery && pagination.totalPages > 1 && (
            <div className="p-4 border-t border-white/10 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} leads
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Lead Details</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-medium">{selectedLead.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a href={`mailto:${selectedLead.email}`} className="font-medium text-blue-400 hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  {selectedLead.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <a href={`tel:${selectedLead.phone}`} className="font-medium text-blue-400 hover:underline">
                          {selectedLead.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedLead.company && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                        <Building className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Company</p>
                        <p className="font-medium">{selectedLead.company}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Submitted</p>
                      <p className="font-medium">{new Date(selectedLead.submitted_at).toLocaleString()}</p>
                    </div>
                  </div>

                  {selectedLead.ip_address && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">IP Address</p>
                        <p className="font-medium">{selectedLead.ip_address}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Source</p>
                    <p className="font-medium">{selectedLead.source}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Lead ID</p>
                    <p className="font-medium">#{selectedLead.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
