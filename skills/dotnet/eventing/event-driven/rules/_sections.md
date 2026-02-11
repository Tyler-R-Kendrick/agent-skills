# Event-Driven Architecture Rules

Best practices and rules for Event-Driven Architecture.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Make all events immutable using C# `record` types with... | CRITICAL | [`event-driven-make-all-events-immutable-using-c-record-types-with.md`](event-driven-make-all-events-immutable-using-c-record-types-with.md) |
| 2 | Name events in past tense (`OrderPlaced`,... | MEDIUM | [`event-driven-name-events-in-past-tense-orderplaced.md`](event-driven-name-events-in-past-tense-orderplaced.md) |
| 3 | Separate domain events (in-process, within a bounded... | MEDIUM | [`event-driven-separate-domain-events-in-process-within-a-bounded.md`](event-driven-separate-domain-events-in-process-within-a-bounded.md) |
| 4 | Include a unique `EventId` and `OccurredAt` timestamp on... | MEDIUM | [`event-driven-include-a-unique-eventid-and-occurredat-timestamp-on.md`](event-driven-include-a-unique-eventid-and-occurredat-timestamp-on.md) |
| 5 | Use the Outbox pattern to publish integration events in the... | HIGH | [`event-driven-use-the-outbox-pattern-to-publish-integration-events-in-the.md`](event-driven-use-the-outbox-pattern-to-publish-integration-events-in-the.md) |
| 6 | Design event handlers to be idempotent so that reprocessing... | MEDIUM | [`event-driven-design-event-handlers-to-be-idempotent-so-that-reprocessing.md`](event-driven-design-event-handlers-to-be-idempotent-so-that-reprocessing.md) |
| 7 | Dispatch domain events after `SaveChangesAsync` succeeds to... | HIGH | [`event-driven-dispatch-domain-events-after-savechangesasync-succeeds-to.md`](event-driven-dispatch-domain-events-after-savechangesasync-succeeds-to.md) |
| 8 | Keep event payloads focused | HIGH | [`event-driven-keep-event-payloads-focused.md`](event-driven-keep-event-payloads-focused.md) |
| 9 | Version events explicitly (e | MEDIUM | [`event-driven-version-events-explicitly-e.md`](event-driven-version-events-explicitly-e.md) |
| 10 | Monitor event processing lag and dead-letter queues in... | CRITICAL | [`event-driven-monitor-event-processing-lag-and-dead-letter-queues-in.md`](event-driven-monitor-event-processing-lag-and-dead-letter-queues-in.md) |
