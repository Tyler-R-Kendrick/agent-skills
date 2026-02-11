---
title: "Store secrets (API keys, client secrets, signing keys) in a..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: authentication, dev, backend, authentication-design, authorization-models, oauth-20-flows
---

## Store secrets (API keys, client secrets, signing keys) in a...

Store secrets (API keys, client secrets, signing keys) in a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault), never in code or environment variables in plain text.
