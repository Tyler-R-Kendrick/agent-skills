# System.Threading.Channels Rules

Best practices and rules for System.Threading.Channels.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use bounded channels with `BoundedChannelFullMode.Wait` as the default | CRITICAL | [`channels-use-bounded-channels-with-boundedchannelfullmode-wait-as.md`](channels-use-bounded-channels-with-boundedchannelfullmode-wait-as.md) |
| 2 | Set `SingleReader = true` when only one consumer reads from the channel | MEDIUM | [`channels-set-singlereader-true-when-only-one-consumer-reads-from-the.md`](channels-set-singlereader-true-when-only-one-consumer-reads-from-the.md) |
| 3 | Set `AllowSynchronousContinuations = false` in production code | CRITICAL | [`channels-set-allowsynchronouscontinuations-false-in-production-code.md`](channels-set-allowsynchronouscontinuations-false-in-production-code.md) |
| 4 | Call `Writer.Complete()` when the producer is finished to signal downstream consumers | MEDIUM | [`channels-call-writer-complete-when-the-producer-is-finished-to.md`](channels-call-writer-complete-when-the-producer-is-finished-to.md) |
| 5 | Wrap `ReadAllAsync()` consumption in a `try/catch` inside `BackgroundService.ExecuteAsync` | MEDIUM | [`channels-wrap-readallasync-consumption-in-a-try-catch-inside.md`](channels-wrap-readallasync-consumption-in-a-try-catch-inside.md) |
| 6 | Register the channel and its hosted service as singletons | MEDIUM | [`channels-register-the-channel-and-its-hosted-service-as-singletons.md`](channels-register-the-channel-and-its-hosted-service-as-singletons.md) |
| 7 | Use `ChannelReader<T>` and `ChannelWriter<T>` as the injected types | HIGH | [`channels-use-channelreader-t-and-channelwriter-t-as-the-injected.md`](channels-use-channelreader-t-and-channelwriter-t-as-the-injected.md) |
| 8 | Size bounded channels based on expected burst size, not average throughput | MEDIUM | [`channels-size-bounded-channels-based-on-expected-burst-size-not.md`](channels-size-bounded-channels-based-on-expected-burst-size-not.md) |
| 9 | Prefer `WriteAsync` over `TryWrite` in most scenarios | LOW | [`channels-prefer-writeasync-over-trywrite-in-most-scenarios.md`](channels-prefer-writeasync-over-trywrite-in-most-scenarios.md) |
| 10 | Use the pipeline pattern (chained channels) for multi-stage processing | MEDIUM | [`channels-use-the-pipeline-pattern-chained-channels-for-multi-stage.md`](channels-use-the-pipeline-pattern-chained-channels-for-multi-stage.md) |
