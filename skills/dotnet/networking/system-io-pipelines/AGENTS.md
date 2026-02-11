# System.IO.Pipelines

## Overview
Use `System.IO.Pipelines` for high-throughput IO and parsing.

## Example
```csharp
public async Task ReadAsync(PipeReader reader, CancellationToken ct)
{
	while (true)
	{
		var result = await reader.ReadAsync(ct);
		var buffer = result.Buffer;

		// Parse buffer here.

		reader.AdvanceTo(buffer.Start, buffer.End);
		if (result.IsCompleted) break;
	}
}
```

## Guidance
- Use pipelines when `Stream` APIs become a bottleneck.
- Avoid large buffer copies by slicing `ReadOnlySequence`.