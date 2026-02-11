# NServiceBus Rules

Best practices and rules for NServiceBus.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `ICommand` for point-to-point messages sent to a... | MEDIUM | [`nservicebus-use-icommand-for-point-to-point-messages-sent-to-a.md`](nservicebus-use-icommand-for-point-to-point-messages-sent-to-a.md) |
| 2 | Configure explicit routing for all commands... | MEDIUM | [`nservicebus-configure-explicit-routing-for-all-commands.md`](nservicebus-configure-explicit-routing-for-all-commands.md) |
| 3 | Enable the Outbox on endpoints that write to a database and... | MEDIUM | [`nservicebus-enable-the-outbox-on-endpoints-that-write-to-a-database-and.md`](nservicebus-enable-the-outbox-on-endpoints-that-write-to-a-database-and.md) |
| 4 | Use sagas for coordinating multi-step business processes;... | MEDIUM | [`nservicebus-use-sagas-for-coordinating-multi-step-business-processes.md`](nservicebus-use-sagas-for-coordinating-multi-step-business-processes.md) |
| 5 | Configure recoverability with immediate retries (for... | MEDIUM | [`nservicebus-configure-recoverability-with-immediate-retries-for.md`](nservicebus-configure-recoverability-with-immediate-retries-for.md) |
| 6 | Use `SendFailedMessagesTo("error")` and... | MEDIUM | [`nservicebus-use-sendfailedmessagesto-error-and.md`](nservicebus-use-sendfailedmessagesto-error-and.md) |
| 7 | Keep message contracts in a shared assembly with no... | HIGH | [`nservicebus-keep-message-contracts-in-a-shared-assembly-with-no.md`](nservicebus-keep-message-contracts-in-a-shared-assembly-with-no.md) |
| 8 | Use `RequestTimeout` in sagas for time-based business rules... | MEDIUM | [`nservicebus-use-requesttimeout-in-sagas-for-time-based-business-rules.md`](nservicebus-use-requesttimeout-in-sagas-for-time-based-business-rules.md) |
| 9 | Test handlers using `TestableMessageHandlerContext` from... | MEDIUM | [`nservicebus-test-handlers-using-testablemessagehandlercontext-from.md`](nservicebus-test-handlers-using-testablemessagehandlercontext-from.md) |
| 10 | Call `MarkAsComplete()` in sagas when the workflow is... | HIGH | [`nservicebus-call-markascomplete-in-sagas-when-the-workflow-is.md`](nservicebus-call-markascomplete-in-sagas-when-the-workflow-is.md) |
