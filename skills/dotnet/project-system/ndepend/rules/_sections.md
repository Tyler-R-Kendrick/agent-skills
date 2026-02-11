# NDepend Rules

Best practices and rules for NDepend.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Set a baseline snapshot after stabilizing the codebase and use `WasAdded()`, `WasChanged()`, and `OlderVersion()` in CQLinq rules | HIGH | [`ndepend-set-a-baseline-snapshot-after-stabilizing-the-codebase-and.md`](ndepend-set-a-baseline-snapshot-after-stabilizing-the-codebase-and.md) |
| 2 | Define `failif` quality gates for cyclomatic complexity, code coverage, and critical issues | CRITICAL | [`ndepend-define-failif-quality-gates-for-cyclomatic-complexity-code.md`](ndepend-define-failif-quality-gates-for-cyclomatic-complexity-code.md) |
| 3 | Create architecture rules using CQLinq `warnif` queries that enforce layer boundaries | CRITICAL | [`ndepend-create-architecture-rules-using-cqlinq-warnif-queries-that.md`](ndepend-create-architecture-rules-using-cqlinq-warnif-queries-that.md) |
| 4 | Exclude compiler-generated code with `!m.IsGeneratedByCompiler` in all CQLinq queries | HIGH | [`ndepend-exclude-compiler-generated-code-with-m.md`](ndepend-exclude-compiler-generated-code-with-m.md) |
| 5 | Track the Instability metric (Ce/(Ca+Ce)) and Abstractness ratio for each namespace | MEDIUM | [`ndepend-track-the-instability-metric-ce-ca-ce-and-abstractness.md`](ndepend-track-the-instability-metric-ce-ca-ce-and-abstractness.md) |
| 6 | Use TypeRank to identify the most important types in the codebase | HIGH | [`ndepend-use-typerank-to-identify-the-most-important-types-in-the.md`](ndepend-use-typerank-to-identify-the-most-important-types-in-the.md) |
| 7 | Configure NDepend to consume code coverage data from your test runner | MEDIUM | [`ndepend-configure-ndepend-to-consume-code-coverage-data-from-your.md`](ndepend-configure-ndepend-to-consume-code-coverage-data-from-your.md) |
| 8 | Review the NDepend dependency graph before refactoring to identify the actual dependency fan-out | MEDIUM | [`ndepend-review-the-ndepend-dependency-graph-before-refactoring-to.md`](ndepend-review-the-ndepend-dependency-graph-before-refactoring-to.md) |
| 9 | Run NDepend analysis on every pull request and publish the HTML report as a CI artifact | MEDIUM | [`ndepend-run-ndepend-analysis-on-every-pull-request-and-publish-the.md`](ndepend-run-ndepend-analysis-on-every-pull-request-and-publish-the.md) |
| 10 | Keep the NDepend project file (`.ndproj`) in version control alongside the solution | MEDIUM | [`ndepend-keep-the-ndepend-project-file-ndproj-in-version-control.md`](ndepend-keep-the-ndepend-project-file-ndproj-in-version-control.md) |
