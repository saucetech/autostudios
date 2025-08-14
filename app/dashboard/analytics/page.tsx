import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { BarChart3, TrendingUp, Clock, Zap } from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Executions",
      value: "1,234",
      change: "+12%",
      icon: Zap,
      color: "text-purple-400",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Avg. Execution Time",
      value: "2.3s",
      change: "-0.5s",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Active Automations",
      value: "23",
      change: "+3",
      icon: BarChart3,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-2">Monitor your automation performance and usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-sm text-green-400">{metric.change}</p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UsageChart />
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Automations</CardTitle>
            <CardDescription className="text-gray-400">Most frequently executed automations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Lead Generation", executions: 45, success: 98 },
                { name: "Social Media Content", executions: 32, success: 95 },
                { name: "Email Automation", executions: 28, success: 99 },
                { name: "Market Analysis", executions: 19, success: 92 },
              ].map((automation) => (
                <div key={automation.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{automation.name}</p>
                    <p className="text-sm text-gray-400">{automation.executions} executions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">{automation.success}%</p>
                    <p className="text-sm text-gray-400">success</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
