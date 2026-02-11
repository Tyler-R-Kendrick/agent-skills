# Globalization and Localization

## Overview

.NET provides a rich globalization and localization infrastructure through `System.Globalization` and the ASP.NET Core request localization middleware. Globalization is the process of designing applications that support different cultures, while localization is the process of adapting a globalized application to a particular culture. Together they enable applications to format dates, numbers, currencies, and sort strings according to the conventions of any supported locale.

The core types are `CultureInfo`, `RegionInfo`, `NumberFormatInfo`, `DateTimeFormatInfo`, and the `RequestLocalizationMiddleware` in ASP.NET Core. These provide deterministic, standards-compliant formatting for user-facing content without hand-rolled parsing logic.

## Culture-Aware Formatting

Use `CultureInfo` to control how values are formatted and parsed. Always specify a culture explicitly rather than relying on the thread's current culture, which can change unexpectedly in server environments.

```csharp
using System.Globalization;

public static class CultureFormattingExamples
{
    public static string FormatCurrency(decimal amount, string cultureName)
    {
        var culture = new CultureInfo(cultureName);
        return amount.ToString("C", culture);
        // "en-US" => "$1,234.56"
        // "de-DE" => "1.234,56 €"
        // "ja-JP" => "¥1,235"
    }

    public static string FormatDate(DateTime date, string cultureName)
    {
        var culture = new CultureInfo(cultureName);
        return date.ToString("D", culture);
        // "en-US" => "Monday, January 6, 2025"
        // "fr-FR" => "lundi 6 janvier 2025"
    }

    public static decimal ParseNumber(string input, string cultureName)
    {
        var culture = new CultureInfo(cultureName);
        return decimal.Parse(input, NumberStyles.Number, culture);
        // "1.234,56" with "de-DE" => 1234.56m
    }
}
```

## Request Localization Middleware

ASP.NET Core provides middleware that automatically sets the current culture per-request based on query strings, cookies, or the `Accept-Language` header.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLocalization(options =>
    options.ResourcesPath = "Resources");

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("fr-FR"),
        new CultureInfo("de-DE"),
        new CultureInfo("ja-JP"),
    };

    options.DefaultRequestCulture = new RequestCulture("en-US");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;

    // Culture resolution order:
    // 1. QueryStringRequestCultureProvider  (?culture=fr-FR)
    // 2. CookieRequestCultureProvider
    // 3. AcceptLanguageHeaderRequestCultureProvider
    options.RequestCultureProviders.Insert(0,
        new QueryStringRequestCultureProvider());
});

var app = builder.Build();
app.UseRequestLocalization();
app.Run();
```

## Custom Culture Provider

For applications that store user locale preferences in a database or JWT claim, implement a custom `RequestCultureProvider`.

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using System.Security.Claims;
using System.Threading.Tasks;

public class UserProfileCultureProvider : RequestCultureProvider
{
    public override Task<ProviderCultureResult?> DetermineProviderCultureResult(
        HttpContext httpContext)
    {
        var cultureClaim = httpContext.User
            .FindFirst("preferred_locale")?.Value;

        if (string.IsNullOrEmpty(cultureClaim))
        {
            return NullProviderCultureResult;
        }

        var result = new ProviderCultureResult(cultureClaim);
        return Task.FromResult<ProviderCultureResult?>(result);
    }
}
```

Register the provider before the defaults:

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.RequestCultureProviders.Insert(0,
        new UserProfileCultureProvider());
});
```

## String Comparison and Sorting

Culture-sensitive string comparison is critical for correct sorting and searching. Use `StringComparer` or `CultureInfo.CompareInfo` for locale-aware ordering.

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;

public static class CultureSortingExamples
{
    public static List<string> SortByCulture(
        List<string> items, string cultureName)
    {
        var culture = new CultureInfo(cultureName);
        items.Sort(culture.CompareInfo.Compare);
        return items;
    }

    public static bool CultureAwareContains(
        string source, string value, string cultureName)
    {
        var culture = new CultureInfo(cultureName);
        return culture.CompareInfo.IndexOf(
            source, value, CompareOptions.IgnoreCase) >= 0;
    }
}
```

## Culture Provider Comparison

| Provider | Source | Priority | Use Case |
|---|---|---|---|
| QueryStringRequestCultureProvider | `?culture=fr-FR` | Highest (default) | Testing, explicit URL switching |
| CookieRequestCultureProvider | `.AspNetCore.Culture` cookie | Medium | Persistent user preference |
| AcceptLanguageHeaderRequestCultureProvider | `Accept-Language` header | Lowest | Browser-default experience |
| Custom (e.g., UserProfileCultureProvider) | DB / JWT / session | Configurable | Enterprise apps with profiles |

## Best Practices

1. **Always pass an explicit `CultureInfo`** to `ToString`, `Parse`, and `TryParse` methods instead of relying on `CultureInfo.CurrentCulture`, which varies per-thread and per-request.
2. **Use `CultureInfo.InvariantCulture`** for machine-readable data such as log entries, config files, and inter-service communication to avoid locale-dependent parsing failures.
3. **Register `RequestLocalizationMiddleware` early** in the pipeline (before MVC/Razor), so all downstream middleware observes the correct culture.
4. **Limit supported cultures** to those you actually have translations for; do not accept arbitrary culture codes to avoid fallback surprises.
5. **Store culture-neutral data** in databases (UTC dates, invariant decimal formats) and format only at the presentation layer.
6. **Test with cultures that use different decimal separators** (e.g., `de-DE` uses `,` for decimals) to catch parsing bugs that are invisible with `en-US`.
7. **Use `StringComparison.OrdinalIgnoreCase`** for internal identifiers and keys; reserve culture-sensitive comparison for user-facing content.
8. **Set `SupportedCultures` and `SupportedUICultures` together** in `RequestLocalizationOptions` to avoid mismatches between formatting culture and resource lookup culture.
9. **Validate culture names** with `CultureInfo.GetCultureInfo` inside a try-catch before constructing `CultureInfo` objects from user input, to avoid `CultureNotFoundException`.
10. **Prefer `DateTimeOffset` over `DateTime`** when dealing with globalized applications to avoid time zone ambiguity across cultures.
