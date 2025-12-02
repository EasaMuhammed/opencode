import { A2AClient } from "./client"
import { A2AServer } from "./server"

export interface ResearchTask {
  query: string
  depth: "shallow" | "deep"
  sources: string[]
}

export interface ResearchResult {
  summary: string
  findings: string[]
  sources: string[]
  confidence: number
}

export class ResearchOrchestrator {
  private client: A2AClient
  private server: A2AServer

  constructor() {
    this.client = new A2AClient("http://localhost:3000")
    this.server = new A2AServer()
  }

  async conductResearch(task: ResearchTask): Promise<ResearchResult> {
    console.log(`🔬 Starting research: "${task.query}"`)

    // Multi-agent workflow:
    // 1. Planner agent breaks down the research query
    // 2. Search agents gather information from sources
    // 3. Analyzer agent synthesizes findings
    // 4. Curator agent validates and scores confidence

    const findings: string[] = []

    // Step 1: Planning
    console.log("📋 Step 1: Planning research approach...")
    const planResponse = await this.client.callAgent(
      "http://localhost:3000/agent/plan",
      `Create a research plan for: ${task.query}`,
    )
    if (planResponse.result) {
      findings.push(`Plan: ${planResponse.result.output}`)
    }

    // Step 2: Information Gathering (parallel)
    console.log("🔍 Step 2: Gathering information...")
    const searchPromises = task.sources.map((source) =>
      this.client.callAgent("http://localhost:3000/agent/general", `Search ${source} for: ${task.query}`),
    )
    const searchResults = await Promise.all(searchPromises)
    searchResults.forEach((result, i) => {
      if (result.result) {
        findings.push(`Source ${task.sources[i]}: ${result.result.output}`)
      }
    })

    // Step 3: Synthesis
    console.log("🧠 Step 3: Synthesizing findings...")
    const synthesisResponse = await this.client.callAgent(
      "http://localhost:3000/agent/build",
      `Synthesize research findings: ${findings.join("; ")}`,
    )

    const summary = synthesisResponse.result?.output || "No synthesis available"

    return {
      summary,
      findings,
      sources: task.sources,
      confidence: 0.85, // Mock confidence score
    }
  }
}
