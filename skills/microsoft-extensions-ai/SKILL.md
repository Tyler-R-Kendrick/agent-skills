---
name: microsoft-extensions-ai
description: Guidance for Microsoft.Extensions.AI usage. Use when working with microsoft extensions ai.
license: MIT
metadata:
  displayName: "Microsoft.Extensions.AI"
  author: "Tyler-R-Kendrick"
---

# Microsoft.Extensions.AI

## Overview
Use `Microsoft.Extensions.AI` for provider-agnostic AI abstractions and DI-friendly clients.

## Example
```csharp
public sealed class ChatService(IChatClient chatClient)
{
	public Task<ChatResponse> AskAsync(string prompt, CancellationToken ct)
		=> chatClient.CompleteAsync(prompt, ct);
}
```

## Guidance
- Keep provider-specific configuration at the composition root.
- Favor interfaces (`IChatClient`, `IEmbeddingGenerator`) for testability.