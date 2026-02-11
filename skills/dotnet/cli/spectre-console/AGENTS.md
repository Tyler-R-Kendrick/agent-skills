# Spectre.Console

## Overview
Spectre.Console is a library for creating beautiful, modern console applications with rich formatting, tables, progress bars, and more.

## Example
```csharp
using Spectre.Console;

// Tables
var table = new Table();
table.AddColumn("Name");
table.AddColumn("Status");
table.AddRow("Task 1", "[green]Complete[/]");
AnsiConsole.Write(table);

// Progress
await AnsiConsole.Progress()
    .StartAsync(async ctx =>
    {
        var task = ctx.AddTask("Processing");
        while (!task.IsFinished)
        {
            await DoWork();
            task.Increment(1.0);
        }
    });
```

## Features
- Rich text markup
- Tables and grids
- Progress bars
- Prompts and selections
- Tree views
- Exception formatting

## Best Practices
- Use markup for colorized output
- Leverage prompts for user input
- Show progress for long operations
- Use tables for structured data
