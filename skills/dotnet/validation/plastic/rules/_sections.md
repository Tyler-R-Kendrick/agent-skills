# Plastic Rules

Best practices and rules for Plastic.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Implement `Validate()` to check all preconditions before any side effects | CRITICAL | [`plastic-implement-validate-to-check-all-preconditions-before-any.md`](plastic-implement-validate-to-check-all-preconditions-before-any.md) |
| 2 | Implement `IRollbackable` on every command that produces side effects | MEDIUM | [`plastic-implement-irollbackable-on-every-command-that-produces-side.md`](plastic-implement-irollbackable-on-every-command-that-produces-side.md) |
| 3 | Store undo state in the command instance | CRITICAL | [`plastic-store-undo-state-in-the-command-instance.md`](plastic-store-undo-state-in-the-command-instance.md) |
| 4 | Order commands in the pipeline from least-side-effectful to most-side-effectful | HIGH | [`plastic-order-commands-in-the-pipeline-from-least-side-effectful-to.md`](plastic-order-commands-in-the-pipeline-from-least-side-effectful-to.md) |
| 5 | Return `PipelineResult` objects from the pipeline rather than throwing exceptions | MEDIUM | [`plastic-return-pipelineresult-objects-from-the-pipeline-rather-than.md`](plastic-return-pipelineresult-objects-from-the-pipeline-rather-than.md) |
| 6 | Create separate command classes for each discrete side effect | MEDIUM | [`plastic-create-separate-command-classes-for-each-discrete-side.md`](plastic-create-separate-command-classes-for-each-discrete-side.md) |
| 7 | Unit test each command's `Validate()` and `Execute()` independently | HIGH | [`plastic-unit-test-each-command-s-validate-and-execute-independently.md`](plastic-unit-test-each-command-s-validate-and-execute-independently.md) |
| 8 | Do not reuse command instances across multiple pipeline executions | CRITICAL | [`plastic-do-not-reuse-command-instances-across-multiple-pipeline.md`](plastic-do-not-reuse-command-instances-across-multiple-pipeline.md) |
| 9 | Log the start and completion of each command in the pipeline | MEDIUM | [`plastic-log-the-start-and-completion-of-each-command-in-the-pipeline.md`](plastic-log-the-start-and-completion-of-each-command-in-the-pipeline.md) |
| 10 | Use the pipeline pattern for multi-step workflows (order fulfillment, user registration, batch processing) | CRITICAL | [`plastic-use-the-pipeline-pattern-for-multi-step-workflows-order.md`](plastic-use-the-pipeline-pattern-for-multi-step-workflows-order.md) |
