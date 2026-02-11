---
name: isolated-storage
description: >
  USE FOR: Per-user or per-assembly sandboxed file storage in desktop applications, small
  settings or cache data scoped to user identity, and legacy ClickOnce or partial-trust
  application scenarios. DO NOT USE FOR: Server-side web applications, cross-machine shared
  storage, large file storage, modern applications where application data folders are preferred,
  or .NET Core/5+ applications targeting Linux or macOS (limited support).
license: MIT
metadata:
  displayName: "Isolated Storage"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Isolated Storage

## Overview

`System.IO.IsolatedStorage` provides a sandboxed file system for .NET applications where data is isolated by user, assembly, and optionally by application domain. Each isolation scope gets its own virtual file system that is physically stored in a hidden location on disk, managed by the runtime. This prevents applications from accessing each other's data and provides a storage mechanism that does not require explicit file path management.

Isolated storage was originally designed for partially trusted code (e.g., ClickOnce applications, browser-hosted apps) where direct file system access was restricted. While partial trust is no longer a primary scenario in modern .NET, isolated storage remains available for desktop applications that need simple, user-scoped persistence without managing file paths directly.

Note: Isolated storage is a Windows-focused API. On .NET Core and .NET 5+ running on Linux and macOS, support is limited and the `Environment.SpecialFolder.ApplicationData` approach is generally preferred.

## Basic File Operations

```csharp
using System.IO;
using System.IO.IsolatedStorage;

public sealed class IsolatedFileManager
{
    public async Task WriteFileAsync(string fileName, string content, CancellationToken ct)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        using IsolatedStorageFileStream stream = new IsolatedStorageFileStream(
            fileName, FileMode.Create, FileAccess.Write, store);
        using StreamWriter writer = new StreamWriter(stream);
        await writer.WriteAsync(content.AsMemory(), ct);
    }

    public async Task<string?> ReadFileAsync(string fileName, CancellationToken ct)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();

        if (!store.FileExists(fileName))
        {
            return null;
        }

        using IsolatedStorageFileStream stream = new IsolatedStorageFileStream(
            fileName, FileMode.Open, FileAccess.Read, store);
        using StreamReader reader = new StreamReader(stream);
        return await reader.ReadToEndAsync(ct);
    }

    public void DeleteFile(string fileName)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        if (store.FileExists(fileName))
        {
            store.DeleteFile(fileName);
        }
    }

    public bool FileExists(string fileName)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        return store.FileExists(fileName);
    }
}
```

## Directory Operations

```csharp
using System.IO;
using System.IO.IsolatedStorage;

public sealed class IsolatedDirectoryManager
{
    public void CreateDirectory(string directoryName)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        if (!store.DirectoryExists(directoryName))
        {
            store.CreateDirectory(directoryName);
        }
    }

    public string[] ListFiles(string directoryPattern)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        return store.GetFileNames(directoryPattern);
    }

    public string[] ListDirectories(string directoryPattern)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        return store.GetDirectoryNames(directoryPattern);
    }

    public void DeleteDirectory(string directoryName)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        if (store.DirectoryExists(directoryName))
        {
            // Must delete all files in the directory first
            foreach (string file in store.GetFileNames(Path.Combine(directoryName, "*")))
            {
                store.DeleteFile(Path.Combine(directoryName, file));
            }
            store.DeleteDirectory(directoryName);
        }
    }
}
```

## JSON Settings Store

A practical pattern for persisting application settings.

```csharp
using System.IO;
using System.IO.IsolatedStorage;
using System.Text.Json;

public sealed class SettingsStore<T> where T : class, new()
{
    private readonly string _fileName;

    public SettingsStore(string fileName = "settings.json")
    {
        _fileName = fileName;
    }

    public async Task<T> LoadAsync(CancellationToken ct)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();

        if (!store.FileExists(_fileName))
        {
            return new T();
        }

        using IsolatedStorageFileStream stream = new IsolatedStorageFileStream(
            _fileName, FileMode.Open, FileAccess.Read, store);

        T? result = await JsonSerializer.DeserializeAsync<T>(stream, cancellationToken: ct);
        return result ?? new T();
    }

    public async Task SaveAsync(T settings, CancellationToken ct)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();
        using IsolatedStorageFileStream stream = new IsolatedStorageFileStream(
            _fileName, FileMode.Create, FileAccess.Write, store);

        var options = new JsonSerializerOptions { WriteIndented = true };
        await JsonSerializer.SerializeAsync(stream, settings, options, ct);
    }
}
```

```csharp
// Usage
public sealed class AppSettings
{
    public string Theme { get; set; } = "Light";
    public int FontSize { get; set; } = 12;
    public bool AutoSave { get; set; } = true;
    public List<string> RecentFiles { get; set; } = new();
}

var store = new SettingsStore<AppSettings>();

// Load settings
AppSettings settings = await store.LoadAsync(CancellationToken.None);

// Modify and save
settings.Theme = "Dark";
settings.RecentFiles.Add("document.txt");
await store.SaveAsync(settings, CancellationToken.None);
```

## Isolation Scopes

Different scopes control how storage is partitioned.

```csharp
using System.IO.IsolatedStorage;

// Isolated by user AND assembly -- most common
using IsolatedStorageFile userAssembly =
    IsolatedStorageFile.GetUserStoreForAssembly();

// Isolated by user AND application (all assemblies share)
using IsolatedStorageFile userApp =
    IsolatedStorageFile.GetUserStoreForApplication();

// Isolated by user, domain, AND assembly
using IsolatedStorageFile userDomainAssembly =
    IsolatedStorageFile.GetUserStoreForDomain();

// Machine-level (all users share) -- requires elevated permissions
using IsolatedStorageFile machineAssembly =
    IsolatedStorageFile.GetMachineStoreForAssembly();
```

## Storage Quota Management

```csharp
using System.IO.IsolatedStorage;

public sealed class StorageQuotaManager
{
    public StorageInfo GetStorageInfo()
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();

        return new StorageInfo
        {
            MaximumSize = store.MaximumSize,
            CurrentSize = store.CurrentSize,
            AvailableFreeSpace = store.AvailableFreeSpace
        };
    }

    public void CleanupOldFiles(int maxAgeDays)
    {
        using IsolatedStorageFile store = IsolatedStorageFile.GetUserStoreForAssembly();

        foreach (string fileName in store.GetFileNames("cache/*"))
        {
            string fullPath = Path.Combine("cache", fileName);
            DateTimeOffset created = store.GetCreationTime(fullPath);

            if (created < DateTimeOffset.UtcNow.AddDays(-maxAgeDays))
            {
                store.DeleteFile(fullPath);
            }
        }
    }
}

public sealed class StorageInfo
{
    public long MaximumSize { get; set; }
    public long CurrentSize { get; set; }
    public long AvailableFreeSpace { get; set; }
}
```

## Isolated Storage vs Modern Alternatives

| Approach | Scope | Platform | Use Case |
|---|---|---|---|
| IsolatedStorage (UserStoreForAssembly) | Per-user, per-assembly | Windows (primary) | Legacy desktop apps |
| Environment.SpecialFolder.ApplicationData | Per-user | Cross-platform | Modern desktop apps |
| Environment.SpecialFolder.LocalApplicationData | Per-user, non-roaming | Cross-platform | Caches, temp data |
| MAUI Preferences API | Per-user | Cross-platform mobile/desktop | Simple key-value settings |
| Jot | Per-user | Cross-platform | UI state tracking |

## Best Practices

1. Prefer `Environment.SpecialFolder.ApplicationData` with explicit subdirectories over isolated storage in new .NET 6+ applications for better cross-platform compatibility and transparency.
2. Always check `store.FileExists` before opening a file for reading to avoid `FileNotFoundException` when the file has never been created.
3. Validate and sanitize file names before using them as isolated storage paths to prevent path traversal or invalid character exceptions.
4. Use `IsolatedStorageFile.GetUserStoreForAssembly()` as the default scope; use `GetMachineStoreForAssembly()` only when data must be shared across all users on the machine.
5. Wrap isolated storage operations in try-catch for `IsolatedStorageException` to handle quota exhaustion, concurrent access, and store corruption gracefully.
6. Dispose `IsolatedStorageFile` and `IsolatedStorageFileStream` instances promptly using `using` statements to release file handles and avoid locking issues.
7. Monitor storage usage with `CurrentSize` and `AvailableFreeSpace` and implement a cleanup strategy to prevent quota exhaustion in long-running applications.
8. Do not store sensitive data like passwords or tokens in isolated storage without encryption, because the files are readable by any process running under the same user account.
9. Use JSON serialization for structured data rather than inventing a custom text format, making the stored data easier to debug, migrate, and version.
10. Write integration tests that create, read, update, and delete files in isolated storage, cleaning up the store in test teardown to avoid test pollution.
