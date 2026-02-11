# Moq

## Overview
Moq is a mocking library for .NET that allows creation of test doubles for interfaces and virtual methods.

## Example
```csharp
using Moq;

var mockRepo = new Mock<IUserRepository>();
mockRepo
    .Setup(r => r.GetByIdAsync(123))
    .ReturnsAsync(new User { Id = 123, Name = "John" });

var service = new UserService(mockRepo.Object);
var user = await service.GetUserAsync(123);

// Verify
mockRepo.Verify(r => r.GetByIdAsync(123), Times.Once);
```

## Best Practices
- Mock interfaces, not implementations
- Use strict mocks to catch unexpected calls
- Verify important interactions
- Avoid over-mocking
- Use It.Is for parameter matching
- Setup only what you need
