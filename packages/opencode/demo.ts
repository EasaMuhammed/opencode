#!/usr/bin/env bun
/**
 * Demo: Self-Improving Loop
 * 
 * This script demonstrates the POML → BAML → DSPy → ACE integration.
 */

import { ACEManager } from "./src/ace/manager"
import { DSPyOptimizer } from "./src/dspy/optimizer"
import { POMLParser } from "./src/poml/parser"

async function main() {
    console.log("=== Advanced OpenCode Integration Demo ===\n")

    // 1. Initialize components
    const aceManager = new ACEManager()
    const dspyOptimizer = new DSPyOptimizer(aceManager)
    const pomlParser = new POMLParser()

    console.log("✅ Initialized ACE, DSPy, and POML components\n")

    // 2. Simulate a task execution
    console.log("📋 Task: 'Create a hello world function'\n")

    const result = await aceManager.generate("Create a hello world function")
    console.log("Generator Output:", result, "\n")

    // 3. Simulate reflection (assume failure for demo)
    const lessons = await aceManager.reflect("error: function not defined")
    console.log("Reflector Lessons:", lessons, "\n")

    // 4. Curator updates playbook
    await aceManager.curate(lessons)
    console.log("✅ Curator updated playbook\n")

    // 5. Run DSPy optimization
    await dspyOptimizer.optimize()
    console.log("✅ DSPy optimization complete\n")

    // 6. Parse a sample POML
    const samplePOML = `
    <task>Create a hello world function</task>
    <strategy>Use TypeScript</strategy>
  `
    const parsed = pomlParser.parse(samplePOML)
    console.log("POML Parsed:", parsed, "\n")

    console.log("=== Demo Complete ===")
    console.log("Check AGENTS.md for playbook version updates")
}

main().catch(console.error)
