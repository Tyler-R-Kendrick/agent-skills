# gRPC for .NET Rules

Best practices and rules for gRPC for .NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set deadlines | CRITICAL | [`grpc-dotnet-always-set-deadlines.md`](grpc-dotnet-always-set-deadlines.md) |
| 2 | Use `.proto` files as the single source of truth | MEDIUM | [`grpc-dotnet-use-proto-files-as-the-single-source-of-truth.md`](grpc-dotnet-use-proto-files-as-the-single-source-of-truth.md) |
| 3 | Use `GrpcClientFactory` | MEDIUM | [`grpc-dotnet-use-grpcclientfactory.md`](grpc-dotnet-use-grpcclientfactory.md) |
| 4 | Enable server reflection | MEDIUM | [`grpc-dotnet-enable-server-reflection.md`](grpc-dotnet-enable-server-reflection.md) |
| 5 | Handle `RpcException` by `StatusCode` | MEDIUM | [`grpc-dotnet-handle-rpcexception-by-statuscode.md`](grpc-dotnet-handle-rpcexception-by-statuscode.md) |
| 6 | Use server streaming for large result sets | MEDIUM | [`grpc-dotnet-use-server-streaming-for-large-result-sets.md`](grpc-dotnet-use-server-streaming-for-large-result-sets.md) |
| 7 | Register interceptors for cross-cutting concerns | CRITICAL | [`grpc-dotnet-register-interceptors-for-cross-cutting-concerns.md`](grpc-dotnet-register-interceptors-for-cross-cutting-concerns.md) |
| 8 | Set `MaxReceiveMessageSize` and `MaxSendMessageSize` | HIGH | [`grpc-dotnet-set-maxreceivemessagesize-and-maxsendmessagesize.md`](grpc-dotnet-set-maxreceivemessagesize-and-maxsendmessagesize.md) |
| 9 | Use gRPC-Web | CRITICAL | [`grpc-dotnet-use-grpc-web.md`](grpc-dotnet-use-grpc-web.md) |
| 10 | Version proto packages | CRITICAL | [`grpc-dotnet-version-proto-packages.md`](grpc-dotnet-version-proto-packages.md) |
