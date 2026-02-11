# FParsec Rules

Best practices and rules for FParsec.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `createParserForwardedToRef` for recursive grammars (e | MEDIUM | [`fparsec-use-createparserforwardedtoref-for-recursive-grammars-e.md`](fparsec-use-createparserforwardedtoref-for-recursive-grammars-e.md) |
| 2 | Use `OperatorPrecedenceParser` for expression grammars with... | MEDIUM | [`fparsec-use-operatorprecedenceparser-for-expression-grammars-with.md`](fparsec-use-operatorprecedenceparser-for-expression-grammars-with.md) |
| 3 | Add `spaces` or custom whitespace parsers after tokens... | MEDIUM | [`fparsec-add-spaces-or-custom-whitespace-parsers-after-tokens.md`](fparsec-add-spaces-or-custom-whitespace-parsers-after-tokens.md) |
| 4 | Use `many1Satisfy2L` with descriptive labels so error... | MEDIUM | [`fparsec-use-many1satisfy2l-with-descriptive-labels-so-error.md`](fparsec-use-many1satisfy2l-with-descriptive-labels-so-error.md) |
| 5 | Guard keyword parsers with `notFollowedBy` to prevent "if"... | HIGH | [`fparsec-guard-keyword-parsers-with-notfollowedby-to-prevent-if.md`](fparsec-guard-keyword-parsers-with-notfollowedby-to-prevent-if.md) |
| 6 | Use `attempt` sparingly and only when backtracking is... | MEDIUM | [`fparsec-use-attempt-sparingly-and-only-when-backtracking-is.md`](fparsec-use-attempt-sparingly-and-only-when-backtracking-is.md) |
| 7 | Thread user state through parsers for context-sensitive... | MEDIUM | [`fparsec-thread-user-state-through-parsers-for-context-sensitive.md`](fparsec-thread-user-state-through-parsers-for-context-sensitive.md) |
| 8 | Expose F# parser libraries to C# consumers via a simple API... | MEDIUM | [`fparsec-expose-f-parser-libraries-to-c-consumers-via-a-simple-api.md`](fparsec-expose-f-parser-libraries-to-c-consumers-via-a-simple-api.md) |
| 9 | Test parsers with both valid and malformed input to verify... | MEDIUM | [`fparsec-test-parsers-with-both-valid-and-malformed-input-to-verify.md`](fparsec-test-parsers-with-both-valid-and-malformed-input-to-verify.md) |
| 10 | Profile parser performance with `runParserOnStream` for... | HIGH | [`fparsec-profile-parser-performance-with-runparseronstream-for.md`](fparsec-profile-parser-performance-with-runparseronstream-for.md) |
