---
name: cliwrap
description: Guidance for using CliWrap library to execute external processes and CLI commands in C#. Use when working with CliWrap.
license: MIT
metadata:
  displayName: "CliWrap"
  author: "Tyler-R-Kendrick"
---

# CliWrap

## Overview
CliWrap is a modern library for executing command-line processes in C# with a fluent API, async support, and built-in stream handling.

Package: `CliWrap`

## Installation

```bash
dotnet add package CliWrap
```

## Basic Execution

```csharp
using CliWrap;

// Simple execution
await Cli.Wrap("dotnet")
    .WithArguments("--version")
    .ExecuteAsync();

// With arguments array
await Cli.Wrap("git")
    .WithArguments(new[] { "commit", "-m", "Initial commit" })
    .ExecuteAsync();

// With arguments builder
await Cli.Wrap("dotnet")
    .WithArguments(args => args
        .Add("build")
        .Add("--configuration").Add("Release")
        .Add("--output").Add("./bin"))
    .ExecuteAsync();
```

## Capturing Output

```csharp
using CliWrap;
using CliWrap.Buffered;

// Capture stdout and stderr
var result = await Cli.Wrap("git")
    .WithArguments("log --oneline -10")
    .ExecuteBufferedAsync();

Console.WriteLine($"Exit code: {result.ExitCode}");
Console.WriteLine($"Output: {result.StandardOutput}");
Console.WriteLine($"Errors: {result.StandardError}");
```

## Streaming Output

```csharp
using CliWrap;
using System.Text;

var stdOutBuffer = new StringBuilder();
var stdErrBuffer = new StringBuilder();

await Cli.Wrap("dotnet")
    .WithArguments("build")
    .WithStandardOutputPipe(PipeTarget.ToStringBuilder(stdOutBuffer))
    .WithStandardErrorPipe(PipeTarget.ToStringBuilder(stdErrBuffer))
    .ExecuteAsync();

Console.WriteLine(stdOutBuffer.ToString());
```

## Real-time Output Processing

```csharp
using CliWrap;

await Cli.Wrap("dotnet")
    .WithArguments("test")
    .WithStandardOutputPipe(PipeTarget.ToDelegate(line => 
        Console.WriteLine($"[OUT] {line}")))
    .WithStandardErrorPipe(PipeTarget.ToDelegate(line => 
        Console.WriteLine($"[ERR] {line}")))
    .ExecuteAsync();
```

## Working Directory

```csharp
using CliWrap;

await Cli.Wrap("git")
    .WithArguments("status")
    .WithWorkingDirectory("/path/to/repo")
    .ExecuteAsync();
```

## Environment Variables

```csharp
using CliWrap;

await Cli.Wrap("myapp")
    .WithEnvironmentVariables(env => env
        .Set("ENV", "production")
        .Set("API_KEY", "secret"))
    .ExecuteAsync();
```

## Standard Input

```csharp
using CliWrap;

var input = "Hello from stdin";

await Cli.Wrap("myapp")
    .WithStandardInputPipe(PipeSource.FromString(input))
    .ExecuteAsync();
```

## Piping Between Commands

```csharp
using CliWrap;

// Equivalent to: echo "hello" | grep "he"
await Cli.Wrap("echo")
    .WithArguments("hello")
    .WithStandardOutputPipe(PipeTarget.ToDelegate(async (output, ct) =>
    {
        await Cli.Wrap("grep")
            .WithArguments("he")
            .WithStandardInputPipe(PipeSource.FromString(output))
            .ExecuteAsync(ct);
    }))
    .ExecuteAsync();

// Or using pipe operator
await (Cli.Wrap("echo").WithArguments("hello") |
       Cli.Wrap("grep").WithArguments("he"))
    .ExecuteAsync();
```

## Cancellation

```csharp
using CliWrap;

var cts = new CancellationTokenSource();
cts.CancelAfter(TimeSpan.FromSeconds(5));

try
{
    await Cli.Wrap("long-running-command")
        .ExecuteAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Command was cancelled");
}
```

## Exit Code Validation

```csharp
using CliWrap;
using CliWrap.Exceptions;

try
{
    await Cli.Wrap("git")
        .WithArguments("commit")
        .WithValidation(CommandResultValidation.ZeroExitCode)
        .ExecuteAsync();
}
catch (CommandExecutionException ex)
{
    Console.WriteLine($"Command failed with exit code: {ex.ExitCode}");
}
```

## Custom Validation

```csharp
using CliWrap;

await Cli.Wrap("myapp")
    .WithValidation(CommandResultValidation.None) // Disable validation
    .ExecuteAsync();
```

## Progress Reporting

```csharp
using CliWrap;

var progress = new Progress<double>(p => 
    Console.WriteLine($"Progress: {p:P0}"));

await Cli.Wrap("download-tool")
    .WithArguments("file.zip")
    .ExecuteAsync(progress);
```

## Timeout

```csharp
using CliWrap;

var cts = new CancellationTokenSource(TimeSpan.FromMinutes(5));

await Cli.Wrap("slow-command")
    .ExecuteAsync(cts.Token);
```

## Execute and Pull Events

```csharp
using CliWrap;
using CliWrap.EventStream;

await foreach (var cmdEvent in Cli.Wrap("dotnet")
    .WithArguments("build")
    .ListenAsync())
{
    switch (cmdEvent)
    {
        case StartedCommandEvent started:
            Console.WriteLine($"Process started: {started.ProcessId}");
            break;
        
        case StandardOutputCommandEvent stdOut:
            Console.WriteLine($"Out: {stdOut.Text}");
            break;
        
        case StandardErrorCommandEvent stdErr:
            Console.WriteLine($"Err: {stdErr.Text}");
            break;
        
        case ExitedCommandEvent exited:
            Console.WriteLine($"Process exited: {exited.ExitCode}");
            break;
    }
}
```

## Practical Examples

### Execute Git Commands

```csharp
using CliWrap;
using CliWrap.Buffered;

public class GitService
{
    private readonly string _repoPath;
    
    public GitService(string repoPath)
    {
        _repoPath = repoPath;
    }
    
    public async Task<string> GetCurrentBranchAsync()
    {
        var result = await Cli.Wrap("git")
            .WithArguments("branch --show-current")
            .WithWorkingDirectory(_repoPath)
            .ExecuteBufferedAsync();
        
        return result.StandardOutput.Trim();
    }
    
    public async Task CommitAsync(string message)
    {
        await Cli.Wrap("git")
            .WithArguments(args => args
                .Add("commit")
                .Add("-m").Add(message))
            .WithWorkingDirectory(_repoPath)
            .ExecuteAsync();
    }
}
```

### Run Docker Commands

```csharp
using CliWrap;
using CliWrap.Buffered;

public class DockerService
{
    public async Task<string[]> ListContainersAsync()
    {
        var result = await Cli.Wrap("docker")
            .WithArguments("ps --format {{.Names}}")
            .ExecuteBufferedAsync();
        
        return result.StandardOutput
            .Split('\n', StringSplitOptions.RemoveEmptyEntries);
    }
    
    public async Task BuildImageAsync(string tag, string dockerfile)
    {
        await Cli.Wrap("docker")
            .WithArguments(args => args
                .Add("build")
                .Add("-t").Add(tag)
                .Add("-f").Add(dockerfile)
                .Add("."))
            .WithStandardOutputPipe(PipeTarget.ToDelegate(
                line => Console.WriteLine($"[Docker] {line}")))
            .ExecuteAsync();
    }
}
```

### Execute npm Commands

```csharp
using CliWrap;

public class NpmService
{
    private readonly string _projectPath;
    
    public NpmService(string projectPath)
    {
        _projectPath = projectPath;
    }
    
    public async Task InstallAsync()
    {
        await Cli.Wrap("npm")
            .WithArguments("install")
            .WithWorkingDirectory(_projectPath)
            .WithStandardOutputPipe(PipeTarget.ToDelegate(
                line => Console.WriteLine(line)))
            .ExecuteAsync();
    }
    
    public async Task RunScriptAsync(string scriptName)
    {
        await Cli.Wrap("npm")
            .WithArguments($"run {scriptName}")
            .WithWorkingDirectory(_projectPath)
            .ExecuteAsync();
    }
}
```

### Run Tests with Output

```csharp
using CliWrap;

public class TestRunner
{
    public async Task<bool> RunTestsAsync(string projectPath)
    {
        var result = await Cli.Wrap("dotnet")
            .WithArguments("test --logger:console;verbosity=detailed")
            .WithWorkingDirectory(projectPath)
            .WithStandardOutputPipe(PipeTarget.ToDelegate(
                line => Console.WriteLine($"[Test] {line}")))
            .WithValidation(CommandResultValidation.None)
            .ExecuteAsync();
        
        return result.ExitCode == 0;
    }
}
```

## Guidance

- Use `ExecuteBufferedAsync()` for small outputs that fit in memory.
- Use streaming (`WithStandardOutputPipe`) for large or real-time output.
- Always handle cancellation tokens for long-running commands.
- Set working directory explicitly when executing in specific locations.
- Use argument builders for complex command lines to avoid escaping issues.
- Wrap CliWrap calls in try-catch to handle command failures gracefully.
- Use `WithValidation(CommandResultValidation.None)` when non-zero exit codes are acceptable.
- Leverage environment variables for passing configuration to child processes.
- Use piping to chain commands Unix-style.
- Monitor exit codes and error output for debugging.
- Consider timeout/cancellation for commands that might hang.
