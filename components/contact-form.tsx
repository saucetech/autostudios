"use client"

import type React from "react"
import { useState } from "react"
import { User, Mail, Phone, Building, MessageSquare, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Thank you! We'll be in touch soon.")
        setFormData({ name: "", email: "", phone: "", company: "", message: "" })

        // Optional: Track conversion event for analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "conversion", {
            send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Replace with your Google Ads conversion ID
            value: 1.0,
            currency: "USD",
          })
        }

        // Optional: Facebook Pixel tracking
        if (typeof window !== "undefined" && (window as any).fbq) {
          ;(window as any).fbq("track", "Lead")
        }
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setStatusMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-6 py-3 text-sm font-semibold text-emerald-300 glass-card-subtle rounded-full mb-8 border border-emerald-400/30">
          Get Started
        </span>
        <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6 text-white">
          Let's Build Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Autonomous Future
          </span>
        </h2>
        <p className="max-w-3xl text-xl text-gray-200 mx-auto leading-relaxed">
          Ready to see how Agentic AI can transform your business? Fill out the form below, and one of our AI
          strategists will be in touch to schedule your free consultation.
        </p>
      </div>

      <div className="glass-card-strong p-8 md:p-12">
        {submitStatus === "success" ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Thank You!</h3>
            <p className="text-gray-200 mb-6">{statusMessage}</p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="glass-input w-full py-4 pl-12 pr-4 text-white placeholder-gray-300 transition disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Work Email
              </label>
              <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="glass-input w-full py-4 pl-12 pr-4 text-white placeholder-gray-300 transition disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <Phone className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="glass-input w-full py-4 pl-12 pr-4 text-white placeholder-gray-300 transition disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label htmlFor="company" className="sr-only">
                Company Name
              </label>
              <Building className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
              <input
                type="text"
                name="company"
                id="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className="glass-input w-full py-4 pl-12 pr-4 text-white placeholder-gray-300 transition disabled:opacity-50"
              />
            </div>

            <div className="md:col-span-2 relative">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <MessageSquare className="absolute top-5 left-4 w-5 h-5 text-gray-300 pointer-events-none" />
              <textarea
                name="message"
                id="message"
                placeholder="Tell us about your automation goals..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={5}
                className="glass-input w-full py-4 pl-12 pr-4 text-white placeholder-gray-300 resize-none disabled:opacity-50"
              />
            </div>

            {submitStatus === "error" && (
              <div className="md:col-span-2 flex items-center gap-3 text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="primary-button px-10 py-4 text-white rounded-full font-semibold text-base flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
              >
                <span>{isSubmitting ? "Submitting..." : "Request a Consultation"}</span>
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
