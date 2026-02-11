# Moq

## Overview

Moq is the most widely used mocking framework for .NET unit testing. It creates test doubles (mocks) for interfaces and virtual methods, allowing you to isolate the code under test from its dependencies. Moq uses a fluent API for setting up return values, throwing exceptions, raising events, and verifying that specific methods were called with expected arguments. It works with all major .NET test frameworks (xUnit, NUnit, MSTest) and integrates with AutoFixture via AutoMoqCustomization for fully automated test setup.

## Basic Setup and Verification

Create mocks, configure return values, and verify interactions.

```csharp
using Moq;
using Xunit;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<List<User>> GetAllAsync();
    Task<int> CreateAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(int id);
}

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockRepo;
    private readonly Mock<ILogger<UserService>> _mockLogger;
    private readonly UserService _sut;

    public UserServiceTests()
    {
        _mockRepo = new Mock<IUserRepository>();
        _mockLogger = new Mock<ILogger<UserService>>();
        _sut = new UserService(_mockRepo.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetUser_Returns_User_When_Found()
    {
        // Arrange
        var expected = new User { Id = 1, Name = "Alice" };
        _mockRepo
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.GetUserAsync(1);

        // Assert
        Assert.Equal("Alice", result?.Name);
        _mockRepo.Verify(r => r.GetByIdAsync(1), Times.Once);
    }

    [Fact]
    public async Task GetUser_Returns_Null_When_Not_Found()
    {
        _mockRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((User?)null);

        var result = await _sut.GetUserAsync(999);

        Assert.Null(result);
    }
}
```

## Argument Matching

Use `It` matchers for flexible argument matching.

```csharp
using Moq;
using Xunit;

public class ArgumentMatchingTests
{
    private readonly Mock<IUserRepository> _mockRepo = new();

    [Fact]
    public async Task Match_Any_Value()
    {
        _mockRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new User { Name = "Any User" });

        var user = await _mockRepo.Object.GetByIdAsync(42);
        Assert.Equal("Any User", user?.Name);
    }

    [Fact]
    public async Task Match_Specific_Range()
    {
        _mockRepo
            .Setup(r => r.GetByIdAsync(It.IsInRange(1, 100, Moq.Range.Inclusive)))
            .ReturnsAsync(new User { Name = "Valid User" });

        _mockRepo
            .Setup(r => r.GetByIdAsync(It.Is<int>(id => id <= 0)))
            .ReturnsAsync((User?)null);

        Assert.NotNull(await _mockRepo.Object.GetByIdAsync(50));
        Assert.Null(await _mockRepo.Object.GetByIdAsync(-1));
    }

    [Fact]
    public async Task Match_With_Predicate()
    {
        _mockRepo
            .Setup(r => r.CreateAsync(It.Is<User>(u =>
                !string.IsNullOrEmpty(u.Email) &&
                u.Email.Contains("@"))))
            .ReturnsAsync(1);

        _mockRepo
            .Setup(r => r.CreateAsync(It.Is<User>(u =>
                string.IsNullOrEmpty(u.Email))))
            .ThrowsAsync(new ArgumentException("Email required"));

        int id = await _mockRepo.Object.CreateAsync(
            new User { Email = "test@example.com" });
        Assert.Equal(1, id);

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _mockRepo.Object.CreateAsync(new User { Email = "" }));
    }

    [Fact]
    public async Task Match_Regex_On_String()
    {
        var mockEmailService = new Mock<IEmailService>();
        mockEmailService
            .Setup(s => s.SendAsync(
                It.IsRegex(@"^[\w.-]+@[\w.-]+\.\w+$"),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .ReturnsAsync(true);

        bool sent = await mockEmailService.Object.SendAsync(
            "user@example.com", "Subject", "Body");
        Assert.True(sent);
    }
}
```

## Callback and Capture

Use callbacks to inspect arguments or track invocations.

```csharp
using Moq;
using Xunit;

public class CallbackTests
{
    [Fact]
    public async Task Capture_Arguments_With_Callback()
    {
        var mockRepo = new Mock<IUserRepository>();
        User? capturedUser = null;

        mockRepo
            .Setup(r => r.CreateAsync(It.IsAny<User>()))
            .Callback<User>(u => capturedUser = u)
            .ReturnsAsync(1);

        var service = new UserService(mockRepo.Object);
        await service.RegisterAsync("Alice", "alice@example.com");

        Assert.NotNull(capturedUser);
        Assert.Equal("Alice", capturedUser!.Name);
        Assert.Equal("alice@example.com", capturedUser.Email);
    }

    [Fact]
    public async Task Track_Call_Count_With_Callback()
    {
        var mockRepo = new Mock<IUserRepository>();
        var callLog = new List<int>();

        mockRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .Callback<int>(id => callLog.Add(id))
            .ReturnsAsync(new User());

        var service = new UserService(mockRepo.Object);
        await service.GetUserAsync(1);
        await service.GetUserAsync(2);
        await service.GetUserAsync(1);

        Assert.Equal(3, callLog.Count);
        Assert.Equal(new[] { 1, 2, 1 }, callLog);
    }

    [Fact]
    public async Task Return_Different_Values_On_Sequential_Calls()
    {
        var mockRepo = new Mock<IUserRepository>();
        var callCount = 0;

        mockRepo
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(() =>
            {
                callCount++;
                return callCount == 1
                    ? null
                    : new User { Id = 1, Name = "Alice" };
            });

        // First call returns null (user not yet created)
        Assert.Null(await mockRepo.Object.GetByIdAsync(1));
        // Second call returns the user
        Assert.NotNull(await mockRepo.Object.GetByIdAsync(1));
    }
}
```

## Exception and Async Patterns

Mock exception throwing and async behavior.

```csharp
using Moq;
using Xunit;

public class ExceptionAndAsyncTests
{
    [Fact]
    public async Task Setup_Throws_Exception()
    {
        var mockRepo = new Mock<IUserRepository>();
        mockRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ThrowsAsync(new InvalidOperationException("Database offline"));

        var service = new UserService(mockRepo.Object);

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.GetUserAsync(1));
    }

    [Fact]
    public async Task Setup_Async_With_Delay()
    {
        var mockRepo = new Mock<IUserRepository>();
        mockRepo
            .Setup(r => r.GetAllAsync())
            .Returns(async () =>
            {
                await Task.Delay(100); // simulate latency
                return new List<User>
                {
                    new() { Id = 1, Name = "Alice" }
                };
            });

        var result = await mockRepo.Object.GetAllAsync();
        Assert.Single(result);
    }

    [Fact]
    public void Setup_Event_Raising()
    {
        var mockNotifier = new Mock<INotificationService>();
        bool eventRaised = false;

        mockNotifier.Object.NotificationReceived +=
            (sender, args) => eventRaised = true;

        mockNotifier.Raise(
            n => n.NotificationReceived += null,
            EventArgs.Empty);

        Assert.True(eventRaised);
    }
}
```

## Verification Patterns

Verify that mocked methods were called with the correct frequency and arguments.

```csharp
using Moq;
using Xunit;

public class VerificationTests
{
    [Fact]
    public async Task Verify_Method_Called_Exact_Times()
    {
        var mockRepo = new Mock<IUserRepository>();
        mockRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new User());

        var service = new UserService(mockRepo.Object);
        await service.GetUserAsync(1);
        await service.GetUserAsync(2);

        mockRepo.Verify(r => r.GetByIdAsync(It.IsAny<int>()), Times.Exactly(2));
        mockRepo.Verify(r => r.GetByIdAsync(1), Times.Once);
        mockRepo.Verify(r => r.GetByIdAsync(2), Times.Once);
        mockRepo.Verify(r => r.DeleteAsync(It.IsAny<int>()), Times.Never);
    }

    [Fact]
    public async Task Verify_No_Other_Calls()
    {
        var mockRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        mockRepo
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(new User());

        await mockRepo.Object.GetByIdAsync(1);

        mockRepo.VerifyAll();      // all setups were invoked
        mockRepo.VerifyNoOtherCalls(); // no unexpected calls
    }

    [Fact]
    public void Verify_Property_Was_Set()
    {
        var mockConfig = new Mock<IAppConfig>();
        mockConfig.SetupSet(c => c.Timeout = It.IsInRange(1, 60, Moq.Range.Inclusive));

        mockConfig.Object.Timeout = 30;

        mockConfig.VerifySet(c => c.Timeout = 30, Times.Once);
    }
}
```

## Mock Behavior Comparison

| Behavior | `MockBehavior.Loose` (default) | `MockBehavior.Strict` |
|----------|-------------------------------|----------------------|
| Unsetup methods | Return default value | Throw `MockException` |
| Missing verification | Passes silently | Forces explicit setup |
| Discovery of bugs | May miss unexpected calls | Catches all unexpected calls |
| Setup effort | Low (only setup what you test) | High (must setup everything) |
| Best for | Most unit tests | Critical path verification |

## Best Practices

1. **Mock interfaces, not concrete classes**: design code against interfaces (`IUserRepository`) so mocks replace the real implementation cleanly without needing virtual methods.
2. **Use `MockBehavior.Strict` for critical business logic**: strict mocks throw on unexpected calls, catching bugs where the system-under-test calls dependencies it should not.
3. **Verify only meaningful interactions**: verify calls that represent important side effects (saves, notifications, auditing); do not verify every getter call as it couples tests to implementation.
4. **Use `It.Is<T>()` with predicates for complex argument validation**: instead of matching exact objects, validate specific properties with `It.Is<User>(u => u.Email.Contains("@"))`.
5. **Prefer `ReturnsAsync` over `Returns(Task.FromResult(...))` for async methods**: `ReturnsAsync` is more readable and creates a new completed task per invocation, avoiding shared-task bugs.
6. **Use `Callback` to capture arguments for later assertions**: when you need to verify the exact object passed to a method, capture it in a callback and assert its properties separately.
7. **Create one mock per dependency, one SUT per test class**: instantiate mocks and the system-under-test in the constructor so each test starts with a clean state.
8. **Avoid mocking data structures and DTOs**: mock behavior (services, repositories, clients), not data; create real instances of domain objects, DTOs, and value types.
9. **Use `Times.Once` or `Times.Never` for explicit call verification**: always specify the expected call count rather than relying on implicit verification through `VerifyAll()`.
10. **Combine with AutoFixture AutoMoq for zero-boilerplate tests**: use `AutoMoqCustomization` to auto-create all mocks and inject them into the SUT, reducing constructor changes from breaking every test.
