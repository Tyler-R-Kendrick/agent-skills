# File Providers Rules

Best practices and rules for File Providers.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `CompositeFileProvider` for override patterns | MEDIUM | [`file-provider-use-compositefileprovider-for-override-patterns.md`](file-provider-use-compositefileprovider-for-override-patterns.md) |
| 2 | Inject `IFileProvider` through DI | MEDIUM | [`file-provider-inject-ifileprovider-through-di.md`](file-provider-inject-ifileprovider-through-di.md) |
| 3 | Dispose `PhysicalFileProvider` when the application shuts down | MEDIUM | [`file-provider-dispose-physicalfileprovider-when-the-application-shuts-down.md`](file-provider-dispose-physicalfileprovider-when-the-application-shuts-down.md) |
| 4 | Use `ManifestEmbeddedFileProvider` with `GenerateEmbeddedFilesManifest` | MEDIUM | [`file-provider-use-manifestembeddedfileprovider-with.md`](file-provider-use-manifestembeddedfileprovider-with.md) |
| 5 | Prefer `ChangeToken.OnChange` over manual `IChangeToken` polling | LOW | [`file-provider-prefer-changetoken-onchange-over-manual-ichangetoken-polling.md`](file-provider-prefer-changetoken-onchange-over-manual-ichangetoken-polling.md) |
| 6 | Scope `PhysicalFileProvider` to a specific directory | HIGH | [`file-provider-scope-physicalfileprovider-to-a-specific-directory.md`](file-provider-scope-physicalfileprovider-to-a-specific-directory.md) |
| 7 | Check `IFileInfo.Exists` before calling `CreateReadStream()` | MEDIUM | [`file-provider-check-ifileinfo-exists-before-calling-createreadstream.md`](file-provider-check-ifileinfo-exists-before-calling-createreadstream.md) |
| 8 | Use glob patterns in `Watch()` | MEDIUM | [`file-provider-use-glob-patterns-in-watch.md`](file-provider-use-glob-patterns-in-watch.md) |
| 9 | Cache file contents in memory | HIGH | [`file-provider-cache-file-contents-in-memory.md`](file-provider-cache-file-contents-in-memory.md) |
| 10 | Avoid using `PhysicalFileProvider` in unit tests | HIGH | [`file-provider-avoid-using-physicalfileprovider-in-unit-tests.md`](file-provider-avoid-using-physicalfileprovider-in-unit-tests.md) |
