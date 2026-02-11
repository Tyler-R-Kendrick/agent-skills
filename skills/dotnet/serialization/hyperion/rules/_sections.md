# Hyperion Rules

Best practices and rules for Hyperion.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Enable `preserveObjectReferences` when object graphs may contain cycles | MEDIUM | [`hyperion-enable-preserveobjectreferences-when-object-graphs-may.md`](hyperion-enable-preserveobjectreferences-when-object-graphs-may.md) |
| 2 | Enable `versionTolerance` in production systems | CRITICAL | [`hyperion-enable-versiontolerance-in-production-systems.md`](hyperion-enable-versiontolerance-in-production-systems.md) |
| 3 | Pre-register known types for frequently serialized classes | MEDIUM | [`hyperion-pre-register-known-types-for-frequently-serialized-classes.md`](hyperion-pre-register-known-types-for-frequently-serialized-classes.md) |
| 4 | Use Hyperion only for internal binary serialization | CRITICAL | [`hyperion-use-hyperion-only-for-internal-binary-serialization.md`](hyperion-use-hyperion-only-for-internal-binary-serialization.md) |
| 5 | Implement `IKnownTypesProvider` for Akka.NET | MEDIUM | [`hyperion-implement-iknowntypesprovider-for-akka-net.md`](hyperion-implement-iknowntypesprovider-for-akka-net.md) |
| 6 | Test version tolerance explicitly | MEDIUM | [`hyperion-test-version-tolerance-explicitly.md`](hyperion-test-version-tolerance-explicitly.md) |
| 7 | Wrap Hyperion behind `IBinarySerializer` | MEDIUM | [`hyperion-wrap-hyperion-behind-ibinaryserializer.md`](hyperion-wrap-hyperion-behind-ibinaryserializer.md) |
| 8 | Avoid serializing large object graphs in hot paths | HIGH | [`hyperion-avoid-serializing-large-object-graphs-in-hot-paths.md`](hyperion-avoid-serializing-large-object-graphs-in-hot-paths.md) |
| 9 | Pin Hyperion package versions across all services | MEDIUM | [`hyperion-pin-hyperion-package-versions-across-all-services.md`](hyperion-pin-hyperion-package-versions-across-all-services.md) |
| 10 | Benchmark against MessagePack for non-Akka workloads | MEDIUM | [`hyperion-benchmark-against-messagepack-for-non-akka-workloads.md`](hyperion-benchmark-against-messagepack-for-non-akka-workloads.md) |
