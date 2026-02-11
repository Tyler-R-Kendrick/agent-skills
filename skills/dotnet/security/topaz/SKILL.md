---
name: topaz
description: >
  Guidance for Topaz fine-grained, relationship-based authorization.
  USE FOR: fine-grained permissions, relationship-based access control (ReBAC), Google Zanzibar-style
  authorization, directory-based identity resolution, policy-as-code with OPA/Rego, hierarchical
  permission models (owner > editor > viewer).
  DO NOT USE FOR: simple RBAC (use Casbin/Enforcer), authentication (use ASP.NET Core Identity),
  input sanitization (use Hygiene), or encryption (use CryptoNet).
license: MIT
metadata:
  displayName: "Topaz"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Topaz

## Overview

Topaz is an open-source, fine-grained authorization engine from Aserto that combines three authorization paradigms: relationship-based access control (ReBAC) inspired by Google Zanzibar, attribute-based access control (ABAC), and policy-based access control via Open Policy Agent (OPA) with Rego policies. Topaz runs as a sidecar or standalone service with a gRPC/REST API. The .NET integration uses the Aserto client SDK to check permissions, manage directory objects and relationships, and evaluate policies. Topaz is ideal for applications that need document-level, resource-level, or hierarchical permission models.

## Client Setup and Configuration

Install the Aserto SDK and configure the Topaz client.

```csharp
using Aserto.Clients.Authorizer;
using Aserto.Clients.Directory;
using Microsoft.Extensions.DependencyInjection;

// Program.cs registration
builder.Services.AddAsertoAuthorization(options =>
{
    options.ServiceUrl = "https://localhost:8282";
    options.TenantId = "";  // empty for local Topaz
    options.ApiKey = "";    // empty for local Topaz
    options.Insecure = true; // dev only; use TLS in production
});

builder.Services.AddAsertoDirectory(options =>
{
    options.ServiceUrl = "https://localhost:9292";
    options.TenantId = "";
    options.ApiKey = "";
    options.Insecure = true;
});
```

## Permission Checks

Use the authorizer client to check if a subject has a permission on an object.

```csharp
using Aserto.Clients.Authorizer;
using Aserto.Authorizer.V2;
using Aserto.Authorizer.V2.Api;
using Google.Protobuf.WellKnownTypes;

public class AuthorizationService
{
    private readonly AuthorizerClient _authorizer;

    public AuthorizationService(AuthorizerClient authorizer)
    {
        _authorizer = authorizer;
    }

    public async Task<bool> CanEditDocumentAsync(string userId, string documentId)
    {
        var request = new IsRequest
        {
            PolicyContext = new PolicyContext
            {
                Path = "documentpermissions.check",
                Decisions = { "allowed" }
            },
            IdentityContext = new IdentityContext
            {
                Type = IdentityType.Sub,
                Identity = userId
            },
            ResourceContext = new Struct
            {
                Fields =
                {
                    ["object_type"] = Value.ForString("document"),
                    ["object_id"] = Value.ForString(documentId),
                    ["relation"] = Value.ForString("editor")
                }
            }
        };

        var response = await _authorizer.IsAsync(request);
        return response.Decisions
            .FirstOrDefault()?.Is ?? false;
    }
}
```

## Directory Management

Create objects and relationships in the Topaz directory to model your permission graph.

```csharp
using Aserto.Clients.Directory;
using Aserto.Directory.Common.V3;
using Aserto.Directory.Writer.V3;
using Aserto.Directory.Reader.V3;

public class DirectoryService
{
    private readonly DirectoryClient _directory;

    public DirectoryService(DirectoryClient directory)
    {
        _directory = directory;
    }

    // Create a user object
    public async Task CreateUserAsync(string userId, string displayName)
    {
        await _directory.SetObjectAsync(new SetObjectRequest
        {
            Object = new Object
            {
                Type = "user",
                Id = userId,
                DisplayName = displayName
            }
        });
    }

    // Create a document object
    public async Task CreateDocumentAsync(string docId, string title)
    {
        await _directory.SetObjectAsync(new SetObjectRequest
        {
            Object = new Object
            {
                Type = "document",
                Id = docId,
                DisplayName = title
            }
        });
    }

    // Assign a user as editor of a document
    public async Task AssignEditorAsync(string userId, string documentId)
    {
        await _directory.SetRelationAsync(new SetRelationRequest
        {
            Relation = new Relation
            {
                SubjectType = "user",
                SubjectId = userId,
                Relation_ = "editor",
                ObjectType = "document",
                ObjectId = documentId
            }
        });
    }

    // Check a relationship
    public async Task<bool> IsEditorAsync(string userId, string documentId)
    {
        var response = await _directory.CheckRelationAsync(
            new CheckRelationRequest
            {
                SubjectType = "user",
                SubjectId = userId,
                Relation = "editor",
                ObjectType = "document",
                ObjectId = documentId
            });

        return response.Check;
    }
}
```

## Authorization Model Definition

Define your authorization model manifest that describes object types, relations, and permissions.

```yaml
# manifest.yaml - Topaz authorization model
model:
  version: 3

types:
  user: {}

  group:
    relations:
      member: user

  organization:
    relations:
      admin: user | group#member
      member: user | group#member
    permissions:
      can_manage: admin
      can_view: admin | member

  document:
    relations:
      owner: user
      editor: user | group#member
      viewer: user | group#member | organization#member
    permissions:
      can_delete: owner
      can_edit: owner | editor
      can_view: owner | editor | viewer
```

## ASP.NET Core Middleware Integration

Protect API endpoints using Topaz authorization middleware.

```csharp
using Aserto.AspNetCore.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// Program.cs
builder.Services.AddAsertoAuthorization(builder.Configuration);
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("TopazPolicy", policy =>
        policy.Requirements.Add(new AsertoDecisionRequirement("allowed")));
});

// Controller with Topaz-protected endpoints
[ApiController]
[Route("api/[controller]")]
public class DocumentsController : ControllerBase
{
    private readonly DirectoryService _directory;
    private readonly AuthorizationService _authService;

    public DocumentsController(
        DirectoryService directory,
        AuthorizationService authService)
    {
        _directory = directory;
        _authService = authService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDocument(string id)
    {
        string userId = User.FindFirst("sub")?.Value
            ?? throw new UnauthorizedAccessException();

        bool canView = await _authService.CanEditDocumentAsync(userId, id);
        if (!canView)
            return Forbid();

        // Fetch and return document
        return Ok(new { Id = id, Title = "Sample Document" });
    }

    [HttpPost]
    public async Task<IActionResult> CreateDocument(
        [FromBody] CreateDocumentRequest request)
    {
        string userId = User.FindFirst("sub")?.Value
            ?? throw new UnauthorizedAccessException();

        string docId = Guid.NewGuid().ToString();
        await _directory.CreateDocumentAsync(docId, request.Title);
        await _directory.AssignEditorAsync(userId, docId);

        return Created($"/api/documents/{docId}",
            new { Id = docId, Title = request.Title });
    }
}
```

## Authorization Model Comparison

| Feature | Topaz (ReBAC) | Casbin (RBAC) | ASP.NET Policies |
|---------|--------------|---------------|------------------|
| Model | Relationship graph | PERM metamodel | Code-based handlers |
| Granularity | Per-resource | Per-role/action | Per-policy |
| Scalability | Distributed (sidecar) | In-process | In-process |
| Policy language | Rego (OPA) | Casbin DSL | C# |
| Multi-tenancy | Built-in (directory) | Domain RBAC | Custom |
| Best for | Document/resource ACLs | API endpoint RBAC | Simple claim checks |

## Best Practices

1. **Model your permission hierarchy carefully before writing code**: draw the object types, relations, and permission inheritance (`can_edit: owner | editor`) on paper or in a diagram before defining the manifest.
2. **Use the Topaz directory as the single source of truth for relationships**: store all user-to-resource relationships in the Topaz directory rather than duplicating them in your application database.
3. **Run Topaz as a sidecar in production**: deploy Topaz alongside your application container for low-latency authorization checks instead of calling a remote shared instance.
4. **Batch relationship writes when provisioning resources**: when a user creates a document, set the `owner` relationship in the same transaction as the document creation to avoid permission gaps.
5. **Use `CheckPermission` instead of `CheckRelation`**: permissions resolve the full inheritance graph (owner implies editor implies viewer), while relation checks only match direct assignments.
6. **Cache authorization decisions at the edge for read-heavy workloads**: use a short TTL cache (15-30 seconds) for permission checks on resources that change infrequently.
7. **Write Rego policies for complex business rules**: use OPA/Rego policies for time-based access, IP restrictions, or attribute-based conditions that cannot be expressed as simple relationships.
8. **Test your authorization model with the Topaz CLI**: use `topaz test exec` to run assertion-based tests against your manifest and policies before deploying changes.
9. **Audit relationship changes**: log all `SetRelation` and `DeleteRelation` calls with the actor, timestamp, and affected subject/object for compliance and debugging.
10. **Separate authorization concerns from business logic**: inject an `IAuthorizationService` wrapper around the Topaz client so controllers only call `CanEditAsync(userId, resourceId)` without knowing about Topaz internals.
