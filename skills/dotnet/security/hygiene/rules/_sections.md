# Security Hygiene & Sanitization Rules

Best practices and rules for Security Hygiene & Sanitization.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Encode output for its specific rendering context | CRITICAL | [`hygiene-encode-output-for-its-specific-rendering-context.md`](hygiene-encode-output-for-its-specific-rendering-context.md) |
| 2 | Use parameterized queries everywhere without exception | CRITICAL | [`hygiene-use-parameterized-queries-everywhere-without-exception.md`](hygiene-use-parameterized-queries-everywhere-without-exception.md) |
| 3 | Validate input at the API boundary with allowlists | HIGH | [`hygiene-validate-input-at-the-api-boundary-with-allowlists.md`](hygiene-validate-input-at-the-api-boundary-with-allowlists.md) |
| 4 | Apply security headers via middleware early in the pipeline | CRITICAL | [`hygiene-apply-security-headers-via-middleware-early-in-the-pipeline.md`](hygiene-apply-security-headers-via-middleware-early-in-the-pipeline.md) |
| 5 | Set cookies with HttpOnly, Secure, and SameSite=Strict | HIGH | [`hygiene-set-cookies-with-httponly-secure-and-samesite-strict.md`](hygiene-set-cookies-with-httponly-secure-and-samesite-strict.md) |
| 6 | Use `Path.GetFullPath` and verify the canonical path prefix | HIGH | [`hygiene-use-path-getfullpath-and-verify-the-canonical-path-prefix.md`](hygiene-use-path-getfullpath-and-verify-the-canonical-path-prefix.md) |
| 7 | Never disable request validation or model binding validation | CRITICAL | [`hygiene-never-disable-request-validation-or-model-binding-validation.md`](hygiene-never-disable-request-validation-or-model-binding-validation.md) |
| 8 | Configure Content Security Policy to block inline scripts | CRITICAL | [`hygiene-configure-content-security-policy-to-block-inline-scripts.md`](hygiene-configure-content-security-policy-to-block-inline-scripts.md) |
| 9 | Log all validation failures with the source IP and input value | CRITICAL | [`hygiene-log-all-validation-failures-with-the-source-ip-and-input.md`](hygiene-log-all-validation-failures-with-the-source-ip-and-input.md) |
| 10 | Run static analysis with `dotnet format` and security analyzers | CRITICAL | [`hygiene-run-static-analysis-with-dotnet-format-and-security.md`](hygiene-run-static-analysis-with-dotnet-format-and-security.md) |
