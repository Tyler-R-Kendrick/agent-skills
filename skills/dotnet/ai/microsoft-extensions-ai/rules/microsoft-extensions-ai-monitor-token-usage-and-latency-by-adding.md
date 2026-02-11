---
title: "Monitor token usage and latency by adding..."
impact: MEDIUM
impactDescription: "general best practice"
tags: microsoft-extensions-ai, dotnet, ai, provider-agnostic-ai-abstractions, dependency-injected-chat-clients, embedding-generation
---

## Monitor token usage and latency by adding...

Monitor token usage and latency by adding `UseOpenTelemetry()` to the pipeline and exporting traces to your observability backend (Jaeger, Application Insights, Aspire Dashboard).
