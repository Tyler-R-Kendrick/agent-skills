---
name: plantuml
description: |
    Use when creating UML and architecture diagrams using PlantUML's text-based DSL. Covers all major diagram types, syntax, skinparam theming, C4-PlantUML integration, and preprocessing directives.
    USE FOR: sequence diagrams, class diagrams, activity diagrams, component diagrams, state diagrams, use case diagrams, object diagrams, deployment diagrams, PlantUML syntax, skinparam theming, C4-PlantUML library, preprocessing directives, text-to-UML rendering
    DO NOT USE FOR: inline Markdown diagrams (use mermaidjs), enterprise architecture (use togaf or archimate), C4-specific DSL (use c4-diagrams with Structurizr)
license: MIT
metadata:
  displayName: "PlantUML"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# PlantUML

## Overview

PlantUML is an open-source tool that renders UML diagrams from a plain text description language. Diagrams are defined between `@startuml` and `@enduml` tags. PlantUML supports all major UML diagram types plus additional diagrams like network diagrams, Gantt charts, and mind maps. It integrates with IDEs, CI pipelines, and documentation tools, and can generate PNG, SVG, EPS, and ASCII art output.

## Sequence Diagram

The most commonly used PlantUML diagram type. Models the time-ordered exchange of messages between participants.

```plantuml
@startuml
title Order Processing Sequence

actor Customer
participant "Web App" as UI
participant "API Server" as API
database "PostgreSQL" as DB
queue "RabbitMQ" as Queue

Customer -> UI: Place Order
activate UI

UI -> API: POST /api/orders
activate API

API -> DB: BEGIN TRANSACTION
API -> DB: INSERT INTO orders
DB --> API: order_id = 42

API -> DB: UPDATE inventory
DB --> API: OK

API -> DB: COMMIT
DB --> API: OK

API -> Queue: Publish OrderCreated event
Queue --> API: ACK

API --> UI: 201 Created {order_id: 42}
deactivate API

UI --> Customer: Order Confirmation
deactivate UI

Queue -> API: Process OrderCreated
activate API
API -> API: Send confirmation email
deactivate API

@enduml
```

### Participant Types

| Keyword | Shape |
|---------|-------|
| `participant` | Rectangle (default) |
| `actor` | Stick figure |
| `boundary` | Boundary symbol |
| `control` | Control symbol |
| `entity` | Entity symbol |
| `database` | Cylinder |
| `collections` | Stacked rectangles |
| `queue` | Queue symbol |

### Arrow Types

| Syntax | Description |
|--------|-------------|
| `->` | Solid line, solid arrowhead |
| `-->` | Dashed line, solid arrowhead |
| `->>` | Solid line, thin arrowhead |
| `-->>` | Dashed line, thin arrowhead |
| `-\` | Solid line, upper half arrowhead |
| `-/` | Solid line, lower half arrowhead |
| `->x` | Solid line with lost message |
| `-[#red]>` | Colored arrow |

### Grouping and Fragments

```plantuml
@startuml

alt Successful
    A -> B: Request
    B --> A: Response
else Failure
    A -> B: Request
    B --> A: Error
end

loop Every 5 seconds
    A -> B: Heartbeat
    B --> A: ACK
end

par Parallel
    A -> B: Task 1
also
    A -> C: Task 2
end

opt Optional Step
    A -> B: Notify
end

critical Mutex Section
    A -> B: Lock
    B --> A: Acquired
end

@enduml
```

## Class Diagram

```plantuml
@startuml
title Domain Model

abstract class Entity<T> {
    - id: T
    - createdAt: DateTime
    - updatedAt: DateTime
    + getId(): T
}

interface IRepository<T extends Entity> {
    + findById(id: ID): T
    + findAll(): List<T>
    + save(entity: T): T
    + delete(id: ID): void
}

class User extends Entity {
    - email: String
    - name: String
    - passwordHash: String
    + getEmail(): String
    + verifyPassword(raw: String): Boolean
}

class Order extends Entity {
    - status: OrderStatus
    - total: BigDecimal
    + getTotal(): BigDecimal
    + addItem(item: OrderItem): void
    + cancel(): void
}

class OrderItem {
    - quantity: int
    - unitPrice: BigDecimal
    + getSubtotal(): BigDecimal
}

enum OrderStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
    CANCELLED
}

User "1" -- "0..*" Order : places >
Order "1" *-- "1..*" OrderItem : contains
Order --> OrderStatus

IRepository <|.. UserRepository
IRepository <|.. OrderRepository

@enduml
```

### Relationship Syntax

| Syntax | Meaning |
|--------|---------|
| `A <\|-- B` | B extends A (inheritance) |
| `A <\|.. B` | B implements A (realization) |
| `A *-- B` | A is composed of B (composition) |
| `A o-- B` | A aggregates B (aggregation) |
| `A --> B` | A depends on / uses B (directed association) |
| `A -- B` | Association |
| `A ..> B` | Dependency |
| `A -- "label" B` | Association with label |
| `A "1" -- "0..*" B` | Association with multiplicity |

### Visibility Modifiers

| Symbol | Visibility |
|--------|-----------|
| `+` | Public |
| `-` | Private |
| `#` | Protected |
| `~` | Package |
| `{abstract}` | Abstract method |
| `{static}` | Static member |

## Activity Diagram

PlantUML supports both legacy and modern (beta) activity diagram syntax. The modern syntax is recommended.

```plantuml
@startuml
title Order Fulfillment Process

start

:Receive Order;

if (Payment Valid?) then (yes)
    :Reserve Inventory;

    fork
        :Pack Items;
    fork again
        :Generate Invoice;
    fork again
        :Send Confirmation Email;
    end fork

    :Ship Order;

    if (Domestic?) then (yes)
        :Standard Shipping;
    else (no)
        :International Shipping;
        :Customs Declaration;
    endif

    :Update Tracking;
    :Mark as Shipped;
else (no)
    :Reject Order;
    :Notify Customer;
    :Refund if Charged;
endif

stop

@enduml
```

### Activity Diagram Elements

| Syntax | Meaning |
|--------|---------|
| `start` | Start node |
| `stop` | Stop node (success) |
| `end` | End node (termination) |
| `:Action;` | Action / activity step |
| `if (cond) then (yes) ... else (no) ... endif` | Decision |
| `fork ... fork again ... end fork` | Parallel execution |
| `while (cond?) is (yes) ... endwhile (no)` | Loop |
| `repeat ... repeat while (cond?)` | Do-while loop |
| `\|swimlane\|` | Swimlane / partition |
| `#color:Action;` | Colored action |

### Swimlanes

```plantuml
@startuml

|Customer|
start
:Place Order;

|System|
:Validate Order;
:Process Payment;

|Warehouse|
:Pick Items;
:Pack Shipment;

|Shipping|
:Ship Package;
:Update Tracking;

|Customer|
:Receive Package;
stop

@enduml
```

## Component Diagram

```plantuml
@startuml
title System Components

package "Frontend" {
    [Web App] as webapp
    [Mobile App] as mobile
}

package "Backend" {
    [API Gateway] as gateway
    [Auth Service] as auth
    [Order Service] as orders
    [Catalog Service] as catalog
}

package "Data" {
    database "PostgreSQL" as db
    database "Redis" as cache
    queue "RabbitMQ" as queue
}

cloud "External" {
    [Stripe] as stripe
    [SendGrid] as email
}

webapp --> gateway : REST
mobile --> gateway : REST
gateway --> auth : gRPC
gateway --> orders : gRPC
gateway --> catalog : gRPC
catalog --> db
catalog --> cache
orders --> db
orders --> queue
orders --> stripe : HTTPS
queue --> email : AMQP

@enduml
```

## State Diagram

```plantuml
@startuml
title Order State Machine

[*] --> Draft

Draft --> Submitted : submit()
Draft --> Cancelled : cancel()

Submitted --> InReview : [auto]

state InReview {
    [*] --> ValidatingPayment
    ValidatingPayment --> ValidatingInventory : [paymentOK]
    ValidatingPayment --> PaymentFailed : [paymentFailed]
    ValidatingInventory --> [*] : [inventoryOK]
    ValidatingInventory --> OutOfStock : [noStock]
}

InReview --> Approved : [allValid]
InReview --> Rejected : [validationFailed]

Approved --> Shipped : ship()
Shipped --> Delivered : confirmDelivery()
Rejected --> Draft : revise()

Delivered --> [*]
Cancelled --> [*]

note right of InReview
    Automatic validation
    runs within 30 seconds.
end note

@enduml
```

## Use Case Diagram

```plantuml
@startuml
title E-Commerce Use Cases

left to right direction

actor Customer as C
actor Admin as A
actor "Payment System" as PS <<external>>

rectangle "E-Commerce Platform" {
    usecase "Browse Catalog" as UC1
    usecase "Search Products" as UC2
    usecase "Place Order" as UC3
    usecase "Process Payment" as UC4
    usecase "Track Order" as UC5
    usecase "Manage Inventory" as UC6
    usecase "Generate Reports" as UC7
    usecase "Authenticate" as UC8
}

C --> UC1
C --> UC2
C --> UC3
C --> UC5
C --> UC8

A --> UC6
A --> UC7
A --> UC8

UC3 ..> UC4 : <<include>>
UC3 ..> UC8 : <<include>>
UC4 --> PS

@enduml
```

## Object Diagram

```plantuml
@startuml
title Order Instance Snapshot

object "order42 : Order" as o {
    id = 42
    status = CONFIRMED
    total = 149.97
    createdAt = "2025-03-15T10:30:00Z"
}

object "item1 : OrderItem" as i1 {
    productId = 101
    name = "Mechanical Keyboard"
    quantity = 1
    unitPrice = 99.99
}

object "item2 : OrderItem" as i2 {
    productId = 205
    name = "USB-C Cable"
    quantity = 2
    unitPrice = 24.99
}

object "customer7 : User" as u {
    id = 7
    name = "Alice Smith"
    email = "alice@example.com"
}

u --> o : places
o *-- i1 : contains
o *-- i2 : contains

@enduml
```

## Deployment Diagram

```plantuml
@startuml
title Production Deployment

node "CDN (CloudFront)" as cdn {
    artifact "Static Assets" as static
}

node "Kubernetes Cluster" as k8s {
    node "API Pod (x3)" as api_pod {
        artifact "API Service" as api
    }
    node "Worker Pod (x2)" as worker_pod {
        artifact "Background Worker" as worker
    }
}

node "AWS RDS" as rds {
    database "PostgreSQL Primary" as db_primary
    database "PostgreSQL Replica" as db_replica
}

node "AWS ElastiCache" as ec {
    database "Redis Cluster" as redis
}

node "AWS SQS" as sqs {
    queue "Order Queue" as queue
}

cdn --> api : HTTPS
api --> db_primary : SQL (write)
api --> db_replica : SQL (read)
api --> redis : Cache
api --> queue : Enqueue
worker --> queue : Dequeue
worker --> db_primary : SQL

db_primary --> db_replica : Replication

@enduml
```

## Skinparam and Theming

### Skinparam

`skinparam` controls the visual appearance of all diagram elements.

```plantuml
@startuml

skinparam backgroundColor #2E3440
skinparam defaultFontColor #ECEFF4
skinparam defaultFontName "Segoe UI"
skinparam defaultFontSize 12

skinparam class {
    BackgroundColor #4C566A
    BorderColor #D8DEE9
    FontColor #ECEFF4
    ArrowColor #88C0D0
    StereotypeFontColor #81A1C1
}

skinparam note {
    BackgroundColor #3B4252
    BorderColor #4C566A
    FontColor #ECEFF4
}

skinparam package {
    BackgroundColor #3B4252
    BorderColor #4C566A
    FontColor #D8DEE9
}

class User {
    + name: String
    + email: String
}

class Order {
    + total: Decimal
    + status: Status
}

User --> Order

@enduml
```

### Common Skinparam Properties

| Property | Description |
|----------|-------------|
| `BackgroundColor` | Shape fill color |
| `BorderColor` | Shape border color |
| `FontColor` | Text color |
| `FontSize` | Text size |
| `FontName` | Font family |
| `ArrowColor` | Connection line color |
| `ArrowThickness` | Connection line width |
| `Shadowing` | true/false for drop shadows |
| `RoundCorner` | Border radius in pixels |
| `Padding` | Internal padding |
| `Margin` | External margin |

### Built-in Themes

PlantUML includes built-in themes that can be applied with a single directive.

```plantuml
@startuml
!theme cerulean
' Other themes: amiga, blueprint, cerulean, crt-amber, crt-green,
' cyborg, hacker, lightgray, mars, materia, metal, minty, plain,
' reddress, sandstone, silver, sketchy-outline, spacelab, superhero,
' toy, united, vibrant

class Example {
    + field: Type
}

@enduml
```

## Includes and File Organization

### !include Directive

```plantuml
@startuml
' Include from a local file
!include common-styles.puml
!include domain/user.puml
!include domain/order.puml

' Include from a URL
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

User --> Order

@enduml
```

### Defining Reusable Fragments

**common-styles.puml:**
```plantuml
skinparam class {
    BackgroundColor #4C566A
    BorderColor #D8DEE9
    FontColor #ECEFF4
}

skinparam defaultFontName "Segoe UI"
```

**domain/user.puml:**
```plantuml
class User {
    - id: Long
    - email: String
    - name: String
    + getEmail(): String
}
```

## Preprocessing Directives

PlantUML includes a preprocessor with variables, conditionals, loops, and functions.

### Variables

```plantuml
@startuml
!$primary_color = "#5E81AC"
!$font_color = "#ECEFF4"
!$bg_color = "#2E3440"

skinparam backgroundColor $bg_color
skinparam class {
    BackgroundColor $primary_color
    FontColor $font_color
}

class Example {
    + field: Type
}

@enduml
```

### Conditionals

```plantuml
@startuml
!$env = "production"

!if ($env == "production")
    skinparam backgroundColor #2E3440
    skinparam defaultFontColor #ECEFF4
!else
    skinparam backgroundColor White
    skinparam defaultFontColor Black
!endif

class Config {
    + env: String
}

@enduml
```

### Procedures (Macros)

```plantuml
@startuml
!procedure $service($name, $tech)
    rectangle "$name\n<size:10>[$tech]</size>" as $name
!endprocedure

!procedure $database($name, $tech)
    database "$name\n<size:10>[$tech]</size>" as $name
!endprocedure

$service(API, "Node.js")
$service(Auth, "Go")
$database(DB, "PostgreSQL")
$database(Cache, "Redis")

API --> Auth
API --> DB
API --> Cache

@enduml
```

### Loops

```plantuml
@startuml
!$i = 0
!while $i < 3
    class "Service_$i" {
        + process(): void
    }
    !$i = $i + 1
!endwhile

Service_0 --> Service_1
Service_1 --> Service_2

@enduml
```

## C4-PlantUML Library

The C4-PlantUML library provides macros for creating C4 model diagrams using PlantUML.

### Installation

Include the library from GitHub or a local copy:

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml
' or for container diagrams:
' !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml
' or for component diagrams:
' !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml
@enduml
```

### C4 Context Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

LAYOUT_WITH_LEGEND()

title System Context Diagram

Person(customer, "Customer", "A user who shops online.")
System(ecommerce, "E-Commerce Platform", "Handles catalog, orders, and payments.")
System_Ext(payment, "Payment Provider", "Processes credit card transactions.")
System_Ext(email, "Email Service", "Sends transactional emails.")

Rel(customer, ecommerce, "Browses and purchases", "HTTPS")
Rel(ecommerce, payment, "Processes payments", "HTTPS")
Rel(ecommerce, email, "Sends notifications", "SMTP")

@enduml
```

### C4 Container Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title Container Diagram - E-Commerce Platform

Person(customer, "Customer")

System_Boundary(ecommerce, "E-Commerce Platform") {
    Container(webapp, "Web Application", "Next.js", "Serves the storefront UI.")
    Container(api, "API Service", "Node.js / Express", "Handles business logic and API endpoints.")
    Container(worker, "Background Worker", "Node.js", "Processes async tasks.")
    ContainerDb(db, "Database", "PostgreSQL", "Stores users, orders, products.")
    ContainerQueue(queue, "Message Queue", "RabbitMQ", "Async event processing.")
    Container(cache, "Cache", "Redis", "Session and data caching.")
}

System_Ext(payment, "Stripe", "Payment processing.")

Rel(customer, webapp, "Browses", "HTTPS")
Rel(webapp, api, "API calls", "HTTPS/JSON")
Rel(api, db, "Reads/Writes", "SQL")
Rel(api, cache, "Reads/Writes", "Redis Protocol")
Rel(api, queue, "Publishes events", "AMQP")
Rel(worker, queue, "Consumes events", "AMQP")
Rel(worker, db, "Reads/Writes", "SQL")
Rel(api, payment, "Charges", "HTTPS")

@enduml
```

### C4-PlantUML Macros

| Macro | Purpose |
|-------|---------|
| `Person(alias, label, description)` | Human user |
| `Person_Ext(alias, label, description)` | External human user |
| `System(alias, label, description)` | Software system in scope |
| `System_Ext(alias, label, description)` | External software system |
| `System_Boundary(alias, label)` | System boundary for container views |
| `Container(alias, label, technology, description)` | Container (app, service) |
| `ContainerDb(alias, label, technology, description)` | Database container |
| `ContainerQueue(alias, label, technology, description)` | Message queue container |
| `Component(alias, label, technology, description)` | Component inside a container |
| `Rel(from, to, label, technology)` | Relationship |
| `Rel_D(from, to, label)` | Relationship (downward) |
| `Rel_U(from, to, label)` | Relationship (upward) |
| `Rel_L(from, to, label)` | Relationship (leftward) |
| `Rel_R(from, to, label)` | Relationship (rightward) |
| `LAYOUT_WITH_LEGEND()` | Show legend with color meanings |
| `LAYOUT_TOP_DOWN()` | Top-to-bottom layout |
| `LAYOUT_LEFT_RIGHT()` | Left-to-right layout |

## Running PlantUML

### Command Line

```bash
# Generate PNG from a .puml file
java -jar plantuml.jar diagram.puml

# Generate SVG
java -jar plantuml.jar -tsvg diagram.puml

# Generate all diagrams in a directory
java -jar plantuml.jar -tsvg -o output/ src/diagrams/

# Generate from stdin
echo "@startuml\nA -> B\n@enduml" | java -jar plantuml.jar -pipe > diagram.png

# Use a config file for shared skinparam settings
java -jar plantuml.jar -config style.puml diagram.puml
```

### Docker

```bash
# Run PlantUML server
docker run -d -p 8080:8080 plantuml/plantuml-server:tomcat

# Generate via Docker (no local Java needed)
docker run --rm -v $(pwd):/data plantuml/plantuml -tsvg /data/diagram.puml
```

### IDE Integration

- **VS Code:** "PlantUML" extension by jebbs — provides syntax highlighting, live preview, and export.
- **IntelliJ IDEA:** Built-in PlantUML support via the PlantUML Integration plugin.
- **Confluence:** PlantUML plugin renders diagrams inline.

## Best Practices

- **Use `@startuml` / `@enduml` blocks.** Every PlantUML diagram must be wrapped in these tags. The optional name after `@startuml` becomes the output filename.
- **Organize with `!include`.** Split large models into separate `.puml` files per domain concept and compose them with includes.
- **Use skinparam for consistent styling.** Define a shared style file and `!include` it in every diagram for visual consistency.
- **Use built-in themes** for quick, professional styling. `!theme cerulean` or `!theme blueprint` are good defaults.
- **Leverage the preprocessor.** Use variables for colors, procedures for reusable shapes, and conditionals for environment-specific rendering.
- **Use C4-PlantUML for architecture diagrams.** The C4-PlantUML library provides well-designed macros that produce clean, standardized C4 diagrams.
- **Use aliases for readability.** `participant "API Server" as API` makes source readable while producing clean output.
- **Keep sequence diagrams focused.** If a sequence diagram has more than 7-8 participants or 20+ messages, split it into multiple diagrams with `ref` fragments.
- **Use `left to right direction`** in use case and component diagrams to improve readability for systems with many elements.
- **Generate SVG for documentation.** SVG scales better than PNG and is searchable. Use `-tsvg` in CI pipelines.
- **Integrate with CI.** Add PlantUML rendering to your CI pipeline so diagrams are always up-to-date. Docker-based rendering avoids Java dependency issues.
- **Use the PlantUML server** for team environments. A shared server provides consistent rendering and can be used as a rendering service for documentation platforms.
