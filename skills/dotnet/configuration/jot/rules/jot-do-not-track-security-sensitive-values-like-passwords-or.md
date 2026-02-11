---
title: "Do not track security-sensitive values like passwords or..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: jot, dotnet, configuration, persisting-and-restoring-application-state-such-as-window-positions, user-preferences, form-values
---

## Do not track security-sensitive values like passwords or...

Do not track security-sensitive values like passwords or tokens; Jot stores data as plain JSON and is not designed for secret management.
