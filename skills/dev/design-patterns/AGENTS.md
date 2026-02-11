# Design Patterns (Gang of Four)

## Overview
The 23 Gang of Four (GoF) design patterns, catalogued by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994), remain the foundational vocabulary for object-oriented design. Each pattern captures a recurring design problem, its context, and a proven solution structure.

## Core Principles

### Program to an Interface, Not an Implementation
Depend on abstractions (interfaces / abstract classes), not concrete classes. This decouples code from specific implementations, making it easier to swap, mock, and extend behavior.

```typescript
// Bad — coupled to concrete class
const logger = new FileLogger();

// Good — coupled to abstraction
const logger: Logger = createLogger(); // returns FileLogger, ConsoleLogger, etc.
```

### Favor Composition Over Inheritance
Build complex behavior by composing objects that delegate to each other rather than extending deep class hierarchies. Most GoF patterns are variations of this principle.

```typescript
// Inheritance — rigid, one axis of variation
class LoggingHttpClient extends HttpClient { ... }

// Composition — flexible, multiple axes of variation
class HttpClient {
  constructor(private logger: Logger, private cache: Cache) {}
}
```

### The Open/Closed Principle
Classes should be open for extension but closed for modification. Patterns like Strategy, Decorator, and Observer let you add new behavior without changing existing code.

## Pattern Categories

```
┌──────────────────────────────────────────────────────────────┐
│                     GoF Design Patterns                      │
├────────────────┬─────────────────────┬───────────────────────┤
│  Creational    │  Structural         │  Behavioral           │
│  (5 patterns)  │  (7 patterns)       │  (11 patterns)        │
│                │                     │                       │
│  Factory       │  Adapter            │  Chain of Resp.       │
│  Method        │  Bridge             │  Command              │
│  Abstract      │  Composite          │  Interpreter          │
│  Factory       │  Decorator          │  Iterator             │
│  Builder       │  Facade             │  Mediator             │
│  Prototype     │  Flyweight          │  Memento              │
│  Singleton     │  Proxy              │  Observer             │
│                │                     │  State                │
│                │                     │  Strategy             │
│                │                     │  Template Method      │
│                │                     │  Visitor              │
└────────────────┴─────────────────────┴───────────────────────┘
```

## Quick-Reference Table — All 23 Patterns

### Creational Patterns
| Pattern | One-Line Description |
|---------|---------------------|
| **Factory Method** | Defer instantiation to subclasses via a factory method |
| **Abstract Factory** | Create families of related objects without specifying concrete classes |
| **Builder** | Construct complex objects step by step with a fluent interface |
| **Prototype** | Create new objects by cloning an existing instance |
| **Singleton** | Ensure a class has exactly one instance with a global access point |

### Structural Patterns
| Pattern | One-Line Description |
|---------|---------------------|
| **Adapter** | Convert one interface into another that clients expect |
| **Bridge** | Separate an abstraction from its implementation so both can vary |
| **Composite** | Compose objects into tree structures; treat leaf and node uniformly |
| **Decorator** | Attach additional responsibilities to an object dynamically |
| **Facade** | Provide a simplified interface to a complex subsystem |
| **Flyweight** | Share fine-grained objects to support large quantities efficiently |
| **Proxy** | Provide a surrogate to control access, caching, or lazy loading |

### Behavioral Patterns
| Pattern | One-Line Description |
|---------|---------------------|
| **Chain of Responsibility** | Pass a request along a chain of handlers until one processes it |
| **Command** | Encapsulate a request as an object to support undo, redo, and queuing |
| **Interpreter** | Define a grammar and an interpreter to evaluate expressions |
| **Iterator** | Provide sequential access to elements without exposing internals |
| **Mediator** | Centralize complex communications between related objects |
| **Memento** | Capture and restore an object's internal state without violating encapsulation |
| **Observer** | Notify dependent objects automatically when state changes |
| **State** | Alter an object's behavior when its internal state changes |
| **Strategy** | Define a family of interchangeable algorithms behind a common interface |
| **Template Method** | Define a skeleton algorithm; let subclasses override specific steps |
| **Visitor** | Add new operations to a class hierarchy without modifying the classes |

## Pattern Selection Guide

| When You Need To... | Use This Pattern |
|---------------------|-----------------|
| Create objects without specifying exact classes | Factory Method or Abstract Factory |
| Build an object with many optional parts | Builder |
| Copy an existing configured object | Prototype |
| Guarantee exactly one instance | Singleton (use sparingly) |
| Make incompatible interfaces work together | Adapter |
| Vary abstraction and implementation independently | Bridge |
| Represent part-whole hierarchies uniformly | Composite |
| Add behavior without subclassing | Decorator |
| Simplify access to a complex subsystem | Facade |
| Reduce memory usage for many similar objects | Flyweight |
| Control or augment access to an object | Proxy |
| Decouple senders from receivers along a chain | Chain of Responsibility |
| Support undo/redo or queue operations | Command |
| Traverse a collection without exposing structure | Iterator |
| Reduce coupling between many communicating objects | Mediator |
| Snapshot and restore object state | Memento |
| React to state changes in another object | Observer |
| Change behavior based on internal state | State |
| Swap algorithms at runtime | Strategy |
| Reuse an algorithm skeleton with varying steps | Template Method |
| Add operations across a class hierarchy without changing it | Visitor |
| Evaluate structured expressions or grammars | Interpreter |

## Relationships Between Patterns

```
Factory Method ──evolves into──▶ Abstract Factory
Builder ──often uses──▶ Composite (to build trees)
Decorator ──similar structure──▶ Proxy (but different intent)
Strategy ──similar to──▶ State (but Strategy is stateless swap)
Command ──can use──▶ Memento (for undo)
Observer ──can be replaced by──▶ Mediator (when N:M gets complex)
Composite ──often paired with──▶ Iterator (to traverse)
Composite ──often paired with──▶ Visitor (to add operations)
Template Method ──class-based version of──▶ Strategy
```

## Anti-Pattern Warnings
- **Singleton abuse**: Often masks global mutable state. Prefer dependency injection. Use only when a single instance is a hard requirement (e.g., thread pool, hardware access).
- **Pattern overuse**: Not every class needs a pattern. Apply patterns when you encounter the specific problem they solve, not preemptively.
- **Wrong pattern choice**: Strategy and State look similar but solve different problems. Adapter and Facade both wrap objects but with different intent. Read the intent section of each pattern carefully.

## Sub-Skills
- `dev/design-patterns/creational` — Factory Method, Abstract Factory, Builder, Prototype, Singleton
- `dev/design-patterns/structural` — Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- `dev/design-patterns/behavioral` — Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor
