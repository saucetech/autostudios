"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", executions: 12 },
  { name: "Tue", executions: 19 },
  { name: "Wed", executions: 8 },
  { name: "Thu", executions: 25 },
  { name: "Fri", executions: 22 },
  { name: "Sat", executions: 15 },
  { name: "Sun", executions: 9 },
]

const chartConfig = {
  executions: {
    label: "Executions",
    color: "#8b5cf6",
  },
}

export function UsageChart() {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Weekly Usage</CardTitle>
        <CardDescription className="text-gray-400">Automation executions over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="executions" fill="var(--color-executions)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
