"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronLeft,
  DollarSign,
  Headphones,
  Mail,
  Minus,
  Palette,
  Plus,
  TrendingUp,
  User,
  Clock,
  Building2,
  Target,
  BarChart3,
  Info,
} from "lucide-react"

// Industry presets with typical team sizes and manual task hours
const industryPresets = {
  technology: {
    name: "Technology & Software",
    icon: "💻",
    avgSalary: 85000,
    teams: {
      salesTeam: 8,
      supportTeam: 6,
      opsTeam: 4,
      marketingTeam: 5,
    },
    tasks: {
      sales_prospecting: 12,
      sales_data_entry: 6,
      sales_scheduling: 5,
      support_repetitive_questions: 20,
      support_ticketing: 8,
      support_onboarding: 6,
      marketing_repurposing: 10,
      marketing_posting: 6,
      marketing_reporting: 5,
      ops_data_transfer: 12,
      ops_reporting: 6,
      ops_onboarding_paperwork: 4,
    },
    benchmarks: {
      automationAdoption: 65,
      avgROI: 280,
      timeToValue: "3-4 months",
    },
  },
  financial: {
    name: "Financial Services",
    icon: "🏦",
    avgSalary: 95000,
    teams: {
      salesTeam: 12,
      supportTeam: 8,
      opsTeam: 6,
      marketingTeam: 4,
    },
    tasks: {
      sales_prospecting: 15,
      sales_data_entry: 8,
      sales_scheduling: 6,
      support_repetitive_questions: 18,
      support_ticketing: 10,
      support_onboarding: 8,
      marketing_repurposing: 6,
      marketing_posting: 4,
      marketing_reporting: 6,
      ops_data_transfer: 15,
      ops_reporting: 8,
      ops_onboarding_paperwork: 6,
    },
    benchmarks: {
      automationAdoption: 45,
      avgROI: 320,
      timeToValue: "4-6 months",
    },
  },
  healthcare: {
    name: "Healthcare",
    icon: "🏥",
    avgSalary: 75000,
    teams: {
      salesTeam: 6,
      supportTeam: 10,
      opsTeam: 8,
      marketingTeam: 3,
    },
    tasks: {
      sales_prospecting: 8,
      sales_data_entry: 10,
      sales_scheduling: 8,
      support_repetitive_questions: 25,
      support_ticketing: 12,
      support_onboarding: 10,
      marketing_repurposing: 4,
      marketing_posting: 3,
      marketing_reporting: 4,
      ops_data_transfer: 18,
      ops_reporting: 10,
      ops_onboarding_paperwork: 8,
    },
    benchmarks: {
      automationAdoption: 35,
      avgROI: 250,
      timeToValue: "5-7 months",
    },
  },
  ecommerce: {
    name: "E-commerce & Retail",
    icon: "🛒",
    avgSalary: 65000,
    teams: {
      salesTeam: 10,
      supportTeam: 12,
      opsTeam: 6,
      marketingTeam: 8,
    },
    tasks: {
      sales_prospecting: 10,
      sales_data_entry: 5,
      sales_scheduling: 4,
      support_repetitive_questions: 30,
      support_ticketing: 15,
      support_onboarding: 5,
      marketing_repurposing: 12,
      marketing_posting: 8,
      marketing_reporting: 6,
      ops_data_transfer: 10,
      ops_reporting: 5,
      ops_onboarding_paperwork: 3,
    },
    benchmarks: {
      automationAdoption: 55,
      avgROI: 300,
      timeToValue: "2-3 months",
    },
  },
  manufacturing: {
    name: "Manufacturing",
    icon: "🏭",
    avgSalary: 70000,
    teams: {
      salesTeam: 8,
      supportTeam: 6,
      opsTeam: 12,
      marketingTeam: 4,
    },
    tasks: {
      sales_prospecting: 12,
      sales_data_entry: 8,
      sales_scheduling: 6,
      support_repetitive_questions: 15,
      support_ticketing: 8,
      support_onboarding: 6,
      marketing_repurposing: 6,
      marketing_posting: 4,
      marketing_reporting: 5,
      ops_data_transfer: 20,
      ops_reporting: 12,
      ops_onboarding_paperwork: 6,
    },
    benchmarks: {
      automationAdoption: 40,
      avgROI: 260,
      timeToValue: "4-5 months",
    },
  },
  custom: {
    name: "Custom Configuration",
    icon: "⚙️",
    avgSalary: 75000,
    teams: {
      salesTeam: 5,
      supportTeam: 3,
      opsTeam: 2,
      marketingTeam: 2,
    },
    tasks: {
      sales_prospecting: 8,
      sales_data_entry: 5,
      sales_scheduling: 4,
      support_repetitive_questions: 15,
      support_ticketing: 6,
      support_onboarding: 4,
      marketing_repurposing: 8,
      marketing_posting: 5,
      marketing_reporting: 4,
      ops_data_transfer: 10,
      ops_reporting: 5,
      ops_onboarding_paperwork: 3,
    },
    benchmarks: {
      automationAdoption: 50,
      avgROI: 275,
      timeToValue: "3-5 months",
    },
  },
}

const initialFormData = {
  // Industry selection
  selectedIndustry: "custom",
  // Step 1
  salesTeam: 5,
  supportTeam: 3,
  opsTeam: 2,
  marketingTeam: 2,
  // Step 2 (hours per week)
  sales_prospecting: 8,
  sales_data_entry: 5,
  sales_scheduling: 4,
  support_repetitive_questions: 15,
  support_ticketing: 6,
  support_onboarding: 4,
  marketing_repurposing: 8,
  marketing_posting: 5,
  marketing_reporting: 4,
  ops_data_transfer: 10,
  ops_reporting: 5,
  ops_onboarding_paperwork: 3,
  // Step 3
  avgSalary: 75000,
  // Step 5
  name: "",
  email: "",
}

const stepsConfig = [
  { name: "Industry & Team", icon: <Building2 /> },
  { name: "Manual Tasks", icon: <Clock /> },
  { name: "Costs", icon: <DollarSign /> },
  { name: "Your ROI", icon: <TrendingUp /> },
]

export function RoiCalculator() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [results, setResults] = useState({
    annualSavings: 0,
    hoursSaved: 0,
    agenticSavings: [] as { name: string; savings: number; hours: number }[],
    industryComparison: {
      vsIndustryAvg: 0,
      automationGap: 0,
    },
  })

  const handleNext = () => {
    if (step === 2) {
      calculateROI()
    }
    setStep((s) => Math.min(s + 1, stepsConfig.length))
  }

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0))

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleTextChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIndustryChange = (industryKey: string) => {
    const industry = industryPresets[industryKey as keyof typeof industryPresets]
    if (industry && industryKey !== "custom") {
      setFormData((prev) => ({
        ...prev,
        selectedIndustry: industryKey,
        ...industry.teams,
        ...industry.tasks,
        avgSalary: industry.avgSalary,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedIndustry: industryKey,
      }))
    }
  }

  const calculateROI = () => {
    const {
      avgSalary,
      selectedIndustry,
      sales_prospecting,
      sales_data_entry,
      sales_scheduling,
      support_repetitive_questions,
      support_ticketing,
      support_onboarding,
      marketing_repurposing,
      marketing_posting,
      marketing_reporting,
      ops_data_transfer,
      ops_reporting,
      ops_onboarding_paperwork,
    } = formData

    const avgHourlyRate = avgSalary / 2080 // 52 weeks * 40 hours

    const totalSalesHours = sales_prospecting + sales_data_entry + sales_scheduling
    const totalSupportHours = support_repetitive_questions + support_ticketing + support_onboarding
    const totalMarketingHours = marketing_repurposing + marketing_posting + marketing_reporting
    const totalOpsHours = ops_data_transfer + ops_reporting + ops_onboarding_paperwork

    const totalWeeklyHoursSaved = totalSalesHours + totalSupportHours + totalMarketingHours + totalOpsHours

    const salesSavings = totalSalesHours * avgHourlyRate * 52
    const supportSavings = totalSupportHours * avgHourlyRate * 52
    const marketingSavings = totalMarketingHours * avgHourlyRate * 52
    const opsSavings = totalOpsHours * avgHourlyRate * 52

    const totalAnnualSavings = salesSavings + supportSavings + marketingSavings + opsSavings

    // Industry comparison calculations
    const industryData = industryPresets[selectedIndustry as keyof typeof industryPresets]
    const industryAvgROI = industryData?.benchmarks.avgROI || 275
    const vsIndustryAvg = (totalAnnualSavings / 1000 / industryAvgROI) * 100 - 100
    const automationGap = 100 - (industryData?.benchmarks.automationAdoption || 50)

    setResults({
      annualSavings: totalAnnualSavings,
      hoursSaved: totalWeeklyHoursSaved * 4.33, // Monthly hours
      agenticSavings: [
        { name: "Sales & Outreach Agents", savings: salesSavings, hours: totalSalesHours * 4.33 },
        { name: "Support & Concierge Agents", savings: supportSavings, hours: totalSupportHours * 4.33 },
        { name: "Content & Marketing Agents", savings: marketingSavings, hours: totalMarketingHours * 4.33 },
        { name: "Operations & Admin Agents", savings: opsSavings, hours: totalOpsHours * 4.33 },
      ],
      industryComparison: {
        vsIndustryAvg,
        automationGap,
      },
    })
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)

  const formatNumber = (num: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(num)

  const selectedIndustryData = industryPresets[formData.selectedIndustry as keyof typeof industryPresets]

  const steps = [
    <Step1 key={1} formData={formData} handleChange={handleChange} handleIndustryChange={handleIndustryChange} />,
    <Step2 key={2} formData={formData} handleChange={handleChange} selectedIndustryData={selectedIndustryData} />,
    <Step3
      key={3}
      formData={formData}
      handleChange={handleChange}
      formatCurrency={formatCurrency}
      selectedIndustryData={selectedIndustryData}
    />,
    <Step4
      key={4}
      results={results}
      formatCurrency={formatCurrency}
      formatNumber={formatNumber}
      selectedIndustryData={selectedIndustryData}
    />,
    <Step5 key={5} formData={formData} handleChange={handleTextChange} />,
  ]

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-6 md:p-10 max-w-5xl mx-auto border-purple-500/20">
      <ProgressBar currentStep={step} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>

      {step < steps.length - 1 && (
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className={`secondary-button px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-opacity ${
              step === 0 ? "opacity-0 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={step === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="primary-button px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2"
          >
            {step === 2 ? "Calculate My ROI" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center mb-8 md:mb-12">
    {stepsConfig.map((step, index) => (
      <React.Fragment key={step.name}>
        <div className="flex flex-col items-center">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2"
            animate={currentStep >= index ? "active" : "inactive"}
            variants={{
              active: {
                backgroundColor: "rgba(168, 85, 247, 0.2)",
                borderColor: "rgba(168, 85, 247, 1)",
                color: "#c084fc",
              },
              inactive: {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "#9ca3af",
              },
            }}
            transition={{ duration: 0.3 }}
          >
            {currentStep > index ? <Check /> : step.icon}
          </motion.div>
          <p
            className={`mt-2 text-xs md:text-sm text-center transition-colors ${
              currentStep >= index ? "text-white" : "text-gray-400"
            }`}
          >
            {step.name}
          </p>
        </div>
        {index < stepsConfig.length - 1 && (
          <motion.div
            className="flex-1 h-0.5 mx-4 mb-6"
            animate={currentStep > index ? "active" : "inactive"}
            variants={{
              active: {
                background: "linear-gradient(to right, #a855f7, #a855f7)",
              },
              inactive: {
                background: "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.1))",
              },
            }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
)

const Step1 = ({
  formData,
  handleChange,
  handleIndustryChange,
}: {
  formData: any
  handleChange: (name: string, value: number) => void
  handleIndustryChange: (industry: string) => void
}) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Select Your Industry</h2>
    <p className="text-center text-gray-300 mb-8 md:mb-12">
      Choose your industry to get benchmarked data and team size recommendations
    </p>

    {/* Industry Selector */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Object.entries(industryPresets).map(([key, industry]) => (
        <button
          key={key}
          onClick={() => handleIndustryChange(key)}
          className={`glass-card p-4 rounded-xl text-left transition-all duration-300 border-2 ${
            formData.selectedIndustry === key
              ? "border-purple-500 bg-purple-500/10"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{industry.icon}</span>
            <span className="font-medium text-white">{industry.name}</span>
          </div>
          {key !== "custom" && (
            <div className="text-sm text-gray-400">
              <p>Avg. automation adoption: {industry.benchmarks.automationAdoption}%</p>
              <p>Typical ROI: {industry.benchmarks.avgROI}%</p>
            </div>
          )}
        </button>
      ))}
    </div>

    {/* Team Composition */}
    <div className="border-t border-white/10 pt-8">
      <h3 className="text-xl font-semibold text-center mb-6">Your Team Composition</h3>
      {formData.selectedIndustry !== "custom" && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Industry Benchmark Applied</span>
          </div>
          <p className="text-sm text-gray-300">
            We've pre-filled typical team sizes for{" "}
            {industryPresets[formData.selectedIndustry as keyof typeof industryPresets]?.name}. Adjust the numbers below
            to match your actual team.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <TeamInputField
          icon={<TrendingUp className="text-blue-400" />}
          label="Sales"
          name="salesTeam"
          value={formData.salesTeam}
          onChange={handleChange}
        />
        <TeamInputField
          icon={<Headphones className="text-green-400" />}
          label="Support"
          name="supportTeam"
          value={formData.supportTeam}
          onChange={handleChange}
        />
        <TeamInputField
          icon={<Palette className="text-orange-400" />}
          label="Marketing"
          name="marketingTeam"
          value={formData.marketingTeam}
          onChange={handleChange}
        />
        <TeamInputField
          icon={<Briefcase className="text-purple-400" />}
          label="Operations"
          name="opsTeam"
          value={formData.opsTeam}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
)

const Step2 = ({
  formData,
  handleChange,
  selectedIndustryData,
}: {
  formData: any
  handleChange: (name: string, value: number) => void
  selectedIndustryData: any
}) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Weekly Time on Manual Tasks</h2>
    <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
      Estimate the total hours your team spends each week on these common automatable tasks.
    </p>

    {formData.selectedIndustry !== "custom" && selectedIndustryData && (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">Industry Benchmarks Applied</span>
        </div>
        <p className="text-sm text-gray-300">
          Based on {selectedIndustryData.name} industry data. Companies typically see{" "}
          {selectedIndustryData.benchmarks.avgROI}% ROI with {selectedIndustryData.benchmarks.timeToValue} time to
          value.
        </p>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
      <DepartmentTasks
        title="Sales"
        icon={<TrendingUp className="text-blue-400" />}
        tasks={[
          { name: "sales_prospecting", label: "Prospecting & Lead Research", value: formData.sales_prospecting },
          { name: "sales_data_entry", label: "CRM Data Entry & Updates", value: formData.sales_data_entry },
          { name: "sales_scheduling", label: "Scheduling & Follow-ups", value: formData.sales_scheduling },
        ]}
        onChange={handleChange}
      />
      <DepartmentTasks
        title="Support"
        icon={<Headphones className="text-green-400" />}
        tasks={[
          {
            name: "support_repetitive_questions",
            label: "Answering Repetitive Questions",
            value: formData.support_repetitive_questions,
          },
          { name: "support_ticketing", label: "Ticket Categorization & Routing", value: formData.support_ticketing },
          {
            name: "support_onboarding",
            label: "Client Onboarding & Welcome Messages",
            value: formData.support_onboarding,
          },
        ]}
        onChange={handleChange}
      />
      <DepartmentTasks
        title="Marketing"
        icon={<Palette className="text-orange-400" />}
        tasks={[
          { name: "marketing_repurposing", label: "Repurposing Content", value: formData.marketing_repurposing },
          { name: "marketing_posting", label: "Social Media Posting", value: formData.marketing_posting },
          { name: "marketing_reporting", label: "Generating Performance Reports", value: formData.marketing_reporting },
        ]}
        onChange={handleChange}
      />
      <DepartmentTasks
        title="Operations"
        icon={<Briefcase className="text-purple-400" />}
        tasks={[
          { name: "ops_data_transfer", label: "Data Transfer Between Apps", value: formData.ops_data_transfer },
          { name: "ops_reporting", label: "Generating Internal Reports", value: formData.ops_reporting },
          {
            name: "ops_onboarding_paperwork",
            label: "Employee Onboarding Paperwork",
            value: formData.ops_onboarding_paperwork,
          },
        ]}
        onChange={handleChange}
      />
    </div>
  </div>
)

const Step3 = ({
  formData,
  handleChange,
  formatCurrency,
  selectedIndustryData,
}: {
  formData: any
  handleChange: (name: string, value: number) => void
  formatCurrency: (val: number) => string
  selectedIndustryData: any
}) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Employee Costs</h2>
    <p className="text-center text-gray-300 mb-8 md:mb-12">
      What is the average annual fully-loaded salary for an employee at your company?
    </p>

    {formData.selectedIndustry !== "custom" && selectedIndustryData && (
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">Industry Average</span>
        </div>
        <p className="text-sm text-gray-300">
          {selectedIndustryData.name} average: {formatCurrency(selectedIndustryData.avgSalary)}
        </p>
      </div>
    )}

    <div className="max-w-md mx-auto">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <DollarSign className="w-5 h-5" />
        </span>
        <input
          type="number"
          name="avgSalary"
          value={formData.avgSalary}
          onChange={(e) => handleChange("avgSalary", Number(e.target.value))}
          step={5000}
          className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white text-center text-2xl font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
      </div>
      <p className="text-center text-gray-400 mt-4">= {formatCurrency(formData.avgSalary / 12)} / month</p>

      {selectedIndustryData && formData.avgSalary !== selectedIndustryData.avgSalary && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            {formData.avgSalary > selectedIndustryData.avgSalary ? "↑" : "↓"}
            {Math.abs(
              ((formData.avgSalary - selectedIndustryData.avgSalary) / selectedIndustryData.avgSalary) * 100,
            ).toFixed(0)}
            %{formData.avgSalary > selectedIndustryData.avgSalary ? " above" : " below"} industry average
          </p>
        </div>
      )}
    </div>
  </div>
)

const Step4 = ({
  results,
  formatCurrency,
  formatNumber,
  selectedIndustryData,
}: {
  results: any
  formatCurrency: (val: number) => string
  formatNumber: (val: number) => string
  selectedIndustryData: any
}) => (
  <div>
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Your Automation Blueprint</h2>
    <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
      Based on your inputs, here's the potential impact of deploying our Agentic AI solutions.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="glass-card p-6 rounded-2xl text-center bg-green-500/10 border-green-500/20">
        <p className="text-gray-300 mb-2 text-lg">Estimated Annual Savings</p>
        <p className="text-4xl md:text-5xl font-bold text-white">{formatCurrency(results.annualSavings)}</p>
        {selectedIndustryData && (
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <p className="text-sm text-green-400">
              {results.industryComparison.vsIndustryAvg > 0 ? "↑" : "↓"}
              {Math.abs(results.industryComparison.vsIndustryAvg).toFixed(0)}%
              {results.industryComparison.vsIndustryAvg > 0 ? " above" : " below"} industry average
            </p>
          </div>
        )}
      </div>
      <div className="glass-card p-6 rounded-2xl text-center bg-blue-500/10 border-blue-500/20">
        <p className="text-gray-300 mb-2 text-lg">Monthly Hours Reclaimed</p>
        <p className="text-4xl md:text-5xl font-bold text-white">{formatNumber(results.hoursSaved)}</p>
        {selectedIndustryData && (
          <div className="mt-3 pt-3 border-t border-blue-500/20">
            <p className="text-sm text-blue-400">Time to value: {selectedIndustryData.benchmarks.timeToValue}</p>
          </div>
        )}
      </div>
    </div>

    {/* Industry Insights */}
    {selectedIndustryData && selectedIndustryData.name !== "Custom Configuration" && (
      <div className="glass-card p-6 rounded-2xl mb-8 bg-purple-500/10 border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          {selectedIndustryData.name} Industry Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{selectedIndustryData.benchmarks.automationAdoption}%</p>
            <p className="text-sm text-gray-400">Current automation adoption</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{results.industryComparison.automationGap}%</p>
            <p className="text-sm text-gray-400">Automation opportunity gap</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{selectedIndustryData.benchmarks.timeToValue}</p>
            <p className="text-sm text-gray-400">Typical time to value</p>
          </div>
        </div>
      </div>
    )}

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center">Breakdown by AI Agent Category</h3>
      {results.agenticSavings
        .filter((item: any) => item.savings > 0)
        .map((item: any, index: number) => (
          <motion.div
            key={item.name}
            className="glass-card p-4 rounded-xl flex items-center justify-between bg-white/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p className="font-medium">{item.name}</p>
            <div className="text-right">
              <p className="font-bold text-green-400">{formatCurrency(item.savings)}/yr</p>
              <p className="text-sm text-blue-400">{formatNumber(item.hours)} hrs/mo</p>
            </div>
          </motion.div>
        ))}
    </div>
  </div>
)

const Step5 = ({ formData, handleChange }: { formData: any; handleChange: (name: string, value: string) => void }) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Get Your Detailed Blueprint</h2>
    <p className="text-center text-gray-300 mb-8">
      Enter your details to receive your personalized AI Automation report and a free consultation.
    </p>
    <form className="max-w-md mx-auto space-y-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <User className="w-5 h-5" />
        </span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Full Name"
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
      </div>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Mail className="w-5 h-5" />
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Work Email"
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
      </div>
      <button
        type="submit"
        className="w-full primary-button px-6 py-3 rounded-full text-base font-medium flex items-center justify-center gap-2"
      >
        Send My Blueprint
      </button>
    </form>
  </div>
)

const TeamInputField = ({
  icon,
  label,
  name,
  value,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  name: string
  value: number
  onChange: (name: string, value: number) => void
}) => {
  const handleIncrement = () => onChange(name, value + 1)
  const handleDecrement = () => onChange(name, Math.max(0, value - 1))

  return (
    <div className="glass-card p-4 rounded-xl text-center bg-white/5 hover:bg-white/10 transition-colors flex flex-col">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
        {icon}
      </div>
      <label className="block text-sm font-medium text-gray-300 mb-2 flex-grow">{label}</label>
      <div className="flex items-center justify-center space-x-4">
        <button type="button" onClick={handleDecrement} className="p-2 rounded-full bg-white/5 hover:bg-white/10">
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-bold text-white w-10 text-center">{value}</span>
        <button type="button" onClick={handleIncrement} className="p-2 rounded-full bg-white/5 hover:bg-white/10">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const DepartmentTasks = ({
  title,
  icon,
  tasks,
  onChange,
}: {
  title: string
  icon: React.ReactNode
  tasks: { name: string; label: string; value: number }[]
  onChange: (name: string, value: number) => void
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-3 pl-4 border-l-2 border-white/10 ml-4">
      {tasks.map((task) => (
        <HourInputField key={task.name} {...task} onChange={onChange} />
      ))}
    </div>
  </div>
)

const HourInputField = ({
  name,
  label,
  value,
  onChange,
}: {
  name: string
  label: string
  value: number
  onChange: (name: string, value: number) => void
}) => {
  const handleIncrement = () => onChange(name, value + 1)
  const handleDecrement = () => onChange(name, Math.max(0, value - 1))

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-300">{label}</label>
      <div className="flex items-center justify-center space-x-2 glass px-2 py-1 rounded-full border border-white/10">
        <button type="button" onClick={handleDecrement} className="p-1 rounded-full hover:bg-white/10">
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-sm font-semibold text-white w-8 text-center">{value}</span>
        <button type="button" onClick={handleIncrement} className="p-1 rounded-full hover:bg-white/10">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
