---
name: bdd-cheatsheet
description: >
  Guidance for Behavior-Driven Development (BDD) patterns and Gherkin syntax in .NET.
  USE FOR: writing Gherkin feature files, structuring Given-When-Then scenarios, creating
  scenario outlines with data tables, organizing BDD step definitions, mapping business
  requirements to executable specifications with Reqnroll or SpecFlow.
  DO NOT USE FOR: unit test design (use xUnit/NUnit directly), performance testing,
  API contract testing (use Pact), or end-to-end browser automation (use Playwright).
license: MIT
metadata:
  displayName: "BDD Cheatsheet"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# BDD Cheatsheet

## Overview

Behavior-Driven Development (BDD) bridges the gap between business stakeholders and developers by expressing software behavior as executable specifications written in natural language. In .NET, BDD is implemented using Gherkin syntax (Feature/Scenario/Given/When/Then) with frameworks like Reqnroll (the SpecFlow successor) or SpecFlow. Feature files describe what the system should do in business terms, while step definition classes provide the C# code that executes each step. This cheatsheet covers Gherkin syntax, common patterns, step definition strategies, and integration with .NET testing frameworks.

## Gherkin Syntax Fundamentals

The core building blocks of Gherkin feature files.

```gherkin
Feature: Shopping Cart Management
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase the products I need

  Background:
    Given the user is logged in as "alice@example.com"
    And the product catalog is loaded

  Scenario: Add a single item to an empty cart
    Given the cart is empty
    When the user adds "Wireless Mouse" to the cart
    Then the cart should contain 1 item
    And the cart total should be "$29.99"

  Scenario: Remove an item from the cart
    Given the cart contains the following items:
      | Product        | Quantity | Price  |
      | Wireless Mouse | 1        | $29.99 |
      | USB Cable      | 2        | $9.99  |
    When the user removes "USB Cable" from the cart
    Then the cart should contain 1 item
    And the cart total should be "$29.99"
```

## Scenario Outlines with Examples

Use scenario outlines to run the same scenario with different data sets.

```gherkin
Feature: Discount Rules

  Scenario Outline: Apply volume discounts
    Given the user has <quantity> units of "<product>" in the cart
    And each unit costs $<unit_price>
    When the discount rules are applied
    Then the discount should be <discount>%
    And the total should be $<total>

    Examples:
      | quantity | product        | unit_price | discount | total  |
      | 1        | Wireless Mouse | 29.99      | 0        | 29.99  |
      | 5        | Wireless Mouse | 29.99      | 10       | 134.96 |
      | 10       | Wireless Mouse | 29.99      | 20       | 239.92 |
      | 50       | Wireless Mouse | 29.99      | 30       | 1049.65 |

  Scenario Outline: Validate email format
    When the user enters "<email>" as their email address
    Then the validation result should be <valid>

    Examples:
      | email              | valid |
      | user@example.com   | true  |
      | user@.com          | false |
      | @example.com       | false |
      | user@example       | false |
      | user.name@test.com | true  |
```

## Step Definitions in C#

Map Gherkin steps to C# methods using Reqnroll bindings.

```csharp
using Reqnroll;
using Xunit;

[Binding]
public class ShoppingCartSteps
{
    private readonly ShoppingCart _cart;
    private readonly ProductCatalog _catalog;

    public ShoppingCartSteps(
        ShoppingCart cart,
        ProductCatalog catalog)
    {
        _cart = cart;
        _catalog = catalog;
    }

    [Given(@"the cart is empty")]
    public void GivenTheCartIsEmpty()
    {
        _cart.Clear();
    }

    [Given(@"the cart contains the following items:")]
    public void GivenTheCartContainsItems(Table table)
    {
        foreach (var row in table.Rows)
        {
            string product = row["Product"];
            int quantity = int.Parse(row["Quantity"]);
            decimal price = decimal.Parse(
                row["Price"].TrimStart('$'));

            _cart.AddItem(new CartItem(product, quantity, price));
        }
    }

    [When(@"the user adds ""(.*)"" to the cart")]
    public void WhenUserAddsProductToCart(string productName)
    {
        var product = _catalog.FindByName(productName);
        _cart.AddItem(new CartItem(
            product.Name, 1, product.Price));
    }

    [When(@"the user removes ""(.*)"" from the cart")]
    public void WhenUserRemovesProductFromCart(string productName)
    {
        _cart.RemoveItem(productName);
    }

    [Then(@"the cart should contain (\d+) items?")]
    public void ThenCartShouldContainItems(int expectedCount)
    {
        Assert.Equal(expectedCount, _cart.ItemCount);
    }

    [Then(@"the cart total should be ""\$(.*)""")]
    public void ThenCartTotalShouldBe(decimal expectedTotal)
    {
        Assert.Equal(expectedTotal, _cart.Total);
    }
}
```

## Context Sharing Between Steps

Use Reqnroll's context injection to share state across step definition classes.

```csharp
using Reqnroll;

// Shared context class
public class TestContext
{
    public User? CurrentUser { get; set; }
    public HttpResponseMessage? LastResponse { get; set; }
    public List<string> Errors { get; set; } = new();
}

[Binding]
public class AuthenticationSteps
{
    private readonly TestContext _context;
    private readonly IAuthService _authService;

    public AuthenticationSteps(
        TestContext context,
        IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [Given(@"the user is logged in as ""(.*)""")]
    public async Task GivenUserIsLoggedIn(string email)
    {
        _context.CurrentUser = await _authService
            .LoginAsync(email, "TestPassword123!");
    }
}

[Binding]
public class OrderSteps
{
    private readonly TestContext _context;
    private readonly IOrderService _orderService;

    public OrderSteps(
        TestContext context,
        IOrderService orderService)
    {
        _context = context;
        _orderService = orderService;
    }

    [When(@"the user places an order")]
    public async Task WhenUserPlacesOrder()
    {
        // Access the logged-in user from shared context
        var userId = _context.CurrentUser!.Id;
        _context.LastResponse = await _orderService
            .PlaceOrderAsync(userId);
    }
}
```

## Hooks for Setup and Teardown

Use hooks to execute code before/after features, scenarios, and steps.

```csharp
using Reqnroll;

[Binding]
public class TestHooks
{
    private readonly TestContext _context;

    public TestHooks(TestContext context)
    {
        _context = context;
    }

    [BeforeScenario]
    public void BeforeScenario()
    {
        // Reset state before each scenario
        _context.Errors.Clear();
        _context.LastResponse = null;
    }

    [BeforeScenario("@database")]
    public async Task BeforeDatabaseScenario()
    {
        // Only runs for scenarios tagged with @database
        await TestDatabase.ResetAsync();
    }

    [AfterScenario]
    public void AfterScenario(ScenarioContext scenarioContext)
    {
        if (scenarioContext.TestError != null)
        {
            // Log failure details for debugging
            Console.WriteLine(
                $"Scenario failed: {scenarioContext.ScenarioInfo.Title}");
            Console.WriteLine(
                $"Error: {scenarioContext.TestError.Message}");
        }
    }

    [BeforeFeature]
    public static async Task BeforeFeature()
    {
        await TestEnvironment.StartAsync();
    }

    [AfterFeature]
    public static async Task AfterFeature()
    {
        await TestEnvironment.StopAsync();
    }
}
```

## Tags and Filtering

Use tags to categorize and selectively run scenarios.

```gherkin
@smoke
Feature: User Registration

  @critical @auth
  Scenario: Register with valid credentials
    Given the registration page is loaded
    When the user registers with:
      | Field    | Value              |
      | Email    | new@example.com    |
      | Password | Str0ngP@ssword!    |
      | Name     | Alice Smith        |
    Then the registration should succeed
    And a confirmation email should be sent

  @wip
  Scenario: Register with SSO provider
    Given the SSO provider "Google" is configured
    When the user clicks "Sign up with Google"
    Then the user should be redirected to Google login

  @slow @integration
  Scenario: Register and verify email end-to-end
    Given the email service is running
    When the user completes the full registration flow
    Then the account should be active within 30 seconds
```

## Gherkin Keyword Reference

| Keyword | Purpose | Example |
|---------|---------|---------|
| Feature | Describe a feature area | `Feature: User Authentication` |
| Scenario | A single test case | `Scenario: Login with valid credentials` |
| Scenario Outline | Parameterized scenario | `Scenario Outline: Validate <input>` |
| Background | Shared setup for all scenarios | `Background: Given the user is logged in` |
| Given | Establish preconditions | `Given the cart has 3 items` |
| When | Perform an action | `When the user clicks checkout` |
| Then | Assert expected outcomes | `Then the order should be confirmed` |
| And | Continue previous step type | `And the email should be sent` |
| But | Negative continuation | `But the cart should not be empty` |
| Examples | Data table for outlines | `Examples: \| input \| result \|` |
| @tag | Categorize scenarios | `@smoke @critical` |

## Best Practices

1. **Write scenarios in business language, not technical language**: use "the user places an order" instead of "POST /api/orders with JSON body"; feature files are documentation for non-developers.
2. **Keep scenarios independent and self-contained**: each scenario should set up its own preconditions in Given steps; never rely on another scenario having run first.
3. **Use Background for shared Given steps across a feature**: if every scenario in a feature starts with the same setup, extract it into a Background block to reduce duplication.
4. **Prefer Scenario Outlines over copy-pasted scenarios**: when the same behavior is tested with different data, use Scenario Outline with Examples tables instead of duplicating the scenario.
5. **Write reusable step definitions with regex capture groups**: make steps like `@"the user adds ""(.*)"" to the cart"` generic enough to work across multiple scenarios and features.
6. **Use context injection instead of static state**: share data between step definitions via constructor-injected context objects, not static fields or ScenarioContext dictionary lookups.
7. **Tag scenarios for selective execution**: use `@smoke`, `@slow`, `@wip`, and `@integration` tags to run subsets of scenarios in different CI pipeline stages.
8. **Limit scenarios to one When step**: a scenario with multiple When steps is testing multiple behaviors; split it into separate scenarios for clarity and debugging.
9. **Name feature files after the feature, not the implementation**: use `UserRegistration.feature` not `RegistrationControllerTests.feature`; features describe behavior, not code structure.
10. **Review feature files with business stakeholders**: the primary value of BDD is shared understanding; if stakeholders never read the feature files, the process provides little benefit over regular unit tests.
