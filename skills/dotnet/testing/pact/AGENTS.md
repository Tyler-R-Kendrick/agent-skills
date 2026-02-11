# Pact

## Overview
Pact is a contract testing framework that ensures API compatibility between consumers and providers.

## Example
```csharp
// Consumer test
[Fact]
public async Task GetUser_Returns_User()
{
    _mockProviderService
        .Given("User 123 exists")
        .UponReceiving("A request for user 123")
        .With(new ProviderServiceRequest
        {
            Method = HttpVerb.Get,
            Path = "/api/users/123"
        })
        .WillRespondWith(new ProviderServiceResponse
        {
            Status = 200,
            Body = new { Id = 123, Name = "John" }
        });

    var result = await _client.GetUserAsync(123);
    Assert.Equal("John", result.Name);
}
```

## Best Practices
- Define clear contracts
- Version your contracts
- Share pacts between teams
- Verify provider compliance
- Use provider states
