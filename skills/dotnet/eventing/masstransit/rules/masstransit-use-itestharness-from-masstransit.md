---
title: "Use `ITestHarness` from `MassTransit"
impact: MEDIUM
impactDescription: "general best practice"
tags: masstransit, dotnet, eventing, distributed-messaging, pubsub-consumers, requestresponse-over-message-brokers
---

## Use `ITestHarness` from `MassTransit

Use `ITestHarness` from `MassTransit.Testing` for integration tests rather than mocking `IPublishEndpoint` or `IBus` directly.
