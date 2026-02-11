# CommunityToolkit Guard

## Overview
Use `CommunityToolkit.Diagnostics.Guard` for concise, consistent guard clauses and better static analysis hints.

## When to use
- Enforcing argument constraints inside type boundaries.
- Validating invariants in constructors and factory methods.

## Example
```csharp
using CommunityToolkit.Diagnostics;

public sealed class Widget(ValueString name)
{
	public ValueString Name { get; } = Guard.IsNotNull(name);
}
```

## Guidance
- Prefer guard clauses inside value types and constructors, not at call sites.
- Use `Guard.IsNotNullOrWhiteSpace` for string boundaries.