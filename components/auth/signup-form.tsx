"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Calendar, Check, Building2 } from "lucide-react"

interface SignupFormProps {
  onPaymentRequired: () => void
}

export function SignupForm({ onPaymentRequired }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [currentChallenges, setCurrentChallenges] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // In production, this would integrate with Calendly or similar booking system
    setTimeout(() => {
      alert(
        "Thank you for your interest! Our sales team will contact you within 24 hours to schedule a consultation call.",
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="glass-card-strong border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-light text-white mb-2">Request Enterprise Demo</CardTitle>
        <CardDescription className="text-gray-200 text-lg">
          Get a custom AI automation solution for your business
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="glass-input py-4 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Business Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass-input py-4 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="glass-input py-4 text-white placeholder-gray-300"
            />
          </div>
          <div>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              required
              className="glass-input w-full py-4 text-white"
            >
              <option value="" className="bg-gray-900">
                Select Company Size
              </option>
              <option value="1-10" className="bg-gray-900">
                1-10 employees
              </option>
              <option value="11-50" className="bg-gray-900">
                11-50 employees
              </option>
              <option value="51-200" className="bg-gray-900">
                51-200 employees
              </option>
              <option value="201-1000" className="bg-gray-900">
                201-1000 employees
              </option>
              <option value="1000+" className="bg-gray-900">
                1000+ employees
              </option>
            </select>
          </div>
          <div>
            <textarea
              placeholder="What business challenges are you looking to solve with AI automation?"
              value={currentChallenges}
              onChange={(e) => setCurrentChallenges(e.target.value)}
              required
              className="glass-input w-full py-4 min-h-[100px] resize-none text-white placeholder-gray-300"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/30">
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <div className="glass-card-subtle p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-blue-400" />
              <h3 className="font-semibold text-white text-lg">Enterprise Solution</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-200 mb-4">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                Custom AI workflow development
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                Dedicated implementation team
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                24/7 priority support & monitoring
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                ROI-guaranteed automation solutions
              </li>
            </ul>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-gray-200">
                <strong className="text-white">Investment:</strong> $2,000-$3,000/month • 6-12 month contracts
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full primary-button py-4 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Request Consultation Call"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
