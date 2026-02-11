---
title: "Make webhook handlers idempotent"
impact: MEDIUM
impactDescription: "general best practice"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Make webhook handlers idempotent

Make webhook handlers idempotent: by checking whether the event has already been processed (store processed event IDs in a database) before performing side effects, because Stripe retries failed webhook deliveries and may send the same event multiple times.
