# Wolverine

## Overview
Use Wolverine for command, event, and messaging orchestration with strong pipelines.

## Example
```csharp
builder.Services.AddWolverine(opts =>
{
	opts.UseInMemoryTransport();
});
```

## Guidance
- Use handlers for command and event boundaries.
- Keep message contracts versioned.