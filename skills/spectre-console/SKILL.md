---
name: spectre-console
description: Guidance for using Spectre.Console library for beautiful terminal UIs in C#. Use when building CLI applications with rich formatting.
license: MIT
metadata:
  displayName: "Spectre.Console"
  author: "Tyler-R-Kendrick"
---

# Spectre.Console

## Overview
Spectre.Console is a library for creating beautiful, cross-platform console applications with rich formatting, tables, progress bars, and interactive prompts.

Package: `Spectre.Console`

## Installation

```bash
dotnet add package Spectre.Console
```

## Basic Output

```csharp
using Spectre.Console;

// Simple text
AnsiConsole.WriteLine("Hello, World!");

// Markup
AnsiConsole.Markup("[red]Red text[/]");
AnsiConsole.MarkupLine("[bold yellow]Bold yellow text[/]");

// Styled text
AnsiConsole.Write(new Markup("[underline green]Underlined green[/]"));
```

## Colors and Styles

```csharp
using Spectre.Console;

// Foreground colors
AnsiConsole.MarkupLine("[red]Red[/] [green]Green[/] [blue]Blue[/]");

// Background colors
AnsiConsole.MarkupLine("[black on white]Black on white[/]");

// Styles
AnsiConsole.MarkupLine("[bold]Bold[/] [italic]Italic[/] [underline]Underline[/]");

// Combined
AnsiConsole.MarkupLine("[bold yellow on blue]Bold yellow on blue[/]");
```

## Rules and Panels

```csharp
using Spectre.Console;

// Horizontal rule
AnsiConsole.Write(new Rule("[yellow]Section Title[/]"));

// Panel
var panel = new Panel("Panel content")
{
    Header = new PanelHeader("Panel Header"),
    Border = BoxBorder.Rounded
};
AnsiConsole.Write(panel);

// Nested panels
var inner = new Panel("Inner content");
var outer = new Panel(inner) { Header = new PanelHeader("Outer") };
AnsiConsole.Write(outer);
```

## Tables

```csharp
using Spectre.Console;

var table = new Table();

// Add columns
table.AddColumn("Name");
table.AddColumn(new TableColumn("Age").Centered());
table.AddColumn(new TableColumn("City").RightAligned());

// Add rows
table.AddRow("John", "30", "New York");
table.AddRow("Jane", "25", "London");
table.AddRow("[bold]Bob[/]", "35", "Paris");

// Customize
table.Border(TableBorder.Rounded);
table.BorderColor(Color.Blue);

AnsiConsole.Write(table);
```

## Trees

```csharp
using Spectre.Console;

var root = new Tree("Root");

var child1 = root.AddNode("[yellow]Child 1[/]");
child1.AddNode("Grandchild 1");
child1.AddNode("Grandchild 2");

var child2 = root.AddNode("[green]Child 2[/]");
child2.AddNode("Grandchild 3");

AnsiConsole.Write(root);
```

## Progress Bars

```csharp
using Spectre.Console;

await AnsiConsole.Progress()
    .StartAsync(async ctx =>
    {
        var task1 = ctx.AddTask("[green]Task 1[/]");
        var task2 = ctx.AddTask("[blue]Task 2[/]");
        
        while (!ctx.IsFinished)
        {
            await Task.Delay(100);
            task1.Increment(1.5);
            task2.Increment(0.5);
        }
    });
```

## Status Spinner

```csharp
using Spectre.Console;

await AnsiConsole.Status()
    .StartAsync("Processing...", async ctx =>
    {
        ctx.Spinner(Spinner.Known.Star);
        ctx.SpinnerStyle(Style.Parse("green"));
        
        await Task.Delay(3000);
        
        ctx.Status("Almost done...");
        await Task.Delay(2000);
    });
```

## Prompts

### Text Prompt

```csharp
using Spectre.Console;

var name = AnsiConsole.Ask<string>("What's your [green]name[/]?");

var age = AnsiConsole.Prompt(
    new TextPrompt<int>("What's your [blue]age[/]?")
        .ValidationErrorMessage("[red]Please enter a valid age[/]")
        .Validate(age => age switch
        {
            < 0 => ValidationResult.Error("[red]Age must be positive[/]"),
            > 150 => ValidationResult.Error("[red]Age must be realistic[/]"),
            _ => ValidationResult.Success()
        }));
```

### Confirm Prompt

```csharp
using Spectre.Console;

var confirmed = AnsiConsole.Confirm("Do you want to continue?");

if (confirmed)
{
    AnsiConsole.MarkupLine("[green]Continuing...[/]");
}
```

### Selection Prompt

```csharp
using Spectre.Console;

var fruit = AnsiConsole.Prompt(
    new SelectionPrompt<string>()
        .Title("What's your [green]favorite fruit[/]?")
        .PageSize(10)
        .MoreChoicesText("[grey](Move up and down to reveal more fruits)[/]")
        .AddChoices(new[] {
            "Apple", "Banana", "Orange", "Grape", "Strawberry"
        }));

AnsiConsole.MarkupLine($"You selected: [yellow]{fruit}[/]");
```

### Multi-Selection Prompt

```csharp
using Spectre.Console;

var colors = AnsiConsole.Prompt(
    new MultiSelectionPrompt<string>()
        .Title("What are your [green]favorite colors[/]?")
        .Required()
        .PageSize(10)
        .InstructionsText("[grey](Press [blue]<space>[/] to toggle, [green]<enter>[/] to accept)[/]")
        .AddChoices(new[] {
            "Red", "Green", "Blue", "Yellow", "Purple"
        }));

AnsiConsole.MarkupLine($"Selected: [yellow]{string.Join(", ", colors)}[/]");
```

## Live Display

```csharp
using Spectre.Console;

await AnsiConsole.Live(new Panel("Loading..."))
    .StartAsync(async ctx =>
    {
        for (int i = 0; i <= 100; i += 10)
        {
            ctx.UpdateTarget(new Panel($"Progress: {i}%"));
            await Task.Delay(500);
        }
    });
```

## Layout

```csharp
using Spectre.Console;

var layout = new Layout("Root")
    .SplitColumns(
        new Layout("Left"),
        new Layout("Right")
            .SplitRows(
                new Layout("Top"),
                new Layout("Bottom")));

layout["Left"].Update(new Panel("Left panel"));
layout["Top"].Update(new Panel("Top right panel"));
layout["Bottom"].Update(new Panel("Bottom right panel"));

AnsiConsole.Write(layout);
```

## Calendar

```csharp
using Spectre.Console;

var calendar = new Calendar(2024, 2);
calendar.AddCalendarEvent(2024, 2, 14);
calendar.AddCalendarEvent(2024, 2, 25);

AnsiConsole.Write(calendar);
```

## Charts

### Bar Chart

```csharp
using Spectre.Console;

var chart = new BarChart()
    .Width(60)
    .Label("[green bold]Fruit Sales[/]")
    .CenterLabel()
    .AddItem("Apples", 12, Color.Yellow)
    .AddItem("Oranges", 8, Color.Orange1)
    .AddItem("Bananas", 15, Color.Yellow);

AnsiConsole.Write(chart);
```

### Breakdown Chart

```csharp
using Spectre.Console;

var chart = new BreakdownChart()
    .Width(60)
    .AddItem("Red", 35, Color.Red)
    .AddItem("Green", 25, Color.Green)
    .AddItem("Blue", 40, Color.Blue);

AnsiConsole.Write(chart);
```

## Exception Formatting

```csharp
using Spectre.Console;

try
{
    throw new InvalidOperationException("Something went wrong!");
}
catch (Exception ex)
{
    AnsiConsole.WriteException(ex);
}
```

## Figlet Text

```csharp
using Spectre.Console;

AnsiConsole.Write(
    new FigletText("Spectre")
        .LeftAligned()
        .Color(Color.Blue));
```

## Practical Example: CLI App

```csharp
using Spectre.Console;

class Program
{
    static async Task Main(string[] args)
    {
        // Display banner
        AnsiConsole.Write(
            new FigletText("My App")
                .Centered()
                .Color(Color.Blue));
        
        AnsiConsole.Write(new Rule("[yellow]Welcome[/]").RuleStyle("grey"));
        
        // Get user input
        var name = AnsiConsole.Ask<string>("What's your [green]name[/]?");
        
        // Show menu
        var action = AnsiConsole.Prompt(
            new SelectionPrompt<string>()
                .Title($"Hello [green]{name}[/]! What would you like to do?")
                .AddChoices("Create", "List", "Delete", "Exit"));
        
        // Process with progress
        if (action != "Exit")
        {
            await AnsiConsole.Status()
                .StartAsync($"Processing {action}...", async ctx =>
                {
                    await Task.Delay(2000);
                });
            
            // Show results
            var table = new Table();
            table.AddColumn("ID");
            table.AddColumn("Name");
            table.AddColumn("Status");
            
            table.AddRow("1", "Item 1", "[green]Active[/]");
            table.AddRow("2", "Item 2", "[yellow]Pending[/]");
            
            AnsiConsole.Write(table);
        }
        
        AnsiConsole.MarkupLine("[green]Done![/]");
    }
}
```

## Guidance

- Use markup for inline styling: `[color]text[/]` or `[style]text[/]`.
- Escape markup with double brackets: `[[` and `]]`.
- Use `AnsiConsole.MarkupLine()` for text with automatic line break.
- Prefer `Table` for structured data display.
- Use `Progress` for long-running operations with multiple tasks.
- Use `Status` for single-task spinners.
- Use prompts (`Ask`, `Confirm`, `SelectionPrompt`) for user input.
- Use `Live` for continuously updating displays.
- Use `Panel` to group related content.
- Use `Tree` for hierarchical data.
- Use `Rule` to visually separate sections.
- Handle exceptions with `WriteException` for formatted stack traces.
- Test CLI apps with different terminal widths.
- Use `AnsiConsole.Console.Profile.Width` to get terminal width.
