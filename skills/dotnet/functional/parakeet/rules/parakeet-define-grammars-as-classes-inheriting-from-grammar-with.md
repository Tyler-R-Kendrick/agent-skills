---
title: "Define grammars as classes inheriting from `Grammar` with..."
impact: MEDIUM
impactDescription: "general best practice"
tags: parakeet, dotnet, functional, c-peg-parser-combinators, grammar-definition, text-parsing
---

## Define grammars as classes inheriting from `Grammar` with...

Define grammars as classes inheriting from `Grammar` with each rule as a property, using PEG operators (`+` for sequence, `|` for ordered choice) for readable grammar definitions.
