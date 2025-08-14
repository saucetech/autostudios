export interface N8NWorkflow {
  id: string
  name: string
  active: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  versionId: string
}

export interface N8NExecution {
  id: string
  finished: boolean
  mode: string
  retryOf?: string
  retrySuccessId?: string
  startedAt: string
  stoppedAt?: string
  workflowId: string
  status: "success" | "error" | "waiting" | "running"
}

export interface WorkflowTriggerResponse {
  executionId: string
  status: "triggered" | "error"
  message?: string
}

class N8NService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_N8N_BASE_URL || "http://localhost:5678"
    this.apiKey = process.env.N8N_API_KEY || ""
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api/v1${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-N8N-API-KEY": this.apiKey,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getWorkflows(): Promise<N8NWorkflow[]> {
    try {
      const data = await this.makeRequest("/workflows")
      return data.data || []
    } catch (error) {
      console.error("Failed to fetch workflows:", error)
      return []
    }
  }

  async getWorkflow(id: string): Promise<N8NWorkflow | null> {
    try {
      const data = await this.makeRequest(`/workflows/${id}`)
      return data.data || null
    } catch (error) {
      console.error(`Failed to fetch workflow ${id}:`, error)
      return null
    }
  }

  async activateWorkflow(id: string): Promise<boolean> {
    try {
      await this.makeRequest(`/workflows/${id}/activate`, {
        method: "POST",
      })
      return true
    } catch (error) {
      console.error(`Failed to activate workflow ${id}:`, error)
      return false
    }
  }

  async deactivateWorkflow(id: string): Promise<boolean> {
    try {
      await this.makeRequest(`/workflows/${id}/deactivate`, {
        method: "POST",
      })
      return true
    } catch (error) {
      console.error(`Failed to deactivate workflow ${id}:`, error)
      return false
    }
  }

  async triggerWorkflow(id: string, data: any = {}): Promise<WorkflowTriggerResponse> {
    try {
      const response = await this.makeRequest(`/workflows/${id}/execute`, {
        method: "POST",
        body: JSON.stringify(data),
      })

      return {
        executionId: response.data?.id || "",
        status: "triggered",
      }
    } catch (error) {
      console.error(`Failed to trigger workflow ${id}:`, error)
      return {
        executionId: "",
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async getExecutions(workflowId?: string): Promise<N8NExecution[]> {
    try {
      const endpoint = workflowId ? `/executions?workflowId=${workflowId}` : "/executions"
      const data = await this.makeRequest(endpoint)
      return data.data || []
    } catch (error) {
      console.error("Failed to fetch executions:", error)
      return []
    }
  }

  async getExecution(id: string): Promise<N8NExecution | null> {
    try {
      const data = await this.makeRequest(`/executions/${id}`)
      return data.data || null
    } catch (error) {
      console.error(`Failed to fetch execution ${id}:`, error)
      return null
    }
  }

  // Webhook trigger for workflows
  async triggerWebhook(webhookId: string, data: any = {}): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/${webhookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Webhook trigger failed: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error(`Failed to trigger webhook ${webhookId}:`, error)
      throw error
    }
  }
}

export const n8nService = new N8NService()

// Workflow mapping - maps dashboard workflow IDs to N8N workflow IDs
export const WORKFLOW_MAPPING = {
  "social-media-research": process.env.N8N_SOCIAL_MEDIA_WORKFLOW_ID || "",
  "lead-generation": process.env.N8N_LEAD_GEN_WORKFLOW_ID || "",
  "market-analysis": process.env.N8N_MARKET_ANALYSIS_WORKFLOW_ID || "",
  "email-automation": process.env.N8N_EMAIL_AUTOMATION_WORKFLOW_ID || "",
  "meeting-scheduler": process.env.N8N_MEETING_SCHEDULER_WORKFLOW_ID || "",
  "content-generator": process.env.N8N_CONTENT_GENERATOR_WORKFLOW_ID || "",
  "heygen-avatar-generator": process.env.N8N_HEYGEN_WORKFLOW_ID || "", // Added Heygen workflow mapping
}

// Helper function to get N8N workflow ID from dashboard workflow ID
export function getN8NWorkflowId(dashboardWorkflowId: string): string {
  return WORKFLOW_MAPPING[dashboardWorkflowId as keyof typeof WORKFLOW_MAPPING] || ""
}
