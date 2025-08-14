import { JobMonitor } from "@/components/jobs/job-monitor"

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light text-white mb-3 tracking-tight">Jobs</h1>
        <p className="text-gray-200 text-lg">Monitor and manage your automation job executions in real-time.</p>
      </div>

      <JobMonitor />
    </div>
  )
}
