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