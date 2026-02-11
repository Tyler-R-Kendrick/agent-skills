# DotNetty Rules

Best practices and rules for DotNetty.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use separate boss and worker event loop groups | MEDIUM | [`dotnetty-use-separate-boss-and-worker-event-loop-groups.md`](dotnetty-use-separate-boss-and-worker-event-loop-groups.md) |
| 2 | Always call `ShutdownGracefullyAsync()` | CRITICAL | [`dotnetty-always-call-shutdowngracefullyasync.md`](dotnetty-always-call-shutdowngracefullyasync.md) |
| 3 | Implement `ExceptionCaught` in every handler | MEDIUM | [`dotnetty-implement-exceptioncaught-in-every-handler.md`](dotnetty-implement-exceptioncaught-in-every-handler.md) |
| 4 | Use `LengthFieldBasedFrameDecoder` | MEDIUM | [`dotnetty-use-lengthfieldbasedframedecoder.md`](dotnetty-use-lengthfieldbasedframedecoder.md) |
| 5 | Add handlers in the correct pipeline order | MEDIUM | [`dotnetty-add-handlers-in-the-correct-pipeline-order.md`](dotnetty-add-handlers-in-the-correct-pipeline-order.md) |
| 6 | Set `ChannelOption.TcpNodelay` to `true` | MEDIUM | [`dotnetty-set-channeloption-tcpnodelay-to-true.md`](dotnetty-set-channeloption-tcpnodelay-to-true.md) |
| 7 | Use `IByteBuffer` pooling | CRITICAL | [`dotnetty-use-ibytebuffer-pooling.md`](dotnetty-use-ibytebuffer-pooling.md) |
| 8 | Implement heartbeat/keep-alive | MEDIUM | [`dotnetty-implement-heartbeat-keep-alive.md`](dotnetty-implement-heartbeat-keep-alive.md) |
| 9 | Keep business logic out of codec handlers | MEDIUM | [`dotnetty-keep-business-logic-out-of-codec-handlers.md`](dotnetty-keep-business-logic-out-of-codec-handlers.md) |
| 10 | Benchmark with realistic payloads | MEDIUM | [`dotnetty-benchmark-with-realistic-payloads.md`](dotnetty-benchmark-with-realistic-payloads.md) |
