---
title: "Use `data-testid` attributes for element selection"
impact: LOW
impactDescription: "recommended but situational"
tags: playwright, dotnet, testing, cross-browser-end-to-end-testing, ui-automation, screenshot-and-visual-regression-testing
---

## Use `data-testid` attributes for element selection

Use `data-testid` attributes for element selection: prefer `GetByTestId("submit")` over CSS selectors or XPath; test IDs are stable across UI refactors.
