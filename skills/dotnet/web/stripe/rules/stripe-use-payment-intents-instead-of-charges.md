---
title: "Use Payment Intents instead of Charges"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Use Payment Intents instead of Charges

Use Payment Intents instead of Charges: for all new payment flows, because Payment Intents handle SCA (Strong Customer Authentication), 3D Secure, and multi-step payment confirmations that Charges do not support, and Stripe recommends Payment Intents as the standard API.
