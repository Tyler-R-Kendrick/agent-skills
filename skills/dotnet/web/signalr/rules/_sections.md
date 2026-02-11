# SignalR Rules

Best practices and rules for SignalR.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use strongly-typed hubs by implementing `Hub<T>` with an interface | MEDIUM | [`signalr-use-strongly-typed-hubs-by-implementing-hub-t-with-an.md`](signalr-use-strongly-typed-hubs-by-implementing-hub-t-with-an.md) |
| 2 | Use `IHubContext<THub, T>` to send messages from services, controllers, and background workers | MEDIUM | [`signalr-use-ihubcontext-thub-t-to-send-messages-from-services.md`](signalr-use-ihubcontext-thub-t-to-send-messages-from-services.md) |
| 3 | Use groups for topic-based messaging | MEDIUM | [`signalr-use-groups-for-topic-based-messaging.md`](signalr-use-groups-for-topic-based-messaging.md) |
| 4 | Forward JWT tokens via query string for WebSocket connections | MEDIUM | [`signalr-forward-jwt-tokens-via-query-string-for-websocket.md`](signalr-forward-jwt-tokens-via-query-string-for-websocket.md) |
| 5 | Configure `MaximumReceiveMessageSize` to a reasonable limit | MEDIUM | [`signalr-configure-maximumreceivemessagesize-to-a-reasonable-limit.md`](signalr-configure-maximumreceivemessagesize-to-a-reasonable-limit.md) |
| 6 | Add a Redis backplane with `.AddStackExchangeRedis()` for multi-server deployments | MEDIUM | [`signalr-add-a-redis-backplane-with-addstackexchangeredis-for-multi.md`](signalr-add-a-redis-backplane-with-addstackexchangeredis-for-multi.md) |
| 7 | Use `IAsyncEnumerable<T>` for server-to-client streaming | MEDIUM | [`signalr-use-iasyncenumerable-t-for-server-to-client-streaming.md`](signalr-use-iasyncenumerable-t-for-server-to-client-streaming.md) |
| 8 | Set `KeepAliveInterval` and `ClientTimeoutInterval` | MEDIUM | [`signalr-set-keepaliveinterval-and-clienttimeoutinterval.md`](signalr-set-keepaliveinterval-and-clienttimeoutinterval.md) |
| 9 | Keep hub methods thin | MEDIUM | [`signalr-keep-hub-methods-thin.md`](signalr-keep-hub-methods-thin.md) |
| 10 | Handle `OnDisconnectedAsync` to clean up resources | MEDIUM | [`signalr-handle-ondisconnectedasync-to-clean-up-resources.md`](signalr-handle-ondisconnectedasync-to-clean-up-resources.md) |
