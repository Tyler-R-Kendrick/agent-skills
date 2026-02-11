# Mediator.NET Rules

Best practices and rules for Mediator.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `ICommand<TResponse>` for operations that mutate state... | MEDIUM | [`mediator-net-use-icommand-tresponse-for-operations-that-mutate-state.md`](mediator-net-use-icommand-tresponse-for-operations-that-mutate-state.md) |
| 2 | Return `ValueTask<T>` from handlers for... | MEDIUM | [`mediator-net-return-valuetask-t-from-handlers-for.md`](mediator-net-return-valuetask-t-from-handlers-for.md) |
| 3 | Register the mediator with `ServiceLifetime | MEDIUM | [`mediator-net-register-the-mediator-with-servicelifetime.md`](mediator-net-register-the-mediator-with-servicelifetime.md) |
| 4 | Add pipeline behaviors for cross-cutting concerns... | MEDIUM | [`mediator-net-add-pipeline-behaviors-for-cross-cutting-concerns.md`](mediator-net-add-pipeline-behaviors-for-cross-cutting-concerns.md) |
| 5 | Keep message types in a separate `Contracts` or... | CRITICAL | [`mediator-net-keep-message-types-in-a-separate-contracts-or.md`](mediator-net-keep-message-types-in-a-separate-contracts-or.md) |
| 6 | Use the compile-time error when a handler is missing as an... | CRITICAL | [`mediator-net-use-the-compile-time-error-when-a-handler-is-missing-as-an.md`](mediator-net-use-the-compile-time-error-when-a-handler-is-missing-as-an.md) |
| 7 | Prefer Mediator | HIGH | [`mediator-net-prefer-mediator.md`](mediator-net-prefer-mediator.md) |
| 8 | Avoid putting business logic in pipeline behaviors; they... | HIGH | [`mediator-net-avoid-putting-business-logic-in-pipeline-behaviors-they.md`](mediator-net-avoid-putting-business-logic-in-pipeline-behaviors-they.md) |
| 9 | Publish notifications after the primary operation succeeds... | HIGH | [`mediator-net-publish-notifications-after-the-primary-operation-succeeds.md`](mediator-net-publish-notifications-after-the-primary-operation-succeeds.md) |
| 10 | Test handlers by resolving `IMediator` from a test service... | MEDIUM | [`mediator-net-test-handlers-by-resolving-imediator-from-a-test-service.md`](mediator-net-test-handlers-by-resolving-imediator-from-a-test-service.md) |
