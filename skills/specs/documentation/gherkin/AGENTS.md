# Gherkin

## Overview
Gherkin is a structured, plain-language syntax for writing executable specifications in Behavior-Driven Development (BDD). It bridges the communication gap between business stakeholders, testers, and developers by expressing expected behavior in a human-readable format that also drives automated tests.

Gherkin files use the `.feature` extension and follow a strict keyword-based grammar that test runners (Cucumber, SpecFlow, Reqnroll, Behave) parse to execute step definitions written in code.

## Core Keywords

### Feature
The top-level keyword that describes a single capability or business rule. Each `.feature` file contains exactly one `Feature`.

```gherkin
Feature: User Authentication
  As a registered user
  I want to log in with my credentials
  So that I can access my personalized dashboard
```

The free-text description below the `Feature` keyword is not parsed by the runner but serves as living documentation.

### Scenario
A concrete example of the feature's expected behavior. Each scenario is an independent, self-contained test case.

```gherkin
Scenario: Successful login with valid credentials
  Given a registered user with email "alice@example.com" and password "Str0ng!Pass"
  When the user submits the login form
  Then the user should be redirected to the dashboard
  And the welcome message should display "Hello, Alice"
```

### Steps: Given / When / Then / And / But

| Keyword | Purpose | Example |
|---------|---------|---------|
| **Given** | Establish preconditions (arrange) | `Given the user has items in the cart` |
| **When** | Perform the action under test (act) | `When the user clicks "Checkout"` |
| **Then** | Assert the expected outcome (assert) | `Then the order confirmation page is displayed` |
| **And** | Continue the previous step type | `And the order total is "$42.00"` |
| **But** | Negative continuation of the previous step type | `But the coupon field should not be visible` |

`And` and `But` inherit the keyword type of the step they follow. They exist purely for readability.

### Background
Steps that run before every scenario in the feature file. Use for shared preconditions to reduce duplication.

```gherkin
Feature: Shopping Cart

  Background:
    Given the user is logged in
    And the product catalog is loaded

  Scenario: Add item to empty cart
    Given the cart is empty
    When the user adds "Wireless Mouse" to the cart
    Then the cart should contain 1 item

  Scenario: Add item to non-empty cart
    Given the cart contains "Keyboard"
    When the user adds "Wireless Mouse" to the cart
    Then the cart should contain 2 items
```

### Scenario Outline (Scenario Template)
A parameterized scenario that runs once for each row in the `Examples` table. Use when the same behavior applies to multiple input/output combinations.

```gherkin
Scenario Outline: Login validation
  Given the user enters email "<email>" and password "<password>"
  When the user submits the login form
  Then the system should respond with "<result>"

  Examples:
    | email              | password    | result          |
    | alice@example.com  | Str0ng!Pass | success         |
    | alice@example.com  | wrong       | invalid_password|
    | unknown@test.com   | any         | user_not_found  |
    |                    | Str0ng!Pass | email_required  |
```

### Data Tables
Tabular data passed to a single step for structured input.

```gherkin
Scenario: Create multiple users
  Given the following users exist:
    | name    | email              | role    |
    | Alice   | alice@example.com  | admin   |
    | Bob     | bob@example.com    | editor  |
    | Charlie | charlie@example.com| viewer  |
  When the admin views the user list
  Then all 3 users should be displayed
```

### Doc Strings
Multi-line text blocks passed to a step, delimited by triple quotes.

```gherkin
Scenario: Submit a support request
  Given the user is on the support page
  When the user submits a request with the following message:
    """
    Hello Support Team,

    I am experiencing an issue with my account settings.
    The timezone selector does not save my preference.

    Thank you,
    Alice
    """
  Then the support ticket should be created
  And the ticket body should contain "timezone selector"
```

Doc strings can also specify a content type:

```gherkin
When the API receives the following JSON payload:
  """json
  {
    "name": "Widget",
    "price": 9.99,
    "inStock": true
  }
  """
```

### Tags
Annotations prefixed with `@` that categorize and filter features, scenarios, or examples.

```gherkin
@authentication @smoke
Feature: User Authentication

  @happy-path
  Scenario: Successful login
    Given a registered user
    When the user logs in with valid credentials
    Then the login should succeed

  @negative @security
  Scenario: Account lockout after failed attempts
    Given a registered user
    When the user fails login 5 times consecutively
    Then the account should be locked for 30 minutes
```

Common tag uses:
- `@smoke`, `@regression`, `@wip` -- test suite categorization
- `@slow`, `@fast` -- execution time hints
- `@ignore`, `@skip` -- temporarily exclude scenarios
- `@api`, `@ui`, `@integration` -- test layer classification

Run filtered tests: `cucumber --tags "@smoke and not @wip"`

### Rules (Gherkin 6+)
Group related scenarios under a business rule within a feature.

```gherkin
Feature: Account Withdrawal

  Rule: Withdrawals must not exceed account balance
    Scenario: Withdrawal within balance
      Given an account balance of $500
      When the user withdraws $200
      Then the new balance should be $300

    Scenario: Withdrawal exceeding balance
      Given an account balance of $500
      When the user withdraws $600
      Then the withdrawal should be declined
      And the balance should remain $500

  Rule: Daily withdrawal limit is $1000
    Scenario: Withdrawal at the daily limit
      Given an account balance of $5000
      And the user has withdrawn $800 today
      When the user withdraws $200
      Then the withdrawal should succeed

    Scenario: Withdrawal exceeding daily limit
      Given an account balance of $5000
      And the user has withdrawn $800 today
      When the user withdraws $300
      Then the withdrawal should be declined
```

## Step Definitions

Step definitions bind Gherkin steps to executable code. Each runner has its own syntax.

### Cucumber (Java)
```java
import io.cucumber.java.en.*;

public class LoginSteps {
    @Given("a registered user with email {string} and password {string}")
    public void aRegisteredUser(String email, String password) {
        // arrange: create or look up user
    }

    @When("the user submits the login form")
    public void theUserSubmitsTheLoginForm() {
        // act: submit credentials
    }

    @Then("the user should be redirected to the dashboard")
    public void theUserShouldBeRedirectedToDashboard() {
        // assert: verify redirect
    }
}
```

### SpecFlow / Reqnroll (C#)
```csharp
[Binding]
public class LoginSteps
{
    [Given(@"a registered user with email ""(.*)"" and password ""(.*)""")]
    public void GivenARegisteredUser(string email, string password)
    {
        // arrange
    }

    [When(@"the user submits the login form")]
    public void WhenTheUserSubmitsTheLoginForm()
    {
        // act
    }

    [Then(@"the user should be redirected to the dashboard")]
    public void ThenTheUserShouldBeRedirectedToDashboard()
    {
        // assert
    }
}
```

### Behave (Python)
```python
from behave import given, when, then

@given('a registered user with email "{email}" and password "{password}"')
def step_given_registered_user(context, email, password):
    # arrange
    pass

@when('the user submits the login form')
def step_when_submit_login(context):
    # act
    pass

@then('the user should be redirected to the dashboard')
def step_then_redirected_to_dashboard(context):
    # assert
    pass
```

### Cucumber.js (JavaScript/TypeScript)
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');

Given('a registered user with email {string} and password {string}', function (email, password) {
    // arrange
});

When('the user submits the login form', function () {
    // act
});

Then('the user should be redirected to the dashboard', function () {
    // assert
});
```

## Complete Feature File Example

```gherkin
@e-commerce @cart
Feature: Shopping Cart Management
  As an online shopper
  I want to manage items in my shopping cart
  So that I can review and purchase the products I want

  Background:
    Given the user is logged in as "shopper@example.com"
    And the product catalog contains:
      | sku   | name           | price  | stock |
      | WM001 | Wireless Mouse | 29.99  | 50    |
      | KB002 | Mechanical KB  | 89.99  | 25    |
      | HD003 | USB-C Hub      | 49.99  | 0     |

  @happy-path
  Scenario: Add an in-stock item to the cart
    Given the shopping cart is empty
    When the user adds product "WM001" to the cart
    Then the cart should contain 1 item
    And the cart total should be "$29.99"

  @happy-path
  Scenario: Update item quantity in the cart
    Given the cart contains 1 unit of "WM001"
    When the user changes the quantity of "WM001" to 3
    Then the cart should contain 3 items
    And the cart total should be "$89.97"

  @negative
  Scenario: Cannot add out-of-stock item
    Given the shopping cart is empty
    When the user adds product "HD003" to the cart
    Then the user should see an error "This item is currently out of stock"
    And the cart should remain empty

  @negative
  Scenario: Cannot exceed available stock
    Given the cart contains 1 unit of "WM001"
    When the user changes the quantity of "WM001" to 100
    Then the user should see an error "Only 50 units available"
    And the quantity of "WM001" should remain 1

  Scenario: Remove item from cart
    Given the cart contains 1 unit of "WM001"
    And the cart contains 1 unit of "KB002"
    When the user removes "WM001" from the cart
    Then the cart should contain 1 item
    And the cart total should be "$89.99"

  @data-driven
  Scenario Outline: Apply discount codes
    Given the cart total is "$100.00"
    When the user applies discount code "<code>"
    Then the discount should be "<discount>"
    And the new total should be "<total>"

    Examples:
      | code       | discount | total  |
      | SAVE10     | 10%      | $90.00 |
      | FLAT20     | $20.00   | $80.00 |
      | EXPIRED01  | 0%       | $100.00|

    @vip
    Examples: VIP codes
      | code       | discount | total  |
      | VIP25      | 25%      | $75.00 |
      | VIPFLAT50  | $50.00   | $50.00 |
```

## Test Runners

| Runner | Language | Install | Run Command |
|--------|----------|---------|-------------|
| **Cucumber** | Java | Maven/Gradle dependency | `mvn test` / `gradle test` |
| **Cucumber.js** | JavaScript/TypeScript | `npm install @cucumber/cucumber` | `npx cucumber-js` |
| **SpecFlow** | C# (.NET Framework) | NuGet `SpecFlow` | `dotnet test` |
| **Reqnroll** | C# (.NET 6+) | NuGet `Reqnroll` | `dotnet test` |
| **Behave** | Python | `pip install behave` | `behave` |
| **Godog** | Go | `go install github.com/cucumber/godog/cmd/godog` | `godog` |
| **Behat** | PHP | `composer require --dev behat/behat` | `vendor/bin/behat` |

## Declarative vs Imperative Style

### Imperative (avoid)
Imperative scenarios describe the exact UI interactions -- they are brittle and hard to maintain.

```gherkin
Scenario: Login
  Given the user navigates to "https://app.example.com/login"
  And the user types "alice@example.com" into the field with id "email"
  And the user types "Str0ng!Pass" into the field with id "password"
  And the user clicks the button with id "login-btn"
  Then the page URL should be "https://app.example.com/dashboard"
  And the element with id "welcome-msg" should contain "Hello, Alice"
```

### Declarative (prefer)
Declarative scenarios describe the intended behavior without prescribing how the UI works.

```gherkin
Scenario: Login
  Given a registered user "Alice" with valid credentials
  When Alice logs in
  Then Alice should see her personalized dashboard
```

The step definitions handle the implementation details. When the UI changes, only step definitions need updating -- the feature file remains stable.

## Best Practices

- **One Feature per file** -- name the file after the feature (e.g., `shopping_cart.feature`).
- **Write declarative, not imperative scenarios** -- describe *what* should happen, not *how* the UI works.
- **Keep scenarios independent** -- no scenario should depend on the outcome of another. Use `Background` for shared setup.
- **Use Scenario Outline for data-driven tests** -- avoid duplicating scenarios that differ only in input/output values.
- **Limit steps per scenario** -- aim for 3-7 steps. If a scenario needs more, consider splitting it or abstracting steps.
- **Avoid conjunctive steps** -- a step like `Given the user is logged in and has items in the cart` should be two steps.
- **Use domain language, not technical jargon** -- feature files are a communication tool for the whole team.
- **Tag strategically** -- use tags for test suites (`@smoke`), priority (`@critical`), and feature areas (`@payments`), not for test management metadata.
- **Reuse steps across scenarios** -- write generic, parameterized step definitions that compose well.
- **Background should be short** -- if it grows beyond 3-4 steps, consider reorganizing the feature file.
- **Use Rules (Gherkin 6+)** to group scenarios by business rule within a feature.
- **Put feature files in a directory structure mirroring the application** -- e.g., `features/authentication/`, `features/cart/`, `features/checkout/`.

## Project Structure

```
features/
  authentication/
    login.feature
    registration.feature
  cart/
    add_to_cart.feature
    checkout.feature
  step_definitions/
    authentication_steps.js
    cart_steps.js
  support/
    hooks.js
    world.js
```
