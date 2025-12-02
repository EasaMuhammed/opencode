import { ACEManager } from "../ace/manager"
import { DSPyOptimizer } from "../dspy/optimizer"

// Singleton instances for session-level integration
let aceManagerInstance: ACEManager | null = null
let dspyOptimizerInstance: DSPyOptimizer | null = null

export function getACEManager(): ACEManager {
  if (!aceManagerInstance) {
    aceManagerInstance = new ACEManager()
  }
  return aceManagerInstance
}

export function getDSPyOptimizer(): DSPyOptimizer {
  if (!dspyOptimizerInstance) {
    dspyOptimizerInstance = new DSPyOptimizer(getACEManager())
  }
  return dspyOptimizerInstance
}

// Hook for session initialization
export function initializeAdvancedIntegration() {
  console.log("🚀 Initializing Advanced Integration (BAML/POML/ACE/DSPy)")
  getACEManager()
  getDSPyOptimizer()
}

// Hook for optimization scheduler
export async function runOptimizationCycle() {
  console.log("🔄 Running DSPy optimization cycle...")
  const optimizer = getDSPyOptimizer()
  await optimizer.optimize()
  console.log("✅ Optimization cycle complete")
}
