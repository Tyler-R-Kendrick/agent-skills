# Command-Line Cheatsheet

## Overview
Best practices and patterns for building command-line applications in .NET.

## Libraries
- **System.CommandLine**: Modern, typed argument parsing
- **CommandLineParser**: Attribute-based parsing
- **Spectre.Console.Cli**: Command-based CLI framework

## Example with System.CommandLine
```csharp
var rootCommand = new RootCommand("My CLI tool");

var nameOption = new Option<string>(
    "--name",
    "Your name");
rootCommand.AddOption(nameOption);

rootCommand.SetHandler((string name) =>
{
    Console.WriteLine($"Hello {name}!");
}, nameOption);

await rootCommand.InvokeAsync(args);
```

## Best Practices
- Provide clear help text
- Support standard conventions (--help, --version)
- Validate input early
- Use verbs for sub-commands
- Support both short (-n) and long (--name) options
