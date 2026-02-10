---
description: Guidance for Casbin authorization library (Enforcer).
metadata:
  displayName: Enforcer (Casbin)
---

# Enforcer (Casbin)

## Overview
Casbin is an authorization library supporting various access control models like ACL, RBAC, and ABAC.

## Example
```csharp
using NetCasbin;

var enforcer = new Enforcer("model.conf", "policy.csv");

// Check permission
if (await enforcer.EnforceAsync("alice", "data1", "read"))
{
    // Alice can read data1
}

// model.conf (RBAC)
[role_definition]
g = _, _

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act

// policy.csv
p, admin, data1, read
p, admin, data1, write
g, alice, admin
```

## Best Practices
- Choose appropriate model (ACL/RBAC/ABAC)
- Store policies in database for production
- Cache enforcement decisions
- Use adapters for persistence
