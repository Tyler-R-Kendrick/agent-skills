---
title: "Set `PaymentBehavior = \"default_incomplete\"` on subscriptions"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Set `PaymentBehavior = "default_incomplete"` on subscriptions

Set `PaymentBehavior = "default_incomplete"` on subscriptions: and expand `latest_invoice.payment_intent` to get the client secret for frontend confirmation, rather than using `allow_incomplete` which creates subscriptions without collecting payment.
