# CliWrap

## Overview
CliWrap is a library for interacting with external command-line processes in .NET. It provides a fluent API for building commands, capturing output, piping between processes, streaming stdout/stderr in real time, and handling cancellation and timeouts. CliWrap replaces direct use of `System.Diagnostics.Process` with a safer, more composable, and async-first API.

## NuGet Packages
```bash
dotnet add package CliWrap
```

## Basic Command Execution
```csharp
using CliWrap;

// Simple execution (fire and forget with exit code check)
var result = await Cli.Wrap("dotnet")
    .WithArguments("--version")
    .ExecuteAsync();

Console.WriteLine($"Exit code: {result.ExitCode}");
Console.WriteLine($"Started: {result.StartTime}");
Console.WriteLine($"Exited: {result.ExitTime}");
Console.WriteLine($"Duration: {result.RunTime}");
```

## Buffered Output (Capturing stdout/stderr)
```csharp
using CliWrap;
using CliWrap.Buffered;

var result = await Cli.Wrap("dotnet")
    .WithArguments(["build", "--configuration", "Release"])
    .WithWorkingDirectory("/src/MyProject")
    .ExecuteBufferedAsync();

Console.WriteLine($"STDOUT:\n{result.StandardOutput}");
Console.WriteLine($"STDERR:\n{result.StandardError}");
Console.WriteLine($"Exit code: {result.ExitCode}");
```

## Building Arguments
```csharp
using CliWrap;

// Array-based arguments (automatically handles escaping)
var result = await Cli.Wrap("git")
    .WithArguments(["commit", "-m", "Fix: handle spaces in file names"])
    .ExecuteBufferedAsync();

// Builder-based arguments for complex commands
var result2 = await Cli.Wrap("docker")
    .WithArguments(args => args
        .Add("run")
        .Add("--rm")
        .Add("-v").Add("/host/path:/container/path")
        .Add("-e").Add("CONNECTION_STRING=Server=localhost;Database=mydb")
        .Add("--name").Add("my-container")
        .Add("mcr.microsoft.com/dotnet/sdk:8.0"))
    .ExecuteBufferedAsync();
```

## Streaming Output in Real Time
```csharp
using CliWrap;
using CliWrap.EventStream;

var cmd = Cli.Wrap("dotnet")
    .WithArguments(["test", "--verbosity", "normal"])
    .WithWorkingDirectory("/src/MyProject");

await foreach (var cmdEvent in cmd.ListenAsync())
{
    switch (cmdEvent)
    {
        case StartedCommandEvent started:
            Console.WriteLine($"Process started; PID: {started.ProcessId}");
            break;
        case StandardOutputCommandEvent stdOut:
            Console.WriteLine($"[OUT] {stdOut.Text}");
            break;
        case StandardErrorCommandEvent stdErr:
            Console.WriteLine($"[ERR] {stdErr.Text}");
            break;
        case ExitedCommandEvent exited:
            Console.WriteLine($"Process exited; Code: {exited.ExitCode}");
            break;
    }
}
```

## Piping stdout/stderr
```csharp
using CliWrap;

// Pipe to delegates
await Cli.Wrap("dotnet")
    .WithArguments(["build"])
    .WithStandardOutputPipe(PipeTarget.ToDelegate(line =>
        Console.WriteLine($"[BUILD] {line}")))
    .WithStandardErrorPipe(PipeTarget.ToDelegate(line =>
        Console.Error.WriteLine($"[ERROR] {line}")))
    .ExecuteAsync();

// Pipe to file
await Cli.Wrap("dotnet")
    .WithArguments(["test", "--logger", "trx"])
    .WithStandardOutputPipe(PipeTarget.ToFile("test-output.log"))
    .ExecuteAsync();

// Pipe to StringBuilder
var stdOutBuffer = new StringBuilder();
var stdErrBuffer = new StringBuilder();

await Cli.Wrap("git")
    .WithArguments(["log", "--oneline", "-20"])
    .WithStandardOutputPipe(PipeTarget.ToStringBuilder(stdOutBuffer))
    .WithStandardErrorPipe(PipeTarget.ToStringBuilder(stdErrBuffer))
    .ExecuteAsync();

Console.WriteLine(stdOutBuffer.ToString());

// Pipe to Stream
using var memoryStream = new MemoryStream();
await Cli.Wrap("curl")
    .WithArguments(["-s", "https://api.example.com/data"])
    .WithStandardOutputPipe(PipeTarget.ToStream(memoryStream))
    .ExecuteAsync();

// Pipe to multiple targets simultaneously
await Cli.Wrap("dotnet")
    .WithArguments(["build"])
    .WithStandardOutputPipe(PipeTarget.Merge(
        PipeTarget.ToDelegate(Console.WriteLine),
        PipeTarget.ToFile("build.log")))
    .ExecuteAsync();
```

## Piping Between Processes
```csharp
using CliWrap;

// Pipe stdout of one command into stdin of another (like shell pipes)
var result = await (
    Cli.Wrap("dotnet")
        .WithArguments(["tool", "list", "--global"]) |
    Cli.Wrap("findstr")
        .WithArguments(["dotnet-ef"])
).ExecuteBufferedAsync();

Console.WriteLine(result.StandardOutput);
```

## Providing stdin Input
```csharp
using CliWrap;

// Pipe string input
var result = await Cli.Wrap("dotnet")
    .WithArguments(["script", "eval"])
    .WithStandardInputPipe(PipeSource.FromString("Console.WriteLine(1 + 2);"))
    .ExecuteBufferedAsync();

// Pipe from file
await Cli.Wrap("python")
    .WithArguments(["script.py"])
    .WithStandardInputPipe(PipeSource.FromFile("input.txt"))
    .ExecuteAsync();

// Pipe from stream
using var inputStream = new MemoryStream("Hello, World!"u8.ToArray());
await Cli.Wrap("cat")
    .WithStandardInputPipe(PipeSource.FromStream(inputStream))
    .ExecuteAsync();
```

## Cancellation and Timeouts
```csharp
using CliWrap;

// Cancellation token
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));

try
{
    await Cli.Wrap("dotnet")
        .WithArguments(["test"])
        .ExecuteAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Command was cancelled or timed out");
}

// Graceful shutdown: sends SIGINT first, then SIGKILL after timeout
using var cts2 = new CancellationTokenSource();
cts2.CancelAfter(TimeSpan.FromMinutes(5));

try
{
    await Cli.Wrap("long-running-process")
        .ExecuteAsync(
            forcefulCancellationToken: cts2.Token,
            gracefulCancellationToken: cts2.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Process was terminated");
}
```

## Environment Variables and Configuration
```csharp
using CliWrap;

var result = await Cli.Wrap("dotnet")
    .WithArguments(["run"])
    .WithWorkingDirectory("/src/MyApp")
    .WithEnvironmentVariables(env => env
        .Set("ASPNETCORE_ENVIRONMENT", "Staging")
        .Set("ConnectionStrings__Default", "Server=localhost;Database=testdb")
        .Set("DOTNET_CLI_TELEMETRY_OPTOUT", "1"))
    .WithValidation(CommandResultValidation.ZeroExitCode)
    .ExecuteAsync();
```

## Error Handling
```csharp
using CliWrap;
using CliWrap.Exceptions;

try
{
    await Cli.Wrap("dotnet")
        .WithArguments(["build"])
        .WithValidation(CommandResultValidation.ZeroExitCode) // Default behavior
        .ExecuteBufferedAsync();
}
catch (CommandExecutionException ex)
{
    Console.Error.WriteLine($"Command failed with exit code: {ex.ExitCode}");
    Console.Error.WriteLine($"Command: {ex.Command}");
}

// Disable validation to handle non-zero exit codes manually
var result = await Cli.Wrap("git")
    .WithArguments(["diff", "--exit-code"])
    .WithValidation(CommandResultValidation.None)
    .ExecuteBufferedAsync();

if (result.ExitCode != 0)
{
    Console.WriteLine("Working directory has changes:");
    Console.WriteLine(result.StandardOutput);
}
```

## Wrapping Common CLI Tools
```csharp
public class GitClient
{
    private readonly string _workingDirectory;

    public GitClient(string workingDirectory) =>
        _workingDirectory = workingDirectory;

    private Command BaseCommand => Cli.Wrap("git")
        .WithWorkingDirectory(_workingDirectory)
        .WithValidation(CommandResultValidation.ZeroExitCode);

    public async Task<string> GetCurrentBranchAsync(CancellationToken ct = default)
    {
        var result = await BaseCommand
            .WithArguments(["branch", "--show-current"])
            .ExecuteBufferedAsync(ct);
        return result.StandardOutput.Trim();
    }

    public async Task<string> GetStatusAsync(CancellationToken ct = default)
    {
        var result = await BaseCommand
            .WithArguments(["status", "--porcelain"])
            .ExecuteBufferedAsync(ct);
        return result.StandardOutput;
    }

    public async Task CommitAsync(string message, CancellationToken ct = default)
    {
        await BaseCommand
            .WithArguments(["add", "-A"])
            .ExecuteAsync(ct);

        await BaseCommand
            .WithArguments(["commit", "-m", message])
            .ExecuteAsync(ct);
    }

    public async Task<IReadOnlyList<string>> GetLogAsync(
        int count = 10, CancellationToken ct = default)
    {
        var result = await BaseCommand
            .WithArguments(["log", $"--oneline", $"-{count}"])
            .ExecuteBufferedAsync(ct);

        return result.StandardOutput
            .Split('\n', StringSplitOptions.RemoveEmptyEntries);
    }
}
```

## Best Practices
- Use `WithArguments(string[])` (array overload) instead of `WithArguments(string)` (raw string) to get automatic escaping of spaces, quotes, and special characters in argument values.
- Use `ExecuteBufferedAsync` only for commands with bounded output; for commands that may produce megabytes of output (e.g., `dotnet test --verbosity detailed`), use `ListenAsync` or pipe to a `Stream` to avoid memory pressure.
- Set `WithValidation(CommandResultValidation.ZeroExitCode)` explicitly (or rely on the default) to get `CommandExecutionException` on failure rather than silently ignoring non-zero exit codes.
- Always pass `CancellationToken` to `ExecuteAsync` and `ExecuteBufferedAsync`; use `CancellationTokenSource.CancelAfter` to enforce timeouts on long-running commands.
- Use `WithWorkingDirectory` to set the process working directory explicitly rather than relying on the host application's current directory, which may differ between development and deployment.
- Create typed wrapper classes (e.g., `GitClient`, `DockerClient`) that expose domain-specific methods using a shared `BaseCommand` property to centralize working directory, validation, and environment configuration.
- Use `PipeTarget.Merge` to send output to both a log file and the console simultaneously during build/deploy scripts where you need real-time feedback and a persistent record.
- Handle `CommandExecutionException` specifically (not just `Exception`) to extract the exit code and command details for structured error reporting and logging.
- Use the `|` pipe operator between `Command` instances (`cmdA | cmdB`) for shell-like piping instead of capturing intermediate output in memory and feeding it to the next process.
- Set environment variables with `WithEnvironmentVariables` rather than modifying `Environment.SetEnvironmentVariable` globally, which affects all threads and is not isolated per command.
