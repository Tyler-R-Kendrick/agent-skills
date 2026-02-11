# Refactoring

## Overview
*Refactoring: Improving the Design of Existing Code* by Martin Fowler defines refactoring as:

> "A disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior."

Refactoring is not rewriting. It is a sequence of small, behavior-preserving transformations that cumulatively produce a significant restructuring. Each transformation is tiny and "obviously correct," so the risk of introducing bugs is low.

## The Refactoring Workflow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Write Tests │ ──> │  Small Change│ ──> │  Run Tests   │ ──> │   Commit     │
│  (if missing)│     │  (one smell) │     │  (all green?)│     │   (repeat)   │
└──────────────┘     └──────────────┘     └──────┬───────┘     └──────────────┘
                           ^                     │
                           │     Red? Revert.    │
                           └─────────────────────┘
```

1. **Ensure tests exist.** If they do not, write characterization tests that lock in current behavior before you change anything.
2. **Make one small change.** Apply a single, named refactoring technique.
3. **Run all tests.** If they pass, commit. If they fail, revert and try a smaller step.
4. **Repeat.** Each commit is a safe checkpoint. Accumulate small improvements into significant structural change.

**Never refactor and add features in the same commit.** Separate "hat switching" — wear the refactoring hat or the feature hat, never both.

---

## Code Smells Catalog

Code smells are surface indicators that usually correspond to a deeper problem in the system. Smells are not bugs — the code works — but they signal that the design could be improved.

### Bloaters
Smells where code grows excessively large.

| Smell | Description | Typical Refactoring |
|-------|-------------|---------------------|
| **Long Method** | A method that has grown too long. The longer a method is, the harder it is to understand. | Extract Method, Replace Temp with Query, Introduce Parameter Object, Decompose Conditional |
| **Large Class** | A class that does too much and has too many fields or methods. | Extract Class, Extract Subclass, Extract Interface |
| **Primitive Obsession** | Using primitives (strings, numbers) instead of small objects for simple tasks (money, phone numbers, ranges). | Replace Data Value with Object, Introduce Parameter Object, Replace Type Code with Class |
| **Long Parameter List** | A method takes too many parameters, making it hard to call and understand. | Introduce Parameter Object, Replace Parameter with Method Call, Preserve Whole Object |
| **Data Clumps** | Groups of data that appear together repeatedly (e.g., `startDate`/`endDate`, `x`/`y`/`z`). | Extract Class, Introduce Parameter Object |

### Object-Orientation Abusers
Smells that indicate incomplete or incorrect application of OO principles.

| Smell | Description | Typical Refactoring |
|-------|-------------|---------------------|
| **Switch Statements** | Complex switch/case or if/else chains that dispatch on a type code. | Replace Conditional with Polymorphism, Replace Type Code with Subclasses |
| **Parallel Inheritance Hierarchies** | Every time you add a subclass to one hierarchy, you have to add one to another. | Move Method, Move Field to eliminate the parallel hierarchy |
| **Temporary Field** | A field that is only set in certain circumstances, leading to confusion about when it is valid. | Extract Class, Introduce Null Object |
| **Refused Bequest** | A subclass uses only some of the methods and properties of its parent. | Replace Inheritance with Delegation, Extract Subclass |

### Change Preventers
Smells that make changes disproportionately expensive.

| Smell | Description | Typical Refactoring |
|-------|-------------|---------------------|
| **Divergent Change** | One class is commonly changed in different ways for different reasons — it has multiple responsibilities. | Extract Class (split along axes of change) |
| **Shotgun Surgery** | A single change requires editing many classes in many places. | Move Method, Move Field, Inline Class (consolidate scattered responsibility) |

### Dispensables
Smells where something is unnecessary and should be removed.

| Smell | Description | Typical Refactoring |
|-------|-------------|---------------------|
| **Lazy Class** | A class that does too little to justify its existence. | Inline Class, Collapse Hierarchy |
| **Speculative Generality** | Abstract classes, interfaces, or parameters that exist "just in case" but have only one user. | Collapse Hierarchy, Inline Class, Remove Parameter |
| **Dead Code** | Code that is never executed. | Delete it. Version control remembers. |
| **Duplicate Code** | The same code structure appears in more than one place. | Extract Method, Extract Class, Pull Up Method |

### Couplers
Smells that indicate excessive coupling between classes.

| Smell | Description | Typical Refactoring |
|-------|-------------|---------------------|
| **Feature Envy** | A method that uses more features of another class than its own. | Move Method, Extract Method |
| **Inappropriate Intimacy** | Two classes are too tightly coupled, accessing each other's private details. | Move Method, Move Field, Extract Class, Replace Inheritance with Delegation |
| **Message Chains** | `a.getB().getC().getD().doSomething()` — the client is coupled to the navigation structure. | Hide Delegate, Extract Method, Move Method |
| **Middle Man** | A class that does nothing but delegate to another. | Remove Middle Man, Inline Method |

---

## Key Refactoring Techniques

### Extract Method
The most common and most powerful refactoring. Turn a code fragment into a method whose name explains its purpose.

```typescript
// Before
function printOwing(invoice: Invoice): void {
    let outstanding = 0;

    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");

    for (const order of invoice.orders) {
        outstanding += order.amount;
    }

    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
}

// After
function printOwing(invoice: Invoice): void {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    printDetails(invoice, outstanding);
}

function printBanner(): void {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}

function calculateOutstanding(invoice: Invoice): number {
    return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function printDetails(invoice: Invoice, outstanding: number): void {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
}
```

### Inline Method
The inverse of Extract Method. When a method body is just as clear as its name, inline it.

```typescript
// Before
function getRating(): number {
    return moreThanFiveLateDeliveries() ? 2 : 1;
}

function moreThanFiveLateDeliveries(): boolean {
    return this.numberOfLateDeliveries > 5;
}

// After
function getRating(): number {
    return this.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

### Extract Class
When a class is doing the work of two, split it into two.

```typescript
// Before
class Person {
    name: string;
    officeAreaCode: string;
    officeNumber: string;

    telephoneNumber(): string {
        return `(${this.officeAreaCode}) ${this.officeNumber}`;
    }
}

// After
class Person {
    name: string;
    officeTelephone: TelephoneNumber;

    telephoneNumber(): string {
        return this.officeTelephone.toString();
    }
}

class TelephoneNumber {
    areaCode: string;
    number: string;

    toString(): string {
        return `(${this.areaCode}) ${this.number}`;
    }
}
```

### Move Method
When a method uses more features of another class than its own, move it to the class where it belongs.

```typescript
// Before — overdraftCharge uses Account's type more than it uses itself
class AccountType {
    isPremium: boolean;
}

class Account {
    type: AccountType;
    daysOverdrawn: number;

    overdraftCharge(): number {
        if (this.type.isPremium) {
            return 10 + (this.daysOverdrawn - 7) * 0.85;
        }
        return this.daysOverdrawn * 1.75;
    }
}

// After — moved to AccountType where it belongs
class AccountType {
    isPremium: boolean;

    overdraftCharge(daysOverdrawn: number): number {
        if (this.isPremium) {
            return 10 + (daysOverdrawn - 7) * 0.85;
        }
        return daysOverdrawn * 1.75;
    }
}

class Account {
    type: AccountType;
    daysOverdrawn: number;

    overdraftCharge(): number {
        return this.type.overdraftCharge(this.daysOverdrawn);
    }
}
```

### Replace Conditional with Polymorphism
Replace a conditional that dispatches on type with polymorphic method calls.

```typescript
// Before
function calculatePay(employee: Employee): number {
    switch (employee.type) {
        case "engineer":
            return employee.baseSalary;
        case "salesperson":
            return employee.baseSalary + employee.commission;
        case "manager":
            return employee.baseSalary + employee.bonus;
        default:
            throw new Error(`Unknown type: ${employee.type}`);
    }
}

// After
interface Employee {
    calculatePay(): number;
}

class Engineer implements Employee {
    constructor(private baseSalary: number) {}
    calculatePay(): number { return this.baseSalary; }
}

class Salesperson implements Employee {
    constructor(private baseSalary: number, private commission: number) {}
    calculatePay(): number { return this.baseSalary + this.commission; }
}

class Manager implements Employee {
    constructor(private baseSalary: number, private bonus: number) {}
    calculatePay(): number { return this.baseSalary + this.bonus; }
}
```

### Introduce Parameter Object
When several parameters always travel together, group them into an object.

```typescript
// Before
function amountInvoiced(startDate: Date, endDate: Date): number { /* ... */ }
function amountReceived(startDate: Date, endDate: Date): number { /* ... */ }
function amountOverdue(startDate: Date, endDate: Date): number { /* ... */ }

// After
class DateRange {
    constructor(readonly start: Date, readonly end: Date) {
        if (start > end) throw new Error("Start must precede end");
    }

    contains(date: Date): boolean {
        return date >= this.start && date <= this.end;
    }
}

function amountInvoiced(range: DateRange): number { /* ... */ }
function amountReceived(range: DateRange): number { /* ... */ }
function amountOverdue(range: DateRange): number { /* ... */ }
```

### Replace Temp with Query
Turn a temporary variable into a method call, so the logic is available to other methods and the code is more self-documenting.

```typescript
// Before
function calculateTotal(order: Order): number {
    const basePrice = order.quantity * order.itemPrice;
    const discountFactor = basePrice > 1000 ? 0.95 : 0.98;
    return basePrice * discountFactor;
}

// After
function calculateTotal(order: Order): number {
    return basePrice(order) * discountFactor(order);
}

function basePrice(order: Order): number {
    return order.quantity * order.itemPrice;
}

function discountFactor(order: Order): number {
    return basePrice(order) > 1000 ? 0.95 : 0.98;
}
```

---

## When to Refactor

| Trigger | Action |
|---------|--------|
| **The Rule of Three** | The first time you do something, just do it. The second time, wince. The third time, refactor. |
| **Before adding a feature** | If the existing structure makes the new feature awkward, refactor first so the addition is simple. |
| **During code review** | Smells spotted in review are refactoring opportunities. Address them before merging. |
| **While fixing a bug** | The bug often reveals a structural weakness. Fix the structure and the bug together (in separate commits). |
| **Boy Scout Rule** | Every time you read code and it takes a moment to understand, leave it clearer than you found it. |

## When NOT to Refactor

| Situation | Reason |
|-----------|--------|
| **No tests exist and you cannot write them** | Refactoring without tests is gambling. Write characterization tests first. |
| **A deadline is imminent** | Technical debt is a valid business decision when managed consciously. Refactor after the deadline. |
| **The code is going to be replaced** | Do not polish code that will be thrown away. |
| **The code works and nobody needs to change it** | Refactoring code that is never touched adds risk with no benefit. |

## Refactoring and Testing

Refactoring requires a safety net of tests:

- **Before refactoring:** Ensure tests cover the code you are about to change. If they do not, write **characterization tests** — tests that assert what the code currently does, whether or not that is "correct."
- **During refactoring:** Run tests after every small change. Green means you preserved behavior. Red means you broke something — revert and try a smaller step.
- **After refactoring:** The tests should pass without modification. If you had to change tests, you changed behavior — that is not a refactoring.

```
Confidence = Test Coverage * Test Quality
```

If you have high coverage but the tests are fragile (testing implementation rather than behavior), refactoring becomes painful because tests break on every change. Write tests against the public interface, not internal details.

## Refactoring Techniques Quick Reference

| Technique | When to Use |
|-----------|-------------|
| Extract Method | Long method, duplicated fragment, comment explaining a block |
| Inline Method | Method body is as clear as its name, excessive delegation |
| Extract Class | Class with too many responsibilities, data clumps |
| Inline Class | Class does too little to justify its existence |
| Move Method | Method uses more features of another class |
| Move Field | Field is used more by another class |
| Rename Method/Variable | Name does not reveal intent |
| Replace Conditional with Polymorphism | Switch/if-else dispatching on type |
| Introduce Parameter Object | Multiple parameters that always appear together |
| Replace Temp with Query | Temporary variable obscures method decomposition |
| Preserve Whole Object | Pulling several values from an object to pass as separate parameters |
| Replace Magic Number with Constant | Literal numbers whose meaning is unclear |
| Decompose Conditional | Complex conditional expression |
| Consolidate Conditional Expression | Multiple conditionals with the same result |
| Remove Flag Argument | Boolean parameter that changes method behavior |
| Pull Up Method | Identical methods in sibling subclasses |
| Push Down Method | Method only relevant to one subclass |
| Collapse Hierarchy | Subclass is not different enough from its parent |

## Best Practices
- Name the refactoring you are applying. "I am doing an Extract Method" is clearer than "I am cleaning up this code."
- Commit after each successful refactoring step. Small commits make bisecting safe.
- Use IDE refactoring tools (rename, extract, inline) — they automate the mechanics and reduce errors.
- Never refactor and change behavior in the same step. Separate the two activities with separate commits.
- Track technical debt explicitly (TODO comments, issue tracker) so refactoring is planned, not ad hoc.
- Refactor toward the design you need for the next feature, not toward a theoretically ideal design.
- Pair on refactoring when possible — two sets of eyes catch more unintended behavior changes.
- If a refactoring takes more than an hour without completing, break it into smaller steps or reconsider the approach.
