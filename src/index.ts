import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "apirro-mcp",
  version: "0.2.0",
});

// 1. scan_agent_readiness
server.tool(
  "scan_agent_readiness",
  "Run Apirro's free agentic-commerce readiness scan on any public website. Returns Visibility, Understandability and Transactability scores (0-100) plus pass/fail signal details.",
  {
    url: z.string().min(3).max(255).describe("Website URL or domain to scan, e.g. https://allbirds.com"),
  },
  async ({ url }) => {
    try {
      const target = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      const res = await fetch(`https://apirro.ai/api/public/readiness-scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      }).catch(() => null);

      if (!res || !res.ok) {
        return {
          content: [
            {
              type: "text",
              text: `Could not complete live scan for ${url}. Visit https://apirro.ai/free-report?url=${encodeURIComponent(url)} to run a full diagnostic in your browser.`,
            },
          ],
        };
      }

      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Scan error: ${err?.message || "Unknown error"}` }],
      };
    }
  }
);

// 2. explain_readiness_signal
const SIGNALS: Record<string, { pillar: string; why: string; fix: string; aliases?: string[] }> = {
  aiBotsAllowed: {
    pillar: "Visibility",
    why: "If robots.txt disallows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot or Google-Extended, AI assistants cannot read your pages.",
    fix: "Explicitly allow AI user-agents in robots.txt.",
    aliases: ["robots", "robots.txt", "gptbot"],
  },
  sitemap: {
    pillar: "Visibility",
    why: "A sitemap.xml gives AI crawlers a complete, dated inventory of your products and pages.",
    fix: "Publish /sitemap.xml with absolute URLs and accurate lastmod dates.",
  },
  llmsTxt: {
    pillar: "Visibility",
    why: "/llms.txt is the standard format for telling language models what your site is and where canonical content lives.",
    fix: "Publish /llms.txt with brand definitions, key pages, and agent endpoints.",
    aliases: ["llms", "llms.txt"],
  },
  organizationSchema: {
    pillar: "Understandability",
    why: "Organization JSON-LD is how models resolve your brand entity unambiguously.",
    fix: "Add Organization JSON-LD with name, url, logo, sameAs links and contact details.",
    aliases: ["schema", "json-ld"],
  },
  mcpManifest: {
    pillar: "Transactability",
    why: "/.well-known/mcp.json informs AI agents that you expose tools for search, product lookup, and checkout.",
    fix: "Publish an MCP manifest pointing at an agent-callable endpoint via Apirro's Agent Link™.",
    aliases: ["mcp", "mcp.json"],
  },
  ap2Endpoint: {
    pillar: "Transactability",
    why: "AP2 (Agent Payments Protocol) declares that an agent can complete a payment with you under auditable mandates.",
    fix: "Publish /.well-known/agent-payments.json describing supported payment mandates and handoff.",
    aliases: ["ap2", "agent payments"],
  },
  productFeed: {
    pillar: "Transactability",
    why: "Without a structured catalog feed, agents cannot reliably enumerate SKUs, prices, or inventory levels.",
    fix: "Expose a UCP profile or products feed with live price, currency, availability, and canonical URLs.",
    aliases: ["ucp", "feed", "catalog"],
  },
  policiesAsData: {
    pillar: "Transactability",
    why: "Agents cannot purchase without clear return, shipping, and warranty terms presented as data.",
    fix: "Add MerchantReturnPolicy and OfferShippingDetails JSON-LD alongside your offers.",
    aliases: ["returns", "shipping", "policies"],
  },
};

server.tool(
  "explain_readiness_signal",
  "Explain an agentic-commerce readiness signal and how to fix it on your storefront.",
  {
    signal: z.string().describe("Signal name, e.g. 'aiBotsAllowed', 'llmsTxt', 'mcpManifest', 'ap2Endpoint'"),
  },
  async ({ signal }) => {
    const q = signal.trim().toLowerCase();
    const entry = Object.entries(SIGNALS).find(
      ([k, v]) => k.toLowerCase() === q || v.aliases?.some((a) => a.toLowerCase() === q)
    );
    if (!entry) {
      return {
        content: [
          {
            type: "text",
            text: `Signal "${signal}" not recognized. Known signals: ${Object.keys(SIGNALS).join(", ")}. Learn more at https://apirro.ai/resources/how-to-guides`,
          },
        ],
      };
    }
    const [name, s] = entry;
    return {
      content: [
        {
          type: "text",
          text: `SIGNAL: ${name} (${s.pillar})\n\nWHY IT MATTERS:\n${s.why}\n\nHOW TO FIX:\n${s.fix}\n\nFull guide: https://apirro.ai/resources/how-to-guides`,
        },
      ],
    };
  }
);

// 3. get_agentic_commerce_overview
server.tool(
  "get_agentic_commerce_overview",
  "Explain agentic commerce: the shift from search-led to agent-led commerce, protocols Apirro connects to (MCP, UCP, AP2, GEO/AEO), and market metrics.",
  {},
  async () => {
    const text = `THE SHIFT: SEARCH-LED TO AGENT-LED COMMERCE
Discovery is moving from ranked search links to AI assistants and autonomous agents that research, compare, and transact on a shopper's behalf.

PROTOCOLS APIRRO CONNECTS TO SEAMLESSLY:
- MCP (Model Context Protocol): Tool-callable endpoints for AI agents.
- UCP (Universal Commerce Protocol): Interoperable catalog, cart, and checkout protocol.
- AP2 (Agent Payments Protocol): Google/industry standard for mandated, auditable agent payments.
- GEO / AEO: Generative & Agent Engine Optimization for LLM citations.

THE 4-PART READINESS MECHANISM:
01 Discoverable — Indexed and allowed across ChatGPT, Claude, Gemini, Perplexity, and Copilot.
02 Understandable — Machine-readable catalog, schema, and brand entities.
03 Transactable — Direct checkout and payment handoff via Agent Link™.
04 Measured — Continuous scoring and agent traffic analytics.

Learn more at https://apirro.ai`;
    return { content: [{ type: "text", text }] };
  }
);

// 4. get_agent_link_details
server.tool(
  "get_agent_link_details",
  "Explain Apirro's Agent Link™: the single integration layer that connects merchant catalog, inventory, and checkout to all agent protocols.",
  {},
  async () => {
    const text = `AGENT LINK™ — One Integration for Agentic Commerce

Agent Link™ connects a merchant's catalog, inventory, pricing, and checkout to every major AI agent (ChatGPT, Claude, Gemini, Perplexity, Copilot) through one single integration.

HOW IT WORKS:
1. Protocol Translation: Publishes MCP, UCP, and AP2 manifests simultaneously.
2. Real-Time Sync: Live price, inventory, and variant validation.
3. Merchant Control: Transactions settle on the merchant's existing payment gateway / PSP.
4. Agent Security & Governance: Bot identity validation, rate limiting, and auditable transaction logs.

Explore: https://apirro.ai/product/agentic-commerce`;
    return { content: [{ type: "text", text }] };
  }
);

// 5. get_agentic_commerce_glossary
server.tool(
  "get_agentic_commerce_glossary",
  "Glossary of agentic commerce definitions (MCP, UCP, AP2, GEO, AEO, Agent Link, etc.).",
  {
    term: z.string().optional().describe("Term to look up, e.g. 'mcp', 'ucp', 'ap2', 'agent link'. Omit for all."),
  },
  async ({ term }) => {
    const glossary: Record<string, string> = {
      "agentic commerce": "Commerce where autonomous AI agents research, compare, and purchase on a consumer's behalf.",
      mcp: "Model Context Protocol. Open standard by Anthropic connecting AI models to external tools and data.",
      ucp: "Universal Commerce Protocol. Open standard for catalog discovery, cart creation, and checkout interoperability.",
      ap2: "Agent Payments Protocol. Emerging standard for cryptographic, mandated agent payments.",
      geo: "Generative Engine Optimization. Structuring content so generative search models cite and recommend your brand.",
      aeo: "Agent Engine Optimization. Structuring data, APIs, and feeds so autonomous agents can transact with your store.",
      "agent link": "Apirro's single integration layer connecting merchants to all agent protocols simultaneously.",
    };

    if (term) {
      const q = term.toLowerCase().trim();
      const val = glossary[q] || Object.entries(glossary).find(([k]) => k.includes(q))?.[1];
      if (val) {
        return { content: [{ type: "text", text: `${term.toUpperCase()}: ${val}` }] };
      }
    }

    const text = Object.entries(glossary)
      .map(([k, v]) => `${k.toUpperCase()}\n${v}`)
      .join("\n\n");
    return { content: [{ type: "text", text }] };
  }
);

// 6. get_apirro_pricing
server.tool(
  "get_apirro_pricing",
  "Current pricing tiers for Apirro: Free Trial, Discovery, Activate, and Enterprise.",
  {},
  async () => {
    const text = `APIRRO PRICING TIERS:

1. Free Trial ($0 / 7 days): Full Discovery feature access, multi-LLM visibility scoring.
2. Discovery ($299 / month): AI Discovery score, prompt intelligence, competitor benchmarking, site audits.
3. Activate (from $999 / month): Full agentic commerce infrastructure, Agent Link™ activation, hosted MCP/UCP/AP2 endpoints, 1 Storefront Agent.
4. Enterprise (Custom): Unlimited agents, bundled catalog scoring, dedicated SLA, white-label deployment.

View details: https://apirro.ai/pricing`;
    return { content: [{ type: "text", text }] };
  }
);

// 7. search_apirro_resources
server.tool(
  "search_apirro_resources",
  "Search published Apirro resources, guides, and blog posts on agentic commerce.",
  {
    query: z.string().describe("Search term, e.g. 'visibility', 'mcp', 'protocol'"),
  },
  async ({ query }) => {
    return {
      content: [
        {
          type: "text",
          text: `Explore Apirro resources for "${query}":\n- Guides & Documentation: https://apirro.ai/resources/how-to-guides\n- Blog & Research: https://apirro.ai/resources/blog\n- FAQs: https://apirro.ai/resources/faqs`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error running Apirro MCP server:", err);
  process.exit(1);
});
