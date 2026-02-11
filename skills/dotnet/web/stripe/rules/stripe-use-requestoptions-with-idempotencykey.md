---
title: "Use `RequestOptions` with `IdempotencyKey`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Use `RequestOptions` with `IdempotencyKey`

Use `RequestOptions` with `IdempotencyKey`: for payment-critical operations (creating payment intents, confirming payments, creating subscriptions) to prevent duplicate charges when retrying failed network requests, setting the key to a deterministic value derived from the order or transaction.
