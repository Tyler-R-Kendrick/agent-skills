# Testcontainers

## Overview

Testcontainers for .NET provides programmatic control over Docker containers for integration testing. It creates throwaway containers (databases, message brokers, caches) that spin up before tests and tear down afterward, giving each test suite a clean, isolated infrastructure instance. Testcontainers supports pre-built modules for PostgreSQL, SQL Server, MySQL, MongoDB, Redis, RabbitMQ, Kafka, Elasticsearch, and more. It works with xUnit, NUnit, and MSTest, and runs in CI/CD environments that have Docker available (including GitHub Actions, Azure DevOps, and GitLab CI).

## PostgreSQL Integration Test

Spin up a PostgreSQL container and test against it with EF Core.

```csharp
using Microsoft.EntityFrameworkCore;
using Testcontainers.PostgreSql;
using Xunit;

public class PostgresTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres =
        new PostgreSqlBuilder()
            .WithDatabase("testdb")
            .WithUsername("testuser")
            .WithPassword("testpass")
            .WithImage("postgres:16-alpine")
            .Build();

    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();
    }

    [Fact]
    public async Task Can_Insert_And_Query_Users()
    {
        // Arrange: create DbContext with container connection string
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_postgres.GetConnectionString())
            .Options;

        await using var context = new AppDbContext(options);
        await context.Database.EnsureCreatedAsync();

        // Act: insert and query
        context.Users.Add(new User
        {
            Name = "Alice",
            Email = "alice@example.com"
        });
        await context.SaveChangesAsync();

        var user = await context.Users
            .FirstOrDefaultAsync(u => u.Email == "alice@example.com");

        // Assert
        Assert.NotNull(user);
        Assert.Equal("Alice", user.Name);
    }

    [Fact]
    public async Task Migrations_Apply_Successfully()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_postgres.GetConnectionString())
            .Options;

        await using var context = new AppDbContext(options);
        await context.Database.MigrateAsync();

        // Verify tables exist by querying
        bool canConnect = await context.Database.CanConnectAsync();
        Assert.True(canConnect);
    }

    public async Task DisposeAsync()
    {
        await _postgres.DisposeAsync();
    }
}
```

## SQL Server Integration Test

Use the MSSQL module for SQL Server testing.

```csharp
using Microsoft.EntityFrameworkCore;
using Testcontainers.MsSql;
using Xunit;

public class SqlServerTests : IAsyncLifetime
{
    private readonly MsSqlContainer _mssql =
        new MsSqlBuilder()
            .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
            .WithPassword("YourStrong!Passw0rd")
            .Build();

    public async Task InitializeAsync()
    {
        await _mssql.StartAsync();
    }

    [Fact]
    public async Task Can_Execute_Stored_Procedure()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(_mssql.GetConnectionString())
            .Options;

        await using var context = new AppDbContext(options);
        await context.Database.EnsureCreatedAsync();

        context.Users.Add(new User
        {
            Name = "Bob",
            Email = "bob@example.com"
        });
        await context.SaveChangesAsync();

        var count = await context.Users.CountAsync();
        Assert.Equal(1, count);
    }

    public async Task DisposeAsync()
    {
        await _mssql.DisposeAsync();
    }
}
```

## Redis Integration Test

Test caching operations against a real Redis container.

```csharp
using StackExchange.Redis;
using Testcontainers.Redis;
using Xunit;

public class RedisTests : IAsyncLifetime
{
    private readonly RedisContainer _redis =
        new RedisBuilder()
            .WithImage("redis:7-alpine")
            .Build();

    public async Task InitializeAsync()
    {
        await _redis.StartAsync();
    }

    [Fact]
    public async Task Can_Set_And_Get_Cache_Values()
    {
        // Connect to the Redis container
        var connection = await ConnectionMultiplexer
            .ConnectAsync(_redis.GetConnectionString());
        var db = connection.GetDatabase();

        // Set a value
        await db.StringSetAsync("user:1:name", "Alice",
            TimeSpan.FromMinutes(5));

        // Get the value back
        string? value = await db.StringGetAsync("user:1:name");

        Assert.Equal("Alice", value);
    }

    [Fact]
    public async Task Cache_Expiration_Works()
    {
        var connection = await ConnectionMultiplexer
            .ConnectAsync(_redis.GetConnectionString());
        var db = connection.GetDatabase();

        await db.StringSetAsync("temp:key", "value",
            TimeSpan.FromMilliseconds(100));

        // Value exists immediately
        Assert.True(await db.KeyExistsAsync("temp:key"));

        // Wait for expiration
        await Task.Delay(200);
        Assert.False(await db.KeyExistsAsync("temp:key"));
    }

    public async Task DisposeAsync()
    {
        await _redis.DisposeAsync();
    }
}
```

## Shared Container with xUnit Collection Fixture

Share a single container across all tests in a collection for faster execution.

```csharp
using Testcontainers.PostgreSql;
using Xunit;

// 1. Define the fixture that manages the container lifecycle
public class DatabaseFixture : IAsyncLifetime
{
    public PostgreSqlContainer Container { get; } =
        new PostgreSqlBuilder()
            .WithDatabase("sharedtestdb")
            .WithUsername("testuser")
            .WithPassword("testpass")
            .Build();

    public string ConnectionString =>
        Container.GetConnectionString();

    public async Task InitializeAsync()
    {
        await Container.StartAsync();
    }

    public async Task DisposeAsync()
    {
        await Container.DisposeAsync();
    }
}

// 2. Define the collection
[CollectionDefinition("Database")]
public class DatabaseCollection
    : ICollectionFixture<DatabaseFixture> { }

// 3. Use the collection in test classes
[Collection("Database")]
public class UserRepositoryTests
{
    private readonly DatabaseFixture _db;

    public UserRepositoryTests(DatabaseFixture db)
    {
        _db = db;
    }

    [Fact]
    public async Task CreateUser_Persists_To_Database()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_db.ConnectionString)
            .Options;

        await using var context = new AppDbContext(options);
        await context.Database.EnsureCreatedAsync();

        context.Users.Add(new User
        {
            Name = "Charlie",
            Email = "charlie@example.com"
        });
        await context.SaveChangesAsync();

        var count = await context.Users.CountAsync();
        Assert.True(count >= 1);
    }
}

[Collection("Database")]
public class OrderRepositoryTests
{
    private readonly DatabaseFixture _db;

    public OrderRepositoryTests(DatabaseFixture db)
    {
        _db = db;
    }

    [Fact]
    public async Task Database_Is_Accessible()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_db.ConnectionString)
            .Options;

        await using var context = new AppDbContext(options);
        Assert.True(await context.Database.CanConnectAsync());
    }
}
```

## WebApplicationFactory with Testcontainers

Replace the test database in ASP.NET Core integration tests.

```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using Xunit;

public class ApiIntegrationTests
    : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ApiIntegrationTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetUsers_Returns_Ok()
    {
        var response = await _client.GetAsync("/api/users");
        response.EnsureSuccessStatusCode();
    }
}

public class CustomWebApplicationFactory
    : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres =
        new PostgreSqlBuilder()
            .WithDatabase("integrationtestdb")
            .WithUsername("test")
            .WithPassword("test")
            .Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove existing DbContext registration
            var descriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<AppDbContext>));
            if (descriptor != null)
                services.Remove(descriptor);

            // Replace with Testcontainers connection
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(_postgres.GetConnectionString()));
        });
    }

    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();
    }

    public new async Task DisposeAsync()
    {
        await _postgres.DisposeAsync();
        await base.DisposeAsync();
    }
}
```

## Container Module Comparison

| Module | Image | Default Port | Use Case |
|--------|-------|-------------|----------|
| PostgreSql | postgres:16-alpine | 5432 | Relational data, EF Core |
| MsSql | mssql/server:2022 | 1433 | SQL Server specific features |
| MySql | mysql:8 | 3306 | MySQL/MariaDB workloads |
| MongoDB | mongo:7 | 27017 | Document store testing |
| Redis | redis:7-alpine | 6379 | Caching, pub/sub |
| RabbitMQ | rabbitmq:3-management | 5672 | Message broker testing |
| Kafka | confluentinc/cp-kafka | 9092 | Event streaming |
| Elasticsearch | elasticsearch:8 | 9200 | Full-text search |

## Best Practices

1. **Implement `IAsyncLifetime` for container lifecycle management**: start containers in `InitializeAsync` and dispose them in `DisposeAsync` to ensure clean setup and teardown for every test class.
2. **Use xUnit collection fixtures to share containers across test classes**: avoid the overhead of starting a new container for each test class by defining `ICollectionFixture<T>` with a shared container.
3. **Pin container image versions explicitly**: use `postgres:16-alpine` instead of `postgres:latest` to ensure reproducible builds; unpinned tags can introduce flaky tests when images update.
4. **Use `EnsureCreatedAsync` or `MigrateAsync` to set up the schema**: call one of these methods after the container starts to create tables before running test queries.
5. **Clean up data between tests when sharing containers**: use `DELETE FROM` or `TRUNCATE` in a `[BeforeEach]` hook to reset data state rather than spinning up a new container per test.
6. **Configure appropriate container startup timeouts**: set `WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(5432))` to avoid tests failing because the container was not ready.
7. **Replace the real database in `WebApplicationFactory`**: override `ConfigureWebHost` to swap the production `DbContext` registration with one pointing to the Testcontainers connection string.
8. **Use lightweight Alpine-based images where available**: `postgres:16-alpine` pulls faster and uses less disk space than the full `postgres:16` image, improving CI pipeline speed.
9. **Ensure Docker is available in your CI/CD environment**: configure your CI runner with Docker support (Docker-in-Docker, privileged containers, or a Docker socket mount) before running Testcontainers tests.
10. **Test real database behavior, not ORM abstractions**: use Testcontainers to test raw SQL queries, stored procedures, database constraints, and migration scripts that cannot be verified with in-memory providers.
