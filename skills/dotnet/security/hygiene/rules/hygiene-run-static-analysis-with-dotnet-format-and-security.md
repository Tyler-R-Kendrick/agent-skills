---
title: "Run static analysis with `dotnet format` and security analyzers"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Run static analysis with `dotnet format` and security analyzers

Run static analysis with `dotnet format` and security analyzers: enable Roslyn security analyzers (`Microsoft.CodeAnalysis.NetAnalyzers`) to catch insecure patterns like string concatenation in SQL at compile time.
