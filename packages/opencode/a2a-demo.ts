#!/usr/bin/env bun
/**
 * A2A Multi-Agent Research Demo
 * 
 * Demonstrates the A2A protocol with a multi-agent research workflow.
 */

import { ResearchOrchestrator } from "./src/a2a/research-orchestrator"
import { A2AServer } from "./src/a2a/server"
import { AgentCardGenerator } from "./src/a2a/card"
import { Agent } from "./src/agent/agent"

async function main() {
    console.log("=== A2A Multi-Agent Research System Demo ===\n")

    // 1. Initialize A2A Server and register agents
    const server = new A2AServer()

    console.log("📡 Registering OpenCode agents with A2A...")
    const agents = await Agent.list()
    for (const agent of agents) {
        await server.registerAgent(agent)

        // Generate Agent Card
        const card = await AgentCardGenerator.generateFromAgent(
            agent,
            `http://localhost:3000/agent/${agent.name}`
        )
        console.log(`   ✅ ${agent.name}: ${card.capabilities.length} capabilities`)
    }
    console.log()

    // 2. Initialize Research Orchestrator
    const orchestrator = new ResearchOrchestrator()

    // 3. Conduct a research task
    console.log("🔬 Conducting multi-agent research...\n")

    const result = await orchestrator.conductResearch({
        query: "What are the latest advances in multi-agent AI systems?",
        depth: "deep",
        sources: ["arxiv", "github", "papers"]
    })

    console.log("\n=== Research Results ===")
    console.log(`Summary: ${result.summary}`)
    console.log(`\nFindings (${result.findings.length}):`)
    result.findings.forEach((finding, i) => {
        console.log(`  ${i + 1}. ${finding}`)
    })
    console.log(`\nConfidence: ${(result.confidence * 100).toFixed(0)}%`)
    console.log(`Sources: ${result.sources.join(", ")}`)

    console.log("\n=== Demo Complete ===")
}

main().catch(console.error)
