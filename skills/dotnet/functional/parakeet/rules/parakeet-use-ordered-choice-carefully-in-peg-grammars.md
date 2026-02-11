---
title: "Use ordered choice (`|`) carefully in PEG grammars;..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: parakeet, dotnet, functional, c-peg-parser-combinators, grammar-definition, text-parsing
---

## Use ordered choice (`|`) carefully in PEG grammars;...

Use ordered choice (`|`) carefully in PEG grammars; alternatives are tried left-to-right and the first match wins, which can prevent later alternatives from being reached.
