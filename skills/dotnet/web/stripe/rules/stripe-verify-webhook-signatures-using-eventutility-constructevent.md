---
title: "Verify webhook signatures using `EventUtility.ConstructEvent()`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Verify webhook signatures using `EventUtility.ConstructEvent()`

Verify webhook signatures using `EventUtility.ConstructEvent()`: with your webhook signing secret before processing any event, because unsigned webhooks can be forged by attackers to mark orders as paid without actual payment.
