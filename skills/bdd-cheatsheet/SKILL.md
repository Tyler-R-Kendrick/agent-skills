---
description: Guidance for Behavior-Driven Development (BDD) patterns and practices.
metadata:
  displayName: BDD Cheatsheet
---

# BDD Cheatsheet

## Overview
Behavior-Driven Development (BDD) focuses on defining software behavior through examples in natural language.

## Gherkin Syntax
```gherkin
Feature: Shopping Cart
  Scenario: Add item to cart
    Given the user is logged in
    And the cart is empty
    When the user adds "Book" to cart
    Then the cart should contain 1 item
    And the total should be "$19.99"
```

## Best Practices
- Write scenarios from user perspective
- Use Given-When-Then structure
- Keep scenarios focused and independent
- Use scenario outlines for data variations
- Avoid technical implementation details
- Make steps reusable

## Common Patterns
- **Given**: Set up initial state
- **When**: Perform action
- **Then**: Verify outcome
- **And**: Continue previous step type
- **But**: Negative continuation
