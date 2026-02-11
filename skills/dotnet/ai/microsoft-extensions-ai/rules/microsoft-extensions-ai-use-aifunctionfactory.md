---
title: "Use `AIFunctionFactory"
impact: MEDIUM
impactDescription: "general best practice"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Use `AIFunctionFactory

Use `AIFunctionFactory.Create` to wrap strongly-typed C# methods as tools with automatic schema generation from `[Description]` attributes, rather than manually defining JSON schemas.
