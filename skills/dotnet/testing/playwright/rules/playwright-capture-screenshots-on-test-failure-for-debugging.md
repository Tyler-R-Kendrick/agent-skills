---
title: "Capture screenshots on test failure for debugging"
impact: MEDIUM
impactDescription: "general best practice"
tags: playwright, dotnet, testing, cross-browser-end-to-end-testing, ui-automation, screenshot-and-visual-regression-testing
---

## Capture screenshots on test failure for debugging

Capture screenshots on test failure for debugging: in your `DisposeAsync` or `AfterScenario`, check if the test failed and save a screenshot with the test name.
