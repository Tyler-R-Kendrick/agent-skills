# Twilio Rules

Best practices and rules for Twilio.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Store `AccountSid` and `AuthToken` in secure configuration | CRITICAL | [`twilio-store-accountsid-and-authtoken-in-secure-configuration.md`](twilio-store-accountsid-and-authtoken-in-secure-configuration.md) |
| 2 | Inject `ITwilioRestClient` | MEDIUM | [`twilio-inject-itwiliorestclient.md`](twilio-inject-itwiliorestclient.md) |
| 3 | Validate webhook requests | CRITICAL | [`twilio-validate-webhook-requests.md`](twilio-validate-webhook-requests.md) |
| 4 | Handle Twilio API exceptions | MEDIUM | [`twilio-handle-twilio-api-exceptions.md`](twilio-handle-twilio-api-exceptions.md) |
| 5 | Use Twilio Verify | MEDIUM | [`twilio-use-twilio-verify.md`](twilio-use-twilio-verify.md) |
| 6 | Set status callbacks | MEDIUM | [`twilio-set-status-callbacks.md`](twilio-set-status-callbacks.md) |
| 7 | Use E.164 format | HIGH | [`twilio-use-e-164-format.md`](twilio-use-e-164-format.md) |
| 8 | Implement rate limiting | HIGH | [`twilio-implement-rate-limiting.md`](twilio-implement-rate-limiting.md) |
| 9 | Test with Twilio's test credentials | CRITICAL | [`twilio-test-with-twilio-s-test-credentials.md`](twilio-test-with-twilio-s-test-credentials.md) |
| 10 | Monitor usage via the Twilio console | HIGH | [`twilio-monitor-usage-via-the-twilio-console.md`](twilio-monitor-usage-via-the-twilio-console.md) |
