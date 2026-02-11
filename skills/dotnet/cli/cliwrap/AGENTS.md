# CliWrap

## Overview
CliWrap is a library for executing and interacting with command-line processes in a safe and convenient way.

## Example
```csharp
using CliWrap;

var result = await Cli.Wrap("git")
    .WithArguments("--version")
    .ExecuteAsync();

// Stream output
await Cli.Wrap("dotnet")
    .WithArguments("build")
    .WithStandardOutputPipe(PipeTarget.ToDelegate(Console.WriteLine))
    .ExecuteAsync();
```

## Best Practices
- Use ExecuteBufferedAsync for small outputs
- Stream large outputs with pipes
- Handle exit codes properly
- Set working directory when needed
- Configure timeouts for long-running processes
- Use cancellation tokens
