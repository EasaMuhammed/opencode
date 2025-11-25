# A2A Protocol Integration

## A2A (Agent-to-Agent) Protocol Overview

The A2A protocol is an open standard for agent-to-agent communication, enabling seamless collaboration between AI agents regardless of their underlying frameworks.

### Key Features
- **Universal Interoperability**: Agents from different providers can communicate
- **Capability Discovery**: Agents advertise skills via "Agent Cards" (JSON)
- **Task-Oriented**: Supports immediate actions and long-running processes
- **Secure**: HTTPS transport with enterprise-grade auth
- **Modality Agnostic**: Supports text, audio, video, forms

### Architecture

```
Client Agent → A2A Protocol → Remote Agent(s)
     ↓              ↓               ↓
  Request      JSON-RPC 2.0     Response
```

### Integration with OpenCode

We will implement:
1. **A2A Server**: OpenCode agents expose A2A endpoints
2. **A2A Client**: OpenCode agents can call other A2A agents
3. **Agent Cards**: Auto-generated from OpenCode agent configs
4. **Research Orchestrator**: Multi-agent research workflows

### Components

- `src/a2a/server.ts`: A2A server implementation
- `src/a2a/client.ts`: A2A client for calling remote agents
- `src/a2a/card.ts`: Agent Card generator
- `src/a2a/research-orchestrator.ts`: Multi-agent research system
