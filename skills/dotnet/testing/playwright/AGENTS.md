# Playwright

## Overview
Playwright is a cross-browser automation library for testing web applications.

## Example
```csharp
using Microsoft.Playwright;

var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
var page = await browser.NewPageAsync();

await page.GotoAsync("https://example.com");
await page.ClickAsync("button#submit");
await page.FillAsync("input[name='email']", "test@example.com");

var content = await page.TextContentAsync("h1");
await browser.CloseAsync();
```

## Features
- Multiple browser support
- Auto-wait for elements
- Network interception
- Screenshots and videos
- Mobile emulation

## Best Practices
- Use data-testid attributes
- Implement page object pattern
- Handle dynamic content properly
- Clean up resources
- Use headless mode in CI
