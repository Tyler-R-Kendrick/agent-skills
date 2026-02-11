---
name: parakeet
description: |
  Use when building text parsers in C# using Parakeet, a parser combinator library focused on simplicity and PEG grammars.
  USE FOR: C# PEG parser combinators, grammar definition, text parsing, DSL implementation, rule-based parsing
  DO NOT USE FOR: F# parser combinators (use fparsec), high-performance C# parsing (use pidgin), regex-based matching, JSON/XML parsing (use System.Text.Json)
license: MIT
metadata:
  displayName: "Parakeet"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "Parakeet GitHub Repository"
    url: "https://github.com/ara3d/parakeet"
  - title: "Ara3D.Parakeet NuGet Package"
    url: "https://www.nuget.org/packages/Ara3D.Parakeet"
---

# Parakeet

## Overview
Parakeet is a .NET parser combinator library focused on Parsing Expression Grammars (PEG). It provides a declarative approach to defining grammars using C# classes and rules, where each grammar rule is a property that combines primitive parsers with combinators like sequence, choice, repetition, and lookahead. Parakeet generates parse trees from input text, which can then be traversed for interpretation or transformation. The library emphasizes simplicity and readability over raw performance.

## NuGet Package
- `Parakeet` -- core parser combinator library

## Grammar Definition
```csharp
using Parakeet;

// Define a grammar by inheriting from Grammar
public class ArithmeticGrammar : Grammar
{
    // Primitive rules
    public Rule Digit => MatchChar(char.IsDigit);
    public Rule Letter => MatchChar(char.IsLetter);
    public Rule WS => MatchChar(char.IsWhiteSpace).ZeroOrMore();

    // Number: one or more digits, optionally with decimal point
    public Rule Integer => Digit.OneOrMore();
    public Rule Decimal => Integer + MatchChar('.') + Integer;
    public Rule Number => (Decimal | Integer) + WS;

    // Identifier
    public Rule Identifier => (Letter + (Letter | Digit | MatchChar('_')).ZeroOrMore()) + WS;

    // Operators
    public Rule AddOp => (MatchChar('+') | MatchChar('-')) + WS;
    public Rule MulOp => (MatchChar('*') | MatchChar('/')) + WS;

    // Expression grammar (recursive)
    public Rule Factor => Number | (MatchChar('(') + WS + Expr + MatchChar(')') + WS);
    public Rule Term => Factor + (MulOp + Factor).ZeroOrMore();
    public Rule Expr => Term + (AddOp + Term).ZeroOrMore();

    // Entry point
    public override Rule Start => WS + Expr;
}
```

## Parsing Input
```csharp
using Parakeet;

var grammar = new ArithmeticGrammar();
var input = "3 + 4 * (2 - 1)";

var parseResult = grammar.Parse(input);

if (parseResult.Success)
{
    Console.WriteLine("Parse succeeded!");
    Console.WriteLine(parseResult.Node.ToXml());
}
else
{
    Console.WriteLine($"Parse failed at position {parseResult.Position}");
    Console.WriteLine($"Expected: {parseResult.Expected}");
}
```

## Common Combinators
```csharp
using Parakeet;

public class CommonPatterns : Grammar
{
    // Sequence: A then B then C
    public Rule Sequence => RuleA + RuleB + RuleC;

    // Choice: A or B or C (ordered, PEG semantics)
    public Rule Choice => RuleA | RuleB | RuleC;

    // Repetition
    public Rule ZeroOrMoreDigits => Digit.ZeroOrMore();
    public Rule OneOrMoreDigits => Digit.OneOrMore();
    public Rule OptionalSign => (MatchChar('+') | MatchChar('-')).Optional();

    // Lookahead (does not consume input)
    public Rule FollowedByDigit => RuleA + Digit.Lookahead();
    public Rule NotFollowedByDigit => RuleA + Digit.NotAt();

    // String matching
    public Rule Keyword => MatchString("function") + WS;
    public Rule Arrow => MatchString("=>") + WS;

    // Character classes
    public Rule HexDigit => MatchChar(c =>
        char.IsDigit(c) || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'));

    // Named rules for better parse tree nodes
    public Rule NamedNumber => Named(Number, "Number");
}
```

## CSV Parser Example
```csharp
using Parakeet;

public class CsvGrammar : Grammar
{
    // Basic elements
    public Rule Newline => MatchChar('\n') | MatchString("\r\n");
    public Rule Comma => MatchChar(',');
    public Rule Quote => MatchChar('"');

    // Quoted field: handles escaped quotes (doubled)
    public Rule EscapedQuote => MatchString("\"\"");
    public Rule QuotedContent => (EscapedQuote | MatchChar(c => c != '"')).ZeroOrMore();
    public Rule QuotedField => Quote + QuotedContent + Quote;

    // Unquoted field: any chars except comma, quote, and newline
    public Rule UnquotedField => MatchChar(c => c != ',' && c != '"' && c != '\n' && c != '\r').ZeroOrMore();

    // Field: either quoted or unquoted
    public Rule Field => QuotedField | UnquotedField;

    // Row: fields separated by commas
    public Rule Row => Field + (Comma + Field).ZeroOrMore();

    // CSV file: rows separated by newlines
    public Rule File => Row + (Newline + Row).ZeroOrMore() + Newline.Optional();

    public override Rule Start => File;
}

// Usage
var csv = new CsvGrammar();
var result = csv.Parse("name,age,city\nAlice,30,\"New York\"\nBob,25,London");

if (result.Success)
{
    // Traverse the parse tree to extract data
    foreach (var row in result.Node.Children)
    {
        var fields = row.Children
            .Where(n => n.RuleName == "Field")
            .Select(n => n.Text)
            .ToList();
        Console.WriteLine(string.Join(" | ", fields));
    }
}
```

## Simple Programming Language Parser
```csharp
using Parakeet;

public class MiniLangGrammar : Grammar
{
    // Whitespace and basics
    public Rule WS => MatchChar(c => c == ' ' || c == '\t').ZeroOrMore();
    public Rule NL => (MatchString("\r\n") | MatchChar('\n')) + WS;
    public Rule Digit => MatchChar(char.IsDigit);
    public Rule Letter => MatchChar(char.IsLetter);

    // Literals
    public Rule Integer => Digit.OneOrMore() + WS;
    public Rule StringLit =>
        MatchChar('"') + MatchChar(c => c != '"').ZeroOrMore() + MatchChar('"') + WS;
    public Rule BoolLit => (MatchString("true") | MatchString("false")) + WS;
    public Rule Literal => Integer | StringLit | BoolLit;

    // Identifiers
    public Rule Ident => Letter + (Letter | Digit | MatchChar('_')).ZeroOrMore() + WS;

    // Expressions
    public Rule Atom => Literal | Ident | (MatchChar('(') + WS + Expr + MatchChar(')') + WS);
    public Rule CompOp => (MatchString("==") | MatchString("!=") |
                           MatchString("<=") | MatchString(">=") |
                           MatchChar('<') | MatchChar('>')) + WS;
    public Rule Expr => Atom + (CompOp + Atom).Optional();

    // Statements
    public Rule LetStmt => MatchString("let") + WS + Ident +
                           MatchChar('=') + WS + Expr + MatchChar(';') + WS;
    public Rule PrintStmt => MatchString("print") + WS + Expr + MatchChar(';') + WS;
    public Rule IfStmt => MatchString("if") + WS + Expr +
                          MatchChar('{') + WS + NL.ZeroOrMore() +
                          Statements +
                          MatchChar('}') + WS;

    public Rule Statement => LetStmt | PrintStmt | IfStmt;
    public Rule Statements => (Statement + NL.ZeroOrMore()).ZeroOrMore();

    public override Rule Start => WS + NL.ZeroOrMore() + Statements;
}
```

## Parse Tree Traversal
```csharp
using Parakeet;

public static class ParseTreeInterpreter
{
    public static object Evaluate(ParseNode node, Dictionary<string, object> env)
    {
        return node.RuleName switch
        {
            "Integer" => int.Parse(node.Text.Trim()),
            "StringLit" => node.Text.Trim('"', ' '),
            "BoolLit" => bool.Parse(node.Text.Trim()),
            "Ident" => env[node.Text.Trim()],
            "LetStmt" => EvaluateLet(node, env),
            "PrintStmt" => EvaluatePrint(node, env),
            _ => EvaluateChildren(node, env)
        };
    }

    private static object EvaluateLet(ParseNode node, Dictionary<string, object> env)
    {
        var children = node.Children.ToList();
        var name = children[0].Text.Trim();
        var value = Evaluate(children[1], env);
        env[name] = value;
        return value;
    }

    private static object EvaluatePrint(ParseNode node, Dictionary<string, object> env)
    {
        var value = Evaluate(node.Children.First(), env);
        Console.WriteLine(value);
        return value;
    }

    private static object EvaluateChildren(ParseNode node, Dictionary<string, object> env)
    {
        object result = null!;
        foreach (var child in node.Children)
            result = Evaluate(child, env);
        return result;
    }
}
```

## Parakeet vs Other Parsers

| Feature | Parakeet | Pidgin | FParsec | Regex |
|---------|----------|--------|---------|-------|
| Language | C# | C# | F# | Any |
| Grammar style | PEG (class-based) | Combinator functions | Combinator functions | Pattern strings |
| Parse tree | Automatic | Manual construction | Manual construction | Capture groups |
| Recursion | Direct property refs | Forward references | Forward references | Not supported |
| Error messages | Position-based | Good | Excellent | Poor |
| Best for | Grammar-oriented DSLs | High-performance parsing | F# projects | Simple patterns |

## Best Practices
- Define grammars as classes inheriting from `Grammar` with each rule as a property, using PEG operators (`+` for sequence, `|` for ordered choice) for readable grammar definitions.
- Use `Named()` to label important rules in the parse tree so traversal code can identify semantic nodes by name rather than position.
- Handle whitespace explicitly by adding `+ WS` after token rules; PEG grammars do not skip whitespace automatically.
- Use `.Lookahead()` and `.NotAt()` for zero-width assertions to disambiguate grammar rules without consuming input.
- Use `.Optional()` for optional elements rather than choice with empty; it produces cleaner parse trees.
- Define the grammar entry point via `override Rule Start` so the parser knows which rule to begin parsing from.
- Test grammars incrementally: verify each rule parses correctly in isolation before combining into complex grammars.
- Use ordered choice (`|`) carefully in PEG grammars; alternatives are tried left-to-right and the first match wins, which can prevent later alternatives from being reached.
- Traverse parse trees with pattern matching on `RuleName` to interpret or transform parsed results into domain objects.
- For performance-critical parsing of large inputs, consider Pidgin or FParsec instead; Parakeet prioritizes grammar readability over raw throughput.
