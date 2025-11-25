#!/usr/bin/env bun
/**
 * DSPy Optimization Scheduler
 * 
 * Runs the nightly optimization cycle as described in the self-improving loop.
 * Can be scheduled via cron or run manually.
 */

import { runOptimizationCycle } from "./src/session/advanced-integration"

async function main() {
    console.log("=== DSPy Optimization Scheduler ===")
    console.log(`Started at: ${new Date().toISOString()}`)

    try {
        await runOptimizationCycle()
        console.log("✅ Optimization successful")
        process.exit(0)
    } catch (error) {
        console.error("❌ Optimization failed:", error)
        process.exit(1)
    }
}

main()
