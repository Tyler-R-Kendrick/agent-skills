# SOLID Principles

## Overview
SOLID is a mnemonic for five object-oriented design principles introduced by Robert C. Martin. Together they guide developers toward code that is easier to understand, more flexible to change, and simpler to test.

| Letter | Principle | One-Line Summary |
|--------|-----------|------------------|
| **S** | Single Responsibility | A class should have only one reason to change. |
| **O** | Open/Closed | Open for extension, closed for modification. |
| **L** | Liskov Substitution | Subtypes must be substitutable for their base types. |
| **I** | Interface Segregation | No client should be forced to depend on methods it does not use. |
| **D** | Dependency Inversion | Depend on abstractions, not concretions. |

---

## S — Single Responsibility Principle (SRP)

> "A class should have one, and only one, reason to change." — Robert C. Martin

A "reason to change" maps to a **stakeholder** or **actor**. If two different actors can request changes to the same class, that class has more than one responsibility.

### Violation

```typescript
class UserService {
    createUser(name: string, email: string): User {
        // validate input
        if (!email.includes("@")) throw new Error("Invalid email");

        // persist to database
        const user = this.db.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );

        // send welcome email
        this.emailClient.send({
            to: email,
            subject: "Welcome!",
            body: `Hello ${name}, welcome aboard.`,
        });

        // write audit log
        this.logger.info(`User created: ${email}`);

        return user;
    }
}
```

This class has **four reasons to change**: validation rules, database schema, email template, and logging format.

### Corrected

```typescript
class UserValidator {
    validate(name: string, email: string): void {
        if (!email.includes("@")) throw new InvalidEmailError(email);
    }
}

class UserRepository {
    save(name: string, email: string): Promise<User> {
        return this.db.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );
    }
}

class WelcomeEmailSender {
    send(user: User): Promise<void> {
        return this.emailClient.send({
            to: user.email,
            subject: "Welcome!",
            body: `Hello ${user.name}, welcome aboard.`,
        });
    }
}

class CreateUserUseCase {
    constructor(
        private validator: UserValidator,
        private repo: UserRepository,
        private welcomeEmail: WelcomeEmailSender,
        private logger: Logger
    ) {}

    async execute(name: string, email: string): Promise<User> {
        this.validator.validate(name, email);
        const user = await this.repo.save(name, email);
        await this.welcomeEmail.send(user);
        this.logger.info(`User created: ${email}`);
        return user;
    }
}
```

Each class now has one reason to change, and `CreateUserUseCase` orchestrates them.

---

## O — Open/Closed Principle (OCP)

> "Software entities should be open for extension, but closed for modification." — Bertrand Meyer

You should be able to add new behavior **without modifying existing code**. This is typically achieved through abstraction and polymorphism.

### Violation

```typescript
class DiscountCalculator {
    calculate(order: Order): number {
        switch (order.customerType) {
            case "regular":
                return 0;
            case "premium":
                return order.total * 0.1;
            case "vip":
                return order.total * 0.2;
            default:
                return 0;
        }
    }
}
// Adding a new customer type requires modifying this class.
```

### Corrected

```typescript
interface DiscountStrategy {
    calculate(order: Order): number;
}

class RegularDiscount implements DiscountStrategy {
    calculate(order: Order): number { return 0; }
}

class PremiumDiscount implements DiscountStrategy {
    calculate(order: Order): number { return order.total * 0.1; }
}

class VipDiscount implements DiscountStrategy {
    calculate(order: Order): number { return order.total * 0.2; }
}

class DiscountCalculator {
    constructor(private strategy: DiscountStrategy) {}

    calculate(order: Order): number {
        return this.strategy.calculate(order);
    }
}

// Adding a new customer type = adding a new class. No existing code changes.
class EmployeeDiscount implements DiscountStrategy {
    calculate(order: Order): number { return order.total * 0.3; }
}
```

---

## L — Liskov Substitution Principle (LSP)

> "Objects of a superclass should be replaceable with objects of a subclass without breaking the program." — Barbara Liskov

If `S` is a subtype of `T`, then objects of type `T` may be replaced with objects of type `S` without altering the correctness of the program. Subtypes must honor the behavioral contract of the base type.

### Violation

```typescript
class Rectangle {
    constructor(protected width: number, protected height: number) {}

    setWidth(w: number): void { this.width = w; }
    setHeight(h: number): void { this.height = h; }
    area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
    setWidth(w: number): void {
        this.width = w;
        this.height = w; // violates Rectangle's contract
    }

    setHeight(h: number): void {
        this.width = h;
        this.height = h; // violates Rectangle's contract
    }
}

// Client code that breaks with Square:
function assertAreaCorrect(rect: Rectangle): void {
    rect.setWidth(5);
    rect.setHeight(4);
    console.assert(rect.area() === 20); // Fails for Square! area() returns 16
}
```

### Corrected

```typescript
interface Shape {
    area(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    area(): number { return this.width * this.height; }
}

class Square implements Shape {
    constructor(private side: number) {}
    area(): number { return this.side * this.side; }
}

// Both satisfy the Shape contract. No inheritance relationship forces
// Square to pretend it is a Rectangle.
function printArea(shape: Shape): void {
    console.log(`Area: ${shape.area()}`);
}
```

### LSP Rules of Thumb
- **Preconditions** cannot be strengthened in a subtype.
- **Postconditions** cannot be weakened in a subtype.
- **Invariants** of the base type must be preserved by the subtype.
- The **history constraint**: a subtype should not introduce state changes the base type would not allow.

---

## I — Interface Segregation Principle (ISP)

> "No client should be forced to depend on methods it does not use." — Robert C. Martin

Large, "fat" interfaces force implementing classes to provide stub methods for features they do not support. Split interfaces along client boundaries.

### Violation

```typescript
interface Printer {
    print(doc: Document): void;
    scan(doc: Document): void;
    fax(doc: Document): void;
    staple(doc: Document): void;
}

class SimplePrinter implements Printer {
    print(doc: Document): void { /* works */ }
    scan(doc: Document): void { throw new Error("Not supported"); }
    fax(doc: Document): void { throw new Error("Not supported"); }
    staple(doc: Document): void { throw new Error("Not supported"); }
}
```

`SimplePrinter` is forced to know about scanning, faxing, and stapling even though it supports none of them.

### Corrected

```typescript
interface Printable {
    print(doc: Document): void;
}

interface Scannable {
    scan(doc: Document): void;
}

interface Faxable {
    fax(doc: Document): void;
}

interface Stapleable {
    staple(doc: Document): void;
}

class SimplePrinter implements Printable {
    print(doc: Document): void { /* works */ }
}

class MultiFunctionPrinter implements Printable, Scannable, Faxable {
    print(doc: Document): void { /* works */ }
    scan(doc: Document): void { /* works */ }
    fax(doc: Document): void { /* works */ }
}
```

Each client depends only on the interface it actually uses.

---

## D — Dependency Inversion Principle (DIP)

> "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions." — Robert C. Martin

### Violation

```typescript
class MySqlDatabase {
    save(data: Record<string, unknown>): void {
        // MySQL-specific implementation
    }
}

class OrderService {
    private db = new MySqlDatabase(); // direct dependency on a concrete class

    createOrder(order: Order): void {
        this.db.save(order.toRecord());
    }
}
// Changing from MySQL to PostgreSQL requires modifying OrderService.
```

### Corrected

```typescript
// Abstraction — defined in the high-level module
interface OrderRepository {
    save(order: Order): Promise<void>;
}

// Detail — depends on the abstraction
class MySqlOrderRepository implements OrderRepository {
    async save(order: Order): Promise<void> {
        // MySQL-specific implementation
    }
}

class PostgresOrderRepository implements OrderRepository {
    async save(order: Order): Promise<void> {
        // PostgreSQL-specific implementation
    }
}

// High-level module — depends on the abstraction
class OrderService {
    constructor(private repo: OrderRepository) {}

    async createOrder(order: Order): Promise<void> {
        await this.repo.save(order);
    }
}

// Composition root — wiring
const service = new OrderService(new PostgresOrderRepository());
```

The high-level policy (`OrderService`) and the low-level detail (`PostgresOrderRepository`) both depend on the abstraction (`OrderRepository`). The dependency is **inverted**.

---

## How SOLID Relates to Other Concepts

### SOLID and Clean Architecture
Clean Architecture is the architectural expression of SOLID at the system level:

| SOLID Principle | Clean Architecture Manifestation |
|----------------|----------------------------------|
| SRP | Each layer has a single reason to change (UI, business rules, data). |
| OCP | New features are added by creating new Use Cases, not modifying existing ones. |
| LSP | Interface Adapters can be swapped (PostgreSQL for MySQL) without breaking Use Cases. |
| ISP | Ports (interfaces) are defined per use case, not as monolithic repository interfaces. |
| DIP | The Dependency Rule — inner layers define interfaces, outer layers implement them. |

### SOLID and Design Patterns
Many GoF design patterns exist specifically to satisfy SOLID:

| Pattern | Primary SOLID Principle |
|---------|------------------------|
| Strategy | OCP, DIP |
| Observer | OCP, DIP |
| Decorator | OCP, SRP |
| Factory Method / Abstract Factory | DIP |
| Adapter | ISP, DIP |
| Command | SRP, OCP |
| Template Method | OCP, LSP |

### SOLID and Testability
Each SOLID principle directly improves testability:

| Principle | Testing Benefit |
|-----------|----------------|
| SRP | Smaller classes with fewer dependencies = simpler test setup. |
| OCP | New behavior tested in isolation via new classes, existing tests remain green. |
| LSP | Test doubles (mocks, stubs) can replace real implementations safely. |
| ISP | Narrow interfaces require fewer mock methods. |
| DIP | Dependencies are injected, making them trivially replaceable with test doubles. |

## Common Pitfalls

| Pitfall | Description |
|---------|-------------|
| Over-engineering with SRP | Splitting every method into its own class creates an explosion of trivial types. SRP means one *reason to change*, not one *method*. |
| Premature abstraction for OCP | Do not create Strategy/Plugin architectures for code that has only one variant. Wait for the second use case. |
| Ignoring LSP in collections | A `ReadOnlyList` that extends `List` and throws on `add()` violates LSP. |
| Interface explosion with ISP | Do not create a one-method interface for every single method. Group by **client need**. |
| DIP everywhere | Not every dependency needs an interface. Stable, unlikely-to-change dependencies (e.g., standard library) can be referenced directly. |

## Best Practices
- Apply SOLID principles as guardrails during code review, not as upfront design mandates.
- When you feel friction adding a feature, check which SOLID principle is being violated.
- Use constructor injection as the default mechanism for DIP — it makes dependencies explicit and immutable.
- Write tests first (TDD) — SOLID violations surface quickly when code is hard to test.
- Balance SOLID with YAGNI: do not add abstractions speculatively. Introduce them when the second variation appears.
- Review class names regularly — if a class name contains "And" or "Manager" or "Service" doing too many things, SRP is likely violated.
