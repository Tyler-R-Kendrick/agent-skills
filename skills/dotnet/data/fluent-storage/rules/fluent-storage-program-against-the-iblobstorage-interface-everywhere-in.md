---
title: "Program against the `IBlobStorage` interface everywhere in..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Program against the `IBlobStorage` interface everywhere in...

Program against the `IBlobStorage` interface everywhere in application code and resolve the concrete provider only at the composition root to enable easy provider switching.
