---
title: "Wrap storage operations in retry logic using Polly or..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Wrap storage operations in retry logic using Polly or...

Wrap storage operations in retry logic using Polly or `Microsoft.Extensions.Resilience` to handle transient network failures when communicating with cloud storage.
