# Isolated Storage Rules

Best practices and rules for Isolated Storage.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Prefer `Environment | LOW | [`isolated-storage-prefer-environment.md`](isolated-storage-prefer-environment.md) |
| 2 | Always check `store | CRITICAL | [`isolated-storage-always-check-store.md`](isolated-storage-always-check-store.md) |
| 3 | Validate and sanitize file names before using them as... | HIGH | [`isolated-storage-validate-and-sanitize-file-names-before-using-them-as.md`](isolated-storage-validate-and-sanitize-file-names-before-using-them-as.md) |
| 4 | Use `IsolatedStorageFile | CRITICAL | [`isolated-storage-use-isolatedstoragefile.md`](isolated-storage-use-isolatedstoragefile.md) |
| 5 | Wrap isolated storage operations in try-catch for... | MEDIUM | [`isolated-storage-wrap-isolated-storage-operations-in-try-catch-for.md`](isolated-storage-wrap-isolated-storage-operations-in-try-catch-for.md) |
| 6 | Dispose `IsolatedStorageFile` and... | HIGH | [`isolated-storage-dispose-isolatedstoragefile-and.md`](isolated-storage-dispose-isolatedstoragefile-and.md) |
| 7 | Monitor storage usage with `CurrentSize` and... | HIGH | [`isolated-storage-monitor-storage-usage-with-currentsize-and.md`](isolated-storage-monitor-storage-usage-with-currentsize-and.md) |
| 8 | Do not store sensitive data like passwords or tokens in... | CRITICAL | [`isolated-storage-do-not-store-sensitive-data-like-passwords-or-tokens-in.md`](isolated-storage-do-not-store-sensitive-data-like-passwords-or-tokens-in.md) |
| 9 | Use JSON serialization for structured data rather than... | MEDIUM | [`isolated-storage-use-json-serialization-for-structured-data-rather-than.md`](isolated-storage-use-json-serialization-for-structured-data-rather-than.md) |
| 10 | Write integration tests that create, read, update, and... | HIGH | [`isolated-storage-write-integration-tests-that-create-read-update-and.md`](isolated-storage-write-integration-tests-that-create-read-update-and.md) |
