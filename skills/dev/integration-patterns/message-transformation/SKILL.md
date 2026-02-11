---
name: message-transformation
description: |
    Use when designing how messages are reshaped, enriched, filtered, or normalised as they flow between systems based on Enterprise Integration Patterns (Hohpe & Woolf).
    USE FOR: message transformation, envelope wrapping, content enrichment, content filtering, claim check, normalisation, canonical data models
    DO NOT USE FOR: routing messages (use message-routing), message format (use message-construction)
license: MIT
metadata:
  displayName: "Message Transformation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Enterprise Integration Patterns — Message Transformation"
    url: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTransformationIntro.html"
  - title: "Enterprise Integration Patterns — Hohpe & Woolf"
    url: "https://www.enterpriseintegrationpatterns.com/"
---

# Message Transformation

## Overview
Message Transformation patterns address the inevitable reality that different systems use different data formats, schemas, and conventions. Rather than forcing every system to agree on a single format, transformation patterns reshape messages in transit -- adding missing data, removing sensitive fields, translating between formats, and establishing common data models across the enterprise.

## Patterns

### Envelope Wrapper
Wraps a message inside a standardised envelope for transmission, then unwraps it at the destination. The envelope carries transport metadata while the payload carries business data.

**Wrapping (sender side):**
```json
// Original business message
{ "orderId": "5678", "total": 149.97 }

// Wrapped in envelope
{
  "envelope": {
    "messageId": "env-1a2b-3c4d",
    "timestamp": "2025-01-15T10:30:00Z",
    "source": "order-service",
    "contentType": "application/json",
    "encryption": "AES-256",
    "signature": "base64-sig..."
  },
  "payload": {
    "orderId": "5678",
    "total": 149.97
  }
}
```

**Unwrapping (receiver side):** Strip envelope, verify signature, decrypt, deliver payload.

**When to use:** Adding security (encryption, signing), transport headers, audit metadata without polluting the business message.

### Content Enricher
Augments a message with additional data from an external source before forwarding.

```
┌──────────┐    ┌──────────────┐    ┌──────────┐
│ Incoming │───>│  Content     │───>│ Enriched │
│ Message  │    │  Enricher    │    │ Message  │
└──────────┘    └──────┬───────┘    └──────────┘
                       │
                       v
                ┌──────────────┐
                │ External     │
                │ Data Source  │
                │ (DB, API)    │
                └──────────────┘
```

**Before enrichment:**
```json
{
  "orderId": "5678",
  "customerId": "cust-001"
}
```

**After enrichment:**
```json
{
  "orderId": "5678",
  "customerId": "cust-001",
  "customerName": "Jane Smith",
  "customerTier": "gold",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  }
}
```

**When to use:** When a message contains only identifiers and the consumer needs full details -- looking up customer info, resolving product details, adding geolocation data.

### Content Filter
Removes unwanted or sensitive data from a message, producing a leaner or safer payload.

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Full Message │───>│  Content     │───>│ Filtered     │
│ (all fields) │    │  Filter      │    │ Message      │
└──────────────┘    └──────────────┘    └──────────────┘
```

**Before filtering:**
```json
{
  "customerId": "cust-001",
  "name": "Jane Smith",
  "ssn": "123-45-6789",
  "creditCard": "4111-1111-1111-1111",
  "email": "jane@example.com",
  "tier": "gold"
}
```

**After filtering (for analytics channel):**
```json
{
  "customerId": "cust-001",
  "tier": "gold"
}
```

**When to use:** Removing PII before sending to analytics, stripping internal fields before external APIs, reducing payload size.

### Claim Check
Stores large message content in an external data store and replaces it with a reference (claim check). The receiver retrieves the full content using the reference.

```
┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│ Large        │───>│ Store &     │───>│ Lightweight  │
│ Message      │    │ Replace     │    │ Message +    │
│ (10 MB)      │    └─────────────┘    │ Claim Check  │
└──────────────┘          │            └──────────────┘
                          v
                   ┌──────────────┐
                   │ Blob Store / │
                   │ S3 / DB      │
                   └──────────────┘
```

**Claim check message:**
```json
{
  "messageId": "msg-7890",
  "orderId": "5678",
  "attachmentRef": {
    "store": "s3://messages-bucket",
    "key": "attachments/msg-7890/invoice.pdf",
    "sizeBytes": 10485760,
    "checksum": "sha256:abc123..."
  }
}
```

**When to use:** Messages with large attachments (images, PDFs, datasets), when channel size limits would be exceeded, when only some consumers need the full payload.

### Normalizer
Routes incoming messages from multiple sources through format-specific translators, converting them all to a single common format.

```
┌──────────┐
│ XML from │───┐
│ System A │   │    ┌─────────────┐    ┌──────────────┐
└──────────┘   ├───>│ Normalizer  │───>│ Canonical    │
┌──────────┐   │    │ (router +   │    │ Format       │
│ CSV from │───┤    │  translators)│   │ (JSON)       │
│ System B │   │    └─────────────┘    └──────────────┘
└──────────┘   │
┌──────────┐   │
│ JSON from│───┘
│ System C │
└──────────┘
```

**Internally, a Normalizer combines a Content-Based Router with per-format translators:**
```
                     ┌──────────────┐
                ┌───>│ XML -> JSON  │───┐
  ┌─────────┐   │    └──────────────┘   │    ┌───────────┐
──│ Router  │───┤                       ├───>│ Canonical │
  │(by format)  │    ┌──────────────┐   │    │ Output    │
  └─────────┘   └───>│ CSV -> JSON  │───┘    └───────────┘
                     └──────────────┘
```

**When to use:** Integrating multiple systems that produce the same logical data in different formats.

### Canonical Data Model
Defines a standard, application-independent data format used as the common language across all integrated systems. Each system translates to/from the canonical model at its boundary.

```
┌──────────┐    ┌──────────┐         ┌──────────┐    ┌──────────┐
│ System A │───>│ A -> CDM │────────>│ CDM -> B │───>│ System B │
│ (format A)│   └──────────┘         └──────────┘    │(format B)│
└──────────┘         │                    ^           └──────────┘
                     v                    │
              ┌──────────────────────────────┐
              │    Canonical Data Model      │
              │    (shared schema)           │
              └──────────────────────────────┘
                     │                    ^
                     v                    │
┌──────────┐    ┌──────────┐         ┌──────────┐    ┌──────────┐
│ System C │───>│ C -> CDM │────────>│ CDM -> D │───>│ System D │
│ (format C)│   └──────────┘         └──────────┘    │(format D)│
└──────────┘                                          └──────────┘
```

**When to use:** Enterprise-wide integration where N systems must interoperate. Without a canonical model, N systems require N*(N-1) translators; with one, only 2*N translators.

## Choosing the Right Transformation Pattern

| Problem | Pattern |
|---------|---------|
| Add transport metadata without changing payload | Envelope Wrapper |
| Message needs additional data from external source | Content Enricher |
| Remove sensitive or unnecessary fields | Content Filter |
| Message too large for the channel | Claim Check |
| Multiple sources, different formats, same meaning | Normalizer |
| N systems need a shared data language | Canonical Data Model |

## Best Practices
- Apply Content Enricher early in the pipeline so downstream consumers have all the data they need.
- Apply Content Filter at system boundaries -- especially before sending data to external partners or analytics.
- Use Claim Check proactively; do not wait until you hit channel size limits in production.
- Define the Canonical Data Model collaboratively across teams; a model imposed by one team rarely succeeds.
- Version your Canonical Data Model and treat it as a contract with the same rigour as an API contract.
- Keep transformations stateless and side-effect free -- they should be pure functions on message data.
- Log transformation inputs and outputs (redacting sensitive fields) for debugging data mapping issues.
- Prefer Normalizer at system entry points so the rest of the pipeline works with a single format.
