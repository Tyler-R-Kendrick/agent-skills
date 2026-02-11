---
title: "Use browser contexts for test isolation"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: playwright, dotnet, testing, cross-browser-end-to-end-testing, ui-automation, screenshot-and-visual-regression-testing
---

## Use browser contexts for test isolation

Use browser contexts for test isolation: create a new `BrowserContext` per test instead of sharing one to prevent cookie, storage, and session leakage between tests.
