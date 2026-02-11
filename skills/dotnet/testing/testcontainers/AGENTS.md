# Testcontainers

## Overview
Testcontainers provides throwaway Docker containers for integration testing.

## Example
```csharp
using Testcontainers.PostgreSql;

public class DatabaseTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder()
        .WithDatabase("testdb")
        .WithUsername("user")
        .WithPassword("password")
        .Build();
    
    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();
    }
    
    [Fact]
    public async Task TestDatabase()
    {
        var connectionString = _postgres.GetConnectionString();
        // Use connection string for tests
    }
    
    public async Task DisposeAsync()
    {
        await _postgres.DisposeAsync();
    }
}
```

## Best Practices
- Use for integration tests
- Implement IAsyncLifetime
- Configure appropriate timeouts
- Use images from trusted sources
- Clean up containers properly
