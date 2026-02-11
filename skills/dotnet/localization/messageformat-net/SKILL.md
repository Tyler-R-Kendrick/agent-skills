---
name: messageformat-net
description: >
  Guidance for MessageFormat.NET (Jeffijoe.MessageFormat) ICU message formatting library.
  USE FOR: ICU MessageFormat pluralization, gender/select patterns, complex parameterized localization messages, locale-aware plural rules.
  DO NOT USE FOR: basic resource file localization (use resources-localization), culture formatting of dates/numbers (use globalization-localization), general i18n architecture (use i18n).
license: MIT
metadata:
  displayName: "MessageFormat.NET"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "MessageFormat.NET GitHub Repository"
    url: "https://github.com/jeffijoe/messageformat.net"
  - title: "MessageFormat NuGet Package"
    url: "https://www.nuget.org/packages/MessageFormat"
---

# MessageFormat.NET

## Overview

MessageFormat.NET (`Jeffijoe.MessageFormat`) is a .NET implementation of the ICU MessageFormat standard. It handles complex localization scenarios that simple string interpolation cannot address, such as pluralization rules that vary by language, gender-based text selection, and nested formatting patterns. Unlike basic `.resx` resource lookups, MessageFormat enables a single format string to produce grammatically correct output across languages with different plural categories (zero, one, two, few, many, other).

The library is especially valuable for languages like Arabic (six plural forms), Polish (complex plural rules for numbers), and Russian (different endings for 1, 2-4, and 5+). It follows the ICU specification used by Android, iOS, and web i18n frameworks, making translation files portable across platforms.

## Basic Variable Substitution

Simple named arguments replace placeholders with values.

```csharp
using Jeffijoe.MessageFormat;

var mf = new MessageFormatter();

string result = mf.FormatMessage(
    "Hello {name}, welcome to {appName}!",
    new Dictionary<string, object?>
    {
        { "name", "Alice" },
        { "appName", "Contoso" }
    });
// Output: "Hello Alice, welcome to Contoso!"
```

## Pluralization

ICU plural rules handle the grammatical differences between "1 item" and "5 items" across languages. The plural categories are: `zero`, `one`, `two`, `few`, `many`, `other`.

```csharp
using Jeffijoe.MessageFormat;

var mf = new MessageFormatter();

// English pluralization
string pattern = "{count, plural, "
    + "one {You have # new message.} "
    + "other {You have # new messages.}}";

string single = mf.FormatMessage(pattern,
    new Dictionary<string, object?> { { "count", 1 } });
// Output: "You have 1 new message."

string multiple = mf.FormatMessage(pattern,
    new Dictionary<string, object?> { { "count", 5 } });
// Output: "You have 5 new messages."

string zero = mf.FormatMessage(pattern,
    new Dictionary<string, object?> { { "count", 0 } });
// Output: "You have 0 new messages."
```

## Gender and Select Patterns

The `select` keyword chooses text based on an exact string match, commonly used for gender-aware messages.

```csharp
using Jeffijoe.MessageFormat;

var mf = new MessageFormatter();

string pattern = "{gender, select, "
    + "male {{name} updated his profile.} "
    + "female {{name} updated her profile.} "
    + "other {{name} updated their profile.}}";

string result = mf.FormatMessage(pattern,
    new Dictionary<string, object?>
    {
        { "gender", "female" },
        { "name", "Alice" }
    });
// Output: "Alice updated her profile."
```

## Nested Patterns

Combine `select` and `plural` for complex messages that depend on multiple variables.

```csharp
using Jeffijoe.MessageFormat;

var mf = new MessageFormatter();

string pattern =
    "{gender, select, "
    + "male {{count, plural, "
    +     "one {He bought # item.} "
    +     "other {He bought # items.}}} "
    + "female {{count, plural, "
    +     "one {She bought # item.} "
    +     "other {She bought # items.}}} "
    + "other {{count, plural, "
    +     "one {They bought # item.} "
    +     "other {They bought # items.}}}}";

string result = mf.FormatMessage(pattern,
    new Dictionary<string, object?>
    {
        { "gender", "male" },
        { "count", 3 }
    });
// Output: "He bought 3 items."
```

## Integration with ASP.NET Core Localization

Store MessageFormat patterns in resource files and format them at runtime.

```csharp
using Jeffijoe.MessageFormat;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

// Register MessageFormatter as a singleton
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddLocalization(options =>
    options.ResourcesPath = "Resources");
builder.Services.AddSingleton<MessageFormatter>();

var app = builder.Build();
app.Run();
```

```csharp
using Jeffijoe.MessageFormat;
using Microsoft.Extensions.Localization;

namespace MyApp.Services;

public class NotificationService
{
    private readonly IStringLocalizer<NotificationService> _localizer;
    private readonly MessageFormatter _formatter;

    public NotificationService(
        IStringLocalizer<NotificationService> localizer,
        MessageFormatter formatter)
    {
        _localizer = localizer;
        _formatter = formatter;
    }

    public string GetUnreadNotification(int count, string gender)
    {
        // Pattern stored in .resx:
        // "UnreadMessages" =>
        //   "{gender, select,
        //     male {{count, plural, one {He has # unread message.}
        //            other {He has # unread messages.}}}
        //     female {{count, plural, one {She has # unread message.}
        //              other {She has # unread messages.}}}
        //     other {{count, plural, one {They have # unread message.}
        //             other {They have # unread messages.}}}}"
        string pattern = _localizer["UnreadMessages"];
        return _formatter.FormatMessage(pattern,
            new Dictionary<string, object?>
            {
                { "count", count },
                { "gender", gender }
            });
    }
}
```

## ICU Plural Categories by Language

| Language | Categories Used | Example Rule |
|---|---|---|
| English | one, other | 1 = one; everything else = other |
| French | one, other | 0 and 1 = one; 2+ = other |
| Arabic | zero, one, two, few, many, other | All six categories used |
| Polish | one, few, many, other | 1 = one; 2-4 = few; 5-21 = many |
| Japanese | other | No plural distinction |
| Russian | one, few, many, other | Endings-based rules |

## Best Practices

1. **Use MessageFormat for any string that contains a count** rather than conditional logic in code; the plural rules are language-specific and cannot be replicated with simple `if/else`.
2. **Store MessageFormat patterns in `.resx` files** alongside regular localized strings so translators can modify plural forms and gender patterns per language.
3. **Use the `#` placeholder** inside plural blocks to insert the formatted number; avoid repeating the variable name for the numeric value.
4. **Always include the `other` category** in both `plural` and `select` blocks as a required fallback; omitting it causes runtime errors for unmatched values.
5. **Keep `MessageFormatter` as a singleton** in the DI container because it is stateless and thread-safe, avoiding unnecessary allocations.
6. **Test patterns with boundary values** (0, 1, 2, 5, 11, 21, 100, 101) because plural rules have edge cases in many languages (e.g., Polish treats 12-14 differently from 2-4).
7. **Avoid embedding HTML in MessageFormat patterns**; instead, split the message into segments and wrap them in markup in the view layer.
8. **Validate patterns at startup** by formatting each pattern with test values during application initialization to catch syntax errors before they reach production.
9. **Prefer named arguments** (`{count}`) over positional arguments for clarity and to make patterns self-documenting for translators.
10. **Document the available variables** next to each resource key so translators know which placeholders (e.g., `{count}`, `{name}`, `{gender}`) are available in each pattern.
