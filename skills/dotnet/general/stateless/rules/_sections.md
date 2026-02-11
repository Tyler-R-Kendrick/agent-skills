# Stateless Rules

Best practices and rules for Stateless.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define states and triggers as enums | HIGH | [`stateless-define-states-and-triggers-as-enums.md`](stateless-define-states-and-triggers-as-enums.md) |
| 2 | Use guard conditions (`PermitIf`) | HIGH | [`stateless-use-guard-conditions-permitif.md`](stateless-use-guard-conditions-permitif.md) |
| 3 | Provide human-readable guard descriptions | MEDIUM | [`stateless-provide-human-readable-guard-descriptions.md`](stateless-provide-human-readable-guard-descriptions.md) |
| 4 | Use `OnEntry`/`OnExit` actions for side effects | MEDIUM | [`stateless-use-onentry-onexit-actions-for-side-effects.md`](stateless-use-onentry-onexit-actions-for-side-effects.md) |
| 5 | Call `CanFire` before `Fire` | HIGH | [`stateless-call-canfire-before-fire.md`](stateless-call-canfire-before-fire.md) |
| 6 | Use parameterized triggers | MEDIUM | [`stateless-use-parameterized-triggers.md`](stateless-use-parameterized-triggers.md) |
| 7 | Use `FireAsync` and `OnEntryAsync` | HIGH | [`stateless-use-fireasync-and-onentryasync.md`](stateless-use-fireasync-and-onentryasync.md) |
| 8 | Externalize state storage | MEDIUM | [`stateless-externalize-state-storage.md`](stateless-externalize-state-storage.md) |
| 9 | Export DOT diagrams | MEDIUM | [`stateless-export-dot-diagrams.md`](stateless-export-dot-diagrams.md) |
| 10 | Handle `InvalidOperationException` | MEDIUM | [`stateless-handle-invalidoperationexception.md`](stateless-handle-invalidoperationexception.md) |
