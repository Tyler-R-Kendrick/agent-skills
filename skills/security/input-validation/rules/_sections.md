# Input Validation & Output Encoding Rules

Best practices and rules for Input Validation & Output Encoding.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Validate all input on the server side | CRITICAL | [`input-validation-validate-all-input-on-the-server-side.md`](input-validation-validate-all-input-on-the-server-side.md) |
| 2 | Use allowlist validation | MEDIUM | [`input-validation-use-allowlist-validation.md`](input-validation-use-allowlist-validation.md) |
| 3 | Normalize input before validation | MEDIUM | [`input-validation-normalize-input-before-validation.md`](input-validation-normalize-input-before-validation.md) |
| 4 | Encode output for its specific context | HIGH | [`input-validation-encode-output-for-its-specific-context.md`](input-validation-encode-output-for-its-specific-context.md) |
| 5 | Use parameterized queries for all database access | CRITICAL | [`input-validation-use-parameterized-queries-for-all-database-access.md`](input-validation-use-parameterized-queries-for-all-database-access.md) |
| 6 | Avoid shell execution with user input | HIGH | [`input-validation-avoid-shell-execution-with-user-input.md`](input-validation-avoid-shell-execution-with-user-input.md) |
| 7 | Deploy Content Security Policy (CSP) headers | CRITICAL | [`input-validation-deploy-content-security-policy-csp-headers.md`](input-validation-deploy-content-security-policy-csp-headers.md) |
| 8 | Audit framework escape hatches | MEDIUM | [`input-validation-audit-framework-escape-hatches.md`](input-validation-audit-framework-escape-hatches.md) |
