---
title: "Avoid logging sensitive values outside the structured logging pipeline"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-compliance, dotnet, general, classifying-sensitive-data-pii, euii, financial
---

## Avoid logging sensitive values outside the structured logging pipeline

Avoid logging sensitive values outside the structured logging pipeline: if you use string interpolation with `Console.WriteLine`, the redaction system is bypassed entirely.
