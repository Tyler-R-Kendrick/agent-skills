# protobuf-net Rules

Best practices and rules for protobuf-net.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Assign stable, unique field numbers that never change | CRITICAL | [`protobuf-net-assign-stable-unique-field-numbers-that-never-change.md`](protobuf-net-assign-stable-unique-field-numbers-that-never-change.md) |
| 2 | Start field numbers at 1 and leave gaps for future fields | MEDIUM | [`protobuf-net-start-field-numbers-at-1-and-leave-gaps-for-future-fields.md`](protobuf-net-start-field-numbers-at-1-and-leave-gaps-for-future-fields.md) |
| 3 | Use `RuntimeTypeModel` for types you do not control | CRITICAL | [`protobuf-net-use-runtimetypemodel-for-types-you-do-not-control.md`](protobuf-net-use-runtimetypemodel-for-types-you-do-not-control.md) |
| 4 | Declare `[ProtoInclude]` on base types for inheritance | MEDIUM | [`protobuf-net-declare-protoinclude-on-base-types-for-inheritance.md`](protobuf-net-declare-protoinclude-on-base-types-for-inheritance.md) |
| 5 | Prefer `Serializer.Serialize` to stream over byte arrays | HIGH | [`protobuf-net-prefer-serializer-serialize-to-stream-over-byte-arrays.md`](protobuf-net-prefer-serializer-serialize-to-stream-over-byte-arrays.md) |
| 6 | Set enum zero values to meaningful defaults | MEDIUM | [`protobuf-net-set-enum-zero-values-to-meaningful-defaults.md`](protobuf-net-set-enum-zero-values-to-meaningful-defaults.md) |
| 7 | Use protobuf-net with code-first gRPC for .NET-to-.NET services | HIGH | [`protobuf-net-use-protobuf-net-with-code-first-grpc-for-net-to-net.md`](protobuf-net-use-protobuf-net-with-code-first-grpc-for-net-to-net.md) |
| 8 | Benchmark protobuf-net against JSON for your specific payloads | MEDIUM | [`protobuf-net-benchmark-protobuf-net-against-json-for-your-specific.md`](protobuf-net-benchmark-protobuf-net-against-json-for-your-specific.md) |
| 9 | Pin `[ProtoContract(SkipConstructor = true)]` for immutable types | HIGH | [`protobuf-net-pin-protocontract-skipconstructor-true-for-immutable-types.md`](protobuf-net-pin-protocontract-skipconstructor-true-for-immutable-types.md) |
| 10 | Generate `.proto` files from your C# types for cross-language consumers | MEDIUM | [`protobuf-net-generate-proto-files-from-your-c-types-for-cross-language.md`](protobuf-net-generate-proto-files-from-your-c-types-for-cross-language.md) |
