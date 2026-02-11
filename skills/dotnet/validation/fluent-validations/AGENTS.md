# FluentValidation

## Overview
FluentValidation is a popular validation library that uses a fluent interface for building strongly-typed validation rules.

## Example
```csharp
public class CustomerValidator : AbstractValidator<Customer>
{
    public CustomerValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();
            
        RuleFor(x => x.Age)
            .GreaterThanOrEqualTo(18)
            .WithMessage("Must be 18 or older");
            
        RuleFor(x => x.PostalCode)
            .Matches(@"^\d{5}$")
            .When(x => x.Country == "US");
    }
}

// Usage
var validator = new CustomerValidator();
var result = await validator.ValidateAsync(customer);
```

## Best Practices
- Keep validators focused
- Use custom validators for complex logic
- Integrate with ASP.NET Core
- Provide clear error messages
- Use async validators when needed
