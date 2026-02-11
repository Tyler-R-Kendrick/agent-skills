# Message Routing Rules

Best practices and rules for Message Routing.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Content-Based Router when you have a small, stable set... | MEDIUM | [`message-routing-use-content-based-router-when-you-have-a-small-stable-set.md`](message-routing-use-content-based-router-when-you-have-a-small-stable-set.md) |
| 2 | Always pair a Splitter with an Aggregator to avoid orphaned... | CRITICAL | [`message-routing-always-pair-a-splitter-with-an-aggregator-to-avoid-orphaned.md`](message-routing-always-pair-a-splitter-with-an-aggregator-to-avoid-orphaned.md) |
| 3 | Aggregators need three things | MEDIUM | [`message-routing-aggregators-need-three-things.md`](message-routing-aggregators-need-three-things.md) |
| 4 | Prefer Routing Slip over Process Manager when steps are... | CRITICAL | [`message-routing-prefer-routing-slip-over-process-manager-when-steps-are.md`](message-routing-prefer-routing-slip-over-process-manager-when-steps-are.md) |
| 5 | Use Process Manager (Saga) when you need compensation logic... | MEDIUM | [`message-routing-use-process-manager-saga-when-you-need-compensation-logic.md`](message-routing-use-process-manager-saga-when-you-need-compensation-logic.md) |
| 6 | Scatter-Gather should always have a timeout; do not wait... | CRITICAL | [`message-routing-scatter-gather-should-always-have-a-timeout-do-not-wait.md`](message-routing-scatter-gather-should-always-have-a-timeout-do-not-wait.md) |
| 7 | Keep routing logic in the infrastructure layer, not in... | MEDIUM | [`message-routing-keep-routing-logic-in-the-infrastructure-layer-not-in.md`](message-routing-keep-routing-logic-in-the-infrastructure-layer-not-in.md) |
| 8 | Monitor router decisions with Wire Tap for debugging;... | MEDIUM | [`message-routing-monitor-router-decisions-with-wire-tap-for-debugging.md`](message-routing-monitor-router-decisions-with-wire-tap-for-debugging.md) |
