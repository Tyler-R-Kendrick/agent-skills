# Topaz

## Overview
Topaz provides fine-grained, policy-based authorization for applications with relationship-based access control.

## Example
```csharp
// Define relationships and permissions
var client = new TopazClient();

// Check permission
var canEdit = await client.CheckAsync(new CheckRequest
{
    Subject = "user:alice",
    Relation = "editor",
    Object = "document:123"
});

// Define policies
{
  "document": {
    "relations": {
      "owner": {},
      "editor": {},
      "viewer": {}
    },
    "permissions": {
      "edit": "owner + editor",
      "view": "viewer + edit"
    }
  }
}
```

## Best Practices
- Model relationships carefully
- Use hierarchical permissions
- Cache authorization decisions
- Audit access patterns
