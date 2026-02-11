---
title: "Test that critical error paths produce the expected log entries"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Test that critical error paths produce the expected log entries

Test that critical error paths produce the expected log entries: by injecting `Microsoft.Extensions.Logging.Testing.FakeLogger` or a similar test double in unit tests.
