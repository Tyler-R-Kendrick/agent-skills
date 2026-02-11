---
name: pidgin
description: Guidance for Pidgin parser combinator library.
metadata:
  displayName: Pidgin
---

# Pidgin

## Overview
Pidgin is a fast parser combinator library for building parsers in C#.

## Example
```csharp
using Pidgin;
using static Pidgin.Parser;

// Simple parser
var numberParser = Digit.AtLeastOnce()
    .Select(chars => int.Parse(new string(chars.ToArray())));

var result = numberParser.Parse("123");  // 123

// Complex parser
var identifierParser = Letter
    .Then(LetterOrDigit.Or(Char('_')).Many())
    .Select(chars => new string(chars.ToArray()));

// Expression parser
Parser<char, int> Expr = null;
var factor = Digit.Select(c => c - '0')
    .Or(Char('(').Then(Rec(() => Expr)).Before(Char(')')));
    
Expr = factor.ChainL(
    Char('+').ThenReturn<Func<int, int, int>>((x, y) => x + y));
```

## Best Practices
- Compose parsers from smaller ones
- Handle whitespace appropriately
- Provide good error messages
- Test with edge cases
