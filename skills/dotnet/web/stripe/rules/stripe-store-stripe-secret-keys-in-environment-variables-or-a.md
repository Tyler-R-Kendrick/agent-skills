---
title: "Store Stripe secret keys in environment variables or a secret manager"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Store Stripe secret keys in environment variables or a secret manager

(Azure Key Vault, AWS Secrets Manager) and never in `appsettings.json` or source code, using `builder.Configuration["Stripe:SecretKey"]` to load them at startup, because committed API keys grant full access to your Stripe account.
