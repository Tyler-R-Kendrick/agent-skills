# Semgrep for .NET Rules

Best practices and rules for Semgrep for .NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Start with the `p/csharp` community ruleset from the Semgrep Registry | CRITICAL | [`semgrep-start-with-the-p-csharp-community-ruleset-from-the-semgrep.md`](semgrep-start-with-the-p-csharp-community-ruleset-from-the-semgrep.md) |
| 2 | Use `pattern-not` and `pattern-not-inside` to reduce false positives | CRITICAL | [`semgrep-use-pattern-not-and-pattern-not-inside-to-reduce-false.md`](semgrep-use-pattern-not-and-pattern-not-inside-to-reduce-false.md) |
| 3 | Set `severity: ERROR` for security-critical rules and `severity: WARNING` for style/best-practice rules | CRITICAL | [`semgrep-set-severity-error-for-security-critical-rules-and-severity.md`](semgrep-set-severity-error-for-security-critical-rules-and-severity.md) |
| 4 | Include `metadata.cwe` and `metadata.owasp` fields in security rules | CRITICAL | [`semgrep-include-metadata-cwe-and-metadata-owasp-fields-in-security.md`](semgrep-include-metadata-cwe-and-metadata-owasp-fields-in-security.md) |
| 5 | Write autofix templates using `fix:` for mechanical transformations | MEDIUM | [`semgrep-write-autofix-templates-using-fix-for-mechanical.md`](semgrep-write-autofix-templates-using-fix-for-mechanical.md) |
| 6 | Store custom rules in a `rules/` directory at the repository root and reference them with `--config=./rules/` | MEDIUM | [`semgrep-store-custom-rules-in-a-rules-directory-at-the-repository.md`](semgrep-store-custom-rules-in-a-rules-directory-at-the-repository.md) |
| 7 | Use `metavariable-regex` to narrow matches by type name or method name patterns | HIGH | [`semgrep-use-metavariable-regex-to-narrow-matches-by-type-name-or.md`](semgrep-use-metavariable-regex-to-narrow-matches-by-type-name-or.md) |
| 8 | Run Semgrep in CI with `--json --output=results.json` and upload results as artifacts | CRITICAL | [`semgrep-run-semgrep-in-ci-with-json-output-results-json-and-upload.md`](semgrep-run-semgrep-in-ci-with-json-output-results-json-and-upload.md) |
| 9 | Test every custom rule with at least one positive match and one negative match | MEDIUM | [`semgrep-test-every-custom-rule-with-at-least-one-positive-match-and.md`](semgrep-test-every-custom-rule-with-at-least-one-positive-match-and.md) |
| 10 | Combine Semgrep with Roslyn analyzers for defense in depth | CRITICAL | [`semgrep-combine-semgrep-with-roslyn-analyzers-for-defense-in-depth.md`](semgrep-combine-semgrep-with-roslyn-analyzers-for-defense-in-depth.md) |
