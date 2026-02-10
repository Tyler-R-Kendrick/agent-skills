---
name: commandline-cheatsheet
description: Guidance for command-line parsing patterns and libraries in .NET. Use when building CLI applications with command-line arguments.
license: MIT
metadata:
  displayName: "CommandLine Cheatsheet"
  author: "Tyler-R-Kendrick"
---

# CommandLine Cheatsheet

## Overview
Best practices for parsing command-line arguments in .NET applications, including popular libraries and patterns.

## System.CommandLine (Modern Approach)

The modern, recommended library for CLI apps in .NET.

### Installation

```bash
dotnet add package System.CommandLine
```

### Basic Usage

```csharp
using System.CommandLine;

var rootCommand = new RootCommand("Sample CLI application");

var nameOption = new Option<string>(
    name: "--name",
    description: "The name to greet",
    getDefaultValue: () => "World");

var verboseOption = new Option<bool>(
    name: "--verbose",
    description: "Enable verbose output");

rootCommand.AddOption(nameOption);
rootCommand.AddOption(verboseOption);

rootCommand.SetHandler((string name, bool verbose) =>
{
    if (verbose)
    {
        Console.WriteLine($"Verbose mode enabled");
    }
    Console.WriteLine($"Hello, {name}!");
}, nameOption, verboseOption);

return await rootCommand.InvokeAsync(args);
```

### Subcommands

```csharp
using System.CommandLine;

var rootCommand = new RootCommand("Git-like CLI");

var initCommand = new Command("init", "Initialize a repository");
initCommand.SetHandler(() => Console.WriteLine("Initialized"));

var cloneCommand = new Command("clone", "Clone a repository");
var urlArgument = new Argument<string>("url", "Repository URL");
cloneCommand.AddArgument(urlArgument);
cloneCommand.SetHandler((string url) => 
    Console.WriteLine($"Cloning from {url}"), urlArgument);

rootCommand.AddCommand(initCommand);
rootCommand.AddCommand(cloneCommand);

return await rootCommand.InvokeAsync(args);
```

### Arguments

```csharp
using System.CommandLine;

var fileArgument = new Argument<FileInfo>(
    name: "file",
    description: "The file to process")
    .ExistingOnly();

var command = new RootCommand();
command.AddArgument(fileArgument);

command.SetHandler((FileInfo file) =>
{
    Console.WriteLine($"Processing: {file.FullName}");
}, fileArgument);
```

### Options with Aliases

```csharp
using System.CommandLine;

var verboseOption = new Option<bool>(
    aliases: new[] { "--verbose", "-v" },
    description: "Enable verbose output");

var outputOption = new Option<FileInfo>(
    aliases: new[] { "--output", "-o" },
    description: "Output file");
```

### Validation

```csharp
using System.CommandLine;
using System.CommandLine.Parsing;

var portOption = new Option<int>(
    name: "--port",
    description: "Port number");

portOption.AddValidator(result =>
{
    var port = result.GetValueForOption(portOption);
    if (port < 1 || port > 65535)
    {
        result.ErrorMessage = "Port must be between 1 and 65535";
    }
});
```

### Custom Types

```csharp
using System.CommandLine;
using System.CommandLine.Parsing;

var urlOption = new Option<Uri>(
    name: "--url",
    description: "API URL",
    parseArgument: result =>
    {
        var value = result.Tokens.Single().Value;
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri))
        {
            result.ErrorMessage = "Invalid URL";
            return null!;
        }
        return uri;
    });
```

## CommandLineParser (Alternative)

Popular alternative library.

### Installation

```bash
dotnet add package CommandLineParser
```

### Basic Usage

```csharp
using CommandLine;

public class Options
{
    [Option('v', "verbose", Required = false, HelpText = "Enable verbose output")]
    public bool Verbose { get; set; }
    
    [Option('n', "name", Required = true, HelpText = "Name to greet")]
    public string Name { get; set; }
    
    [Option('c', "count", Default = 1, HelpText = "Number of times to greet")]
    public int Count { get; set; }
}

var result = Parser.Default.ParseArguments<Options>(args)
    .WithParsed(opts =>
    {
        for (int i = 0; i < opts.Count; i++)
        {
            Console.WriteLine($"Hello, {opts.Name}!");
        }
    })
    .WithNotParsed(errors =>
    {
        Console.WriteLine("Invalid arguments");
    });
```

### Verbs (Subcommands)

```csharp
using CommandLine;

[Verb("add", HelpText = "Add a file")]
public class AddOptions
{
    [Value(0, Required = true, HelpText = "File to add")]
    public string File { get; set; }
}

[Verb("commit", HelpText = "Commit changes")]
public class CommitOptions
{
    [Option('m', "message", Required = true, HelpText = "Commit message")]
    public string Message { get; set; }
}

var result = Parser.Default.ParseArguments<AddOptions, CommitOptions>(args)
    .WithParsed<AddOptions>(opts => Console.WriteLine($"Adding {opts.File}"))
    .WithParsed<CommitOptions>(opts => Console.WriteLine($"Committing: {opts.Message}"))
    .WithNotParsed(errors => Console.WriteLine("Error"));
```

## Manual Parsing Patterns

### Simple Manual Parser

```csharp
bool verbose = false;
string? name = null;

for (int i = 0; i < args.Length; i++)
{
    switch (args[i])
    {
        case "--verbose":
        case "-v":
            verbose = true;
            break;
        
        case "--name":
        case "-n":
            if (i + 1 < args.Length)
            {
                name = args[++i];
            }
            break;
    }
}

if (name == null)
{
    Console.WriteLine("Name is required");
    return 1;
}

Console.WriteLine($"Hello, {name}!");
```

### Dictionary-Based Parser

```csharp
var options = new Dictionary<string, string?>();
var flags = new HashSet<string>();

for (int i = 0; i < args.Length; i++)
{
    if (args[i].StartsWith("--") || args[i].StartsWith("-"))
    {
        if (i + 1 < args.Length && !args[i + 1].StartsWith("-"))
        {
            options[args[i]] = args[++i];
        }
        else
        {
            flags.Add(args[i]);
        }
    }
}

var name = options.GetValueOrDefault("--name") ?? options.GetValueOrDefault("-n") ?? "World";
var verbose = flags.Contains("--verbose") || flags.Contains("-v");
```

## Environment Variables

```csharp
// Read from environment as fallback
var name = args.Length > 0 ? args[0] : Environment.GetEnvironmentVariable("APP_NAME") ?? "World";

// Or with System.CommandLine
var nameOption = new Option<string>(
    name: "--name",
    description: "Name",
    getDefaultValue: () => Environment.GetEnvironmentVariable("APP_NAME") ?? "World");
```

## Configuration File Integration

```csharp
using System.CommandLine;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

var hostOption = new Option<string>(
    name: "--host",
    getDefaultValue: () => configuration["Host"] ?? "localhost");
```

## Help Text

### System.CommandLine

```csharp
var rootCommand = new RootCommand("My application description");
var option = new Option<string>("--name", "Name description");
rootCommand.AddOption(option);

// Help is automatic: --help or -h
```

### CommandLineParser

```csharp
[Verb("process", HelpText = "Process files")]
public class ProcessOptions
{
    [Option('i', "input", Required = true, HelpText = "Input file path")]
    public string Input { get; set; }
    
    [Option('o', "output", HelpText = "Output file path (default: stdout)")]
    public string? Output { get; set; }
    
    [Usage(ApplicationAlias = "myapp")]
    public static IEnumerable<Example> Examples
    {
        get
        {
            yield return new Example("Process a file", new ProcessOptions { Input = "data.txt" });
        }
    }
}
```

## Exit Codes

```csharp
public static async Task<int> Main(string[] args)
{
    var rootCommand = new RootCommand();
    
    rootCommand.SetHandler(() =>
    {
        try
        {
            // Do work
            return 0; // Success
        }
        catch
        {
            return 1; // Error
        }
    });
    
    return await rootCommand.InvokeAsync(args);
}
```

## Middleware Pattern

```csharp
using System.CommandLine;
using System.CommandLine.Invocation;

var rootCommand = new RootCommand();

rootCommand.AddMiddleware(async (context, next) =>
{
    Console.WriteLine("Before command");
    await next(context);
    Console.WriteLine("After command");
});
```

## Practical Example: Build Tool

```csharp
using System.CommandLine;

var rootCommand = new RootCommand("Build tool");

var buildCommand = new Command("build", "Build the project");
var configOption = new Option<string>(
    aliases: new[] { "--configuration", "-c" },
    getDefaultValue: () => "Debug");
var verboseOption = new Option<bool>("--verbose");

buildCommand.AddOption(configOption);
buildCommand.AddOption(verboseOption);

buildCommand.SetHandler(async (string config, bool verbose) =>
{
    if (verbose)
    {
        Console.WriteLine($"Building in {config} mode...");
    }
    
    // Simulate build
    await Task.Delay(1000);
    
    Console.WriteLine("Build succeeded!");
}, configOption, verboseOption);

var testCommand = new Command("test", "Run tests");
testCommand.SetHandler(() => Console.WriteLine("Running tests..."));

rootCommand.AddCommand(buildCommand);
rootCommand.AddCommand(testCommand);

return await rootCommand.InvokeAsync(args);
```

## Guidance

- Prefer `System.CommandLine` for new .NET applications.
- Use `CommandLineParser` if you need attribute-based configuration.
- Support both short (`-v`) and long (`--verbose`) forms for options.
- Provide sensible defaults for optional parameters.
- Use arguments for required, positional values.
- Use options for named, often optional values.
- Validate inputs and provide clear error messages.
- Support `--help` for all commands.
- Use environment variables as fallback for configuration.
- Return appropriate exit codes (0 for success, non-zero for errors).
- Consider reading from stdin when no file argument is provided.
- Support `--version` to display application version.
- Group related options in help text.
- Use verbs/subcommands for complex CLIs (git-style).
