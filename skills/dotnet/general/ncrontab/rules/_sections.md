# NCrontab Rules

Best practices and rules for NCrontab.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use UTC times consistently | HIGH | [`ncrontab-use-utc-times-consistently.md`](ncrontab-use-utc-times-consistently.md) |
| 2 | Parse cron expressions once and reuse the `CrontabSchedule` instance | MEDIUM | [`ncrontab-parse-cron-expressions-once-and-reuse-the-crontabschedule.md`](ncrontab-parse-cron-expressions-once-and-reuse-the-crontabschedule.md) |
| 3 | Validate cron expressions at application startup or configuration save time | HIGH | [`ncrontab-validate-cron-expressions-at-application-startup-or.md`](ncrontab-validate-cron-expressions-at-application-startup-or.md) |
| 4 | Use the six-field format with `IncludingSeconds = true` | MEDIUM | [`ncrontab-use-the-six-field-format-with-includingseconds-true.md`](ncrontab-use-the-six-field-format-with-includingseconds-true.md) |
| 5 | Document cron patterns in configuration | MEDIUM | [`ncrontab-document-cron-patterns-in-configuration.md`](ncrontab-document-cron-patterns-in-configuration.md) |
| 6 | Account for task execution time | MEDIUM | [`ncrontab-account-for-task-execution-time.md`](ncrontab-account-for-task-execution-time.md) |
| 7 | Handle the gap between calculated delay and actual wake time | MEDIUM | [`ncrontab-handle-the-gap-between-calculated-delay-and-actual-wake-time.md`](ncrontab-handle-the-gap-between-calculated-delay-and-actual-wake-time.md) |
| 8 | Use `GetNextOccurrences` to display upcoming schedules | MEDIUM | [`ncrontab-use-getnextoccurrences-to-display-upcoming-schedules.md`](ncrontab-use-getnextoccurrences-to-display-upcoming-schedules.md) |
| 9 | Combine NCrontab with `BackgroundService` | LOW | [`ncrontab-combine-ncrontab-with-backgroundservice.md`](ncrontab-combine-ncrontab-with-backgroundservice.md) |
| 10 | Test cron schedules across time boundaries | MEDIUM | [`ncrontab-test-cron-schedules-across-time-boundaries.md`](ncrontab-test-cron-schedules-across-time-boundaries.md) |
