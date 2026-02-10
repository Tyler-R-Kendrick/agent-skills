---
name: iasyncenumerable
description: Guidance for IAsyncEnumerable usage. Use when working with iasyncenumerable.
license: MIT
metadata:
  displayName: "IAsyncEnumerable"
  author: "Tyler-R-Kendrick"
---

# IAsyncEnumerable

## Overview
Use `IAsyncEnumerable<T>` for streaming data in async flows.

## Example
```csharp
public async IAsyncEnumerable<WorkItem> StreamAsync(
	[EnumeratorCancellation] CancellationToken ct)
{
	while (!ct.IsCancellationRequested)
	{
		yield return await NextAsync(ct);
	}
}
```

## Guidance
- Prefer streaming for large datasets.
- Pass cancellation tokens with `EnumeratorCancellation`.