---
name: authentication
description: |
    Use when designing authentication and authorization systems — OAuth 2.0 flows, JWT handling, session management, RBAC/ABAC models, multi-tenancy patterns, and security header configuration.
    USE FOR: authentication design, authorization models, OAuth 2.0 flows, JWT implementation, session management, RBAC, ABAC, multi-tenancy patterns, identity provider selection, security headers, CORS configuration
    DO NOT USE FOR: API endpoint design (use api-design), security scanning/SAST (use testing/static-analysis), infrastructure security (use iac)
license: MIT
metadata:
  displayName: "Authentication & Authorization Patterns"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Authentication & Authorization Patterns

## Overview
Authentication (authn) verifies *who* a user is. Authorization (authz) determines *what* they can do. Getting these right is non-negotiable -- a flaw in either can expose user data, enable privilege escalation, or bring regulatory consequences. This skill covers the major authentication flows, token formats, authorization models, multi-tenancy patterns, and security headers needed to build secure backend systems.

## OAuth 2.0 Flows

### Authorization Code + PKCE (Recommended for Most Apps)

The most secure flow for user-facing applications (SPAs, mobile apps, server-rendered apps). PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks.

```
┌──────────┐                              ┌──────────────┐
│  Client   │──1. Auth request + ─────────>│ Authorization│
│  (Browser/│    code_challenge            │   Server     │
│   Mobile) │<──2. Redirect with ─────────│              │
│           │    authorization code        │              │
│           │──3. Exchange code + ─────────>│              │
│           │    code_verifier             │              │
│           │<──4. Access token + ─────────│              │
│           │    refresh token             │              │
└──────────┘                              └──────────────┘
       │                                         │
       │──5. API request with ──────────>┌──────────────┐
       │    Bearer access_token          │  Resource     │
       │<──6. Protected resource ────────│  Server       │
       │                                 └──────────────┘
```

**Steps:**
1. Client generates a random `code_verifier` and derives `code_challenge = SHA256(code_verifier)`.
2. Client redirects user to authorization server with `code_challenge`.
3. User authenticates and consents. Authorization server redirects back with an authorization code.
4. Client exchanges the code + `code_verifier` for tokens. Server verifies `SHA256(code_verifier) == code_challenge`.
5. Client uses the access token to call APIs.

### Client Credentials (Machine-to-Machine)

For service-to-service communication where no user is involved.

```
Service A ──POST /token──> Authorization Server
            client_id +
            client_secret
            grant_type=client_credentials

Service A <──access_token── Authorization Server

Service A ──Bearer token──> Service B
```

**Use when:** Backend services authenticate to each other. No user context needed.

### Device Code (TV / IoT / CLI)

For devices with limited input capability.

```
1. Device requests a device code and user code from auth server
2. Device displays: "Go to https://auth.example.com/device and enter code: ABCD-1234"
3. User visits URL on their phone/laptop, enters code, authenticates
4. Device polls auth server until user completes authentication
5. Auth server returns access token to device
```

## OpenID Connect (OIDC)

OIDC is an identity layer built on top of OAuth 2.0. It adds:

| Component | Purpose |
|-----------|---------|
| **ID Token** | A JWT containing user identity claims (sub, email, name) -- proves who the user is |
| **UserInfo Endpoint** | `GET /userinfo` returns additional user profile claims |
| **Discovery** | `GET /.well-known/openid-configuration` returns all endpoint URLs, supported scopes, signing algorithms |
| **Standard Scopes** | `openid` (required), `profile`, `email`, `address`, `phone` |

**Key distinction:** OAuth 2.0 alone is for *authorization* (access to resources). OIDC adds *authentication* (identity of the user).

## JWT (JSON Web Token)

### Structure

```
header.payload.signature

Header (base64url):
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-2024-01"
}

Payload (base64url):
{
  "iss": "https://auth.example.com",
  "sub": "user_42",
  "aud": "https://api.example.com",
  "exp": 1705312800,
  "iat": 1705309200,
  "scope": "read:orders write:orders",
  "roles": ["admin"],
  "tenant_id": "org_acme"
}

Signature:
  RS256(base64url(header) + "." + base64url(payload), private_key)
```

### Standard Claims

| Claim | Purpose |
|-------|---------|
| `iss` | Issuer -- who created the token |
| `sub` | Subject -- who the token represents |
| `aud` | Audience -- who the token is intended for |
| `exp` | Expiration time (Unix timestamp) |
| `iat` | Issued at time |
| `nbf` | Not before -- token is not valid before this time |
| `jti` | JWT ID -- unique identifier for the token |

### Access Tokens vs. Refresh Tokens

| Property | Access Token | Refresh Token |
|----------|-------------|---------------|
| **Purpose** | Authorize API requests | Obtain new access tokens |
| **Lifetime** | Short (5-60 minutes) | Long (hours to days) |
| **Stored** | Memory (preferred) or secure cookie | Secure, HttpOnly cookie or secure storage |
| **Sent to** | Resource server (API) | Authorization server only |
| **Revocable** | Difficult (until expiry) | Yes (server-side revocation list) |

### Token Rotation

Refresh token rotation issues a new refresh token with every access token refresh. If a refresh token is used twice, the server assumes the original was stolen and revokes the entire token family.

```
1. Client sends refresh_token_v1 → Server returns access_token + refresh_token_v2
2. Client sends refresh_token_v2 → Server returns access_token + refresh_token_v3
3. Attacker sends refresh_token_v1 → Server detects reuse → revokes ALL tokens for user
```

## Session-Based Authentication

### Server-Side Sessions

```
1. User submits credentials
2. Server validates, creates session record (in DB or Redis)
3. Server sends session ID in a cookie
4. Client sends cookie with every request
5. Server looks up session by ID, retrieves user context
```

### Cookie Security

| Attribute | Purpose | Recommendation |
|-----------|---------|----------------|
| `HttpOnly` | Prevents JavaScript access (XSS mitigation) | Always set |
| `Secure` | Cookie sent only over HTTPS | Always set in production |
| `SameSite=Lax` | Mitigates CSRF for top-level navigations | Default for most apps |
| `SameSite=Strict` | Cookie never sent cross-site | For sensitive operations |
| `Path=/` | Scope the cookie to a path | Set appropriately |
| `Max-Age` / `Expires` | Session duration | Match your session TTL |

### CSRF Protection

- **SameSite cookies** (Lax or Strict) -- primary defense in modern browsers.
- **Synchronizer Token Pattern** -- server generates a random token, embeds in forms, validates on POST.
- **Double Submit Cookie** -- CSRF token in both a cookie and a request header; server verifies they match.

## API Key Authentication

Appropriate for:
- Server-to-server communication where OAuth is overkill.
- Public APIs with usage-based billing (keys identify the caller for rate limiting and billing).
- Development/testing environments.

**Not appropriate for:** User-facing authentication (API keys cannot represent user identity or consent).

**Best practices:**
- Treat API keys as secrets. Hash them in storage (like passwords).
- Support key rotation: allow multiple active keys per client.
- Include the key in a header (`X-API-Key` or `Authorization: Bearer`), never in the URL.
- Scope keys to specific permissions and rate limits.

## RBAC (Role-Based Access Control)

Users are assigned **roles**; roles are granted **permissions**. Users inherit the permissions of their assigned roles.

```
Role Hierarchy Example:

  admin
    ├── manage_users
    ├── manage_orders
    └── viewer (inherits)
          ├── read_orders
          └── read_products

User "Alice" → roles: [admin]
  → effective permissions: [manage_users, manage_orders, read_orders, read_products]

User "Bob" → roles: [viewer]
  → effective permissions: [read_orders, read_products]
```

### Implementation Pattern

```python
# Check permission, not role (more granular and maintainable)
# Bad:  if user.role == "admin"
# Good: if user.has_permission("manage_orders")

def require_permission(permission):
    def decorator(handler):
        def wrapper(request):
            if not request.user.has_permission(permission):
                raise ForbiddenError()
            return handler(request)
        return wrapper
    return decorator

@require_permission("manage_orders")
def cancel_order(request, order_id):
    ...
```

**Best for:** Most applications. Simple to understand, implement, and audit.

## ABAC (Attribute-Based Access Control)

Access decisions based on **attributes** of the subject, resource, action, and environment -- evaluated by a **policy engine**.

| Attribute Source | Examples |
|-----------------|----------|
| **Subject** | user.role, user.department, user.clearance_level |
| **Resource** | document.classification, order.owner_id, record.tenant_id |
| **Action** | read, write, delete, approve |
| **Environment** | current_time, ip_address, request.is_internal |

### Policy Example (Pseudocode)

```
PERMIT action=read ON resource=document
  WHERE subject.clearance_level >= resource.classification
    AND subject.department == resource.department
    AND environment.time BETWEEN 08:00 AND 18:00
```

**Best for:** Complex authorization requirements where RBAC role explosion becomes unmanageable (e.g., healthcare, government, multi-tenant SaaS with granular permissions).

## Multi-Tenancy Patterns

| Pattern | Isolation Level | Complexity | Cost |
|---------|----------------|------------|------|
| **Shared database, shared schema** | Row-level (tenant_id column) | Low | Lowest |
| **Shared database, schema-per-tenant** | Schema-level | Medium | Medium |
| **Database-per-tenant** | Full database isolation | High | Highest |

### Row-Level Security (Shared Schema)

```sql
-- PostgreSQL Row-Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Set tenant context per request
SET app.current_tenant = 'org_acme';
SELECT * FROM orders;  -- only returns org_acme's orders
```

**Decision heuristic:**
- **Shared schema + RLS** for most SaaS applications (simplest, cost-effective, sufficient isolation).
- **Schema-per-tenant** when tenants need custom schema extensions or stronger isolation without separate databases.
- **Database-per-tenant** when regulatory, compliance, or contractual requirements mandate full data isolation (e.g., healthcare, finance, government).

## Identity Providers

| Provider | Type | Best For |
|----------|------|----------|
| **Auth0** | Managed (Okta) | SaaS apps, rapid development, extensive social login support |
| **Microsoft Entra ID** (Azure AD) | Managed (Microsoft) | Enterprise apps, Microsoft ecosystem, B2B federation |
| **Amazon Cognito** | Managed (AWS) | AWS-native apps, user pools + federated identity |
| **Keycloak** | Open-source (self-hosted) | Full control, on-premises, custom requirements |
| **Firebase Auth** | Managed (Google) | Mobile-first apps, Google ecosystem, quick prototyping |

**Recommendation:** Use a managed identity provider unless you have strong requirements for self-hosting. Building authentication from scratch is a security liability.

## Security Headers

| Header | Purpose | Recommended Value |
|--------|---------|-------------------|
| **CORS** (`Access-Control-Allow-Origin`) | Controls which origins can call your API | Explicit allowlist (never `*` with credentials) |
| **Content-Security-Policy (CSP)** | Controls what content the browser can load/execute | `default-src 'self'; script-src 'self'` (customize per app) |
| **Strict-Transport-Security (HSTS)** | Forces HTTPS for all future requests | `max-age=31536000; includeSubDomains; preload` |
| **Referrer-Policy** | Controls how much referrer info is sent | `strict-origin-when-cross-origin` |
| **X-Content-Type-Options** | Prevents MIME type sniffing | `nosniff` |
| **X-Frame-Options** | Prevents clickjacking via iframes | `DENY` or `SAMEORIGIN` |
| **Permissions-Policy** | Controls browser features (camera, mic, geolocation) | Restrict to only what your app needs |

### CORS Configuration

```
# Preflight request
OPTIONS /api/orders
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization, Content-Type

# Preflight response
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true
```

**Rules:**
- Never use `Access-Control-Allow-Origin: *` when `Access-Control-Allow-Credentials: true`.
- Maintain an explicit allowlist of trusted origins.
- Set `Access-Control-Max-Age` to reduce preflight request overhead.

## Best Practices
- Use a managed identity provider (Auth0, Entra ID, Cognito, Keycloak) instead of building authentication from scratch. Authentication is a security-critical function where the cost of getting it wrong is severe.
- Always use PKCE with the Authorization Code flow -- even for server-side apps. It adds security with no meaningful cost.
- Keep access token lifetimes short (5-15 minutes). Use refresh tokens for longer sessions.
- Check permissions, not roles, in your authorization code. This makes RBAC more granular and decouples business logic from role definitions.
- Implement row-level security or tenant-scoped queries as a defense-in-depth measure -- never rely solely on application-level tenant filtering.
- Set all security headers from day one. Adding HSTS, CSP, and CORS retroactively often breaks existing functionality.
- Store secrets (API keys, client secrets, signing keys) in a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault), never in code or environment variables in plain text.
- Rotate signing keys and refresh tokens regularly. Implement token family revocation for refresh token reuse detection.
