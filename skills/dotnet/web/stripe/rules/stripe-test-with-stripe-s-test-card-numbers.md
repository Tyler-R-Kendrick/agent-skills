---
title: "Test with Stripe's test card numbers"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: stripe, dotnet, web, integrating-stripe-payment-processing-into-net-applications-using-the-stripenet-sdk-use-when-implementing-checkout-flows, subscriptions, payment-intents
---

## Test with Stripe's test card numbers

(`4242424242424242` for success, `4000000000000002` for decline) and the Stripe CLI for webhook testing (`stripe listen --forward-to localhost:5000/api/payments/webhook`), rather than using live mode for development, because test mode operations do not process real charges and provide detailed error simulation.
