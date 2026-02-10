---
name: api-security
description: |
    Use when securing APIs against common attack vectors. Covers rate limiting, CORS configuration, Content Security Policy, security headers, API gateway patterns, and API authentication strategies.
    USE FOR: API security, rate limiting, CORS, CSP, security headers, API gateway, API authentication, API keys, OAuth for APIs, HTTPS enforcement, request validation
    DO NOT USE FOR: API design patterns (use dev/backend/api-design), API testing tools (use testing/api-testing), authentication protocol details (use authentication)
license: MIT
metadata:
  displayName: "API Security"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# API Security

## Overview

APIs are the primary attack surface of modern applications. As architectures shift toward microservices, serverless functions, and third-party integrations, the number of exposed API endpoints grows dramatically. Every endpoint is a potential entry point for attackers. Securing APIs requires a layered approach that includes transport security, authentication, authorization, input validation, rate limiting, and proper response handling. A single misconfigured header or overly permissive CORS policy can expose an entire system.

## Security Headers

Security headers instruct browsers and clients on how to handle responses, significantly reducing the attack surface for common web-based attacks.

| Header | Purpose | Recommended Value |
|---|---|---|
| `Strict-Transport-Security` | Forces HTTPS connections; prevents protocol downgrade attacks | `max-age=31536000; includeSubDomains; preload` |
| `X-Content-Type-Options` | Prevents MIME type sniffing; ensures browser respects declared content type | `nosniff` |
| `X-Frame-Options` | Prevents clickjacking by controlling whether the page can be framed | `DENY` (or `SAMEORIGIN` if framing is required) |
| `Content-Security-Policy` | Controls which resources the browser is allowed to load; mitigates XSS | See CSP section below for detailed directives |
| `Referrer-Policy` | Controls how much referrer information is sent with requests | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Restricts access to browser features (camera, microphone, geolocation) | `camera=(), microphone=(), geolocation=()` |
| `Cache-Control` | Prevents caching of sensitive data by intermediaries and browsers | `no-store, no-cache, must-revalidate, private` |
| `X-Request-Id` | Provides a unique identifier for request tracing and correlation | Generate a UUID per request; echo it in the response |

For pure JSON APIs that are not serving HTML, a minimal set of headers should include `Strict-Transport-Security`, `X-Content-Type-Options`, `Cache-Control` (for sensitive responses), and `X-Request-Id`. The full set above is recommended when the API serves content rendered in a browser.

## CORS Configuration

**What CORS Is**

Cross-Origin Resource Sharing (CORS) is a browser-enforced mechanism that controls which origins are permitted to make requests to your API. When a browser makes a cross-origin request, it sends an `Origin` header; the server must respond with appropriate `Access-Control-*` headers to allow or deny the request.

**Dangerous Misconfigurations**

- **Wildcard with credentials**: Setting `Access-Control-Allow-Origin: *` together with `Access-Control-Allow-Credentials: true` is invalid per the specification, but some implementations attempt it. This would allow any website to make authenticated requests to your API.
- **Reflecting the Origin header**: Dynamically returning whatever origin the request sends without validation is equivalent to a wildcard and defeats the purpose of CORS.
- **Overly broad origin patterns**: Matching `*.example.com` without anchoring can be tricked by domains like `evil-example.com`.

**Proper Configuration Example**

```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Request-Id
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

Key rules:
- Explicitly list allowed origins; never use wildcard with credentials.
- Restrict allowed methods to only those the API actually supports.
- Restrict allowed headers to those your API requires.
- Set `Access-Control-Max-Age` to cache preflight responses and reduce latency.

**Preflight Requests**

Browsers send an `OPTIONS` preflight request before making "non-simple" requests (those with custom headers, methods other than GET/POST, or non-standard content types). Your API must handle `OPTIONS` requests and return the appropriate CORS headers with a `204 No Content` response. Ensure preflight handling does not require authentication.

## Content Security Policy

Content Security Policy (CSP) tells the browser which sources of content are trusted, providing a strong defense against cross-site scripting (XSS) and data injection attacks.

**Key Directives**

| Directive | Purpose | Example Value |
|---|---|---|
| `default-src` | Fallback for all resource types not explicitly configured | `'self'` |
| `script-src` | Controls which scripts can execute | `'self'` (avoid `'unsafe-inline'` and `'unsafe-eval'`) |
| `style-src` | Controls which stylesheets can be applied | `'self' 'unsafe-inline'` (inline styles often required) |
| `img-src` | Controls which image sources are allowed | `'self' data: https://cdn.example.com` |
| `connect-src` | Controls which URLs can be accessed via fetch, XHR, WebSocket | `'self' https://api.example.com` |
| `frame-ancestors` | Controls which origins can embed this page in a frame | `'none'` (replaces X-Frame-Options) |

**Example Policies**

For a JSON API (minimal CSP since no HTML rendering):
```
Content-Security-Policy: default-src 'none'; frame-ancestors 'none'
```

For a web application:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.example.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

**Monitoring Violations**

Use `report-uri` (deprecated but widely supported) or `report-to` to receive violation reports without blocking content. Start with `Content-Security-Policy-Report-Only` to monitor before enforcing:
```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
```

## Rate Limiting

Rate limiting protects APIs from abuse, brute-force attacks, and denial-of-service attempts by restricting the number of requests a client can make within a given time window.

**Algorithms**

| Algorithm | How It Works | Pros | Cons |
|---|---|---|---|
| Token Bucket | Tokens are added at a fixed rate; each request consumes a token; requests are rejected when the bucket is empty | Allows bursts up to bucket size; smooth average rate | Requires per-client state; bucket size tuning needed |
| Sliding Window | Counts requests in a rolling time window by combining current and previous window counts | More accurate than fixed window; smooth rate enforcement | Higher memory usage; slightly more complex |
| Fixed Window | Counts requests in discrete time intervals (e.g., per minute) | Simple to implement; low overhead | Vulnerable to burst at window boundaries (2x burst) |
| Leaky Bucket | Requests enter a queue (bucket) and are processed at a fixed rate; overflow is rejected | Very smooth output rate; prevents bursts entirely | Can add latency for queued requests; rigid |

**Response Headers**

Include rate limit information in every response so clients can self-regulate:

| Header | Purpose |
|---|---|
| `X-RateLimit-Limit` | Maximum number of requests allowed in the current window |
| `X-RateLimit-Remaining` | Number of requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the current window resets |
| `Retry-After` | Seconds to wait before retrying (sent with `429 Too Many Requests`) |

**Tiered Limits by Authentication Level**

| Tier | Authentication | Rate Limit | Use Case |
|---|---|---|---|
| Anonymous | None | 60 requests/hour | Public read-only endpoints |
| Authenticated | API key or Bearer token | 1,000 requests/hour | Standard application usage |
| Premium | API key with premium plan | 10,000 requests/hour | High-volume integrations |
| Internal | mTLS or service mesh identity | 100,000 requests/hour | Service-to-service communication |

## API Authentication

Different authentication mechanisms suit different contexts. Choose based on the trust level, client type, and security requirements.

| Method | Use Case | Security Level | Details |
|---|---|---|---|
| API Keys | Internal services, low-risk public APIs | Low-Medium | Simple to implement; transmitted in headers; easily leaked if not managed; rotate regularly; never embed in client-side code |
| OAuth 2.0 Bearer Tokens | User-delegated access, third-party integrations | High | Industry standard for delegated authorization; use short-lived access tokens with refresh tokens; validate scopes on every request |
| mTLS (Mutual TLS) | Service-to-service communication | Very High | Both client and server present certificates; strong identity verification; requires certificate management infrastructure (PKI) |
| HMAC Signatures | Webhook verification, request integrity | High | Request body is signed with a shared secret; prevents tampering and replay (with timestamp); no credentials transmitted |

Key considerations across all methods:
- Always transmit credentials over HTTPS.
- Implement token/key rotation and revocation mechanisms.
- Log authentication events for audit and anomaly detection.
- Use short-lived tokens and refresh mechanisms where possible.

## API Gateway Security

An API gateway acts as a centralized entry point for all API traffic, providing a single location to enforce security policies consistently across services.

**What an API Gateway Provides**

- **Authentication and authorization**: Validate tokens, API keys, and certificates at the edge before requests reach backend services.
- **Rate limiting**: Enforce per-client and per-endpoint rate limits centrally.
- **Request validation**: Validate request schemas (JSON Schema, OpenAPI spec) and reject malformed input before it reaches application logic.
- **TLS termination**: Handle HTTPS at the gateway; backend services can communicate over a trusted internal network.
- **Logging and monitoring**: Capture request/response metadata, latency metrics, and error rates in a centralized location.
- **IP allowlisting/blocklisting**: Restrict access by source IP for internal or partner APIs.
- **Request/response transformation**: Strip sensitive headers, mask fields, or add security headers uniformly.

**Common API Gateways**

| Gateway | Type | Key Features |
|---|---|---|
| Kong | Open source / Enterprise | Plugin ecosystem, declarative config, gRPC support, Kubernetes-native |
| AWS API Gateway | Managed (AWS) | Lambda integration, usage plans, WAF integration, mutual TLS |
| Azure API Management | Managed (Azure) | Policy engine, developer portal, built-in caching, multi-region |
| Envoy | Open source (proxy) | Service mesh integration (Istio), advanced load balancing, extensible via WASM |
| NGINX | Open source / Commercial | High performance, Lua scripting, broad protocol support |

## Best Practices

- **Enforce HTTPS everywhere** — never allow plaintext HTTP for any API endpoint; use HSTS headers to prevent downgrade attacks and configure TLS 1.2 as the minimum supported version.
- **Validate all input on the server side** — never trust client-side validation alone; validate request bodies against schemas, enforce type and length constraints, and reject unexpected fields.
- **Use the principle of least privilege for API scopes** — issue tokens with the minimum scopes and permissions required for the specific operation; avoid wildcard or admin scopes for routine operations.
- **Implement defense in depth** — combine multiple security layers (gateway, authentication, authorization, input validation, rate limiting, monitoring) so that no single control failure results in a breach.
- **Return minimal error information** — never expose stack traces, internal paths, or database error messages in API responses; use generic error messages with correlation IDs for debugging.
- **Log all security-relevant events** — record authentication attempts, authorization failures, rate limit hits, and input validation rejections; feed logs into a SIEM for real-time alerting.
- **Version your APIs and deprecate securely** — maintain security patches across all supported versions; when deprecating, provide clear timelines and ensure old versions are eventually decommissioned.
- **Audit third-party API integrations** — review the security posture of external APIs your application depends on; validate their responses, enforce timeouts, and implement circuit breakers to prevent cascading failures.
