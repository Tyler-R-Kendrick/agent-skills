---
name: playwright
description: >
  Guidance for Playwright browser automation and end-to-end testing in .NET.
  USE FOR: cross-browser end-to-end testing, UI automation, screenshot and visual regression testing,
  network request interception, mobile viewport emulation, testing SPAs and server-rendered pages,
  CI/CD browser testing in headless mode.
  DO NOT USE FOR: unit testing (use xUnit with Moq), API contract testing (use Pact),
  load testing (use k6 or NBomber), or testing non-web applications.
license: MIT
metadata:
  displayName: "Playwright"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Playwright

## Overview

Playwright is a cross-browser automation library from Microsoft that enables end-to-end testing of web applications across Chromium, Firefox, and WebKit. The .NET implementation (`Microsoft.Playwright`) provides a strongly typed C# API for navigating pages, filling forms, clicking elements, intercepting network requests, emulating mobile devices, and capturing screenshots. Playwright automatically waits for elements to be actionable before performing operations, eliminating most flakiness caused by timing issues. It runs in headed or headless mode and integrates with xUnit, NUnit, and MSTest via the `Microsoft.Playwright.MSTest` or `Microsoft.Playwright.NUnit` packages.

## Basic Page Navigation and Assertions

Navigate to a page, interact with elements, and make assertions.

```csharp
using Microsoft.Playwright;
using Xunit;

public class BasicTests : IAsyncLifetime
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { Headless = true });
    }

    [Fact]
    public async Task Homepage_Has_Correct_Title()
    {
        var page = await _browser.NewPageAsync();
        await page.GotoAsync("https://example.com");

        string title = await page.TitleAsync();
        Assert.Equal("Example Domain", title);

        var heading = await page.TextContentAsync("h1");
        Assert.Equal("Example Domain", heading);
    }

    [Fact]
    public async Task Form_Submission_Works()
    {
        var page = await _browser.NewPageAsync();
        await page.GotoAsync("https://myapp.example.com/login");

        await page.FillAsync("[data-testid='email']", "user@example.com");
        await page.FillAsync("[data-testid='password']", "SecurePass123!");
        await page.ClickAsync("[data-testid='login-button']");

        await page.WaitForURLAsync("**/dashboard");
        var welcome = await page.TextContentAsync("[data-testid='welcome-message']");
        Assert.Contains("Welcome", welcome);
    }

    public async Task DisposeAsync()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}
```

## Page Object Model

Organize test code using the Page Object Model pattern for maintainability.

```csharp
using Microsoft.Playwright;

public class LoginPage
{
    private readonly IPage _page;

    public LoginPage(IPage page) => _page = page;

    private ILocator EmailInput =>
        _page.GetByTestId("email");
    private ILocator PasswordInput =>
        _page.GetByTestId("password");
    private ILocator LoginButton =>
        _page.GetByTestId("login-button");
    private ILocator ErrorMessage =>
        _page.GetByTestId("error-message");

    public async Task NavigateAsync()
    {
        await _page.GotoAsync("/login");
    }

    public async Task<DashboardPage> LoginAsync(
        string email, string password)
    {
        await EmailInput.FillAsync(email);
        await PasswordInput.FillAsync(password);
        await LoginButton.ClickAsync();
        await _page.WaitForURLAsync("**/dashboard");
        return new DashboardPage(_page);
    }

    public async Task<string> GetErrorMessageAsync()
    {
        await ErrorMessage.WaitForAsync();
        return await ErrorMessage.TextContentAsync() ?? string.Empty;
    }
}

public class DashboardPage
{
    private readonly IPage _page;

    public DashboardPage(IPage page) => _page = page;

    private ILocator WelcomeText =>
        _page.GetByTestId("welcome-message");
    private ILocator LogoutButton =>
        _page.GetByTestId("logout-button");

    public async Task<string> GetWelcomeTextAsync() =>
        await WelcomeText.TextContentAsync() ?? string.Empty;

    public async Task LogoutAsync()
    {
        await LogoutButton.ClickAsync();
        await _page.WaitForURLAsync("**/login");
    }
}

// Test using page objects
public class LoginTests : IAsyncLifetime
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;
    private IPage _page = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { Headless = true });
        _page = await _browser.NewPageAsync();
        _page.SetDefaultNavigationTimeout(10000);
    }

    [Fact]
    public async Task Successful_Login_Shows_Dashboard()
    {
        var loginPage = new LoginPage(_page);
        await loginPage.NavigateAsync();

        var dashboard = await loginPage.LoginAsync(
            "admin@example.com", "SecurePass!");

        string welcome = await dashboard.GetWelcomeTextAsync();
        Assert.Contains("Welcome", welcome);
    }

    public async Task DisposeAsync()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}
```

## Network Interception

Intercept and mock network requests for isolated testing.

```csharp
using Microsoft.Playwright;
using Xunit;

public class NetworkInterceptionTests : IAsyncLifetime
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { Headless = true });
    }

    [Fact]
    public async Task Mock_Api_Response()
    {
        var page = await _browser.NewPageAsync();

        // Intercept API calls and return mock data
        await page.RouteAsync("**/api/users", async route =>
        {
            await route.FulfillAsync(new RouteFulfillOptions
            {
                Status = 200,
                ContentType = "application/json",
                Body = """
                [
                    {"id": 1, "name": "Mock Alice"},
                    {"id": 2, "name": "Mock Bob"}
                ]
                """
            });
        });

        await page.GotoAsync("https://myapp.example.com/users");
        var firstUser = await page.TextContentAsync(
            "[data-testid='user-name']:first-child");
        Assert.Equal("Mock Alice", firstUser);
    }

    [Fact]
    public async Task Capture_Network_Requests()
    {
        var page = await _browser.NewPageAsync();
        var apiRequests = new List<IRequest>();

        page.Request += (_, request) =>
        {
            if (request.Url.Contains("/api/"))
                apiRequests.Add(request);
        };

        await page.GotoAsync("https://myapp.example.com/dashboard");
        await page.WaitForLoadStateAsync(LoadState.NetworkIdle);

        Assert.True(apiRequests.Count > 0,
            "Expected API calls during page load");
    }

    public async Task DisposeAsync()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}
```

## Screenshots and Visual Testing

Capture screenshots for debugging and visual regression testing.

```csharp
using Microsoft.Playwright;
using Xunit;

public class VisualTests : IAsyncLifetime
{
    private IPlaywright _playwright = null!;
    private IBrowser _browser = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { Headless = true });
    }

    [Fact]
    public async Task Capture_Full_Page_Screenshot()
    {
        var page = await _browser.NewPageAsync();
        await page.GotoAsync("https://myapp.example.com");

        await page.ScreenshotAsync(new PageScreenshotOptions
        {
            Path = "screenshots/homepage.png",
            FullPage = true
        });
    }

    [Fact]
    public async Task Capture_Element_Screenshot()
    {
        var page = await _browser.NewPageAsync();
        await page.GotoAsync("https://myapp.example.com/dashboard");

        var chart = page.GetByTestId("sales-chart");
        await chart.ScreenshotAsync(new LocatorScreenshotOptions
        {
            Path = "screenshots/sales-chart.png"
        });
    }

    [Fact]
    public async Task Test_Mobile_Viewport()
    {
        var context = await _browser.NewContextAsync(
            new BrowserNewContextOptions
            {
                ViewportSize = new ViewportSize
                {
                    Width = 375,
                    Height = 812
                },
                UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            });

        var page = await context.NewPageAsync();
        await page.GotoAsync("https://myapp.example.com");

        // Verify mobile navigation is visible
        var mobileMenu = page.GetByTestId("mobile-menu");
        await Assertions.Expect(mobileMenu).ToBeVisibleAsync();

        await page.ScreenshotAsync(new PageScreenshotOptions
        {
            Path = "screenshots/mobile-homepage.png"
        });
    }

    public async Task DisposeAsync()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }
}
```

## Multi-Browser Testing

Run the same tests across Chromium, Firefox, and WebKit.

```csharp
using Microsoft.Playwright;
using Xunit;

public class CrossBrowserTests : IAsyncLifetime
{
    private IPlaywright _playwright = null!;

    public async Task InitializeAsync()
    {
        _playwright = await Playwright.CreateAsync();
    }

    [Theory]
    [InlineData("chromium")]
    [InlineData("firefox")]
    [InlineData("webkit")]
    public async Task Page_Loads_In_All_Browsers(string browserType)
    {
        var browser = browserType switch
        {
            "chromium" => await _playwright.Chromium.LaunchAsync(),
            "firefox" => await _playwright.Firefox.LaunchAsync(),
            "webkit" => await _playwright.Webkit.LaunchAsync(),
            _ => throw new ArgumentException(browserType)
        };

        var page = await browser.NewPageAsync();
        await page.GotoAsync("https://myapp.example.com");

        var title = await page.TitleAsync();
        Assert.NotEmpty(title);

        await browser.CloseAsync();
    }

    public Task DisposeAsync()
    {
        _playwright.Dispose();
        return Task.CompletedTask;
    }
}
```

## Browser Comparison for Testing

| Feature | Chromium | Firefox | WebKit |
|---------|---------|---------|--------|
| Engine | Blink | Gecko | WebKit |
| Market share | Highest | Medium | Safari-only |
| DevTools protocol | CDP | CDP adapter | CDP adapter |
| Speed | Fast | Moderate | Fast |
| Mobile emulation | Full | Limited | iOS-like |
| Recommended for | Default CI testing | Cross-engine coverage | Safari compatibility |

## Best Practices

1. **Use `data-testid` attributes for element selection**: prefer `GetByTestId("submit")` over CSS selectors or XPath; test IDs are stable across UI refactors.
2. **Implement the Page Object Model for all page interactions**: encapsulate locators and actions in page classes so changes to the UI structure require updates in one place.
3. **Run tests in headless mode in CI/CD**: use `Headless = true` for faster execution in pipelines; switch to headed mode only for local debugging.
4. **Use `WaitForURLAsync` and `WaitForLoadStateAsync` instead of `Task.Delay`**: explicit waits are more reliable and faster than fixed delays; Playwright auto-waits for most actions.
5. **Intercept network requests to isolate frontend tests from backends**: use `page.RouteAsync` to mock API responses so UI tests do not depend on running backend services.
6. **Capture screenshots on test failure for debugging**: in your `DisposeAsync` or `AfterScenario`, check if the test failed and save a screenshot with the test name.
7. **Test across all three browser engines at least once per release**: run the full suite on Chromium for speed in development, but verify Firefox and WebKit before production deploys.
8. **Set explicit timeouts instead of relying on defaults**: use `SetDefaultNavigationTimeout` and `SetDefaultTimeout` to prevent tests from hanging with unclear error messages.
9. **Use browser contexts for test isolation**: create a new `BrowserContext` per test instead of sharing one to prevent cookie, storage, and session leakage between tests.
10. **Install browser binaries in CI with `playwright install`**: run `pwsh bin/Debug/playwright.ps1 install` or `npx playwright install` in your CI pipeline setup step to ensure all required browsers are available.
