# Redis Rules

Best practices and rules for Redis.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Register `ConnectionMultiplexer` as a singleton and reuse... | MEDIUM | [`redis-register-connectionmultiplexer-as-a-singleton-and-reuse.md`](redis-register-connectionmultiplexer-as-a-singleton-and-reuse.md) |
| 2 | Set `AbortOnConnectFail = false` in `ConfigurationOptions`... | MEDIUM | [`redis-set-abortonconnectfail-false-in-configurationoptions.md`](redis-set-abortonconnectfail-false-in-configurationoptions.md) |
| 3 | Use `KeyExpireAsync` on every key that is not meant to live... | HIGH | [`redis-use-keyexpireasync-on-every-key-that-is-not-meant-to-live.md`](redis-use-keyexpireasync-on-every-key-that-is-not-meant-to-live.md) |
| 4 | Use hash operations (`HashSetAsync`, `HashGetAsync`) for... | MEDIUM | [`redis-use-hash-operations-hashsetasync-hashgetasync-for.md`](redis-use-hash-operations-hashsetasync-hashgetasync-for.md) |
| 5 | Release distributed locks using a Lua script that checks... | HIGH | [`redis-release-distributed-locks-using-a-lua-script-that-checks.md`](redis-release-distributed-locks-using-a-lua-script-that-checks.md) |
| 6 | Use `FireAndForget` command flags on non-critical write... | CRITICAL | [`redis-use-fireandforget-command-flags-on-non-critical-write.md`](redis-use-fireandforget-command-flags-on-non-critical-write.md) |
| 7 | Namespace all keys with a prefix (e | HIGH | [`redis-namespace-all-keys-with-a-prefix-e.md`](redis-namespace-all-keys-with-a-prefix-e.md) |
| 8 | Configure `SyncTimeout` and `AsyncTimeout` to values... | HIGH | [`redis-configure-synctimeout-and-asynctimeout-to-values.md`](redis-configure-synctimeout-and-asynctimeout-to-values.md) |
| 9 | Use pipelining by issuing multiple commands before awaiting... | MEDIUM | [`redis-use-pipelining-by-issuing-multiple-commands-before-awaiting.md`](redis-use-pipelining-by-issuing-multiple-commands-before-awaiting.md) |
| 10 | Monitor Redis memory usage and eviction policy... | CRITICAL | [`redis-monitor-redis-memory-usage-and-eviction-policy.md`](redis-monitor-redis-memory-usage-and-eviction-policy.md) |
