---
title: "Store connection strings and secrets in `local"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Store connection strings and secrets in `local

Store connection strings and secrets in `local.settings.json` for local development and in Azure Application Settings (or Key Vault references) for production; never commit `local.settings.json` to source control.
