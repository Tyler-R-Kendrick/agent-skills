# NCrontab

## Overview

NCrontab is a lightweight library for parsing cron expressions and calculating occurrence times in .NET. It implements standard five-field cron syntax (minute, hour, day-of-month, month, day-of-week) and an extended six-field format that adds seconds. NCrontab does not execute tasks itself -- it purely handles cron parsing and schedule calculation, making it ideal for use in custom schedulers, worker services, or any code that needs to compute "when does this cron expression next fire?"

NCrontab is a dependency-free library that works with all .NET versions including .NET Core, .NET 5+, and .NET Framework.

Install via NuGet:
```
dotnet add package NCrontab
```

## Parsing Cron Expressions

Parse a cron expression string into a `CrontabSchedule` object for occurrence calculation.

```csharp
using NCrontab;

// Standard five-field format: minute hour day-of-month month day-of-week
var daily = CrontabSchedule.Parse("0 0 * * *");       // Every day at midnight
var hourly = CrontabSchedule.Parse("0 * * * *");      // Every hour on the hour
var weekdays = CrontabSchedule.Parse("30 9 * * 1-5");  // 9:30 AM weekdays
var quarterly = CrontabSchedule.Parse("0 0 1 1,4,7,10 *"); // First day of each quarter

// Six-field format with seconds
var options = new CrontabSchedule.ParseOptions { IncludingSeconds = true };
var everyTenSeconds = CrontabSchedule.Parse("*/10 * * * * *", options);
var atMidnight = CrontabSchedule.Parse("0 0 0 * * *", options);

Console.WriteLine($"Next daily: {daily.GetNextOccurrence(DateTime.Now)}");
Console.WriteLine($"Next hourly: {hourly.GetNextOccurrence(DateTime.Now)}");
```

## Calculating Occurrences

Get the next occurrence, or enumerate multiple future occurrences within a time range.

```csharp
using System;
using System.Linq;
using NCrontab;

var schedule = CrontabSchedule.Parse("0 9 * * 1"); // Every Monday at 9 AM

// Next single occurrence
var now = DateTime.Now;
var nextOccurrence = schedule.GetNextOccurrence(now);
Console.WriteLine($"Next Monday 9 AM: {nextOccurrence:yyyy-MM-dd HH:mm}");

// Multiple occurrences in a range
var startDate = new DateTime(2025, 1, 1);
var endDate = new DateTime(2025, 3, 31);
var occurrences = schedule.GetNextOccurrences(startDate, endDate).ToList();

Console.WriteLine($"Mondays at 9 AM in Q1 2025: {occurrences.Count}");
foreach (var occurrence in occurrences.Take(5))
{
    Console.WriteLine($"  {occurrence:yyyy-MM-dd dddd HH:mm}");
}

// Calculate time until next occurrence
var timeUntilNext = nextOccurrence - now;
Console.WriteLine($"Time until next: {timeUntilNext.TotalHours:F1} hours");
```

## Validating Cron Expressions

Validate user-provided cron expressions before storing them in configuration.

```csharp
using NCrontab;

public static class CronValidator
{
    public static (bool IsValid, string? Error) Validate(
        string expression, bool includeSeconds = false)
    {
        try
        {
            var options = new CrontabSchedule.ParseOptions
            {
                IncludingSeconds = includeSeconds
            };
            var schedule = CrontabSchedule.Parse(expression, options);

            // Verify it produces at least one occurrence
            var next = schedule.GetNextOccurrence(DateTime.UtcNow);
            if (next == default)
            {
                return (false, "Expression produces no future occurrences");
            }

            return (true, null);
        }
        catch (CrontabException ex)
        {
            return (false, ex.Message);
        }
    }

    public static string Describe(string expression)
    {
        var parts = expression.Split(' ');
        if (parts.Length < 5) return "Invalid expression";

        return parts switch
        {
            ["0", "0", "*", "*", "*"] => "Daily at midnight",
            ["0", "*", "*", "*", "*"] => "Every hour",
            ["*/5", "*", "*", "*", "*"] => "Every 5 minutes",
            _ => $"Custom schedule ({expression})"
        };
    }
}

// Usage
var (valid, error) = CronValidator.Validate("0 0 * * *");
Console.WriteLine($"Valid: {valid}"); // true

var (valid2, error2) = CronValidator.Validate("0 0 30 2 *");
Console.WriteLine($"Valid: {valid2}"); // true (Feb 30 never fires but parses)

var (valid3, error3) = CronValidator.Validate("invalid");
Console.WriteLine($"Valid: {valid3}, Error: {error3}"); // false
```

## Integrating with BackgroundService

Use NCrontab in a `BackgroundService` to run tasks on a cron schedule.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NCrontab;

public class CronScheduledWorker : BackgroundService
{
    private readonly ILogger<CronScheduledWorker> _logger;
    private readonly CrontabSchedule _schedule;

    public CronScheduledWorker(ILogger<CronScheduledWorker> logger)
    {
        _logger = logger;
        // Run every day at 2:30 AM
        _schedule = CrontabSchedule.Parse("30 2 * * *");
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.UtcNow;
            var nextRun = _schedule.GetNextOccurrence(now);
            var delay = nextRun - now;

            _logger.LogInformation(
                "Next scheduled run at {NextRun} (in {Delay})",
                nextRun, delay);

            await Task.Delay(delay, stoppingToken);

            if (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Executing scheduled task");
                    await ExecuteScheduledTaskAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Scheduled task failed");
                }
            }
        }
    }

    private async Task ExecuteScheduledTaskAsync(CancellationToken token)
    {
        // Task logic here
        await Task.CompletedTask;
    }
}
```

## Configurable Multi-Schedule Service

Support multiple cron schedules loaded from configuration.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using NCrontab;

public record ScheduledJob(string Name, string CronExpression, Func<CancellationToken, Task> Action);

public class CronScheduleRegistry
{
    private readonly List<(ScheduledJob Job, CrontabSchedule Schedule)> _jobs = new();

    public void Register(ScheduledJob job)
    {
        var schedule = CrontabSchedule.Parse(job.CronExpression);
        _jobs.Add((job, schedule));
    }

    public IReadOnlyList<(string Name, DateTime NextRun)> GetUpcomingRuns(DateTime from, int count)
    {
        return _jobs
            .Select(j => (j.Job.Name, NextRun: j.Schedule.GetNextOccurrence(from)))
            .OrderBy(j => j.NextRun)
            .Take(count)
            .ToList();
    }

    public (ScheduledJob Job, DateTime NextRun)? GetNextJob(DateTime from)
    {
        return _jobs
            .Select(j => (j.Job, NextRun: j.Schedule.GetNextOccurrence(from)))
            .OrderBy(j => j.NextRun)
            .Select(j => ((ScheduledJob, DateTime)?)j)
            .FirstOrDefault();
    }
}

// Usage
var registry = new CronScheduleRegistry();
registry.Register(new ScheduledJob("Cleanup", "0 3 * * *", _ => Task.CompletedTask));
registry.Register(new ScheduledJob("Report", "0 8 * * 1", _ => Task.CompletedTask));
registry.Register(new ScheduledJob("Sync", "*/15 * * * *", _ => Task.CompletedTask));

var upcoming = registry.GetUpcomingRuns(DateTime.UtcNow, 5);
foreach (var (name, nextRun) in upcoming)
{
    Console.WriteLine($"{name}: {nextRun:yyyy-MM-dd HH:mm}");
}
```

## Common Cron Patterns

| Pattern | Five-Field Expression | Description |
|---------|----------------------|-------------|
| Every minute | `* * * * *` | Runs every minute |
| Every 5 minutes | `*/5 * * * *` | Runs every 5 minutes |
| Every hour | `0 * * * *` | Top of every hour |
| Daily at midnight | `0 0 * * *` | Once per day |
| Weekdays at 9 AM | `0 9 * * 1-5` | Mon-Fri at 9:00 |
| First of month | `0 0 1 * *` | Midnight, 1st of each month |
| Every Sunday | `0 0 * * 0` | Midnight every Sunday |
| Every 30 minutes | `*/30 * * * *` | Twice per hour |
| Twice daily | `0 8,17 * * *` | 8 AM and 5 PM |
| Quarterly | `0 0 1 1,4,7,10 *` | First day of each quarter |

## Best Practices

1. **Use UTC times consistently** with `DateTime.UtcNow` for cron calculations to avoid daylight saving time issues that cause skipped or doubled executions.
2. **Parse cron expressions once and reuse the `CrontabSchedule` instance** since parsing involves string splitting and validation that should not repeat per tick.
3. **Validate cron expressions at application startup or configuration save time** rather than at execution time to fail fast on invalid patterns.
4. **Use the six-field format with `IncludingSeconds = true`** only when sub-minute precision is genuinely needed -- five-field expressions are more portable and widely understood.
5. **Document cron patterns in configuration** with comments explaining the schedule in plain English, since cron syntax is not self-documenting.
6. **Account for task execution time** when calculating the next occurrence -- if a task takes 5 minutes and runs every 5 minutes, use the task's end time as the base for `GetNextOccurrence`.
7. **Handle the gap between calculated delay and actual wake time** by re-checking the current time after `Task.Delay` returns, since the OS may wake the task slightly early or late.
8. **Use `GetNextOccurrences` to display upcoming schedules** in admin UIs so operators can verify that a cron expression produces the expected pattern.
9. **Combine NCrontab with `BackgroundService`** for simple cron-scheduled tasks, but prefer Quartz.NET or Hangfire when you need persistence, retries, or distributed coordination.
10. **Test cron schedules across time boundaries** including month-end, year-end, leap years, and DST transitions to verify occurrence calculation correctness.
