import { ScanSearch, Bot, Rocket, BarChartBig } from "lucide-react"

const steps = [
  {
    icon: <ScanSearch className="w-8 h-8 text-blue-400" />,
    title: "1. Discovery & Strategy",
    description:
      "We dive deep into your business processes to identify the highest-impact automation opportunities, crafting a bespoke AI strategy aligned with your goals.",
  },
  {
    icon: <Bot className="w-8 h-8 text-purple-400" />,
    title: "2. Custom Agent Development",
    description:
      "Our expert team builds and trains your custom AI agents using cutting-edge models, ensuring they are perfectly tailored to your specific workflows.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-emerald-400" />,
    title: "3. Seamless Integration & Deployment",
    description:
      "We handle the entire deployment process, seamlessly integrating the AI agents into your existing systems and software with zero disruption to your operations.",
  },
  {
    icon: <BarChartBig className="w-8 h-8 text-orange-400" />,
    title: "4. Optimization & ROI Tracking",
    description:
      "Your agents are live, but our work isn't done. We continuously monitor performance, optimize for efficiency, and provide you with detailed ROI reports.",
  },
]

export function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 text-sm font-medium text-blue-300 glass rounded-full mb-6 border border-blue-400/30">
          Our Process
        </span>
        <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6">
          Your Path to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Autonomous Operations
          </span>
        </h2>
        <p className="max-w-3xl text-xl text-gray-300 mx-auto">
          We follow a proven 4-step process to deliver measurable results and a significant return on your investment
          within weeks.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="card-border p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl gradient-border flex items-center justify-center mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{step.title}</h3>
            <p className="text-white/70 leading-relaxed text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
