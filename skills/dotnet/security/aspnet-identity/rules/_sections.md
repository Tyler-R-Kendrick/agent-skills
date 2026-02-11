# ASP.NET Core Identity Rules

Best practices and rules for ASP.NET Core Identity.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Set password requirements to NIST guidelines | HIGH | [`aspnet-identity-set-password-requirements-to-nist-guidelines.md`](aspnet-identity-set-password-requirements-to-nist-guidelines.md) |
| 2 | Always enable account lockout | CRITICAL | [`aspnet-identity-always-enable-account-lockout.md`](aspnet-identity-always-enable-account-lockout.md) |
| 3 | Require email confirmation before login | HIGH | [`aspnet-identity-require-email-confirmation-before-login.md`](aspnet-identity-require-email-confirmation-before-login.md) |
| 4 | Use the built-in token providers | CRITICAL | [`aspnet-identity-use-the-built-in-token-providers.md`](aspnet-identity-use-the-built-in-token-providers.md) |
| 5 | Scope DbContext per request | CRITICAL | [`aspnet-identity-scope-dbcontext-per-request.md`](aspnet-identity-scope-dbcontext-per-request.md) |
| 6 | Prefer `AddIdentityCore<T>` over `AddIdentity<T>` | CRITICAL | [`aspnet-identity-prefer-addidentitycore-t-over-addidentity-t.md`](aspnet-identity-prefer-addidentitycore-t-over-addidentity-t.md) |
| 7 | Use `MapIdentityApi<T>()` for SPA and mobile backends | MEDIUM | [`aspnet-identity-use-mapidentityapi-t-for-spa-and-mobile-backends.md`](aspnet-identity-use-mapidentityapi-t-for-spa-and-mobile-backends.md) |
| 8 | Store sensitive Identity configuration in user secrets or a vault | CRITICAL | [`aspnet-identity-store-sensitive-identity-configuration-in-user-secrets-or-a.md`](aspnet-identity-store-sensitive-identity-configuration-in-user-secrets-or-a.md) |
| 9 | Enable two-factor authentication for elevated roles | HIGH | [`aspnet-identity-enable-two-factor-authentication-for-elevated-roles.md`](aspnet-identity-enable-two-factor-authentication-for-elevated-roles.md) |
| 10 | Audit authentication events | CRITICAL | [`aspnet-identity-audit-authentication-events.md`](aspnet-identity-audit-authentication-events.md) |
