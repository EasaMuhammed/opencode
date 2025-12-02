import type { A2ARequest, A2AResponse } from "./client"
import { Agent } from "../agent/agent"

export class A2AServer {
  private agents: Map<string, Agent.Info> = new Map()

  async registerAgent(agentInfo: Agent.Info) {
    this.agents.set(agentInfo.name, agentInfo)
    console.log(`✅ Registered A2A agent: ${agentInfo.name}`)
  }

  async handleRequest(request: A2ARequest): Promise<A2AResponse> {
    try {
      // Extract agent name from method (e.g., "agent.build.execute")
      const parts = request.method.split(".")
      const agentName = parts[1] || "build"
      const action = parts[2] || "execute"

      const agent = this.agents.get(agentName)
      if (!agent) {
        return {
          jsonrpc: "2.0",
          error: {
            code: -32601,
            message: `Agent not found: ${agentName}`,
          },
          id: request.id,
        }
      }

      // Execute the task (simplified - in real impl, use session execution)
      const output = `Agent ${agentName} executed: ${request.params.task}`

      return {
        jsonrpc: "2.0",
        result: {
          status: "completed",
          output,
          metadata: {
            agent: agentName,
            timestamp: new Date().toISOString(),
          },
        },
        id: request.id,
      }
    } catch (error) {
      return {
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: `Execution failed: ${error}`,
        },
        id: request.id,
      }
    }
  }

  getAgents(): Agent.Info[] {
    return Array.from(this.agents.values())
  }
}
