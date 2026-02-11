# Brighter Rules

Best practices and rules for Brighter.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Command` for operations handled by exactly one handler... | MEDIUM | [`brighter-use-command-for-operations-handled-by-exactly-one-handler.md`](brighter-use-command-for-operations-handled-by-exactly-one-handler.md) |
| 2 | Apply `[UsePolicy]` attributes to handlers for retry and... | MEDIUM | [`brighter-apply-usepolicy-attributes-to-handlers-for-retry-and.md`](brighter-apply-usepolicy-attributes-to-handlers-for-retry-and.md) |
| 3 | Call `SendAsync` for commands (single handler expected) and... | MEDIUM | [`brighter-call-sendasync-for-commands-single-handler-expected-and.md`](brighter-call-sendasync-for-commands-single-handler-expected-and.md) |
| 4 | Register handlers using `AutoFromAssemblies()` for... | MEDIUM | [`brighter-register-handlers-using-autofromassemblies-for.md`](brighter-register-handlers-using-autofromassemblies-for.md) |
| 5 | Keep handlers single-purpose; extract shared logic into... | MEDIUM | [`brighter-keep-handlers-single-purpose-extract-shared-logic-into.md`](brighter-keep-handlers-single-purpose-extract-shared-logic-into.md) |
| 6 | Use the Outbox pattern (`DepositPostAsync` +... | HIGH | [`brighter-use-the-outbox-pattern-depositpostasync.md`](brighter-use-the-outbox-pattern-depositpostasync.md) |
| 7 | Pair Brighter (command side) with Darker (query side) in... | MEDIUM | [`brighter-pair-brighter-command-side-with-darker-query-side-in.md`](brighter-pair-brighter-command-side-with-darker-query-side-in.md) |
| 8 | Define policy registries centrally (retry, circuit breaker,... | MEDIUM | [`brighter-define-policy-registries-centrally-retry-circuit-breaker.md`](brighter-define-policy-registries-centrally-retry-circuit-breaker.md) |
| 9 | Use `PostAsync` (internal dispatch) for in-process event... | CRITICAL | [`brighter-use-postasync-internal-dispatch-for-in-process-event.md`](brighter-use-postasync-internal-dispatch-for-in-process-event.md) |
| 10 | Test handlers in isolation by mocking... | MEDIUM | [`brighter-test-handlers-in-isolation-by-mocking.md`](brighter-test-handlers-in-isolation-by-mocking.md) |
