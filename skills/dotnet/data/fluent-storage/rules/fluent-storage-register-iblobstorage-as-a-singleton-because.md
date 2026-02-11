---
title: "Register `IBlobStorage` as a singleton because..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-storage, dotnet, data, unified-cloud-storage-abstraction-across-azure-blob-storage, aws-s3, google-cloud-storage
---

## Register `IBlobStorage` as a singleton because...

Register `IBlobStorage` as a singleton because FluentStorage provider instances are designed to be reused and maintain internal connection pooling.
