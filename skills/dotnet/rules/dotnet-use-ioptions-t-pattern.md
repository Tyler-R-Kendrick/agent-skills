---
title: "Use `IOptions<T>` pattern"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotnet, csharp, fsharp, aspnet, nuget, net-language-features, choosing-libraries-and-frameworks, project-structure
---

## Use `IOptions<T>` pattern

Use `IOptions<T>` pattern: for configuration instead of reading values directly. This provides validation, reload support, and testability: ```csharp public class SmtpOptions { public const string Section = "Smtp"; public required string Host { get; init; } public int Port { get; init; } = 587; public required string FromAddress { get; init; } }
