# Enforcer (Casbin.NET)

## Overview

Casbin.NET is a powerful, efficient access control library for .NET that supports multiple access control models including ACL, RBAC, RBAC with domains (multi-tenancy), ABAC, and RESTful access control. At its core, Casbin uses a PERM (Policy, Effect, Request, Matchers) metamodel: you define a model configuration file that describes how authorization decisions are made, and a policy file (or database adapter) that stores the concrete permission rules. The `Enforcer` class evaluates requests against loaded policies at runtime.

## Basic ACL Setup

Define a simple access control list model and enforce it.

```csharp
using NetCasbin;
using NetCasbin.Model;

// model.conf content:
// [request_definition]
// r = sub, obj, act
// [policy_definition]
// p = sub, obj, act
// [policy_effect]
// e = some(where (p.eft == allow))
// [matchers]
// m = r.sub == p.sub && r.obj == p.obj && r.act == p.act

var enforcer = new Enforcer("model.conf", "policy.csv");

// policy.csv content:
// p, alice, data1, read
// p, bob, data2, write

bool allowed = await enforcer.EnforceAsync("alice", "data1", "read");
// allowed == true

bool denied = await enforcer.EnforceAsync("alice", "data1", "write");
// denied == false
```

## RBAC (Role-Based Access Control)

Add role definitions so users inherit permissions from their assigned roles.

```csharp
using NetCasbin;

// RBAC model adds role_definition:
// [role_definition]
// g = _, _
// [matchers]
// m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act

var enforcer = new Enforcer("rbac_model.conf", "rbac_policy.csv");

// rbac_policy.csv:
// p, admin, /api/users, GET
// p, admin, /api/users, POST
// p, admin, /api/users, DELETE
// p, editor, /api/posts, GET
// p, editor, /api/posts, POST
// g, alice, admin
// g, bob, editor

// Alice inherits admin permissions
bool canDelete = await enforcer.EnforceAsync("alice", "/api/users", "DELETE");
// canDelete == true

// Bob has editor role only
bool bobDelete = await enforcer.EnforceAsync("bob", "/api/users", "DELETE");
// bobDelete == false
```

## RBAC with Domains (Multi-Tenancy)

Support multi-tenant authorization with domain-scoped roles.

```csharp
using NetCasbin;

// Multi-tenant model:
// [request_definition]
// r = sub, dom, obj, act
// [policy_definition]
// p = sub, dom, obj, act
// [role_definition]
// g = _, _, _
// [matchers]
// m = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act

var enforcer = new Enforcer("rbac_with_domains_model.conf");

// Add policies programmatically
await enforcer.AddPolicyAsync("admin", "tenant1", "data1", "read");
await enforcer.AddPolicyAsync("admin", "tenant1", "data1", "write");
await enforcer.AddPolicyAsync("viewer", "tenant2", "data2", "read");

// Assign roles per domain
await enforcer.AddGroupingPolicyAsync("alice", "admin", "tenant1");
await enforcer.AddGroupingPolicyAsync("alice", "viewer", "tenant2");

// Alice is admin in tenant1
bool t1Write = await enforcer.EnforceAsync("alice", "tenant1", "data1", "write");
// t1Write == true

// Alice is only viewer in tenant2
bool t2Write = await enforcer.EnforceAsync("alice", "tenant2", "data2", "write");
// t2Write == false
```

## ASP.NET Core Integration

Create middleware and authorization handlers that use Casbin.

```csharp
using Microsoft.AspNetCore.Authorization;
using NetCasbin;

public class CasbinRequirement : IAuthorizationRequirement { }

public class CasbinAuthorizationHandler
    : AuthorizationHandler<CasbinRequirement>
{
    private readonly IEnforcer _enforcer;

    public CasbinAuthorizationHandler(IEnforcer enforcer)
    {
        _enforcer = enforcer;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        CasbinRequirement requirement)
    {
        if (context.Resource is HttpContext httpContext)
        {
            string user = context.User.Identity?.Name ?? "anonymous";
            string path = httpContext.Request.Path.Value ?? "/";
            string method = httpContext.Request.Method;

            if (await _enforcer.EnforceAsync(user, path, method))
            {
                context.Succeed(requirement);
            }
        }
    }
}

// Registration in Program.cs
builder.Services.AddSingleton<IEnforcer>(
    new Enforcer("model.conf", "policy.csv"));
builder.Services.AddSingleton<IAuthorizationHandler, CasbinAuthorizationHandler>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CasbinPolicy", policy =>
        policy.Requirements.Add(new CasbinRequirement()));
});
```

## Database Adapter for Persistence

Store policies in a database instead of CSV files for production use.

```csharp
using Casbin.Adapter.EFCore;
using Microsoft.EntityFrameworkCore;
using NetCasbin;

// Install: Casbin.Adapter.EFCore
var dbOptions = new DbContextOptionsBuilder<CasbinDbContext<int>>()
    .UseSqlServer(connectionString)
    .Options;

var adapter = new EFCoreAdapter<int>(dbOptions);
var enforcer = new Enforcer("model.conf", adapter);

// Policies are now stored in the database
await enforcer.AddPolicyAsync("alice", "/api/orders", "GET");
await enforcer.SavePolicyAsync();

// Load policies from database
await enforcer.LoadPolicyAsync();
```

## Access Control Model Comparison

| Model | Request Fields | Use Case | Complexity |
|-------|---------------|----------|------------|
| ACL | sub, obj, act | Simple per-user permissions | Low |
| RBAC | sub, obj, act + roles | Role hierarchies | Medium |
| RBAC w/ Domains | sub, dom, obj, act | Multi-tenant systems | Medium-High |
| ABAC | sub, obj, act + attrs | Dynamic attribute rules | High |
| RESTful | sub, path, method | API endpoint protection | Medium |

## Best Practices

1. **Choose the simplest model that meets your needs**: start with ACL or basic RBAC; only adopt ABAC or domain RBAC when simpler models cannot express your authorization requirements.
2. **Store policies in a database for production**: use `Casbin.Adapter.EFCore` or a Redis adapter instead of CSV files to support dynamic policy management and horizontal scaling.
3. **Cache enforcement decisions for hot paths**: use `IDistributedCache` to cache frequently checked permission results with short TTLs (30-60 seconds) to reduce evaluation overhead.
4. **Register the Enforcer as a singleton**: the Casbin `Enforcer` is thread-safe for reads and should be shared across requests; reload policies when they change using `LoadPolicyAsync()`.
5. **Use the ASP.NET Core authorization pipeline**: implement `IAuthorizationHandler` with a custom `IAuthorizationRequirement` rather than calling `EnforceAsync` directly in controllers.
6. **Separate model definitions from policy data**: keep `model.conf` in source control and policies in a database; never mix model logic with policy rules.
7. **Audit all policy changes**: log every `AddPolicyAsync`, `RemovePolicyAsync`, and `UpdatePolicyAsync` call with the actor, timestamp, and old/new values for compliance.
8. **Test authorization rules with dedicated unit tests**: write tests that verify both allowed and denied scenarios for each role and resource combination.
9. **Use role hierarchy for permission inheritance**: define `g = _, _` relationships so child roles inherit parent permissions, reducing policy duplication.
10. **Implement a policy management API**: expose admin endpoints for CRUD operations on policies rather than requiring database access or redeployments to change permissions.
