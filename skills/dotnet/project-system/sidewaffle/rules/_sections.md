# SideWaffle / dotnet new Templates Rules

Best practices and rules for SideWaffle / dotnet new Templates.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `sourceName` in `template.json` set to a meaningful placeholder name | MEDIUM | [`sidewaffle-use-sourcename-in-template-json-set-to-a-meaningful.md`](sidewaffle-use-sourcename-in-template-json-set-to-a-meaningful.md) |
| 2 | Include a working test project in the template with at least one passing test | MEDIUM | [`sidewaffle-include-a-working-test-project-in-the-template-with-at.md`](sidewaffle-include-a-working-test-project-in-the-template-with-at.md) |
| 3 | Use `choice` parameter types for mutually exclusive options like database providers | HIGH | [`sidewaffle-use-choice-parameter-types-for-mutually-exclusive-options.md`](sidewaffle-use-choice-parameter-types-for-mutually-exclusive-options.md) |
| 4 | Exclude build artifacts with source modifiers | HIGH | [`sidewaffle-exclude-build-artifacts-with-source-modifiers.md`](sidewaffle-exclude-build-artifacts-with-source-modifiers.md) |
| 5 | Use C-style preprocessor directives (`//#if`, `//#endif`) for conditional C# content | MEDIUM | [`sidewaffle-use-c-style-preprocessor-directives-if-endif-for.md`](sidewaffle-use-c-style-preprocessor-directives-if-endif-for.md) |
| 6 | Test templates by installing them locally with `dotnet new install ./path` | MEDIUM | [`sidewaffle-test-templates-by-installing-them-locally-with-dotnet-new.md`](sidewaffle-test-templates-by-installing-them-locally-with-dotnet-new.md) |
| 7 | Set `PackageType` to `Template` in the packaging `.csproj` | MEDIUM | [`sidewaffle-set-packagetype-to-template-in-the-packaging-csproj.md`](sidewaffle-set-packagetype-to-template-in-the-packaging-csproj.md) |
| 8 | Use the `generated` symbol type with `"generator": "now"` for copyright years and `"generator": "guid"` for correlation IDs | MEDIUM | [`sidewaffle-use-the-generated-symbol-type-with-generator-now-for.md`](sidewaffle-use-the-generated-symbol-type-with-generator-now-for.md) |
| 9 | Include `Directory.Build.props`, `.editorconfig`, and `global.json` in the template | MEDIUM | [`sidewaffle-include-directory-build-props-editorconfig-and-global-json.md`](sidewaffle-include-directory-build-props-editorconfig-and-global-json.md) |
| 10 | Version template packages with semantic versioning and publish to an internal NuGet feed | MEDIUM | [`sidewaffle-version-template-packages-with-semantic-versioning-and.md`](sidewaffle-version-template-packages-with-semantic-versioning-and.md) |
