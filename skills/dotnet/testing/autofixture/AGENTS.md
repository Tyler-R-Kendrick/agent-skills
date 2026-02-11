# AutoFixture

## Overview
AutoFixture is a library that minimizes the 'Arrange' phase of unit tests by auto-generating test data.

## Example
```csharp
using AutoFixture;

var fixture = new Fixture();

// Generate simple types
var number = fixture.Create<int>();
var text = fixture.Create<string>();

// Generate complex objects
var user = fixture.Create<User>();

// Customize generation
fixture.Customize<User>(c => c
    .With(u => u.Age, 25)
    .Without(u => u.Id));

// Collections
var users = fixture.CreateMany<User>(10);
```

## Best Practices
- Use for arrange phase
- Customize when needed
- Combine with Moq via AutoMoq
- Keep tests focused
- Use conventions
