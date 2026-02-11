---
title: "Handle `StripeException` by switching on `StripeError.Type`"
impact: MEDIUM
impactDescription: "general best practice"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Handle `StripeException` by switching on `StripeError.Type`

Handle `StripeException` by switching on `StripeError.Type`: to differentiate between card errors (show to user), invalid request errors (log and fix), rate limit errors (retry with backoff), and authentication errors (configuration problem), rather than showing raw Stripe error messages to end users.
