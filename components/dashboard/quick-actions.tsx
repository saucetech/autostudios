import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Zap, Settings, Activity } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Create Automation",
      description: "Deploy a new AI automation",
      href: "/dashboard/automations",
      icon: Zap,
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Connect Integration",
      description: "Add a new service integration",
      href: "/dashboard/integrations",
      icon: Settings,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "View Jobs",
      description: "Monitor automation executions",
      href: "/dashboard/jobs",
      icon: Activity,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Quick Actions
        </CardTitle>
        <CardDescription className="text-gray-400">Get started with common tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-white/5 group">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-4`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-white group-hover:text-purple-300">{action.title}</div>
                <div className="text-sm text-gray-400">{action.description}</div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
