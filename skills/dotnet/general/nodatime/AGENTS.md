# NodaTime

## Overview
NodaTime is a better date and time API for .NET, providing clear semantics and time zone support.

## Example
```csharp
using NodaTime;

// Current time
Instant now = SystemClock.Instance.GetCurrentInstant();

// Time zones
DateTimeZone newYork = DateTimeZoneProviders.Tzdb["America/New_York"];
ZonedDateTime nyTime = now.InZone(newYork);

// Local dates
LocalDate today = LocalDate.FromDateTime(DateTime.Today);
LocalDate tomorrow = today.PlusDays(1);

// Periods
Period age = Period.Between(birthDate, today);
```

## Best Practices
- Use Instant for universal time
- Use LocalDateTime for local time without zone
- Use ZonedDateTime when zone matters
- Avoid DateTime for new code
- Store UTC in databases
