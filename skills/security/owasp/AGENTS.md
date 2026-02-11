# OWASP Standards

## Overview

The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation dedicated to improving software security. OWASP produces freely available standards, tools, and documentation that serve as industry benchmarks for identifying and mitigating application security risks. The OWASP Top 10 for web applications and the OWASP API Security Top 10 are widely adopted as minimum security baselines by organizations worldwide. Combined with the CWE/SANS Top 25, these lists provide a comprehensive taxonomy of the most dangerous and prevalent software weaknesses, enabling development teams to prioritize their security efforts against the threats that matter most.

## OWASP Top 10 (2021)

| # | Category | Description | Key Mitigations |
|---|----------|-------------|-----------------|
| A01 | Broken Access Control | Restrictions on authenticated users are not properly enforced, allowing users to act outside their intended permissions. | Deny by default; enforce server-side access checks; disable directory listing; log and alert on access control failures; rate-limit API access; invalidate tokens on logout. |
| A02 | Cryptographic Failures | Failures related to cryptography that lead to exposure of sensitive data. Previously "Sensitive Data Exposure." | Classify data by sensitivity; encrypt data in transit (TLS 1.2+) and at rest; avoid deprecated algorithms (MD5, SHA-1, DES); use authenticated encryption; manage keys securely. |
| A03 | Injection | User-supplied data is sent to an interpreter as part of a command or query without proper validation or escaping. Includes SQL, NoSQL, OS command, and LDAP injection. | Use parameterized queries and prepared statements; apply server-side input validation; escape special characters; use LIMIT clauses to prevent mass disclosure. |
| A04 | Insecure Design | Flaws in design and architecture rather than implementation. Missing or ineffective security controls at the design phase. | Use threat modeling; establish secure design patterns and reference architectures; integrate security into user stories; use unit and integration tests for security flows. |
| A05 | Security Misconfiguration | Missing or incorrect security hardening across any part of the stack, including cloud services, frameworks, and default credentials. | Automate hardening processes; maintain minimal platforms; review and update configurations; use segmented architecture; send security directives to clients (e.g., CSP headers). |
| A06 | Vulnerable and Outdated Components | Using libraries, frameworks, or other software components with known vulnerabilities, or failing to keep them updated. | Remove unused dependencies; continuously inventory versions; monitor CVE databases; obtain components from official sources; use SCA tools in CI/CD. |
| A07 | Identification and Authentication Failures | Weaknesses in authentication mechanisms that allow attackers to assume other users' identities. | Implement MFA; avoid default credentials; enforce password complexity and rotation; limit failed login attempts; use server-side session management with high-entropy IDs. |
| A08 | Software and Data Integrity Failures | Code and infrastructure that does not protect against integrity violations, including insecure CI/CD pipelines and unsigned updates. | Use digital signatures to verify software and data; ensure CI/CD pipelines have proper access control and segregation; do not pull unsigned or unverified serialized data from untrusted sources. |
| A09 | Security Logging and Monitoring Failures | Insufficient logging, monitoring, detection, and active response that allow attackers to persist and pivot undetected. | Log all authentication, access control, and input validation failures; ensure logs are in a consumable format for monitoring tools; establish alerting thresholds and incident response procedures. |
| A10 | Server-Side Request Forgery (SSRF) | Web applications fetch remote resources without validating the user-supplied URL, allowing attackers to coerce the server into making requests to unintended destinations. | Sanitize and validate all client-supplied URLs; enforce allow-lists for remote resources; deny by default for firewall rules; do not send raw responses to clients. |

## OWASP API Security Top 10 (2023)

| # | Category | Description | Key Mitigations |
|---|----------|-------------|-----------------|
| API1 | Broken Object Level Authorization | APIs expose endpoints that handle object identifiers, enabling attackers to access other users' data by manipulating IDs. | Implement authorization checks at the object level for every function that accesses a data source using user input; use random, unpredictable IDs (UUIDs). |
| API2 | Broken Authentication | Flawed authentication mechanisms allow attackers to assume other users' identities or bypass authentication entirely. | Use standard authentication protocols (OAuth 2.0, OIDC); implement MFA; enforce anti-brute-force mechanisms; validate JWTs properly. |
| API3 | Broken Object Property Level Authorization | APIs expose object properties that the user should not be authorized to read or modify, including mass assignment and excessive data exposure. | Validate API responses against schema; only return necessary fields; avoid generic to_json() or to_string() methods; validate incoming property sets against allow-lists. |
| API4 | Unrestricted Resource Consumption | APIs do not limit the size or number of resources that can be requested, enabling denial of service and cost escalation. | Implement rate limiting; set maximum payload sizes; limit pagination parameters; set execution timeouts; restrict resource allocation per request. |
| API5 | Broken Function Level Authorization | Attackers send legitimate API calls to endpoints they should not have access to, exploiting inconsistent authorization enforcement across functions. | Default deny for all access; enforce function-level authorization checks; ensure administrative endpoints are not exposed to regular users; align authorization with business logic. |
| API6 | Unrestricted Access to Sensitive Business Flows | APIs expose business flows without compensating controls to prevent automated abuse (e.g., scalping, spam, credential stuffing). | Identify sensitive business flows; implement device fingerprinting, CAPTCHA, or bot detection; analyze usage patterns for non-human behavior. |
| API7 | Server-Side Request Forgery | APIs fetch remote resources based on user-supplied URIs without proper validation, enabling attackers to probe internal networks. | Validate and sanitize user-supplied URLs; use allow-lists for permitted domains and protocols; disable HTTP redirects; deploy network segmentation. |
| API8 | Security Misconfiguration | Missing security hardening, overly permissive CORS, verbose error messages, or unnecessary HTTP methods enabled. | Automate configuration review; disable unnecessary HTTP methods; configure CORS restrictively; suppress stack traces in errors; ensure TLS configuration is current. |
| API9 | Improper Inventory Management | APIs have undocumented or forgotten endpoints, shadow APIs, or outdated versions still accessible in production. | Inventory all API hosts and endpoints; generate OpenAPI specs; use API gateways; retire old API versions; require authentication even for internal APIs. |
| API10 | Unsafe Consumption of APIs | APIs consume data from third-party integrations without proper validation, trusting external responses implicitly. | Validate and sanitize all data from third-party APIs; enforce allow-lists for redirects; apply timeouts and rate limits to third-party calls; use TLS for all integrations. |

## CWE/SANS Top 25 (Selected Critical Entries)

| CWE ID | Name | Description | Key Mitigations |
|--------|------|-------------|-----------------|
| CWE-79 | Cross-Site Scripting (XSS) | Improper neutralization of input during web page generation allows attackers to inject malicious scripts. | Context-aware output encoding; Content Security Policy (CSP); use frameworks that auto-escape by default; validate and sanitize all user input. |
| CWE-89 | SQL Injection | Improper neutralization of special elements in SQL commands allows attackers to execute arbitrary queries. | Parameterized queries (prepared statements); stored procedures; input validation; least-privilege database accounts. |
| CWE-22 | Path Traversal | Improper limitation of a pathname allows attackers to access files outside the intended directory. | Validate and canonicalize file paths; use chroot jails or sandboxes; deny-list `../` sequences; restrict file system permissions. |
| CWE-78 | OS Command Injection | Improper neutralization of special elements in OS commands allows attackers to execute arbitrary system commands. | Avoid OS commands from user input; use language APIs instead of shell commands; input validation with strict allow-lists; least-privilege execution. |
| CWE-352 | Cross-Site Request Forgery (CSRF) | Attacker tricks an authenticated user's browser into sending a forged request to a vulnerable application. | Anti-CSRF tokens (synchronizer pattern); SameSite cookie attribute; verify Origin/Referer headers; require re-authentication for sensitive operations. |
| CWE-434 | Unrestricted Upload of File with Dangerous Type | Application allows uploading of files without validating type, size, or content, enabling code execution. | Validate file type by content (magic bytes), not extension alone; store uploads outside webroot; rename files; enforce size limits; scan for malware. |
| CWE-416 | Use After Free | Referencing memory after it has been freed can lead to program crashes, arbitrary code execution, or data corruption. | Use memory-safe languages (Rust, Go, C#); enable compiler protections (ASLR, stack canaries); use smart pointers; static analysis tools. |
| CWE-400 | Uncontrolled Resource Consumption | Application does not properly restrict resource usage, enabling denial of service. | Implement rate limiting; set timeouts and resource quotas; validate input sizes; use circuit breakers; monitor resource consumption. |
| CWE-200 | Exposure of Sensitive Information to an Unauthorized Actor | Application unintentionally reveals sensitive data through error messages, logs, or API responses. | Suppress detailed error messages in production; filter sensitive data from logs; use generic error pages; review API responses for data leakage. |
| CWE-269 | Improper Privilege Management | Application does not properly manage privileges, allowing users to gain elevated access. | Enforce least privilege; validate authorization on every request; use role-based or attribute-based access control; audit privilege escalation paths. |

## Mapping Between Lists

The OWASP Top 10 categories map to specific CWE entries, creating a bridge between the high-level risk taxonomy and granular vulnerability types:

- **A01 Broken Access Control** maps to CWE-200 (Information Disclosure), CWE-269 (Improper Privilege Management), CWE-352 (CSRF), and CWE-22 (Path Traversal).
- **A02 Cryptographic Failures** maps to CWE-259 (Hard-coded Password), CWE-327 (Broken Crypto Algorithm), and CWE-331 (Insufficient Entropy).
- **A03 Injection** maps to CWE-79 (XSS), CWE-89 (SQL Injection), and CWE-78 (OS Command Injection).
- **A04 Insecure Design** maps to CWE-209 (Error Information Leak), CWE-256 (Plaintext Storage of Password), and CWE-501 (Trust Boundary Violation).
- **A05 Security Misconfiguration** maps to CWE-16 (Configuration), CWE-611 (XXE), and CWE-1004 (Sensitive Cookie Without HttpOnly).
- **A06 Vulnerable and Outdated Components** maps to CWE-1104 (Use of Unmaintained Third-Party Components).
- **A07 Identification and Authentication Failures** maps to CWE-287 (Improper Authentication), CWE-384 (Session Fixation), and CWE-798 (Hard-coded Credentials).
- **A08 Software and Data Integrity Failures** maps to CWE-502 (Deserialization of Untrusted Data) and CWE-829 (Inclusion of Untrusted Functionality).
- **A09 Security Logging and Monitoring Failures** maps to CWE-778 (Insufficient Logging) and CWE-223 (Omission of Security-Relevant Information).
- **A10 Server-Side Request Forgery** maps to CWE-918 (SSRF).

This mapping helps teams trace a high-level OWASP finding down to specific CWE entries for detailed remediation guidance, and vice versa.

## Best Practices

- **Start with the OWASP Top 10 as a baseline**: treat these categories as the minimum set of risks every application must address, not as an exhaustive security program.
- **Map vulnerabilities to CWEs**: use CWE identifiers to communicate precisely about vulnerability types across teams, tools, and reports.
- **Automate checks in CI/CD**: integrate SAST, DAST, and SCA tools that map findings to OWASP and CWE categories for consistent tracking.
- **Revisit lists on each release cycle**: OWASP updates its Top 10 periodically; ensure your security baselines reflect the latest version.
- **Combine lists for full coverage**: no single list covers everything; use the OWASP Top 10, API Security Top 10, and CWE Top 25 together for comprehensive risk coverage.
- **Train developers on the Top 10**: security awareness training centered on OWASP categories is one of the highest-ROI investments for reducing vulnerabilities at the source.
