---
title: "Intercept network requests to isolate frontend tests from backends"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: playwright, dotnet, testing, cross-browser-end-to-end-testing, ui-automation, screenshot-and-visual-regression-testing
---

## Intercept network requests to isolate frontend tests from backends

Intercept network requests to isolate frontend tests from backends: use `page.RouteAsync` to mock API responses so UI tests do not depend on running backend services.
