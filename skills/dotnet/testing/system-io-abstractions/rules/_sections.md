# System.IO.Abstractions Rules

Best practices and rules for System.IO.Abstractions.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Inject `IFileSystem` everywhere instead of using static `File` and `Directory` calls | MEDIUM | [`system-io-abstractions-inject-ifilesystem-everywhere-instead-of-using-static-file.md`](system-io-abstractions-inject-ifilesystem-everywhere-instead-of-using-static-file.md) |
| 2 | Register `FileSystem` as a singleton in production | CRITICAL | [`system-io-abstractions-register-filesystem-as-a-singleton-in-production.md`](system-io-abstractions-register-filesystem-as-a-singleton-in-production.md) |
| 3 | Pre-populate `MockFileSystem` with test data in the constructor | MEDIUM | [`system-io-abstractions-pre-populate-mockfilesystem-with-test-data-in-the.md`](system-io-abstractions-pre-populate-mockfilesystem-with-test-data-in-the.md) |
| 4 | Test both file-exists and file-missing scenarios | CRITICAL | [`system-io-abstractions-test-both-file-exists-and-file-missing-scenarios.md`](system-io-abstractions-test-both-file-exists-and-file-missing-scenarios.md) |
| 5 | Use `IFileSystem.Path` instead of `System.IO.Path` directly | MEDIUM | [`system-io-abstractions-use-ifilesystem-path-instead-of-system-io-path-directly.md`](system-io-abstractions-use-ifilesystem-path-instead-of-system-io-path-directly.md) |
| 6 | Use `MockFileData` with byte arrays for binary file testing | MEDIUM | [`system-io-abstractions-use-mockfiledata-with-byte-arrays-for-binary-file-testing.md`](system-io-abstractions-use-mockfiledata-with-byte-arrays-for-binary-file-testing.md) |
| 7 | Avoid mixing `IFileSystem` calls with raw `System.IO` calls in the same class | CRITICAL | [`system-io-abstractions-avoid-mixing-ifilesystem-calls-with-raw-system-io-calls-in.md`](system-io-abstractions-avoid-mixing-ifilesystem-calls-with-raw-system-io-calls-in.md) |
| 8 | Use `IFileInfo` and `IDirectoryInfo` for metadata access | MEDIUM | [`system-io-abstractions-use-ifileinfo-and-idirectoryinfo-for-metadata-access.md`](system-io-abstractions-use-ifileinfo-and-idirectoryinfo-for-metadata-access.md) |
| 9 | Test path traversal prevention with `MockFileSystem` | HIGH | [`system-io-abstractions-test-path-traversal-prevention-with-mockfilesystem.md`](system-io-abstractions-test-path-traversal-prevention-with-mockfilesystem.md) |
| 10 | Install `System.IO.Abstractions.TestingHelpers` only in test projects | CRITICAL | [`system-io-abstractions-install-system-io-abstractions-testinghelpers-only-in-test.md`](system-io-abstractions-install-system-io-abstractions-testinghelpers-only-in-test.md) |
