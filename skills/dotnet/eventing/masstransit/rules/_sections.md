# MassTransit Rules

Best practices and rules for MassTransit.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Publish` for events (fan-out to all interested... | MEDIUM | [`masstransit-use-publish-for-events-fan-out-to-all-interested.md`](masstransit-use-publish-for-events-fan-out-to-all-interested.md) |
| 2 | Enable the transactional outbox (`AddEntityFrameworkOutbox`... | MEDIUM | [`masstransit-enable-the-transactional-outbox-addentityframeworkoutbox.md`](masstransit-enable-the-transactional-outbox-addentityframeworkoutbox.md) |
| 3 | Design consumers to be idempotent so that retried or... | MEDIUM | [`masstransit-design-consumers-to-be-idempotent-so-that-retried-or.md`](masstransit-design-consumers-to-be-idempotent-so-that-retried-or.md) |
| 4 | Use `ITestHarness` from `MassTransit | MEDIUM | [`masstransit-use-itestharness-from-masstransit.md`](masstransit-use-itestharness-from-masstransit.md) |
| 5 | Configure message retry with exponential backoff on... | MEDIUM | [`masstransit-configure-message-retry-with-exponential-backoff-on.md`](masstransit-configure-message-retry-with-exponential-backoff-on.md) |
| 6 | Keep message contracts in a shared contract assembly... | HIGH | [`masstransit-keep-message-contracts-in-a-shared-contract-assembly.md`](masstransit-keep-message-contracts-in-a-shared-contract-assembly.md) |
| 7 | Use saga state machines for long-running workflows spanning... | MEDIUM | [`masstransit-use-saga-state-machines-for-long-running-workflows-spanning.md`](masstransit-use-saga-state-machines-for-long-running-workflows-spanning.md) |
| 8 | Set `PrefetchCount` and concurrency limits per consumer... | HIGH | [`masstransit-set-prefetchcount-and-concurrency-limits-per-consumer.md`](masstransit-set-prefetchcount-and-concurrency-limits-per-consumer.md) |
| 9 | Prefer the in-memory transport for local development and... | CRITICAL | [`masstransit-prefer-the-in-memory-transport-for-local-development-and.md`](masstransit-prefer-the-in-memory-transport-for-local-development-and.md) |
| 10 | Always call `ConfigureEndpoints(context)` on the bus... | CRITICAL | [`masstransit-always-call-configureendpoints-context-on-the-bus.md`](masstransit-always-call-configureendpoints-context-on-the-bus.md) |
