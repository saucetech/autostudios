"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SignupForm } from "@/components/auth/signup-form"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const handleConsultationRequest = () => {
    // In production, integrate with CRM or booking system
    console.log("Consultation request submitted")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-200 hover:text-white hover:bg-white/10 mb-6 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <SignupForm onPaymentRequired={handleConsultationRequest} />

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Existing client?{" "}
            <Link href="/login" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
              Sign in to dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
