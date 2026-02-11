# Isolated Storage

## Overview
Use `IsolatedStorageFile` for per-user or per-assembly storage in desktop or legacy scenarios.

## When to use
- Small settings or cache data scoped to user or assembly.

## Example
```csharp
using System.IO;
using System.IO.IsolatedStorage;

public sealed class SettingsStore
{
	public async Task SaveAsync(string key, string value, CancellationToken ct)
	{
		using var store = IsolatedStorageFile.GetUserStoreForAssembly();
		using var stream = new IsolatedStorageFileStream(key, FileMode.Create, store);
		using var writer = new StreamWriter(stream);
		await writer.WriteAsync(value.AsMemory(), ct);
	}
}
```

## Guidance
- Prefer this only where it is required; otherwise use app-specific storage paths.
- Ensure file names are validated and sanitized.