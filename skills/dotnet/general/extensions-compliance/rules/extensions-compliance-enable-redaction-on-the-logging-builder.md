---
title: "Enable redaction on the logging builder"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-compliance, dotnet, general, classifying-sensitive-data-pii, euii, financial
---

## Enable redaction on the logging builder

Enable redaction on the logging builder: with `builder.Logging.EnableRedaction()` -- without this call, classification attributes are ignored and sensitive data is logged in plain text.
