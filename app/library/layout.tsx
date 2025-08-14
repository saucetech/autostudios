import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "AI Library - Autonomous Studios",
  description:
    "Explore articles, guides, and resources on leveraging AI for business growth, automation, and efficiency.",
}

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative z-10 w-full px-6 py-20 pt-32 md:pt-40">{children}</main>
      <Footer />
    </>
  )
}
