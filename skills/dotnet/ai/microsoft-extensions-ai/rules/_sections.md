# Microsoft.Extensions.AI Rules

Best practices and rules for Microsoft.Extensions.AI.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Program against `IChatClient` and `IEmbeddingGenerator<,>`... | MEDIUM | [`microsoft-extensions-ai-program-against-ichatclient-and-iembeddinggenerator.md`](microsoft-extensions-ai-program-against-ichatclient-and-iembeddinggenerator.md) |
| 2 | Use `ChatClientBuilder` to compose middleware (caching,... | MEDIUM | [`microsoft-extensions-ai-use-chatclientbuilder-to-compose-middleware-caching.md`](microsoft-extensions-ai-use-chatclientbuilder-to-compose-middleware-caching.md) |
| 3 | Register `IChatClient` via `AddChatClient` in DI and inject... | CRITICAL | [`microsoft-extensions-ai-register-ichatclient-via-addchatclient-in-di-and-inject.md`](microsoft-extensions-ai-register-ichatclient-via-addchatclient-in-di-and-inject.md) |
| 4 | Set `Temperature = 0 | MEDIUM | [`microsoft-extensions-ai-set-temperature-0.md`](microsoft-extensions-ai-set-temperature-0.md) |
| 5 | Always pass `CancellationToken` through to... | CRITICAL | [`microsoft-extensions-ai-always-pass-cancellationtoken-through-to.md`](microsoft-extensions-ai-always-pass-cancellationtoken-through-to.md) |
| 6 | Use `ChatResponseFormat | MEDIUM | [`microsoft-extensions-ai-use-chatresponseformat.md`](microsoft-extensions-ai-use-chatresponseformat.md) |
| 7 | Cache embedding results with `UseDistributedCache` when the... | HIGH | [`microsoft-extensions-ai-cache-embedding-results-with-usedistributedcache-when-the.md`](microsoft-extensions-ai-cache-embedding-results-with-usedistributedcache-when-the.md) |
| 8 | Create focused service classes (e | MEDIUM | [`microsoft-extensions-ai-create-focused-service-classes-e.md`](microsoft-extensions-ai-create-focused-service-classes-e.md) |
| 9 | Use `AIFunctionFactory | MEDIUM | [`microsoft-extensions-ai-use-aifunctionfactory.md`](microsoft-extensions-ai-use-aifunctionfactory.md) |
| 10 | Monitor token usage and latency by adding... | MEDIUM | [`microsoft-extensions-ai-monitor-token-usage-and-latency-by-adding.md`](microsoft-extensions-ai-monitor-token-usage-and-latency-by-adding.md) |
