---
title: "Use `WaitForURLAsync` and `WaitForLoadStateAsync` instead of `Task.Delay`"
impact: MEDIUM
impactDescription: "general best practice"
tags: playwright, dotnet, testing, cross-browser-end-to-end-testing, ui-automation, screenshot-and-visual-regression-testing
---

## Use `WaitForURLAsync` and `WaitForLoadStateAsync` instead of `Task.Delay`

Use `WaitForURLAsync` and `WaitForLoadStateAsync` instead of `Task.Delay`: explicit waits are more reliable and faster than fixed delays; Playwright auto-waits for most actions.
