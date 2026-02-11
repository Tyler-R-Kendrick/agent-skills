# Enterprise Integration Patterns

## Overview
Enterprise Integration Patterns (EIP), catalogued by Gregor Hohpe and Bobby Woolf, define a vocabulary of 65 patterns for designing robust, asynchronous messaging systems. The patterns describe how to connect applications, transform data in flight, route messages intelligently, and manage messaging infrastructure -- all while keeping systems loosely coupled and independently deployable.

The book organises patterns around the pipes-and-filters architectural style: messages flow through a series of processing steps (filters) connected by channels (pipes).

## Pattern Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                   Enterprise Integration Patterns               │
├───────────────┬───────────────┬───────────────┬─────────────────┤
│  Messaging    │  Message      │  Message      │  Message        │
│  Channels     │  Construction │  Routing      │  Transformation │
│               │               │               │                 │
│  How messages │  How messages │  How messages  │  How messages   │
│  travel       │  are built    │  are directed │  are reshaped   │
├───────────────┴───────────────┴───────────────┴─────────────────┤
│  Messaging Endpoints          │  System Management              │
│                               │                                 │
│  How applications connect     │  How to monitor, test, and      │
│  to the messaging system      │  control the messaging system   │
└───────────────────────────────┴─────────────────────────────────┘
```

## Pipes-and-Filters Architecture

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source   │───>│ Filter A │───>│ Filter B │───>│  Sink    │
│ (Producer)│    │(Transform│    │ (Route)  │    │(Consumer)│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
      pipe           pipe           pipe
    (channel)      (channel)      (channel)
```

Each **filter** performs a single processing step (validate, enrich, transform, route). Each **pipe** is a message channel connecting one filter to the next. This architecture provides:
- **Composability** -- combine simple filters into complex workflows.
- **Replaceability** -- swap a filter without touching others.
- **Scalability** -- scale individual filters independently.
- **Testability** -- test each filter in isolation.

## When to Use Messaging vs. Direct Calls

| Concern | Direct / Synchronous Calls | Messaging / Asynchronous |
|---------|---------------------------|--------------------------|
| Coupling | Caller must know callee's address and API | Sender only knows the channel |
| Availability | Callee must be running | Callee can be offline; messages queue |
| Latency | Immediate response required | Eventual response acceptable |
| Throughput | Limited by slowest participant | Buffer with queues; scale consumers |
| Error handling | Caller handles errors in real time | Dead-letter channels, retries, compensation |
| Complexity | Simple for 1:1 interactions | Worth it when >2 participants or reliability matters |

**Rule of thumb:** Start synchronous. Move to messaging when you need temporal decoupling, load levelling, reliable delivery, or fan-out to multiple consumers.

## Pattern Selection Guide

| Problem | Pattern Category | Key Patterns |
|---------|-----------------|--------------|
| How do I send a message from A to B? | Messaging Channels | Point-to-Point Channel, Channel Adapter |
| How do I notify many subscribers? | Messaging Channels | Publish-Subscribe Channel |
| What goes inside a message? | Message Construction | Command Message, Event Message, Document Message |
| How do I correlate request and reply? | Message Construction | Correlation Identifier, Return Address |
| How do I route to the right consumer? | Message Routing | Content-Based Router, Recipient List |
| How do I split and reassemble? | Message Routing | Splitter, Aggregator |
| How do I orchestrate a multi-step flow? | Message Routing | Process Manager, Routing Slip |
| How do I reshape data between systems? | Message Transformation | Content Enricher, Normalizer, Canonical Data Model |
| How do I reduce message size? | Message Transformation | Claim Check, Content Filter |
| How do I consume messages reliably? | Messaging Endpoints | Competing Consumers, Idempotent Receiver |
| How do I monitor and debug? | System Management | Wire Tap, Message Store, Control Bus |

## Reference Implementations

| Technology | Language / Platform | Strengths |
|-----------|-------------------|-----------|
| **Apache Camel** | Java / JVM | Broadest connector ecosystem; DSL routes map 1:1 to EIP |
| **Spring Integration** | Java / Spring | Deep Spring ecosystem integration; annotation-driven |
| **MassTransit** | C# / .NET | First-class saga support; RabbitMQ & Azure Service Bus transports |
| **NServiceBus** | C# / .NET | Commercial-grade; strong tooling and monitoring |
| **MediatR** | C# / .NET | In-process mediator; great for CQRS without infrastructure |
| **Azure Service Bus** | Cloud (Azure) | Managed broker; topics, subscriptions, sessions |
| **RabbitMQ** | Any (AMQP) | Lightweight broker; exchanges map to routing patterns |
| **Apache Kafka** | Any | Log-based streaming; high throughput; replay capability |

## Best Practices
- Learn the pattern language before choosing a framework -- the vocabulary transcends any single implementation.
- Prefer idempotent message handlers; at-least-once delivery is the norm.
- Design messages as immutable, self-describing contracts with schema versioning.
- Keep channels focused on a single data type or purpose (Datatype Channel).
- Use Dead Letter Channels for every queue -- never silently drop messages.
- Instrument messaging with Wire Taps and Message Stores from day one; debugging async flows without observability is painful.
- Start with the simplest topology (point-to-point) and evolve toward pub-sub or content-based routing only when the need is proven.
