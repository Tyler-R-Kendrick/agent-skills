---
name: i18n
description: >
  Guidance for internationalization (i18n) architecture in .NET applications.
  USE FOR: designing i18n-ready applications, externalizing user-facing strings, building multi-language ASP.NET Core apps, Razor view localization, data annotation localization.
  DO NOT USE FOR: low-level culture formatting (use globalization-localization), ICU plural/gender patterns (use messageformat-net), basic resource file operations (use resources-localization).
license: MIT
metadata:
  displayName: "Internationalization (i18n)"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Internationalization (i18n)

## Overview

Internationalization (i18n) is the architectural process of designing .NET applications so they can be adapted to multiple languages and regions without code changes. In ASP.NET Core this is built on three pillars: `IStringLocalizer<T>` for string lookup, `IViewLocalizer` for Razor views, and `IHtmlLocalizer<T>` for HTML-safe localized content. Resource files (`.resx`) provide the translation storage, while the request localization middleware selects the active culture at runtime.

A well-internationalized application externalizes every user-facing string, uses culture-aware formatting, and supports right-to-left (RTL) layouts. The goal is to make adding a new language a content task (adding a `.resx` file) rather than a code change.

## Service Registration and Resource Files

Configure localization services and point them at your resource directory. Resource files follow the naming convention `{Type}.{culture}.resx`.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Resources/Controllers/HomeController.en-US.resx
// Resources/Controllers/HomeController.fr-FR.resx
// Resources/Controllers/HomeController.ar-SA.resx
builder.Services.AddLocalization(options =>
    options.ResourcesPath = "Resources");

builder.Services.AddControllersWithViews()
    .AddViewLocalization()
    .AddDataAnnotationsLocalization();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("fr-FR"),
        new CultureInfo("ar-SA"),
    };

    options.DefaultRequestCulture = new RequestCulture("en-US");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
});

var app = builder.Build();
app.UseRequestLocalization();
app.MapControllers();
app.Run();
```

## Controller Localization with IStringLocalizer

Inject `IStringLocalizer<T>` to resolve localized strings in controllers and services. The type parameter `T` determines which `.resx` file is used for lookup.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace MyApp.Controllers;

public class HomeController : Controller
{
    private readonly IStringLocalizer<HomeController> _localizer;

    public HomeController(IStringLocalizer<HomeController> localizer)
    {
        _localizer = localizer;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = _localizer["WelcomeTitle"];
        ViewData["Message"] = _localizer["WelcomeMessage",
            DateTime.Now.ToString("D")];
        return View();
    }

    public IActionResult Error()
    {
        var message = _localizer["ErrorNotFound"];
        // message.ResourceNotFound == true if key is missing
        return View("Error", message.Value);
    }
}
```

## Razor View Localization

Use `IViewLocalizer` in Razor views for inline localized content. It resolves resources based on the view file path.

```csharp
@using Microsoft.AspNetCore.Mvc.Localization

@inject IViewLocalizer Localizer

<h1>@Localizer["PageHeading"]</h1>
<p>@Localizer["WelcomeText", User.Identity?.Name ?? "Guest"]</p>

<!-- HTML-safe localization -->
<div>@Localizer["RichContent"]</div>
<!-- RichContent value: "Click <a href='/help'>here</a> for help" -->
<!-- IViewLocalizer returns IHtmlContent, so HTML is not escaped -->
```

## Data Annotation Localization

Localize validation error messages by enabling data annotations localization.

```csharp
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models;

public class RegisterViewModel
{
    [Required(ErrorMessage = "FieldRequired")]
    [Display(Name = "EmailLabel")]
    [EmailAddress(ErrorMessage = "InvalidEmail")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "FieldRequired")]
    [Display(Name = "PasswordLabel")]
    [StringLength(100, MinimumLength = 8,
        ErrorMessage = "PasswordLength")]
    public string Password { get; set; } = string.Empty;
}
```

The error message keys (`FieldRequired`, `InvalidEmail`, `PasswordLength`) are resolved from a shared resource file:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

builder.Services.AddControllersWithViews()
    .AddDataAnnotationsLocalization(options =>
    {
        options.DataAnnotationLocalizerProvider =
            (type, factory) =>
                factory.Create(typeof(SharedResource));
    });
```

```csharp
namespace MyApp.Resources;

// Marker class for shared resources
// Resources/SharedResource.en-US.resx
// Resources/SharedResource.fr-FR.resx
public class SharedResource { }
```

## Shared Resource Pattern

Use a shared resource class for strings that appear across multiple controllers and views.

```csharp
using Microsoft.Extensions.Localization;

namespace MyApp.Services;

public class NotificationService
{
    private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
    private readonly IStringLocalizer<NotificationService> _localizer;

    public NotificationService(
        IStringLocalizer<SharedResource> sharedLocalizer,
        IStringLocalizer<NotificationService> localizer)
    {
        _sharedLocalizer = sharedLocalizer;
        _localizer = localizer;
    }

    public string GetGreeting(string userName)
    {
        // From NotificationService.{culture}.resx
        var greeting = _localizer["GreetingTemplate", userName];

        // From SharedResource.{culture}.resx
        var appName = _sharedLocalizer["ApplicationName"];

        return $"{greeting} - {appName}";
    }
}
```

## Resource File Naming Conventions

| Scenario | File Path |
|---|---|
| Controller `HomeController` | `Resources/Controllers/HomeController.fr-FR.resx` |
| Service `OrderService` | `Resources/Services/OrderService.fr-FR.resx` |
| View `Views/Home/Index.cshtml` | `Resources/Views/Home/Index.fr-FR.resx` |
| Shared resources | `Resources/SharedResource.fr-FR.resx` |
| Neutral fallback | `Resources/Controllers/HomeController.resx` |

## Best Practices

1. **Externalize every user-facing string** into `.resx` files from the start; retrofitting i18n into an existing codebase is significantly more expensive than designing for it up front.
2. **Use the `IStringLocalizer<T>` generic pattern** instead of `IStringLocalizerFactory` directly, so the DI container automatically resolves the correct resource file based on the type.
3. **Create a shared resource class** for strings used across multiple components (button labels, validation messages, app name) to avoid duplication across `.resx` files.
4. **Always provide a neutral culture fallback** (e.g., `SharedResource.resx` without a culture suffix) so missing translations return a meaningful default rather than the resource key.
5. **Use parameterized localization** (`_localizer["Hello, {0}!", name]`) instead of string concatenation to support word-order differences across languages.
6. **Enable data annotations localization** with a shared resource provider so all validation messages are centralized and translatable.
7. **Test with pseudo-localization** (artificially lengthened strings, accented characters) to catch UI layout issues before real translations arrive.
8. **Handle `ResourceNotFound` gracefully** by checking `LocalizedString.ResourceNotFound` in development mode and logging missing keys for the translation team.
9. **Support RTL layouts** by setting `dir="rtl"` conditionally in your layout based on `CultureInfo.CurrentUICulture.TextInfo.IsRightToLeft`.
10. **Keep resource keys stable and descriptive** (e.g., `OrderConfirmation_Subject` rather than `String1`) because renaming keys breaks existing translations.
