---
title: "Never log sensitive data"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-logging, dotnet, logging, ilogger-abstraction, loggermessage-source-generated-logging, structured-logging-with-event-ids
---

## Never log sensitive data

(passwords, tokens, PII) even at `Trace` level; use the `[LogProperties(OmitReferenceName = true)]` attribute or redact explicitly.
