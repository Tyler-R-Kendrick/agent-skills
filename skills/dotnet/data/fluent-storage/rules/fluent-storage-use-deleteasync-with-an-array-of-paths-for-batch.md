---
title: "Use `DeleteAsync` with an array of paths for batch..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Use `DeleteAsync` with an array of paths for batch...

Use `DeleteAsync` with an array of paths for batch deletions rather than calling it in a loop, as providers may optimize batch operations into fewer HTTP requests.
