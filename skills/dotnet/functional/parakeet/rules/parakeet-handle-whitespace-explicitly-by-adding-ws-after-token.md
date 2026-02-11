---
title: "Handle whitespace explicitly by adding `+ WS` after token..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: parakeet, dotnet, functional, c-peg-parser-combinators, grammar-definition, text-parsing
---

## Handle whitespace explicitly by adding `+ WS` after token...

Handle whitespace explicitly by adding `+ WS` after token rules; PEG grammars do not skip whitespace automatically.
