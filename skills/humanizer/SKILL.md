---
description: Guidance for Humanizer usage.
metadata:
  displayName: Humanizer
---

# Humanizer

## Overview
Use Humanizer to format dates, times, and numbers for user-friendly output.

## Example
```csharp
using Humanizer;

var released = DateTimeOffset.Parse("2024-12-03");
var since = DateTimeOffset.Now - released;

Console.WriteLine($"Released {since.Humanize()} ago");
```

## Guidance
- Keep Humanizer usage at presentation boundaries.
- Avoid using humanized strings for logic or storage.
