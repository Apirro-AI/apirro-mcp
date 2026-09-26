# Apirro MCP Server

**Infrastructure layer for agentic commerce.** Scan any website for AI-agent readiness, connect to agentic commerce protocols (MCP, UCP, AP2, GEO/AEO), and explore Apirro's knowledge base — directly from your AI assistant.

[![Website](https://img.shields.io/badge/website-apirro.ai-black)](https://apirro.ai)
[![MCP Endpoint](https://img.shields.io/badge/MCP-apirro.ai%2Fapi%2Fpublic%2Fmcp-blue)](https://apirro.ai/api/public/mcp)
[![Protocol](https://img.shields.io/badge/protocol-Model%20Context%20Protocol-green)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/status-public%20%2F%20read--only-lightgrey)](https://apirro.ai/developers)

## What is this?

Apirro helps brands become **discoverable, understandable, transactable and measured** for AI shopping agents (ChatGPT, Claude, Gemini, Perplexity, Copilot and autonomous agents). This MCP server exposes Apirro's core intelligence as **7 public, read-only tools** — no login, no API key, no setup.

## Quick start

**Endpoint (Streamable HTTP):**

```
https://apirro.ai/api/public/mcp
```

**Well-known manifest:**

```
https://apirro.ai/.well-known/mcp.json
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "Apirro": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://apirro.ai/api/public/mcp"]
    }
  }
}
```

### Cursor

Settings → MCP → Add server:

```json
{
  "mcpServers": {
    "Apirro": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://apirro.ai/api/public/mcp"]
    }
  }
}
```

### ChatGPT / Custom GPT

Settings → Connected Apps → Add MCP server → paste the endpoint URL:

```
https://apirro.ai/api/public/mcp
```

### Any MCP client

Any client supporting remote MCP over Streamable HTTP can connect directly to the endpoint above.

## Tools

| Tool | Description |
|---|---|
| `scan_agent_readiness` | Scan any public website and score its AI-agent readiness (0–100) across Visibility, Understandability and Transactability — with pass/fail detail for every signal. |
| `explain_readiness_signal` | Deep-dive diagnostic for any readiness signal: what it means, why it matters to LLMs and agents, and how to fix it. |
| `get_agentic_commerce_overview` | The shift from search-led to agent-led commerce, every protocol Apirro connects to seamlessly (MCP, UCP, AP2, GEO/AEO) and current market data. |
| `get_agent_link_details` | Agent Link™ — the single integration that connects a merchant's catalogue, inventory and checkout to every major AI agent through one connection. |
| `get_agentic_commerce_glossary` | Definitions for MCP, UCP, AP2, GEO, AEO, Agent Link™ and other agentic commerce terms. |
| `search_apirro_resources` | Search Apirro's published guides, blog posts, how-to articles and FAQs — with direct links. |
| `get_apirro_pricing` | Current Apirro plans, what each tier includes, and links to get started. |

## Example prompts

- *"Scan nike.com and tell me if AI shopping agents can read their products."*
- *"What is AP2 and why does an ecommerce store need an agent-payments manifest?"*
- *"How does Apirro connect to every agentic commerce protocol, and what does it cost?"*

## Links

- **Website:** https://apirro.ai
- **Developer docs:** https://apirro.ai/developers
- **Agentic commerce platform:** https://apirro.ai/product/agentic-commerce
- **Agent Link™:** https://apirro.ai/product/mcp-server
- **Free AI readiness report:** https://apirro.ai/free-report

## Notes

- All tools are **read-only and public** — no Apirro account data is exposed.
- The server is listed on [Glama](https://glama.ai/mcp/servers) and [Smithery](https://smithery.ai).
</arg_value>````

## License

MIT © [Apirro](https://apirro.ai)


Two small things:

1. **Don't touch `glama.json`** — that file is already in your repo from the ownership claim; leave it exactly as it is. The README goes in a separate file.
2. If GitHub asks for a commit message when you commit, just type `Update README` and confirm.

Once committed, send me your GitHub username and I can prep the one-click submission to the official `awesome-mcp-servers` list next.
