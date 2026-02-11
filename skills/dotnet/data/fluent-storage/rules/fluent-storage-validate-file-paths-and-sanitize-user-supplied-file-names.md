---
title: "Validate file paths and sanitize user-supplied file names..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Validate file paths and sanitize user-supplied file names...

Validate file paths and sanitize user-supplied file names before constructing blob paths to prevent directory traversal attacks and invalid characters in storage keys.
