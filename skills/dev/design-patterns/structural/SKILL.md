---
name: structural
description: |
    Structural design patterns from the Gang of Four — Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy. Patterns that compose classes and objects into larger structures while keeping those structures flexible and efficient.
    USE FOR: adapting interfaces, composing objects into trees, adding behavior dynamically, simplifying complex subsystems, sharing objects efficiently, controlling access via proxies
    DO NOT USE FOR: object creation (use creational), communication patterns (use behavioral)
license: MIT
metadata:
  displayName: "Structural Patterns"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Structural Design Patterns

## Overview
Structural patterns are concerned with how classes and objects are composed to form larger structures. Structural class patterns use inheritance to compose interfaces or implementations. Structural object patterns describe ways to compose objects to realize new functionality — the added flexibility of object composition comes from the ability to change the composition at runtime.

---

## 1. Adapter

### Intent
Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that could not otherwise because of incompatible interfaces.

### Structure

```
┌──────────────┐        ┌──────────────────┐
│    Client     │───────▶│  Target           │
└──────────────┘        │  (interface)      │
                         ├──────────────────┤
                         │ + request()       │
                         └──────┬───────────┘
                                │ implements
                                ▼
┌──────────────┐        ┌──────────────────┐
│   Adaptee     │◀───────│    Adapter        │
├──────────────┤ wraps  ├──────────────────┤
│ + specificReq()│       │ + request()       │
└──────────────┘        └──────────────────┘
```

### Participants
- **Target** — defines the domain-specific interface that Client uses
- **Client** — collaborates with objects conforming to the Target interface
- **Adaptee** — defines an existing interface that needs adapting
- **Adapter** — adapts the interface of Adaptee to the Target interface

### When to Use
- You want to use an existing class, but its interface does not match the one you need
- You want to create a reusable class that cooperates with unrelated or unforeseen classes
- You need to integrate a third-party library without coupling your code to its API

### TypeScript Example

```typescript
// Adaptee — third-party XML analytics service
class LegacyAnalytics {
  sendXML(xml: string): void {
    console.log(`[Legacy] Sending XML: ${xml}`);
  }
}

// Target interface — what our app expects
interface Analytics {
  track(event: string, data: Record<string, unknown>): void;
}

// Adapter
class AnalyticsAdapter implements Analytics {
  constructor(private legacy: LegacyAnalytics) {}

  track(event: string, data: Record<string, unknown>): void {
    const xml = `<event name="${event}">${
      Object.entries(data)
        .map(([k, v]) => `<${k}>${v}</${k}>`)
        .join("")
    }</event>`;
    this.legacy.sendXML(xml);
  }
}

// Usage
const analytics: Analytics = new AnalyticsAdapter(new LegacyAnalytics());
analytics.track("page_view", { url: "/home", userId: 42 });
// [Legacy] Sending XML: <event name="page_view"><url>/home</url><userId>42</userId></event>
```

---

## 2. Bridge

### Intent
Decouple an abstraction from its implementation so that the two can vary independently.

### Structure

```
┌────────────────────┐         ┌─────────────────────┐
│   Abstraction       │────────▶│   Implementor        │
├────────────────────┤  has-a  │   (interface)        │
│ + operation()       │         ├─────────────────────┤
└──────┬─────────────┘         │ + operationImpl()    │
       │ extends                └──────┬──────────────┘
       ▼                               │ implements
┌────────────────────┐         ┌───────┴──────────────┐
│ RefinedAbstraction  │         │                      │
├────────────────────┤   ┌─────────────┐  ┌─────────────┐
│ + operation()       │   │ ConcreteImplA│  │ ConcreteImplB│
└────────────────────┘   └─────────────┘  └─────────────┘
```

### Participants
- **Abstraction** — defines the abstraction's interface; maintains a reference to Implementor
- **RefinedAbstraction** — extends the interface defined by Abstraction
- **Implementor** — defines the interface for implementation classes
- **ConcreteImplementor** — implements the Implementor interface

### When to Use
- You want to avoid a permanent binding between an abstraction and its implementation
- Both the abstraction and its implementation should be extensible via subclassing
- You have a class explosion from combining two independent dimensions of variation (e.g., Shape x Renderer, Notification x Channel)

### TypeScript Example

```typescript
// Implementor
interface NotificationChannel {
  send(title: string, body: string): void;
}

// Concrete implementors
class EmailChannel implements NotificationChannel {
  send(title: string, body: string): void {
    console.log(`[Email] Subject: ${title} | Body: ${body}`);
  }
}

class SlackChannel implements NotificationChannel {
  send(title: string, body: string): void {
    console.log(`[Slack] *${title}*: ${body}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(title: string, body: string): void {
    console.log(`[SMS] ${title}: ${body.substring(0, 160)}`);
  }
}

// Abstraction
abstract class Notification {
  constructor(protected channel: NotificationChannel) {}
  abstract notify(message: string): void;
}

// Refined abstractions
class AlertNotification extends Notification {
  notify(message: string): void {
    this.channel.send("ALERT", `URGENT: ${message}`);
  }
}

class InfoNotification extends Notification {
  notify(message: string): void {
    this.channel.send("Info", message);
  }
}

// Usage — any notification type x any channel
const urgentEmail = new AlertNotification(new EmailChannel());
urgentEmail.notify("Server CPU at 98%");
// [Email] Subject: ALERT | Body: URGENT: Server CPU at 98%

const infoSlack = new InfoNotification(new SlackChannel());
infoSlack.notify("Deployment complete");
// [Slack] *Info*: Deployment complete
```

---

## 3. Composite

### Intent
Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

### Structure

```
┌──────────────────┐
│   Component       │◀─────────────────────┐
│   (interface)     │                      │
├──────────────────┤                      │
│ + operation()     │                      │
└──────┬───────────┘                      │ children
       │ implements                        │
       ├──────────────────┐               │
       ▼                  ▼               │
┌──────────────┐   ┌──────────────┐       │
│    Leaf       │   │  Composite    │──────┘
├──────────────┤   ├──────────────┤
│ + operation() │   │ + operation() │
└──────────────┘   │ + add()       │
                    │ + remove()    │
                    │ + getChild()  │
                    └──────────────┘
```

### Participants
- **Component** — declares the interface for objects in the composition
- **Leaf** — represents leaf objects in the composition (no children)
- **Composite** — defines behavior for components with children; stores child components

### When to Use
- You want to represent part-whole hierarchies of objects
- You want clients to treat individual objects and compositions uniformly
- File systems, org charts, UI component trees, menu structures

### TypeScript Example

```typescript
// Component
interface FileSystemNode {
  name: string;
  getSize(): number;
  print(indent?: string): string;
}

// Leaf
class File implements FileSystemNode {
  constructor(public name: string, private size: number) {}

  getSize(): number { return this.size; }

  print(indent = ""): string {
    return `${indent}📄 ${this.name} (${this.size} bytes)`;
  }
}

// Composite
class Directory implements FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(public name: string) {}

  add(node: FileSystemNode): this {
    this.children.push(node);
    return this;
  }

  remove(node: FileSystemNode): void {
    this.children = this.children.filter(c => c !== node);
  }

  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  print(indent = ""): string {
    const lines = [`${indent}📁 ${this.name}/ (${this.getSize()} bytes)`];
    for (const child of this.children) {
      lines.push(child.print(indent + "  "));
    }
    return lines.join("\n");
  }
}

// Usage — uniform treatment of files and directories
const root = new Directory("src")
  .add(new File("index.ts", 1200))
  .add(new Directory("utils")
    .add(new File("helpers.ts", 800))
    .add(new File("constants.ts", 300)))
  .add(new File("app.ts", 2500));

console.log(root.print());
console.log(`Total size: ${root.getSize()} bytes`); // 4800
```

---

## 4. Decorator

### Intent
Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

### Structure

```
┌──────────────────┐
│   Component       │◀──────────────────────┐
│   (interface)     │                       │
├──────────────────┤                       │
│ + operation()     │                       │ wraps
└──────┬───────────┘                       │
       │ implements                         │
       ├──────────────────┐                │
       ▼                  ▼                │
┌────────────────┐ ┌─────────────────┐     │
│ ConcreteComp.   │ │   Decorator      │────┘
├────────────────┤ ├─────────────────┤
│ + operation()   │ │ + operation()    │
└────────────────┘ └──────┬──────────┘
                          │ extends
                   ┌──────┴──────────┐
                   ▼                 ▼
            ┌────────────┐   ┌────────────┐
            │ DecoratorA  │   │ DecoratorB  │
            ├────────────┤   ├────────────┤
            │ + operation()│  │ + operation()│
            └────────────┘   └────────────┘
```

### Participants
- **Component** — defines the interface for objects that can have responsibilities added
- **ConcreteComponent** — the object to which additional responsibilities are attached
- **Decorator** — maintains a reference to a Component and conforms to Component's interface
- **ConcreteDecorator** — adds responsibilities to the component

### When to Use
- You want to add responsibilities to individual objects dynamically, without affecting other objects
- You want to add responsibilities that can be withdrawn
- Extension by subclassing is impractical (e.g., the number of combinations explodes)

### TypeScript Example

```typescript
// Component interface
interface DataSource {
  write(data: string): string;
  read(): string;
}

// Concrete component
class FileDataSource implements DataSource {
  private content = "";

  write(data: string): string {
    this.content = data;
    return `Written: ${data}`;
  }

  read(): string {
    return this.content;
  }
}

// Base decorator
abstract class DataSourceDecorator implements DataSource {
  constructor(protected wrappee: DataSource) {}

  write(data: string): string {
    return this.wrappee.write(data);
  }

  read(): string {
    return this.wrappee.read();
  }
}

// Concrete decorators
class EncryptionDecorator extends DataSourceDecorator {
  write(data: string): string {
    const encrypted = Buffer.from(data).toString("base64");
    return super.write(encrypted);
  }

  read(): string {
    const data = super.read();
    return Buffer.from(data, "base64").toString("utf-8");
  }
}

class CompressionDecorator extends DataSourceDecorator {
  write(data: string): string {
    const compressed = `[compressed:${data.length}]${data}`;
    return super.write(compressed);
  }

  read(): string {
    const data = super.read();
    return data.replace(/^\[compressed:\d+\]/, "");
  }
}

class LoggingDecorator extends DataSourceDecorator {
  write(data: string): string {
    console.log(`[LOG] Writing ${data.length} chars`);
    return super.write(data);
  }

  read(): string {
    console.log("[LOG] Reading data");
    return super.read();
  }
}

// Usage — stack decorators in any combination
let source: DataSource = new FileDataSource();
source = new CompressionDecorator(source);
source = new EncryptionDecorator(source);
source = new LoggingDecorator(source);

source.write("Hello, World!");
console.log(source.read()); // Hello, World!
```

---

## 5. Facade

### Intent
Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

### Structure

```
┌────────────────┐
│     Client      │
└──────┬─────────┘
       │ uses
       ▼
┌─────────────────────────┐
│        Facade            │
├─────────────────────────┤
│ + simpleOperation()      │
└──┬──────┬──────┬────────┘
   │      │      │
   ▼      ▼      ▼
┌──────┐┌──────┐┌──────┐
│Sub-A ││Sub-B ││Sub-C │
│      ││      ││      │
└──────┘└──────┘└──────┘
   Subsystem classes
```

### Participants
- **Facade** — provides simple methods that delegate to subsystem classes; knows which subsystem classes are responsible for a request
- **Subsystem classes** — implement subsystem functionality; handle work assigned by the Facade; have no knowledge of the Facade

### When to Use
- You want to provide a simple interface to a complex subsystem
- There are many dependencies between clients and implementation classes
- You want to layer your subsystems — use a Facade for each level

### TypeScript Example

```typescript
// Subsystem classes
class VideoDecoder {
  decode(file: string): string {
    return `decoded-frames(${file})`;
  }
}

class AudioDecoder {
  decode(file: string): string {
    return `decoded-audio(${file})`;
  }
}

class SubtitleParser {
  parse(file: string): string[] {
    return [`00:01 Hello`, `00:05 World`];
  }
}

class VideoRenderer {
  render(frames: string, audio: string, subs: string[]): string {
    return `Rendering: ${frames} + ${audio} with ${subs.length} subtitles`;
  }
}

// Facade — hides all subsystem complexity
class MediaPlayerFacade {
  private videoDecoder = new VideoDecoder();
  private audioDecoder = new AudioDecoder();
  private subtitleParser = new SubtitleParser();
  private renderer = new VideoRenderer();

  play(videoFile: string, subtitleFile?: string): string {
    const frames = this.videoDecoder.decode(videoFile);
    const audio = this.audioDecoder.decode(videoFile);
    const subs = subtitleFile
      ? this.subtitleParser.parse(subtitleFile)
      : [];
    return this.renderer.render(frames, audio, subs);
  }
}

// Usage — client only knows the Facade
const player = new MediaPlayerFacade();
console.log(player.play("movie.mp4", "movie.srt"));
// Rendering: decoded-frames(movie.mp4) + decoded-audio(movie.mp4) with 2 subtitles
```

---

## 6. Flyweight

### Intent
Use sharing to support large numbers of fine-grained objects efficiently.

### Structure

```
┌─────────────────┐       ┌────────────────────┐
│ FlyweightFactory │──────▶│   Flyweight         │
├─────────────────┤pool   │   (interface)       │
│ + getFlyweight() │       ├────────────────────┤
└─────────────────┘       │ + operation(extSt)  │
                           └──────┬─────────────┘
                                  │ implements
                           ┌──────┴─────────────┐
                           ▼                     ▼
                    ┌──────────────┐     ┌──────────────────┐
                    │ ConcreteFW    │     │ UnsharedConcreteFW│
                    │ (shared)      │     │ (not shared)      │
                    ├──────────────┤     ├──────────────────┤
                    │ intrinsicState│     │ allState          │
                    └──────────────┘     └──────────────────┘
```

### Participants
- **Flyweight** — declares an interface through which flyweights can receive and act on extrinsic state
- **ConcreteFlyweight** — stores intrinsic (shared) state; must be shareable
- **FlyweightFactory** — creates and manages flyweight objects; ensures sharing
- **Client** — maintains extrinsic state; passes it to flyweight operations

### When to Use
- An application uses a large number of objects
- Storage costs are high because of the sheer quantity of objects
- Most object state can be made extrinsic (passed in at operation time)
- Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed

### TypeScript Example

```typescript
// Flyweight — stores intrinsic (shared) state
class TreeType {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly texture: string
  ) {}

  render(x: number, y: number): string {
    return `[${this.name}] color=${this.color} at (${x},${y})`;
  }
}

// Flyweight factory
class TreeTypeFactory {
  private static types = new Map<string, TreeType>();

  static getType(name: string, color: string, texture: string): TreeType {
    const key = `${name}-${color}-${texture}`;
    if (!this.types.has(key)) {
      this.types.set(key, new TreeType(name, color, texture));
      console.log(`  Created new TreeType: ${key}`);
    }
    return this.types.get(key)!;
  }

  static get count(): number {
    return this.types.size;
  }
}

// Context — stores extrinsic (unique) state
class Tree {
  private type: TreeType;

  constructor(
    public x: number,
    public y: number,
    name: string,
    color: string,
    texture: string
  ) {
    this.type = TreeTypeFactory.getType(name, color, texture);
  }

  render(): string {
    return this.type.render(this.x, this.y);
  }
}

// Usage — 1 million trees but only a few TreeType objects
const forest: Tree[] = [];
for (let i = 0; i < 100000; i++) {
  forest.push(new Tree(
    Math.random() * 1000,
    Math.random() * 1000,
    i % 3 === 0 ? "Oak" : i % 3 === 1 ? "Pine" : "Birch",
    i % 2 === 0 ? "green" : "dark-green",
    "standard"
  ));
}
console.log(`Trees: ${forest.length}, Unique types: ${TreeTypeFactory.count}`);
// Trees: 100000, Unique types: 6  (instead of 100000 type objects)
```

---

## 7. Proxy

### Intent
Provide a surrogate or placeholder for another object to control access to it.

### Structure

```
┌──────────────────┐
│    Subject        │◀──────────────────────┐
│    (interface)    │                       │
├──────────────────┤                       │
│ + request()       │                       │ delegates to
└──────┬───────────┘                       │
       │ implements                         │
       ├──────────────────┐                │
       ▼                  ▼                │
┌────────────────┐ ┌─────────────────┐     │
│ RealSubject     │ │     Proxy        │────┘
├────────────────┤ ├─────────────────┤
│ + request()     │ │ - realSubject    │
└────────────────┘ │ + request()      │
                    └─────────────────┘
```

### Participants
- **Subject** — defines the common interface for RealSubject and Proxy
- **RealSubject** — defines the real object that the proxy represents
- **Proxy** — maintains a reference to the RealSubject; controls access to it

### Proxy Variants
| Variant | Purpose |
|---------|---------|
| **Virtual Proxy** | Lazy-loads expensive objects on first access |
| **Protection Proxy** | Controls access based on permissions |
| **Caching Proxy** | Caches results of expensive operations |
| **Logging Proxy** | Logs all operations for debugging/auditing |
| **Remote Proxy** | Represents an object in a different address space |

### When to Use
- You need lazy initialization (virtual proxy)
- You need access control (protection proxy)
- You need caching of expensive operations (caching proxy)
- You want to log or audit access to an object (logging proxy)

### TypeScript Example

```typescript
// Subject interface
interface WeatherService {
  getForecast(city: string): string;
}

// Real subject — expensive operation
class RealWeatherService implements WeatherService {
  getForecast(city: string): string {
    // Simulates an expensive API call
    console.log(`  [API] Fetching weather for ${city}...`);
    return `${city}: 72F, Sunny`;
  }
}

// Caching + Logging Proxy
class WeatherServiceProxy implements WeatherService {
  private cache = new Map<string, { data: string; expiry: number }>();
  private readonly TTL = 60_000; // 1 minute

  constructor(private service: RealWeatherService) {}

  getForecast(city: string): string {
    const cached = this.cache.get(city);
    if (cached && cached.expiry > Date.now()) {
      console.log(`  [Cache HIT] ${city}`);
      return cached.data;
    }

    console.log(`  [Cache MISS] ${city}`);
    const data = this.service.getForecast(city);
    this.cache.set(city, { data, expiry: Date.now() + this.TTL });
    return data;
  }
}

// Protection Proxy — access control layer
class AuthWeatherServiceProxy implements WeatherService {
  constructor(
    private service: WeatherService,
    private userRole: string
  ) {}

  getForecast(city: string): string {
    if (this.userRole !== "admin" && this.userRole !== "user") {
      throw new Error("Access denied: insufficient permissions");
    }
    return this.service.getForecast(city);
  }
}

// Usage — stack proxies
let service: WeatherService = new RealWeatherService();
service = new WeatherServiceProxy(service as RealWeatherService);
service = new AuthWeatherServiceProxy(service, "user");

console.log(service.getForecast("Seattle")); // Cache MISS -> API call
console.log(service.getForecast("Seattle")); // Cache HIT
```

---

## Comparison Table

| Pattern | Key Mechanism | Problem It Solves | Key Distinction |
|---------|--------------|-------------------|-----------------|
| **Adapter** | Wraps one interface into another | Incompatible interfaces | Changes the interface of an existing object |
| **Bridge** | Separates abstraction from implementation | Two independent dimensions of variation | Designed up-front to let abstraction and implementation vary |
| **Composite** | Tree of uniform components | Part-whole hierarchies | Lets clients treat single objects and compositions uniformly |
| **Decorator** | Wraps an object, adds behavior | Adding responsibilities dynamically | Adds behavior without changing the interface |
| **Facade** | Simplified interface to a subsystem | Complex subsystem with many classes | Provides a new, simpler interface |
| **Flyweight** | Shares intrinsic state | Too many fine-grained objects in memory | Reduces object count by sharing common parts |
| **Proxy** | Controls access to an object | Controlled access, caching, lazy loading | Same interface as the real object but controls access |

## Decision Guide

```
Do you need to compose or wrap objects?
│
├─ Make incompatible interfaces work together?
│  └──▶ Adapter
│
├─ Vary abstraction and implementation independently?
│  └──▶ Bridge
│
├─ Represent tree / part-whole hierarchies?
│  └──▶ Composite
│
├─ Add or remove behavior dynamically?
│  └──▶ Decorator
│
├─ Simplify a complex subsystem interface?
│  └──▶ Facade
│
├─ Reduce memory for many similar objects?
│  └──▶ Flyweight
│
└─ Control access, cache, or lazy-load?
   └──▶ Proxy
```

## Commonly Confused Pairs

### Adapter vs Facade
- **Adapter** makes an existing interface conform to another existing interface (1:1 wrapping)
- **Facade** creates a new simplified interface over multiple subsystem classes (1:many simplification)

### Decorator vs Proxy
- **Decorator** adds new behavior (the client knows it is decorating)
- **Proxy** controls access to existing behavior (the client treats it identically to the real object)

### Composite vs Decorator
- Both use recursive composition, but **Composite** aggregates children (one-to-many) while **Decorator** wraps a single component (one-to-one) to add behavior
