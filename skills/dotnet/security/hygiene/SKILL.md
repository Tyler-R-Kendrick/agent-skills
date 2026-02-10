---
description: Guidance for input sanitization and hygiene best practices.
metadata:
  displayName: Hygiene & Sanitizers
---

# Hygiene & Sanitizers

## Overview
Input sanitization and validation to prevent security vulnerabilities like XSS, SQL injection, and other attacks.

## Example
```csharp
using Microsoft.AspNetCore.Html;
using System.Web;

// HTML encoding
var safe = HttpUtility.HtmlEncode(userInput);

// URL encoding
var safeUrl = Uri.EscapeDataString(userInput);

// SQL parameterization
await connection.QueryAsync<User>(
    "SELECT * FROM Users WHERE Email = @email",
    new { email = userEmail });
```

## Best Practices
- Always validate and sanitize user input
- Use parameterized queries
- Encode output based on context (HTML, URL, JS)
- Implement allowlists over blocklists
- Use built-in sanitization libraries
- Never trust client-side validation alone
