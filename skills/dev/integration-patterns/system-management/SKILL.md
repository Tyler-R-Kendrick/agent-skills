---
name: system-management
description: |
    Use when designing observability, testing, debugging, and operational control for messaging systems based on Enterprise Integration Patterns (Hohpe & Woolf).
    USE FOR: messaging observability, wire tap, control bus, message history, message store, monitoring messaging systems, testing message flows, debugging async systems
    DO NOT USE FOR: message routing (use message-routing), consumer patterns (use messaging-endpoints)
license: MIT
metadata:
  displayName: "System Management"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# System Management

## Overview
System Management patterns address the operational reality of running messaging systems in production. Asynchronous, distributed message flows are notoriously difficult to observe, debug, and test. These patterns provide the tools to monitor messages in flight, trace their history, store them for audit, inject test traffic, control routing at runtime, and purge channels during maintenance. Without these patterns, a messaging system becomes a black box.

## Patterns

### Control Bus
A dedicated management channel that carries administrative commands to messaging components -- enabling, disabling, reconfiguring, or querying system state without touching production message channels.

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Router   │    │ Filter   │    │ Consumer │    │Transform │
└────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │               │
═════╪═══════════════╪═══════════════╪═══════════════╪═════
                    Control Bus
══════════════════════════════════════════════════════════
                         ^
                         │
                  ┌──────────────┐
                  │  Operations  │
                  │  Console     │
                  └──────────────┘
```

**Example commands:**
- Pause/resume a consumer
- Change routing rules on a Dynamic Router
- Adjust throttle limits
- Query queue depth and consumer count
- Enable/disable a Detour

**When to use:** Any production messaging system that needs runtime operational control without redeployment.

### Detour
A switchable bypass that can route messages through an additional processing step (typically for validation, logging, or testing) and can be toggled on/off via the Control Bus.

```
Normal flow (detour OFF):
┌──────────┐────────────────────────────────>┌──────────┐
│ Source   │                                 │ Dest     │
└──────────┘                                 └──────────┘

Detour flow (detour ON):
┌──────────┐    ┌──────────────┐    ┌──────────┐
│ Source   │───>│  Detour Step │───>│ Dest     │
└──────────┘    │  (validate / │    └──────────┘
                │   audit /    │
                │   debug)     │
                └──────────────┘
```

**When to use:** Temporarily inserting validation, extra logging, or debugging steps into a live pipeline without changing the pipeline configuration permanently. Toggle via Control Bus.

### Wire Tap
Inspects messages flowing through a channel by sending a copy to a secondary channel for monitoring, without affecting the primary message flow.

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Source   │───>│ Wire Tap │───>│ Dest     │
└──────────┘    └────┬─────┘    └──────────┘
                     │ (copy)
                     v
                ┌──────────────┐
                │ Monitor /    │
                │ Logger /     │
                │ Analytics    │
                └──────────────┘
```

**When to use:** Auditing, real-time monitoring, debugging message content, feeding analytics pipelines, compliance logging. The most essential observability pattern for messaging.

**Key property:** The Wire Tap must not alter or delay the original message flow. It is a passive observer.

### Message History
Each processing step appends its identity and timestamp to a metadata list in the message, creating a complete trace of everywhere the message has been.

```
Message arrives at Step A:
  history: []

After Step A:
  history: [{ "step": "validator", "at": "10:30:00.001" }]

After Step B:
  history: [
    { "step": "validator",  "at": "10:30:00.001" },
    { "step": "enricher",   "at": "10:30:00.045" }
  ]

After Step C:
  history: [
    { "step": "validator",  "at": "10:30:00.001" },
    { "step": "enricher",   "at": "10:30:00.045" },
    { "step": "router",     "at": "10:30:00.052" }
  ]
```

**When to use:** Debugging complex message flows, performance analysis (identify slow steps), compliance (prove a message was processed by required steps), tracing in distributed systems.

**Relationship to distributed tracing:** Message History is the EIP equivalent of modern distributed tracing (OpenTelemetry spans). In practice, use your tracing framework and propagate trace context through message headers.

### Message Store
Persists every message to a central store as it passes through the system, enabling replay, audit, and forensic analysis.

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Source   │───>│ Channel  │───>│ Consumer │
└──────────┘    └────┬─────┘    └──────────┘
                     │ (store)
                     v
              ┌──────────────┐
              │ Message      │
              │ Store        │
              │ (database /  │
              │  event log)  │
              └──────────────┘
                     ^
                     │ (query / replay)
              ┌──────────────┐
              │ Ops / Debug  │
              │ Dashboard    │
              └──────────────┘
```

**When to use:** Audit trails, debugging production issues, replaying messages after a bug fix, regulatory compliance, building event-sourced read models.

**Implementation considerations:**
- Store messages before processing (for guaranteed audit) or after (for confirmed processing records).
- Index by messageId, correlationId, timestamp, and message type for efficient querying.
- Implement retention policies; unbounded storage grows indefinitely.

### Smart Proxy
A proxy that tracks request-reply conversations, redirecting replies back to the original requestor even when the replier does not know the original return address.

```
┌───────────┐    ┌─────────────┐    ┌──────────┐
│ Requestor │───>│ Smart Proxy │───>│ Service  │
│           │    │             │    │          │
│           │    │ Stores:     │    │ Replies  │
│           │<───│ req-id ->   │<───│ to proxy │
│           │    │ return addr │    │          │
└───────────┘    └─────────────┘    └──────────┘
```

**When to use:** Inserting intermediary processing (logging, enrichment, validation) into a request-reply flow without modifying either the requestor or the service. Useful for legacy service integration.

### Test Message
Injects synthetic test messages into the live messaging system on a schedule to verify that the entire pipeline is healthy.

```
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
│ Test Message │───>│ Channel  │───>│ Consumer │───>│ Test Message │
│ Generator   │    └──────────┘    └──────────┘    │ Verifier     │
│ (scheduled) │                                     │ (checks      │
└──────────────┘                                    │  arrival,    │
                                                    │  latency,    │
                                                    │  content)    │
                                                    └──────────────┘
                                                          │
                                                     ALERT if
                                                     missing/late
```

**When to use:** Proactive health monitoring -- verify end-to-end pipeline health, detect silent failures, measure processing latency. Similar to synthetic monitoring for HTTP endpoints.

**Design considerations:**
- Mark test messages clearly (header flag) so consumers can filter or skip them if needed.
- Verify both arrival and content integrity.
- Alert when a test message does not arrive within the expected window.

### Channel Purger
Removes all messages from a channel, typically used during testing, development, or maintenance to start with a clean state.

```
┌──────────────────┐    ┌───────────────┐
│ Channel          │───>│ Channel       │
│ [msg1, msg2,     │    │ Purger        │
│  msg3, msg4]     │    │               │
└──────────────────┘    └───────────────┘
                               │
                               v
┌──────────────────┐
│ Channel          │
│ []  (empty)      │
└──────────────────┘
```

**When to use:** Test setup/teardown, clearing poison messages that block a queue, maintenance windows, resetting after a failed deployment.

**Caution:** Never run against production channels without explicit authorisation. Use the Control Bus to trigger and audit purge operations.

## Observability Strategy for Messaging Systems

```
┌─────────────────────────────────────────────────────────────┐
│                 Observability Layers                         │
├─────────────────────────────────────────────────────────────┤
│  Wire Tap          │ See messages in real time              │
│  Message History   │ Trace a message through the pipeline  │
│  Message Store     │ Query and replay past messages         │
│  Test Message      │ Verify pipeline health proactively     │
│  Control Bus       │ Inspect and adjust system at runtime   │
├─────────────────────────────────────────────────────────────┤
│  Modern Equivalents                                         │
│  Wire Tap        -> OpenTelemetry spans + logs              │
│  Message History -> Distributed trace propagation           │
│  Message Store   -> Event store / audit log                 │
│  Test Message    -> Synthetic monitoring                    │
│  Control Bus     -> Feature flags + admin APIs              │
└─────────────────────────────────────────────────────────────┘
```

## Choosing the Right Management Pattern

| Problem | Pattern |
|---------|---------|
| Runtime configuration of messaging components | Control Bus |
| Temporarily add a processing step | Detour |
| Monitor messages without affecting flow | Wire Tap |
| Trace a message through all processing steps | Message History |
| Audit, replay, or query past messages | Message Store |
| Insert proxy between requestor and service | Smart Proxy |
| Verify pipeline health proactively | Test Message |
| Clear a channel for testing or maintenance | Channel Purger |

## Best Practices
- Deploy Wire Taps from day one; adding observability after a production incident is too late.
- Propagate trace context (correlationId, traceId) through every message header to enable distributed tracing.
- Use the Control Bus pattern even if you implement it as feature flags or admin API endpoints -- the principle of a separate management plane matters.
- Store messages with enough metadata (messageId, correlationId, timestamp, source, type) to reconstruct any conversation.
- Implement Test Messages for critical business pipelines; silent failures are the most dangerous kind.
- Protect Channel Purger behind access controls and audit logging; an accidental purge in production can cause data loss.
- Detours are invaluable for debugging production issues; design pipelines with detour insertion points from the start.
- Correlate messaging observability with application metrics (error rates, latency) for a complete operational picture.
