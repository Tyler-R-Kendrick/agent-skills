# Authentication & Authorization Patterns Rules

Best practices and rules for Authentication & Authorization Patterns.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use a managed identity provider (Auth0, Entra ID, Cognito,... | CRITICAL | [`authentication-use-a-managed-identity-provider-auth0-entra-id-cognito.md`](authentication-use-a-managed-identity-provider-auth0-entra-id-cognito.md) |
| 2 | Always use PKCE with the Authorization Code flow -- even... | CRITICAL | [`authentication-always-use-pkce-with-the-authorization-code-flow-even.md`](authentication-always-use-pkce-with-the-authorization-code-flow-even.md) |
| 3 | Keep access token lifetimes short (5-15 minutes) | MEDIUM | [`authentication-keep-access-token-lifetimes-short-5-15-minutes.md`](authentication-keep-access-token-lifetimes-short-5-15-minutes.md) |
| 4 | Check permissions, not roles, in your authorization code | MEDIUM | [`authentication-check-permissions-not-roles-in-your-authorization-code.md`](authentication-check-permissions-not-roles-in-your-authorization-code.md) |
| 5 | Implement row-level security or tenant-scoped queries as a... | CRITICAL | [`authentication-implement-row-level-security-or-tenant-scoped-queries-as-a.md`](authentication-implement-row-level-security-or-tenant-scoped-queries-as-a.md) |
| 6 | Set all security headers from day one | CRITICAL | [`authentication-set-all-security-headers-from-day-one.md`](authentication-set-all-security-headers-from-day-one.md) |
| 7 | Store secrets (API keys, client secrets, signing keys) in a... | CRITICAL | [`authentication-store-secrets-api-keys-client-secrets-signing-keys-in-a.md`](authentication-store-secrets-api-keys-client-secrets-signing-keys-in-a.md) |
| 8 | Rotate signing keys and refresh tokens regularly | MEDIUM | [`authentication-rotate-signing-keys-and-refresh-tokens-regularly.md`](authentication-rotate-signing-keys-and-refresh-tokens-regularly.md) |
