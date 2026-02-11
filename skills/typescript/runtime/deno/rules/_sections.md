# Deno Rules

Best practices and rules for Deno.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use explicit permissions | CRITICAL | [`deno-use-explicit-permissions.md`](deno-use-explicit-permissions.md) |
| 2 | Use `deno.json` for project configuration | MEDIUM | [`deno-use-deno-json-for-project-configuration.md`](deno-use-deno-json-for-project-configuration.md) |
| 3 | Prefer JSR (`jsr:`) over URL imports | LOW | [`deno-prefer-jsr-jsr-over-url-imports.md`](deno-prefer-jsr-jsr-over-url-imports.md) |
| 4 | Use import maps for bare specifiers | HIGH | [`deno-use-import-maps-for-bare-specifiers.md`](deno-use-import-maps-for-bare-specifiers.md) |
| 5 | Use `Deno.serve` for HTTP servers | MEDIUM | [`deno-use-deno-serve-for-http-servers.md`](deno-use-deno-serve-for-http-servers.md) |
| 6 | Run `deno fmt` and `deno lint` in CI | MEDIUM | [`deno-run-deno-fmt-and-deno-lint-in-ci.md`](deno-run-deno-fmt-and-deno-lint-in-ci.md) |
| 7 | Use `deno check` for type checking | MEDIUM | [`deno-use-deno-check-for-type-checking.md`](deno-use-deno-check-for-type-checking.md) |
| 8 | Lock dependencies | HIGH | [`deno-lock-dependencies.md`](deno-lock-dependencies.md) |
| 9 | Use `using` declarations for resource management | MEDIUM | [`deno-use-using-declarations-for-resource-management.md`](deno-use-using-declarations-for-resource-management.md) |
| 10 | Prefer `@std/` modules over third-party alternatives | LOW | [`deno-prefer-std-modules-over-third-party-alternatives.md`](deno-prefer-std-modules-over-third-party-alternatives.md) |
| 11 | Use Deno KV for simple data persistence | MEDIUM | [`deno-use-deno-kv-for-simple-data-persistence.md`](deno-use-deno-kv-for-simple-data-persistence.md) |
| 12 | Use `deno compile` for distribution | MEDIUM | [`deno-use-deno-compile-for-distribution.md`](deno-use-deno-compile-for-distribution.md) |
| 13 | Structure tests alongside source files | MEDIUM | [`deno-structure-tests-alongside-source-files.md`](deno-structure-tests-alongside-source-files.md) |
| 14 | Use `deno task` instead of Makefiles or npm scripts | MEDIUM | [`deno-use-deno-task-instead-of-makefiles-or-npm-scripts.md`](deno-use-deno-task-instead-of-makefiles-or-npm-scripts.md) |
| 15 | Migrate from Node.js incrementally | MEDIUM | [`deno-migrate-from-node-js-incrementally.md`](deno-migrate-from-node-js-incrementally.md) |
