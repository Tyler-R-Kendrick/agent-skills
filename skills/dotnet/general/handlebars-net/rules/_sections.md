# Handlebars.NET Rules

Best practices and rules for Handlebars.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Compile templates once and cache the resulting delegate | MEDIUM | [`handlebars-net-compile-templates-once-and-cache-the-resulting-delegate.md`](handlebars-net-compile-templates-once-and-cache-the-resulting-delegate.md) |
| 2 | Use `Handlebars.Create()` for isolated environments | MEDIUM | [`handlebars-net-use-handlebars-create-for-isolated-environments.md`](handlebars-net-use-handlebars-create-for-isolated-environments.md) |
| 3 | Register helpers at application startup | MEDIUM | [`handlebars-net-register-helpers-at-application-startup.md`](handlebars-net-register-helpers-at-application-startup.md) |
| 4 | Use `WriteSafeString` in helpers for pre-escaped HTML | HIGH | [`handlebars-net-use-writesafestring-in-helpers-for-pre-escaped-html.md`](handlebars-net-use-writesafestring-in-helpers-for-pre-escaped-html.md) |
| 5 | Extract repeated template fragments into partials | MEDIUM | [`handlebars-net-extract-repeated-template-fragments-into-partials.md`](handlebars-net-extract-repeated-template-fragments-into-partials.md) |
| 6 | Prefer block helpers over complex conditional nesting | LOW | [`handlebars-net-prefer-block-helpers-over-complex-conditional-nesting.md`](handlebars-net-prefer-block-helpers-over-complex-conditional-nesting.md) |
| 7 | Validate template syntax at startup | HIGH | [`handlebars-net-validate-template-syntax-at-startup.md`](handlebars-net-validate-template-syntax-at-startup.md) |
| 8 | Use strongly-typed models | CRITICAL | [`handlebars-net-use-strongly-typed-models.md`](handlebars-net-use-strongly-typed-models.md) |
| 9 | Avoid deeply nested context paths | HIGH | [`handlebars-net-avoid-deeply-nested-context-paths.md`](handlebars-net-avoid-deeply-nested-context-paths.md) |
| 10 | Test templates with representative data | HIGH | [`handlebars-net-test-templates-with-representative-data.md`](handlebars-net-test-templates-with-representative-data.md) |
