---
name: d2
description: |
    Use when creating architecture diagrams with the D2 declarative diagramming language by Terrastruct. D2 offers advanced layout control, nested containers, scenarios, and multiple rendering engines.
    USE FOR: architecture diagrams, system design diagrams, declarative diagramming, nested container diagrams, sequence diagrams, grid layouts, SQL table diagrams, scenario-based diagrams, diagrams requiring advanced layout control, D2 syntax, D2 CLI usage
    DO NOT USE FOR: GitHub-native diagram rendering (use mermaidjs), C4 model diagrams (use c4-diagrams), UML specification compliance (use uml or plantuml)
license: MIT
metadata:
  displayName: "D2"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# D2 — Declarative Diagramming

## Overview

D2 is a modern, declarative diagramming language created by Terrastruct. It compiles text into diagrams with support for multiple layout engines, nested containers, scenarios, layers, SQL table shapes, and advanced styling. D2 emphasizes readability, composability, and high-quality rendered output (SVG, PNG, PDF).

## Basic Syntax

### Shapes

Shapes are declared simply by naming them. D2 auto-creates shapes on first reference.

```d2
# Simple shapes
server
database
client

# Shape with label
server: Application Server

# Shape with explicit type
db: PostgreSQL {
  shape: cylinder
}

# Multiple shapes on one line are not supported; declare each separately
```

### Connections

Connections link shapes with arrows and optional labels.

```d2
client -> server: HTTP Request
server -> db: SQL Query
server -> client: HTTP Response

# Connection styles
a -> b: solid arrow
a -- b: line (no arrow)
a <-> b: bidirectional
a <- b: reverse arrow
```

### Labels and Tooltips

```d2
server: Application Server {
  tooltip: "Runs on port 8080"
}

server -> db: Reads data {
  style.stroke: green
}
```

## Shape Types

D2 supports a variety of built-in shapes.

| Shape | Keyword | Description |
|-------|---------|-------------|
| Rectangle | `shape: rectangle` | Default shape |
| Square | `shape: square` | Equal-sided rectangle |
| Circle | `shape: circle` | Round shape |
| Oval | `shape: oval` | Ellipse |
| Diamond | `shape: diamond` | Decision / condition |
| Cylinder | `shape: cylinder` | Database |
| Queue | `shape: queue` | Message queue |
| Package | `shape: package` | Namespace / module |
| Page | `shape: page` | Document |
| Parallelogram | `shape: parallelogram` | Input/output |
| Hexagon | `shape: hexagon` | Prepare / process |
| Cloud | `shape: cloud` | Cloud / external service |
| Person | `shape: person` | Human actor |
| Class | `shape: class` | UML class box |
| SQL Table | `shape: sql_table` | Database table |
| Image | `shape: image` | Raster or SVG image |
| Text | `shape: text` | Plain text label |
| Code | `shape: code` | Code block |

## Containers and Nesting

D2 supports arbitrarily nested containers to represent hierarchical structure.

```d2
aws: AWS Cloud {
  vpc: VPC {
    subnet_a: Subnet A {
      api: API Server {
        shape: rectangle
      }
      worker: Background Worker {
        shape: rectangle
      }
    }
    subnet_b: Subnet B {
      db: PostgreSQL {
        shape: cylinder
      }
      cache: Redis {
        shape: cylinder
      }
    }
  }
  cdn: CloudFront {
    shape: cloud
  }
}

user: User {
  shape: person
}

user -> aws.cdn: HTTPS
aws.cdn -> aws.vpc.subnet_a.api: Forward
aws.vpc.subnet_a.api -> aws.vpc.subnet_b.db: SQL
aws.vpc.subnet_a.api -> aws.vpc.subnet_b.cache: Redis Protocol
aws.vpc.subnet_a.worker -> aws.vpc.subnet_b.db: SQL
```

## SQL Tables

D2 has first-class support for SQL table shapes with columns, types, and constraints.

```d2
users: Users {
  shape: sql_table
  id: int {constraint: primary_key}
  email: varchar(255) {constraint: unique}
  name: varchar(100)
  created_at: timestamp
  org_id: int {constraint: foreign_key}
}

organizations: Organizations {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar(100)
  plan: varchar(50)
}

orders: Orders {
  shape: sql_table
  id: int {constraint: primary_key}
  user_id: int {constraint: foreign_key}
  total: decimal(10,2)
  status: varchar(20)
  created_at: timestamp
}

users.org_id -> organizations.id
orders.user_id -> users.id
```

## UML Class Shapes

```d2
UserService: UserService {
  shape: class
  -connection: DBConnection
  -cache: RedisClient
  +getUser(id int): User
  +createUser(data UserDTO): User
  +deleteUser(id int): bool
  -validateEmail(email string): bool
}

UserRepository: UserRepository {
  shape: class
  -db: DBConnection
  +findById(id int): User
  +save(user User): User
  +delete(id int): void
}

UserService -> UserRepository: uses
```

## Styles

### Shape Styles

```d2
server: Application Server {
  style: {
    fill: "#4C566A"
    stroke: "#D8DEE9"
    font-color: "#ECEFF4"
    border-radius: 8
    shadow: true
    opacity: 1.0
    stroke-width: 2
    stroke-dash: 0
  }
}
```

### Connection Styles

```d2
a -> b: Request {
  style: {
    stroke: "#88C0D0"
    stroke-width: 2
    stroke-dash: 5
    font-color: "#88C0D0"
    animated: true
  }
}
```

### Available Style Properties

| Property | Applies To | Description |
|----------|-----------|-------------|
| `fill` | Shapes | Background color |
| `stroke` | Shapes, connections | Border / line color |
| `stroke-width` | Shapes, connections | Border / line thickness |
| `stroke-dash` | Shapes, connections | Dash pattern (0 = solid) |
| `font-color` | Shapes, connections | Text color |
| `font-size` | Shapes, connections | Text size |
| `border-radius` | Shapes | Corner rounding |
| `shadow` | Shapes | Drop shadow |
| `opacity` | Shapes | Transparency (0.0 - 1.0) |
| `bold` | Shapes, connections | Bold text |
| `italic` | Shapes, connections | Italic text |
| `underline` | Shapes, connections | Underlined text |
| `animated` | Connections | Animated dashes |

## Classes (Reusable Styles)

Define reusable style classes and apply them to multiple elements.

```d2
classes: {
  primary: {
    style: {
      fill: "#5E81AC"
      font-color: "#ECEFF4"
      border-radius: 8
    }
  }
  database: {
    shape: cylinder
    style: {
      fill: "#A3BE8C"
      font-color: "#2E3440"
    }
  }
  external: {
    style: {
      fill: "#BF616A"
      font-color: "#ECEFF4"
      stroke-dash: 5
    }
  }
}

api: API Server {
  class: primary
}
db: PostgreSQL {
  class: database
}
stripe: Stripe API {
  class: external
}

api -> db
api -> stripe
```

## Icons

D2 supports icons from URLs. Commonly used with icon sets hosted online.

```d2
aws: AWS {
  icon: https://icons.terrastruct.com/aws%2F_Group%20Icons%2FAWS-Cloud-alt_light-bg.svg
}

postgres: PostgreSQL {
  icon: https://icons.terrastruct.com/dev%2Fpostgresql.svg
  shape: image
}

github: GitHub Actions {
  icon: https://icons.terrastruct.com/dev%2Fgithub.svg
}
```

## Grid Layouts

Grid layouts arrange child elements in a grid pattern.

```d2
services: Microservices {
  grid-rows: 2
  grid-columns: 3
  grid-gap: 16

  auth: Auth Service
  users: User Service
  orders: Order Service
  payments: Payment Service
  notifications: Notification Service
  analytics: Analytics Service
}
```

## Layers

Layers let you define multiple views within a single D2 file. Each layer produces a separate diagram.

```d2
# Base diagram (always rendered)
client -> server
server -> db

layers: {
  detailed: {
    client: Web Browser {
      shape: rectangle
    }
    server: API Server {
      auth: Auth Module
      handler: Request Handler
      auth -> handler
    }
    db: PostgreSQL {
      shape: cylinder
    }
    client -> server.auth: "Authenticate"
    server.handler -> db: "Query"
  }
}
```

## Scenarios

Scenarios show the same diagram in different states — useful for illustrating state changes or progressive disclosure.

```d2
server: Server {
  style.fill: "#A3BE8C"
}
db: Database {
  shape: cylinder
}
server -> db

scenarios: {
  failure: {
    server: Server {
      style.fill: "#BF616A"
    }
    server -> db: "Connection Lost" {
      style.stroke: red
      style.stroke-dash: 5
    }
  }
  recovery: {
    server: Server {
      style.fill: "#EBCB8B"
    }
    server -> db: "Reconnecting..." {
      style.stroke: orange
      style.animated: true
    }
  }
}
```

## Sequence Diagrams

D2 supports sequence diagrams with its own syntax inside a `shape: sequence_diagram` container.

```d2
interaction: {
  shape: sequence_diagram

  user: User
  api: API Server
  db: Database
  cache: Redis

  user -> api: "POST /orders"
  api -> cache: "Check inventory"
  cache -> api: "In stock"
  api -> db: "INSERT order"
  db -> api: "order_id: 42"
  api -> user: "201 Created"
}
```

## Layout Engines

D2 supports multiple layout engines, each with different strengths.

| Engine | Description | Best For |
|--------|-------------|----------|
| `dagre` | Default. Fast, hierarchical layout. | Most diagrams. Free and open source. |
| `ELK` | Eclipse Layout Kernel. More advanced algorithms. | Complex diagrams with many connections. Free and open source. |
| `TALA` | Terrastruct's proprietary engine. Best quality. | Presentation-quality diagrams. Requires license. |

### Specifying Layout Engine

```bash
# Via CLI flag
d2 --layout dagre input.d2 output.svg
d2 --layout elk input.d2 output.svg
d2 --layout tala input.d2 output.svg
```

Or in the D2 file:

```d2
direction: right
```

### Direction

```d2
direction: right  # left-to-right (default: down/top-to-bottom)
```

Available directions: `up`, `down`, `left`, `right`

## CLI Commands

```bash
# Install D2
curl -fsSL https://d2lang.com/install.sh | sh

# Or via Homebrew
brew install d2

# Compile D2 to SVG (default)
d2 input.d2 output.svg

# Compile to PNG
d2 --format png input.d2 output.png

# Compile to PDF
d2 --format pdf input.d2 output.pdf

# Watch mode (auto-recompile on changes)
d2 --watch input.d2 output.svg

# Specify layout engine
d2 --layout elk input.d2 output.svg

# Specify theme
d2 --theme 200 input.d2 output.svg

# Dark theme
d2 --dark-theme 200 input.d2 output.svg

# List available themes
d2 --help  # themes are numbered; see docs for full list

# Render a specific layer or scenario
d2 --target "layers.detailed" input.d2 output.svg

# Sketch mode (hand-drawn look)
d2 --sketch input.d2 output.svg

# Pad output
d2 --pad 50 input.d2 output.svg
```

## VS Code Extension

The official D2 extension for Visual Studio Code provides:

- Syntax highlighting for `.d2` files
- Live preview panel (renders the diagram as you type)
- Error diagnostics
- Autocompletion for shape types, styles, and keywords

Install from the VS Code marketplace: search for "D2" by Terrastruct.

## Complete Example

```d2
direction: right

title: E-Commerce Architecture {
  near: top-center
  shape: text
  style.font-size: 24
  style.bold: true
}

classes: {
  service: {
    style: {
      fill: "#5E81AC"
      font-color: "#ECEFF4"
      border-radius: 8
    }
  }
  datastore: {
    shape: cylinder
    style: {
      fill: "#A3BE8C"
      font-color: "#2E3440"
    }
  }
  external: {
    style: {
      fill: "#BF616A"
      font-color: "#ECEFF4"
      stroke-dash: 5
    }
  }
  client: {
    style: {
      fill: "#88C0D0"
      font-color: "#2E3440"
      border-radius: 12
    }
  }
}

customer: Customer {
  shape: person
}

frontend: Frontend {
  class: client
  web: Web App (Next.js)
  mobile: Mobile App (React Native)
}

backend: Backend Services {
  api: API Gateway {
    class: service
  }
  catalog: Catalog Service {
    class: service
  }
  orders: Order Service {
    class: service
  }
  auth: Auth Service {
    class: service
  }
}

data: Data Layer {
  catalog_db: Catalog DB {
    class: datastore
  }
  order_db: Order DB {
    class: datastore
  }
  cache: Redis Cache {
    class: datastore
  }
  queue: Message Queue {
    shape: queue
    style.fill: "#D08770"
  }
}

external: External Services {
  stripe: Stripe {
    class: external
  }
  sendgrid: SendGrid {
    class: external
  }
}

customer -> frontend.web: HTTPS
customer -> frontend.mobile: HTTPS

frontend.web -> backend.api: REST/GraphQL
frontend.mobile -> backend.api: REST/GraphQL

backend.api -> backend.auth: Verify token
backend.api -> backend.catalog: Product queries
backend.api -> backend.orders: Order management

backend.catalog -> data.catalog_db
backend.catalog -> data.cache
backend.orders -> data.order_db
backend.orders -> data.queue: Publish events

data.queue -> external.sendgrid: Order confirmation emails
backend.orders -> external.stripe: Process payment
```

## Best Practices

- **Use containers to represent system boundaries.** Nesting shapes inside containers clearly communicates which components belong to which subsystem.
- **Define style classes** for consistent visual language across the diagram. Create classes for services, datastores, external systems, etc.
- **Use the `direction` keyword** to control the overall layout orientation. `direction: right` works well for data flow; `direction: down` works well for hierarchies.
- **Leverage layers for progressive detail.** Use a base layer for the high-level overview and named layers for zoomed-in views.
- **Use scenarios to show state changes.** Scenarios are ideal for showing normal operation vs. failure modes, or before/after states.
- **Choose the right layout engine.** Start with `dagre` for simplicity. Switch to `ELK` for complex diagrams. Use `TALA` for presentation-quality output.
- **Use `--watch` during development.** The watch mode auto-recompiles on save, giving you a live preview workflow.
- **Use `--sketch` for informal communication.** The hand-drawn style signals that diagrams are conceptual, not final.
- **Keep `.d2` files in version control.** Like all diagrams-as-code, D2 files should live in the repository alongside the systems they describe.
- **Use SQL table shapes for data modeling.** D2's `sql_table` shape with constraints is a concise way to document database schemas.
- **Reference icons from the Terrastruct icon set** or use custom icon URLs for visual clarity in architecture diagrams.
