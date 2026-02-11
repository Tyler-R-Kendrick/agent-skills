# Hexagonal Architecture Rules

Best practices and rules for Hexagonal Architecture.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Keep the domain model completely free of infrastructure... | MEDIUM | [`hexagonal-keep-the-domain-model-completely-free-of-infrastructure.md`](hexagonal-keep-the-domain-model-completely-free-of-infrastructure.md) |
| 2 | Define ports using domain language, not technology language | MEDIUM | [`hexagonal-define-ports-using-domain-language-not-technology-language.md`](hexagonal-define-ports-using-domain-language-not-technology-language.md) |
| 3 | Use dependency injection to wire adapters to ports at the... | CRITICAL | [`hexagonal-use-dependency-injection-to-wire-adapters-to-ports-at-the.md`](hexagonal-use-dependency-injection-to-wire-adapters-to-ports-at-the.md) |
| 4 | Write the majority of tests against ports (mock adapters),... | MEDIUM | [`hexagonal-write-the-majority-of-tests-against-ports-mock-adapters.md`](hexagonal-write-the-majority-of-tests-against-ports-mock-adapters.md) |
| 5 | Start with one adapter per port | MEDIUM | [`hexagonal-start-with-one-adapter-per-port.md`](hexagonal-start-with-one-adapter-per-port.md) |
| 6 | Use the hexagonal structure to enable incremental migration | MEDIUM | [`hexagonal-use-the-hexagonal-structure-to-enable-incremental-migration.md`](hexagonal-use-the-hexagonal-structure-to-enable-incremental-migration.md) |
| 7 | Combine with DDD (see... | MEDIUM | [`hexagonal-combine-with-ddd-see.md`](hexagonal-combine-with-ddd-see.md) |
| 8 | The hexagonal shape is a metaphor for symmetry -- there is... | MEDIUM | [`hexagonal-the-hexagonal-shape-is-a-metaphor-for-symmetry-there-is.md`](hexagonal-the-hexagonal-shape-is-a-metaphor-for-symmetry-there-is.md) |
