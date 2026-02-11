# Spectre.Console

## Overview
Spectre.Console is a .NET library for building beautiful, modern console applications with rich text rendering, tables, trees, progress bars, interactive prompts, and live-updating displays. It also provides `Spectre.Console.Cli`, a command framework for building structured CLI applications with dependency injection, type-safe settings, and automatic help generation.

## NuGet Packages
```bash
dotnet add package Spectre.Console
dotnet add package Spectre.Console.Cli        # Command-line framework
dotnet add package Spectre.Console.Analyzer   # Roslyn analyzers for best practices
```

## Markup and Styled Text
```csharp
using Spectre.Console;

// Basic markup
AnsiConsole.MarkupLine("[bold green]Success![/] The operation completed.");
AnsiConsole.MarkupLine("[red]Error:[/] File [underline]config.json[/] not found.");
AnsiConsole.MarkupLine("[dim italic]This is dimmed italic text[/]");

// Colored text with RGB
AnsiConsole.MarkupLine("[rgb(255,165,0)]Orange text[/]");
AnsiConsole.MarkupLine("[#FF5733]Hex color[/]");

// Escape markup characters
var userInput = "User said [hello]";
AnsiConsole.MarkupLine($"Message: {userInput.EscapeMarkup()}");

// Figlet text (large ASCII art)
AnsiConsole.Write(new FigletText("My App")
    .Centered()
    .Color(Color.Aqua));

// Rules (horizontal separators)
AnsiConsole.Write(new Rule("[yellow]Configuration[/]").RuleStyle("grey"));
```

## Tables
```csharp
using Spectre.Console;

var table = new Table()
    .Title("[bold underline]Server Status[/]")
    .Border(TableBorder.Rounded)
    .BorderColor(Color.Grey);

table.AddColumn(new TableColumn("[bold]Service[/]").Centered());
table.AddColumn(new TableColumn("[bold]Status[/]").Centered());
table.AddColumn(new TableColumn("[bold]Uptime[/]").RightAligned());
table.AddColumn(new TableColumn("[bold]CPU[/]").RightAligned());

table.AddRow("API Gateway", "[green]Running[/]", "14d 3h", "12%");
table.AddRow("Auth Service", "[green]Running[/]", "14d 3h", "8%");
table.AddRow("Worker", "[yellow]Degraded[/]", "2d 1h", "87%");
table.AddRow("Cache", "[red]Down[/]", "0h 0m", "0%");

AnsiConsole.Write(table);

// Nested tables
var outerTable = new Table().AddColumn("Details");
var innerTable = new Table()
    .AddColumn("Key")
    .AddColumn("Value")
    .AddRow("Version", "2.1.0")
    .AddRow("Environment", "Production");

outerTable.AddRow(innerTable);
AnsiConsole.Write(outerTable);
```

## Trees
```csharp
using Spectre.Console;

var root = new Tree("[bold yellow]Solution[/]");

var srcNode = root.AddNode("[blue]src/[/]");
var apiNode = srcNode.AddNode("[blue]MyApp.Api/[/]");
apiNode.AddNode("Program.cs");
apiNode.AddNode("Startup.cs");
apiNode.AddNode("[dim]appsettings.json[/]");

var domainNode = srcNode.AddNode("[blue]MyApp.Domain/[/]");
domainNode.AddNode("Entities/");
domainNode.AddNode("Services/");

var testNode = root.AddNode("[blue]tests/[/]");
testNode.AddNode("MyApp.Tests/");

AnsiConsole.Write(root);
```

## Progress Bars
```csharp
using Spectre.Console;

await AnsiConsole.Progress()
    .AutoClear(false)
    .Columns(new ProgressColumn[]
    {
        new TaskDescriptionColumn(),
        new ProgressBarColumn(),
        new PercentageColumn(),
        new RemainingTimeColumn(),
        new SpinnerColumn()
    })
    .StartAsync(async ctx =>
    {
        var downloadTask = ctx.AddTask("[green]Downloading packages[/]", maxValue: 100);
        var buildTask = ctx.AddTask("[blue]Building project[/]", maxValue: 100);
        var testTask = ctx.AddTask("[yellow]Running tests[/]", maxValue: 100);

        while (!ctx.IsFinished)
        {
            await Task.Delay(50);

            if (!downloadTask.IsFinished)
                downloadTask.Increment(2.5);
            else if (!buildTask.IsFinished)
                buildTask.Increment(1.8);
            else if (!testTask.IsFinished)
                testTask.Increment(3.0);
        }
    });
```

## Status Spinner
```csharp
using Spectre.Console;

await AnsiConsole.Status()
    .Spinner(Spinner.Known.Dots)
    .SpinnerStyle(Style.Parse("green bold"))
    .StartAsync("Connecting to database...", async ctx =>
    {
        await Task.Delay(1000);
        ctx.Status("Running migrations...");
        ctx.Spinner(Spinner.Known.Star);
        await Task.Delay(2000);
        ctx.Status("Seeding data...");
        await Task.Delay(1500);
    });

AnsiConsole.MarkupLine("[green]Done![/]");
```

## Interactive Prompts
```csharp
using Spectre.Console;

// Text input
var name = AnsiConsole.Ask<string>("What is your [green]name[/]?");

// Text with default value
var city = AnsiConsole.Ask("What [green]city[/] do you live in?", "Seattle");

// Password / secret input
var password = AnsiConsole.Prompt(
    new TextPrompt<string>("Enter [red]password[/]:")
        .Secret()
        .Validate(p => p.Length >= 8
            ? ValidationResult.Success()
            : ValidationResult.Error("Password must be at least 8 characters")));

// Confirmation
var proceed = AnsiConsole.Confirm("Deploy to [red]production[/]?", defaultValue: false);

// Single selection
var framework = AnsiConsole.Prompt(
    new SelectionPrompt<string>()
        .Title("Select a [green]framework[/]:")
        .PageSize(10)
        .AddChoiceGroup("Frontend", "React", "Vue", "Angular")
        .AddChoiceGroup("Backend", "ASP.NET Core", "FastAPI", "Express"));

// Multi-selection
var features = AnsiConsole.Prompt(
    new MultiSelectionPrompt<string>()
        .Title("Select [green]features[/] to enable:")
        .Required()
        .InstructionsText("[grey](Press [blue]<space>[/] to toggle, [green]<enter>[/] to accept)[/]")
        .AddChoices("Authentication", "Caching", "Rate Limiting",
                     "Logging", "Health Checks", "Swagger"));

Console.WriteLine($"Selected: {string.Join(", ", features)}");
```

## Live Display
Update the terminal in real time with live rendering.

```csharp
using Spectre.Console;

var table = new Table().AddColumn("Time").AddColumn("Event");

await AnsiConsole.Live(table)
    .AutoClear(false)
    .Overflow(VerticalOverflow.Ellipsis)
    .StartAsync(async ctx =>
    {
        for (int i = 0; i < 10; i++)
        {
            await Task.Delay(500);
            table.AddRow(
                DateTime.Now.ToString("HH:mm:ss"),
                $"[green]Event {i + 1}[/] processed successfully");
            ctx.Refresh();
        }
    });
```

## Panels and Layout
```csharp
using Spectre.Console;

var panel = new Panel(
    new Markup("[bold]Application Status[/]\n\nAll systems operational."))
{
    Header = new PanelHeader("[green] Dashboard [/]"),
    Border = BoxBorder.Rounded,
    Padding = new Padding(2, 1),
    BorderStyle = new Style(Color.Green)
};

AnsiConsole.Write(panel);

// Bar chart
var chart = new BarChart()
    .Label("[bold underline]Request Count by Endpoint[/]")
    .CenterLabel()
    .AddItem("GET /api/users", 1200, Color.Green)
    .AddItem("POST /api/orders", 850, Color.Blue)
    .AddItem("GET /api/products", 2100, Color.Yellow)
    .AddItem("DELETE /api/sessions", 340, Color.Red);

AnsiConsole.Write(chart);
```

## Exception Formatting
```csharp
using Spectre.Console;

try
{
    throw new InvalidOperationException("Database connection failed",
        new TimeoutException("Connection timed out after 30 seconds"));
}
catch (Exception ex)
{
    AnsiConsole.WriteException(ex, new ExceptionSettings
    {
        Format = ExceptionFormats.ShortenEverything | ExceptionFormats.ShowLinks,
        Style = new ExceptionStyle
        {
            Message = new Style(Color.Red),
            Exception = new Style(Color.Grey),
            Method = new Style(Color.Yellow),
            Path = new Style(Color.Blue)
        }
    });
}
```

## Spectre.Console.Cli (Command Framework)
Build structured CLI applications with typed settings and dependency injection.

```csharp
using Spectre.Console;
using Spectre.Console.Cli;
using System.ComponentModel;

var app = new CommandApp();

app.Configure(config =>
{
    config.AddCommand<DeployCommand>("deploy")
        .WithDescription("Deploy the application")
        .WithExample("deploy", "--environment", "staging", "--verbose");

    config.AddBranch("db", db =>
    {
        db.AddCommand<MigrateCommand>("migrate")
            .WithDescription("Run database migrations");
        db.AddCommand<SeedCommand>("seed")
            .WithDescription("Seed the database");
    });
});

return app.Run(args);

public class DeploySettings : CommandSettings
{
    [CommandOption("-e|--environment")]
    [Description("Target environment")]
    [DefaultValue("staging")]
    public string Environment { get; init; } = "staging";

    [CommandOption("-v|--verbose")]
    [Description("Enable verbose output")]
    public bool Verbose { get; init; }

    [CommandOption("--dry-run")]
    [Description("Simulate deployment without making changes")]
    public bool DryRun { get; init; }

    public override ValidationResult Validate()
    {
        var validEnvs = new[] { "development", "staging", "production" };
        if (!validEnvs.Contains(Environment.ToLower()))
            return ValidationResult.Error($"Invalid environment: {Environment}");
        return ValidationResult.Success();
    }
}

public class DeployCommand : AsyncCommand<DeploySettings>
{
    public override async Task<int> ExecuteAsync(CommandContext context, DeploySettings settings)
    {
        if (settings.Environment == "production" && !settings.DryRun)
        {
            if (!AnsiConsole.Confirm("[red]Deploy to PRODUCTION?[/]", defaultValue: false))
                return 1;
        }

        await AnsiConsole.Status()
            .StartAsync($"Deploying to {settings.Environment}...", async ctx =>
            {
                ctx.Status("Building artifacts...");
                await Task.Delay(2000);
                ctx.Status("Uploading...");
                await Task.Delay(1500);
                ctx.Status("Verifying...");
                await Task.Delay(1000);
            });

        AnsiConsole.MarkupLine($"[green]Deployed to {settings.Environment}![/]");
        return 0;
    }
}
```

## Best Practices
- Use `AnsiConsole.MarkupLine` with Spectre markup tags (`[green]`, `[bold]`, `[underline]`) instead of `Console.Write` with ANSI escape codes for portable colorized output that degrades gracefully on terminals without color support.
- Call `.EscapeMarkup()` on any user-provided strings before interpolating them into markup templates to prevent markup injection (e.g., user input containing `[red]` would break rendering).
- Use `SelectionPrompt<T>` and `MultiSelectionPrompt<T>` for interactive selection rather than asking users to type values manually, which reduces input errors and improves UX.
- Use `AnsiConsole.Status()` with a spinner for short operations (under 10 seconds) and `AnsiConsole.Progress()` with named tasks for longer operations where users need to see which step is running.
- Override `Validate()` on `CommandSettings` subclasses to enforce business rules (e.g., environment must be one of development/staging/production) with clear error messages before command execution.
- Use `config.AddBranch` in `Spectre.Console.Cli` to group related subcommands (e.g., `db migrate`, `db seed`) rather than prefixing command names manually.
- Set `AutoClear(false)` on `Progress` and `Live` renderers when the final output should remain visible after completion, rather than being cleared from the terminal.
- Use `Table.Border(TableBorder.Rounded)` with `BorderColor(Color.Grey)` for a polished look; avoid `TableBorder.None` unless the data is already visually structured.
- Add the `Spectre.Console.Analyzer` NuGet package to get compile-time warnings for common mistakes like unescaped markup and incorrect color names.
- Use `new ExceptionSettings { Format = ExceptionFormats.ShortenEverything }` when displaying exceptions to users to reduce noise, and include `ExceptionFormats.ShowLinks` in development to get clickable file paths in supported terminals.
