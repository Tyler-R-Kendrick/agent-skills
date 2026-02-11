---
name: dotnetty
description: >
  Guidance for DotNetty event-driven asynchronous network application framework.
  USE FOR: high-performance TCP/UDP servers and clients, custom binary protocol implementations, Netty-style channel pipelines, event loop groups, codec handlers, TLS/SSL socket connections.
  DO NOT USE FOR: HTTP APIs (use ASP.NET Core), gRPC services (use grpc-dotnet), email sending (use mimekit), high-level stream processing (use system-io-pipelines).
license: MIT
metadata:
  displayName: "DotNetty"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "DotNetty GitHub Repository"
    url: "https://github.com/Azure/DotNetty"
  - title: "DotNetty.Transport NuGet Package"
    url: "https://www.nuget.org/packages/DotNetty.Transport"
  - title: "DotNetty.Common NuGet Package"
    url: "https://www.nuget.org/packages/DotNetty.Common"
---

# DotNetty

## Overview

DotNetty is a .NET port of the Java Netty framework, providing an event-driven, asynchronous network application framework for building high-performance protocol servers and clients. It uses a channel pipeline architecture where inbound and outbound data flows through a chain of handlers, each responsible for a specific transformation (decoding, encoding, business logic, error handling). DotNetty manages I/O threads via event loop groups, separating connection acceptance from data processing.

DotNetty is used in production by Azure Service Bus, Azure Event Hubs, and other Microsoft services for their custom transport layers. It is best suited for scenarios requiring custom binary protocols, high-throughput socket programming, or port-level control that ASP.NET Core does not provide.

## TCP Server Setup

Create a TCP server with boss and worker event loop groups. The boss group accepts connections; the worker group handles I/O on accepted channels.

```csharp
using DotNetty.Transport.Bootstrapping;
using DotNetty.Transport.Channels;
using DotNetty.Transport.Channels.Sockets;
using System;
using System.Threading.Tasks;

public class TcpServer
{
    public async Task StartAsync(int port)
    {
        var bossGroup = new MultithreadEventLoopGroup(1);
        var workerGroup = new MultithreadEventLoopGroup();

        try
        {
            var bootstrap = new ServerBootstrap()
                .Group(bossGroup, workerGroup)
                .Channel<TcpServerSocketChannel>()
                .Option(ChannelOption.SoBacklog, 128)
                .ChildOption(ChannelOption.SoKeepalive, true)
                .ChildHandler(new ActionChannelInitializer<ISocketChannel>(
                    channel =>
                    {
                        var pipeline = channel.Pipeline;
                        pipeline.AddLast(new LengthFieldBasedFrameDecoder(
                            1024 * 1024, 0, 4, 0, 4));
                        pipeline.AddLast(new LengthFieldPrepender(4));
                        pipeline.AddLast(new StringDecoder());
                        pipeline.AddLast(new StringEncoder());
                        pipeline.AddLast(new EchoServerHandler());
                    }));

            var boundChannel = await bootstrap.BindAsync(port);
            Console.WriteLine($"Server listening on port {port}");

            Console.ReadLine();
            await boundChannel.CloseAsync();
        }
        finally
        {
            await Task.WhenAll(
                bossGroup.ShutdownGracefullyAsync(),
                workerGroup.ShutdownGracefullyAsync());
        }
    }
}
```

## Channel Handlers

Handlers process inbound and outbound events in the pipeline. Extend `SimpleChannelInboundHandler<T>` for type-safe message handling.

```csharp
using DotNetty.Transport.Channels;
using System;
using System.Threading.Tasks;

public class EchoServerHandler : SimpleChannelInboundHandler<string>
{
    protected override void ChannelRead0(
        IChannelHandlerContext ctx, string msg)
    {
        Console.WriteLine($"Received: {msg}");
        ctx.WriteAndFlushAsync($"Echo: {msg}");
    }

    public override void ChannelActive(IChannelHandlerContext ctx)
    {
        Console.WriteLine(
            $"Client connected: {ctx.Channel.RemoteAddress}");
        base.ChannelActive(ctx);
    }

    public override void ChannelInactive(IChannelHandlerContext ctx)
    {
        Console.WriteLine(
            $"Client disconnected: {ctx.Channel.RemoteAddress}");
        base.ChannelInactive(ctx);
    }

    public override void ExceptionCaught(
        IChannelHandlerContext ctx, Exception exception)
    {
        Console.WriteLine($"Error: {exception.Message}");
        ctx.CloseAsync();
    }
}
```

## TCP Client

Create a client that connects to the server and sends messages.

```csharp
using DotNetty.Transport.Bootstrapping;
using DotNetty.Transport.Channels;
using DotNetty.Transport.Channels.Sockets;
using System;
using System.Net;
using System.Threading.Tasks;

public class TcpClient
{
    public async Task ConnectAsync(string host, int port)
    {
        var group = new MultithreadEventLoopGroup();

        try
        {
            var bootstrap = new Bootstrap()
                .Group(group)
                .Channel<TcpSocketChannel>()
                .Option(ChannelOption.TcpNodelay, true)
                .Handler(new ActionChannelInitializer<ISocketChannel>(
                    channel =>
                    {
                        var pipeline = channel.Pipeline;
                        pipeline.AddLast(new LengthFieldBasedFrameDecoder(
                            1024 * 1024, 0, 4, 0, 4));
                        pipeline.AddLast(new LengthFieldPrepender(4));
                        pipeline.AddLast(new StringDecoder());
                        pipeline.AddLast(new StringEncoder());
                        pipeline.AddLast(new EchoClientHandler());
                    }));

            var channel = await bootstrap.ConnectAsync(
                new IPEndPoint(
                    IPAddress.Parse(host), port));

            await channel.WriteAndFlushAsync("Hello, DotNetty!");

            Console.ReadLine();
            await channel.CloseAsync();
        }
        finally
        {
            await group.ShutdownGracefullyAsync();
        }
    }
}

public class EchoClientHandler : SimpleChannelInboundHandler<string>
{
    protected override void ChannelRead0(
        IChannelHandlerContext ctx, string msg)
    {
        Console.WriteLine($"Server response: {msg}");
    }

    public override void ExceptionCaught(
        IChannelHandlerContext ctx, Exception exception)
    {
        Console.WriteLine($"Error: {exception.Message}");
        ctx.CloseAsync();
    }
}
```

## Custom Binary Protocol Codec

Implement custom encoders and decoders for binary protocols.

```csharp
using DotNetty.Buffers;
using DotNetty.Codecs;
using DotNetty.Transport.Channels;
using System.Collections.Generic;

public class MessagePacket
{
    public byte Version { get; set; }
    public short CommandId { get; set; }
    public byte[] Payload { get; set; } = Array.Empty<byte>();
}

public class MessagePacketDecoder : ByteToMessageDecoder
{
    protected override void Decode(
        IChannelHandlerContext context,
        IByteBuffer input,
        List<object> output)
    {
        // Header: Version(1) + CommandId(2) + PayloadLength(4)
        if (input.ReadableBytes < 7) return;

        input.MarkReaderIndex();
        byte version = input.ReadByte();
        short commandId = input.ReadShort();
        int payloadLength = input.ReadInt();

        if (input.ReadableBytes < payloadLength)
        {
            input.ResetReaderIndex();
            return;
        }

        var payload = new byte[payloadLength];
        input.ReadBytes(payload);

        output.Add(new MessagePacket
        {
            Version = version,
            CommandId = commandId,
            Payload = payload
        });
    }
}

public class MessagePacketEncoder
    : MessageToByteEncoder<MessagePacket>
{
    protected override void Encode(
        IChannelHandlerContext context,
        MessagePacket message,
        IByteBuffer output)
    {
        output.WriteByte(message.Version);
        output.WriteShort(message.CommandId);
        output.WriteInt(message.Payload.Length);
        output.WriteBytes(message.Payload);
    }
}
```

## TLS/SSL Support

Add TLS to the pipeline for secure connections.

```csharp
using DotNetty.Handlers.Tls;
using DotNetty.Transport.Channels;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

public static class TlsPipelineExtensions
{
    public static void AddTlsServer(
        this IChannelPipeline pipeline,
        X509Certificate2 certificate)
    {
        var tlsSettings = new ServerTlsSettings(certificate);
        pipeline.AddLast("tls", new TlsHandler(tlsSettings));
    }

    public static void AddTlsClient(
        this IChannelPipeline pipeline,
        string targetHost)
    {
        var tlsSettings = new ClientTlsSettings(targetHost);
        pipeline.AddLast("tls", new TlsHandler(tlsSettings));
    }
}
```

## DotNetty Pipeline Architecture

| Handler Type | Direction | Purpose |
|---|---|---|
| `ByteToMessageDecoder` | Inbound | Decode raw bytes to messages |
| `MessageToByteEncoder<T>` | Outbound | Encode messages to raw bytes |
| `SimpleChannelInboundHandler<T>` | Inbound | Type-safe business logic |
| `ChannelDuplexHandler` | Both | Combined inbound/outbound logic |
| `IdleStateHandler` | Both | Detect idle connections |
| `TlsHandler` | Both | TLS encryption/decryption |
| `LengthFieldBasedFrameDecoder` | Inbound | Frame delimiting by length prefix |

## Best Practices

1. **Use separate boss and worker event loop groups** for servers: one thread for the boss group (accepting connections) and `Environment.ProcessorCount` threads for the worker group (processing I/O).
2. **Always call `ShutdownGracefullyAsync()`** on event loop groups in a `finally` block to release threads and OS resources cleanly on application shutdown.
3. **Implement `ExceptionCaught` in every handler** and close the channel on unrecoverable errors; unhandled exceptions in the pipeline silently drop messages.
4. **Use `LengthFieldBasedFrameDecoder`** for TCP framing to handle message boundaries correctly; raw TCP provides a byte stream, not message boundaries.
5. **Add handlers in the correct pipeline order**: TLS first (innermost), then frame decoders, then string/object codecs, then business logic handlers last.
6. **Set `ChannelOption.TcpNodelay` to `true`** on clients to disable Nagle's algorithm for low-latency request-response protocols.
7. **Use `IByteBuffer` pooling** (`PooledByteBufferAllocator`) instead of unpooled allocators in production to reduce garbage collection pressure under high throughput.
8. **Implement heartbeat/keep-alive** with `IdleStateHandler` to detect and clean up dead connections that the OS TCP stack has not yet timed out.
9. **Keep business logic out of codec handlers**; decoders and encoders should only transform data formats, while `SimpleChannelInboundHandler<T>` subclasses handle application logic.
10. **Benchmark with realistic payloads** before deploying, as DotNetty's performance characteristics differ significantly between small frequent messages and large batch transfers.
