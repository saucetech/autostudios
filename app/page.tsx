"use client"

import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { RoiCalculator } from "@/components/roi-calculator"
import { AgentSuite } from "@/components/agent-suite"
import { SocialProof } from "@/components/social-proof"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ContactForm } from "@/components/contact-form"
import { ComparisonTable } from "@/components/comparison-table"
import { Faq } from "@/components/faq"

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 pt-28">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
            <span className="text-sm text-gray-300 font-normal">Trusted by growing businesses</span>
          </div>

          {/* Main Heading */}
          <div className="mb-8 float-animation">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Agentic AI Solutions That
              <span className="gradient-text block tracking-tight">Drive Business Growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Deploy intelligent AI agents designed to help optimize your business processes, with the potential to
              reduce costs and improve efficiency in as little as 30 days.
            </p>
          </div>

          {/* ROI Badge */}
          <div className="inline-flex items-center space-x-2 mb-8">
            <span className="text-sm text-gray-400 font-normal">Clients typically see</span>
            <span className="roi-gradient text-2xl font-semibold">significant ROI</span>
            <span className="text-sm text-gray-400 font-normal">within 90 days*</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="primary-button px-8 py-4 text-white rounded-full font-medium text-base min-w-48 flex items-center justify-center space-x-2"
            >
              <span>Start Your AI Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="secondary-button px-8 py-4 rounded-full text-white font-medium text-base min-w-48 flex items-center justify-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Watch Success Stories</span>
            </button>
          </div>

          <div className="relative z-10 divider mb-16"></div>

          {/* Social Proof Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 text-center mb-16">
            <div>
              <div className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">$10M+</div>
              <div className="text-gray-400 text-sm font-normal">Potential Savings Identified*</div>
            </div>
            <div className="hidden sm:block vertical-divider h-16"></div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">500+</div>
              <div className="text-gray-400 text-sm font-normal">AI Workflows Created</div>
            </div>
            <div className="hidden sm:block vertical-divider h-16"></div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">30-90 Days</div>
              <div className="text-gray-400 text-sm font-normal">Typical Implementation</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm font-normal mb-4">Serving businesses of all sizes</div>
            <div className="flex items-center space-x-8 opacity-40">
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-white text-sm font-medium">Enterprise</span>
              </div>
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-white text-sm font-medium">Mid-Market</span>
              </div>
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-white text-sm font-medium">Scale-ups</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a href="#roi-calculator" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-normal">See ROI Calculator</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </a>
      </main>

      <section id="solutions" className="relative z-10 w-full px-6 py-20 md:py-28">
        <AgentSuite />
      </section>

      <section id="roi-calculator" className="relative z-10 w-full px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-medium text-purple-300 glass rounded-full mb-6 border border-purple-400/30">
            Business Diagnostic
          </span>
          <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6">
            Estimate Your Potential AI{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Return on Investment
            </span>
          </h2>
          <p className="max-w-3xl text-xl text-gray-300 mx-auto">
            Use our interactive calculator to get a personalized estimate of the potential time and cost savings from
            deploying our AI solutions.
          </p>
        </div>
        <RoiCalculator />
      </section>

      <section id="how-it-works" className="relative z-10 w-full px-6 py-20 md:py-28">
        <HowItWorks />
      </section>

      <section id="comparison" className="relative z-10 w-full px-6 py-20 md:py-28">
        <ComparisonTable />
      </section>

      <section id="faq" className="relative z-10 w-full px-6 py-20 md:py-28">
        <Faq />
      </section>

      <section id="contact" className="relative z-10 w-full px-6 py-20 md:py-28">
        <ContactForm />
      </section>

      <section id="social-proof" className="relative z-10 w-full px-6 py-20 md:py-28">
        <SocialProof />
      </section>

      <Footer />

      {/* Legal Disclaimer */}
      <div className="relative z-10 bg-black/80 border-t border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-500 text-center">
            *Results may vary. Past performance does not guarantee future results. ROI calculations are estimates based
            on client-provided data and industry benchmarks. Individual results depend on various factors including
            implementation, usage, and business context.
          </p>
        </div>
      </div>
    </>
  )
}
