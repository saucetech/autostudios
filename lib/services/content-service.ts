export interface ContentItem {
  id: string
  title: string
  content?: string
  description?: string
  type: "post" | "script" | "video" | "image" | "audio"
  status: "ideas" | "in-progress" | "review" | "published"
  priority: "low" | "medium" | "high" | "urgent"
  tags?: string[]
  platforms?: string[]
  viral_hook?: string
  predicted_engagement?: number
  viral_analysis_score?: number
  views?: number
  engagement?: number
  shares?: number
  starred?: boolean
  flagged?: boolean
  created_at: string
  updated_at: string
  scheduled_for?: string
  published_at?: string
}

// In-memory storage for demo purposes
const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "AI Security Concerns",
    content:
      "# AI Security Concerns\n\n## Introduction\nSecurity is often the biggest concern when businesses consider implementing AI solutions...\n\n## Common Concerns\n\n### Data Privacy\nBusinesses worry about sensitive data being processed by AI systems. However, modern AI platforms implement enterprise-grade security measures including:\n\n- End-to-end encryption\n- Zero-trust architecture\n- Compliance with GDPR, HIPAA, and SOC 2\n- Regular security audits\n\n### System Vulnerabilities\nAI systems can be targets for cyberattacks, but proper implementation includes:\n\n- Regular security updates\n- Penetration testing\n- Access controls and authentication\n- Monitoring and alerting systems\n\n## Best Practices\n\n1. **Choose reputable AI providers** with proven security track records\n2. **Implement proper access controls** and user authentication\n3. **Regular security audits** and vulnerability assessments\n4. **Employee training** on AI security best practices\n5. **Data governance policies** for AI implementations\n\n## Conclusion\n\nWhile AI security concerns are valid, they shouldn't prevent businesses from leveraging AI's transformative power. With proper planning and implementation, AI can be both powerful and secure.",
    description: "Addressing common security concerns about AI implementation in business",
    type: "post",
    status: "ideas",
    priority: "high",
    tags: ["Security", "AI", "Concerns"],
    platforms: ["Blog", "LinkedIn"],
    viral_hook: "What if I told you that AI security isn't as scary as you think?",
    predicted_engagement: 6,
    viral_analysis_score: 72,
    starred: true,
    flagged: false,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "ROI Calculator Script",
    content:
      '# ROI Calculator for AI Implementation\n\n## Introduction Script\n\n**Hook:** "What if I told you that you could calculate the exact ROI of AI implementation in your business in just 5 minutes?"\n\n## Calculator Walkthrough\n\n### Step 1: Current Costs\n- Manual labor hours per week\n- Average hourly wage\n- Error correction costs\n- Opportunity costs\n\n### Step 2: AI Implementation Costs\n- Initial setup investment\n- Monthly subscription fees\n- Training and onboarding\n- Integration costs\n\n### Step 3: Expected Benefits\n- Time savings (hours per week)\n- Error reduction percentage\n- Increased capacity\n- New revenue opportunities\n\n## Sample Calculation\n\n**Current State:**\n- 40 hours/week manual work at $25/hour = $1,000/week\n- 10% error rate costing $200/week in corrections\n- Total weekly cost: $1,200\n\n**With AI:**\n- 90% automation = 36 hours saved\n- 95% error reduction = $190 saved\n- Weekly savings: $1,090\n- Monthly savings: $4,360\n- Annual savings: $52,320\n\n**Investment:**\n- Setup: $5,000\n- Monthly: $500\n- Annual cost: $11,000\n\n**ROI: 375% in first year**\n\n## Call to Action\n"Ready to see your specific ROI? Use our calculator and discover how much AI could save your business."',
    description: "Interactive script for calculating AI implementation ROI",
    type: "script",
    status: "in-progress",
    priority: "medium",
    tags: ["ROI", "Calculator", "Business"],
    platforms: ["Website", "Sales"],
    viral_hook: "See exactly how much money AI can save your business in 60 seconds",
    predicted_engagement: 8,
    viral_analysis_score: 85,
    starred: false,
    flagged: false,
    created_at: "2024-01-14T14:30:00Z",
    updated_at: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    title: "Customer Success Video",
    content:
      '# Customer Success Story: TechCorp\n\n## Video Script\n\n### Opening (0-15 seconds)\n**Visual:** TechCorp office, busy employees\n**Voiceover:** "Meet TechCorp, a growing software company that was drowning in manual processes..."\n\n### Problem Statement (15-45 seconds)\n**Visual:** Employees working late, stressed faces, piles of paperwork\n**Voiceover:** "Like many businesses, TechCorp was spending 60% of their time on repetitive tasks instead of growing their business."\n\n**On-screen stats:**\n- 40 hours/week on data entry\n- 25% error rate\n- $50,000 annual cost in corrections\n- Employees working overtime\n\n### Solution Introduction (45-90 seconds)\n**Visual:** Clean, modern AI dashboard\n**Voiceover:** "That\'s when they discovered our AI automation platform..."\n\n**Demo of key features:**\n- Automated data processing\n- Real-time error detection\n- Intelligent workflow routing\n- Performance analytics\n\n### Implementation Process (90-120 seconds)\n**Visual:** Timeline animation\n**Voiceover:** "Implementation was surprisingly simple..."\n\n**Timeline:**\n- Week 1: Assessment and planning\n- Week 2: System integration\n- Week 3: Team training\n- Week 4: Full deployment\n\n### Results (120-150 seconds)\n**Visual:** Before/after comparison charts\n**Voiceover:** "The results exceeded all expectations..."\n\n**Key Metrics:**\n- 300% efficiency increase\n- 95% error reduction\n- $150,000 annual savings\n- 20 hours/week time savings\n- 98% employee satisfaction\n\n### Testimonial (150-180 seconds)\n**Visual:** CEO interview\n**CEO Quote:** "This AI solution didn\'t just improve our processes—it transformed our entire business. We\'re now focusing on growth instead of just keeping up."\n\n### Call to Action (180-200 seconds)\n**Visual:** Company logo and contact information\n**Voiceover:** "Ready to transform your business like TechCorp? Schedule your free consultation today."\n\n## Production Notes\n- Professional lighting and audio\n- Branded graphics and animations\n- Upbeat, inspiring background music\n- Clear call-to-action overlay\n- Mobile-optimized versions',
    description: "Video showcasing how TechCorp achieved 300% efficiency gains",
    type: "video",
    status: "review",
    priority: "high",
    tags: ["Success Story", "Video", "TechCorp"],
    platforms: ["YouTube", "Website", "Social"],
    viral_hook: "This company increased efficiency by 300% in just 30 days",
    predicted_engagement: 9,
    viral_analysis_score: 92,
    views: 1250,
    engagement: 89,
    shares: 23,
    starred: true,
    flagged: false,
    created_at: "2024-01-12T11:20:00Z",
    updated_at: "2024-01-15T08:45:00Z",
    scheduled_for: "2024-01-20T15:00:00Z",
  },
  {
    id: "4",
    title: "AI Automation Infographic",
    content:
      '# AI Automation Benefits Infographic\n\n## Design Specifications\n- **Dimensions:** 1080x1350px (Instagram optimized)\n- **Style:** Modern, clean, professional\n- **Color Scheme:** Purple gradient with white text\n- **Typography:** Sans-serif, highly readable\n\n## Content Structure\n\n### Header\n**Title:** "10 Ways AI Automation Transforms Business"\n**Subtitle:** "The Future is Now"\n\n### Main Benefits (with icons)\n\n1. **⚡ Speed** - 10x faster processing\n2. **🎯 Accuracy** - 99.9% error reduction\n3. **💰 Cost Savings** - 60% operational cost reduction\n4. **🔄 24/7 Operations** - Never stops working\n5. **📈 Scalability** - Grows with your business\n6. **🧠 Smart Decisions** - Data-driven insights\n7. **👥 Employee Satisfaction** - Focus on meaningful work\n8. **🔒 Security** - Enterprise-grade protection\n9. **📊 Analytics** - Real-time performance tracking\n10. **🚀 Innovation** - Competitive advantage\n\n### Statistics Section\n**"Businesses Using AI Report:"**\n- 40% revenue increase\n- 60% time savings\n- 85% customer satisfaction\n- 70% employee productivity boost\n\n### Call to Action\n**"Ready to Transform Your Business?"**\n- QR code linking to consultation booking\n- Website URL\n- "Schedule Free Consultation"\n\n### Footer\n- Company logo\n- Social media handles\n- Contact information\n\n## Visual Elements\n- Gradient background (purple to blue)\n- Clean icons for each benefit\n- Progress bars for statistics\n- Professional photography or illustrations\n- Consistent spacing and alignment\n- High contrast for readability\n\n## Distribution Strategy\n- Instagram feed and stories\n- LinkedIn company page\n- Twitter with thread breakdown\n- Website blog integration\n- Email newsletter inclusion\n- Sales presentation material',
    description: "Infographic showing the top 10 benefits of AI automation",
    type: "image",
    status: "published",
    priority: "medium",
    tags: ["Infographic", "Automation", "Benefits"],
    platforms: ["Instagram", "Twitter", "LinkedIn"],
    viral_hook: "10 ways AI automation is changing business forever",
    predicted_engagement: 7,
    viral_analysis_score: 78,
    views: 3420,
    engagement: 234,
    shares: 67,
    starred: false,
    flagged: false,
    created_at: "2024-01-10T16:45:00Z",
    updated_at: "2024-01-13T12:30:00Z",
    published_at: "2024-01-13T15:00:00Z",
  },
  {
    id: "5",
    title: "Podcast: Future of Work",
    content:
      '# Podcast Episode: The Future of Work with AI\n\n## Episode Overview\n- **Duration:** 45 minutes\n- **Format:** Interview with industry expert\n- **Target Audience:** Business leaders and entrepreneurs\n- **Release Date:** TBD\n\n## Episode Outline\n\n### Introduction (0-3 minutes)\n**Host Introduction:**\n"Welcome to Business AI Insights, the podcast where we explore how artificial intelligence is reshaping the business landscape. I\'m your host, and today we\'re diving deep into the future of work."\n\n**Guest Introduction:**\n"Joining me today is Dr. Sarah Chen, AI researcher and author of \'The Automated Workplace.\' Sarah has helped over 500 companies successfully integrate AI into their operations."\n\n### Segment 1: Current State of AI in Workplace (3-15 minutes)\n**Key Discussion Points:**\n- Current AI adoption rates across industries\n- Most common AI applications in business\n- Success stories and case studies\n- Common misconceptions about AI replacing jobs\n\n**Sample Questions:**\n- "What\'s the biggest myth about AI in the workplace?"\n- "Which industries are leading AI adoption?"\n- "How has AI adoption accelerated post-pandemic?"\n\n### Segment 2: The Human-AI Collaboration (15-30 minutes)\n**Key Discussion Points:**\n- How AI augments human capabilities\n- New job roles created by AI\n- Skills workers need for AI-powered future\n- Training and reskilling strategies\n\n**Sample Questions:**\n- "How do you see humans and AI working together?"\n- "What new job roles are emerging?"\n- "How should companies prepare their workforce?"\n\n### Segment 3: Future Predictions (30-40 minutes)\n**Key Discussion Points:**\n- AI trends for the next 5-10 years\n- Industries that will be most transformed\n- Potential challenges and solutions\n- Advice for business leaders\n\n**Sample Questions:**\n- "What will the workplace look like in 2030?"\n- "What should CEOs be thinking about now?"\n- "How can small businesses compete with AI?"\n\n### Rapid Fire Q&A (40-43 minutes)\n**Quick Questions:**\n- Best AI tool for small business?\n- Biggest AI implementation mistake?\n- One piece of advice for AI skeptics?\n- Most exciting AI development recently?\n\n### Closing (43-45 minutes)\n**Wrap-up:**\n- Key takeaways summary\n- Guest contact information\n- Next episode preview\n- Call to action for listeners\n\n## Production Notes\n- High-quality audio recording\n- Professional intro/outro music\n- Show notes with timestamps\n- Transcript for accessibility\n- Social media clips for promotion\n\n## Distribution Strategy\n- Spotify, Apple Podcasts, Google Podcasts\n- YouTube video version\n- Blog post summary\n- Social media promotion\n- Email newsletter feature',
    description: "Podcast episode discussing how AI is reshaping the workplace",
    type: "audio",
    status: "ideas",
    priority: "low",
    tags: ["Podcast", "Future", "Workplace"],
    platforms: ["Spotify", "Apple Podcasts"],
    viral_hook: "The workplace revolution that's happening right now",
    predicted_engagement: 5,
    viral_analysis_score: 65,
    starred: false,
    flagged: true,
    created_at: "2024-01-08T09:15:00Z",
    updated_at: "2024-01-08T09:15:00Z",
  },
  {
    id: "6",
    title: "Lead Generation Playbook",
    content:
      '# AI-Powered Lead Generation Playbook\n\n## Table of Contents\n1. Introduction to Modern Lead Generation\n2. Understanding Your Ideal Customer Profile\n3. AI Tools for Lead Identification\n4. Automated Outreach Strategies\n5. Lead Scoring and Qualification\n6. Nurturing Campaigns\n7. Conversion Optimization\n8. Measuring and Optimizing Performance\n\n## Chapter 1: Introduction to Modern Lead Generation\n\n### The Evolution of Lead Generation\nTraditional lead generation methods are becoming less effective:\n- Cold calling success rates have dropped to 2%\n- Email open rates continue to decline\n- Generic marketing messages are ignored\n- Buyers are more informed and selective\n\n### The AI Advantage\nAI transforms lead generation by:\n- **Precision Targeting:** Identify prospects with 90% accuracy\n- **Personalization at Scale:** Customize messages for thousands of prospects\n- **Predictive Analytics:** Forecast which leads will convert\n- **Automated Workflows:** Nurture leads 24/7 without manual intervention\n\n### Key Statistics\n- Companies using AI for lead generation see 50% more qualified leads\n- AI-powered personalization increases conversion rates by 202%\n- Automated lead nurturing generates 50% more sales-ready leads\n- Businesses using AI report 37% faster lead response times\n\n## Chapter 2: Understanding Your Ideal Customer Profile\n\n### Data-Driven ICP Development\nUse AI to analyze your best customers:\n\n**Demographic Analysis:**\n- Company size and revenue\n- Industry and sub-industry\n- Geographic location\n- Technology stack\n\n**Behavioral Patterns:**\n- Website engagement metrics\n- Content consumption preferences\n- Social media activity\n- Purchase decision timeline\n\n**Pain Point Identification:**\n- Common challenges and frustrations\n- Current solution limitations\n- Budget constraints\n- Decision-making process\n\n### AI Tools for ICP Analysis\n1. **Customer Data Platforms (CDP)**\n2. **Predictive Analytics Tools**\n3. **Social Listening Platforms**\n4. **Website Analytics with AI Insights**\n\n## Chapter 3: AI Tools for Lead Identification\n\n### Lead Discovery Platforms\n**Top AI-Powered Tools:**\n\n1. **ZoomInfo with AI Insights**\n   - Intent data analysis\n   - Technographic information\n   - Real-time company updates\n\n2. **Apollo.io**\n   - AI-powered prospecting\n   - Email finder and verification\n   - Engagement tracking\n\n3. **Clearbit**\n   - Company and contact enrichment\n   - Visitor identification\n   - Lead scoring algorithms\n\n### Intent Data Analysis\n**Identifying Buying Signals:**\n- Website visitor behavior\n- Content engagement patterns\n- Search query analysis\n- Social media mentions\n- Technology adoption signals\n\n## Chapter 4: Automated Outreach Strategies\n\n### Multi-Channel Approach\n**Channel Integration:**\n- Email sequences\n- LinkedIn outreach\n- Social media engagement\n- Retargeting ads\n- Direct mail (for high-value prospects)\n\n### AI-Powered Personalization\n**Message Customization:**\n- Company-specific pain points\n- Industry-relevant case studies\n- Personalized subject lines\n- Dynamic content insertion\n- Optimal send time prediction\n\n### Sample Email Sequence\n\n**Email 1: Problem Identification**\nSubject: "[Company] struggling with [specific challenge]?"\n\n**Email 2: Social Proof**\nSubject: "How [similar company] solved [challenge]"\n\n**Email 3: Value Proposition**\nSubject: "3-minute solution for [Company\'s challenge]"\n\n**Email 4: Case Study**\nSubject: "[Competitor] increased [metric] by X%"\n\n**Email 5: Direct Ask**\nSubject: "Quick question about [Company\'s] [process]"\n\n## Chapter 5: Lead Scoring and Qualification\n\n### AI-Powered Scoring Models\n**Scoring Factors:**\n- Demographic fit (40%)\n- Behavioral engagement (35%)\n- Intent signals (25%)\n\n**Behavioral Indicators:**\n- Email opens and clicks\n- Website page views\n- Content downloads\n- Video engagement\n- Social media interactions\n\n### Automated Qualification\n**BANT Criteria Automation:**\n- **Budget:** Company revenue and funding data\n- **Authority:** Job title and decision-making power\n- **Need:** Intent data and pain point analysis\n- **Timeline:** Buying signal urgency\n\n## Chapter 6: Nurturing Campaigns\n\n### Lifecycle-Based Nurturing\n**Awareness Stage:**\n- Educational content\n- Industry insights\n- Problem identification\n\n**Consideration Stage:**\n- Solution comparisons\n- Case studies\n- ROI calculators\n\n**Decision Stage:**\n- Product demos\n- Free trials\n- Consultation offers\n\n### AI-Driven Content Recommendations\n- Behavioral trigger campaigns\n- Dynamic content personalization\n- Optimal frequency determination\n- Channel preference optimization\n\n## Chapter 7: Conversion Optimization\n\n### Landing Page Optimization\n**AI-Powered Testing:**\n- Headline variations\n- CTA button optimization\n- Form field reduction\n- Social proof placement\n\n### Chatbot Integration\n**Conversational AI Features:**\n- Instant lead qualification\n- Meeting scheduling\n- FAQ automation\n- Handoff to human agents\n\n## Chapter 8: Measuring and Optimizing Performance\n\n### Key Metrics to Track\n**Volume Metrics:**\n- Total leads generated\n- Cost per lead\n- Lead source performance\n\n**Quality Metrics:**\n- Lead-to-opportunity conversion\n- Sales-qualified lead rate\n- Customer acquisition cost\n- Lifetime value\n\n**Efficiency Metrics:**\n- Response time\n- Follow-up completion rate\n- Pipeline velocity\n- Sales cycle length\n\n### Continuous Optimization\n**AI-Driven Improvements:**\n- A/B testing automation\n- Performance prediction\n- Anomaly detection\n- Recommendation engines\n\n## Implementation Checklist\n\n### Phase 1: Foundation (Weeks 1-2)\n- [ ] Define ideal customer profile\n- [ ] Set up tracking and analytics\n- [ ] Choose AI tools and platforms\n- [ ] Create content library\n\n### Phase 2: Launch (Weeks 3-4)\n- [ ] Configure lead scoring model\n- [ ] Set up automated sequences\n- [ ] Launch initial campaigns\n- [ ] Monitor and adjust\n\n### Phase 3: Optimization (Weeks 5-8)\n- [ ] Analyze performance data\n- [ ] Refine targeting criteria\n- [ ] Optimize messaging\n- [ ] Scale successful campaigns\n\n## Conclusion\n\nAI-powered lead generation isn\'t just about automation—it\'s about creating more meaningful connections with prospects at scale. By leveraging the strategies in this playbook, you can:\n\n- Generate 10x more qualified leads\n- Reduce cost per acquisition by 60%\n- Increase conversion rates by 200%\n- Accelerate sales cycles by 40%\n\nThe future of lead generation is here. Are you ready to embrace it?',
    description: "Complete guide to using AI for lead generation",
    type: "post",
    status: "in-progress",
    priority: "urgent",
    tags: ["Lead Generation", "Playbook", "AI"],
    platforms: ["Blog", "Email", "PDF"],
    viral_hook: "The lead generation secret that's generating 10x more qualified leads",
    predicted_engagement: 8,
    viral_analysis_score: 88,
    starred: true,
    flagged: false,
    created_at: "2024-01-16T13:20:00Z",
    updated_at: "2024-01-16T14:45:00Z",
  },
]

export class ContentService {
  // Remove API calls entirely and work with in-memory data
  async getContentItems(): Promise<ContentItem[]> {
    // Simulate network delay for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...contentItems]
  }

  // Legacy method for backward compatibility
  async getItems(): Promise<ContentItem[]> {
    return this.getContentItems()
  }

  async createItem(data: Partial<ContentItem>): Promise<ContentItem> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: data.title || "New Content",
      content: data.content || "",
      description: data.description || "",
      type: data.type || "post",
      status: data.status || "ideas",
      priority: data.priority || "medium",
      tags: data.tags || [],
      platforms: data.platforms || [],
      viral_hook: data.viral_hook || "",
      predicted_engagement: Math.floor(Math.random() * 10) + 1,
      viral_analysis_score: Math.floor(Math.random() * 100),
      starred: false,
      flagged: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    contentItems.unshift(newItem)
    return newItem
  }

  async updateItem(id: string, data: Partial<ContentItem>): Promise<ContentItem> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const itemIndex = contentItems.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      throw new Error("Content item not found")
    }

    const updatedItem = {
      ...contentItems[itemIndex],
      ...data,
      updated_at: new Date().toISOString(),
    }

    contentItems[itemIndex] = updatedItem
    return updatedItem
  }

  async deleteItem(id: string): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const itemIndex = contentItems.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      throw new Error("Content item not found")
    }

    contentItems.splice(itemIndex, 1)
  }

  // Get sample data for reference
  getSampleData(): ContentItem[] {
    return [...contentItems]
  }
}
