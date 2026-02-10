---
name: system-io-abstractions
description: Guidance for System.IO.Abstractions usage. Use when working with system io abstractions.
license: MIT
metadata:
  displayName: "System.IO.Abstractions"
  author: "Tyler-R-Kendrick"
---

# System.IO.Abstractions

## Overview
Use the `System.IO.Abstractions` package to wrap file and directory access so IO can be mocked and tested.

## When to use
- Any code that reads or writes the file system.
- Services that need deterministic tests without touching disk.

## Setup
```csharp
builder.Services.AddSingleton<IFileSystem, FileSystem>();
```

## Example
```csharp
public sealed class ReportStore(IFileSystem fileSystem)
{
	public Task SaveAsync(string path, string contents, CancellationToken ct)
	{
		fileSystem.File.WriteAllText(path, contents);
		return Task.CompletedTask;
	}
}
```

## Guidance
- Inject `IFileSystem` and avoid `File` and `Directory` static calls.
- Wrap `Path` operations if you need to fake them in tests.