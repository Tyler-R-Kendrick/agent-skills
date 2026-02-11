# Blazor Fusion Rules

Best practices and rules for Blazor Fusion.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Make compute method implementations `virtual` | MEDIUM | [`blazor-fusion-make-compute-method-implementations-virtual.md`](blazor-fusion-make-compute-method-implementations-virtual.md) |
| 2 | Always invalidate compute methods inside a `using (Computed.Invalidate())` block | CRITICAL | [`blazor-fusion-always-invalidate-compute-methods-inside-a-using-computed.md`](blazor-fusion-always-invalidate-compute-methods-inside-a-using-computed.md) |
| 3 | Register compute services as singletons | MEDIUM | [`blazor-fusion-register-compute-services-as-singletons.md`](blazor-fusion-register-compute-services-as-singletons.md) |
| 4 | Inherit from `ComputedStateComponent<T>` for Blazor components that consume compute methods | HIGH | [`blazor-fusion-inherit-from-computedstatecomponent-t-for-blazor-components.md`](blazor-fusion-inherit-from-computedstatecomponent-t-for-blazor-components.md) |
| 5 | Invalidate only the specific compute methods affected by a mutation | HIGH | [`blazor-fusion-invalidate-only-the-specific-compute-methods-affected-by-a.md`](blazor-fusion-invalidate-only-the-specific-compute-methods-affected-by-a.md) |
| 6 | Set `UpdateDelayer` in `GetStateOptions()` to control how frequently a component polls for recomputation | CRITICAL | [`blazor-fusion-set-updatedelayer-in-getstateoptions-to-control-how.md`](blazor-fusion-set-updatedelayer-in-getstateoptions-to-control-how.md) |
| 7 | Use Fusion's `IComputeService` interface as a marker on service interfaces | MEDIUM | [`blazor-fusion-use-fusion-s-icomputeservice-interface-as-a-marker-on.md`](blazor-fusion-use-fusion-s-icomputeservice-interface-as-a-marker-on.md) |
| 8 | Do not throw exceptions from compute methods to signal "not found" | CRITICAL | [`blazor-fusion-do-not-throw-exceptions-from-compute-methods-to-signal-not.md`](blazor-fusion-do-not-throw-exceptions-from-compute-methods-to-signal-not.md) |
| 9 | Test compute services by verifying that calling a compute method twice returns the same cached instance | MEDIUM | [`blazor-fusion-test-compute-services-by-verifying-that-calling-a-compute.md`](blazor-fusion-test-compute-services-by-verifying-that-calling-a-compute.md) |
| 10 | Separate mutation methods (Add, Update, Delete) from compute methods (Get, List, Count) | MEDIUM | [`blazor-fusion-separate-mutation-methods-add-update-delete-from-compute.md`](blazor-fusion-separate-mutation-methods-add-update-delete-from-compute.md) |
