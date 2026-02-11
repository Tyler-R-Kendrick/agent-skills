# TimeProvider Rules

Best practices and rules for TimeProvider.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Never call `DateTime.UtcNow` or `DateTimeOffset.UtcNow` directly in application code | CRITICAL | [`timeprovider-never-call-datetime-utcnow-or-datetimeoffset-utcnow.md`](timeprovider-never-call-datetime-utcnow-or-datetimeoffset-utcnow.md) |
| 2 | Register `TimeProvider.System` as a singleton | MEDIUM | [`timeprovider-register-timeprovider-system-as-a-singleton.md`](timeprovider-register-timeprovider-system-as-a-singleton.md) |
| 3 | Use `FakeTimeProvider.Advance()` to simulate time progression | MEDIUM | [`timeprovider-use-faketimeprovider-advance-to-simulate-time-progression.md`](timeprovider-use-faketimeprovider-advance-to-simulate-time-progression.md) |
| 4 | Use `FakeTimeProvider.SetUtcNow()` to jump to specific points in time | MEDIUM | [`timeprovider-use-faketimeprovider-setutcnow-to-jump-to-specific-points.md`](timeprovider-use-faketimeprovider-setutcnow-to-jump-to-specific-points.md) |
| 5 | Initialize `FakeTimeProvider` with a known starting time | MEDIUM | [`timeprovider-initialize-faketimeprovider-with-a-known-starting-time.md`](timeprovider-initialize-faketimeprovider-with-a-known-starting-time.md) |
| 6 | Test timer callbacks by advancing `FakeTimeProvider` | MEDIUM | [`timeprovider-test-timer-callbacks-by-advancing-faketimeprovider.md`](timeprovider-test-timer-callbacks-by-advancing-faketimeprovider.md) |
| 7 | Use `TimeProvider` for all time-related operations in a class | MEDIUM | [`timeprovider-use-timeprovider-for-all-time-related-operations-in-a-class.md`](timeprovider-use-timeprovider-for-all-time-related-operations-in-a-class.md) |
| 8 | Test boundary conditions around time transitions | MEDIUM | [`timeprovider-test-boundary-conditions-around-time-transitions.md`](timeprovider-test-boundary-conditions-around-time-transitions.md) |
| 9 | Avoid mixing `TimeProvider` with direct `Task.Delay` calls | HIGH | [`timeprovider-avoid-mixing-timeprovider-with-direct-task-delay-calls.md`](timeprovider-avoid-mixing-timeprovider-with-direct-task-delay-calls.md) |
| 10 | Install `Microsoft.Extensions.TimeProvider.Testing` only in test projects | MEDIUM | [`timeprovider-install-microsoft-extensions-timeprovider-testing-only-in.md`](timeprovider-install-microsoft-extensions-timeprovider-testing-only-in.md) |
