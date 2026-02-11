# Command Query Separation Rules

Best practices and rules for Command Query Separation.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Commands should perform state changes and return at most an... | CRITICAL | [`command-query-commands-should-perform-state-changes-and-return-at-most-an.md`](command-query-commands-should-perform-state-changes-and-return-at-most-an.md) |
| 2 | Queries must never modify state; enforce this by giving... | CRITICAL | [`command-query-queries-must-never-modify-state-enforce-this-by-giving.md`](command-query-queries-must-never-modify-state-enforce-this-by-giving.md) |
| 3 | Use separate DTOs for query results rather than returning... | MEDIUM | [`command-query-use-separate-dtos-for-query-results-rather-than-returning.md`](command-query-use-separate-dtos-for-query-results-rather-than-returning.md) |
| 4 | Keep command and query handlers as thin orchestrators;... | MEDIUM | [`command-query-keep-command-and-query-handlers-as-thin-orchestrators.md`](command-query-keep-command-and-query-handlers-as-thin-orchestrators.md) |
| 5 | In full CQRS, accept eventual consistency between write and... | MEDIUM | [`command-query-in-full-cqrs-accept-eventual-consistency-between-write-and.md`](command-query-in-full-cqrs-accept-eventual-consistency-between-write-and.md) |
| 6 | Apply cross-cutting concerns (logging, validation,... | MEDIUM | [`command-query-apply-cross-cutting-concerns-logging-validation.md`](command-query-apply-cross-cutting-concerns-logging-validation.md) |
| 7 | Name commands as imperative verbs (`CreateUser`,... | MEDIUM | [`command-query-name-commands-as-imperative-verbs-createuser.md`](command-query-name-commands-as-imperative-verbs-createuser.md) |
| 8 | Register handlers with scoped lifetime to align with... | HIGH | [`command-query-register-handlers-with-scoped-lifetime-to-align-with.md`](command-query-register-handlers-with-scoped-lifetime-to-align-with.md) |
| 9 | Validate commands before executing them, preferably in a... | CRITICAL | [`command-query-validate-commands-before-executing-them-preferably-in-a.md`](command-query-validate-commands-before-executing-them-preferably-in-a.md) |
| 10 | Use Dapper or raw SQL for query handlers when read... | CRITICAL | [`command-query-use-dapper-or-raw-sql-for-query-handlers-when-read.md`](command-query-use-dapper-or-raw-sql-for-query-handlers-when-read.md) |
