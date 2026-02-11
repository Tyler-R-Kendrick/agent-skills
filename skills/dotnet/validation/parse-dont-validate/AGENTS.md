# Parse, Don't Validate

## Overview
"Parse, Don't Validate" is a principle where data is transformed into types that make invalid states unrepresentable, rather than validating and passing raw data.

## Concept
```csharp
// Bad: Validate and pass string
public void SendEmail(string email)
{
    if (!IsValidEmail(email))
        throw new ArgumentException("Invalid email");
    // Use email...
}

// Good: Parse into type
public record EmailAddress
{
    private readonly string _value;
    
    private EmailAddress(string value) => _value = value;
    
    public static Result<EmailAddress> Parse(string input)
    {
        if (!IsValidEmail(input))
            return Result.Failure("Invalid email");
        return Result.Success(new EmailAddress(input));
    }
}

public void SendEmail(EmailAddress email)
{
    // email is guaranteed valid
}
```

## Best Practices
- Create domain-specific types
- Parse at boundaries
- Make illegal states unrepresentable
- Use Result or Either for parse failures
- Encode invariants in types
