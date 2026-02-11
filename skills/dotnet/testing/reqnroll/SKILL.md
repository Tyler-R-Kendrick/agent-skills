---
name: reqnroll
description: >
  Guidance for Reqnroll BDD testing framework (SpecFlow successor) in .NET.
  USE FOR: behavior-driven development with Gherkin syntax, writing executable specifications,
  step definition bindings, scenario outlines with data tables, integrating BDD with xUnit/NUnit/MSTest,
  acceptance testing with natural language scenarios.
  DO NOT USE FOR: unit testing without BDD requirements (use xUnit directly), performance testing,
  API contract testing (use Pact), or browser automation (combine with Playwright).
license: MIT
metadata:
  displayName: "Reqnroll"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Reqnroll

## Overview

Reqnroll is the community-maintained successor to SpecFlow, providing Behavior-Driven Development (BDD) capabilities for .NET. It enables writing executable specifications in Gherkin syntax (Given/When/Then) that are bound to C# step definitions. Reqnroll integrates with xUnit, NUnit, and MSTest as test runners, supports dependency injection for step definition classes, and provides hooks for scenario lifecycle management. Feature files serve as living documentation that is both human-readable for stakeholders and machine-executable as automated tests.

## Project Setup

Install Reqnroll packages and configure the test project.

```xml
<!-- Add to your test .csproj file -->
<PackageReference Include="Reqnroll" Version="2.*" />
<PackageReference Include="Reqnroll.xUnit" Version="2.*" />
<PackageReference Include="Reqnroll.Microsoft.Extensions.DependencyInjection" Version="2.*" />
```

```csharp
// reqnroll.json configuration file
{
    "language": {
        "feature": "en"
    },
    "bindingCulture": {
        "name": "en-US"
    },
    "generator": {
        "addNonParallelizableMarkerForTags": [ "sequential" ]
    }
}
```

## Feature File

Write Gherkin feature files that describe system behavior.

```gherkin
@orders
Feature: Order Management
  As a customer
  I want to manage my orders
  So that I can track my purchases

  Background:
    Given the following products exist:
      | Name           | Price  | Stock |
      | Wireless Mouse | 29.99  | 100   |
      | USB Keyboard   | 49.99  | 50    |
      | Monitor Stand  | 79.99  | 25    |

  Scenario: Place a new order
    Given the user "alice@example.com" is authenticated
    When the user adds "Wireless Mouse" to the order with quantity 2
    And the user adds "USB Keyboard" to the order with quantity 1
    And the user submits the order
    Then the order should be created successfully
    And the order total should be "$109.97"
    And the order should contain 2 line items

  Scenario: Cancel a pending order
    Given the user "alice@example.com" has a pending order
    When the user cancels the order
    Then the order status should be "Cancelled"
    And the product stock should be restored

  Scenario Outline: Apply discount codes
    Given the user has an order totaling $<subtotal>
    When the user applies discount code "<code>"
    Then the discount amount should be $<discount>
    And the order total should be $<total>

    Examples:
      | subtotal | code     | discount | total  |
      | 100.00   | SAVE10   | 10.00    | 90.00  |
      | 200.00   | HALF     | 100.00   | 100.00 |
      | 50.00    | INVALID  | 0.00     | 50.00  |
```

## Step Definitions

Bind Gherkin steps to C# methods.

```csharp
using Reqnroll;
using Xunit;

[Binding]
public class OrderSteps
{
    private readonly OrderContext _context;
    private readonly IOrderService _orderService;
    private readonly IProductRepository _productRepo;

    public OrderSteps(
        OrderContext context,
        IOrderService orderService,
        IProductRepository productRepo)
    {
        _context = context;
        _orderService = orderService;
        _productRepo = productRepo;
    }

    [Given(@"the following products exist:")]
    public async Task GivenTheFollowingProductsExist(Table table)
    {
        foreach (var row in table.Rows)
        {
            await _productRepo.CreateAsync(new Product
            {
                Name = row["Name"],
                Price = decimal.Parse(row["Price"]),
                Stock = int.Parse(row["Stock"])
            });
        }
    }

    [Given(@"the user ""(.*)"" is authenticated")]
    public async Task GivenTheUserIsAuthenticated(string email)
    {
        _context.CurrentUser = await _context.AuthService
            .LoginAsync(email);
    }

    [When(@"the user adds ""(.*)"" to the order with quantity (\d+)")]
    public async Task WhenTheUserAddsProductToOrder(
        string productName, int quantity)
    {
        var product = await _productRepo.FindByNameAsync(productName);
        _context.CurrentOrder ??= new Order();
        _context.CurrentOrder.AddItem(product!, quantity);
    }

    [When(@"the user submits the order")]
    public async Task WhenTheUserSubmitsTheOrder()
    {
        _context.OrderResult = await _orderService
            .SubmitAsync(_context.CurrentOrder!,
                _context.CurrentUser!.Id);
    }

    [Then(@"the order should be created successfully")]
    public void ThenTheOrderShouldBeCreatedSuccessfully()
    {
        Assert.True(_context.OrderResult!.Success);
        Assert.NotNull(_context.OrderResult.OrderId);
    }

    [Then(@"the order total should be ""\$(.*)""")]
    public void ThenTheOrderTotalShouldBe(decimal expectedTotal)
    {
        Assert.Equal(expectedTotal, _context.CurrentOrder!.Total);
    }

    [Then(@"the order should contain (\d+) line items")]
    public void ThenTheOrderShouldContainLineItems(int expectedCount)
    {
        Assert.Equal(expectedCount,
            _context.CurrentOrder!.Items.Count);
    }
}
```

## Dependency Injection Setup

Configure DI for step definition classes using Microsoft.Extensions.DependencyInjection.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Reqnroll;
using Reqnroll.Microsoft.Extensions.DependencyInjection;

public static class TestStartup
{
    [ScenarioDependencies]
    public static IServiceCollection CreateServices()
    {
        var services = new ServiceCollection();

        // Register shared context
        services.AddScoped<OrderContext>();

        // Register services
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IProductRepository, InMemoryProductRepository>();
        services.AddScoped<IAuthService, FakeAuthService>();
        services.AddScoped<IDiscountService, DiscountService>();

        // Register step definition classes are auto-discovered

        return services;
    }
}

// Shared context for passing state between step definitions
public class OrderContext
{
    public User? CurrentUser { get; set; }
    public Order? CurrentOrder { get; set; }
    public OrderResult? OrderResult { get; set; }
    public IAuthService AuthService { get; }

    public OrderContext(IAuthService authService)
    {
        AuthService = authService;
    }
}
```

## Step Argument Transformations

Automatically transform step parameters into complex types.

```csharp
using Reqnroll;

[Binding]
public class StepTransformations
{
    [StepArgumentTransformation(@"\$(.*)")]
    public decimal TransformDollarAmount(string amount)
    {
        return decimal.Parse(amount);
    }

    [StepArgumentTransformation]
    public DateTimeOffset TransformDate(string dateString)
    {
        return DateTimeOffset.Parse(dateString);
    }

    [StepArgumentTransformation]
    public User TransformUser(Table table)
    {
        var row = table.Rows[0];
        return new User
        {
            Name = row["Name"],
            Email = row["Email"],
            Role = row.ContainsKey("Role") ? row["Role"] : "User"
        };
    }
}
```

## Hooks for Lifecycle Management

Execute code at specific points in the test lifecycle.

```csharp
using Reqnroll;

[Binding]
public class TestLifecycleHooks
{
    private readonly OrderContext _context;

    public TestLifecycleHooks(OrderContext context)
    {
        _context = context;
    }

    [BeforeScenario(Order = 0)]
    public void ResetContext()
    {
        _context.CurrentOrder = null;
        _context.OrderResult = null;
    }

    [BeforeScenario("@database")]
    public async Task SeedDatabase()
    {
        // Only runs for scenarios tagged @database
        await TestDatabase.SeedAsync();
    }

    [AfterScenario]
    public void LogScenarioResult(ScenarioContext scenario)
    {
        if (scenario.TestError != null)
        {
            Console.WriteLine(
                $"FAILED: {scenario.ScenarioInfo.Title}");
            Console.WriteLine(
                $"Error: {scenario.TestError.Message}");
        }
    }

    [BeforeFeature]
    public static async Task StartServices()
    {
        await TestEnvironment.StartAsync();
    }

    [AfterFeature]
    public static async Task StopServices()
    {
        await TestEnvironment.StopAsync();
    }

    [BeforeTestRun]
    public static void GlobalSetup()
    {
        // Run once before all features
        TestConfiguration.Initialize();
    }
}
```

## Reqnroll vs. SpecFlow Comparison

| Feature | Reqnroll | SpecFlow |
|---------|----------|----------|
| .NET support | .NET 6+ | .NET 6+ (legacy) |
| Maintenance | Active community | End of life |
| License | Open source | Mixed (paid features) |
| DI support | Microsoft DI, Autofac | BoDi (built-in) |
| Test runners | xUnit, NUnit, MSTest | xUnit, NUnit, MSTest |
| Migration | Drop-in replacement | N/A |
| Parallel execution | Supported | Supported |

## Best Practices

1. **Write feature files before implementing step definitions**: start with the Gherkin scenario to agree on behavior with stakeholders, then implement the C# bindings to make it pass.
2. **Use dependency injection for all step definition dependencies**: register services with `[ScenarioDependencies]` and inject them via constructors instead of creating instances in step methods.
3. **Share state between step classes via a scoped context object**: create a typed context class (e.g., `OrderContext`) registered as scoped, not by using `ScenarioContext` dictionary lookups.
4. **Keep step definitions reusable across multiple features**: write generic steps like `When the user adds "(.*)" to the cart` that work for any product name in any feature file.
5. **Use `[StepArgumentTransformation]` for complex parameter types**: transform `$99.99` into `decimal` or table rows into domain objects to keep step methods clean and focused on behavior.
6. **Tag scenarios for selective execution and filtering**: use `@smoke`, `@slow`, `@wip`, and `@integration` tags to run subsets in different CI pipeline stages with `--filter` flags.
7. **Organize feature files by business domain, not by implementation**: name files `OrderManagement.feature` not `OrderControllerTests.feature`; features describe capabilities, not code modules.
8. **Use Background blocks for shared Given steps within a feature**: extract common setup (logged-in user, seeded data) into a `Background:` section instead of repeating it in every scenario.
9. **Limit each scenario to one When step for clarity**: a scenario testing two actions should be split into two scenarios; each scenario represents one behavior to verify.
10. **Migrate from SpecFlow to Reqnroll by changing NuGet packages**: Reqnroll is a drop-in replacement; update package references and namespace imports (`using Reqnroll;` instead of `using TechTalk.SpecFlow;`).
