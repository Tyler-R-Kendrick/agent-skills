# FluentStorage

## Overview
FluentStorage provides a unified API for working with different storage providers (Azure, AWS, local filesystem, etc.).

## Example
```csharp
using Storage.Net;
using Storage.Net.Blobs;

IBlobStorage storage = StorageFactory.Blobs
    .AzureBlobStorage("connection-string");

// Upload
await storage.WriteTextAsync("file.txt", "content");

// Download
string content = await storage.ReadTextAsync("file.txt");

// List
IReadOnlyCollection<Blob> blobs = await storage.ListAsync();
```

## Best Practices
- Use abstractions for portability
- Handle storage errors gracefully
- Implement retry logic
- Use streaming for large files
- Consider costs of operations
