---
title: "Build the `MarkdownPipeline` once and reuse it"
impact: MEDIUM
impactDescription: "general best practice"
tags: mardig, dotnet, general, converting-markdown-to-html, building-custom-markdown-pipelines, parsing-markdown-ast
---

## Build the `MarkdownPipeline` once and reuse it

Build the `MarkdownPipeline` once and reuse it: across all conversions -- the builder pattern is designed for single-build, many-render usage.
