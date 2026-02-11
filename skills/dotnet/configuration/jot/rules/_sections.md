# Jot Rules

Best practices and rules for Jot.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Create a single `Tracker` instance shared across the entire... | HIGH | [`jot-create-a-single-tracker-instance-shared-across-the-entire.md`](jot-create-a-single-tracker-instance-shared-across-the-entire.md) |
| 2 | Always provide meaningful default values as the second... | CRITICAL | [`jot-always-provide-meaningful-default-values-as-the-second.md`](jot-always-provide-meaningful-default-values-as-the-second.md) |
| 3 | Use `.Id()` with a stable, unique identifier for each... | MEDIUM | [`jot-use-id-with-a-stable-unique-identifier-for-each.md`](jot-use-id-with-a-stable-unique-identifier-for-each.md) |
| 4 | Call `.PersistOn(nameof(Closing))` and ` | HIGH | [`jot-call-persiston-nameof-closing-and.md`](jot-call-persiston-nameof-closing-and.md) |
| 5 | Validate restored values before applying them to guard... | HIGH | [`jot-validate-restored-values-before-applying-them-to-guard.md`](jot-validate-restored-values-before-applying-them-to-guard.md) |
| 6 | Store the JSON state file in `Environment | MEDIUM | [`jot-store-the-json-state-file-in-environment.md`](jot-store-the-json-state-file-in-environment.md) |
| 7 | Provide a "Reset to Defaults" action in your application... | MEDIUM | [`jot-provide-a-reset-to-defaults-action-in-your-application.md`](jot-provide-a-reset-to-defaults-action-in-your-application.md) |
| 8 | Do not track security-sensitive values like passwords or... | CRITICAL | [`jot-do-not-track-security-sensitive-values-like-passwords-or.md`](jot-do-not-track-security-sensitive-values-like-passwords-or.md) |
| 9 | Keep the number of tracked properties reasonable; track UI... | LOW | [`jot-keep-the-number-of-tracked-properties-reasonable-track-ui.md`](jot-keep-the-number-of-tracked-properties-reasonable-track-ui.md) |
| 10 | Test state persistence by verifying that property values... | MEDIUM | [`jot-test-state-persistence-by-verifying-that-property-values.md`](jot-test-state-persistence-by-verifying-that-property-values.md) |
