---
description: Guidance for Stripe payment processing SDK.
metadata:
  displayName: Stripe
---

# Stripe

## Overview
Stripe.NET is the official SDK for integrating Stripe payment processing into .NET applications.

## Example
```csharp
using Stripe;

StripeConfiguration.ApiKey = "sk_test_...";

// Create customer
var customerService = new CustomerService();
var customer = await customerService.CreateAsync(new CustomerCreateOptions
{
    Email = "customer@example.com"
});

// Create payment intent
var paymentIntentService = new PaymentIntentService();
var paymentIntent = await paymentIntentService.CreateAsync(
    new PaymentIntentCreateOptions
    {
        Amount = 2000,
        Currency = "usd",
        Customer = customer.Id
    });
```

## Best Practices
- Never expose secret keys
- Use webhooks for payment events
- Handle idempotency with keys
- Test with test mode first
- Implement proper error handling
