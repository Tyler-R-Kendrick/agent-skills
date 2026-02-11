# Migrant Rules

Best practices and rules for Migrant.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Enable version tolerance flags for any data that persists beyond a single app version | HIGH | [`migrant-enable-version-tolerance-flags-for-any-data-that-persists.md`](migrant-enable-version-tolerance-flags-for-any-data-that-persists.md) |
| 2 | Use `[Transient]` for runtime-only state | MEDIUM | [`migrant-use-transient-for-runtime-only-state.md`](migrant-use-transient-for-runtime-only-state.md) |
| 3 | Implement `[PostDeserialization]` hooks to rebuild transient state | MEDIUM | [`migrant-implement-postdeserialization-hooks-to-rebuild-transient.md`](migrant-implement-postdeserialization-hooks-to-rebuild-transient.md) |
| 4 | Enable `useBuffering` for large serialization operations | MEDIUM | [`migrant-enable-usebuffering-for-large-serialization-operations.md`](migrant-enable-usebuffering-for-large-serialization-operations.md) |
| 5 | Use `ReferencePreservation.Preserve` when object identity matters | CRITICAL | [`migrant-use-referencepreservation-preserve-when-object-identity.md`](migrant-use-referencepreservation-preserve-when-object-identity.md) |
| 6 | Create a reusable `Serializer` instance | MEDIUM | [`migrant-create-a-reusable-serializer-instance.md`](migrant-create-a-reusable-serializer-instance.md) |
| 7 | Test version tolerance with actual old serialized data | MEDIUM | [`migrant-test-version-tolerance-with-actual-old-serialized-data.md`](migrant-test-version-tolerance-with-actual-old-serialized-data.md) |
| 8 | Avoid using Migrant for cross-process communication | HIGH | [`migrant-avoid-using-migrant-for-cross-process-communication.md`](migrant-avoid-using-migrant-for-cross-process-communication.md) |
| 9 | Use deep cloning sparingly in hot paths | CRITICAL | [`migrant-use-deep-cloning-sparingly-in-hot-paths.md`](migrant-use-deep-cloning-sparingly-in-hot-paths.md) |
| 10 | Monitor serialized data size growth | LOW | [`migrant-monitor-serialized-data-size-growth.md`](migrant-monitor-serialized-data-size-growth.md) |
