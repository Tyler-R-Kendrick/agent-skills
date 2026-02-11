# FluentStorage Rules

Best practices and rules for FluentStorage.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Program against the `IBlobStorage` interface everywhere in... | MEDIUM | [`fluent-storage-program-against-the-iblobstorage-interface-everywhere-in.md`](fluent-storage-program-against-the-iblobstorage-interface-everywhere-in.md) |
| 2 | Use `DirectoryFiles` for local development and integration... | CRITICAL | [`fluent-storage-use-directoryfiles-for-local-development-and-integration.md`](fluent-storage-use-directoryfiles-for-local-development-and-integration.md) |
| 3 | Always use streaming (`OpenReadAsync` / `WriteAsync` with... | CRITICAL | [`fluent-storage-always-use-streaming-openreadasync-writeasync-with.md`](fluent-storage-always-use-streaming-openreadasync-writeasync-with.md) |
| 4 | Organize blobs with a path convention (e | HIGH | [`fluent-storage-organize-blobs-with-a-path-convention-e.md`](fluent-storage-organize-blobs-with-a-path-convention-e.md) |
| 5 | Register `IBlobStorage` as a singleton because... | MEDIUM | [`fluent-storage-register-iblobstorage-as-a-singleton-because.md`](fluent-storage-register-iblobstorage-as-a-singleton-because.md) |
| 6 | Wrap storage operations in retry logic using Polly or... | MEDIUM | [`fluent-storage-wrap-storage-operations-in-retry-logic-using-polly-or.md`](fluent-storage-wrap-storage-operations-in-retry-logic-using-polly-or.md) |
| 7 | Store provider credentials in Azure Key Vault, user... | CRITICAL | [`fluent-storage-store-provider-credentials-in-azure-key-vault-user.md`](fluent-storage-store-provider-credentials-in-azure-key-vault-user.md) |
| 8 | Call `ExistsAsync` before `OpenReadAsync` when the blob may... | MEDIUM | [`fluent-storage-call-existsasync-before-openreadasync-when-the-blob-may.md`](fluent-storage-call-existsasync-before-openreadasync-when-the-blob-may.md) |
| 9 | Use `DeleteAsync` with an array of paths for batch... | MEDIUM | [`fluent-storage-use-deleteasync-with-an-array-of-paths-for-batch.md`](fluent-storage-use-deleteasync-with-an-array-of-paths-for-batch.md) |
| 10 | Validate file paths and sanitize user-supplied file names... | HIGH | [`fluent-storage-validate-file-paths-and-sanitize-user-supplied-file-names.md`](fluent-storage-validate-file-paths-and-sanitize-user-supplied-file-names.md) |
