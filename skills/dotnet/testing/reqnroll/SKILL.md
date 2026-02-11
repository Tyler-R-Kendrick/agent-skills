---
name: reqnroll
description: Guidance for Reqnroll BDD testing framework (SpecFlow successor).
metadata:
  displayName: Reqnroll
---

# Reqnroll

## Overview
Reqnroll is a BDD framework for .NET that allows you to write tests in natural language using Gherkin syntax.

## Example
```gherkin
Feature: User Login
  Scenario: Successful login
    Given a user with username "john@example.com"
    And the password is "SecurePass123"
    When the user attempts to login
    Then the login should succeed
    And the user should be redirected to dashboard
```

```csharp
[Binding]
public class LoginSteps
{
    [Given(@"a user with username ""(.*)""")]
    public void GivenUserWithUsername(string username)
    {
        // Setup user
    }
    
    [When(@"the user attempts to login")]
    public void WhenUserAttemptsLogin()
    {
        // Perform login
    }
}
```

## Best Practices
- Write scenarios from user perspective
- Keep steps reusable
- Use scenario context for state
- Avoid technical details in feature files
