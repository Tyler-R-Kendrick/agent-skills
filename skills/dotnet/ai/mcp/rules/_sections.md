# MCP (Model Context Protocol) Rules

Best practices and rules for MCP (Model Context Protocol).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Mark tool methods with `[Description]` attributes on both... | MEDIUM | [`mcp-mark-tool-methods-with-description-attributes-on-both.md`](mcp-mark-tool-methods-with-description-attributes-on-both.md) |
| 2 | Validate all tool inputs before execution; reject SQL... | CRITICAL | [`mcp-validate-all-tool-inputs-before-execution-reject-sql.md`](mcp-validate-all-tool-inputs-before-execution-reject-sql.md) |
| 3 | Use `CancellationToken` parameters on async tool methods so... | MEDIUM | [`mcp-use-cancellationtoken-parameters-on-async-tool-methods-so.md`](mcp-use-cancellationtoken-parameters-on-async-tool-methods-so.md) |
| 4 | Return structured text (JSON, markdown) from tools rather... | MEDIUM | [`mcp-return-structured-text-json-markdown-from-tools-rather.md`](mcp-return-structured-text-json-markdown-from-tools-rather.md) |
| 5 | Register tools from the assembly (`WithToolsFromAssembly`)... | MEDIUM | [`mcp-register-tools-from-the-assembly-withtoolsfromassembly.md`](mcp-register-tools-from-the-assembly-withtoolsfromassembly.md) |
| 6 | Use the HTTP/SSE transport (`ModelContextProtocol | MEDIUM | [`mcp-use-the-http-sse-transport-modelcontextprotocol.md`](mcp-use-the-http-sse-transport-modelcontextprotocol.md) |
| 7 | Implement idempotent tool operations where possible (e | LOW | [`mcp-implement-idempotent-tool-operations-where-possible-e.md`](mcp-implement-idempotent-tool-operations-where-possible-e.md) |
| 8 | Keep tool responses under 10,000 characters to avoid... | HIGH | [`mcp-keep-tool-responses-under-10-000-characters-to-avoid.md`](mcp-keep-tool-responses-under-10-000-characters-to-avoid.md) |
| 9 | Log every tool invocation with input parameters and... | MEDIUM | [`mcp-log-every-tool-invocation-with-input-parameters-and.md`](mcp-log-every-tool-invocation-with-input-parameters-and.md) |
| 10 | Test MCP tools independently with unit tests that verify... | MEDIUM | [`mcp-test-mcp-tools-independently-with-unit-tests-that-verify.md`](mcp-test-mcp-tools-independently-with-unit-tests-that-verify.md) |
