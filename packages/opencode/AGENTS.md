# Advanced OpenCode Integration - AGENTS.md

## Agent Registry

This file tracks playbook versions, metrics, and optimization targets for the self-improving agent system.

### Playbook Versions

| Agent | Version | Last Updated | Success Rate | Strategies Count |
|-------|---------|--------------|--------------|------------------|
| build | 1.0.0   | 2025-11-25   | N/A          | 0                |
| plan  | 1.0.0   | 2025-11-25   | N/A          | 0                |
| general | 1.0.0 | 2025-11-25   | N/A          | 0                |

### Optimization Targets

- **Target Success Rate**: 75%
- **Optimization Frequency**: Nightly (simulated)
- **Curator Threshold**: 75% success rate for strategy promotion

### Integration Status

- ✅ BAML: Type-safe execution layer
- ✅ POML: Prompt orchestration parser
- ✅ ACE: Generator/Reflector/Curator modules
- ✅ DSPy: Self-improvement optimizer

### Self-Improving Loop

1. **Developer Request** → POML renders prompt with ACE strategies
2. **BAML Execution** → Type-safe execution with error correction
3. **DSPy Logging** → Outcome tracking and reflection
4. **Nightly Job** → DSPy reflects on failures, extracts lessons
5. **ACE Curator** → Merges/prunes strategies (75% threshold)
6. **Playbook Update** → POML playbook auto-updates, version bumps
