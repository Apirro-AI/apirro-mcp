# Apirro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Public Model Context Protocol (MCP) server for agentic commerce and website AI discoverability.**

Connect any MCP-compatible client (Claude Desktop, Cursor, ChatGPT, autonomous agents) directly to Apirro intelligence without API keys or authentication.

* **Homepage:** [apirro.ai](https://apirro.ai)
* **Developer Docs:** [apirro.ai/developers](https://apirro.ai/developers)
* **Live Server Endpoint:** `https://apirro.ai/api/public/mcp`
* **MCP Manifest:** [apirro.ai/.well-known/mcp.json](https://apirro.ai/.well-known/mcp.json)

---

## 🛠️ Available MCP Tools

Our server provides 5 read-only tools designed for AI agents and commerce teams:

| Tool | Description |
| :--- | :--- |
| `scan_agent_readiness` | Probes any URL/domain across **Visibility**, **Understandability**, and **Transactability** (returns 0–100 score + diagnostics). |
| `explain_readiness_signal` | Deep-dive explanations for signals (`robots.txt`, `llms.txt`, `AP2`, `MCP manifest`, `schema.org`, `contentExtractability`). |
| `get_agentic_commerce_glossary` | Definitions of emerging protocols: MCP, UCP, AP2, GEO, AEO, and Agent Link™. |
| `search_apirro_resources` | Semantic search across Apirro's published guides, benchmarks, and tutorials. |
| `get_apirro_pricing` | Live tier definitions, capabilities, and access links for Apirro plans. |

---

## 🚀 Quick Setup

### 1. Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "apirro": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "https://apirro.ai/api/public/mcp"]
    }
  }
}
npx -y @smithery/cli install apirro --client claude

---

### Step 3: Save the changes

1. Click the green **Commit changes...** button at the top right.
2. In the pop-up, click **Commit changes**.

---

### What happens as soon as you save this:
- **Instant DR 96+ indexed footprint:** Search engines and AI scrapers index your GitHub repo within 24–48 hours.
- **Backlink to apirro.ai:** Gives high-trust authority signals back to `apirro.ai` and `apirro.ai/developers`.
- **Ready for directory submissions:** You can now paste this repo link (`https://github.com/<your-username>/apirro-mcp`) into any directory that asks for a GitHub link.

Once you have created it, let me know your GitHub username and we can do the 1-click submission to the `awesome-mcp-servers` directory next!
