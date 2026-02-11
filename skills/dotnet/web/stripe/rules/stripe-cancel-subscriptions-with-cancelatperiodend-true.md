---
title: "Cancel subscriptions with `CancelAtPeriodEnd = true`"
impact: MEDIUM
impactDescription: "general best practice"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Cancel subscriptions with `CancelAtPeriodEnd = true`

Cancel subscriptions with `CancelAtPeriodEnd = true`: rather than immediate cancellation, so that customers retain access until the end of their billing period and can reactivate without creating a new subscription.
