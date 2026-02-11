---
name: system-io-abstractions
description: >
  Guidance for System.IO.Abstractions file system abstraction library.
  USE FOR: wrapping file and directory operations for testability, mocking file system access
  in unit tests, replacing static File/Directory/Path calls with injectable interfaces,
  using MockFileSystem for deterministic test scenarios, testing code that reads/writes files.
  DO NOT USE FOR: actual file I/O performance optimization, replacing stream-based APIs,
  or scenarios where you need raw file system performance without abstraction overhead.
license: MIT
metadata:
  displayName: "System.IO.Abstractions"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "System.IO.Abstractions GitHub Repository"
    url: "https://github.com/TestableIO/System.IO.Abstractions"
  - title: "System.IO.Abstractions NuGet Package"
    url: "https://www.nuget.org/packages/System.IO.Abstractions"
  - title: "System.IO.Abstractions TestingHelpers NuGet Package"
    url: "https://www.nuget.org/packages/System.IO.Abstractions.TestingHelpers"
---

# System.IO.Abstractions

## Overview

`System.IO.Abstractions` provides interface wrappers around .NET's static `File`, `Directory`, `Path`, and `FileInfo` classes, making file system operations injectable and testable. Instead of calling `File.ReadAllText(path)` directly, you inject `IFileSystem` and call `fileSystem.File.ReadAllText(path)`. The companion package `System.IO.Abstractions.TestingHelpers` provides `MockFileSystem`, an in-memory file system implementation that enables fast, deterministic unit tests without touching the real disk. This library follows the adapter pattern and is the standard approach for making file-dependent code testable in .NET.

## Service Registration

Register `IFileSystem` in the DI container for production and testing use.

```csharp
using System.IO.Abstractions;
using Microsoft.Extensions.DependencyInjection;

// Program.cs - production registration
builder.Services.AddSingleton<IFileSystem, FileSystem>();

// In tests, replace with MockFileSystem
services.AddSingleton<IFileSystem>(new MockFileSystem());
```

## Injecting and Using IFileSystem

Replace direct `File` and `Directory` static calls with `IFileSystem`.

```csharp
using System.IO.Abstractions;

public sealed class ConfigurationLoader
{
    private readonly IFileSystem _fileSystem;

    public ConfigurationLoader(IFileSystem fileSystem)
    {
        _fileSystem = fileSystem;
    }

    public async Task<string> LoadConfigAsync(string path)
    {
        if (!_fileSystem.File.Exists(path))
            throw new FileNotFoundException(
                $"Configuration file not found: {path}");

        return await _fileSystem.File.ReadAllTextAsync(path);
    }

    public async Task SaveConfigAsync(string path, string content)
    {
        string? directory = _fileSystem.Path.GetDirectoryName(path);
        if (directory != null && !_fileSystem.Directory.Exists(directory))
            _fileSystem.Directory.CreateDirectory(directory);

        await _fileSystem.File.WriteAllTextAsync(path, content);
    }
}
```

## Testing with MockFileSystem

Use `MockFileSystem` to set up an in-memory file system for unit tests.

```csharp
using System.IO.Abstractions;
using System.IO.Abstractions.TestingHelpers;
using Xunit;

public class ConfigurationLoaderTests
{
    [Fact]
    public async Task LoadConfig_Returns_File_Contents()
    {
        // Arrange: create a mock file system with a pre-existing file
        var mockFs = new MockFileSystem(new Dictionary<string, MockFileData>
        {
            { @"C:\app\config.json", new MockFileData("""
                {
                    "Database": "Server=localhost;Database=mydb",
                    "LogLevel": "Information"
                }
                """) }
        });

        var loader = new ConfigurationLoader(mockFs);

        // Act
        string content = await loader.LoadConfigAsync(@"C:\app\config.json");

        // Assert
        Assert.Contains("Database", content);
        Assert.Contains("mydb", content);
    }

    [Fact]
    public async Task LoadConfig_Throws_When_File_Missing()
    {
        var mockFs = new MockFileSystem();
        var loader = new ConfigurationLoader(mockFs);

        await Assert.ThrowsAsync<FileNotFoundException>(
            () => loader.LoadConfigAsync(@"C:\missing\config.json"));
    }

    [Fact]
    public async Task SaveConfig_Creates_Directory_And_File()
    {
        var mockFs = new MockFileSystem();
        var loader = new ConfigurationLoader(mockFs);

        await loader.SaveConfigAsync(
            @"C:\app\settings\config.json",
            """{"setting": "value"}""");

        Assert.True(mockFs.Directory.Exists(@"C:\app\settings"));
        Assert.True(mockFs.File.Exists(@"C:\app\settings\config.json"));

        string saved = await mockFs.File.ReadAllTextAsync(
            @"C:\app\settings\config.json");
        Assert.Contains("value", saved);
    }
}
```

## File Processing Service

Build a complete file processing service with full testability.

```csharp
using System.IO.Abstractions;
using System.Text.Json;

public sealed class ReportService
{
    private readonly IFileSystem _fileSystem;

    public ReportService(IFileSystem fileSystem)
    {
        _fileSystem = fileSystem;
    }

    public async Task<List<string>> GetReportFilesAsync(string directory)
    {
        if (!_fileSystem.Directory.Exists(directory))
            return new List<string>();

        return _fileSystem.Directory
            .GetFiles(directory, "*.json")
            .OrderBy(f => _fileSystem.FileInfo
                .New(f).CreationTimeUtc)
            .ToList();
    }

    public async Task<T?> ReadReportAsync<T>(string path)
    {
        string json = await _fileSystem.File.ReadAllTextAsync(path);
        return JsonSerializer.Deserialize<T>(json);
    }

    public async Task WriteReportAsync<T>(
        string directory, string fileName, T report)
    {
        if (!_fileSystem.Directory.Exists(directory))
            _fileSystem.Directory.CreateDirectory(directory);

        string path = _fileSystem.Path.Combine(directory, fileName);
        string json = JsonSerializer.Serialize(report,
            new JsonSerializerOptions { WriteIndented = true });

        await _fileSystem.File.WriteAllTextAsync(path, json);
    }

    public long GetDirectorySizeBytes(string directory)
    {
        if (!_fileSystem.Directory.Exists(directory))
            return 0;

        return _fileSystem.Directory
            .GetFiles(directory, "*", SearchOption.AllDirectories)
            .Sum(f => _fileSystem.FileInfo.New(f).Length);
    }
}
```

## Testing File Processing

Test the report service with various mock file system states.

```csharp
using System.IO.Abstractions;
using System.IO.Abstractions.TestingHelpers;
using Xunit;

public class ReportServiceTests
{
    [Fact]
    public async Task GetReportFiles_Returns_Only_Json_Files()
    {
        var mockFs = new MockFileSystem(new Dictionary<string, MockFileData>
        {
            { @"C:\reports\jan.json", new MockFileData("{}") },
            { @"C:\reports\feb.json", new MockFileData("{}") },
            { @"C:\reports\readme.txt", new MockFileData("text") },
            { @"C:\reports\data.csv", new MockFileData("a,b,c") }
        });

        var service = new ReportService(mockFs);
        var files = await service.GetReportFilesAsync(@"C:\reports");

        Assert.Equal(2, files.Count);
        Assert.All(files, f => Assert.EndsWith(".json", f));
    }

    [Fact]
    public async Task GetReportFiles_Returns_Empty_For_Missing_Directory()
    {
        var mockFs = new MockFileSystem();
        var service = new ReportService(mockFs);

        var files = await service.GetReportFilesAsync(@"C:\nonexistent");

        Assert.Empty(files);
    }

    [Fact]
    public void GetDirectorySize_Calculates_Total_Bytes()
    {
        var mockFs = new MockFileSystem(new Dictionary<string, MockFileData>
        {
            { @"C:\data\file1.bin", new MockFileData(new byte[1024]) },
            { @"C:\data\file2.bin", new MockFileData(new byte[2048]) },
            { @"C:\data\sub\file3.bin", new MockFileData(new byte[512]) }
        });

        var service = new ReportService(mockFs);
        long size = service.GetDirectorySizeBytes(@"C:\data");

        Assert.Equal(3584, size); // 1024 + 2048 + 512
    }

    [Fact]
    public async Task WriteReport_Then_ReadReport_RoundTrips()
    {
        var mockFs = new MockFileSystem();
        var service = new ReportService(mockFs);
        var report = new { Title = "Monthly", Value = 42.5 };

        await service.WriteReportAsync(
            @"C:\reports", "output.json", report);

        Assert.True(mockFs.File.Exists(@"C:\reports\output.json"));
    }
}
```

## Wrapping Path Operations

Use `IPath` for path manipulation to support cross-platform testing.

```csharp
using System.IO.Abstractions;

public sealed class PathResolver
{
    private readonly IFileSystem _fileSystem;
    private readonly string _basePath;

    public PathResolver(IFileSystem fileSystem, string basePath)
    {
        _fileSystem = fileSystem;
        _basePath = basePath;
    }

    public string Resolve(string relativePath)
    {
        string combined = _fileSystem.Path.Combine(
            _basePath, relativePath);
        return _fileSystem.Path.GetFullPath(combined);
    }

    public string GetExtension(string fileName) =>
        _fileSystem.Path.GetExtension(fileName);

    public string ChangeExtension(string path, string newExtension) =>
        _fileSystem.Path.ChangeExtension(path, newExtension);

    public bool IsWithinBasePath(string path)
    {
        string fullPath = _fileSystem.Path.GetFullPath(path);
        return fullPath.StartsWith(_basePath,
            StringComparison.OrdinalIgnoreCase);
    }
}
```

## API Comparison

| Static API | IFileSystem Equivalent | Test Mock |
|-----------|----------------------|-----------|
| `File.ReadAllText(path)` | `fileSystem.File.ReadAllText(path)` | `MockFileSystem` with pre-loaded files |
| `File.Exists(path)` | `fileSystem.File.Exists(path)` | Files in `MockFileSystem` dictionary |
| `Directory.CreateDirectory(path)` | `fileSystem.Directory.CreateDirectory(path)` | Verified via `mockFs.Directory.Exists()` |
| `Path.Combine(a, b)` | `fileSystem.Path.Combine(a, b)` | Works identically in mock |
| `new FileInfo(path)` | `fileSystem.FileInfo.New(path)` | `MockFileData` with size/dates |
| `File.WriteAllTextAsync(path, text)` | `fileSystem.File.WriteAllTextAsync(path, text)` | Read back from `MockFileSystem` |

## Best Practices

1. **Inject `IFileSystem` everywhere instead of using static `File` and `Directory` calls**: this single change makes all file-dependent code unit testable without touching the real disk.
2. **Register `FileSystem` as a singleton in production**: the real `FileSystem` implementation is stateless and thread-safe; there is no need for scoped or transient registration.
3. **Pre-populate `MockFileSystem` with test data in the constructor**: pass a `Dictionary<string, MockFileData>` to set up the initial file system state rather than creating files in test Arrange steps.
4. **Test both file-exists and file-missing scenarios**: always verify behavior when expected files are absent, directories do not exist, or paths are invalid.
5. **Use `IFileSystem.Path` instead of `System.IO.Path` directly**: while `Path` methods are mostly static math, wrapping them through `IFileSystem.Path` maintains consistency and supports cross-platform test scenarios.
6. **Use `MockFileData` with byte arrays for binary file testing**: `new MockFileData(new byte[1024])` creates a mock file with specific size for testing size calculations and binary reads.
7. **Avoid mixing `IFileSystem` calls with raw `System.IO` calls in the same class**: if a method uses `IFileSystem.File.ReadAllText`, do not also call `File.Exists` statically, as the mock will not intercept the static call.
8. **Use `IFileInfo` and `IDirectoryInfo` for metadata access**: when you need creation time, last write time, or file size, use `fileSystem.FileInfo.New(path)` instead of `new FileInfo(path)`.
9. **Test path traversal prevention with `MockFileSystem`**: verify that `GetFullPath` combined with a `StartsWith` check on the base directory prevents `../` attacks in your path resolution logic.
10. **Install `System.IO.Abstractions.TestingHelpers` only in test projects**: the main `System.IO.Abstractions` package goes in your production projects; the `TestingHelpers` package with `MockFileSystem` should only be referenced by test projects.
