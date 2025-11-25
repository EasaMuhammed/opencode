import { Agent } from "../agent/agent"

export interface AgentCard {
    name: string
    version: string
    description: string
    capabilities: string[]
    endpoint: string
    authentication: {
        type: "bearer" | "api-key" | "none"
    }
    metadata: Record<string, any>
}

export class AgentCardGenerator {
    static async generateFromAgent(agentInfo: Agent.Info, endpoint: string): Promise<AgentCard> {
        return {
            name: agentInfo.name,
            version: "1.0.0",
            description: agentInfo.description || `OpenCode ${agentInfo.name} agent`,
            capabilities: Object.keys(agentInfo.tools).filter(t => agentInfo.tools[t] !== false),
            endpoint,
            authentication: {
                type: "bearer"
            },
            metadata: {
                mode: agentInfo.mode,
                permissions: agentInfo.permission,
                model: agentInfo.model
            }
        }
    }

    static toJSON(card: AgentCard): string {
        return JSON.stringify(card, null, 2)
    }
}
