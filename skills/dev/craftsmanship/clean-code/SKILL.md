---
name: clean-code
description: |
    Use when writing or reviewing code for readability, maintainability, and expressiveness — based on Robert C. Martin's "Clean Code."
    USE FOR: naming conventions, function design, comment quality, formatting standards, error handling strategy, code readability improvements
    DO NOT USE FOR: architecture layers (use clean-architecture), refactoring techniques (use refactoring), SOLID principles (use solid)
license: MIT
metadata:
  displayName: "Clean Code"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Clean Code

## Overview
*Clean Code: A Handbook of Agile Software Craftsmanship* by Robert C. Martin establishes that code is read far more often than it is written. Clean code is code that is easy to understand, easy to change, and does what the reader expects. It reads like well-written prose.

> "Clean code always looks like it was written by someone who cares." — Michael Feathers

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

## Meaningful Names

### Intention-Revealing Names
Names should answer: why it exists, what it does, and how it is used.

```typescript
// Bad
const d: number = 0; // elapsed time in days

// Good
const elapsedTimeInDays: number = 0;
```

### Avoid Disinformation
Do not use names that imply a meaning different from the actual purpose.

```typescript
// Bad — it is not actually a List
const accountList: Map<string, Account> = new Map();

// Good
const accountsByName: Map<string, Account> = new Map();
```

### Pronounceable Names
If you cannot pronounce a name, you cannot discuss it without sounding awkward.

```typescript
// Bad
const genymdhms: Date = new Date();

// Good
const generationTimestamp: Date = new Date();
```

### Searchable Names
Single-letter names and numeric constants are hard to search for.

```typescript
// Bad
for (let i = 0; i < 34; i++) {
    s += t[i] * 4 / 5;
}

// Good
const WORK_DAYS_PER_WEEK = 5;
const NUMBER_OF_TASKS = 34;
for (let taskIndex = 0; taskIndex < NUMBER_OF_TASKS; taskIndex++) {
    realDaysPerIdealDay += taskEstimate[taskIndex] * DAYS_PER_IDEAL_DAY / WORK_DAYS_PER_WEEK;
}
```

### Naming Conventions Summary

| Rule | Example (Bad) | Example (Good) |
|------|---------------|----------------|
| Use intention-revealing names | `d` | `elapsedTimeInDays` |
| Avoid disinformation | `accountList` (for a Map) | `accountsByName` |
| Make meaningful distinctions | `a1`, `a2` | `source`, `destination` |
| Use pronounceable names | `genymdhms` | `generationTimestamp` |
| Use searchable names | `7` | `MAX_CLASSES_PER_STUDENT` |
| Avoid encodings / prefixes | `m_name`, `IShapeFactory` | `name`, `ShapeFactory` |
| Use nouns for classes | `Manager`, `Processor`, `Data` (vague) | `Account`, `WikiPage`, `AddressParser` |
| Use verbs for methods | `data()` | `fetchData()`, `save()`, `deletePage()` |

## Functions

### Small Functions
Functions should be small. Then they should be smaller than that. A function should do **one thing**, do it well, and do it only.

### One Level of Abstraction
Statements within a function should all be at the same level of abstraction. Do not mix high-level policy with low-level detail.

```typescript
// Bad — mixed levels of abstraction
function renderPage(data: PageData): string {
    let html = "";
    html += "<html><head><title>" + data.title + "</title></head>";
    if (data.isTestPage) {
        const setup = findInheritedPage("Setup");
        html += setup.getContent();
    }
    html += data.content;
    return html;
}

// Good — consistent abstraction
function renderPage(data: PageData): string {
    const header = buildHeader(data.title);
    const setupContent = includeSetupIfTestPage(data);
    const body = buildBody(data.content);
    return assembleHtml(header, setupContent, body);
}
```

### Command-Query Separation
Functions should either **do something** (command) or **answer something** (query), but not both.

```typescript
// Bad — command and query mixed
function set(attribute: string, value: string): boolean {
    // sets the value AND returns whether the attribute existed
}

// Good — separated
function attributeExists(attribute: string): boolean { /* ... */ }
function setAttribute(attribute: string, value: string): void { /* ... */ }
```

### Function Arguments
The ideal number of arguments is zero (niladic), followed by one (monadic), then two (dyadic). Three arguments (triadic) should be avoided where possible. More than three requires very special justification.

```typescript
// Bad — too many arguments
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean): Menu { /* ... */ }

// Good — use a parameter object
interface MenuOptions {
    title: string;
    body: string;
    buttonText: string;
    cancellable: boolean;
}
function createMenu(options: MenuOptions): Menu { /* ... */ }
```

### Avoid Side Effects
A function that promises to do one thing but also does other hidden things creates temporal coupling and order dependencies.

```typescript
// Bad — hidden side effect (initializes a session)
function checkPassword(userName: string, password: string): boolean {
    const user = findUser(userName);
    if (user && user.passwordMatches(password)) {
        Session.initialize(); // side effect!
        return true;
    }
    return false;
}

// Good — make the side effect explicit
function checkPasswordAndInitializeSession(userName: string, password: string): boolean { /* ... */ }
// Or better, separate the two operations
```

## Comments

### Good Comments
- **Legal comments:** Copyright and license headers.
- **Informative comments:** Explain a regex pattern or complex algorithm.
- **Explanation of intent:** Why a decision was made, not what the code does.
- **Warning comments:** Alert others to consequences (e.g., "This test takes 10 minutes to run").
- **TODO comments:** Mark incomplete work with a consistent `TODO(author):` convention.
- **Amplification:** Emphasize importance of something that might seem trivial.

### Bad Comments
- **Redundant comments:** Restating what the code already says.
- **Mandated comments:** Javadoc for every function regardless of clarity.
- **Journal comments:** Change logs in the file (use version control instead).
- **Noise comments:** `/** Default constructor */` on a default constructor.
- **Commented-out code:** Delete it. Version control remembers.
- **Position markers:** `// ---- ACTIONS ----` banners (if you need them, the class is too large).

```typescript
// Bad — redundant comment
// Check if the user is active
if (user.isActive) { /* ... */ }

// Good — explains intent
// Users flagged during the 2024 migration may have stale tokens;
// force re-authentication to prevent silent data loss.
if (user.requiresReauthentication) { /* ... */ }
```

## Formatting

### Vertical Formatting
- **Newspaper metaphor:** The name should tell you if you are in the right module. The top should give the high-level concepts. Detail increases as you move down.
- **Vertical openness:** Separate concepts with blank lines.
- **Vertical density:** Lines that are tightly related should appear close together.
- **Vertical distance:** Concepts that are closely related should be kept vertically close to each other. Variables should be declared as close to their usage as possible.

### Horizontal Formatting
- **Horizontal openness and density:** Use spaces to associate strongly related things and separate weakly related things.
- **Indentation:** Never ignore the indentation. Even for short `if` bodies, use braces and indent.
- Keep lines under 100-120 characters where practical.

### Team Rules
A team of developers should agree upon a single formatting style. Consistency within a project is more important than any individual's preferred style. Use automated formatters (Prettier, ESLint, editorconfig) to enforce the rules without debate.

## Error Handling

### Use Exceptions Rather Than Return Codes
Return codes force the caller to check immediately and clutter the happy path.

```typescript
// Bad — error code
function deletePage(page: Page): number {
    if (page === null) return -1;
    if (!page.canDelete()) return -2;
    page.delete();
    return 0;
}

// Good — exception
function deletePage(page: Page): void {
    if (!page) throw new ArgumentError("Page must not be null");
    if (!page.canDelete()) throw new PermissionError("Page cannot be deleted");
    page.delete();
}
```

### Write Your Try-Catch-Finally First
Start with the try-catch-finally when writing code that could throw. This helps define scope and invariants.

### Don't Return Null
Returning null forces every caller to add a null check. Instead, throw an exception or return a special-case object (Null Object pattern).

```typescript
// Bad
function getEmployee(id: string): Employee | null {
    const record = db.find(id);
    return record ? new Employee(record) : null;
}

// Good — throw if not found
function getEmployee(id: string): Employee {
    const record = db.find(id);
    if (!record) throw new EmployeeNotFoundError(id);
    return new Employee(record);
}

// Good — return a Null Object when absence is normal
function getEmployees(): Employee[] {
    return db.findAll() ?? [];  // never null, may be empty
}
```

### Don't Pass Null
Passing null as an argument is even worse than returning it. It forces every function to start with null-checking boilerplate.

## Objects and Data Structures

### Data/Object Anti-Symmetry
- **Objects** hide their data behind abstractions and expose functions that operate on it.
- **Data structures** expose their data and have no meaningful functions.

These two approaches are complementary opposites:
- Procedural code (using data structures) makes it easy to add new functions without changing existing data structures.
- OO code (using objects) makes it easy to add new classes without changing existing functions.

```typescript
// Data structure approach — easy to add new functions
interface Point {
    x: number;
    y: number;
}

function area(shape: Square): number { return shape.side * shape.side; }
function perimeter(shape: Square): number { return 4 * shape.side; }

// Object approach — easy to add new shapes
interface Shape {
    area(): number;
    perimeter(): number;
}
```

### Law of Demeter
A method `f` of class `C` should only call methods on:
- `C` itself
- Objects created by `f`
- Objects passed as arguments to `f`
- Objects held in instance variables of `C`

```typescript
// Bad — train wreck
const outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

// Good — tell, don't ask
const outputDir = ctxt.getOutputDirectoryPath();
```

## Clean Code Checklist

| Area | Question |
|------|----------|
| Names | Does every name reveal intent? Could a new team member understand this without context? |
| Functions | Is every function under 20 lines? Does it do exactly one thing? |
| Arguments | Does any function take more than 3 arguments? |
| Comments | Does every comment explain *why*, not *what*? Are there commented-out blocks? |
| Formatting | Does the file read top-to-bottom like a newspaper article? |
| Error Handling | Are exceptions used instead of error codes? Is null ever returned or passed? |
| Duplication | Is there any copy-pasted logic? (Apply DRY) |
| Dead Code | Is there any code that is never executed? |

## Best Practices
- Read code aloud. If it sounds awkward, the names or structure need work.
- Apply the Boy Scout Rule: clean up one thing every time you visit a file.
- Use automated linters and formatters to handle formatting debates mechanically.
- Treat tests as first-class citizens of clean code — apply all the same naming, function, and formatting rules.
- Prefer polymorphism over switch/if-else chains when you find the same condition repeated.
- When you write a comment, first ask: "Can I make this code so clear that the comment is unnecessary?"
