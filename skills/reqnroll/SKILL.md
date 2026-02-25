---
name: reqnroll
description: Guidance for using Reqnroll for BDD testing in .NET. Use when working with Reqnroll or behavior-driven development.
license: MIT
metadata:
  displayName: "Reqnroll"
  author: "Tyler-R-Kendrick"
---

# Reqnroll

## Overview
Reqnroll is a BDD (Behavior-Driven Development) testing framework for .NET, forked from SpecFlow. It enables writing executable specifications in plain language using Gherkin syntax.

## Installation

```bash
dotnet add package Reqnroll
dotnet add package Reqnroll.NUnit  # or Reqnroll.xUnit or Reqnroll.MsTest
dotnet add package Reqnroll.Tools.MsBuild.Generation
```

## Feature Files

Create `.feature` files with Gherkin syntax.

```gherkin
Feature: Calculator
  As a user
  I want to perform basic math operations
  So that I can calculate results

  Scenario: Add two numbers
    Given I have entered 50 into the calculator
    And I have entered 70 into the calculator
    When I press add
    Then the result should be 120 on the screen

  Scenario: Subtract two numbers
    Given I have entered 100 into the calculator
    And I have entered 25 into the calculator
    When I press subtract
    Then the result should be 75 on the screen
```

## Step Definitions

Implement steps in C# classes.

```csharp
using Reqnroll;

[Binding]
public class CalculatorSteps
{
    private readonly Calculator _calculator = new();
    private int _result;
    
    [Given(@"I have entered (.*) into the calculator")]
    public void GivenIHaveEnteredIntoTheCalculator(int number)
    {
        _calculator.Enter(number);
    }
    
    [When(@"I press add")]
    public void WhenIPressAdd()
    {
        _result = _calculator.Add();
    }
    
    [When(@"I press subtract")]
    public void WhenIPressSubtract()
    {
        _result = _calculator.Subtract();
    }
    
    [Then(@"the result should be (.*) on the screen")]
    public void ThenTheResultShouldBeOnTheScreen(int expected)
    {
        Assert.That(_result, Is.EqualTo(expected));
    }
}
```

## Scenario Context

Share data between steps.

```csharp
[Binding]
public class OrderSteps
{
    private readonly ScenarioContext _scenarioContext;
    
    public OrderSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }
    
    [Given(@"a customer with id (.*)")]
    public void GivenACustomerWithId(string customerId)
    {
        _scenarioContext["CustomerId"] = customerId;
    }
    
    [When(@"the customer places an order")]
    public void WhenTheCustomerPlacesAnOrder()
    {
        var customerId = (string)_scenarioContext["CustomerId"];
        var order = new Order(customerId);
        _scenarioContext["Order"] = order;
    }
    
    [Then(@"the order should be created")]
    public void ThenTheOrderShouldBeCreated()
    {
        var order = (Order)_scenarioContext["Order"];
        Assert.That(order, Is.Not.Null);
    }
}
```

## Data Tables

Pass structured data to steps.

```gherkin
Scenario: Create multiple products
  Given the following products exist:
    | Name      | Price | Stock |
    | Product A | 10.00 | 50    |
    | Product B | 20.00 | 30    |
    | Product C | 15.00 | 100   |
  When I list all products
  Then I should see 3 products
```

```csharp
[Given(@"the following products exist:")]
public void GivenTheFollowingProductsExist(Table table)
{
    foreach (var row in table.Rows)
    {
        var product = new Product
        {
            Name = row["Name"],
            Price = decimal.Parse(row["Price"]),
            Stock = int.Parse(row["Stock"])
        };
        _productRepository.Add(product);
    }
}
```

## Scenario Outline

Parameterized scenarios.

```gherkin
Scenario Outline: Validate user age
  Given a user with age <age>
  When I validate the user
  Then the validation result should be <result>

  Examples:
    | age | result  |
    | 17  | invalid |
    | 18  | valid   |
    | 25  | valid   |
    | 150 | invalid |
```

## Hooks

Execute code before/after scenarios or features.

```csharp
[Binding]
public class Hooks
{
    [BeforeScenario]
    public void BeforeScenario()
    {
        // Initialize test data
    }
    
    [AfterScenario]
    public void AfterScenario()
    {
        // Clean up
    }
    
    [BeforeFeature]
    public static void BeforeFeature()
    {
        // Setup feature-level resources
    }
    
    [AfterFeature]
    public static void AfterFeature()
    {
        // Teardown feature-level resources
    }
    
    [BeforeTestRun]
    public static void BeforeTestRun()
    {
        // Initialize once for all tests
    }
    
    [AfterTestRun]
    public static void AfterTestRun()
    {
        // Cleanup after all tests
    }
}
```

## Tagged Hooks

Execute hooks only for specific scenarios.

```gherkin
@database
Scenario: Save order to database
  Given a valid order
  When I save the order
  Then the order should be in the database
```

```csharp
[Binding]
public class DatabaseHooks
{
    [BeforeScenario("database")]
    public void SetupDatabase()
    {
        // Initialize database
    }
    
    [AfterScenario("database")]
    public void CleanupDatabase()
    {
        // Clear database
    }
}
```

## Dependency Injection

Use DI container for step definitions.

```csharp
// Configure in a class
[Binding]
public class DependencyInjection
{
    [ScenarioDependencies]
    public static IServiceCollection CreateServices()
    {
        var services = new ServiceCollection();
        
        services.AddSingleton<IProductRepository, InMemoryProductRepository>();
        services.AddScoped<IOrderService, OrderService>();
        
        return services;
    }
}

// Inject into step definitions
[Binding]
public class OrderSteps
{
    private readonly IOrderService _orderService;
    
    public OrderSteps(IOrderService orderService)
    {
        _orderService = orderService;
    }
    
    [When(@"I place an order")]
    public async Task WhenIPlaceAnOrder()
    {
        await _orderService.PlaceOrderAsync();
    }
}
```

## Step Argument Transformations

Convert step arguments to custom types.

```csharp
[Binding]
public class Transformations
{
    [StepArgumentTransformation]
    public OrderStatus ConvertOrderStatus(string status)
    {
        return status.ToLower() switch
        {
            "pending" => OrderStatus.Pending,
            "confirmed" => OrderStatus.Confirmed,
            "shipped" => OrderStatus.Shipped,
            _ => throw new ArgumentException($"Unknown status: {status}")
        };
    }
}

// Use in step
[Then(@"the order status should be (.*)")]
public void ThenTheOrderStatusShouldBe(OrderStatus expectedStatus)
{
    Assert.That(_order.Status, Is.EqualTo(expectedStatus));
}
```

## Background

Common setup for all scenarios in a feature.

```gherkin
Feature: Order Management

  Background:
    Given the following products exist:
      | Name      | Price |
      | Product A | 10.00 |
      | Product B | 20.00 |
    And I am logged in as a customer

  Scenario: Place an order
    When I add "Product A" to cart
    And I checkout
    Then an order should be created

  Scenario: View order history
    When I view my orders
    Then I should see my order history
```

## Context Injection

Share instances across binding classes.

```csharp
public class OrderContext
{
    public Order CurrentOrder { get; set; }
    public Customer CurrentCustomer { get; set; }
}

[Binding]
public class OrderSteps
{
    private readonly OrderContext _context;
    
    public OrderSteps(OrderContext context)
    {
        _context = context;
    }
    
    [When(@"I create an order")]
    public void WhenICreateAnOrder()
    {
        _context.CurrentOrder = new Order();
    }
}

[Binding]
public class PaymentSteps
{
    private readonly OrderContext _context;
    
    public PaymentSteps(OrderContext context)
    {
        _context = context;
    }
    
    [When(@"I pay for the order")]
    public void WhenIPayForTheOrder()
    {
        ProcessPayment(_context.CurrentOrder);
    }
}
```

## Async Steps

Support for async/await.

```csharp
[When(@"I save the order")]
public async Task WhenISaveTheOrder()
{
    await _orderRepository.SaveAsync(_order);
}

[Then(@"the order should exist in the database")]
public async Task ThenTheOrderShouldExistInTheDatabase()
{
    var order = await _orderRepository.GetByIdAsync(_order.Id);
    Assert.That(order, Is.Not.Null);
}
```

## Guidance

- Write feature files in collaboration with non-technical stakeholders.
- Keep scenarios focused on business behavior, not implementation details.
- Use Given-When-Then structure: Given (context), When (action), Then (outcome).
- Prefer declarative over imperative style in scenarios.
- Use Scenario Outline for testing multiple inputs.
- Use Background for common setup across scenarios in a feature.
- Inject dependencies into step definitions for testability.
- Use ScenarioContext sparingly; prefer context injection for shared state.
- Use tags to organize and filter scenarios.
- Use hooks for setup/teardown but keep them minimal.
- Transform step arguments to domain types for type safety.
- Keep step definitions reusable across scenarios.
- Run Reqnroll tests as part of your CI/CD pipeline.
