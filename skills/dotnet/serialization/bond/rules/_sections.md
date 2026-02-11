# Bond Rules

Best practices and rules for Bond.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define all data contracts in `.bond` schema files | MEDIUM | [`bond-define-all-data-contracts-in-bond-schema-files.md`](bond-define-all-data-contracts-in-bond-schema-files.md) |
| 2 | Assign explicit field ordinals starting from 0 | CRITICAL | [`bond-assign-explicit-field-ordinals-starting-from-0.md`](bond-assign-explicit-field-ordinals-starting-from-0.md) |
| 3 | Use Compact Binary as the default wire format | CRITICAL | [`bond-use-compact-binary-as-the-default-wire-format.md`](bond-use-compact-binary-as-the-default-wire-format.md) |
| 4 | Set meaningful default values for new fields | MEDIUM | [`bond-set-meaningful-default-values-for-new-fields.md`](bond-set-meaningful-default-values-for-new-fields.md) |
| 5 | Never reuse or reassign field ordinals | CRITICAL | [`bond-never-reuse-or-reassign-field-ordinals.md`](bond-never-reuse-or-reassign-field-ordinals.md) |
| 6 | Use `nullable<T>` for optional complex fields | HIGH | [`bond-use-nullable-t-for-optional-complex-fields.md`](bond-use-nullable-t-for-optional-complex-fields.md) |
| 7 | Wrap Bond serialization behind an interface | MEDIUM | [`bond-wrap-bond-serialization-behind-an-interface.md`](bond-wrap-bond-serialization-behind-an-interface.md) |
| 8 | Benchmark serialization in your specific workload | MEDIUM | [`bond-benchmark-serialization-in-your-specific-workload.md`](bond-benchmark-serialization-in-your-specific-workload.md) |
| 9 | Version your `.bond` schema files in source control | MEDIUM | [`bond-version-your-bond-schema-files-in-source-control.md`](bond-version-your-bond-schema-files-in-source-control.md) |
| 10 | Use transcoding for protocol conversion | HIGH | [`bond-use-transcoding-for-protocol-conversion.md`](bond-use-transcoding-for-protocol-conversion.md) |
