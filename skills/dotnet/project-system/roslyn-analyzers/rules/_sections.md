# Roslyn Analyzers Rules

Best practices and rules for Roslyn Analyzers.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always call `context.EnableConcurrentExecution()` and `context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None)` in `Initialize` | CRITICAL | [`roslyn-analyzers-always-call-context-enableconcurrentexecution-and-context.md`](roslyn-analyzers-always-call-context-enableconcurrentexecution-and-context.md) |
| 2 | Define diagnostic IDs with a consistent prefix (e.g., `MA001`) and maintain a public constants class | MEDIUM | [`roslyn-analyzers-define-diagnostic-ids-with-a-consistent-prefix-e-g-ma001.md`](roslyn-analyzers-define-diagnostic-ids-with-a-consistent-prefix-e-g-ma001.md) |
| 3 | Provide a `helpLinkUri` in every `DiagnosticDescriptor` | MEDIUM | [`roslyn-analyzers-provide-a-helplinkuri-in-every-diagnosticdescriptor.md`](roslyn-analyzers-provide-a-helplinkuri-in-every-diagnosticdescriptor.md) |
| 4 | Use `RegisterSymbolAction` for naming and accessibility rules, `RegisterSyntaxNodeAction` for pattern detection, and `RegisterOperationAction` for semantic analysis | MEDIUM | [`roslyn-analyzers-use-registersymbolaction-for-naming-and-accessibility-rules.md`](roslyn-analyzers-use-registersymbolaction-for-naming-and-accessibility-rules.md) |
| 5 | Implement `GetFixAllProvider()` returning `WellKnownFixAllProviders.BatchFixer` in code fix providers | MEDIUM | [`roslyn-analyzers-implement-getfixallprovider-returning.md`](roslyn-analyzers-implement-getfixallprovider-returning.md) |
| 6 | Target `netstandard2.0` and set `EnforceExtendedAnalyzerRules` to `true` | HIGH | [`roslyn-analyzers-target-netstandard2-0-and-set-enforceextendedanalyzerrules.md`](roslyn-analyzers-target-netstandard2-0-and-set-enforceextendedanalyzerrules.md) |
| 7 | Pack the analyzer DLL into `analyzers/dotnet/cs` in the NuGet package | MEDIUM | [`roslyn-analyzers-pack-the-analyzer-dll-into-analyzers-dotnet-cs-in-the-nuget.md`](roslyn-analyzers-pack-the-analyzer-dll-into-analyzers-dotnet-cs-in-the-nuget.md) |
| 8 | Use the `Microsoft.CodeAnalysis.Testing` framework for unit tests with the `VerifyAnalyzerAsync` pattern | MEDIUM | [`roslyn-analyzers-use-the-microsoft-codeanalysis-testing-framework-for-unit.md`](roslyn-analyzers-use-the-microsoft-codeanalysis-testing-framework-for-unit.md) |
| 9 | Skip compiler-generated symbols by checking `IsImplicitlyDeclared` and filter out `MethodKind.PropertyGet`, `MethodKind.PropertySet`, etc. | HIGH | [`roslyn-analyzers-skip-compiler-generated-symbols-by-checking.md`](roslyn-analyzers-skip-compiler-generated-symbols-by-checking.md) |
| 10 | Test both positive cases (diagnostic reported) and negative cases (no diagnostic) for every rule | HIGH | [`roslyn-analyzers-test-both-positive-cases-diagnostic-reported-and-negative.md`](roslyn-analyzers-test-both-positive-cases-diagnostic-reported-and-negative.md) |
