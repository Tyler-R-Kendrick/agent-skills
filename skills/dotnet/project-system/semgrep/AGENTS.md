# Semgrep

## Overview
Semgrep is a fast, open-source static analysis tool for finding bugs and enforcing code standards.

## Example Rule
```yaml
rules:
  - id: unsafe-deserialization
    pattern: |
      JsonConvert.DeserializeObject<$TYPE>($INPUT)
    message: Unsafe deserialization detected
    severity: WARNING
    languages: [csharp]
```

## Use Cases
- Security vulnerability detection
- Code quality checks
- Custom linting rules
- API usage patterns
- Migration assistance

## Best Practices
- Start with community rulesets
- Create custom rules for your patterns
- Integrate into CI/CD
- Use autofix for simple issues
- Review findings regularly
