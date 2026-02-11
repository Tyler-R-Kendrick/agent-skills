---
title: "Always use streaming (`OpenReadAsync` / `WriteAsync` with..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Always use streaming (`OpenReadAsync` / `WriteAsync` with...

Always use streaming (`OpenReadAsync` / `WriteAsync` with `Stream`) for files larger than a few megabytes to avoid `OutOfMemoryException` from loading entire files into byte arrays.
