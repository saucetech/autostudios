import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How does integration with our existing software work?",
    answer:
      "Our team works with you to integrate AI agents with your existing systems through APIs, webhooks, and other standard integration methods. The specific approach depends on your current software stack and requirements. We handle the technical implementation as part of our service.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer:
      "Data security is a top priority. We implement industry-standard security measures including encryption for data in transit and at rest. Our infrastructure follows enterprise security best practices. We work with you to ensure compliance with your specific security requirements and applicable regulations.",
  },
  {
    question: "What is the typical implementation timeline?",
    answer:
      "Implementation timelines vary based on project complexity and requirements. Our typical process ranges from 30-90 days from initial consultation to deployment. We provide a detailed timeline during our discovery phase based on your specific needs.",
  },
  {
    question: "What kind of ongoing support do you provide?",
    answer:
      "We provide ongoing monitoring, maintenance, and optimization services. You'll have access to our support team for questions and adjustments. We also provide regular performance reports to help you track the impact of your AI implementations.",
  },
  {
    question: "Can the AI agents be customized for our specific workflows?",
    answer:
      "Yes, customization is central to our approach. During our discovery phase, we analyze your specific workflows and requirements. The AI agents are then designed and configured to work within your existing processes and business logic.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "We offer subscription-based pricing that varies depending on the complexity and number of AI agents deployed. Pricing is discussed during our consultation phase after we understand your specific requirements. We aim to provide transparent, predictable costs that deliver clear value.",
  },
]

export function Faq() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 text-sm font-medium text-cyan-300 glass rounded-full mb-6 border border-cyan-400/30">
          Common Questions
        </span>
        <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6">
          Frequently Asked{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Questions</span>
        </h2>
        <p className="max-w-3xl text-xl text-gray-300 mx-auto">
          Learn more about our AI solutions and implementation process.
        </p>
      </div>

      <div className="card-border p-2">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 last:border-b-0">
              <AccordionTrigger className="p-6 text-left text-base md:text-lg font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0 text-gray-300 leading-relaxed">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
