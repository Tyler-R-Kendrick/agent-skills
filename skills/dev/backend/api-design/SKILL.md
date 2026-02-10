---
name: api-design
description: |
    Use when designing APIs — REST endpoints, GraphQL schemas, gRPC services, or WebSocket protocols — including resource naming, versioning, pagination, error handling, and API gateway patterns.
    USE FOR: REST API design, GraphQL schema design, gRPC service definition, WebSocket protocol design, API versioning, pagination strategies, API gateway patterns, idempotency, OpenAPI specifications
    DO NOT USE FOR: data storage design (use data-modeling), authentication mechanisms (use authentication), API testing (use testing/api-testing)
license: MIT
metadata:
  displayName: "API Design Patterns"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# API Design Patterns

## Overview
API design determines how clients interact with backend services. A well-designed API is intuitive, consistent, evolvable, and resilient. This skill covers the four major API styles -- REST, GraphQL, gRPC, and WebSocket -- along with cross-cutting concerns like versioning, pagination, rate limiting, and idempotency.

## REST API Design

### Resource Naming Conventions

```
GET    /users              → List users
POST   /users              → Create a user
GET    /users/{id}         → Get a specific user
PUT    /users/{id}         → Replace a user
PATCH  /users/{id}         → Partially update a user
DELETE /users/{id}         → Delete a user

GET    /users/{id}/orders  → List orders for a user (sub-resource)
```

**Rules:**
- Use **nouns** (not verbs) for resource names: `/users` not `/getUsers`.
- Use **plural** nouns: `/users` not `/user`.
- Use **kebab-case** for multi-word resources: `/order-items` not `/orderItems`.
- Nest sub-resources only one level deep. Beyond that, promote to a top-level resource.

### HTTP Methods & Status Codes

| Method | Semantics | Idempotent | Safe |
|--------|-----------|------------|------|
| GET | Read a resource | Yes | Yes |
| POST | Create a resource / trigger action | No | No |
| PUT | Replace a resource entirely | Yes | No |
| PATCH | Partially update a resource | No* | No |
| DELETE | Remove a resource | Yes | No |

*PATCH can be made idempotent with careful design (e.g., JSON Merge Patch).

| Status Code | When to Use |
|-------------|-------------|
| 200 OK | Successful GET, PUT, PATCH |
| 201 Created | Successful POST (include `Location` header) |
| 204 No Content | Successful DELETE |
| 400 Bad Request | Malformed request body or parameters |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Authenticated but insufficient permissions |
| 404 Not Found | Resource does not exist |
| 409 Conflict | State conflict (e.g., duplicate, version mismatch) |
| 422 Unprocessable Entity | Validation errors on well-formed request |
| 429 Too Many Requests | Rate limit exceeded (include `Retry-After`) |
| 500 Internal Server Error | Unhandled server error |

### HATEOAS (Hypermedia As The Engine Of Application State)

Include links in responses so clients can discover available actions:

```json
{
  "id": "usr_42",
  "name": "Alice",
  "_links": {
    "self": { "href": "/users/usr_42" },
    "orders": { "href": "/users/usr_42/orders" },
    "deactivate": { "href": "/users/usr_42/deactivate", "method": "POST" }
  }
}
```

### Pagination

| Strategy | Pros | Cons |
|----------|------|------|
| **Offset-based** (`?offset=20&limit=10`) | Simple, supports jumping to page N | Inconsistent with concurrent writes; slow at large offsets |
| **Cursor-based** (`?cursor=abc123&limit=10`) | Consistent during writes; performant at any depth | Cannot jump to arbitrary page; cursor is opaque |

**Recommendation:** Use cursor-based pagination for any dataset that changes frequently or grows large. Use offset-based only for small, static datasets or when page-jumping is a hard requirement.

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}
```

### Filtering & Sorting

```
GET /orders?status=shipped&created_after=2024-01-01&sort=-created_at&limit=20
```

- Use query parameters for filtering. Prefix sort fields with `-` for descending.
- For complex filtering, consider a structured query parameter: `?filter[status]=shipped&filter[total_gte]=100`.

### Versioning Strategies

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| **URL path** | `/v1/users` | Explicit, easy to route | URL pollution, hard to sunset |
| **Header** | `Accept: application/vnd.api+json;version=2` | Clean URLs | Hidden, harder to test in browser |
| **Content negotiation** | `Accept: application/vnd.myapp.v2+json` | RESTful, media-type driven | Complex, less discoverable |

**Recommendation:** URL-path versioning (`/v1/`, `/v2/`) is the most practical for most teams. Use it unless you have strong reasons for header-based versioning.

### Richardson Maturity Model

| Level | Description | Example |
|-------|-------------|---------|
| **0 — The Swamp of POX** | Single URI, single HTTP method (usually POST) | `POST /api` with action in body |
| **1 — Resources** | Multiple URIs, but only POST/GET | `GET /users`, `POST /users` |
| **2 — HTTP Verbs** | Proper use of GET, POST, PUT, DELETE, status codes | `PUT /users/42` returns 200 |
| **3 — Hypermedia Controls** | HATEOAS: responses include links to related actions | Links in response body |

Most production APIs target Level 2. Level 3 (HATEOAS) adds discoverability but increases response size and complexity.

## GraphQL Schema Design

### Schema Example (Schema-First / SDL)

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  orders(first: Int, after: String): OrderConnection!
}

type Order {
  id: ID!
  total: Float!
  status: OrderStatus!
  items: [OrderItem!]!
}

enum OrderStatus {
  PENDING
  SHIPPED
  DELIVERED
  CANCELLED
}

type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
}

type OrderEdge {
  node: Order!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

type Query {
  user(id: ID!): User
  users(first: Int, after: String): UserConnection!
}

type Mutation {
  createOrder(input: CreateOrderInput!): Order!
  cancelOrder(id: ID!): Order!
}

type Subscription {
  orderStatusChanged(userId: ID!): Order!
}

input CreateOrderInput {
  userId: ID!
  items: [OrderItemInput!]!
}
```

### The N+1 Problem & DataLoader

```
Query: { users { orders { items } } }

Without DataLoader:
  1 query for users
  N queries for orders (one per user)     ← N+1 problem
  M queries for items (one per order)

With DataLoader:
  1 query for users
  1 batched query for all orders          ← solved
  1 batched query for all items
```

**DataLoader** batches and caches database lookups within a single request. It collects all keys requested during a single tick of the event loop, then issues a single batched query.

### Schema-First vs. Code-First

| Approach | Tools | Pros | Cons |
|----------|-------|------|------|
| **Schema-first** | Apollo, graphql-tools | Schema is the contract; language-agnostic | Schema and resolvers can drift |
| **Code-first** | Nexus, TypeGraphQL, Strawberry | Type safety, co-located logic | Schema is derived, less portable |

### Federation

For microservices, **Apollo Federation** (or similar) lets each service own part of the graph:

```
Service A owns: User { id, name, email }
Service B owns: User { orders: [Order] }   ← extends User
Gateway composes both into a single graph
```

## gRPC Service Design

### Protobuf Service Definition

```protobuf
syntax = "proto3";

package orders.v1;

service OrderService {
  // Unary RPC
  rpc GetOrder(GetOrderRequest) returns (Order);

  // Server streaming
  rpc WatchOrderStatus(WatchOrderRequest) returns (stream OrderStatusEvent);

  // Client streaming
  rpc UploadOrderItems(stream OrderItem) returns (UploadSummary);

  // Bidirectional streaming
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

message GetOrderRequest {
  string order_id = 1;
}

message Order {
  string id = 1;
  string user_id = 2;
  repeated OrderItem items = 3;
  OrderStatus status = 4;
  double total = 5;
}

enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0;
  ORDER_STATUS_PENDING = 1;
  ORDER_STATUS_SHIPPED = 2;
  ORDER_STATUS_DELIVERED = 3;
}

message OrderItem {
  string product_id = 1;
  int32 quantity = 2;
  double unit_price = 3;
}
```

### Communication Patterns

| Pattern | Use Case | Flow |
|---------|----------|------|
| **Unary** | Standard request-response | Client sends one message, server replies with one message |
| **Server streaming** | Live updates, large result sets | Client sends one message, server streams multiple responses |
| **Client streaming** | File upload, batch ingestion | Client streams multiple messages, server replies once |
| **Bidirectional streaming** | Chat, real-time collaboration | Both sides stream messages independently |

### gRPC Best Practices
- **Deadlines:** Always set deadlines on client calls. Propagate deadlines across service boundaries.
- **Interceptors:** Use interceptors (middleware) for logging, authentication, and metrics.
- **Error codes:** Use standard gRPC status codes (NOT_FOUND, INVALID_ARGUMENT, DEADLINE_EXCEEDED, etc.).
- **gRPC-Web:** For browser clients, use Envoy or grpc-web proxy since browsers do not support HTTP/2 trailers natively.

## WebSocket Protocol Design

### Connection Lifecycle

```
1. Client sends HTTP Upgrade request
2. Server responds with 101 Switching Protocols
3. Full-duplex communication over persistent TCP connection
4. Either side can send frames at any time
5. Close handshake (close frame + acknowledgment)
```

### Design Patterns

| Pattern | Description |
|---------|-------------|
| **Rooms / Channels** | Group connections by topic; broadcast within a room (e.g., `chat:room-42`) |
| **Heartbeat / Ping-Pong** | Periodic ping frames detect dead connections; server or client can initiate |
| **Reconnection with backoff** | Client reconnects on disconnect with exponential backoff + jitter |
| **Message acknowledgment** | Assign IDs to messages; receiver acknowledges; sender retries unacknowledged |

### Message Format Convention

```json
{
  "type": "order.status_changed",
  "payload": {
    "order_id": "ord_123",
    "new_status": "shipped"
  },
  "id": "msg_abc",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

## Cross-Cutting API Concerns

### API Gateway Patterns
- **Request routing** -- route by path, header, or method to the correct backend service.
- **Authentication offloading** -- verify tokens at the gateway; pass claims to backends.
- **Rate limiting** -- enforce quotas per client/API key at the gateway.
- **Response caching** -- cache GET responses at the edge.
- **Request/response transformation** -- reshape payloads between external and internal formats.

### Idempotency Keys

For non-idempotent operations (especially payments), clients include a unique `Idempotency-Key` header. The server stores the result keyed by this value and returns the cached result on retry.

```
POST /payments
Idempotency-Key: pay_req_abc123
Content-Type: application/json

{ "amount": 99.99, "currency": "USD" }
```

### OpenAPI / Swagger Documentation

For REST APIs, maintain an OpenAPI specification as the source of truth. Cross-reference **specs** for documentation standards. Generate client SDKs, server stubs, and interactive docs from the spec.

## Best Practices
- Design APIs for the consumer, not the database schema. Resource models should reflect use cases, not table structures.
- Be consistent: once you pick conventions for naming, pagination, error format, and versioning, apply them uniformly across all endpoints.
- Use pagination on every list endpoint from day one. Unpaginated lists become production incidents.
- Prefer cursor-based pagination for any data that changes or grows.
- Always set and propagate deadlines/timeouts. An API call without a timeout is a resource leak waiting to happen.
- Include correlation IDs in every request/response for end-to-end tracing.
- Document your API with OpenAPI (REST) or SDL (GraphQL) and keep the spec in version control alongside the code.
