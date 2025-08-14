// N8N API integration utilities
interface N8NWorkflowResponse {
  success: boolean
  data?: any
  error?: string
}

export class N8NApi {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_N8N_BASE_URL || ""
    this.apiKey = process.env.N8N_API_KEY || ""
  }

  async triggerWorkflow(workflowId: string, data?: any): Promise<N8NWorkflowResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/${workflowId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data || {}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error("N8N API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async getWorkflowStatus(workflowId: string): Promise<N8NWorkflowResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/workflows/${workflowId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error("N8N API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}

export const n8nApi = new N8NApi()
