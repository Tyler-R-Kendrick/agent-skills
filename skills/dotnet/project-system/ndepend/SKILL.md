---
description: Guidance for NDepend static code analysis tool.
metadata:
  displayName: NDepend
---

# NDepend

## Overview
NDepend is a static analysis tool that provides deep insights into .NET code quality, architecture, and dependencies.

## Features
- Code metrics and quality gates
- Dependency analysis
- Architecture validation
- Technical debt tracking
- Trend analysis

## Example CQLinq Query
```csharp
// Find methods too complex
from m in Methods
where m.CyclomaticComplexity > 15
orderby m.CyclomaticComplexity descending
select new { m, m.CyclomaticComplexity }
```

## Best Practices
- Define quality gates for your project
- Review dependency graphs regularly
- Track technical debt over time
- Integrate into CI/CD pipeline
- Create custom rules with CQLinq
- Set baseline for legacy code
