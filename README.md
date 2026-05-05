# Lexicon Comparison Intelligence MCP Server

  > Live comparison intelligence for autonomous agents — evidence from 20 independent sources, PESTLE Triangulation, Head-to-Head VS, and Deep Research frameworks.

  [![smithery badge](https://smithery.ai/badge/@dbssearch/lexicon)](https://smithery.ai/server/@dbssearch/lexicon)

  **Live hosted endpoint:** `https://dbssearch.today/mcp/v1`

  ## Tools

  | Tool | Description |
  |------|-------------|
  | `lexicon_compare_vs` | Head-to-Head VS comparison between two vendors/products |
  | `lexicon_compare_methodology` | PESTLE Triangulation deep research on a single vendor |
  | `lexicon_compare_topic` | Topic-specific competitive intelligence |
  | `lexicon_monitor_outage` | Live outage and reliability monitoring |
  | `lexicon_monitor_refunds` | Refund rate and customer satisfaction signals |
  | `lexicon_feed` | Competitive intelligence feed for a market/industry |

  ## Quickstart (Claude Desktop / Cursor)

  ```json
  {
    "mcpServers": {
      "lexicon": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "https://dbssearch.today/mcp/v1"],
        "env": {}
      }
    }
  }
  ```

  Or run locally with Docker:

  ```bash
  docker run -e LEXICON_API_KEY=your_key ghcr.io/nadine302324-commits/lexicon-mcp-server
  ```

  ## Self-hosted

  ```bash
  git clone https://github.com/nadine302324-commits/lexicon-mcp-server
  cd lexicon-mcp-server
  npm install
  LEXICON_API_KEY=your_key node index.js
  ```

  ## Auth

  Get a free API key at [dbssearch.today](https://dbssearch.today). Set `LEXICON_API_KEY` env var, or pass `apiKey` in Smithery config.

  The hosted endpoint at `https://dbssearch.today/mcp/v1` is freely testable without a key (rate-limited).

  ## Marketplace

  Open agent marketplace with free test endpoint:  
  `POST https://dbssearch.today/marketplace/v1/test`  
  Agent card: `https://dbssearch.today/.well-known/agent.json`

  ## License

  MIT
  