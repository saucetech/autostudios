"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pause, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Job {
  id: string
  name: string
  status: "running" | "completed" | "failed" | "pending"
  startTime: string
  duration?: string
  progress?: number
}

export function JobMonitor() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      name: "Lead Generation - LinkedIn Scraper",
      status: "running",
      startTime: "2024-01-15T10:30:00Z",
      progress: 65,
    },
    {
      id: "2",
      name: "Social Media Content - Instagram Posts",
      status: "completed",
      startTime: "2024-01-15T09:15:00Z",
      duration: "2m 34s",
    },
    {
      id: "3",
      name: "Email Automation - Welcome Sequence",
      status: "failed",
      startTime: "2024-01-15T08:45:00Z",
      duration: "45s",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "running":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input pl-12 py-4 text-white placeholder-gray-300"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 glass-card-subtle border-white/20 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="glass-card-strong border-white/20">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="dashboard-card hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(job.status)}
                  <div>
                    <h3 className="text-white font-semibold text-lg">{job.name}</h3>
                    <p className="text-sm text-gray-200">
                      Started {new Date(job.startTime).toLocaleString()}
                      {job.duration && ` • Duration: ${job.duration}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`font-medium ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                  {job.status === "running" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass-card-subtle border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  )}
                </div>
              </div>
              {job.progress && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-200 mb-2">
                    <span className="font-medium">Progress</span>
                    <span className="font-semibold">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="dashboard-card">
          <CardContent className="p-12 text-center">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-white font-semibold text-xl mb-3">No jobs found</h3>
            <p className="text-gray-200 text-lg">No jobs match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
