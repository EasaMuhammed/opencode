export interface A2ARequest {
  jsonrpc: "2.0"
  method: string
  params: {
    task: string
    context?: Record<string, any>
    modality?: "text" | "audio" | "video" | "form"
  }
  id: string | number
}

export interface A2AResponse {
  jsonrpc: "2.0"
  result?: {
    status: "completed" | "in-progress" | "failed"
    output: string
    metadata?: Record<string, any>
  }
  error?: {
    code: number
    message: string
    data?: any
  }
  id: string | number
}

export class A2AClient {
  constructor(
    private baseUrl: string,
    private apiKey?: string,
  ) {}

  async callAgent(agentEndpoint: string, task: string, context?: Record<string, any>): Promise<A2AResponse> {
    const request: A2ARequest = {
      jsonrpc: "2.0",
      method: "execute",
      params: {
        task,
        context,
        modality: "text",
      },
      id: Date.now(),
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
    }

    try {
      const response = await fetch(agentEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(request),
      })

      return (await response.json()) as A2AResponse
    } catch (error) {
      return {
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: `Failed to call agent: ${error}`,
        },
        id: request.id,
      }
    }
  }

  async discoverCapabilities(agentEndpoint: string): Promise<any> {
    // Fetch agent card
    const cardUrl = `${agentEndpoint}/.well-known/agent-card.json`
    const response = await fetch(cardUrl)
    return await response.json()
  }
}
