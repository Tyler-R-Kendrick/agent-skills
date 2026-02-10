---
name: archimate
description: |
    Use when modeling enterprise architecture with ArchiMate, the Open Group standard visual notation (v3.2). Covers Business, Application, and Technology layers, element types, relationship types, viewpoints, and modeling best practices.
    USE FOR: enterprise architecture modeling, layered architecture visualization, Business-Application-Technology mapping, ArchiMate element and relationship notation, architecture viewpoint selection, motivation modeling, cross-layer dependency analysis
    DO NOT USE FOR: architecture development process (use togaf), system decomposition (use c4-diagrams), general-purpose diagrams (use mermaidjs or d2)
license: MIT
metadata:
  displayName: "ArchiMate"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# ArchiMate - Enterprise Architecture Modeling Language

## Overview
ArchiMate is an open and independent enterprise architecture modeling language maintained by The Open Group. It provides a uniform representation for describing, analyzing, and communicating enterprise architectures. ArchiMate is designed to be used alongside TOGAF — where TOGAF defines the process (ADM), ArchiMate provides the visual notation.

ArchiMate 3.2 organizes elements across **layers** (Business, Application, Technology) and **aspects** (Active Structure, Behavior, Passive Structure), with a Motivation extension and Strategy layer.

## Layer and Aspect Framework

ArchiMate's core framework is a grid of layers and aspects:

```
              Active Structure    Behavior           Passive Structure
             (Who/What)          (How)               (On What)
           ┌──────────────────┬──────────────────┬──────────────────┐
Business   │ Business Actor   │ Business Process  │ Business Object  │
           │ Business Role    │ Business Function │ Contract         │
           │ Business         │ Business Service  │ Representation   │
           │   Collaboration  │ Business Event    │ Product          │
           │ Business         │ Business          │                  │
           │   Interface      │   Interaction     │                  │
           ├──────────────────┼──────────────────┼──────────────────┤
Application│ Application      │ Application       │ Data Object      │
           │   Component      │   Function        │                  │
           │ Application      │ Application       │                  │
           │   Collaboration  │   Service         │                  │
           │ Application      │ Application       │                  │
           │   Interface      │   Interaction     │                  │
           │                  │ Application Event │                  │
           ├──────────────────┼──────────────────┼──────────────────┤
Technology │ Node             │ Technology        │ Artifact         │
           │ Device           │   Function        │                  │
           │ System Software  │ Technology        │                  │
           │ Technology       │   Service         │                  │
           │   Collaboration  │ Technology        │                  │
           │ Technology       │   Process         │                  │
           │   Interface      │ Technology Event  │                  │
           │ Path             │ Technology        │                  │
           │ Communication    │   Interaction     │                  │
           │   Network        │                   │                  │
           └──────────────────┴──────────────────┴──────────────────┘
```

## Business Layer Elements

The Business Layer describes the products and services offered externally and the processes, roles, and functions that realize them internally.

### Active Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Business Actor** | Yellow rectangle with person icon | An organizational entity capable of performing behavior (e.g., a person, department, company) |
| **Business Role** | Yellow rectangle with role icon | A named responsibility for performing specific behavior |
| **Business Collaboration** | Yellow rectangle with double-head icon | An aggregate of two or more roles working together |
| **Business Interface** | Yellow rectangle with socket icon | A point of access where a business service is made available |

### Behavior Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Business Process** | Yellow rounded rectangle with arrow | A sequence of business behaviors that achieves a specific outcome |
| **Business Function** | Yellow rounded rectangle | A collection of behavior based on a chosen set of criteria (typically required business resources or skills) |
| **Business Service** | Yellow rounded rectangle with horizontal line | An externally visible unit of functionality |
| **Business Event** | Yellow rounded rectangle with lightning bolt | Something that happens and may trigger or be triggered by behavior |
| **Business Interaction** | Yellow rounded rectangle with double arrow | A unit of behavior performed by a collaboration |

### Passive Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Business Object** | Yellow rectangle with folded corner | A concept relevant from a business perspective |
| **Contract** | Yellow rectangle with signature icon | A formal or informal agreement |
| **Representation** | Yellow document shape | A perceptible form of the information carried by a business object |
| **Product** | Yellow rectangle with box icon | A coherent collection of services and contract, offered as a whole to customers |

## Application Layer Elements

The Application Layer describes application components, their services, and the data they manage.

### Active Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Application Component** | Blue rectangle with component icon | A modular, deployable, and replaceable part of a software system |
| **Application Collaboration** | Blue rectangle with double-head icon | An aggregate of application components working together |
| **Application Interface** | Blue rectangle with socket icon | A point of access where an application service is made available |

### Behavior Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Application Function** | Blue rounded rectangle | Automated behavior performed by an application component |
| **Application Service** | Blue rounded rectangle with horizontal line | An externally visible unit of application functionality |
| **Application Interaction** | Blue rounded rectangle with double arrow | A unit of behavior performed by an application collaboration |
| **Application Process** | Blue rounded rectangle with arrow | A sequence of application behaviors |
| **Application Event** | Blue rounded rectangle with lightning bolt | An application-level event |

### Passive Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Data Object** | Blue rectangle with folded corner | Data structured for automated processing |

## Technology Layer Elements

The Technology Layer describes the infrastructure (hardware, networks, system software) that supports the Application Layer.

### Active Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Node** | Green 3D box | A computational or physical resource that hosts artifacts |
| **Device** | Green 3D box with device icon | A physical hardware resource |
| **System Software** | Green 3D box with software icon | A software environment for specific types of components and objects (e.g., OS, JVM, DBMS) |
| **Technology Collaboration** | Green rectangle with double-head icon | An aggregate of nodes working together |
| **Technology Interface** | Green rectangle with socket icon | A point of access to technology services |
| **Path** | Green line | A link between two or more nodes through which they exchange data |
| **Communication Network** | Green line with network icon | A set of structures connecting nodes for transmission, routing, and reception |

### Behavior Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Technology Function** | Green rounded rectangle | A collection of technology behavior |
| **Technology Service** | Green rounded rectangle with horizontal line | An externally visible unit of technology functionality |
| **Technology Process** | Green rounded rectangle with arrow | A sequence of technology behaviors |
| **Technology Interaction** | Green rounded rectangle with double arrow | Technology behavior performed by a collaboration |
| **Technology Event** | Green rounded rectangle with lightning bolt | A technology-level event |

### Passive Structure Elements
| Element | Notation | Description |
|---------|----------|-------------|
| **Artifact** | Green rectangle with folded corner and binary icon | A piece of data used or produced by technology, typically a file or deployable unit |

## Motivation Elements

Motivation elements model the reasons behind architecture decisions, capturing stakeholder concerns, goals, and requirements.

| Element | Description |
|---------|-------------|
| **Stakeholder** | An individual, team, or organization with interests in the architecture |
| **Driver** | An external or internal condition that motivates an organization to define its goals |
| **Assessment** | The result of analysis of a driver |
| **Goal** | A desired end state |
| **Outcome** | An end result that is achieved or intended |
| **Principle** | A qualitative statement of intent that should be met by the architecture |
| **Requirement** | A statement of need that must be met by the architecture |
| **Constraint** | A restriction on the design or implementation |
| **Meaning** | The knowledge or expertise present in a business object or representation |
| **Value** | The relative worth, utility, or importance of a concept |

## Strategy Elements

| Element | Description |
|---------|-------------|
| **Resource** | An asset owned or controlled by an individual or organization |
| **Capability** | An ability that an active structure element possesses |
| **Course of Action** | An approach or plan for achieving a goal |
| **Value Stream** | A sequence of activities that creates an overall result for a customer, stakeholder, or end user |

## Relationships

ArchiMate defines a precise set of relationships between elements. Relationships are categorized into structural, dependency, dynamic, and other.

### Structural Relationships
| Relationship | Notation | Description | Example |
|-------------|----------|-------------|---------|
| **Composition** | Filled diamond ◆───► | Element is composed of one or more other elements | Application Component ◆───► Data Object |
| **Aggregation** | Open diamond ◇───► | Element groups other elements | Business Role ◇───► Business Actor |
| **Assignment** | Filled circle ●───► | Allocation of responsibility, execution, or storage | Business Role ●───► Business Process |
| **Realization** | Dashed line with open triangle ╌╌╌▷ | Element plays a critical role in the creation of a more abstract element | Application Service ╌╌╌▷ Business Service |

### Dependency Relationships
| Relationship | Notation | Description | Example |
|-------------|----------|-------------|---------|
| **Serving** | Open arrowhead ───► | Element provides functionality to another | Application Service ───► Business Process |
| **Access** | Dashed line with arrowhead ╌╌╌► | Process reads/writes data | Business Process ╌╌╌► Business Object |
| **Influence** | Dashed line with open arrowhead ╌╌╌► (with + or -) | Element affects implementation or achievement of a motivation element | Driver ╌╌╌►(+) Goal |

### Dynamic Relationships
| Relationship | Notation | Description | Example |
|-------------|----------|-------------|---------|
| **Triggering** | Filled arrowhead ──▶ | Element causes another to begin | Business Event ──▶ Business Process |
| **Flow** | Filled arrowhead with label ──▶ (label) | Transfer of content between elements | Business Process ──▶"order data"──▶ Business Process |

### Other Relationships
| Relationship | Notation | Description | Example |
|-------------|----------|-------------|---------|
| **Specialization** | Open triangle ───▷ | Element is a particular kind of another element | Online Order ───▷ Order |
| **Association** | Plain line ─── | Unspecified relationship | Element ─── Element |
| **Junction** | Filled circle (AND) or open circle (OR) | Combine relationships | Process1 ──▶ ● ──▶ Process2, Process3 |

## Viewpoints

ArchiMate viewpoints define a selection of elements, relationships, and their presentation. Use the right viewpoint for the right audience.

### Organization Viewpoint
**Purpose:** Show the structure of the organization in terms of business actors, roles, and their relationships.

**Typical Elements:** Business Actor, Business Role, Business Collaboration, Business Interface, Location

```
┌──────────────────────────────────────────┐
│ Organization Viewpoint                    │
│                                           │
│  ┌──────────┐  assigned  ┌────────────┐  │
│  │ Business  │──────────►│ Business   │  │
│  │ Actor:    │           │ Role:      │  │
│  │ Customer  │           │ Buyer      │  │
│  │ Service   │           │            │  │
│  │ Dept      │           └────────────┘  │
│  └──────────┘                            │
│       │ composition                      │
│       ▼                                  │
│  ┌──────────┐                            │
│  │ Business  │                           │
│  │ Actor:    │                           │
│  │ Support   │                           │
│  │ Agent     │                           │
│  └──────────┘                            │
└──────────────────────────────────────────┘
```

### Application Structure Viewpoint
**Purpose:** Show the structure of applications, their components, data objects, and interfaces.

**Typical Elements:** Application Component, Application Interface, Data Object, Application Collaboration

### Technology Viewpoint
**Purpose:** Show the technology infrastructure: nodes, devices, networks, and system software.

**Typical Elements:** Node, Device, System Software, Communication Network, Path, Technology Interface, Artifact

### Layered Viewpoint
**Purpose:** Provide a cross-layer overview showing how business services are supported by application services, which in turn are supported by technology services.

```
┌──────────────────────────────────────────────────────────┐
│ Business Layer                                            │
│  ┌────────────────┐       ┌─────────────────────────┐    │
│  │ Business Role:  │──────►│ Business Process:       │    │
│  │ Account Manager │ assgn │ Handle Customer Order   │    │
│  └────────────────┘       └───────────┬─────────────┘    │
│                                        │ serving          │
├────────────────────────────────────────┼─────────────────┤
│ Application Layer                      ▼                  │
│                           ┌─────────────────────────┐    │
│                           │ Application Service:     │    │
│                           │ Order Processing Service │    │
│                           └───────────┬─────────────┘    │
│                                        │ realization      │
│                           ┌───────────▼─────────────┐    │
│                           │ Application Component:   │    │
│                           │ Order Management System  │    │
│                           └───────────┬─────────────┘    │
│                                        │ serving          │
├────────────────────────────────────────┼─────────────────┤
│ Technology Layer                       ▼                  │
│                           ┌─────────────────────────┐    │
│                           │ Technology Service:      │    │
│                           │ Application Hosting      │    │
│                           └───────────┬─────────────┘    │
│                                        │ realization      │
│                           ┌───────────▼─────────────┐    │
│                           │ Node:                    │    │
│                           │ Application Server       │    │
│                           └─────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Motivation Viewpoint
**Purpose:** Show stakeholders, their drivers, assessments, goals, principles, requirements, and constraints.

**Typical Elements:** Stakeholder, Driver, Assessment, Goal, Principle, Requirement, Constraint

```
┌──────────────────────────────────────────────────────────┐
│ Motivation Viewpoint                                      │
│                                                           │
│  ┌─────────────┐  has  ┌───────────┐  leads  ┌────────┐ │
│  │ Stakeholder: │──────►│ Driver:   │────────►│ Goal:  │ │
│  │ CTO          │       │ Need for  │         │ Reduce │ │
│  └─────────────┘       │ agility   │         │ TTM by │ │
│                         └───────────┘         │ 30%    │ │
│                                                └───┬────┘ │
│                                                    │      │
│                               realizes             ▼      │
│                         ┌────────────────────────────────┐│
│                         │ Requirement:                    ││
│                         │ Implement microservice arch     ││
│                         └────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

## Example: E-Commerce System in ArchiMate Notation

Below is a simplified layered ArchiMate model for an e-commerce system:

```
BUSINESS LAYER
  [Business Actor: Customer]
      │ assigned
      ▼
  [Business Role: Online Buyer]
      │ assigned
      ▼
  [Business Process: Purchase Products]
      │ realizes
      ▼
  [Business Service: Product Ordering Service]

─────────────────────────────────────────────

APPLICATION LAYER
  [Application Service: Order Management Service]
      │ realization of Business Service above
      │ realized by
      ▼
  [Application Component: E-Commerce Platform]
      │ composition
      ├──► [Application Component: Shopping Cart Module]
      ├──► [Application Component: Payment Gateway Adapter]
      └──► [Application Component: Inventory Checker]
      │
      │ accesses
      ▼
  [Data Object: Order]
  [Data Object: Product Catalog]
  [Data Object: Customer Profile]

─────────────────────────────────────────────

TECHNOLOGY LAYER
  [Node: AWS Cloud]
      │ composition
      ├──► [Device: EC2 Instance]
      │        │ assignment
      │        ▼
      │    [System Software: Docker Runtime]
      │        │ assignment
      │        ▼
      │    [Artifact: ecommerce-app.jar]
      │
      ├──► [Device: RDS Instance]
      │        │ assignment
      │        ▼
      │    [System Software: PostgreSQL 15]
      │
      └──► [Communication Network: VPC]
               │ realizes
               ▼
           [Technology Service: Secure Hosting]
```

## Mapping ArchiMate to TOGAF ADM Phases

| TOGAF ADM Phase | ArchiMate Layer / Viewpoint |
|----------------|----------------------------|
| Phase A: Architecture Vision | Motivation Viewpoint, high-level Layered Viewpoint |
| Phase B: Business Architecture | Business Layer elements, Organization Viewpoint |
| Phase C: Information Systems | Application Layer, Data Objects, Application Structure Viewpoint |
| Phase D: Technology Architecture | Technology Layer, Technology Viewpoint |
| Phase E-F: Opportunities & Migration | Layered Viewpoint with gap annotations |
| Phase G-H: Governance & Change | Implementation and Migration Viewpoint |

## Best Practices
- **Use the correct layer.** Do not model application concerns in the Business Layer or vice versa. Cross-layer connections should use serving or realization relationships.
- **Keep viewpoints focused.** Each diagram should use a single viewpoint. A Layered Viewpoint can show cross-layer dependencies, but avoid cramming all elements into one diagram.
- **Use relationships precisely.** ArchiMate relationships have specific semantics. Do not use "serving" when you mean "realization" — they convey different architectural meaning.
- **Color-code by layer.** Follow the standard color convention: yellow for Business, blue for Application, green for Technology. This provides instant visual orientation.
- **Start with the Layered Viewpoint.** When introducing an architecture to stakeholders, the Layered Viewpoint provides the best overview of how business is supported by applications and technology.
- **Model motivation first.** Before modeling structure, capture stakeholder goals, drivers, and requirements. This ensures architecture decisions are traceable to business rationale.
- **Pair with TOGAF.** ArchiMate provides the notation; TOGAF provides the process. Use ArchiMate diagrams as deliverables within TOGAF ADM phases.
- **Limit elements per diagram to 15-20.** Overcrowded diagrams lose communicative value. Split into multiple viewpoints if needed.
- **Name elements with precision.** Use clear, specific names (e.g., "Order Management Service" not "Service 1"). Element names should be self-explanatory.
- **Version your models.** Like code, ArchiMate models should be version-controlled. Use tool exports (e.g., Archi Open Exchange format) stored alongside source code.
