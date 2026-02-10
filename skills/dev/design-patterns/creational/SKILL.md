---
name: creational
description: |
    Creational design patterns from the Gang of Four — Factory Method, Abstract Factory, Builder, Prototype, and Singleton. Patterns that abstract the instantiation process to make systems independent of how objects are created, composed, and represented.
    USE FOR: object creation, factory patterns, builder pattern, prototype cloning, singleton instances, decoupling instantiation from usage
    DO NOT USE FOR: composing/adapting objects (use structural), inter-object communication (use behavioral)
license: MIT
metadata:
  displayName: "Creational Patterns"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Creational Design Patterns

## Overview
Creational patterns abstract the instantiation process. They help make a system independent of how its objects are created, composed, and represented. As systems evolve to depend more on object composition than class inheritance, the emphasis shifts from hard-coding fixed sets of behaviors toward defining a smaller set of fundamental behaviors that can be composed into more complex ones — and that requires flexible object creation.

---

## 1. Factory Method

### Intent
Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

### Structure

```
┌──────────────────┐         ┌──────────────────┐
│    Creator        │         │    Product        │
│  (abstract)       │         │  (interface)      │
├──────────────────┤         └──────┬───────────┘
│ + factoryMethod() │               │
│ + someOperation() │               │
└──────┬───────────┘               │
       │                            │
       │ extends                    │ implements
       ▼                            ▼
┌──────────────────┐         ┌──────────────────┐
│ ConcreteCreator   │────────▶│ ConcreteProduct   │
├──────────────────┤ creates └──────────────────┘
│ + factoryMethod() │
└──────────────────┘
```

### Participants
- **Product** — declares the interface for created objects
- **ConcreteProduct** — implements the Product interface
- **Creator** — declares the factory method returning a Product; may define a default implementation
- **ConcreteCreator** — overrides the factory method to return a ConcreteProduct

### When to Use
- A class cannot anticipate the class of objects it must create
- A class wants its subclasses to specify the objects it creates
- You want to localize the knowledge of which helper class is the delegate

### TypeScript Example

```typescript
// Product interface
interface Transport {
  deliver(cargo: string): string;
}

// Concrete products
class Truck implements Transport {
  deliver(cargo: string): string {
    return `Delivering "${cargo}" by road in a truck`;
  }
}

class Ship implements Transport {
  deliver(cargo: string): string {
    return `Delivering "${cargo}" by sea in a ship`;
  }
}

// Creator
abstract class Logistics {
  // Factory method
  abstract createTransport(): Transport;

  // Business logic that uses the factory method
  planDelivery(cargo: string): string {
    const transport = this.createTransport();
    return transport.deliver(cargo);
  }
}

// Concrete creators
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

// Usage
const logistics: Logistics = new RoadLogistics();
console.log(logistics.planDelivery("electronics")); // Delivering "electronics" by road in a truck
```

---

## 2. Abstract Factory

### Intent
Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

### Structure

```
┌─────────────────────┐
│  AbstractFactory     │
│  (interface)         │
├─────────────────────┤
│ + createProductA()   │
│ + createProductB()   │
└──────┬──────────────┘
       │ implements
       ▼
┌─────────────────────┐     ┌──────────────┐  ┌──────────────┐
│ ConcreteFactory1     │────▶│ ProductA1    │  │ ProductB1    │
├─────────────────────┤     └──────────────┘  └──────────────┘
│ + createProductA()   │
│ + createProductB()   │     ┌──────────────┐  ┌──────────────┐
├─────────────────────┤     │ ProductA2    │  │ ProductB2    │
│ ConcreteFactory2     │────▶└──────────────┘  └──────────────┘
├─────────────────────┤
│ + createProductA()   │
│ + createProductB()   │
└─────────────────────┘
```

### Participants
- **AbstractFactory** — declares creation methods for each abstract product
- **ConcreteFactory** — implements creation methods for a specific product family
- **AbstractProduct** — declares an interface for a type of product
- **ConcreteProduct** — implements the abstract product for a specific family
- **Client** — uses only the AbstractFactory and AbstractProduct interfaces

### When to Use
- A system should be independent of how its products are created
- A system should be configured with one of multiple families of products
- A family of related objects is designed to be used together and you need to enforce that constraint

### TypeScript Example

```typescript
// Abstract products
interface Button {
  render(): string;
}

interface Checkbox {
  toggle(): string;
}

// Abstract factory
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete products — Material family
class MaterialButton implements Button {
  render(): string { return "<MaterialButton />"; }
}

class MaterialCheckbox implements Checkbox {
  toggle(): string { return "Material checkbox toggled"; }
}

// Concrete products — Fluent family
class FluentButton implements Button {
  render(): string { return "<FluentButton />"; }
}

class FluentCheckbox implements Checkbox {
  toggle(): string { return "Fluent checkbox toggled"; }
}

// Concrete factories
class MaterialUIFactory implements UIFactory {
  createButton(): Button { return new MaterialButton(); }
  createCheckbox(): Checkbox { return new MaterialCheckbox(); }
}

class FluentUIFactory implements UIFactory {
  createButton(): Button { return new FluentButton(); }
  createCheckbox(): Checkbox { return new FluentCheckbox(); }
}

// Client code — works with any factory
function buildUI(factory: UIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  return { buttonHTML: button.render(), checkboxAction: checkbox.toggle() };
}

// Usage
const ui = buildUI(new MaterialUIFactory());
console.log(ui.buttonHTML); // <MaterialButton />
```

---

## 3. Builder

### Intent
Separate the construction of a complex object from its representation so that the same construction process can create different representations.

### Structure

```
┌──────────────┐       ┌───────────────────┐
│   Director    │──────▶│    Builder         │
├──────────────┤       │    (interface)     │
│ + construct() │       ├───────────────────┤
└──────────────┘       │ + buildPartA()     │
                        │ + buildPartB()     │
                        │ + getResult()      │
                        └──────┬────────────┘
                               │ implements
                               ▼
                        ┌───────────────────┐       ┌─────────┐
                        │ ConcreteBuilder    │──────▶│ Product │
                        ├───────────────────┤builds └─────────┘
                        │ + buildPartA()     │
                        │ + buildPartB()     │
                        │ + getResult()      │
                        └───────────────────┘
```

### Participants
- **Builder** — specifies an abstract interface for creating parts of a Product
- **ConcreteBuilder** — constructs and assembles parts; provides a method to retrieve the result
- **Director** — constructs an object using the Builder interface
- **Product** — the complex object under construction

### When to Use
- The algorithm for creating a complex object should be independent of the parts and their assembly
- The construction process must allow different representations of the constructed object
- You want to avoid "telescoping constructor" anti-pattern (constructors with many parameters)

### TypeScript Example

```typescript
// Product
class HttpRequest {
  method: string = "GET";
  url: string = "";
  headers: Record<string, string> = {};
  body?: string;
  timeout: number = 30000;

  toString(): string {
    return `${this.method} ${this.url} | headers=${JSON.stringify(this.headers)} | body=${this.body ?? "none"}`;
  }
}

// Builder
class HttpRequestBuilder {
  private request = new HttpRequest();

  setMethod(method: string): this {
    this.request.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.request.url = url;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.request.headers[key] = value;
    return this;
  }

  setBody(body: string): this {
    this.request.body = body;
    return this;
  }

  setTimeout(ms: number): this {
    this.request.timeout = ms;
    return this;
  }

  build(): HttpRequest {
    const result = this.request;
    this.request = new HttpRequest(); // reset for reuse
    return result;
  }
}

// Director (optional — encapsulates common configurations)
class HttpRequestDirector {
  constructor(private builder: HttpRequestBuilder) {}

  buildJsonPost(url: string, body: object): HttpRequest {
    return this.builder
      .setMethod("POST")
      .setUrl(url)
      .addHeader("Content-Type", "application/json")
      .addHeader("Accept", "application/json")
      .setBody(JSON.stringify(body))
      .build();
  }
}

// Usage
const builder = new HttpRequestBuilder();
const director = new HttpRequestDirector(builder);

const request = director.buildJsonPost("https://api.example.com/users", { name: "Alice" });
console.log(request.toString());
// POST https://api.example.com/users | headers={"Content-Type":"application/json","Accept":"application/json"} | body={"name":"Alice"}
```

---

## 4. Prototype

### Intent
Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.

### Structure

```
┌───────────────────┐
│    Prototype       │
│    (interface)     │
├───────────────────┤
│ + clone(): Proto   │
└──────┬────────────┘
       │ implements
       ▼
┌───────────────────┐       ┌───────────────────┐
│ ConcretePrototype1 │       │ ConcretePrototype2 │
├───────────────────┤       ├───────────────────┤
│ + clone(): Proto   │       │ + clone(): Proto   │
└───────────────────┘       └───────────────────┘
       │                            │
       │ clone()                    │ clone()
       ▼                            ▼
   [Copy of 1]                 [Copy of 2]
```

### Participants
- **Prototype** — declares an interface for cloning itself
- **ConcretePrototype** — implements the cloning operation
- **Client** — creates new objects by asking a prototype to clone itself

### When to Use
- Classes to instantiate are specified at runtime (e.g., dynamic loading)
- You want to avoid building a hierarchy of factory classes that parallels the product hierarchy
- Instances of a class can have one of only a few different combinations of state — cloning preset prototypes is more convenient than instantiating manually

### TypeScript Example

```typescript
// Prototype interface
interface Cloneable<T> {
  clone(): T;
}

// Concrete prototype
class GameUnit implements Cloneable<GameUnit> {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public position: { x: number; y: number }
  ) {}

  clone(): GameUnit {
    // Deep clone — new position object so clones are independent
    return new GameUnit(
      this.name,
      this.health,
      this.attack,
      { ...this.position }
    );
  }

  toString(): string {
    return `${this.name}(hp=${this.health}, atk=${this.attack}) @ (${this.position.x},${this.position.y})`;
  }
}

// Prototype registry
class UnitRegistry {
  private prototypes = new Map<string, GameUnit>();

  register(key: string, prototype: GameUnit): void {
    this.prototypes.set(key, prototype);
  }

  create(key: string): GameUnit {
    const proto = this.prototypes.get(key);
    if (!proto) throw new Error(`Unknown unit type: ${key}`);
    return proto.clone();
  }
}

// Usage
const registry = new UnitRegistry();
registry.register("warrior", new GameUnit("Warrior", 100, 25, { x: 0, y: 0 }));
registry.register("archer", new GameUnit("Archer", 60, 40, { x: 0, y: 0 }));

const unit1 = registry.create("warrior");
unit1.position = { x: 5, y: 3 };

const unit2 = registry.create("warrior");
unit2.position = { x: 10, y: 7 };

console.log(unit1.toString()); // Warrior(hp=100, atk=25) @ (5,3)
console.log(unit2.toString()); // Warrior(hp=100, atk=25) @ (10,7)
```

---

## 5. Singleton

### Intent
Ensure a class has only one instance and provide a global point of access to it.

### Structure

```
┌─────────────────────────────┐
│         Singleton            │
├─────────────────────────────┤
│ - static instance: Singleton │
│ - data: ...                  │
├─────────────────────────────┤
│ - constructor()              │
│ + static getInstance()       │
│ + businessMethod()           │
└─────────────────────────────┘
```

### Participants
- **Singleton** — defines a static method that returns its sole instance; the constructor is private to prevent external instantiation

### When to Use
- There must be exactly one instance of a class, and it must be accessible from a well-known access point
- The sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code

### Why Singleton Is Often an Anti-Pattern
- **Global mutable state**: Singletons are effectively global variables, making behavior unpredictable and hard to trace
- **Hidden dependencies**: Classes that use a Singleton do not declare that dependency in their constructor
- **Testing difficulty**: Singletons carry state between tests, causing flaky test suites and order-dependent failures
- **Concurrency hazards**: Lazy initialization of singletons is a classic source of race conditions
- **Prefer dependency injection**: In modern systems, use a DI container to register a service with singleton lifetime. This gives you single-instance behavior without the drawbacks

### TypeScript Example

```typescript
// Classic Singleton (use sparingly)
class AppConfig {
  private static instance: AppConfig | null = null;

  private constructor(
    public readonly dbHost: string,
    public readonly dbPort: number,
    public readonly logLevel: string
  ) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      // In practice, load from env or config file
      AppConfig.instance = new AppConfig(
        process.env.DB_HOST ?? "localhost",
        Number(process.env.DB_PORT ?? 5432),
        process.env.LOG_LEVEL ?? "info"
      );
    }
    return AppConfig.instance;
  }

  // For testing — allows resetting the singleton
  static resetForTesting(): void {
    AppConfig.instance = null;
  }
}

// Usage
const config = AppConfig.getInstance();
console.log(config.dbHost); // localhost

// Preferred: Dependency Injection approach
// Register as singleton lifetime in your DI container:
//   container.registerSingleton<AppConfig>(AppConfig);
// Then inject via constructor — no static access, fully testable.
```

---

## Comparison Table

| Pattern | Scope | Key Benefit | Typical Use Case |
|---------|-------|-------------|-----------------|
| **Factory Method** | Class | Defers creation to subclasses | Frameworks that define interfaces but let apps decide implementations |
| **Abstract Factory** | Object | Creates families of related objects | Cross-platform UI toolkits, themed component libraries |
| **Builder** | Object | Step-by-step construction with fluent API | Complex objects with many optional parameters (HTTP requests, queries) |
| **Prototype** | Object | Cloning pre-configured instances | Game units, document templates, expensive-to-create objects |
| **Singleton** | Object | Guarantees single instance | Configuration, connection pools (prefer DI singleton lifetime) |

## Decision Guide

```
Do you need to create objects?
│
├─ One product, varies by subclass?
│  └─▶ Factory Method
│
├─ Families of related products?
│  └─▶ Abstract Factory
│
├─ Complex object with many parts/options?
│  └─▶ Builder
│
├─ Copy an existing configured object?
│  └─▶ Prototype
│
└─ Exactly one instance, globally accessible?
   └─▶ Singleton (but strongly consider DI singleton lifetime instead)
```
