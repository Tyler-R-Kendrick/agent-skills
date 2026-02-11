# Validot

## Overview
Validot is a performance-focused validation library for .NET with fluent syntax.

## Example
```csharp
using Validot;

Specification<User> userSpec = s => s
    .Member(m => m.Email, m => m.Email())
    .Member(m => m.Age, m => m.GreaterThanOrEqualTo(18))
    .Member(m => m.Name, m => m.NotEmpty().MaxLength(100));

var validator = Validator.Factory.Create(userSpec);

var result = validator.Validate(user);
if (!result.AnyErrors)
{
    // Valid
}
```

## Best Practices
- Create reusable specifications
- Compose complex rules
- Use appropriate error messages
- Validate at boundaries
- Consider performance
