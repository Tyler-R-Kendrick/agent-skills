---
name: message-routing
description: |
    Use when designing how messages are directed, split, aggregated, and orchestrated across enterprise systems based on Enterprise Integration Patterns (Hohpe & Woolf).
    USE FOR: content-based routing, message filtering, splitter/aggregator, scatter-gather, routing slip, process manager, dynamic routing, recipient lists
    DO NOT USE FOR: message format (use message-construction), message transformation (use message-transformation)
license: MIT
metadata:
  displayName: "Message Routing"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Message Routing

## Overview
Message Routing patterns determine how a message gets from its origin to the correct destination(s). Rather than hardwiring sender to receiver, routing patterns decouple message producers from consumers by introducing intermediary components that inspect, split, aggregate, and direct messages based on content, rules, or dynamic conditions. These are among the most frequently used patterns in enterprise integration.

## Patterns

### Content-Based Router
Inspects message content and routes to the appropriate channel based on data values.

```
                          ┌───────────────┐
                     ┌───>│ Gold Channel  │
┌──────────┐    ┌────┴──┐ └───────────────┘
│ Incoming │───>│ CBR   │
│ Message  │    │       │ ┌───────────────┐
└──────────┘    └────┬──┘ │Silver Channel │
                     └───>└───────────────┘
                          ┌───────────────┐
                     └───>│ Bronze Channel│
                          └───────────────┘
               (routes based on customer.tier)
```

**When to use:** Different message content requires different processing paths -- e.g., routing orders by region, priority, or customer tier.

### Message Filter
Removes unwanted messages from a channel, allowing only those matching a predicate to pass through.

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ All      │───>│ Filter   │───>│ Matching │
│ Messages │    │ (predicate)   │ Messages │
└──────────┘    └──────────┘    └──────────┘
                     │
                  (discarded)
```

**When to use:** Eliminating irrelevant messages before they reach a consumer -- e.g., filtering test events from production streams.

### Dynamic Router
Routes messages based on rules that can change at runtime, typically maintained in an external configuration or control channel.

```
┌──────────┐    ┌──────────────┐    ┌──────────┐
│ Message  │───>│   Dynamic    │───>│ Dest A/B │
└──────────┘    │   Router     │    └──────────┘
                └──────────────┘
                       ^
                       │
                ┌──────────────┐
                │ Control      │
                │ Channel      │
                │ (rule updates)│
                └──────────────┘
```

**When to use:** When routing rules change frequently -- feature flags, A/B testing, gradual rollouts, multi-tenant routing.

### Recipient List
Sends a message to a dynamically determined list of recipients computed at runtime.

```
                     ┌──────────────┐
                ┌───>│ Recipient A  │
┌──────────┐    │    └──────────────┘
│ Message  │───>├───>┌──────────────┐
└──────────┘    │    │ Recipient B  │
   (with        │    └──────────────┘
   recipient    └───>┌──────────────┐
   list)             │ Recipient C  │
                     └──────────────┘
```

**When to use:** Notification to a variable set of subscribers -- e.g., alerting all stakeholders for a given order, where the stakeholder list varies per order.

### Splitter
Breaks a single composite message into multiple individual messages, each processed independently.

```
┌──────────────┐    ┌──────────┐    ┌──────┐
│ Order with   │───>│ Splitter │───>│Item 1│
│ 3 line items │    └──────────┘    └──────┘
└──────────────┘         │          ┌──────┐
                         ├─────────>│Item 2│
                         │          └──────┘
                         │          ┌──────┐
                         └─────────>│Item 3│
                                    └──────┘
```

**When to use:** Processing batch messages item-by-item, breaking an order into line items, splitting a file into records.

### Aggregator
Collects and combines related messages into a single composite message, the inverse of the Splitter.

```
┌──────┐
│Item 1│───┐
└──────┘   │    ┌────────────┐    ┌──────────────┐
┌──────┐   ├───>│ Aggregator │───>│ Combined     │
│Item 2│───┤    │            │    │ Result       │
└──────┘   │    └────────────┘    └──────────────┘
┌──────┐   │
│Item 3│───┘
└──────┘
        (correlates by orderId,
         completes when all items received)
```

**When to use:** Reassembling split messages, combining responses from parallel processing, building summary results. Requires a correlation strategy and a completion condition.

### Resequencer
Reorders messages back into the correct sequence when they arrive out of order.

```
┌───┐ ┌───┐ ┌───┐         ┌─────────────┐    ┌───┐ ┌───┐ ┌───┐
│ 3 │ │ 1 │ │ 2 │────────>│ Resequencer │───>│ 1 │ │ 2 │ │ 3 │
└───┘ └───┘ └───┘         └─────────────┘    └───┘ └───┘ └───┘
  (out of order)             (buffers and      (correct order)
                              reorders)
```

**When to use:** When message ordering matters but the transport does not guarantee it, such as after parallel processing or across multiple channels.

### Composed Message Processor
Splits a message, routes each part to the appropriate handler, then reassembles the results.

```
┌──────────┐    ┌──────────┐    ┌────────┐    ┌────────────┐    ┌──────────┐
│ Composite│───>│ Splitter │───>│Router A│───>│ Aggregator │───>│ Combined │
│ Message  │    └──────────┘    └────────┘    └────────────┘    │ Result   │
└──────────┘         │          ┌────────┐         ^            └──────────┘
                     └─────────>│Router B│─────────┘
                                └────────┘
```

**When to use:** Order processing where each line item needs different fulfilment logic, then results are reassembled.

### Scatter-Gather
Broadcasts a request to multiple recipients and aggregates their replies.

```
                     ┌──────────┐
                ┌───>│ Vendor A │───┐
┌──────────┐    │    └──────────┘   │    ┌────────────┐    ┌──────────┐
│ Request  │───>│                   ├───>│ Aggregator │───>│ Best     │
└──────────┘    │    ┌──────────┐   │    └────────────┘    │ Quote    │
                └───>│ Vendor B │───┘                      └──────────┘
                     └──────────┘
```

**When to use:** Price comparison across vendors, parallel search across databases, requesting quotes from multiple suppliers.

### Routing Slip
Attaches a sequence of processing steps to the message itself; each step processes the message and forwards to the next step on the slip.

```
┌──────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Message  │───>│ Step 1  │───>│ Step 2  │───>│ Step 3  │
│ + slip:  │    │(Validate)│   │(Enrich) │    │(Store)  │
│ [1,2,3]  │    └─────────┘    └─────────┘    └─────────┘
└──────────┘
```

**When to use:** Dynamic pipelines where the processing sequence varies per message, self-routing workflows.

### Process Manager
A central coordinator that maintains state and determines the next step in a multi-step process based on intermediate results.

```
┌─────────────────────────────────────────────────────────┐
│                  Process Manager                        │
│                  (maintains state)                       │
│                                                         │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐            │
│  │ Step 1  │───>│ Step 2  │───>│ Step 3  │            │
│  │(Reserve) │   │(Charge) │    │(Ship)   │            │
│  └─────────┘    └─────────┘    └─────────┘            │
│       │              │              │                   │
│       v              v              v                   │
│  (state: reserved) (state: paid) (state: shipped)      │
└─────────────────────────────────────────────────────────┘
```

**When to use:** Long-running business processes, sagas, order fulfilment workflows with compensation logic.

### Message Broker
A central intermediary that decouples senders from receivers, accepting messages and routing them based on configuration or content.

```
┌──────────┐         ┌──────────────┐         ┌──────────┐
│ Sender A │────┐    │              │    ┌────>│ Recv X   │
└──────────┘    ├───>│   Message    │────┤     └──────────┘
┌──────────┐    │    │   Broker     │    │     ┌──────────┐
│ Sender B │────┘    │              │    └────>│ Recv Y   │
└──────────┘         └──────────────┘          └──────────┘
```

**When to use:** Centralised integration hub, decoupling many-to-many communication, protocol translation.

## Choosing the Right Routing Pattern

| Problem | Pattern |
|---------|---------|
| Route by message content | Content-Based Router |
| Remove unwanted messages | Message Filter |
| Route by runtime-configurable rules | Dynamic Router |
| Send to variable list of receivers | Recipient List |
| Break composite into parts | Splitter |
| Combine parts into a whole | Aggregator |
| Restore message order | Resequencer |
| Split, route parts, reassemble | Composed Message Processor |
| Broadcast and collect replies | Scatter-Gather |
| Self-describing processing pipeline | Routing Slip |
| Stateful multi-step orchestration | Process Manager |
| Central routing hub | Message Broker |

## Best Practices
- Use Content-Based Router when you have a small, stable set of routes; switch to Dynamic Router when rules change frequently.
- Always pair a Splitter with an Aggregator to avoid orphaned fragments.
- Aggregators need three things: a correlation key, a completion condition, and a timeout strategy.
- Prefer Routing Slip over Process Manager when steps are independent and do not require shared state.
- Use Process Manager (Saga) when you need compensation logic for failures in long-running workflows.
- Scatter-Gather should always have a timeout; do not wait indefinitely for all replies.
- Keep routing logic in the infrastructure layer, not in business code -- this makes it visible and reconfigurable.
- Monitor router decisions with Wire Tap for debugging; complex routing is notoriously hard to troubleshoot.
