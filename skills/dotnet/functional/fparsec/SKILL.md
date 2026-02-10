---
description: Guidance for FParsec parser combinator library for F#.
metadata:
  displayName: FParsec
---

# FParsec

## Overview
FParsec is a parser combinator library for F#, providing fast and flexible text parsing.

## Example
```fsharp
open FParsec

// Simple parser
let pnumber = pint32

// Identifier parser
let pidentifier =
    let isIdentifierFirstChar c = isLetter c || c = '_'
    let isIdentifierChar c = isLetter c || isDigit c || c = '_'
    identifier (IdentifierOptions(isIdentifierFirstChar, isIdentifierChar))

// Expression parser
let expr, exprRef = createParserForwardedToRef()

let term = pnumber |>> float
           <|> between (pchar '(') (pchar ')') expr

let opp = new OperatorPrecedenceParser<float,unit,unit>()
opp.TermParser <- term
opp.AddOperator(InfixOperator("+", spaces, 1, Associativity.Left, (+)))
opp.AddOperator(InfixOperator("*", spaces, 2, Associativity.Left, (*)))

exprRef := opp.ExpressionParser
```

## Best Practices
- Use for complex parsers
- Leverage F# type system
- Handle whitespace with combinators
- Provide descriptive error messages
