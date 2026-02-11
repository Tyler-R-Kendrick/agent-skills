---
name: semgrep
description: >
  USE FOR: Writing and running pattern-based static analysis rules for C# to detect security
  vulnerabilities, enforce coding standards, find anti-patterns, and automate code migrations.
  DO NOT USE FOR: Compile-time diagnostics (use Roslyn analyzers), dependency-level metrics
  (use NDepend), or runtime security scanning (use OWASP ZAP or Burp Suite).
license: MIT
metadata:
  displayName: Semgrep for .NET
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Semgrep Documentation"
    url: "https://semgrep.dev/docs/"
  - title: "Semgrep GitHub Repository"
    url: "https://github.com/semgrep/semgrep"
  - title: "Semgrep Community Rules"
    url: "https://github.com/semgrep/semgrep-rules"
---

# Semgrep for .NET

## Overview

Semgrep is an open-source, language-aware static analysis tool that matches source code patterns using a concise rule syntax. Unlike regex-based tools, Semgrep understands the abstract syntax tree (AST), so it can match patterns regardless of formatting, variable names, or whitespace. For C# projects, Semgrep detects security vulnerabilities (SQL injection, XSS, insecure deserialization), enforces coding standards, and finds anti-patterns without requiring compilation or access to the .NET SDK.

Semgrep rules are written in YAML and use metavariables (`$X`, `$TYPE`) to capture code elements. Rules can include `pattern`, `pattern-not`, `pattern-inside`, and `pattern-either` operators for precise matching. Semgrep also supports autofix for automated remediation.

## Installation and Basic Usage

```bash
# Install via pip
pip install semgrep

# Or via Homebrew
brew install semgrep

# Run with community rules for C#
semgrep --config=auto --lang=csharp .

# Run with a specific rule file
semgrep --config=./rules/csharp-security.yml .

# Run with Semgrep Registry rules
semgrep --config=p/csharp .
```

## Writing Custom Rules

### SQL Injection Detection

```yaml
# rules/sql-injection.yml
rules:
  - id: csharp-sql-injection-string-concat
    patterns:
      - pattern: |
          $CMD.CommandText = $PREFIX + $INPUT + $SUFFIX;
      - pattern-not: |
          $CMD.CommandText = $PREFIX + $CONST + $SUFFIX;
        metavariable-type:
          metavariable: $CONST
          type: string
    message: >
      SQL query built with string concatenation using '$INPUT'.
      This is vulnerable to SQL injection. Use parameterized queries
      with SqlParameter instead.
    severity: ERROR
    languages: [csharp]
    metadata:
      cwe: "CWE-89: SQL Injection"
      owasp: "A03:2021 - Injection"
    fix: |
      $CMD.CommandText = "SELECT * FROM Users WHERE Id = @id";
      $CMD.Parameters.AddWithValue("@id", $INPUT);
```

The rule matches code like:

```csharp
using System.Data.SqlClient;

public class UserRepository
{
    // Semgrep will flag this as sql-injection
    public void GetUser(SqlConnection conn, string userId)
    {
        var cmd = new SqlCommand();
        cmd.Connection = conn;
        cmd.CommandText = "SELECT * FROM Users WHERE Id = " + userId + ";";
        // ^ Semgrep flags: SQL query built with string concatenation
    }

    // Correct: parameterized query (not flagged)
    public void GetUserSafe(SqlConnection conn, string userId)
    {
        var cmd = new SqlCommand("SELECT * FROM Users WHERE Id = @id", conn);
        cmd.Parameters.AddWithValue("@id", userId);
    }
}
```

### Insecure Deserialization

```yaml
# rules/insecure-deserialization.yml
rules:
  - id: csharp-insecure-json-deserialization
    pattern: |
      JsonConvert.DeserializeObject<$TYPE>($INPUT)
    message: >
      Newtonsoft.Json deserialization of '$INPUT' into '$TYPE' without
      TypeNameHandling restriction. If TypeNameHandling is set to Auto
      or All in settings, this enables remote code execution.
      Use System.Text.Json or set TypeNameHandling.None explicitly.
    severity: WARNING
    languages: [csharp]
    metadata:
      cwe: "CWE-502: Deserialization of Untrusted Data"

  - id: csharp-binaryformatter-deserialization
    pattern: |
      new BinaryFormatter().Deserialize($STREAM)
    message: >
      BinaryFormatter.Deserialize is inherently unsafe and enables
      remote code execution. BinaryFormatter is obsolete in .NET 8+.
      Use System.Text.Json, MessagePack, or protobuf-net instead.
    severity: ERROR
    languages: [csharp]
    metadata:
      cwe: "CWE-502: Deserialization of Untrusted Data"
```

### Enforcing Async Best Practices

```yaml
# rules/async-best-practices.yml
rules:
  - id: csharp-async-void-method
    pattern: |
      async void $METHOD(...)
      {
        ...
      }
    pattern-not: |
      async void $METHOD(object $SENDER, $EVENTARGS_TYPE $E)
      {
        ...
      }
    message: >
      Async void method '$METHOD' detected. Async void methods cannot
      be awaited and exceptions will crash the process. Use async Task
      instead. Exception: event handlers with (object sender, EventArgs e)
      signature are allowed.
    severity: WARNING
    languages: [csharp]
    fix: |
      async Task $METHOD(...)
      {
        ...
      }

  - id: csharp-task-result-blocking
    patterns:
      - pattern-either:
          - pattern: $TASK.Result
          - pattern: $TASK.GetAwaiter().GetResult()
      - pattern-inside: |
          async $RETURN_TYPE $METHOD(...)
          {
            ...
          }
    message: >
      Blocking on '$TASK.Result' or 'GetAwaiter().GetResult()' inside
      an async method can cause deadlocks. Use 'await $TASK' instead.
    severity: ERROR
    languages: [csharp]
```

### Detecting Missing Disposal

```yaml
# rules/missing-disposal.yml
rules:
  - id: csharp-httpclient-in-using
    pattern: |
      using var $CLIENT = new HttpClient();
    message: >
      Creating HttpClient with 'using' disposes the client after each
      request, preventing socket reuse and causing socket exhaustion.
      Use IHttpClientFactory or a static/singleton HttpClient instead.
    severity: WARNING
    languages: [csharp]
    metadata:
      cwe: "CWE-404: Improper Resource Shutdown or Release"

  - id: csharp-undisposed-stream
    patterns:
      - pattern: |
          $STREAM = new $STREAM_TYPE(...);
      - metavariable-regex:
          metavariable: $STREAM_TYPE
          regex: "(FileStream|MemoryStream|StreamReader|StreamWriter|NetworkStream)"
      - pattern-not-inside: |
          using ...
          {
            ...
          }
      - pattern-not-inside: |
          using var $STREAM = ...;
    message: >
      Stream '$STREAM' of type '$STREAM_TYPE' is not wrapped in a
      using statement. This can lead to resource leaks.
    severity: WARNING
    languages: [csharp]
```

## Semgrep Pattern Operators

| Operator              | Purpose                                              | Example                                    |
|-----------------------|------------------------------------------------------|--------------------------------------------|
| `pattern`             | Match a code pattern                                 | `Console.WriteLine($MSG)`                  |
| `pattern-not`         | Exclude matches                                      | Exclude safe patterns from results         |
| `pattern-inside`      | Match only if inside a parent pattern                | Detect usage inside async methods          |
| `pattern-not-inside`  | Match only if NOT inside a parent pattern            | Detect missing `using` block               |
| `pattern-either`      | Match any of multiple patterns (OR)                  | `$TASK.Result` OR `.GetResult()`           |
| `patterns`            | Match all patterns (AND)                             | Combine multiple conditions                |
| `metavariable-regex`  | Filter metavariable values by regex                  | Stream type name matching                  |
| `metavariable-type`   | Filter by type (experimental for C#)                 | Only match string types                    |
| `focus-metavariable`  | Report diagnostic on specific metavariable location  | Highlight the problematic variable         |
| `fix`                 | Autofix template                                     | Replace `async void` with `async Task`     |

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/semgrep.yml
name: Semgrep
on: [push, pull_request]

jobs:
  semgrep:
    runs-on: ubuntu-latest
    container:
      image: semgrep/semgrep
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep
        run: |
          semgrep scan \
            --config=p/csharp \
            --config=./rules/ \
            --error \
            --json --output=semgrep-results.json \
            .
      - name: Upload Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: semgrep-results
          path: semgrep-results.json
```

## Semgrep vs. Roslyn Analyzers

| Aspect               | Semgrep                            | Roslyn Analyzers                     |
|-----------------------|------------------------------------|--------------------------------------|
| Compilation required  | No (pattern-based)                 | Yes (semantic model)                 |
| Type information      | Limited                            | Full type resolution                 |
| Cross-file analysis   | Limited                            | Full compilation scope               |
| Rule authoring        | YAML (minutes to write)            | C# code (hours to write)            |
| Performance           | Fast (no compilation)              | Slower (full compilation)            |
| IDE integration       | VS Code extension                  | Visual Studio, Rider, VS Code        |
| Autofix               | Template-based                     | Programmatic (Roslyn API)            |
| Security rules        | Extensive registry                 | Limited built-in                     |

## Best Practices

1. **Start with the `p/csharp` community ruleset from the Semgrep Registry** before writing custom rules to cover common security vulnerabilities and anti-patterns without duplicating existing work.

2. **Use `pattern-not` and `pattern-not-inside` to reduce false positives** by explicitly excluding safe patterns (e.g., excluding parameterized queries from SQL injection rules, excluding event handlers from async-void rules).

3. **Set `severity: ERROR` for security-critical rules and `severity: WARNING` for style/best-practice rules** so that CI pipelines can use `--error` to fail on security findings while allowing warnings to pass.

4. **Include `metadata.cwe` and `metadata.owasp` fields in security rules** to map findings to standardized vulnerability classifications, making it easier to prioritize remediation and report to compliance teams.

5. **Write autofix templates using `fix:` for mechanical transformations** like replacing `async void` with `async Task` or wrapping streams in `using` statements, enabling developers to apply fixes with a single command.

6. **Store custom rules in a `rules/` directory at the repository root and reference them with `--config=./rules/`** to version-control your organization's rules alongside the codebase and share them across repositories.

7. **Use `metavariable-regex` to narrow matches by type name or method name patterns** when full type resolution is not available; this prevents false positives on similarly-named but unrelated APIs.

8. **Run Semgrep in CI with `--json --output=results.json` and upload results as artifacts** so that findings can be reviewed in pull request comments, tracked over time, and ingested by security dashboards.

9. **Test every custom rule with at least one positive match and one negative match** by creating test files with `// ruleid: your-rule-id` and `// ok: your-rule-id` annotations and running `semgrep --test`.

10. **Combine Semgrep with Roslyn analyzers for defense in depth** -- use Semgrep for security patterns and quick cross-language checks, and Roslyn analyzers for type-aware rules that require semantic model access.
