import { CheckCircle, XCircle, Clock, DollarSign, BarChart, Scaling, Zap, Shield } from "lucide-react"

const comparisonData = [
  {
    feature: "Operating Hours",
    icon: <Clock className="w-5 h-5 text-blue-400" />,
    traditional: "Typically 8-10 hours/day",
    agent: "Up to 24/7 availability",
  },
  {
    feature: "Cost Structure",
    icon: <DollarSign className="w-5 h-5 text-green-400" />,
    traditional: "High (Salaries, Benefits)",
    agent: "Potentially lower subscription cost",
  },
  {
    feature: "Scalability",
    icon: <Scaling className="w-5 h-5 text-purple-400" />,
    traditional: "Requires hiring & training",
    agent: "Rapid deployment capability",
  },
  {
    feature: "Speed & Efficiency",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    traditional: "Variable, human-dependent",
    agent: "Consistent automated processing",
  },
  {
    feature: "Data Accuracy",
    icon: <BarChart className="w-5 h-5 text-orange-400" />,
    traditional: "Subject to human error",
    agent: "High accuracy with proper setup",
  },
  {
    feature: "Security & Compliance",
    icon: <Shield className="w-5 h-5 text-red-400" />,
    traditional: "Depends on training & adherence",
    agent: "Programmatically enforced rules",
  },
]

export function ComparisonTable() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 text-sm font-medium text-purple-300 glass rounded-full mb-6 border border-purple-400/30">
          The Autonomous Advantage
        </span>
        <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6">
          A New Approach to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Business Operations
          </span>
        </h2>
        <p className="max-w-3xl text-xl text-gray-300 mx-auto">
          See how autonomous agents can potentially outperform traditional manual workflows across key operational
          areas.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block card-border overflow-hidden rounded-2xl">
        <div className="grid grid-cols-3 bg-white/5">
          <div className="px-6 py-4 font-semibold text-white border-r border-white/10">FEATURE</div>
          <div className="px-6 py-4 font-semibold text-white border-r border-white/10">TRADITIONAL APPROACH</div>
          <div className="px-6 py-4 font-semibold text-white bg-purple-600/20">AUTONOMOUS AGENT</div>
        </div>

        {comparisonData.map((item, index) => (
          <div key={index} className="grid grid-cols-3 border-t border-white/10 hover:bg-white/5 transition-colors">
            <div className="px-6 py-6 border-r border-white/10">
              <div className="flex items-center gap-3 text-white font-medium">
                {item.icon}
                <span>{item.feature}</span>
              </div>
            </div>
            <div className="px-6 py-6 border-r border-white/10">
              <div className="flex items-center gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500/70 flex-shrink-0" />
                <span>{item.traditional}</span>
              </div>
            </div>
            <div className="px-6 py-6 bg-purple-600/10">
              <div className="flex items-center gap-3 text-purple-300 font-medium">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{item.agent}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-6">
        {comparisonData.map((item, index) => (
          <div key={index} className="card-border p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-white font-semibold mb-4">
              {item.icon}
              <span>{item.feature}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500/70 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400 font-medium mb-1">Traditional Approach</div>
                  <div className="text-gray-300">{item.traditional}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-purple-300 font-medium mb-1">Autonomous Agent</div>
                  <div className="text-purple-300 font-medium">{item.agent}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
