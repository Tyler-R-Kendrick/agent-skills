---
title: "Batch relationship writes when provisioning resources"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Batch relationship writes when provisioning resources

Batch relationship writes when provisioning resources: when a user creates a document, set the `owner` relationship in the same transaction as the document creation to avoid permission gaps.
