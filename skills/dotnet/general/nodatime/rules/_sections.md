# NodaTime Rules

Best practices and rules for NodaTime.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Instant` for timestamps | MEDIUM | [`nodatime-use-instant-for-timestamps.md`](nodatime-use-instant-for-timestamps.md) |
| 2 | Use `LocalDate` for dates that have no time component | MEDIUM | [`nodatime-use-localdate-for-dates-that-have-no-time-component.md`](nodatime-use-localdate-for-dates-that-have-no-time-component.md) |
| 3 | Use `ZonedDateTime` when you need to display or reason about time in a specific zone | MEDIUM | [`nodatime-use-zoneddatetime-when-you-need-to-display-or-reason-about.md`](nodatime-use-zoneddatetime-when-you-need-to-display-or-reason-about.md) |
| 4 | Prefer IANA time zone IDs | LOW | [`nodatime-prefer-iana-time-zone-ids.md`](nodatime-prefer-iana-time-zone-ids.md) |
| 5 | Use `InZoneStrictly` during development | CRITICAL | [`nodatime-use-inzonestrictly-during-development.md`](nodatime-use-inzonestrictly-during-development.md) |
| 6 | Store `Instant` in databases and convert to `ZonedDateTime` at the presentation layer | MEDIUM | [`nodatime-store-instant-in-databases-and-convert-to-zoneddatetime-at.md`](nodatime-store-instant-in-databases-and-convert-to-zoneddatetime-at.md) |
| 7 | Use `Period` for human-calendar calculations | MEDIUM | [`nodatime-use-period-for-human-calendar-calculations.md`](nodatime-use-period-for-human-calendar-calculations.md) |
| 8 | Configure NodaTime JSON serialization | MEDIUM | [`nodatime-configure-nodatime-json-serialization.md`](nodatime-configure-nodatime-json-serialization.md) |
| 9 | Inject `IClock` instead of using `SystemClock.Instance` directly | MEDIUM | [`nodatime-inject-iclock-instead-of-using-systemclock-instance-directly.md`](nodatime-inject-iclock-instead-of-using-systemclock-instance-directly.md) |
| 10 | Update the TZDB data regularly | MEDIUM | [`nodatime-update-the-tzdb-data-regularly.md`](nodatime-update-the-tzdb-data-regularly.md) |
