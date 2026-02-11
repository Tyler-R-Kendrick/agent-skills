---
name: mermaidjs
description: |
    Use when creating text-based diagrams that render in Markdown environments. Mermaid.js is the most widely supported diagrams-as-code tool, with native rendering in GitHub, GitLab, Notion, and many documentation platforms.
    USE FOR: flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, mindmaps, timelines, git graphs, quadrant charts, C4 diagrams in Markdown, diagrams embedded in PRs and wikis, GitHub-native diagram rendering
    DO NOT USE FOR: enterprise architecture (use togaf or archimate), C4-specific DSL tooling (use c4-diagrams), advanced layout control (use d2)
license: MIT
metadata:
  displayName: "Mermaid.js"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Mermaid.js Official Documentation"
    url: "https://mermaid.js.org/"
  - title: "Mermaid.js — GitHub Repository"
    url: "https://github.com/mermaid-js/mermaid"
---

# Mermaid.js

## Overview

Mermaid.js is a JavaScript-based text-to-diagram tool that renders diagrams from Markdown-like syntax. It is the de facto standard for embedding diagrams in Markdown because GitHub, GitLab, Azure DevOps, Notion, Docusaurus, and many other platforms render Mermaid code blocks natively. You write text; the platform renders a diagram.

## Supported Diagram Types

| Diagram | Keyword | Purpose |
|---------|---------|---------|
| Flowchart | `flowchart` or `graph` | Process flows, decision trees, workflows |
| Sequence | `sequenceDiagram` | Interaction order between participants |
| Class | `classDiagram` | Object-oriented structure and relationships |
| State | `stateDiagram-v2` | State machine transitions |
| Entity Relationship | `erDiagram` | Data model relationships |
| Gantt | `gantt` | Project scheduling and timelines |
| Pie | `pie` | Proportional data |
| Mindmap | `mindmap` | Hierarchical idea mapping |
| Timeline | `timeline` | Chronological events |
| Quadrant | `quadrantChart` | 2x2 categorization matrix |
| C4 Context | `C4Context` | C4 Level 1 diagrams |
| C4 Container | `C4Container` | C4 Level 2 diagrams |
| Git Graph | `gitGraph` | Branch and commit visualization |

## Flowchart

The most commonly used diagram type. Supports directional layouts, shape types, subgraphs, and link styles.

### Directions

| Direction | Meaning |
|-----------|---------|
| `TB` or `TD` | Top to Bottom |
| `BT` | Bottom to Top |
| `LR` | Left to Right |
| `RL` | Right to Left |

### Node Shapes

| Syntax | Shape |
|--------|-------|
| `A[Text]` | Rectangle |
| `A(Text)` | Rounded rectangle |
| `A([Text])` | Stadium / pill |
| `A{Text}` | Diamond (decision) |
| `A{{Text}}` | Hexagon |
| `A[[Text]]` | Subroutine |
| `A[(Text)]` | Cylinder (database) |
| `A((Text))` | Circle |
| `A>Text]` | Asymmetric / flag |

### Full Example

````markdown
```mermaid
flowchart LR
    A[User Request] --> B{Authenticated?}
    B -->|Yes| C[Load Dashboard]
    B -->|No| D[Login Page]
    D --> E[Enter Credentials]
    E --> F{Valid?}
    F -->|Yes| C
    F -->|No| G[Show Error]
    G --> D

    subgraph Backend
        C --> H[(Database)]
        C --> I[Cache]
    end
```
````

### Link Types

| Syntax | Type |
|--------|------|
| `-->` | Arrow |
| `---` | Line (no arrow) |
| `-.->` | Dotted arrow |
| `==>` | Thick arrow |
| `--text-->` | Arrow with label |
| `-.text.->` | Dotted arrow with label |

## Sequence Diagram

Shows the order of interactions between participants over time.

````markdown
```mermaid
sequenceDiagram
    actor User
    participant UI as Web App
    participant API as API Server
    participant DB as Database

    User->>UI: Click "Place Order"
    UI->>API: POST /orders
    activate API
    API->>DB: INSERT order
    DB-->>API: order_id
    API->>API: Validate inventory
    alt In Stock
        API-->>UI: 201 Created
        UI-->>User: Order Confirmation
    else Out of Stock
        API-->>UI: 409 Conflict
        UI-->>User: "Item unavailable"
    end
    deactivate API

    Note over API,DB: Async inventory sync runs nightly
```
````

### Arrow Types

| Syntax | Meaning |
|--------|---------|
| `->>` | Solid arrow (synchronous) |
| `-->>` | Dashed arrow (response / async) |
| `-x` | Solid with cross (lost message) |
| `--x` | Dashed with cross |
| `-)` | Solid open arrow (async fire-and-forget) |
| `--)` | Dashed open arrow |

### Features

- `activate` / `deactivate` for activation bars
- `alt` / `else` / `end` for conditional logic
- `loop` / `end` for repetition
- `par` / `and` / `end` for parallel processing
- `critical` / `option` / `end` for critical regions
- `Note over A,B: text` for annotations
- `rect rgb(...)` for background highlighting

## Class Diagram

Models object-oriented structure with classes, interfaces, relationships, and visibility.

````markdown
```mermaid
classDiagram
    class Animal {
        <<abstract>>
        +String name
        +int age
        +makeSound()* void
        +move() void
    }

    class Dog {
        +String breed
        +makeSound() void
        +fetch() void
    }

    class Cat {
        +bool isIndoor
        +makeSound() void
        +purr() void
    }

    class IFeedable {
        <<interface>>
        +feed(Food food) void
    }

    Animal <|-- Dog : extends
    Animal <|-- Cat : extends
    IFeedable <|.. Dog : implements
    IFeedable <|.. Cat : implements
    Dog "1" --> "*" Toy : plays with
```
````

### Visibility Modifiers

| Symbol | Meaning |
|--------|---------|
| `+` | Public |
| `-` | Private |
| `#` | Protected |
| `~` | Package/Internal |

### Relationship Types

| Syntax | Meaning |
|--------|---------|
| `<\|--` | Inheritance |
| `<\|..` | Implementation (interface) |
| `*--` | Composition |
| `o--` | Aggregation |
| `-->` | Association |
| `..>` | Dependency |
| `--` | Link (solid) |
| `..` | Link (dashed) |

## State Diagram

Models state machine transitions.

````markdown
```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Processing : submit
    Processing --> Validating : validate

    state Validating {
        [*] --> CheckFormat
        CheckFormat --> CheckRules
        CheckRules --> [*]
    }

    Validating --> Approved : pass
    Validating --> Rejected : fail
    Approved --> [*]
    Rejected --> Idle : resubmit

    note right of Processing
        Processing may take
        up to 30 seconds.
    end note
```
````

## Entity Relationship Diagram

Models data relationships with cardinality.

````markdown
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "is ordered in"
    CUSTOMER {
        int id PK
        string name
        string email UK
    }
    ORDER {
        int id PK
        int customer_id FK
        date created_at
        string status
    }
    ORDER_ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
    }
    PRODUCT {
        int id PK
        string name
        decimal price
    }
```
````

### Cardinality Notation

| Syntax | Meaning |
|--------|---------|
| `\|\|` | Exactly one |
| `o\|` | Zero or one |
| `}o` | Zero or many |
| `}\|` | One or many |

## Gantt Chart

````markdown
```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Planning
    Requirements      :done,    req, 2025-01-06, 5d
    Architecture      :done,    arch, after req, 3d

    section Development
    Backend API       :active,  api, after arch, 10d
    Frontend UI       :         ui, after arch, 12d
    Integration       :         integ, after api, 5d

    section Testing
    QA Testing        :         qa, after integ, 5d
    UAT               :         uat, after qa, 3d

    section Release
    Deployment        :milestone, deploy, after uat, 0d
```
````

## Pie Chart

````markdown
```mermaid
pie title Language Distribution
    "TypeScript" : 45
    "Python" : 25
    "Go" : 15
    "Rust" : 10
    "Other" : 5
```
````

## Mindmap

````markdown
```mermaid
mindmap
    root((System Design))
        Frontend
            React
            Next.js
            Tailwind CSS
        Backend
            Node.js
            Express
            GraphQL
        Data
            PostgreSQL
            Redis
            S3
        Infrastructure
            AWS
            Terraform
            Docker
```
````

## Timeline

````markdown
```mermaid
timeline
    title Product Milestones
    2024-Q1 : MVP Launch
             : Core API complete
    2024-Q2 : Mobile App Beta
             : Payment integration
    2024-Q3 : General Availability
             : Enterprise features
    2024-Q4 : International Expansion
             : Multi-language support
```
````

## Quadrant Chart

````markdown
```mermaid
quadrantChart
    title Technology Adoption Matrix
    x-axis Low Maturity --> High Maturity
    y-axis Low Value --> High Value
    quadrant-1 Adopt
    quadrant-2 Evaluate
    quadrant-3 Avoid
    quadrant-4 Maintain
    React: [0.8, 0.9]
    Svelte: [0.4, 0.7]
    jQuery: [0.9, 0.2]
    HTMX: [0.3, 0.5]
    Vue: [0.7, 0.75]
```
````

## Git Graph

````markdown
```mermaid
gitGraph
    commit id: "init"
    branch feature/auth
    checkout feature/auth
    commit id: "add login"
    commit id: "add signup"
    checkout main
    merge feature/auth id: "merge auth"
    branch feature/dashboard
    checkout feature/dashboard
    commit id: "add dashboard"
    checkout main
    commit id: "hotfix"
    merge feature/dashboard id: "merge dashboard"
    commit id: "release v1.0" tag: "v1.0"
```
````

## C4 Diagrams in Mermaid

````markdown
```mermaid
C4Context
    title System Context - E-Commerce Platform

    Person(customer, "Customer", "Shops online.")
    System(ecommerce, "E-Commerce Platform", "Handles catalog, orders, payments.")
    System_Ext(payment, "Payment Provider", "Processes payments.")
    System_Ext(shipping, "Shipping Service", "Handles delivery.")

    Rel(customer, ecommerce, "Browses and orders")
    Rel(ecommerce, payment, "Charges via", "HTTPS")
    Rel(ecommerce, shipping, "Ships via", "HTTPS")
```
````

## Directives and Themes

### Directives

Directives configure diagram behavior inline. Place them at the top of the diagram block.

````markdown
```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#BB2528'}}}%%
flowchart LR
    A --> B --> C
```
````

### Built-in Themes

| Theme | Description |
|-------|-------------|
| `default` | Standard light theme |
| `dark` | Dark background |
| `forest` | Green-toned |
| `neutral` | Grayscale |
| `base` | Minimal starting point for customization |

### Custom Theme Variables

```
%%{init: {'theme': 'base', 'themeVariables': {
    'primaryColor': '#4C566A',
    'primaryTextColor': '#ECEFF4',
    'primaryBorderColor': '#D8DEE9',
    'lineColor': '#88C0D0',
    'secondaryColor': '#5E81AC',
    'tertiaryColor': '#2E3440'
}}}%%
```

## GitHub / GitLab Rendering

Mermaid diagrams render natively in GitHub and GitLab Markdown. Simply use a fenced code block with the `mermaid` language identifier.

````markdown
```mermaid
flowchart LR
    A[Push Code] --> B[CI Pipeline]
    B --> C{Tests Pass?}
    C -->|Yes| D[Deploy]
    C -->|No| E[Fix & Retry]
```
````

This works in:
- README.md and any Markdown file in the repository
- Pull request descriptions and comments
- Issue descriptions and comments
- Wiki pages
- GitHub Discussions

## Configuration via Front Matter

For Markdown files, you can configure Mermaid using YAML front matter:

```yaml
---
config:
  theme: dark
  flowchart:
    curve: basis
---
```

## Best Practices

- **Use Mermaid for documentation-embedded diagrams.** Its native rendering on GitHub and GitLab makes it ideal for READMEs, PRs, ADRs, and wiki pages.
- **Keep diagrams small and focused.** If a diagram has more than 15-20 nodes, split it into multiple diagrams.
- **Choose the right diagram type.** Use flowcharts for processes, sequence diagrams for interactions, class diagrams for structure, ER diagrams for data models.
- **Use subgraphs in flowcharts** to visually group related nodes (e.g., "Frontend", "Backend", "Database Layer").
- **Add labels to all links.** Unlabeled arrows create ambiguity. Always describe what flows along a connection.
- **Use `LR` (left-to-right) for process flows** and `TD` (top-down) for hierarchies.
- **Use aliases for readability.** In sequence diagrams, `participant API as API Server` makes the diagram source easier to read while showing a clean label.
- **Leverage alt/loop/par blocks** in sequence diagrams to show conditional logic, loops, and parallel processing.
- **Test locally before committing.** Use the Mermaid Live Editor (https://mermaid.live) to preview and debug diagrams.
- **Pin the Mermaid version** in documentation sites (Docusaurus, MkDocs) to avoid rendering changes from upstream updates.
- **Use themes consistently** across a project. Set a theme directive at the top of each diagram or configure it globally in your documentation framework.
- **Escape special characters.** Mermaid uses characters like `{}`, `()`, `[]`, `<>` for syntax. Wrap labels containing these in quotes.
