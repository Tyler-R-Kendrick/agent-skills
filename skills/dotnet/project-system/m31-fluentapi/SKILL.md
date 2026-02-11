---
name: m31-fluentapi
description: >
  USE FOR: Generating type-safe fluent builder APIs from C# classes using source generation,
  enforcing required property ordering and compile-time validation of builder step sequences.
  DO NOT USE FOR: Runtime builder patterns, general-purpose object mapping, or serialization
  scenarios where AutoMapper or System.Text.Json would be more appropriate.
license: MIT
metadata:
  displayName: M31.FluentAPI
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# M31.FluentAPI

## Overview

M31.FluentAPI is a source generator that creates fluent builder APIs from annotated C# classes. By decorating a class and its members with attributes, the generator produces a step-by-step builder where each method returns the next step's interface, enforcing a compile-time ordering of property assignments. This eliminates the possibility of forgetting required properties or calling builder methods in the wrong order.

The generated code uses interfaces to represent each step in the fluent chain, producing IntelliSense-friendly builders that guide developers through the construction process. M31.FluentAPI supports required steps, optional steps, forking paths, and collections.

## Installation

```bash
dotnet add package M31.FluentApi
```

The package includes the source generator and attributes. No runtime dependency is required because all code is generated at compile time.

## Basic Builder Generation

Annotate a class with `[FluentApi]` and each property with `[FluentMember]` to specify the builder step order.

```csharp
using M31.FluentApi.Attributes;

namespace MyApp.Models;

[FluentApi]
public class CreateUserRequest
{
    [FluentMember(0, "WithName")]
    public string Name { get; init; } = string.Empty;

    [FluentMember(1, "WithEmail")]
    public string Email { get; init; } = string.Empty;

    [FluentMember(2, "WithAge")]
    public int Age { get; init; }

    [FluentMember(3, "InDepartment")]
    public string Department { get; init; } = string.Empty;
}
```

The generated builder enforces the step order at compile time:

```csharp
using MyApp.Models;

// Each method returns the next step's interface - the order is enforced by the compiler
CreateUserRequest user = CreateCreateUserRequest
    .WithName("Alice Johnson")
    .WithEmail("alice@example.com")
    .WithAge(32)
    .InDepartment("Engineering");

// This will NOT compile because steps are out of order:
// CreateCreateUserRequest.WithEmail("alice@example.com").WithName("Alice Johnson")...
// Error: 'ICreateCreateUserRequest_WithEmail' does not contain 'WithName'
```

## Optional and Nullable Members

Use `[FluentNullableMember]` for optional properties that can be skipped in the builder chain.

```csharp
using M31.FluentApi.Attributes;

namespace MyApp.Models;

[FluentApi]
public class ServerConfiguration
{
    [FluentMember(0, "WithHost")]
    public string Host { get; init; } = "localhost";

    [FluentMember(1, "WithPort")]
    public int Port { get; init; } = 8080;

    [FluentNullableMember(2, "WithCertificatePath")]
    public string? CertificatePath { get; init; }

    [FluentNullableMember(3, "WithApiKey")]
    public string? ApiKey { get; init; }

    [FluentMember(4, "WithMaxConnections")]
    public int MaxConnections { get; init; } = 100;
}
```

```csharp
using MyApp.Models;

// With optional properties provided
ServerConfiguration withSsl = CreateServerConfiguration
    .WithHost("api.example.com")
    .WithPort(443)
    .WithCertificatePath("/etc/ssl/cert.pem")
    .WithApiKey("sk-abc123")
    .WithMaxConnections(500);

// With optional properties skipped (null)
ServerConfiguration withoutSsl = CreateServerConfiguration
    .WithHost("localhost")
    .WithPort(8080)
    .WithoutCertificatePath()   // generated skip method
    .WithoutApiKey()             // generated skip method
    .WithMaxConnections(100);
```

## Collection Members

Use `[FluentCollection]` for properties that accept multiple values.

```csharp
using System.Collections.Generic;
using M31.FluentApi.Attributes;

namespace MyApp.Models;

[FluentApi]
public class EmailMessage
{
    [FluentMember(0, "From")]
    public string Sender { get; init; } = string.Empty;

    [FluentCollection(1, "WithRecipient", "WithRecipients")]
    public IReadOnlyList<string> Recipients { get; init; } = new List<string>();

    [FluentMember(2, "WithSubject")]
    public string Subject { get; init; } = string.Empty;

    [FluentMember(3, "WithBody")]
    public string Body { get; init; } = string.Empty;

    [FluentNullableCollection(4, "WithAttachment", "WithAttachments")]
    public IReadOnlyList<string>? AttachmentPaths { get; init; }
}
```

```csharp
using MyApp.Models;

// Single recipient
EmailMessage single = CreateEmailMessage
    .From("noreply@example.com")
    .WithRecipient("user@example.com")
    .WithSubject("Welcome")
    .WithBody("Hello and welcome!")
    .WithoutAttachmentPaths();

// Multiple recipients
EmailMessage bulk = CreateEmailMessage
    .From("admin@example.com")
    .WithRecipients(new[] { "team@example.com", "leads@example.com" })
    .WithSubject("Sprint Review")
    .WithBody("Please join the review meeting.")
    .WithAttachments(new[] { "/reports/sprint-15.pdf", "/reports/burndown.png" });
```

## Fluent Method Branching

Use `[FluentMethod]` to add custom builder methods that perform logic during construction.

```csharp
using M31.FluentApi.Attributes;

namespace MyApp.Models;

[FluentApi]
public class HttpRequest
{
    [FluentMember(0, "ToUrl")]
    public string Url { get; init; } = string.Empty;

    [FluentMember(1, "UsingMethod")]
    public string Method { get; init; } = "GET";

    [FluentNullableMember(2, "WithBody")]
    public string? RequestBody { get; init; }

    [FluentMember(3, "WithTimeout")]
    public TimeSpan Timeout { get; init; } = TimeSpan.FromSeconds(30);

    // Convenience methods using [FluentMethod] that set multiple properties
    [FluentMethod(1)]
    public void AsGet()
    {
        // This sets Method = "GET" and RequestBody = null
    }

    [FluentMethod(1)]
    public void AsPost(string body)
    {
        // This sets Method = "POST" and RequestBody = body
    }
}
```

## Combining with Validation

M31.FluentAPI pairs well with validation libraries. Apply validation in a factory method or constructor.

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using M31.FluentApi.Attributes;

namespace MyApp.Models;

[FluentApi]
public class PaymentRequest
{
    [FluentMember(0, "ForAmount")]
    public decimal Amount { get; init; }

    [FluentMember(1, "InCurrency")]
    public string Currency { get; init; } = "USD";

    [FluentMember(2, "FromAccount")]
    public string SourceAccountId { get; init; } = string.Empty;

    [FluentMember(3, "ToAccount")]
    public string DestinationAccountId { get; init; } = string.Empty;

    public void Validate()
    {
        if (Amount <= 0)
            throw new ValidationException("Amount must be greater than zero.");
        if (string.IsNullOrWhiteSpace(Currency) || Currency.Length != 3)
            throw new ValidationException("Currency must be a 3-letter ISO code.");
        if (SourceAccountId == DestinationAccountId)
            throw new ValidationException("Source and destination accounts must differ.");
    }
}
```

```csharp
using MyApp.Models;

PaymentRequest payment = CreatePaymentRequest
    .ForAmount(150.00m)
    .InCurrency("EUR")
    .FromAccount("acct-001")
    .ToAccount("acct-002");

payment.Validate(); // throws if invalid
```

## M31.FluentAPI vs Manual Builder Pattern

| Aspect                    | M31.FluentAPI                          | Manual Builder                       |
|---------------------------|----------------------------------------|--------------------------------------|
| Boilerplate               | None (source-generated)                | ~20-50 lines per class               |
| Step ordering             | Compile-time enforced                  | No enforcement (runtime only)        |
| Optional steps            | Built-in `[FluentNullableMember]`      | Manual branching logic               |
| Collections               | Built-in `[FluentCollection]`          | Custom `AddItem` / `WithItems`       |
| Maintenance               | Change attribute, regenerate           | Update builder class manually        |
| IntelliSense guidance     | Only valid next steps shown            | All methods shown at every step      |
| Debuggability             | Step into generated code               | Step into manual builder             |
| Runtime overhead          | Zero (compile-time only)               | Zero (both are allocation patterns)  |

## Best Practices

1. **Use numeric step indices starting from 0 in `[FluentMember]` to define the exact builder step order** because the generator uses these indices to create the interface chain; gaps in numbering are allowed and can ease future insertions.

2. **Mark optional properties with `[FluentNullableMember]` instead of providing default values** so that the generated builder exposes both a `WithX(value)` method and a `WithoutX()` skip method, making the optionality explicit to consumers.

3. **Declare the target class as `partial`** if you need to add custom methods or validation logic alongside the generated builder; the generator emits a companion partial class with the builder factory.

4. **Use `init`-only setters (`{ get; init; }`) rather than mutable setters (`{ get; set; }`)** to make constructed objects immutable after the builder completes, preventing accidental mutation after construction.

5. **Give builder method names verb-preposition prefixes like `WithName`, `ForAmount`, `InDepartment`, `UsingMethod`** to create readable fluent sentences; avoid generic names like `SetName` that do not flow naturally.

6. **Use `[FluentCollection]` with `IReadOnlyList<T>` rather than `List<T>`** so that the built object exposes an immutable view of the collection; the generator handles the mutable list internally during construction.

7. **Place `[FluentApi]` classes in a dedicated `Models` or `Contracts` namespace** to keep generated builder classes (which are named `Create{ClassName}`) organized and discoverable without polluting service or handler namespaces.

8. **Validate the constructed object immediately after building by calling a `Validate()` method or using `IValidatableObject`** because the builder enforces property presence but cannot enforce business rules like "amount must be positive."

9. **Regenerate and inspect generated code after changing step indices or adding new members** using IDE source-generator output viewers (Analyzers > {generator} > Generated) to verify the interface chain matches your intent.

10. **Pin the M31.FluentApi package version in `Directory.Packages.props`** because source generator output can change between versions; unpinned versions may cause build breaks when a new generator version changes the output shape.
