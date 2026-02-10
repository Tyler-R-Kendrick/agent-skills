---
name: dapper
description: Guidance for Dapper usage. Use when working with dapper.
license: MIT
metadata:
  displayName: "Dapper"
  author: "Tyler-R-Kendrick"
---

# Dapper

## Overview
Use Dapper for targeted, read-heavy, or latency-critical queries.

## Example
```csharp
using Dapper;
using System.Data;

public sealed class ReportQueries(IDbConnection db)
{
	public Task<IReadOnlyList<ReportRow>> GetAsync(CancellationToken ct)
		=> db.QueryAsync<ReportRow>("select * from Reports");
}
```

## Guidance
- Use parameterized queries to avoid injection.
- Keep Dapper to well-defined query boundaries.