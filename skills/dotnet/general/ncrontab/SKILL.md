---
description: Guidance for NCrontab cron expression parser.
metadata:
  displayName: NCrontab
---

# NCrontab

## Overview
NCrontab is a library for parsing and calculating occurrences from cron expressions.

## Example
```csharp
using NCrontab;

// Parse cron expression
var schedule = CrontabSchedule.Parse("0 0 * * *");  // Daily at midnight

// Get next occurrence
var next = schedule.GetNextOccurrence(DateTime.Now);

// Get multiple occurrences
var occurrences = schedule.GetNextOccurrences(
    DateTime.Now,
    DateTime.Now.AddDays(7))
    .Take(10);

// Validate expression
try
{
    var valid = CrontabSchedule.TryParse("0 0 * * *", out var parsed);
}
catch (CrontabException ex)
{
    // Invalid expression
}
```

## Best Practices
- Validate expressions
- Use appropriate time zones
- Test edge cases
- Document cron patterns
- Consider daylight saving time
