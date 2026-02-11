# Automatonymous Rules

Best practices and rules for Automatonymous.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define all events with `CorrelateById` or `CorrelateBy`... | MEDIUM | [`automatonymous-define-all-events-with-correlatebyid-or-correlateby.md`](automatonymous-define-all-events-with-correlatebyid-or-correlateby.md) |
| 2 | Use `SetCompletedWhenFinalized()` to automatically remove... | HIGH | [`automatonymous-use-setcompletedwhenfinalized-to-automatically-remove.md`](automatonymous-use-setcompletedwhenfinalized-to-automatically-remove.md) |
| 3 | Store saga state in a durable persistence store (EF Core,... | CRITICAL | [`automatonymous-store-saga-state-in-a-durable-persistence-store-ef-core.md`](automatonymous-store-saga-state-in-a-durable-persistence-store-ef-core.md) |
| 4 | Use `Schedule` for timeout scenarios (e | MEDIUM | [`automatonymous-use-schedule-for-timeout-scenarios-e.md`](automatonymous-use-schedule-for-timeout-scenarios-e.md) |
| 5 | Keep state machine classes focused on orchestration flow;... | MEDIUM | [`automatonymous-keep-state-machine-classes-focused-on-orchestration-flow.md`](automatonymous-keep-state-machine-classes-focused-on-orchestration-flow.md) |
| 6 | Use `DuringAny` for cross-cutting events like cancellation... | MEDIUM | [`automatonymous-use-duringany-for-cross-cutting-events-like-cancellation.md`](automatonymous-use-duringany-for-cross-cutting-events-like-cancellation.md) |
| 7 | Add `Finalize()` to terminal transitions so the saga... | MEDIUM | [`automatonymous-add-finalize-to-terminal-transitions-so-the-saga.md`](automatonymous-add-finalize-to-terminal-transitions-so-the-saga.md) |
| 8 | Test state machines using `MassTransitTestHarness` with... | MEDIUM | [`automatonymous-test-state-machines-using-masstransittestharness-with.md`](automatonymous-test-state-machines-using-masstransittestharness-with.md) |
| 9 | Use `Publish` within transitions for event-driven... | MEDIUM | [`automatonymous-use-publish-within-transitions-for-event-driven.md`](automatonymous-use-publish-within-transitions-for-event-driven.md) |
| 10 | Version your event contracts carefully; add new fields as... | HIGH | [`automatonymous-version-your-event-contracts-carefully-add-new-fields-as.md`](automatonymous-version-your-event-contracts-carefully-add-new-fields-as.md) |
