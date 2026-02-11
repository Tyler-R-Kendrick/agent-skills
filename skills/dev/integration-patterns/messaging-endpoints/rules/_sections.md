# Messaging Endpoints Rules

Best practices and rules for Messaging Endpoints.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Default to Event-Driven Consumer; use Polling Consumer only... | MEDIUM | [`messaging-endpoints-default-to-event-driven-consumer-use-polling-consumer-only.md`](messaging-endpoints-default-to-event-driven-consumer-use-polling-consumer-only.md) |
| 2 | Always implement Idempotent Receiver -- treat it as a... | CRITICAL | [`messaging-endpoints-always-implement-idempotent-receiver-treat-it-as-a.md`](messaging-endpoints-always-implement-idempotent-receiver-treat-it-as-a.md) |
| 3 | Use Competing Consumers for horizontal scaling, but be... | MEDIUM | [`messaging-endpoints-use-competing-consumers-for-horizontal-scaling-but-be.md`](messaging-endpoints-use-competing-consumers-for-horizontal-scaling-but-be.md) |
| 4 | Prefer Durable Subscriber for all production pub-sub... | CRITICAL | [`messaging-endpoints-prefer-durable-subscriber-for-all-production-pub-sub.md`](messaging-endpoints-prefer-durable-subscriber-for-all-production-pub-sub.md) |
| 5 | Use the Outbox Pattern as a practical alternative to... | MEDIUM | [`messaging-endpoints-use-the-outbox-pattern-as-a-practical-alternative-to.md`](messaging-endpoints-use-the-outbox-pattern-as-a-practical-alternative-to.md) |
| 6 | Service Activator is the pattern that keeps your business... | CRITICAL | [`messaging-endpoints-service-activator-is-the-pattern-that-keeps-your-business.md`](messaging-endpoints-service-activator-is-the-pattern-that-keeps-your-business.md) |
| 7 | Monitor consumer lag (the gap between published and... | MEDIUM | [`messaging-endpoints-monitor-consumer-lag-the-gap-between-published-and.md`](messaging-endpoints-monitor-consumer-lag-the-gap-between-published-and.md) |
| 8 | Set appropriate prefetch counts and concurrency limits;... | MEDIUM | [`messaging-endpoints-set-appropriate-prefetch-counts-and-concurrency-limits.md`](messaging-endpoints-set-appropriate-prefetch-counts-and-concurrency-limits.md) |
