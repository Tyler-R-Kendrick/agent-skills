# File Providers

## Overview
Use `IFileProvider` to abstract file access over physical files, embedded resources, or composites.

## When to use
- Serving static files from multiple sources.
- Accessing embedded resources without direct file paths.

## Example
```csharp
using Microsoft.Extensions.FileProviders;

var physical = new PhysicalFileProvider("/app/content");
var embedded = new ManifestEmbeddedFileProvider(typeof(Program).Assembly);
var composite = new CompositeFileProvider(physical, embedded);

IFileInfo file = composite.GetFileInfo("data/config.json");
```

## Guidance
- Prefer `IFileProvider` over direct `File` access for flexible sources.
- Use `PhysicalFileProvider` for disk, `ManifestEmbeddedFileProvider` for embedded assets.
- Keep provider creation in the composition root and inject `IFileProvider`.