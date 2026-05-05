#!/usr/bin/env node
  import { Server } from "@modelcontextprotocol/sdk/server/index.js";
  import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
  import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

  const BASE_URL = process.env.LEXICON_BASE_URL || "https://dbssearch.today";
  const API_KEY  = process.env.LEXICON_API_KEY  || "";

  const TOOLS = [
    {
      name: "lexicon_compare_vs",
      description: "Head-to-Head VS comparison between two vendors or products. Retrieves live evidence from 20 independent web sources and applies PESTLE Triangulation to produce a structured comparison report.",
      inputSchema: {
        type: "object",
        properties: {
          vendorA:  { type: "string", description: "First vendor or product name" },
          vendorB:  { type: "string", description: "Second vendor or product name" },
          industry: { type: "string", description: "Industry context (e.g. fintech, healthcare, SaaS)" },
        },
        required: ["vendorA", "vendorB"],
      },
    },
    {
      name: "lexicon_compare_methodology",
      description: "Deep PESTLE Triangulation research on a single vendor. Returns structured Political, Economic, Social, Technical, Legal, Environmental analysis with live source citations.",
      inputSchema: {
        type: "object",
        properties: {
          vendor:   { type: "string", description: "Vendor or company name" },
          industry: { type: "string", description: "Industry context" },
          focus:    { type: "string", description: "Optional focus area within PESTLE" },
        },
        required: ["vendor"],
      },
    },
    {
      name: "lexicon_compare_topic",
      description: "Topic-specific competitive intelligence. Ask any comparison question across vendors, markets, or features.",
      inputSchema: {
        type: "object",
        properties: {
          topic:    { type: "string", description: "The comparison topic or question" },
          industry: { type: "string", description: "Industry context" },
        },
        required: ["topic"],
      },
    },
    {
      name: "lexicon_monitor_outage",
      description: "Live outage and reliability monitoring for a vendor. Returns current status, recent incidents, and reliability signals from independent sources.",
      inputSchema: {
        type: "object",
        properties: {
          vendor: { type: "string", description: "Vendor name to check for outages" },
        },
        required: ["vendor"],
      },
    },
    {
      name: "lexicon_monitor_refunds",
      description: "Refund rate and customer satisfaction signal monitoring for a vendor.",
      inputSchema: {
        type: "object",
        properties: {
          vendor:   { type: "string", description: "Vendor name" },
          industry: { type: "string", description: "Industry context" },
        },
        required: ["vendor"],
      },
    },
    {
      name: "lexicon_feed",
      description: "Competitive intelligence feed for a market or industry. Returns recent developments, entrant signals, and trend analysis.",
      inputSchema: {
        type: "object",
        properties: {
          industry: { type: "string", description: "Market or industry name" },
          limit:    { type: "number", description: "Maximum items to return (default 10)" },
        },
        required: ["industry"],
      },
    },
  ];

  const TOOL_MAP = {
    lexicon_compare_vs:          "lexicon.compare.vs",
    lexicon_compare_methodology: "lexicon.compare.methodology",
    lexicon_compare_topic:       "lexicon.compare.topic",
    lexicon_monitor_outage:      "lexicon.monitor.outage",
    lexicon_monitor_refunds:     "lexicon.monitor.refunds",
    lexicon_feed:                "lexicon.feed",
  };

  const server = new Server(
    { name: "lexicon", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const remoteTool = TOOL_MAP[name];
    if (!remoteTool) {
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
    }

    const headers = { "Content-Type": "application/json" };
    if (API_KEY) headers["X-API-Key"] = API_KEY;

    const response = await fetch(`${BASE_URL}/mcp/v1`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: remoteTool, arguments: args },
      }),
    });

    const data = await response.json();
    if (data.result) return data.result;
    return {
      content: [{ type: "text", text: JSON.stringify(data.error || data) }],
      isError: true,
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  