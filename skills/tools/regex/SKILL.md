---
name: regex
description: |
    Use when writing or debugging regular expressions for pattern matching, validation, search, and text transformation. Covers regex syntax, common patterns, lookahead/lookbehind, character classes, quantifiers, and differences between regex flavors (PCRE, JavaScript, Python, .NET, POSIX).
    USE FOR: regular expressions, regex, pattern matching, text validation, search and replace, PCRE, regex lookahead, regex lookbehind, character classes, quantifiers, capturing groups, non-capturing groups, regex anchors
    DO NOT USE FOR: HTML/XML parsing (use a proper parser), complex data extraction (use jq or a programming language), natural language processing
license: MIT
metadata:
  displayName: "Regular Expressions"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Regular-Expressions.info"
    url: "https://www.regular-expressions.info"
  - title: "PCRE2 Specification"
    url: "https://www.pcre.org/current/doc/html/"
---

# Regular Expressions

## Overview

Regular expressions are a cross-cutting skill used in every language, every editor, every CLI tool, and every CI pipeline. They are powerful for pattern matching but can be cryptic — this skill provides a readable reference.

## Core Syntax

| Element | Syntax | Description | Example |
|---------|--------|-------------|---------|
| Literal | `abc` | Matches "abc" | `abc` matches "abc" |
| Dot | `.` | Any single character | `a.c` matches "abc", "a1c" |
| Start anchor | `^` | Start of string/line | `^Hello` matches "Hello world" |
| End anchor | `$` | End of string/line | `world$` matches "Hello world" |
| Word boundary | `\b` | Word boundary | `\bcat\b` matches "cat" not "scatter" |
| Character class | `[abc]` | Any of a, b, or c | `[aeiou]` matches vowels |
| Range | `[a-z]` | Any char in range | `[0-9]` matches digits |
| Negated class | `[^abc]` | Any char NOT in set | `[^0-9]` matches non-digits |
| Shorthand | `\d \w \s` | Digit, word char, whitespace | `\d+` matches "123" |
| Quantifier | `* + ? {n}` | Repetition | `a{3}` matches "aaa" |
| Alternation | `\|` | OR | `cat\|dog` matches either |
| Group | `()` | Capturing group | `(ab)+` matches "abab" |
| Non-capturing | `(?:)` | Group without capture | `(?:ab)+` matches "abab" |
| Escape | `\` | Literal special char | `\.` matches "." |

## Quantifiers

| Quantifier | Meaning | Greedy | Lazy |
|------------|---------|--------|------|
| `*` | 0 or more | `.*` | `.*?` |
| `+` | 1 or more | `.+` | `.+?` |
| `?` | 0 or 1 | `.?` | `.??` |
| `{n}` | Exactly n | `a{3}` | — |
| `{n,}` | n or more | `a{2,}` | `a{2,}?` |
| `{n,m}` | Between n and m | `a{2,4}` | `a{2,4}?` |

Greedy quantifiers match as much as possible. Lazy quantifiers (with `?` suffix) match as little as possible. Use lazy quantifiers when you need the shortest match.

## Character Classes

| Class | Matches | Equivalent |
|-------|---------|------------|
| `\d` | Digit | `[0-9]` |
| `\D` | Non-digit | `[^0-9]` |
| `\w` | Word character | `[a-zA-Z0-9_]` |
| `\W` | Non-word character | `[^a-zA-Z0-9_]` |
| `\s` | Whitespace | `[ \t\n\r\f\v]` |
| `\S` | Non-whitespace | `[^ \t\n\r\f\v]` |

## Common Patterns

| Purpose | Pattern | Notes |
|---------|---------|-------|
| Email (simplified) | `[\w.+-]+@[\w-]+\.[\w.]+` | Covers most common formats |
| URL | `https?://[\w\-.]+(:\d+)?(/[\w\-./?%&=]*)?` | HTTP and HTTPS |
| IPv4 | `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b` | Does not validate range |
| ISO date | `\d{4}-\d{2}-\d{2}` | YYYY-MM-DD format |
| UUID | `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}` | Lowercase hex |
| US phone | `\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}` | With optional formatting |
| Semantic version | `\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?` | Major.Minor.Patch with optional pre-release |
| Strong password | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$` | Min 8 chars, upper, lower, digit, special |

## Lookahead and Lookbehind

| Type | Syntax | Description |
|------|--------|-------------|
| Positive lookahead | `(?=...)` | Matches if followed by |
| Negative lookahead | `(?!...)` | Matches if NOT followed by |
| Positive lookbehind | `(?<=...)` | Matches if preceded by |
| Negative lookbehind | `(?<!...)` | Matches if NOT preceded by |

### Practical Examples

**Positive lookahead** — match a number only if followed by "px":
```
\d+(?=px)
```
In "12px 5em 8px", matches "12" and "8".

**Negative lookahead** — match "http" only if NOT followed by "s":
```
http(?!s)
```
Matches "http://" but not "https://".

**Positive lookbehind** — match a number only if preceded by "$":
```
(?<=\$)\d+
```
In "Price: $42 and 10 items", matches "42".

**Negative lookbehind** — match "cat" only if NOT preceded by "scat":
```
(?<!s)cat
```
Matches "cat" in "the cat" but not in "scatter".

## Flavor Differences

| Feature | JavaScript | Python | PCRE (.NET/PHP/grep -P) | POSIX (grep/sed) |
|---------|-----------|--------|------------------------|-----------------|
| Named groups | `(?<name>)` | `(?P<name>)` | `(?P<name>)` or `(?<name>)` | Not supported |
| Lookbehind | Fixed-length only | Variable-length | Variable-length | Not supported |
| Unicode | `\p{L}` | `\p{L}` with `re.UNICODE` | `\p{L}` | Limited |
| Backreferences | `\1` | `\1` | `\1` | `\1` |

When writing cross-platform regex, stick to the common subset: basic character classes, quantifiers, alternation, and fixed-length lookbehind. Test in multiple flavors if portability matters.

## Testing and Debugging

- **[regex101.com](https://regex101.com)** — The gold standard for regex testing. Supports PCRE, JavaScript, Python, and Go flavors. Provides real-time matching, group highlighting, and a detailed explanation of each token.
- **[regexr.com](https://regexr.com)** — Interactive regex editor with a community pattern library. Good for learning and exploring.

Always test your regex against both matching and non-matching inputs, including edge cases like empty strings, special characters, and Unicode text.

## Best Practices

- Always test regex with edge cases — empty strings, special characters, very long inputs, and Unicode
- Prefer named groups for readability — `(?<year>\d{4})` is clearer than `(\d{4})` when extracting data
- Use non-capturing groups `(?:)` when you don't need the match — it avoids cluttering group numbering
- Avoid catastrophic backtracking — nested quantifiers like `(a+)+` can cause exponential time on certain inputs
- Use character classes over alternation where possible — `[aeiou]` is faster and clearer than `a|e|i|o|u`
- Add comments with verbose/extended mode (`(?x)` in most flavors, `re.VERBOSE` in Python) for complex patterns
