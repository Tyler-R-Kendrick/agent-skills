---
title: "Use `Metadata` on Payment Intents, Customers, and Subscriptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Use `Metadata` on Payment Intents, Customers, and Subscriptions

Use `Metadata` on Payment Intents, Customers, and Subscriptions: to store your application's identifiers (order IDs, user IDs, plan names) so that webhook handlers can correlate Stripe events back to your domain objects without additional database lookups.
