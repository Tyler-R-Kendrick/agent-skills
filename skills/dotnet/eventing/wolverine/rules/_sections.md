# Wolverine Rules

Best practices and rules for Wolverine.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use convention-based handlers (static `Handle` or `Consume`... | MEDIUM | [`wolverine-use-convention-based-handlers-static-handle-or-consume.md`](wolverine-use-convention-based-handlers-static-handle-or-consume.md) |
| 2 | Return messages from handlers to cascade them as outgoing... | MEDIUM | [`wolverine-return-messages-from-handlers-to-cascade-them-as-outgoing.md`](wolverine-return-messages-from-handlers-to-cascade-them-as-outgoing.md) |
| 3 | Use tuple returns `(Response, Event)` to return both an... | MEDIUM | [`wolverine-use-tuple-returns-response-event-to-return-both-an.md`](wolverine-use-tuple-returns-response-event-to-return-both-an.md) |
| 4 | Enable `AutoApplyTransactions()` with Marten or EF Core to... | MEDIUM | [`wolverine-enable-autoapplytransactions-with-marten-or-ef-core-to.md`](wolverine-enable-autoapplytransactions-with-marten-or-ef-core-to.md) |
| 5 | Use `WolverinePost`/`WolverineGet` attributes with... | MEDIUM | [`wolverine-use-wolverinepost-wolverineget-attributes-with.md`](wolverine-use-wolverinepost-wolverineget-attributes-with.md) |
| 6 | Leverage Before/After middleware methods for cross-cutting... | MEDIUM | [`wolverine-leverage-before-after-middleware-methods-for-cross-cutting.md`](wolverine-leverage-before-after-middleware-methods-for-cross-cutting.md) |
| 7 | Use `IntegrateWithWolverine()` on Marten for durable... | MEDIUM | [`wolverine-use-integratewithwolverine-on-marten-for-durable.md`](wolverine-use-integratewithwolverine-on-marten-for-durable.md) |
| 8 | Use Wolverine sagas with `Saga` base class and... | MEDIUM | [`wolverine-use-wolverine-sagas-with-saga-base-class-and.md`](wolverine-use-wolverine-sagas-with-saga-base-class-and.md) |
| 9 | Configure `UseDurableInbox()` on local queues for messages... | CRITICAL | [`wolverine-configure-usedurableinbox-on-local-queues-for-messages.md`](wolverine-configure-usedurableinbox-on-local-queues-for-messages.md) |
| 10 | Test handlers as plain methods by calling them directly... | MEDIUM | [`wolverine-test-handlers-as-plain-methods-by-calling-them-directly.md`](wolverine-test-handlers-as-plain-methods-by-calling-them-directly.md) |
