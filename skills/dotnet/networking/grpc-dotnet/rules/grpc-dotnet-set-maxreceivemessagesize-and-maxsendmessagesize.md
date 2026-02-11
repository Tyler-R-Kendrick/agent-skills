---
title: "Set `MaxReceiveMessageSize` and `MaxSendMessageSize`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: grpc-dotnet, dotnet, networking, grpc-service-definitions, proto-file-compilation, unary-and-streaming-rpcs
---

## Set `MaxReceiveMessageSize` and `MaxSendMessageSize`

Set `MaxReceiveMessageSize` and `MaxSendMessageSize`: explicitly on both client and server to prevent out-of-memory errors from oversized messages (default is 4 MB).
