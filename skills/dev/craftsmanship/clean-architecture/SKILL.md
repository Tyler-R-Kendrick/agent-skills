---
name: clean-architecture
description: |
    Use when designing system boundaries, dependency direction, and layered architecture — based on Robert C. Martin's "Clean Architecture."
    USE FOR: dependency rule enforcement, layer separation, boundary design, use case isolation, screaming architecture, presenter/viewmodel patterns
    DO NOT USE FOR: code-level clean practices (use clean-code), hexagonal/ports-adapters specifically (use dev/architecture/hexagonal), microservices (use dev/architecture/microservices)
license: MIT
metadata:
  displayName: "Clean Architecture"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "The Clean Architecture — Robert C. Martin (Uncle Bob)"
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
  - title: "Clean Architecture — Robert C. Martin (Book)"
    url: "https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/"
---

# Clean Architecture

## Overview
*Clean Architecture: A Craftsman's Guide to Software Structure and Design* by Robert C. Martin presents a set of principles for organizing software so that it is testable, independent of frameworks, independent of the UI, independent of the database, and independent of any external agency.

The central idea: **The Dependency Rule** — source code dependencies must point only inward, toward higher-level policies.

## The Concentric Circles

```
┌─────────────────────────────────────────────────────────┐
│                 Frameworks & Drivers                     │
│      Web, UI, DB, Devices, External Interfaces          │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Interface Adapters                    │    │
│  │    Controllers, Gateways, Presenters            │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │          Application Business Rules      │    │    │
│  │  │              (Use Cases)                 │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │  Enterprise Business Rules      │    │    │    │
│  │  │  │        (Entities)               │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

         Dependencies point INWARD  ──────>
         Nothing in an inner circle can know about
         anything in an outer circle.
```

## The Dependency Rule

> Source code dependencies must point only inward, toward higher-level policies.

- **Entities** know nothing about Use Cases, Adapters, or Frameworks.
- **Use Cases** know about Entities, but nothing about Controllers, the Web, or the Database.
- **Interface Adapters** know about Use Cases, but not about which framework delivers HTTP requests.
- **Frameworks & Drivers** are the outermost layer and may know about everything inward, but inner layers never reference them.

The rule is absolute: **names declared in an outer circle must not be mentioned in an inner circle.** This includes functions, classes, variables, and any other software entity.

## The Four Layers

### 1. Entities (Enterprise Business Rules)
Entities encapsulate the most general and high-level business rules. They are the least likely to change when something external changes. An Entity can be an object with methods, or a set of data structures and functions.

```typescript
// entities/Order.ts — no framework imports, no database references
class Order {
    private items: OrderItem[] = [];

    addItem(product: Product, quantity: number): void {
        if (quantity <= 0) throw new InvalidQuantityError(quantity);
        this.items.push(new OrderItem(product, quantity));
    }

    total(): Money {
        return this.items.reduce(
            (sum, item) => sum.add(item.subtotal()),
            Money.zero()
        );
    }

    canBeShipped(): boolean {
        return this.items.length > 0 && this.total().isPositive();
    }
}
```

### 2. Use Cases (Application Business Rules)
Use Cases contain application-specific business rules. They orchestrate the flow of data to and from the Entities and direct them to use their enterprise-wide rules.

```typescript
// use-cases/PlaceOrder.ts
interface OrderRepository {
    save(order: Order): Promise<void>;
}

interface PaymentGateway {
    charge(amount: Money, paymentMethod: PaymentMethod): Promise<PaymentResult>;
}

class PlaceOrder {
    constructor(
        private orderRepo: OrderRepository,
        private paymentGateway: PaymentGateway,
        private notifier: OrderNotifier
    ) {}

    async execute(request: PlaceOrderRequest): Promise<PlaceOrderResponse> {
        const order = new Order();
        for (const item of request.items) {
            order.addItem(item.product, item.quantity);
        }

        const paymentResult = await this.paymentGateway.charge(
            order.total(), request.paymentMethod
        );

        if (!paymentResult.isSuccessful()) {
            return PlaceOrderResponse.failed(paymentResult.reason());
        }

        await this.orderRepo.save(order);
        await this.notifier.orderPlaced(order);
        return PlaceOrderResponse.success(order.id());
    }
}
```

Note: `OrderRepository`, `PaymentGateway`, and `OrderNotifier` are **interfaces defined in this layer**. Their implementations live in the outer layers.

### 3. Interface Adapters (Controllers, Gateways, Presenters)
This layer converts data from the form most convenient for Use Cases and Entities to the form most convenient for some external agency (database, web, etc.).

```typescript
// adapters/controllers/OrderController.ts
class OrderController {
    constructor(private placeOrder: PlaceOrder) {}

    async handlePost(httpRequest: HttpRequest): Promise<HttpResponse> {
        const request = this.mapToPlaceOrderRequest(httpRequest.body);
        const response = await this.placeOrder.execute(request);
        return this.mapToHttpResponse(response);
    }

    private mapToPlaceOrderRequest(body: any): PlaceOrderRequest { /* ... */ }
    private mapToHttpResponse(result: PlaceOrderResponse): HttpResponse { /* ... */ }
}

// adapters/gateways/PostgresOrderRepository.ts
class PostgresOrderRepository implements OrderRepository {
    async save(order: Order): Promise<void> {
        const row = this.mapToRow(order);
        await this.db.query("INSERT INTO orders ...", row);
    }
}
```

### 4. Frameworks & Drivers
The outermost layer. This is where all the details go — the web framework, the database driver, the UI framework. This layer is glue code that connects the outer world to the inner architecture.

```typescript
// frameworks/express/routes.ts
import express from "express";
import { OrderController } from "../../adapters/controllers/OrderController";

const router = express.Router();
const controller = new OrderController(/* injected use case */);

router.post("/orders", (req, res) => controller.handlePost(req).then(r => res.status(r.status).json(r.body)));
```

## Crossing Boundaries

When control flow needs to go from an inner layer to an outer layer (e.g., a Use Case needs to call a Repository), apply the **Dependency Inversion Principle**:

1. Define an **interface** in the inner layer (Use Cases).
2. Implement that interface in the outer layer (Adapters/Frameworks).
3. Use dependency injection to provide the implementation at runtime.

```
Use Case Layer           Adapter Layer
┌──────────────┐         ┌─────────────────────────┐
│ PlaceOrder   │         │ PostgresOrderRepository  │
│              │         │                          │
│ uses ──> OrderRepository <── implements           │
│ (interface)  │         │                          │
└──────────────┘         └─────────────────────────┘

Source code dependency: Adapter depends on Use Case (points inward).
Control flow: Use Case calls Adapter at runtime (points outward).
```

This is the key insight: **the source code dependency opposes the flow of control** at the boundary, achieved through polymorphism.

## Screaming Architecture

> "A good architecture screams the intent of the system."

When you look at the top-level directory structure, it should tell you what the system **does**, not what framework it uses.

```
# Bad — screams "Rails" or "Express"
src/
  controllers/
  models/
  views/
  routes/
  middleware/

# Good — screams "Health Clinic"
src/
  patients/
  appointments/
  prescriptions/
  billing/
  shared/
```

Each top-level folder represents a use case area or a bounded context, not a technical layer.

## The Humble Object Pattern

The Humble Object pattern splits a behavior into two parts:
1. A **humble** part that is hard to test (it touches the framework, UI, or database).
2. A **testable** part that contains all the interesting logic.

The humble part delegates immediately to the testable part with as little logic as possible.

**Example — Presenter / ViewModel:**

```typescript
// The testable part — pure logic, no UI dependency
class OrderPresenter {
    present(order: Order): OrderViewModel {
        return {
            orderId: order.id().toString(),
            totalDisplay: order.total().formatAsCurrency(),
            itemCount: `${order.items().length} item(s)`,
            canShip: order.canBeShipped(),
            statusColor: order.canBeShipped() ? "green" : "gray",
        };
    }
}

// The humble part — thin UI glue
class OrderView {
    constructor(private presenter: OrderPresenter) {}

    render(order: Order): void {
        const vm = this.presenter.present(order);
        document.getElementById("total").textContent = vm.totalDisplay;
        document.getElementById("status").style.color = vm.statusColor;
    }
}
```

The `OrderPresenter` is trivially testable. The `OrderView` is so thin that it barely needs testing.

## Boundaries

Boundaries are the lines you draw in the system to separate things that matter from things that are details. Every boundary follows the Dependency Rule.

**Identifying boundaries:**
- Between business rules and the database
- Between business rules and the UI
- Between business rules and external services
- Between independently deployable components
- Between teams or organizational units

**Boundary-crossing rule:** Data that crosses a boundary should be in the form most convenient for the inner layer. The outer layer is responsible for converting its data into the form the inner layer expects.

```typescript
// The inner layer defines what it needs
interface PlaceOrderRequest {
    items: Array<{ productId: string; quantity: number }>;
    paymentMethod: PaymentMethod;
}

// The outer layer maps HTTP/JSON into that format
function mapHttpBodyToRequest(body: any): PlaceOrderRequest {
    return {
        items: body.lineItems.map((li: any) => ({
            productId: li.sku,
            quantity: parseInt(li.qty, 10),
        })),
        paymentMethod: parsePaymentMethod(body.payment),
    };
}
```

## Clean Architecture vs. Related Patterns

| Pattern | Relationship |
|---------|-------------|
| Hexagonal Architecture (Ports & Adapters) | Clean Architecture is a generalization. Ports are the interfaces in the Use Case layer; Adapters are the implementations in the outer layer. |
| Onion Architecture | Nearly identical in structure. Clean Architecture adds the concept of Screaming Architecture and the Humble Object. |
| Domain-Driven Design (DDD) | Clean Architecture's Entities map to DDD's Domain Model. Bounded Contexts often align with top-level Clean Architecture modules. |
| SOLID Principles | Clean Architecture is the architectural expression of SOLID, especially the Dependency Inversion Principle. |

## Typical Project Structure

```
src/
  domain/                      # Entities — enterprise business rules
    entities/
    value-objects/
    domain-events/
  application/                 # Use Cases — application business rules
    use-cases/
    ports/                     # Interfaces for outbound dependencies
    dto/                       # Request/Response data structures
  adapters/                    # Interface Adapters
    controllers/               # Inbound (driving) adapters
    gateways/                  # Outbound (driven) adapters
    presenters/
    mappers/
  infrastructure/              # Frameworks & Drivers
    database/
    web/
    messaging/
    config/
```

## Best Practices
- Enforce the Dependency Rule with linter rules or architectural tests (e.g., ArchUnit, dependency-cruiser).
- Defer framework decisions as long as possible. The architecture should work without Express, React, or PostgreSQL.
- Keep Use Cases as pure orchestrators — they call Entities and Ports but contain minimal logic themselves.
- Use the Humble Object pattern at every boundary to maximize testable code.
- Name modules after business capabilities, not technical layers — let the architecture scream.
- Test inner layers with unit tests (fast, no I/O). Test boundaries with integration tests. Test the outermost layer with end-to-end tests sparingly.
- When in doubt about which layer something belongs to, ask: "If I change the database / framework / UI, does this need to change?" If yes, it belongs in an outer layer.
