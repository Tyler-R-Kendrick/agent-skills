# Rebus Rules

Best practices and rules for Rebus.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `bus.Send()` for commands (routed to a specific... | MEDIUM | [`rebus-use-bus-send-for-commands-routed-to-a-specific.md`](rebus-use-bus-send-for-commands-routed-to-a-specific.md) |
| 2 | Configure type-based routing at startup (`TypeBased() | MEDIUM | [`rebus-configure-type-based-routing-at-startup-typebased.md`](rebus-configure-type-based-routing-at-startup-typebased.md) |
| 3 | Use `AutoRegisterHandlersFromAssemblyOf<T>()` to discover... | MEDIUM | [`rebus-use-autoregisterhandlersfromassemblyof-t-to-discover.md`](rebus-use-autoregisterhandlersfromassemblyof-t-to-discover.md) |
| 4 | Enable second-level retries for handlers that may fail... | MEDIUM | [`rebus-enable-second-level-retries-for-handlers-that-may-fail.md`](rebus-enable-second-level-retries-for-handlers-that-may-fail.md) |
| 5 | Use `bus.Defer()` for delayed message delivery (e | MEDIUM | [`rebus-use-bus-defer-for-delayed-message-delivery-e.md`](rebus-use-bus-defer-for-delayed-message-delivery-e.md) |
| 6 | Store saga data in SQL Server or another durable store in... | CRITICAL | [`rebus-store-saga-data-in-sql-server-or-another-durable-store-in.md`](rebus-store-saga-data-in-sql-server-or-another-durable-store-in.md) |
| 7 | Correlate saga messages using stable business identifiers (e | MEDIUM | [`rebus-correlate-saga-messages-using-stable-business-identifiers-e.md`](rebus-correlate-saga-messages-using-stable-business-identifiers-e.md) |
| 8 | Call `MarkAsComplete()` in sagas when the workflow ends to... | MEDIUM | [`rebus-call-markascomplete-in-sagas-when-the-workflow-ends-to.md`](rebus-call-markascomplete-in-sagas-when-the-workflow-ends-to.md) |
| 9 | Set `NumberOfWorkers` and `MaxParallelism` based on... | MEDIUM | [`rebus-set-numberofworkers-and-maxparallelism-based-on.md`](rebus-set-numberofworkers-and-maxparallelism-based-on.md) |
| 10 | Test handlers with `FakeBus` from `Rebus | MEDIUM | [`rebus-test-handlers-with-fakebus-from-rebus.md`](rebus-test-handlers-with-fakebus-from-rebus.md) |
