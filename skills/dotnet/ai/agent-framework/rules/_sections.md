# Agent Framework Rules

Best practices and rules for Agent Framework.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Keep agent instructions focused on a single role or... | MEDIUM | [`agent-framework-keep-agent-instructions-focused-on-a-single-role-or.md`](agent-framework-keep-agent-instructions-focused-on-a-single-role-or.md) |
| 2 | Use `KernelFunction` plugins for deterministic operations... | MEDIUM | [`agent-framework-use-kernelfunction-plugins-for-deterministic-operations.md`](agent-framework-use-kernelfunction-plugins-for-deterministic-operations.md) |
| 3 | Set `MaximumIterations` on `AgentGroupChatSettings` to... | HIGH | [`agent-framework-set-maximumiterations-on-agentgroupchatsettings-to.md`](agent-framework-set-maximumiterations-on-agentgroupchatsettings-to.md) |
| 4 | Implement custom `TerminationStrategy` classes with... | MEDIUM | [`agent-framework-implement-custom-terminationstrategy-classes-with.md`](agent-framework-implement-custom-terminationstrategy-classes-with.md) |
| 5 | Register agents as keyed services in DI... | MEDIUM | [`agent-framework-register-agents-as-keyed-services-in-di.md`](agent-framework-register-agents-as-keyed-services-in-di.md) |
| 6 | Use `KernelFunctionSelectionStrategy` with a clear prompt... | HIGH | [`agent-framework-use-kernelfunctionselectionstrategy-with-a-clear-prompt.md`](agent-framework-use-kernelfunctionselectionstrategy-with-a-clear-prompt.md) |
| 7 | Store `ChatHistory` externally (in a database or cache) for... | MEDIUM | [`agent-framework-store-chathistory-externally-in-a-database-or-cache-for.md`](agent-framework-store-chathistory-externally-in-a-database-or-cache-for.md) |
| 8 | Pass `CancellationToken` through all `InvokeAsync` calls so... | MEDIUM | [`agent-framework-pass-cancellationtoken-through-all-invokeasync-calls-so.md`](agent-framework-pass-cancellationtoken-through-all-invokeasync-calls-so.md) |
| 9 | Test agents by mocking `IChatCompletionService` to return... | MEDIUM | [`agent-framework-test-agents-by-mocking-ichatcompletionservice-to-return.md`](agent-framework-test-agents-by-mocking-ichatcompletionservice-to-return.md) |
| 10 | Log each agent turn including agent name, token usage, and... | MEDIUM | [`agent-framework-log-each-agent-turn-including-agent-name-token-usage-and.md`](agent-framework-log-each-agent-turn-including-agent-name-token-usage-and.md) |
