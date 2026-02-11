---
title: "Call `ExistsAsync` before `OpenReadAsync` when the blob may..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Call `ExistsAsync` before `OpenReadAsync` when the blob may...

Call `ExistsAsync` before `OpenReadAsync` when the blob may not exist, or catch the appropriate exception, to provide clear error messages instead of opaque stream failures.
