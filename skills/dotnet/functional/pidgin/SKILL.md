---
name: pidgin
description: |
  Use when building high-performance parsers in C# using Pidgin's parser combinator library for structured text, DSLs, and expression grammars.
  USE FOR: C# parser combinators, high-performance text parsing, expression parsers, DSL implementation, protocol parsing, structured data extraction
  DO NOT USE FOR: F# parser combinators (use fparsec), PEG grammar-class style parsing (use parakeet), JSON/XML parsing (use System.Text.Json), simple regex matching
license: MIT
metadata:
  displayName: "Pidgin"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "Pidgin GitHub Repository"
    url: "https://github.com/benjamin-hodgson/Pidgin"
  - title: "Pidgin NuGet Package"
    url: "https://www.nuget.org/packages/Pidgin"
---

# Pidgin

## Overview
Pidgin is a fast, lightweight parser combinator library for C# built by Benjamin Hodgson. It provides a functional approach to building parsers by composing small parser functions into complex grammars. Pidgin supports recursive descent parsing with backtracking, produces good error messages, and is designed for high performance with minimal allocations. Parsers operate on `ReadOnlySpan<char>` or any `IEnumerable<TToken>`, making them suitable for parsing text, byte streams, or custom token sequences.

## NuGet Package
- `Pidgin` -- core parser combinator library

## Basic Parsers
```csharp
using Pidgin;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

// Single character parsers
Parser<char, char> pDigit = Digit;           // any digit
Parser<char, char> pLetter = Letter;         // any letter
Parser<char, char> pSpace = Whitespace;      // any whitespace char
Parser<char, char> pComma = Char(',');       // specific character
Parser<char, string> pHello = String("hello"); // specific string

// Running parsers
var result = pDigit.ParseOrThrow("7");       // '7'
var parsed = pHello.Parse("hello world");    // Result: "hello"

if (parsed.Success)
    Console.WriteLine($"Parsed: {parsed.Value}");
```

## Combinators
```csharp
using Pidgin;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

// Map: transform parser result
Parser<char, int> pSingleDigit =
    Digit.Select(c => c - '0');

// Sequence with LINQ
Parser<char, (char, char)> pTwoDigits =
    from d1 in Digit
    from d2 in Digit
    select (d1, d2);

// Many: zero or more
Parser<char, IEnumerable<char>> pDigits = Digit.Many();

// AtLeastOnce: one or more
Parser<char, string> pNumber =
    Digit.AtLeastOnceString();

// Between: surrounded by delimiters
Parser<char, string> pParenthesized =
    pNumber.Between(Char('('), Char(')'));

// SeparatedBy: items separated by delimiter
Parser<char, IEnumerable<int>> pCsvInts =
    Int(10).Separated(Char(',').Between(SkipWhitespaces));

// Optional
Parser<char, Maybe<char>> pOptionalSign =
    Char('+').Or(Char('-')).Optional();

// Try: backtracking on failure
Parser<char, string> pKeyword =
    Try(String("function")).Or(Try(String("class")));
```

## Integer and Number Parsers
```csharp
using Pidgin;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

// Integer parser
Parser<char, int> pInteger =
    from sign in Char('-').Optional()
    from digits in Digit.AtLeastOnceString()
    select int.Parse(sign.HasValue ? "-" + digits : digits);

// Decimal parser
Parser<char, double> pDecimal =
    from integer in Digit.AtLeastOnceString()
    from dot in Char('.')
    from fraction in Digit.AtLeastOnceString()
    select double.Parse($"{integer}.{fraction}",
        System.Globalization.CultureInfo.InvariantCulture);

// Number: integer or decimal
Parser<char, double> pNum =
    Try(pDecimal).Or(pInteger.Select(i => (double)i));
```

## Expression Parser
```csharp
using Pidgin;
using Pidgin.Expression;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

// AST types
public abstract record Expr;
public sealed record NumberExpr(double Value) : Expr;
public sealed record BinOpExpr(char Op, Expr Left, Expr Right) : Expr;
public sealed record UnaryMinusExpr(Expr Operand) : Expr;
public sealed record VariableExpr(string Name) : Expr;

// Token parsers
static Parser<char, T> Token<T>(Parser<char, T> parser) =>
    parser.Before(SkipWhitespaces);

static Parser<char, char> Token(char c) =>
    Token(Char(c));

static Parser<char, string> Token(string s) =>
    Token(String(s));

// Atom parsers
Parser<char, Expr> pNumber =
    Token(Digit.AtLeastOnceString()
        .Then(Char('.').Then(Digit.AtLeastOnceString()).Optional(),
            (integer, fraction) =>
                fraction.HasValue
                    ? double.Parse($"{integer}.{fraction.Value}",
                        System.Globalization.CultureInfo.InvariantCulture)
                    : double.Parse(integer)))
        .Select(n => (Expr)new NumberExpr(n));

Parser<char, Expr> pVariable =
    Token(Letter.Then(LetterOrDigit.ManyString(), (first, rest) => first + rest))
        .Select(name => (Expr)new VariableExpr(name));

Parser<char, Expr> pParenExpr =
    ExprParser.Between(Token('('), Token(')'));

Parser<char, Expr> pAtom =
    pNumber.Or(pVariable).Or(pParenExpr);

// Operator table for ExpressionParser
static Parser<char, Expr> ExprParser =>
    ExpressionParser.Build<char, Expr>(
        pAtom,
        new[]
        {
            // Precedence level 1 (highest): unary minus
            Operator.Prefix(
                Token('-').ThenReturn<Func<Expr, Expr>>(e => new UnaryMinusExpr(e))),

            // Precedence level 2: multiplication and division
            Operator.InfixL(
                Token('*').ThenReturn<Func<Expr, Expr, Expr>>(
                    (l, r) => new BinOpExpr('*', l, r))),
            Operator.InfixL(
                Token('/').ThenReturn<Func<Expr, Expr, Expr>>(
                    (l, r) => new BinOpExpr('/', l, r))),

            // Precedence level 3: addition and subtraction
            Operator.InfixL(
                Token('+').ThenReturn<Func<Expr, Expr, Expr>>(
                    (l, r) => new BinOpExpr('+', l, r))),
            Operator.InfixL(
                Token('-').ThenReturn<Func<Expr, Expr, Expr>>(
                    (l, r) => new BinOpExpr('-', l, r))),
        });

// Usage
var ast = ExprParser.ParseOrThrow("2 + 3 * (x - 1)");
// BinOpExpr('+', NumberExpr(2), BinOpExpr('*', NumberExpr(3), BinOpExpr('-', VariableExpr("x"), NumberExpr(1))))
```

## JSON Parser Example
```csharp
using Pidgin;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

public abstract record JsonValue;
public sealed record JsonNull() : JsonValue;
public sealed record JsonBool(bool Value) : JsonValue;
public sealed record JsonNumber(double Value) : JsonValue;
public sealed record JsonString(string Value) : JsonValue;
public sealed record JsonArray(IReadOnlyList<JsonValue> Items) : JsonValue;
public sealed record JsonObject(IReadOnlyDictionary<string, JsonValue> Fields) : JsonValue;

static Parser<char, T> Tok<T>(Parser<char, T> p) => p.Before(SkipWhitespaces);
static Parser<char, char> Tok(char c) => Tok(Char(c));

static readonly Parser<char, JsonValue> pNull =
    Tok(String("null")).ThenReturn<JsonValue>(new JsonNull());

static readonly Parser<char, JsonValue> pBool =
    Tok(String("true")).ThenReturn(true)
        .Or(Tok(String("false")).ThenReturn(false))
        .Select(b => (JsonValue)new JsonBool(b));

static readonly Parser<char, JsonValue> pNum =
    Tok(Real).Select(n => (JsonValue)new JsonNumber(n));

static readonly Parser<char, string> pStringLiteral =
    Tok(AnyCharExcept('"').ManyString().Between(Char('"'), Char('"')));

static readonly Parser<char, JsonValue> pString =
    pStringLiteral.Select(s => (JsonValue)new JsonString(s));

static readonly Parser<char, JsonValue> pValue = Rec(() =>
    pNull.Or(pBool).Or(pNum).Or(pString).Or(pArray).Or(pObject));

static readonly Parser<char, JsonValue> pArray =
    pValue.Separated(Tok(','))
        .Between(Tok('['), Tok(']'))
        .Select(items => (JsonValue)new JsonArray(items.ToList()));

static readonly Parser<char, KeyValuePair<string, JsonValue>> pField =
    from key in pStringLiteral
    from _ in Tok(':')
    from value in pValue
    select new KeyValuePair<string, JsonValue>(key, value);

static readonly Parser<char, JsonValue> pObject =
    pField.Separated(Tok(','))
        .Between(Tok('{'), Tok('}'))
        .Select(fields => (JsonValue)new JsonObject(
            new Dictionary<string, JsonValue>(fields)));

// Usage
var json = pValue.Before(End).ParseOrThrow("""
{
    "name": "Alice",
    "age": 30,
    "active": true,
    "tags": ["admin", "user"]
}
""");
```

## Identifier and Keyword Parsing
```csharp
using Pidgin;
using static Pidgin.Parser;
using static Pidgin.Parser<char>;

static readonly HashSet<string> Keywords = new()
{
    "let", "if", "else", "while", "return", "true", "false"
};

static readonly Parser<char, string> pIdentifier =
    from first in Letter.Or(Char('_'))
    from rest in LetterOrDigit.Or(Char('_')).ManyString()
    let name = first + rest
    where !Keywords.Contains(name)
    select name;

static Parser<char, string> Keyword(string word) =>
    Try(
        from w in String(word)
        from _ in Lookahead(LetterOrDigit.Or(Char('_')).Not())
        select w
    ).Before(SkipWhitespaces);
```

## Pidgin vs Other Parsers

| Feature | Pidgin | FParsec | Parakeet | Regex |
|---------|--------|---------|----------|-------|
| Language | C# | F# | C# | Any |
| Approach | Functional combinators | Functional combinators | PEG grammar classes | Pattern strings |
| Performance | High (Span-based) | High (optimized C) | Moderate | Varies |
| Error messages | Good | Excellent | Position-based | Poor |
| Expression parser | Built-in `ExpressionParser` | `OperatorPrecedenceParser` | Manual | N/A |
| LINQ syntax | Yes (Select, SelectMany) | No (F# CE) | No | No |
| Backtracking | Explicit (`Try`) | Explicit (`attempt`) | PEG semantics | N/A |
| Parse tree | Manual AST construction | Manual AST construction | Automatic | Capture groups |

## Best Practices
- Use `ExpressionParser.Build` for expression grammars with operator precedence rather than manually implementing left-recursion elimination.
- Use `Try()` explicitly for parsers that may fail after consuming input and need to backtrack; avoid wrapping everything in `Try` as it hides errors and reduces performance.
- Define token parsers that skip trailing whitespace (e.g., `Token(parser).Before(SkipWhitespaces)`) and use them consistently throughout the grammar.
- Use LINQ query syntax (`from ... in ... select`) for complex sequential parsers where multiple intermediate values are needed; use method chaining for simple transformations.
- Use `Rec(() => parser)` for recursive parser references to break circular dependencies; do not reference a parser field directly in its own definition.
- Guard keyword parsers with `Lookahead(LetterOrDigit.Not())` to prevent "if" from matching the prefix of "iffy".
- Use `Separated` and `SeparatedAtLeastOnce` for delimiter-separated lists (CSV values, function arguments) rather than manually handling delimiters.
- Define AST types as sealed record hierarchies so pattern matching is exhaustive and the parsed structure is immutable.
- Use `ParseOrThrow` in tests and `Parse` (which returns a `Result`) in production code to handle parse failures gracefully.
- Test parsers with both valid inputs and intentionally malformed inputs to verify error messages point to the correct position and describe what was expected.
