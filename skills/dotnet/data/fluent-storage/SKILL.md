---
name: fluent-storage
description: >
  USE FOR: Unified cloud storage abstraction across Azure Blob Storage, AWS S3, Google Cloud
  Storage, local filesystem, and FTP. Blob read/write, listing, streaming large files, and
  switching storage providers without code changes. DO NOT USE FOR: Relational data access,
  message queuing, low-level storage operations requiring provider-specific APIs (e.g., Azure
  Blob leases, S3 multipart upload tuning), or in-memory caching.
license: MIT
metadata:
  displayName: "FluentStorage"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# FluentStorage

## Overview

FluentStorage (formerly Storage.Net) provides a unified .NET API for working with blob storage across multiple cloud and local providers. It abstracts away the differences between Azure Blob Storage, AWS S3, Google Cloud Storage, local filesystem, FTP, and other backends behind a common `IBlobStorage` interface. This allows applications to switch storage providers through configuration rather than code changes.

The library supports reading, writing, listing, deleting, and streaming blobs. It also provides messaging abstractions, though the blob storage API is its primary use case.

Install via NuGet: `dotnet add package FluentStorage` plus the provider package (e.g., `FluentStorage.Azure.Blobs`, `FluentStorage.AWS.S3`).

## Basic Setup and Usage

```csharp
using FluentStorage;
using FluentStorage.Blobs;

// Azure Blob Storage
IBlobStorage azureStorage = StorageFactory.Blobs
    .AzureBlobStorageWithSharedKey(
        accountName: "myaccount",
        accountKey: "mykey");

// AWS S3
IBlobStorage s3Storage = StorageFactory.Blobs
    .AwsS3(
        accessKeyId: "AKID",
        secretAccessKey: "secret",
        bucketName: "my-bucket",
        region: "us-east-1");

// Local filesystem (great for development)
IBlobStorage localStorage = StorageFactory.Blobs
    .DirectoryFiles("/data/blobs");
```

## Reading and Writing Blobs

```csharp
using FluentStorage.Blobs;

public sealed class DocumentService
{
    private readonly IBlobStorage _storage;

    public DocumentService(IBlobStorage storage)
    {
        _storage = storage;
    }

    public async Task UploadTextAsync(string path, string content, CancellationToken ct)
    {
        await _storage.WriteTextAsync(path, content, cancellationToken: ct);
    }

    public async Task<string> DownloadTextAsync(string path, CancellationToken ct)
    {
        return await _storage.ReadTextAsync(path, cancellationToken: ct);
    }

    public async Task UploadBinaryAsync(string path, byte[] data, CancellationToken ct)
    {
        using var stream = new MemoryStream(data);
        await _storage.WriteAsync(path, stream, false, ct);
    }

    public async Task<byte[]> DownloadBinaryAsync(string path, CancellationToken ct)
    {
        using var stream = new MemoryStream();
        using var blobStream = await _storage.OpenReadAsync(path, ct);
        await blobStream.CopyToAsync(stream, ct);
        return stream.ToArray();
    }

    public async Task DeleteAsync(string path, CancellationToken ct)
    {
        await _storage.DeleteAsync(new[] { path }, ct);
    }
}
```

## Listing and Searching Blobs

```csharp
using FluentStorage.Blobs;

public sealed class BlobBrowser
{
    private readonly IBlobStorage _storage;

    public BlobBrowser(IBlobStorage storage)
    {
        _storage = storage;
    }

    public async Task<IReadOnlyList<Blob>> ListAllAsync(
        string folderPath, CancellationToken ct)
    {
        IReadOnlyCollection<Blob> blobs = await _storage.ListAsync(
            folderPath: folderPath,
            recurse: false,
            cancellationToken: ct);

        return blobs.ToList();
    }

    public async Task<IReadOnlyList<Blob>> ListFilesOnlyAsync(
        string folderPath, CancellationToken ct)
    {
        IReadOnlyCollection<Blob> blobs = await _storage.ListAsync(
            folderPath: folderPath,
            recurse: true,
            cancellationToken: ct);

        return blobs.Where(b => b.IsFile).ToList();
    }

    public async Task<bool> ExistsAsync(string path, CancellationToken ct)
    {
        IReadOnlyCollection<bool> results = await _storage.ExistsAsync(
            new[] { path }, ct);
        return results.First();
    }
}
```

## Streaming Large Files

Use streaming for large file uploads and downloads to avoid loading entire files into memory.

```csharp
using FluentStorage.Blobs;

public sealed class LargeFileService
{
    private readonly IBlobStorage _storage;

    public LargeFileService(IBlobStorage storage)
    {
        _storage = storage;
    }

    public async Task UploadFromFileAsync(
        string localFilePath, string blobPath, CancellationToken ct)
    {
        using FileStream fileStream = File.OpenRead(localFilePath);
        await _storage.WriteAsync(blobPath, fileStream, false, ct);
    }

    public async Task DownloadToFileAsync(
        string blobPath, string localFilePath, CancellationToken ct)
    {
        using Stream blobStream = await _storage.OpenReadAsync(blobPath, ct);
        using FileStream fileStream = File.Create(localFilePath);
        await blobStream.CopyToAsync(fileStream, ct);
    }

    public async Task CopyBetweenProvidersAsync(
        IBlobStorage source, string sourcePath,
        IBlobStorage destination, string destPath,
        CancellationToken ct)
    {
        using Stream stream = await source.OpenReadAsync(sourcePath, ct);
        await destination.WriteAsync(destPath, stream, false, ct);
    }
}
```

## DI Registration with Provider Switching

```csharp
using FluentStorage;
using FluentStorage.Blobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class StorageServiceExtensions
{
    public static IServiceCollection AddBlobStorage(
        this IServiceCollection services, IConfiguration configuration)
    {
        string provider = configuration["Storage:Provider"] ?? "local";

        services.AddSingleton<IBlobStorage>(_ => provider switch
        {
            "azure" => StorageFactory.Blobs.AzureBlobStorageWithSharedKey(
                configuration["Storage:Azure:AccountName"]!,
                configuration["Storage:Azure:AccountKey"]!),

            "aws" => StorageFactory.Blobs.AwsS3(
                configuration["Storage:Aws:AccessKeyId"]!,
                configuration["Storage:Aws:SecretAccessKey"]!,
                configuration["Storage:Aws:BucketName"]!,
                configuration["Storage:Aws:Region"]!),

            _ => StorageFactory.Blobs.DirectoryFiles(
                configuration["Storage:Local:Path"] ?? "/data/blobs")
        });

        services.AddScoped<DocumentService>();
        return services;
    }
}
```

```json
{
  "Storage": {
    "Provider": "azure",
    "Azure": {
      "AccountName": "myaccount",
      "AccountKey": "mykey"
    },
    "Aws": {
      "AccessKeyId": "AKID",
      "SecretAccessKey": "secret",
      "BucketName": "my-bucket",
      "Region": "us-east-1"
    },
    "Local": {
      "Path": "/data/blobs"
    }
  }
}
```

## Provider Comparison

| Provider | Package | Connection Method |
|---|---|---|
| Azure Blob | `FluentStorage.Azure.Blobs` | Account name + key, connection string, SAS |
| AWS S3 | `FluentStorage.AWS.S3` | Access key + secret, IAM role |
| Google Cloud | `FluentStorage.GCP` | Service account JSON |
| Local filesystem | `FluentStorage` (built-in) | Directory path |
| FTP | `FluentStorage.FTP` | Host, username, password |
| In-memory | `FluentStorage` (built-in) | No configuration |

## Best Practices

1. Program against the `IBlobStorage` interface everywhere in application code and resolve the concrete provider only at the composition root to enable easy provider switching.
2. Use `DirectoryFiles` for local development and integration tests so that tests run without cloud credentials or network access.
3. Always use streaming (`OpenReadAsync` / `WriteAsync` with `Stream`) for files larger than a few megabytes to avoid `OutOfMemoryException` from loading entire files into byte arrays.
4. Organize blobs with a path convention (e.g., `"tenants/{tenantId}/documents/{year}/{fileName}"`) to enable efficient listing and to avoid flat namespaces with thousands of blobs.
5. Register `IBlobStorage` as a singleton because FluentStorage provider instances are designed to be reused and maintain internal connection pooling.
6. Wrap storage operations in retry logic using Polly or `Microsoft.Extensions.Resilience` to handle transient network failures when communicating with cloud storage.
7. Store provider credentials in Azure Key Vault, user secrets, or environment variables rather than in `appsettings.json` to prevent accidental exposure in source control.
8. Call `ExistsAsync` before `OpenReadAsync` when the blob may not exist, or catch the appropriate exception, to provide clear error messages instead of opaque stream failures.
9. Use `DeleteAsync` with an array of paths for batch deletions rather than calling it in a loop, as providers may optimize batch operations into fewer HTTP requests.
10. Validate file paths and sanitize user-supplied file names before constructing blob paths to prevent directory traversal attacks and invalid characters in storage keys.
