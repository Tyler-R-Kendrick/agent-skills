---
title: "Run the writer and reader on separate tasks"
impact: MEDIUM
impactDescription: "general best practice"
tags: system-io-pipelines, dotnet, networking, high-throughput-stream-parsing, zero-copy-buffer-management, pipereaderpipewriter-patterns
---

## Run the writer and reader on separate tasks

(`Task.WhenAll(writingTask, readingTask)`) to maximize throughput by allowing concurrent I/O and parsing.
