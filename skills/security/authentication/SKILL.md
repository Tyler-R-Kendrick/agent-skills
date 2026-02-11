---
name: authentication
description: |
    Use when designing or implementing authentication and authorization systems. Covers OAuth 2.0, OpenID Connect, RBAC, ABAC, Zero Trust architecture, session management, and multi-factor authentication across all platforms.
    USE FOR: OAuth 2.0, OpenID Connect, OIDC, RBAC, ABAC, Zero Trust, session management, MFA, JWT, token management, SSO, identity federation
    DO NOT USE FOR: cryptographic primitives (use cryptography), API rate limiting and headers (use api-security), specific identity provider setup (use platform-specific skills)
license: MIT
metadata:
  displayName: "Authentication & Authorization"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "OAuth 2.0 Authorization Framework (RFC 6749)"
    url: "https://datatracker.ietf.org/doc/html/rfc6749"
  - title: "OpenID Connect Specification"
    url: "https://openid.net/developers/specs/"
  - title: "OWASP Authentication Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
---

# Authentication & Authorization

## Overview

Authentication (AuthN) and authorization (AuthZ) are distinct but tightly coupled security concerns. Authentication answers the question "Who are you?" by verifying a user's or service's identity through credentials, tokens, or certificates. Authorization answers the question "What are you allowed to do?" by determining whether an authenticated identity has permission to access a resource or perform an action. A secure system requires both: authentication without authorization means anyone who logs in can do anything, while authorization without authentication means permissions are assigned to identities that have not been verified. This skill covers the protocols, patterns, and best practices for implementing both concerns across all platforms and frameworks.

## OAuth 2.0 Flows

OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to a service on behalf of a resource owner. The choice of flow depends on the type of client and the security requirements.

| Flow | Use Case | Description |
|------|----------|-------------|
| Authorization Code + PKCE | Web apps, mobile apps, single-page apps (SPAs) | The recommended flow for all clients. The client redirects the user to the authorization server, receives an authorization code, and exchanges it for tokens. PKCE (Proof Key for Code Exchange) adds a code verifier/challenge to prevent authorization code interception attacks. |
| Client Credentials | Machine-to-machine (M2M) communication | Used when no user is involved. The client authenticates directly with the authorization server using its own credentials (client ID and secret) to obtain an access token. Suitable for backend services, daemons, and CLI tools. |
| Device Authorization | Input-constrained devices (smart TVs, IoT, CLIs) | The device displays a code and URL; the user authenticates on a separate device (phone/laptop). The device polls the authorization server until the user completes authentication. |

> **Deprecated**: The **Implicit flow** (returning tokens directly in the URL fragment) is deprecated in the OAuth 2.0 Security Best Current Practice (RFC 9700). Use Authorization Code + PKCE instead for all browser-based applications.

## OpenID Connect (OIDC)

OpenID Connect is an identity layer built on top of OAuth 2.0 that adds authentication capabilities. While OAuth 2.0 only provides authorization (delegated access), OIDC enables the client to verify the user's identity.

- **ID Token**: A JWT issued by the authorization server that contains claims about the authenticated user (e.g., `sub`, `email`, `name`, `iat`, `exp`). The ID token is intended for the client application, not for API access.
- **UserInfo Endpoint**: An OAuth 2.0 protected resource that returns claims about the authenticated user. The client sends an access token to this endpoint to retrieve additional profile information.
- **Standard Claims**: OIDC defines a set of standard claims including `sub` (subject identifier), `name`, `email`, `email_verified`, `picture`, `locale`, and `updated_at`. Custom claims can be added as needed.
- **Discovery Document**: OIDC providers publish a `/.well-known/openid-configuration` document that clients use to dynamically discover endpoints, supported scopes, signing algorithms, and other provider capabilities.

## Access Control Models

| Model | How It Works | Best For | Limitation |
|-------|-------------|----------|------------|
| RBAC (Role-Based Access Control) | Permissions are assigned to roles (e.g., "admin", "editor", "viewer"), and users are assigned to roles. Access decisions are based on the user's role membership. | Systems with well-defined, relatively static organizational hierarchies and job functions. | Role explosion in complex systems; coarse-grained control; difficult to express contextual or environmental conditions. |
| ABAC (Attribute-Based Access Control) | Access decisions are based on attributes of the user, resource, action, and environment (e.g., "department=engineering AND resource.classification=internal AND time < 18:00"). | Systems requiring fine-grained, context-aware, and dynamic access control policies. | Higher complexity in policy definition and evaluation; requires attribute management infrastructure; harder to audit. |
| ReBAC (Relationship-Based Access Control) | Access decisions are based on the relationships between entities (e.g., "user is owner of document", "user is member of organization that owns project"). Popularized by Google Zanzibar. | Social platforms, document sharing, multi-tenant systems, or any domain where access is naturally defined by entity relationships. | Requires a relationship graph; query complexity grows with relationship depth; newer model with less mature tooling. |

## Zero Trust Architecture

Zero Trust is a security model that eliminates implicit trust based on network location. Rather than assuming that everything inside the corporate perimeter is safe, Zero Trust requires strict verification for every request regardless of its origin.

**Core Principles** (per NIST SP 800-207):

- **Never trust, always verify**: Every access request must be authenticated and authorized, regardless of source network, IP address, or previous access history.
- **Least privilege access**: Grant the minimum permissions necessary to perform the requested action. Use just-in-time and just-enough-access provisioning.
- **Assume breach**: Design systems under the assumption that any component may already be compromised. Limit blast radius through segmentation and containment.
- **Microsegmentation**: Divide the network and application into small, isolated segments. Enforce security policies at each segment boundary rather than only at the perimeter.
- **Continuous validation**: Do not rely on a single point-in-time authentication. Continuously evaluate the security posture of devices, users, and sessions throughout their lifecycle.

## Session Management

Secure session management prevents attackers from hijacking, fixating, or replaying user sessions.

**Cookie Security Attributes**:

| Attribute | Purpose | Recommendation |
|-----------|---------|----------------|
| `Secure` | Cookie is only sent over HTTPS connections. | Always set for all session cookies. |
| `HttpOnly` | Cookie is inaccessible to JavaScript (`document.cookie`). | Always set to prevent XSS-based session theft. |
| `SameSite` | Controls whether the cookie is sent with cross-origin requests. | Set to `Lax` (default) or `Strict` to mitigate CSRF. Use `None` only with `Secure` for legitimate cross-site use cases. |
| `Domain` | Restricts which domains receive the cookie. | Set as narrowly as possible; avoid overly broad domain scopes. |
| `Path` | Restricts which paths receive the cookie. | Set to the most specific path applicable. |
| `Max-Age` / `Expires` | Controls cookie lifetime. | Set reasonable expiry; prefer short-lived sessions with refresh mechanisms. |

**Token Storage Guidance**:

- **Web applications**: Store tokens in `HttpOnly`, `Secure` cookies. Avoid `localStorage` and `sessionStorage` for access tokens (vulnerable to XSS).
- **Mobile applications**: Use platform-secure storage (iOS Keychain, Android Keystore). Never store tokens in plaintext or shared preferences.
- **SPAs**: Use the Backend-for-Frontend (BFF) pattern where a server-side component handles tokens and issues session cookies to the browser.

**Session Lifecycle**: Regenerate session IDs after authentication; enforce absolute and idle timeouts; invalidate sessions on logout both client-side and server-side; maintain a server-side session store for revocation capability.

## Multi-Factor Authentication (MFA)

MFA requires users to present two or more verification factors from different categories: something you know (password), something you have (device/token), or something you are (biometric).

| Method | Type | Security Level | Notes |
|--------|------|----------------|-------|
| TOTP (Time-Based One-Time Password) | Something you have | Medium | Uses apps like Google Authenticator or Authy. Codes rotate every 30 seconds. Vulnerable to phishing if user enters code on a fake site. |
| WebAuthn / FIDO2 | Something you have + optionally something you are | High | Hardware security keys (YubiKey) or platform authenticators (Touch ID, Windows Hello). Phishing-resistant because the authenticator is bound to the origin domain. The gold standard for MFA. |
| SMS OTP | Something you have | Low | One-time code sent via SMS. Vulnerable to SIM swapping, SS7 interception, and social engineering. NIST SP 800-63B discourages SMS for new implementations. Use only as a fallback if no other option is available. |

## JWT Best Practices

JSON Web Tokens (JWTs) are widely used for stateless authentication and authorization. Improper use of JWTs is a common source of security vulnerabilities.

- **Signing algorithms**: Use asymmetric algorithms (`RS256`, `ES256`) for tokens that are verified by multiple services. Use `HS256` only when the same service both signs and verifies. Never allow `"alg": "none"`.
- **Expiry**: Always set the `exp` (expiration) claim. Access tokens should be short-lived (5-15 minutes). Use refresh tokens for longer sessions.
- **Audience and issuer**: Always set and validate the `aud` (audience) and `iss` (issuer) claims to prevent token misuse across services.
- **Claims**: Include only the minimum necessary claims in the payload. JWTs are signed, not encrypted by default -- their contents are readable by anyone with the token.
- **Never store sensitive data in the payload**: Do not include passwords, secrets, PII, or other sensitive information in JWT claims. Use the token as a reference to server-side state if sensitive data is needed.
- **Token revocation**: JWTs are stateless and cannot be individually revoked. Implement a token deny-list (blocklist) for critical revocation scenarios, or use short expiry times with refresh token rotation.
- **Key rotation**: Rotate signing keys periodically. Use the `kid` (Key ID) header to support multiple active keys during rotation. Publish public keys via a JWKS (JSON Web Key Set) endpoint.

## Best Practices

- **Use established protocols**: implement OAuth 2.0 and OpenID Connect rather than designing custom authentication schemes. Custom auth is almost always less secure than battle-tested standards.
- **Always use PKCE**: regardless of client type, use PKCE with the Authorization Code flow. It adds protection against code interception attacks at negligible implementation cost.
- **Enforce MFA for all privileged accounts**: at minimum, require MFA for administrators, operators, and any account with access to sensitive data or infrastructure. Prefer phishing-resistant methods (WebAuthn/FIDO2).
- **Implement token rotation**: use short-lived access tokens paired with longer-lived refresh tokens that are rotated on each use (refresh token rotation). Detect and revoke token families on reuse.
- **Centralize identity management**: use a dedicated identity provider (IdP) rather than implementing authentication in each service. This provides a single point for policy enforcement, auditing, and credential management.
- **Apply least privilege at every layer**: combine RBAC or ABAC with resource-level authorization checks. Never rely solely on role membership -- validate that the specific user has access to the specific resource being requested.
- **Secure the session lifecycle end-to-end**: regenerate session identifiers after login, enforce idle and absolute timeouts, invalidate sessions on both client and server during logout, and use secure cookie attributes on every session cookie.
- **Log all authentication events**: record successful logins, failed attempts, token issuance, refresh, revocation, and privilege changes. Feed these events into monitoring systems to detect credential stuffing, brute force attacks, and anomalous access patterns.
