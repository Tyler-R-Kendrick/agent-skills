---
title: "Guard keyword parsers with `notFollowedBy` to prevent \"if\"..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: fparsec, dotnet, functional, f-parser-combinators, text-parsing, expression-parsers
---

## Guard keyword parsers with `notFollowedBy` to prevent "if"...

Guard keyword parsers with `notFollowedBy` to prevent "if" from matching as a prefix of "iffy"; use `>>. notFollowedBy (satisfy isIdentifierChar)`.
