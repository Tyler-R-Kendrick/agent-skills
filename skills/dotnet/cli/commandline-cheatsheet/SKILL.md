---
name: commandline-cheatsheet
description: |
  Use when building command-line applications in .NET with System.CommandLine. Covers command/option/argument definitions, middleware, tab completion, parsing, and hosting integration for CLI tools.
  USE FOR: building CLI applications with typed argument parsing, creating dotnet tools with subcommands, System.CommandLine setup and configuration, adding tab completion to CLI apps, parsing and validating command-line arguments
  DO NOT USE FOR: executing external CLI processes (use cliwrap), rendering rich terminal UI with tables and progress bars (use spectre-console), building web APIs (use ASP.NET Core), simple Console.ReadLine input
license: MIT
metadata:
  displayName: "Command-Line Cheatsheet"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "System.CommandLine Documentation"
    url: "https://learn.microsoft.com/dotnet/standard/commandline"
  - title: "System.CommandLine GitHub Repository"
    url: "https://github.com/dotnet/command-line-api"
  - title: "System.CommandLine NuGet Package"
    url: "https://www.nuget.org/packages/System.CommandLine"
---

# Command-Line Cheatsheet

## Overview
System.CommandLine is the official .NET library for building command-line applications with typed argument parsing, automatic help generation, tab completion, and middleware support. It provides a structured way to define commands, options, and arguments that map directly to handler methods, with built-in validation and error reporting.

## NuGet Packages
```bash
dotnet add package System.CommandLine
dotnet add package System.CommandLine.Hosting   # Generic Host integration
```

## Minimal CLI Application
```csharp
using System.CommandLine;

var nameOption = new Option<string>(
    name: "--name",
    description: "Your name")
{ IsRequired = true };

var greetingOption = new Option<string>(
    name: "--greeting",
    description: "The greeting to use",
    getDefaultValue: () => "Hello");

var rootCommand = new RootCommand("A simple greeting CLI tool");
rootCommand.AddOption(nameOption);
rootCommand.AddOption(greetingOption);

rootCommand.SetHandler((string name, string greeting) =>
{
    Console.WriteLine($"{greeting}, {name}!");
}, nameOption, greetingOption);

return await rootCommand.InvokeAsync(args);
// Usage: myapp --name Alice --greeting "Good morning"
```

## Commands with Subcommands
```csharp
using System.CommandLine;

var rootCommand = new RootCommand("Project management CLI");

// 'new' command
var newCommand = new Command("new", "Create a new project");
var templateArg = new Argument<string>("template", "Project template name");
var outputOption = new Option<DirectoryInfo>(
    "--output", "Output directory") { IsRequired = false };

newCommand.AddArgument(templateArg);
newCommand.AddOption(outputOption);

newCommand.SetHandler((string template, DirectoryInfo? output) =>
{
    var dir = output?.FullName ?? Directory.GetCurrentDirectory();
    Console.WriteLine($"Creating '{template}' project in {dir}");
}, templateArg, outputOption);

// 'build' command
var buildCommand = new Command("build", "Build the project");
var configOption = new Option<string>(
    "--configuration", () => "Debug", "Build configuration");
configOption.AddAlias("-c");

var verbosityOption = new Option<Verbosity>(
    "--verbosity", () => Verbosity.Normal, "Output verbosity");
verbosityOption.AddAlias("-v");

buildCommand.AddOption(configOption);
buildCommand.AddOption(verbosityOption);

buildCommand.SetHandler((string config, Verbosity verbosity) =>
{
    Console.WriteLine($"Building with configuration={config}, verbosity={verbosity}");
}, configOption, verbosityOption);

// 'test' command with nested subcommands
var testCommand = new Command("test", "Run tests");
var unitCommand = new Command("unit", "Run unit tests");
var integrationCommand = new Command("integration", "Run integration tests");

var filterOption = new Option<string?>("--filter", "Test filter expression");

unitCommand.AddOption(filterOption);
unitCommand.SetHandler((string? filter) =>
{
    Console.WriteLine($"Running unit tests{(filter != null ? $" with filter: {filter}" : "")}");
}, filterOption);

integrationCommand.SetHandler(() =>
{
    Console.WriteLine("Running integration tests");
});

testCommand.AddCommand(unitCommand);
testCommand.AddCommand(integrationCommand);

rootCommand.AddCommand(newCommand);
rootCommand.AddCommand(buildCommand);
rootCommand.AddCommand(testCommand);

return await rootCommand.InvokeAsync(args);

enum Verbosity { Quiet, Normal, Detailed, Diagnostic }

// Usage:
// myapp new webapp --output ./MyApp
// myapp build -c Release -v Detailed
// myapp test unit --filter "Category=Smoke"
// myapp test integration
```

## Options, Arguments, and Aliases

| Concept | Description | Example |
|---------|-------------|---------|
| `Option<T>` | Named parameter with `--` prefix | `--output`, `-o` |
| `Argument<T>` | Positional parameter (no prefix) | `myapp <file>` |
| `AddAlias` | Short alias for an option | `-c` for `--configuration` |
| `IsRequired` | Makes an option mandatory | `{ IsRequired = true }` |
| `getDefaultValue` | Factory for default values | `() => "Debug"` |
| `FromAmong` | Restricts to allowed values | `FromAmong("Debug", "Release")` |

## Argument Validation
```csharp
using System.CommandLine;

var portOption = new Option<int>("--port", "Server port");
portOption.AddValidator(result =>
{
    var port = result.GetValueForOption(portOption);
    if (port < 1024 || port > 65535)
    {
        result.ErrorMessage = "Port must be between 1024 and 65535";
    }
});

var fileArgument = new Argument<FileInfo>("file", "Input file");
fileArgument.AddValidator(result =>
{
    var file = result.GetValueForArgument(fileArgument);
    if (file is not null && !file.Exists)
    {
        result.ErrorMessage = $"File not found: {file.FullName}";
    }
});

// Restrict to specific values
var envOption = new Option<string>("--environment");
envOption.FromAmong("Development", "Staging", "Production");
```

## Global Options
```csharp
var verboseOption = new Option<bool>("--verbose", "Enable verbose logging");
verboseOption.AddAlias("-V");

var rootCommand = new RootCommand("My CLI");
rootCommand.AddGlobalOption(verboseOption); // Available to all subcommands

var serveCommand = new Command("serve", "Start the server");
serveCommand.SetHandler((bool verbose) =>
{
    if (verbose) Console.WriteLine("Verbose mode enabled");
    Console.WriteLine("Starting server...");
}, verboseOption);

rootCommand.AddCommand(serveCommand);

// Usage: myapp serve --verbose
// Usage: myapp --verbose serve   (global options work before or after subcommand)
```

## Hosting Integration
Integrate System.CommandLine with the .NET Generic Host for DI, configuration, and logging.

```csharp
using System.CommandLine;
using System.CommandLine.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var rootCommand = new RootCommand("CLI with hosting");

var nameOption = new Option<string>("--name", "User name") { IsRequired = true };
rootCommand.AddOption(nameOption);

rootCommand.SetHandler(async (IHost host) =>
{
    var greeter = host.Services.GetRequiredService<GreeterService>();
    var parseResult = host.Services.GetRequiredService<ParseResult>();
    var name = parseResult.GetValueForOption(nameOption)!;
    await greeter.GreetAsync(name);
});

var builder = new CommandLineBuilder(rootCommand)
    .UseHost(hostBuilder =>
    {
        hostBuilder.ConfigureServices(services =>
        {
            services.AddTransient<GreeterService>();
        });
        hostBuilder.ConfigureLogging(logging =>
        {
            logging.AddConsole();
            logging.SetMinimumLevel(LogLevel.Information);
        });
    })
    .UseDefaults();

return await builder.Build().InvokeAsync(args);

public class GreeterService(ILogger<GreeterService> logger)
{
    public Task GreetAsync(string name)
    {
        logger.LogInformation("Greeting user: {Name}", name);
        Console.WriteLine($"Hello, {name}!");
        return Task.CompletedTask;
    }
}
```

## Middleware
```csharp
var builder = new CommandLineBuilder(rootCommand)
    .UseDefaults()
    .AddMiddleware(async (context, next) =>
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        Console.WriteLine($"Executing: {context.ParseResult.CommandResult.Command.Name}");

        await next(context);

        sw.Stop();
        Console.WriteLine($"Completed in {sw.ElapsedMilliseconds}ms");
    });

var parser = builder.Build();
return await parser.InvokeAsync(args);
```

## File and Directory Arguments
```csharp
var inputFile = new Argument<FileInfo>("input", "Input file path");
var outputDir = new Option<DirectoryInfo>(
    "--output-dir", () => new DirectoryInfo("."), "Output directory");

var convertCommand = new Command("convert", "Convert a file");
convertCommand.AddArgument(inputFile);
convertCommand.AddOption(outputDir);

convertCommand.SetHandler((FileInfo input, DirectoryInfo outDir) =>
{
    if (!input.Exists)
    {
        Console.Error.WriteLine($"File not found: {input.FullName}");
        return;
    }
    Console.WriteLine($"Converting {input.Name} to {outDir.FullName}");
}, inputFile, outputDir);
```

## Creating a dotnet Tool
```xml
<!-- .csproj file -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <PackAsTool>true</PackAsTool>
    <ToolCommandName>mytool</ToolCommandName>
    <PackageId>MyOrg.MyTool</PackageId>
    <Version>1.0.0</Version>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="System.CommandLine" Version="2.0.0-beta4.*" />
  </ItemGroup>
</Project>
```

```bash
# Pack and install locally
dotnet pack
dotnet tool install --global --add-source ./nupkg MyOrg.MyTool

# Usage
mytool build -c Release
mytool test unit --filter "Priority=1"
```

## Best Practices
- Use `RootCommand` with descriptive text as the entry point and organize functionality into `Command` subcommands rather than overloading the root with many options.
- Add both long (`--configuration`) and short (`-c`) aliases for frequently used options to reduce typing in interactive use while keeping discoverability for scripts.
- Use `Option<T>` with strongly-typed generics (`Option<int>`, `Option<FileInfo>`, `Option<Verbosity>`) instead of `Option<string>` with manual parsing to get automatic validation and help text.
- Set `IsRequired = true` on mandatory options and provide `getDefaultValue` factories on optional ones so the help text accurately reflects what is required vs. optional.
- Use `AddValidator` for custom validation rules (port ranges, file existence, format checks) to provide clear error messages before the handler runs.
- Use `FromAmong` to restrict string options to a fixed set of allowed values (e.g., environments, log levels) with automatic validation and tab completion.
- Integrate with `System.CommandLine.Hosting` for applications that need dependency injection, `IConfiguration`, or `ILogger` rather than constructing services manually in handlers.
- Add `AddGlobalOption` for cross-cutting options like `--verbose`, `--output-format`, or `--no-color` that apply to all subcommands without repeating them.
- Set `<PackAsTool>true</PackAsTool>` in the .csproj to distribute the CLI as a `dotnet tool` that users install with `dotnet tool install`.
- Use `CommandLineBuilder.UseDefaults()` to enable automatic help (`--help`), version (`--version`), parse error reporting, and suggest-typo features without manual configuration.
