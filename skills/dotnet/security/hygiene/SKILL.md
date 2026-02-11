---
name: hygiene
description: >
  Guidance for input sanitization, output encoding, and security hygiene in .NET.
  USE FOR: preventing XSS attacks, SQL injection prevention, HTML/URL/JavaScript encoding,
  input validation, Content Security Policy headers, CSRF protection, secure HTTP headers.
  DO NOT USE FOR: authentication flows (use ASP.NET Core Identity), encryption at rest (use CryptoNet),
  authorization policies (use Casbin/Enforcer), or certificate management.
license: MIT
metadata:
  displayName: "Security Hygiene & Sanitization"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Security Hygiene & Sanitization

## Overview

Security hygiene covers the defensive coding practices that prevent common web vulnerabilities: cross-site scripting (XSS), SQL injection, cross-site request forgery (CSRF), header injection, and path traversal. In .NET, these protections come from built-in encoders (`System.Text.Encodings.Web`), parameterized queries, antiforgery tokens, and secure HTTP header middleware. Proper hygiene means validating all input at the boundary, encoding all output for its context, and applying defense-in-depth with HTTP security headers.

## Output Encoding for XSS Prevention

Always encode output based on the rendering context: HTML body, HTML attribute, URL, or JavaScript.

```csharp
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc;

public class SafeOutputController : ControllerBase
{
    private readonly HtmlEncoder _htmlEncoder;
    private readonly UrlEncoder _urlEncoder;
    private readonly JavaScriptEncoder _jsEncoder;

    public SafeOutputController(
        HtmlEncoder htmlEncoder,
        UrlEncoder urlEncoder,
        JavaScriptEncoder jsEncoder)
    {
        _htmlEncoder = htmlEncoder;
        _urlEncoder = urlEncoder;
        _jsEncoder = jsEncoder;
    }

    [HttpGet("profile")]
    public IActionResult GetProfile(string displayName)
    {
        // HTML context: encode for safe rendering in HTML body
        string safeHtml = _htmlEncoder.Encode(displayName);

        // URL context: encode for query string or path segment
        string safeUrl = _urlEncoder.Encode(displayName);

        // JavaScript context: encode for inline script blocks
        string safeJs = _jsEncoder.Encode(displayName);

        return Ok(new
        {
            HtmlSafe = safeHtml,
            RedirectUrl = $"/users?name={safeUrl}",
            ScriptValue = safeJs
        });
    }
}
```

## SQL Injection Prevention

Use parameterized queries with Dapper, EF Core, or raw ADO.NET. Never concatenate user input into SQL strings.

```csharp
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;

public class UserRepository
{
    private readonly IDbConnection _connection;

    public UserRepository(IDbConnection connection)
    {
        _connection = connection;
    }

    // CORRECT: parameterized query with Dapper
    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _connection.QuerySingleOrDefaultAsync<User>(
            "SELECT Id, Email, DisplayName FROM Users WHERE Email = @Email",
            new { Email = email });
    }

    // CORRECT: parameterized query with raw ADO.NET
    public async Task<bool> ExistsAsync(string username, SqlConnection conn)
    {
        using var cmd = new SqlCommand(
            "SELECT COUNT(1) FROM Users WHERE Username = @Username", conn);
        cmd.Parameters.Add("@Username", SqlDbType.NVarChar, 256).Value = username;
        var count = (int)(await cmd.ExecuteScalarAsync())!;
        return count > 0;
    }

    // WRONG: never do this
    // var sql = $"SELECT * FROM Users WHERE Email = '{email}'";
}
```

## Input Validation

Validate all external input at the API boundary using data annotations and FluentValidation.

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

public class CreateUserRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    [RegularExpression(@"^[a-zA-Z0-9\s\-]+$",
        ErrorMessage = "Display name contains invalid characters.")]
    public string DisplayName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(12)]
    public string Password { get; set; } = string.Empty;

    [Range(13, 150)]
    public int Age { get; set; }

    [Url]
    public string? Website { get; set; }
}

[HttpPost("users")]
public IActionResult CreateUser([FromBody] CreateUserRequest request)
{
    if (!ModelState.IsValid)
        return ValidationProblem(ModelState);

    // Input has been validated, proceed safely
    return Ok();
}
```

## Security Headers Middleware

Apply HTTP security headers to every response to mitigate common attack vectors.

```csharp
using Microsoft.AspNetCore.Builder;

public static class SecurityHeadersExtensions
{
    public static IApplicationBuilder UseSecurityHeaders(
        this IApplicationBuilder app)
    {
        return app.Use(async (context, next) =>
        {
            var headers = context.Response.Headers;

            // Prevent MIME sniffing
            headers["X-Content-Type-Options"] = "nosniff";

            // Prevent clickjacking
            headers["X-Frame-Options"] = "DENY";

            // Control referrer leakage
            headers["Referrer-Policy"] = "strict-origin-when-cross-origin";

            // Content Security Policy
            headers["Content-Security-Policy"] =
                "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: https:; frame-ancestors 'none'";

            // Strict Transport Security (HTTPS only)
            headers["Strict-Transport-Security"] =
                "max-age=31536000; includeSubDomains; preload";

            // Prevent XSS reflection (legacy browser support)
            headers["X-XSS-Protection"] = "1; mode=block";

            // Permissions Policy
            headers["Permissions-Policy"] =
                "camera=(), microphone=(), geolocation=(), payment=()";

            await next();
        });
    }
}

// Usage in Program.cs
var app = builder.Build();
app.UseSecurityHeaders();
app.UseHttpsRedirection();
app.UseAuthorization();
```

## CSRF Protection

Configure antiforgery tokens for state-changing requests in MVC and Razor Pages.

```csharp
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

// Program.cs configuration
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN";
    options.Cookie.Name = "XSRF-TOKEN";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Strict;
});

// API endpoint that provides the token
[HttpGet("antiforgery/token")]
public IActionResult GetAntiforgeryToken(
    [FromServices] IAntiforgery antiforgery)
{
    var tokens = antiforgery.GetAndStoreTokens(HttpContext);
    return Ok(new { token = tokens.RequestToken });
}

// Protected endpoint
[HttpPost("orders")]
[ValidateAntiForgeryToken]
public IActionResult CreateOrder([FromBody] OrderRequest request)
{
    // CSRF token validated automatically
    return Created($"/orders/{request.Id}", request);
}
```

## Path Traversal Prevention

Validate file paths to prevent directory traversal attacks.

```csharp
using System.IO;
using Microsoft.AspNetCore.Mvc;

public class FileController : ControllerBase
{
    private readonly string _uploadsRoot;

    public FileController(IWebHostEnvironment env)
    {
        _uploadsRoot = Path.Combine(env.ContentRootPath, "uploads");
    }

    [HttpGet("files/{fileName}")]
    public IActionResult DownloadFile(string fileName)
    {
        // Sanitize: remove path separators and parent references
        string sanitizedName = Path.GetFileName(fileName);

        if (string.IsNullOrWhiteSpace(sanitizedName))
            return BadRequest("Invalid file name.");

        string fullPath = Path.GetFullPath(
            Path.Combine(_uploadsRoot, sanitizedName));

        // Verify resolved path is within allowed directory
        if (!fullPath.StartsWith(_uploadsRoot, StringComparison.OrdinalIgnoreCase))
            return BadRequest("Access denied.");

        if (!System.IO.File.Exists(fullPath))
            return NotFound();

        return PhysicalFile(fullPath, "application/octet-stream", sanitizedName);
    }
}
```

## Vulnerability Prevention Summary

| Vulnerability | Prevention | .NET API |
|--------------|-----------|----------|
| XSS (Reflected) | Output encoding | `HtmlEncoder`, `UrlEncoder`, `JavaScriptEncoder` |
| XSS (Stored) | Input validation + output encoding | Data annotations + Razor auto-encoding |
| SQL Injection | Parameterized queries | `@param` in Dapper/EF Core, `SqlParameter` |
| CSRF | Antiforgery tokens | `IAntiforgery`, `[ValidateAntiForgeryToken]` |
| Clickjacking | X-Frame-Options header | Middleware: `X-Frame-Options: DENY` |
| MIME sniffing | X-Content-Type-Options | Middleware: `nosniff` |
| Path traversal | Path canonicalization | `Path.GetFullPath`, `StartsWith` check |
| Header injection | Framework handles | Kestrel rejects newlines in headers |

## Best Practices

1. **Encode output for its specific rendering context**: use `HtmlEncoder` for HTML bodies, `UrlEncoder` for URLs, and `JavaScriptEncoder` for inline scripts; never use a single encoding function for all contexts.
2. **Use parameterized queries everywhere without exception**: even for queries that appear safe today, always use `@param` syntax to prevent SQL injection if the query evolves to include user input later.
3. **Validate input at the API boundary with allowlists**: use `[RegularExpression]` and `[StringLength]` data annotations to define what valid input looks like rather than trying to blocklist dangerous characters.
4. **Apply security headers via middleware early in the pipeline**: register `UseSecurityHeaders()` before `UseRouting()` so every response, including error pages, includes protective headers.
5. **Set cookies with HttpOnly, Secure, and SameSite=Strict**: prevent JavaScript access to cookies with `HttpOnly`, require HTTPS with `Secure`, and block cross-origin sends with `SameSite`.
6. **Use `Path.GetFullPath` and verify the canonical path prefix**: after resolving a user-supplied file name, confirm the full path starts with your allowed directory to prevent `../` traversal.
7. **Never disable request validation or model binding validation**: if `ModelState.IsValid` is false, return `ValidationProblem()` immediately; do not proceed with invalid data.
8. **Configure Content Security Policy to block inline scripts**: use `script-src 'self'` without `'unsafe-inline'` and move all JavaScript to external files to prevent XSS through injected script tags.
9. **Log all validation failures with the source IP and input value**: track rejected inputs for threat intelligence, but sanitize the logged values to prevent log injection attacks.
10. **Run static analysis with `dotnet format` and security analyzers**: enable Roslyn security analyzers (`Microsoft.CodeAnalysis.NetAnalyzers`) to catch insecure patterns like string concatenation in SQL at compile time.
