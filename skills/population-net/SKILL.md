---
description: Guidance for Population.NET GraphQL-like projection library.
metadata:
  displayName: Population.NET
---

# Population.NET

## Overview
Population.NET provides GraphQL-like selective field projection for reducing over-fetching in APIs.

## Example
```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public Address Address { get; set; }
}

// API
[HttpGet]
public IActionResult GetUsers([FromQuery] string fields)
{
    var users = _db.Users.AsQueryable();
    return Ok(users.Project(fields));  // Only requested fields
}

// Request: /api/users?fields=id,name,address.city
// Response: Only id, name, and address.city fields
```

## Best Practices
- Validate field names
- Limit nesting depth
- Handle complex projections carefully
- Document available fields
- Consider performance implications
