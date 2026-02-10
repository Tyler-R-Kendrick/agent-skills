---
description: Guidance for internationalization (i18n) in .NET applications.
metadata:
  displayName: i18n
---

# Internationalization (i18n)

## Overview
Best practices for implementing internationalization and localization in .NET applications.

## Example
```csharp
using System.Globalization;
using System.Resources;

// Resource files: Resources.resx, Resources.fr.resx
var rm = new ResourceManager("MyApp.Resources", typeof(Program).Assembly);

var culture = new CultureInfo("fr-FR");
var message = rm.GetString("WelcomeMessage", culture);

// ASP.NET Core
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultures = new[] { "en-US", "fr-FR", "es-ES" };
    options.SetDefaultCulture("en-US")
        .AddSupportedCultures(cultures)
        .AddSupportedUICultures(cultures);
});
```

## Best Practices
- Use resource files (.resx)
- Support culture-specific formatting
- Externalize all user-facing strings
- Test with different locales
- Handle right-to-left languages
