# EditorConfig for .NET Rules

Best practices and rules for EditorConfig for .NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Place the root `.editorconfig` at the repository root with `root = true` | HIGH | [`editorconfig-place-the-root-editorconfig-at-the-repository-root-with.md`](editorconfig-place-the-root-editorconfig-at-the-repository-root-with.md) |
| 2 | Set `EnforceCodeStyleInBuild` to `true` in `Directory.Build.props` | HIGH | [`editorconfig-set-enforcecodestyleinbuild-to-true-in-directory-build-props.md`](editorconfig-set-enforcecodestyleinbuild-to-true-in-directory-build-props.md) |
| 3 | Use severity level `warning` rather than `error` for style rules during initial adoption | HIGH | [`editorconfig-use-severity-level-warning-rather-than-error-for-style.md`](editorconfig-use-severity-level-warning-rather-than-error-for-style.md) |
| 4 | Create a separate `[*Tests/ | CRITICAL | [`editorconfig-create-a-separate-tests.md`](editorconfig-create-a-separate-tests.md) |
| 5 | Define naming rules in priority order with explicit severity levels | MEDIUM | [`editorconfig-define-naming-rules-in-priority-order-with-explicit.md`](editorconfig-define-naming-rules-in-priority-order-with-explicit.md) |
| 6 | Pin `csharp_style_namespace_declarations = file_scoped:warning` | HIGH | [`editorconfig-pin-csharp-style-namespace-declarations-file-scoped-warning.md`](editorconfig-pin-csharp-style-namespace-declarations-file-scoped-warning.md) |
| 7 | Add `generated_code = true` and `dotnet_analyzer_diagnostic.severity = none` for `obj` and auto-generated file globs | HIGH | [`editorconfig-add-generated-code-true-and-dotnet-analyzer-diagnostic.md`](editorconfig-add-generated-code-true-and-dotnet-analyzer-diagnostic.md) |
| 8 | Commit the `.editorconfig` to version control and review changes to it through pull requests | HIGH | [`editorconfig-commit-the-editorconfig-to-version-control-and-review.md`](editorconfig-commit-the-editorconfig-to-version-control-and-review.md) |
| 9 | Use `dotnet_sort_system_directives_first = true` with `csharp_using_directive_placement = outside_namespace:warning` | MEDIUM | [`editorconfig-use-dotnet-sort-system-directives-first-true-with-csharp.md`](editorconfig-use-dotnet-sort-system-directives-first-true-with-csharp.md) |
| 10 | Run `dotnet format` in CI as a verification step | HIGH | [`editorconfig-run-dotnet-format-in-ci-as-a-verification-step.md`](editorconfig-run-dotnet-format-in-ci-as-a-verification-step.md) |
