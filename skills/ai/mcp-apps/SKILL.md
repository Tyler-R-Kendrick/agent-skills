---
name: mcp-apps
description: |
    Use when building MCP Apps that serve interactive UI from MCP servers. Covers the ui:// URI scheme, HTML rendering in sandboxed iframes, and bidirectional communication between UI and host.
    USE FOR: rich UI in agent conversations, interactive dashboards from MCP servers, sandboxed iframe rendering
    DO NOT USE FOR: basic tool responses without UI (use mcp), agent communication (use a2a), full web applications
license: MIT
metadata:
  displayName: "MCP Apps"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Model Context Protocol Specification"
    url: "https://modelcontextprotocol.io"
  - title: "MCP GitHub Repository"
    url: "https://github.com/modelcontextprotocol"
---

# MCP Apps

## Overview
MCP Apps is an extension to the Model Context Protocol that lets MCP servers return rich, interactive user interfaces instead of plain text. When a tool declares a UI resource, the host renders it in a sandboxed iframe, and users interact with it directly in the conversation. Supported by Claude, VS Code, Goose, and Postman.

## How It Works
```
MCP Server                    Host (Claude, VS Code)
  │                               │
  │◄── tool call ─────────────────│
  │── tool result + ui resource ─►│
  │                               │── render iframe ──► User
  │◄── JSON-RPC messages ────────│◄── user interaction
```

1. A tool declares a `ui` field referencing a `ui://` resource
2. The host calls the tool and receives the result with a UI reference
3. The host fetches the UI content and renders it in a sandboxed iframe
4. The UI communicates with the host via JSON-RPC over `postMessage`

## Declaring UI in a Tool
```json
{
  "name": "render_dashboard",
  "description": "Display an interactive dashboard",
  "inputSchema": {
    "type": "object",
    "properties": {
      "data": { "type": "object" }
    }
  },
  "ui": {
    "uri": "ui://dashboard",
    "title": "Dashboard"
  }
}
```

## UI Resource
The server registers a UI resource that returns HTML:
```python
@mcp.resource("ui://dashboard")
def dashboard() -> str:
    return """
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Dashboard</h1>
      <div id="chart"></div>
      <script>
        // Communicate with the host via JSON-RPC
        window.addEventListener('message', (event) => {
          const { method, params } = event.data;
          if (method === 'initialize') {
            renderChart(params.data);
          }
        });
      </script>
    </body>
    </html>
    """
```

## URI Scheme
MCP Apps use the `ui://` URI scheme:
- `ui://dashboard` — predeclared UI template
- Only `text/html` content is supported in the initial specification
- External URLs, remote DOM, and native widgets are deferred to future versions

## Security Model
| Layer | Protection |
|-------|-----------|
| Iframe sandbox | Restricted permissions (no top-level navigation, no same-origin access) |
| Predeclared templates | Hosts can review UI templates before rendering |
| Auditable messages | All UI-to-host communication goes through loggable JSON-RPC |
| Content restrictions | Only `text/html` from the MCP server, no external URLs |

## Communication
The iframe and host communicate via `postMessage` with JSON-RPC:
```javascript
// UI → Host: request data
window.parent.postMessage({
  jsonrpc: "2.0",
  method: "getData",
  params: { query: "sales" },
  id: 1
}, "*");

// Host → UI: send data
window.addEventListener("message", (event) => {
  const response = event.data;
  if (response.id === 1) {
    updateDisplay(response.result);
  }
});
```

## Best Practices
- Keep UI self-contained — all HTML, CSS, and JS in a single resource since external URLs are not supported.
- Use the JSON-RPC `postMessage` bridge for all data exchange between UI and host.
- Design for the iframe sandbox restrictions — no `localStorage`, no cookies, no top-level navigation.
- Provide a meaningful `title` in the UI declaration for accessibility.
- Keep UIs lightweight — they render inline in a conversation, not as full-page apps.
- Fall back gracefully to text content if the host does not support MCP Apps.
