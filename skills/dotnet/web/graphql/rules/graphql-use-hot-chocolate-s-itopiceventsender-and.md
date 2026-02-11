---
title: "Use Hot Chocolate's `ITopicEventSender` and `ITopicEventReceiver` for subscriptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: graphql, dotnet, web, building-graphql-apis-in-net-using-hot-chocolate-use-when-clients-need-flexible-query-capabilities, field-selection, and-efficient-data-fetching-across-related-entities-without-over-fetching-or-under-fetching
---

## Use Hot Chocolate's `ITopicEventSender` and `ITopicEventReceiver` for subscriptions

Use Hot Chocolate's `ITopicEventSender` and `ITopicEventReceiver` for subscriptions: rather than implementing custom WebSocket handlers, because Hot Chocolate manages subscription lifecycle, serialization, and concurrent subscriber tracking through the configured subscription provider (in-memory or Redis).
