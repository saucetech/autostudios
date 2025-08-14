"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/login" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Link>

        <div className="glass-card p-8 space-y-6">
          {!isSubmitted ? (
            <>
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white">Forgot Password?</h1>
                <p className="text-gray-400">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="glass-input bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:bg-white/8 transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-medium rounded-lg h-[60px] transition-all duration-200"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Check Your Email</h1>
              <p className="text-gray-400">
                We've sent a password reset link to <span className="text-white">{email}</span>
              </p>
              <p className="text-sm text-gray-500">Didn't receive the email? Check your spam folder or try again.</p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-4 border-white/20 text-white hover:bg-white/10"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
