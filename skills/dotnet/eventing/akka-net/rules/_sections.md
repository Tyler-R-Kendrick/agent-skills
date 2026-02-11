# Akka.NET Rules

Best practices and rules for Akka.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Keep messages immutable by using C# `record` types or... | HIGH | [`akka-net-keep-messages-immutable-by-using-c-record-types-or.md`](akka-net-keep-messages-immutable-by-using-c-record-types-or.md) |
| 2 | Design small, focused actors with a single responsibility;... | MEDIUM | [`akka-net-design-small-focused-actors-with-a-single-responsibility.md`](akka-net-design-small-focused-actors-with-a-single-responsibility.md) |
| 3 | Always define an explicit `SupervisorStrategy` in parent... | CRITICAL | [`akka-net-always-define-an-explicit-supervisorstrategy-in-parent.md`](akka-net-always-define-an-explicit-supervisorstrategy-in-parent.md) |
| 4 | Use `ReceiveActor` over `UntypedActor` for compile-time... | HIGH | [`akka-net-use-receiveactor-over-untypedactor-for-compile-time.md`](akka-net-use-receiveactor-over-untypedactor-for-compile-time.md) |
| 5 | Prefer `Ask<T>` with a timeout for request-response... | HIGH | [`akka-net-prefer-ask-t-with-a-timeout-for-request-response.md`](akka-net-prefer-ask-t-with-a-timeout-for-request-response.md) |
| 6 | Use `Akka.Persistence` for actors whose state must survive... | CRITICAL | [`akka-net-use-akka-persistence-for-actors-whose-state-must-survive.md`](akka-net-use-akka-persistence-for-actors-whose-state-must-survive.md) |
| 7 | Avoid blocking calls (`Thread | HIGH | [`akka-net-avoid-blocking-calls-thread.md`](akka-net-avoid-blocking-calls-thread.md) |
| 8 | Use Cluster Sharding for distributing stateful actors... | MEDIUM | [`akka-net-use-cluster-sharding-for-distributing-stateful-actors.md`](akka-net-use-cluster-sharding-for-distributing-stateful-actors.md) |
| 9 | Inject dependencies via `Akka | CRITICAL | [`akka-net-inject-dependencies-via-akka.md`](akka-net-inject-dependencies-via-akka.md) |
| 10 | Test actors using `Akka | MEDIUM | [`akka-net-test-actors-using-akka.md`](akka-net-test-actors-using-akka.md) |
