# Dapper Rules

Best practices and rules for Dapper.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use parameterized queries with anonymous objects (e | CRITICAL | [`dapper-always-use-parameterized-queries-with-anonymous-objects-e.md`](dapper-always-use-parameterized-queries-with-anonymous-objects-e.md) |
| 2 | Create and dispose `IDbConnection` per operation or per... | CRITICAL | [`dapper-create-and-dispose-idbconnection-per-operation-or-per.md`](dapper-create-and-dispose-idbconnection-per-operation-or-per.md) |
| 3 | Use `QuerySingleOrDefaultAsync` when you expect zero or one... | MEDIUM | [`dapper-use-querysingleordefaultasync-when-you-expect-zero-or-one.md`](dapper-use-querysingleordefaultasync-when-you-expect-zero-or-one.md) |
| 4 | Specify `splitOn` explicitly in multi-mapping queries to... | HIGH | [`dapper-specify-spliton-explicitly-in-multi-mapping-queries-to.md`](dapper-specify-spliton-explicitly-in-multi-mapping-queries-to.md) |
| 5 | Use `DynamicParameters` with `ParameterDirection | MEDIUM | [`dapper-use-dynamicparameters-with-parameterdirection.md`](dapper-use-dynamicparameters-with-parameterdirection.md) |
| 6 | Wrap multiple related write operations in an explicit... | MEDIUM | [`dapper-wrap-multiple-related-write-operations-in-an-explicit.md`](dapper-wrap-multiple-related-write-operations-in-an-explicit.md) |
| 7 | Use `QueryMultipleAsync` to batch multiple SELECT... | MEDIUM | [`dapper-use-querymultipleasync-to-batch-multiple-select.md`](dapper-use-querymultipleasync-to-batch-multiple-select.md) |
| 8 | Keep Dapper queries in dedicated repository or query... | MEDIUM | [`dapper-keep-dapper-queries-in-dedicated-repository-or-query.md`](dapper-keep-dapper-queries-in-dedicated-repository-or-query.md) |
| 9 | Use `buffered | HIGH | [`dapper-use-buffered.md`](dapper-use-buffered.md) |
| 10 | Add a thin abstraction (e | MEDIUM | [`dapper-add-a-thin-abstraction-e.md`](dapper-add-a-thin-abstraction-e.md) |
