# Stripe Rules

Best practices and rules for Stripe.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Store Stripe secret keys in environment variables or a secret manager | CRITICAL | [`stripe-store-stripe-secret-keys-in-environment-variables-or-a.md`](stripe-store-stripe-secret-keys-in-environment-variables-or-a.md) |
| 2 | Use Payment Intents instead of Charges | CRITICAL | [`stripe-use-payment-intents-instead-of-charges.md`](stripe-use-payment-intents-instead-of-charges.md) |
| 3 | Verify webhook signatures using `EventUtility.ConstructEvent()` | CRITICAL | [`stripe-verify-webhook-signatures-using-eventutility-constructevent.md`](stripe-verify-webhook-signatures-using-eventutility-constructevent.md) |
| 4 | Make webhook handlers idempotent | MEDIUM | [`stripe-make-webhook-handlers-idempotent.md`](stripe-make-webhook-handlers-idempotent.md) |
| 5 | Use `Metadata` on Payment Intents, Customers, and Subscriptions | MEDIUM | [`stripe-use-metadata-on-payment-intents-customers-and-subscriptions.md`](stripe-use-metadata-on-payment-intents-customers-and-subscriptions.md) |
| 6 | Set `PaymentBehavior = "default_incomplete"` on subscriptions | CRITICAL | [`stripe-set-paymentbehavior-default-incomplete-on-subscriptions.md`](stripe-set-paymentbehavior-default-incomplete-on-subscriptions.md) |
| 7 | Handle `StripeException` by switching on `StripeError.Type` | MEDIUM | [`stripe-handle-stripeexception-by-switching-on-stripeerror-type.md`](stripe-handle-stripeexception-by-switching-on-stripeerror-type.md) |
| 8 | Cancel subscriptions with `CancelAtPeriodEnd = true` | MEDIUM | [`stripe-cancel-subscriptions-with-cancelatperiodend-true.md`](stripe-cancel-subscriptions-with-cancelatperiodend-true.md) |
| 9 | Use `RequestOptions` with `IdempotencyKey` | CRITICAL | [`stripe-use-requestoptions-with-idempotencykey.md`](stripe-use-requestoptions-with-idempotencykey.md) |
| 10 | Test with Stripe's test card numbers | CRITICAL | [`stripe-test-with-stripe-s-test-card-numbers.md`](stripe-test-with-stripe-s-test-card-numbers.md) |
