# Deno

## Overview
Deno is a modern runtime for JavaScript and TypeScript created by Ryan Dahl (the original creator of Node.js). It runs TypeScript natively without a build step, is secure by default with an explicit permissions system, and embraces web standard APIs (fetch, Request, Response, Web Crypto, Streams, etc.) as first-class citizens. Deno 2.x brings full backward compatibility with Node.js and npm, making it a practical drop-in alternative for existing projects while offering a more secure and ergonomic developer experience.

### Key Characteristics
| Feature | Description |
|---------|-------------|
| **TypeScript-first** | Runs `.ts` and `.tsx` files natively -- no `tsc`, `ts-node`, or build step required |
| **Secure by default** | No file, network, or environment access unless explicitly granted via permission flags |
| **Web standard APIs** | Uses `fetch`, `Request`, `Response`, `URL`, `ReadableStream`, `WritableStream`, `crypto.subtle`, and more |
| **Built-in tooling** | Formatter (`deno fmt`), linter (`deno lint`), test runner (`deno test`), bundler, documentation generator, and more |
| **Single executable** | Ships as a single binary with no external dependencies |
| **npm compatibility** | Deno 2.x supports `npm:` specifiers, `package.json`, and `node_modules` for full Node.js ecosystem access |

## Deno 2.x Features
Deno 2.x is a major release focused on backward compatibility with the Node.js and npm ecosystem while retaining Deno's security model and developer experience improvements.

| Feature | Details |
|---------|---------|
| **npm/Node compatibility** | Import any npm package via `npm:` specifier or `package.json` dependencies |
| **package.json support** | Deno reads `package.json` for dependencies, scripts, and configuration |
| **deno.json** | Project configuration file for imports, compiler options, tasks, formatting, linting, and more |
| **Long Term Support** | LTS releases for production stability |
| **Stabilized APIs** | `Deno.serve`, `Deno.openKv`, `Deno.cron`, and other APIs moved to stable |
| **Workspaces** | Monorepo support via `deno.json` workspaces field |
| **JSR registry** | First-class support for the JavaScript Registry (jsr.io) for publishing and consuming packages |
| **Private npm registries** | Support for private npm registries via `.npmrc` |

## Configuration

### deno.json / deno.jsonc
The `deno.json` (or `deno.jsonc` with comments) file is the central configuration file for Deno projects.

```jsonc
{
  // Compiler options (subset of tsconfig.json compilerOptions)
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "lib": ["deno.window", "deno.unstable"],
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },

  // Import map (inline) -- maps bare specifiers to URLs or npm packages
  "imports": {
    "@std/assert": "jsr:@std/assert@^1",
    "@std/path": "jsr:@std/path@^1",
    "@std/http": "jsr:@std/http@^1",
    "oak": "jsr:@oak/oak@^17",
    "zod": "npm:zod@^3",
    "express": "npm:express@^4"
  },

  // Alternative: external import map file
  // "importMap": "./import_map.json",

  // Task runner (like npm scripts)
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-read --allow-env main.ts",
    "start": "deno run --allow-net --allow-read --allow-env main.ts",
    "test": "deno test --allow-read --allow-net",
    "lint": "deno lint",
    "fmt": "deno fmt",
    "check": "deno check main.ts",
    "compile": "deno compile --allow-net --allow-read --output server main.ts"
  },

  // Formatter configuration
  "fmt": {
    "useTabs": false,
    "lineWidth": 100,
    "indentWidth": 2,
    "semiColons": true,
    "singleQuote": false,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["vendor/"]
  },

  // Linter configuration
  "lint": {
    "include": ["src/"],
    "exclude": ["generated/"],
    "rules": {
      "tags": ["recommended"],
      "include": ["no-unused-vars", "eqeqeq"],
      "exclude": ["no-explicit-any"]
    }
  },

  // Test configuration
  "test": {
    "include": ["tests/", "src/**/*_test.ts"],
    "exclude": ["tests/fixtures/"]
  },

  // Publish configuration (for JSR)
  "publish": {
    "include": ["src/", "README.md", "deno.json"],
    "exclude": ["src/testdata/"]
  },

  // Node modules directory (opt-in for npm compatibility)
  "nodeModulesDir": "auto",

  // Workspaces for monorepos
  "workspace": ["./packages/core", "./packages/cli"],

  // Lock file (enabled by default)
  "lock": true
}
```

## Permissions System
Deno is secure by default. All access to the file system, network, environment variables, subprocesses, and foreign function interfaces must be explicitly granted. Permissions are specified as CLI flags when running a script.

### Permission Flags
| Flag | Description | Granular Example |
|------|-------------|-----------------|
| `--allow-read` | File system read access | `--allow-read=/tmp,./data` |
| `--allow-write` | File system write access | `--allow-write=./output,/tmp` |
| `--allow-net` | Network access | `--allow-net=api.example.com,localhost:8080` |
| `--allow-env` | Environment variable access | `--allow-env=DATABASE_URL,API_KEY` |
| `--allow-run` | Subprocess execution | `--allow-run=git,deno` |
| `--allow-ffi` | Foreign function interface | `--allow-ffi=./libcrypto.so` |
| `--allow-sys` | System information access | `--allow-sys=osRelease,hostname` |
| `--allow-hrtime` | High-resolution time | (no granular options) |
| `--allow-all` / `-A` | Grant all permissions | (use only for development) |
| `--deny-read` | Explicitly deny read access | `--deny-read=/etc` |
| `--deny-write` | Explicitly deny write access | `--deny-write=/` |
| `--deny-net` | Explicitly deny network access | `--deny-net=evil.com` |

### Permission Examples
```bash
# Minimal permissions for a web server
deno run --allow-net=:8000 --allow-read=./static --allow-env=PORT server.ts

# Script that reads files and writes output
deno run --allow-read=./input --allow-write=./output transform.ts

# Development with all permissions
deno run -A main.ts

# Deny specific paths while allowing general access
deno run --allow-read --deny-read=/etc/passwd script.ts
```

### Runtime Permission Requests
```typescript
// Request permissions at runtime
const status = await Deno.permissions.request({ name: "read", path: "./data" });
if (status.state === "granted") {
  const data = await Deno.readTextFile("./data/config.json");
}

// Query current permission state
const netPerm = await Deno.permissions.query({ name: "net", host: "api.example.com" });
console.log(netPerm.state); // "granted" | "denied" | "prompt"

// Revoke a permission
await Deno.permissions.revoke({ name: "read", path: "./data" });
```

## Module System

### URL Imports
```typescript
// Import directly from URLs
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// Import from JSR (recommended)
import { assert } from "jsr:@std/assert@^1";
```

### Import Maps (via deno.json)
```jsonc
{
  "imports": {
    "@std/": "jsr:@std/",
    "oak": "jsr:@oak/oak@^17",
    "lodash": "npm:lodash@^4",
    "@/": "./src/"
  }
}
```

```typescript
// Use bare specifiers after import map configuration
import { assertEquals } from "@std/assert";
import { Application } from "oak";
import _ from "lodash";
import { helper } from "@/utils/helper.ts";
```

### npm: Specifier
```typescript
// Import npm packages directly with the npm: prefix
import express from "npm:express@^4";
import { z } from "npm:zod@^3";
import chalk from "npm:chalk@^5";
import _ from "npm:lodash-es@^4";
```

### node: Specifier
```typescript
// Import Node.js built-in modules with the node: prefix
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Buffer } from "node:buffer";
import { EventEmitter } from "node:events";
import process from "node:process";
```

### JSR Registry
```typescript
// JSR (jsr.io) is the modern registry for Deno and other runtimes
// Import from JSR in deno.json:
// "imports": { "@std/assert": "jsr:@std/assert@^1" }

// Or import directly:
import { assertEquals } from "jsr:@std/assert@^1";
import { Hono } from "jsr:@hono/hono@^4";

// Publish to JSR:
// deno publish
```

## Standard Library (@std/)
Deno's standard library is available on JSR under the `@std` scope. It provides reviewed, high-quality modules for common tasks.

### Key @std Modules
| Module | Import | Purpose |
|--------|--------|---------|
| `@std/fs` | `jsr:@std/fs` | File system utilities (walk, ensureDir, copy, move, exists) |
| `@std/path` | `jsr:@std/path` | Path manipulation (join, resolve, basename, extname, dirname) |
| `@std/http` | `jsr:@std/http` | HTTP utilities (file server, status codes, negotiation) |
| `@std/async` | `jsr:@std/async` | Async utilities (delay, debounce, pooledMap, retry, deadline) |
| `@std/testing` | `jsr:@std/testing` | Test utilities (BDD, mocking, snapshot, time) |
| `@std/assert` | `jsr:@std/assert` | Assertion functions (assertEquals, assertThrows, etc.) |
| `@std/fmt` | `jsr:@std/fmt` | Formatting (colors, printf, duration, bytes) |
| `@std/crypto` | `jsr:@std/crypto` | Cryptographic hashing beyond Web Crypto (BLAKE3, etc.) |
| `@std/streams` | `jsr:@std/streams` | Stream utilities (toText, toBlob, TextLineStream, etc.) |
| `@std/collections` | `jsr:@std/collections` | Collection utilities (groupBy, partition, chunk, zip, etc.) |
| `@std/dotenv` | `jsr:@std/dotenv` | Load environment variables from .env files |
| `@std/uuid` | `jsr:@std/uuid` | UUID generation and validation (v1, v4, v5) |
| `@std/encoding` | `jsr:@std/encoding` | Base64, hex, varint, and other encoding utilities |
| `@std/cli` | `jsr:@std/cli` | CLI argument parsing and prompt utilities |
| `@std/json` | `jsr:@std/json` | JSON streaming (JsonStringifyStream, JsonParseStream) |
| `@std/yaml` | `jsr:@std/yaml` | YAML parsing and stringifying |
| `@std/toml` | `jsr:@std/toml` | TOML parsing and stringifying |
| `@std/csv` | `jsr:@std/csv` | CSV parsing and stringifying |

### Standard Library Examples
```typescript
import { ensureDir, walk } from "@std/fs";
import { join, extname } from "@std/path";
import { delay, retry } from "@std/async";
import { groupBy, chunk } from "@std/collections";
import { load } from "@std/dotenv";
import { format } from "@std/fmt/duration";

// Ensure directory exists
await ensureDir("./output");

// Walk directory tree
for await (const entry of walk("./src", { exts: [".ts"] })) {
  console.log(entry.path);
}

// Retry with backoff
const data = await retry(async () => {
  const res = await fetch("https://api.example.com/data");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}, { maxAttempts: 3, minTimeout: 1000 });

// Group and chunk collections
const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Carol", role: "admin" },
];
const byRole = groupBy(users, (u) => u.role);
const batches = chunk(users, 2);

// Load .env file
const env = await load();
console.log(env["DATABASE_URL"]);
```

## Built-in Tools
Deno ships with a comprehensive set of built-in development tools that require no additional installation.

| Command | Purpose | Example |
|---------|---------|---------|
| `deno fmt` | Format TypeScript, JavaScript, JSON, and Markdown files | `deno fmt src/` |
| `deno lint` | Lint source files with built-in rules | `deno lint src/` |
| `deno test` | Run tests | `deno test --allow-read` |
| `deno bench` | Run benchmarks | `deno bench bench/` |
| `deno doc` | Generate documentation from JSDoc comments | `deno doc mod.ts` |
| `deno compile` | Compile to a standalone executable | `deno compile --output app main.ts` |
| `deno serve` | Serve an HTTP handler with automatic parallelism | `deno serve --port 8000 main.ts` |
| `deno task` | Run a task defined in `deno.json` | `deno task dev` |
| `deno jupyter` | Deno kernel for Jupyter notebooks | `deno jupyter --install` |
| `deno check` | Type-check without running | `deno check main.ts` |
| `deno info` | Show dependency tree and cache info | `deno info main.ts` |
| `deno install` | Install a script as a command or manage dependencies | `deno install` |
| `deno publish` | Publish a package to JSR | `deno publish` |
| `deno coverage` | Generate coverage reports from test runs | `deno coverage ./cov_profile` |
| `deno init` | Scaffold a new Deno project | `deno init my_project` |
| `deno add` | Add a dependency to deno.json | `deno add jsr:@std/assert` |
| `deno remove` | Remove a dependency from deno.json | `deno remove @std/assert` |

### deno fmt
```bash
# Format all supported files in the project
deno fmt

# Check formatting without modifying files
deno fmt --check

# Format specific files or directories
deno fmt src/ main.ts

# Format stdin
echo '   const x=1' | deno fmt -
```

### deno lint
```bash
# Lint all TypeScript/JavaScript files
deno lint

# Lint specific files
deno lint src/main.ts src/utils.ts

# List available rules
deno lint --rules
```

### deno test
```bash
# Run all tests
deno test

# Run with permissions
deno test --allow-read --allow-net

# Run specific test files
deno test tests/user_test.ts

# Filter tests by name
deno test --filter "should parse"

# Run with coverage
deno test --coverage=cov_profile
deno coverage cov_profile --lcov > coverage.lcov

# Watch mode
deno test --watch
```

### deno bench
```typescript
// bench/sort_bench.ts
Deno.bench("Array.sort", () => {
  const arr = [5, 3, 1, 4, 2];
  arr.sort();
});

Deno.bench({
  name: "URL parsing",
  fn: () => {
    new URL("https://example.com/path?q=1");
  },
});

Deno.bench({
  name: "async operation",
  fn: async () => {
    await new Promise((r) => setTimeout(r, 0));
  },
});
```

### deno compile
```bash
# Compile to a self-contained executable
deno compile --allow-net --allow-read --output myapp main.ts

# Cross-compile for different targets
deno compile --target x86_64-unknown-linux-gnu --output myapp-linux main.ts
deno compile --target x86_64-pc-windows-msvc --output myapp.exe main.ts
deno compile --target x86_64-apple-darwin --output myapp-mac main.ts
deno compile --target aarch64-apple-darwin --output myapp-mac-arm main.ts
```

### deno serve
```typescript
// main.ts -- export a default object with a fetch handler
export default {
  fetch(request: Request): Response {
    return new Response("Hello from Deno.serve!");
  },
};
```

```bash
# Serve with automatic parallelism across CPU cores
deno serve --port 8000 main.ts

# Serve with specific number of workers
deno serve --parallel --port 8000 main.ts
```

## HTTP Server

### Deno.serve (Recommended)
```typescript
// Basic server
Deno.serve({ port: 8000 }, (req: Request): Response => {
  return new Response("Hello, World!", {
    headers: { "content-type": "text/plain" },
  });
});

// With startup callback
Deno.serve({
  port: 8000,
  onListen: ({ port, hostname }) => {
    console.log(`Server running at http://${hostname}:${port}`);
  },
}, handler);

// Async handler
Deno.serve(async (req: Request): Promise<Response> => {
  const body = await req.json();
  return Response.json({ received: body });
});
```

### Routing Patterns
```typescript
Deno.serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // Simple path-based routing
  if (method === "GET" && path === "/") {
    return new Response("Home");
  }

  if (method === "GET" && path === "/api/users") {
    const users = [{ id: 1, name: "Alice" }];
    return Response.json(users);
  }

  if (method === "POST" && path === "/api/users") {
    const body = await req.json();
    return Response.json({ id: 2, ...body }, { status: 201 });
  }

  // URL pattern matching (URLPattern API)
  const userPattern = new URLPattern({ pathname: "/api/users/:id" });
  const userMatch = userPattern.exec(req.url);
  if (userMatch && method === "GET") {
    const id = userMatch.pathname.groups.id;
    return Response.json({ id, name: "Alice" });
  }

  return new Response("Not Found", { status: 404 });
});
```

### Middleware Pattern
```typescript
type Handler = (req: Request) => Response | Promise<Response>;
type Middleware = (req: Request, next: Handler) => Response | Promise<Response>;

function compose(...middlewares: Middleware[]): (handler: Handler) => Handler {
  return (handler: Handler) => {
    return middlewares.reduceRight<Handler>(
      (next, mw) => (req) => mw(req, next),
      handler,
    );
  };
}

// Logger middleware
const logger: Middleware = async (req, next) => {
  const start = performance.now();
  const res = await next(req);
  const ms = (performance.now() - start).toFixed(1);
  console.log(`${req.method} ${new URL(req.url).pathname} ${res.status} ${ms}ms`);
  return res;
};

// CORS middleware
const cors: Middleware = async (req, next) => {
  const res = await next(req);
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, { status: res.status, headers });
};

// Compose and serve
const app = compose(logger, cors)((req) => {
  return new Response("Hello!");
});

Deno.serve(app);
```

### Serving Static Files
```typescript
import { serveDir } from "@std/http/file-server";

Deno.serve((req: Request) => {
  const url = new URL(req.url);

  // Serve static files from ./public
  if (url.pathname.startsWith("/static")) {
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "static",
    });
  }

  return new Response("API endpoint");
});
```

## Web Standard APIs
Deno implements web standard APIs directly, so browser-compatible code often runs without modification.

### fetch
```typescript
// GET request
const res = await fetch("https://api.example.com/data");
const data = await res.json();

// POST request with JSON body
const res = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" }),
});

// POST with FormData
const formData = new FormData();
formData.append("file", new Blob(["content"]), "file.txt");
const res = await fetch("https://api.example.com/upload", {
  method: "POST",
  body: formData,
});

// Streaming response body
const res = await fetch("https://example.com/large-file");
const reader = res.body!.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log("Chunk:", value.length, "bytes");
}

// Abort controller
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const res = await fetch("https://slow-api.example.com", {
  signal: controller.signal,
});
```

### WebSocket
```typescript
// WebSocket server
Deno.serve((req) => {
  if (req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.addEventListener("open", () => {
      console.log("Client connected");
    });

    socket.addEventListener("message", (event) => {
      console.log("Received:", event.data);
      socket.send(`Echo: ${event.data}`);
    });

    socket.addEventListener("close", () => {
      console.log("Client disconnected");
    });

    return response;
  }

  return new Response("Not a WebSocket request", { status: 400 });
});

// WebSocket client
const ws = new WebSocket("ws://localhost:8000");
ws.onopen = () => ws.send("Hello");
ws.onmessage = (e) => console.log(e.data);
```

### Web Crypto
```typescript
// Generate a random UUID
const id = crypto.randomUUID();

// Generate random bytes
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);

// SHA-256 hashing
const data = new TextEncoder().encode("Hello, World!");
const hashBuffer = await crypto.subtle.digest("SHA-256", data);
const hashHex = [...new Uint8Array(hashBuffer)]
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

// HMAC signing
const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);
const signature = await crypto.subtle.sign("HMAC", key, data);

// AES-GCM encryption
const aesKey = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"],
);
const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  aesKey,
  data,
);
```

### Streams
```typescript
// ReadableStream
const readable = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello ");
    controller.enqueue("World");
    controller.close();
  },
});

// TransformStream
const uppercase = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(String(chunk).toUpperCase());
  },
});

// Pipe streams together
const result = readable.pipeThrough(uppercase);
const reader = result.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value);
}

// WritableStream
const writable = new WritableStream({
  write(chunk) {
    console.log("Writing:", chunk);
  },
  close() {
    console.log("Stream closed");
  },
});

// Stream a response body
Deno.serve(() => {
  const body = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        controller.enqueue(new TextEncoder().encode(`data: ${i}\n\n`));
        await new Promise((r) => setTimeout(r, 1000));
      }
      controller.close();
    },
  });

  return new Response(body, {
    headers: { "content-type": "text/event-stream" },
  });
});
```

### Other Web APIs
```typescript
// URL and URLSearchParams
const url = new URL("https://example.com/path?a=1&b=2");
url.searchParams.set("page", "3");
console.log(url.toString());

// URLPattern
const pattern = new URLPattern({ pathname: "/users/:id" });
const match = pattern.exec("https://example.com/users/42");
console.log(match?.pathname.groups.id); // "42"

// Headers
const headers = new Headers();
headers.set("Content-Type", "application/json");
headers.append("Accept", "text/html");

// FormData
const form = new FormData();
form.append("name", "Alice");
form.append("file", new Blob(["data"]), "file.txt");

// TextEncoder / TextDecoder
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const encoded = encoder.encode("Hello");
const decoded = decoder.decode(encoded);

// structuredClone (deep copy)
const original = { nested: { value: 42 } };
const clone = structuredClone(original);

// Performance API
const start = performance.now();
// ... work ...
const elapsed = performance.now() - start;

// BroadcastChannel (cross-worker communication)
const channel = new BroadcastChannel("updates");
channel.postMessage({ type: "refresh" });
channel.onmessage = (event) => console.log(event.data);
```

## File System APIs

### Reading Files
```typescript
// Read entire file as text
const text = await Deno.readTextFile("./config.json");
const config = JSON.parse(text);

// Read as bytes
const bytes = await Deno.readFile("./image.png");

// Synchronous variants
const textSync = Deno.readTextFileSync("./config.json");
const bytesSync = Deno.readFileSync("./image.png");
```

### Writing Files
```typescript
// Write text file
await Deno.writeTextFile("./output.txt", "Hello, World!");

// Write with options
await Deno.writeTextFile("./log.txt", "New entry\n", { append: true });

// Write bytes
const data = new Uint8Array([72, 101, 108, 108, 111]);
await Deno.writeFile("./binary.dat", data);

// Write with create and permissions
await Deno.writeFile("./secure.dat", data, { mode: 0o600, create: true });
```

### Directory Operations
```typescript
// Read directory contents
for await (const entry of Deno.readDir("./src")) {
  console.log(entry.name, entry.isFile, entry.isDirectory, entry.isSymlink);
}

// Create directory
await Deno.mkdir("./output", { recursive: true });

// Remove file or directory
await Deno.remove("./temp.txt");
await Deno.remove("./temp-dir", { recursive: true });

// Rename / move
await Deno.rename("./old.txt", "./new.txt");

// Copy (using @std/fs)
import { copy } from "@std/fs";
await copy("./source", "./destination", { overwrite: true });
```

### File Info and Metadata
```typescript
// Get file/directory info
const stat = await Deno.stat("./file.txt");
console.log(stat.isFile);       // true
console.log(stat.isDirectory);  // false
console.log(stat.size);         // bytes
console.log(stat.mtime);        // modification time (Date | null)

// Check if path exists (using lstat to not follow symlinks)
try {
  await Deno.lstat("./maybe-exists.txt");
  console.log("Exists");
} catch (e) {
  if (e instanceof Deno.errors.NotFound) {
    console.log("Does not exist");
  }
}

// Or using @std/fs
import { exists } from "@std/fs";
if (await exists("./file.txt")) {
  // file exists
}
```

### Low-Level File API (Deno.open)
```typescript
// Open for reading
const file = await Deno.open("./data.txt", { read: true });
const buf = new Uint8Array(1024);
const bytesRead = await file.read(buf);
file.close();

// Open for writing
const outFile = await Deno.open("./output.txt", { write: true, create: true, truncate: true });
const encoder = new TextEncoder();
await outFile.write(encoder.encode("Hello, World!"));
outFile.close();

// Seek within a file
const seekFile = await Deno.open("./large.bin", { read: true });
await seekFile.seek(1024, Deno.SeekMode.Start);
const chunk = new Uint8Array(256);
await seekFile.read(chunk);
seekFile.close();

// Use with resources (using declaration for auto-close)
using file = await Deno.open("./data.txt", { read: true });
const content = await file.readable.getReader().read();
// file is automatically closed when scope exits
```

## Testing

### Deno.test
```typescript
// Basic test
Deno.test("addition works", () => {
  const result = 2 + 2;
  if (result !== 4) throw new Error("Math is broken");
});

// Async test
Deno.test("fetch works", async () => {
  const res = await fetch("https://api.example.com/health");
  if (!res.ok) throw new Error("API is down");
});

// Test with permissions
Deno.test({
  name: "reads file",
  permissions: { read: true },
  fn: async () => {
    const text = await Deno.readTextFile("./testdata/fixture.txt");
    if (!text.includes("expected")) throw new Error("Missing content");
  },
});

// Test with sanitizers
Deno.test({
  name: "no leaking resources",
  sanitizeResources: true,  // default: true -- ensures all resources are closed
  sanitizeOps: true,        // default: true -- ensures all async ops complete
  fn: async () => {
    // test code
  },
});

// Nested test steps
Deno.test("user operations", async (t) => {
  await t.step("create user", async () => {
    // test creation
  });

  await t.step("update user", async () => {
    // test update
  });

  await t.step("delete user", async () => {
    // test deletion
  });
});

// Ignoring and focusing tests
Deno.test({ name: "skip this", ignore: true, fn: () => {} });
Deno.test({ name: "only run this", only: true, fn: () => {} });
```

### BDD Style (describe/it from @std/testing)
```typescript
import { describe, it, beforeEach, afterEach, beforeAll, afterAll } from "@std/testing/bdd";
import { assertEquals, assertThrows, assertRejects } from "@std/assert";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    service.cleanup();
  });

  describe("createUser", () => {
    it("should create a user with valid data", async () => {
      const user = await service.createUser({ name: "Alice", email: "alice@test.com" });
      assertEquals(user.name, "Alice");
      assertEquals(user.email, "alice@test.com");
    });

    it("should throw on invalid email", () => {
      assertThrows(
        () => service.createUserSync({ name: "Alice", email: "invalid" }),
        Error,
        "Invalid email",
      );
    });

    it("should reject on duplicate email", async () => {
      await service.createUser({ name: "Alice", email: "alice@test.com" });
      await assertRejects(
        () => service.createUser({ name: "Bob", email: "alice@test.com" }),
        Error,
        "Email already exists",
      );
    });
  });
});
```

### Assertions from @std/assert
```typescript
import {
  assert,
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertArrayIncludes,
  assertMatch,
  assertThrows,
  assertRejects,
  assertExists,
  assertInstanceOf,
  assertObjectMatch,
  unreachable,
} from "@std/assert";

// Value assertions
assert(true);
assertEquals({ a: 1 }, { a: 1 });           // Deep equality
assertNotEquals("a", "b");
assertStrictEquals(1, 1);                     // Reference/strict equality
assertStringIncludes("hello world", "world");
assertArrayIncludes([1, 2, 3], [2, 3]);
assertMatch("hello123", /\w+\d+/);
assertExists(value);                          // not null or undefined
assertInstanceOf(error, TypeError);
assertObjectMatch({ a: 1, b: 2 }, { a: 1 }); // Partial match

// Error assertions
assertThrows(() => { throw new Error("fail"); }, Error, "fail");
await assertRejects(async () => { throw new Error("async fail"); }, Error, "async fail");
```

### Mocking
```typescript
import { stub, spy, returnsNext, assertSpyCalls, assertSpyCallArgs } from "@std/testing/mock";

// Spies -- observe calls without changing behavior
Deno.test("spy example", () => {
  const log = spy(console, "log");

  console.log("hello");
  console.log("world");

  assertSpyCalls(log, 2);
  assertSpyCallArgs(log, 0, ["hello"]);
  assertSpyCallArgs(log, 1, ["world"]);

  log.restore();
});

// Stubs -- replace behavior
Deno.test("stub example", () => {
  const randomStub = stub(Math, "random", returnsNext([0.1, 0.5, 0.9]));

  assertEquals(Math.random(), 0.1);
  assertEquals(Math.random(), 0.5);
  assertEquals(Math.random(), 0.9);

  randomStub.restore();
});

// Fake time
import { FakeTime } from "@std/testing/time";

Deno.test("fake time", () => {
  using time = new FakeTime();

  let called = false;
  setTimeout(() => { called = true; }, 1000);

  time.tick(999);
  assertEquals(called, false);

  time.tick(1);
  assertEquals(called, true);
});
```

### Snapshot Testing
```typescript
import { assertSnapshot } from "@std/testing/snapshot";

Deno.test("snapshot test", async (t) => {
  const user = { id: 1, name: "Alice", role: "admin" };
  await assertSnapshot(t, user);
});

// Update snapshots: deno test --allow-read --allow-write -- --update
```

### Coverage
```bash
# Run tests with coverage collection
deno test --coverage=cov_profile

# Generate LCOV report
deno coverage cov_profile --lcov > coverage.lcov

# Generate HTML report
deno coverage cov_profile --html

# View summary in terminal
deno coverage cov_profile
```

## npm Compatibility

### Importing npm Packages
```typescript
// Using npm: specifier (no installation needed)
import express from "npm:express@^4";
import { PrismaClient } from "npm:@prisma/client@^5";
import { z } from "npm:zod@^3";

// Using import map in deno.json
// "imports": { "express": "npm:express@^4" }
import express from "express";
```

### package.json Support
```json
{
  "name": "my-deno-app",
  "dependencies": {
    "express": "^4.18.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0"
  }
}
```

```typescript
// Deno reads package.json automatically and resolves dependencies
import express from "express";
import { z } from "zod";

const app = express();
app.get("/", (req, res) => res.json({ ok: true }));
app.listen(3000);
```

### node_modules
```jsonc
// deno.json -- opt into node_modules directory
{
  "nodeModulesDir": "auto"
}
```

```bash
# Install dependencies from package.json into node_modules
deno install

# Or run directly (Deno creates node_modules automatically with nodeModulesDir: "auto")
deno run --allow-net --allow-read --allow-env main.ts
```

### Node API Polyfills
Deno provides polyfills for most Node.js built-in modules:

| Node Module | Support | Notes |
|-------------|---------|-------|
| `node:fs` / `node:fs/promises` | Full | File system operations |
| `node:path` | Full | Path manipulation |
| `node:http` / `node:https` | Full | HTTP server and client |
| `node:crypto` | Full | Cryptographic functions |
| `node:buffer` | Full | Buffer class |
| `node:stream` | Full | Stream classes |
| `node:events` | Full | EventEmitter |
| `node:process` | Full | Process object and env |
| `node:os` | Full | OS information |
| `node:util` | Full | Utility functions |
| `node:url` | Full | URL parsing |
| `node:net` | Full | TCP networking |
| `node:child_process` | Full | Subprocess management |
| `node:worker_threads` | Full | Worker threads |
| `node:assert` | Full | Assertion testing |

## Deno Deploy

### Overview
Deno Deploy is an edge computing platform that runs Deno code globally on V8 isolates. It provides zero-config deployments, automatic HTTPS, and globally distributed execution.

### Edge Functions with Deno.serve
```typescript
// main.ts -- deployed to Deno Deploy
Deno.serve((req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/hello") {
    return Response.json({
      message: "Hello from the edge!",
      region: Deno.env.get("DENO_REGION"),
    });
  }

  return new Response("Not Found", { status: 404 });
});
```

### Deno KV on Deploy
```typescript
// KV is available on Deno Deploy with automatic global replication
const kv = await Deno.openKv();

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/api/visits") {
    const entry = await kv.get(["visits"]);
    return Response.json({ visits: entry.value ?? 0 });
  }

  if (req.method === "POST" && url.pathname === "/api/visits") {
    await kv.atomic()
      .sum(["visits"], 1n)
      .commit();
    return Response.json({ incremented: true });
  }

  return new Response("Not Found", { status: 404 });
});
```

### BroadcastChannel on Deploy
```typescript
// Cross-isolate communication on Deno Deploy
const channel = new BroadcastChannel("chat");

channel.onmessage = (event: MessageEvent) => {
  console.log("Received:", event.data);
};

Deno.serve(async (req: Request) => {
  if (req.method === "POST") {
    const body = await req.json();
    channel.postMessage(body);
    return Response.json({ sent: true });
  }
  return new Response("Send a POST request");
});
```

### Cron on Deploy
```typescript
// Scheduled tasks on Deno Deploy
Deno.cron("cleanup", "0 0 * * *", async () => {
  // Runs daily at midnight UTC
  const kv = await Deno.openKv();
  const entries = kv.list({ prefix: ["temp"] });
  for await (const entry of entries) {
    await kv.delete(entry.key);
  }
  console.log("Cleanup complete");
});

Deno.cron("health check", "*/5 * * * *", async () => {
  // Runs every 5 minutes
  const res = await fetch("https://api.example.com/health");
  if (!res.ok) {
    console.error("Health check failed:", res.status);
  }
});
```

## Deno KV

### Overview
Deno KV is a built-in key-value store that works both locally (backed by SQLite) and on Deno Deploy (globally replicated). Keys are arrays of `Deno.KvKeyPart` values (strings, numbers, booleans, Uint8Arrays, bigints).

### CRUD Operations
```typescript
const kv = await Deno.openKv();

// Create / Update (set)
await kv.set(["users", "alice"], { name: "Alice", email: "alice@example.com" });
await kv.set(["users", "bob"], { name: "Bob", email: "bob@example.com" });

// Read (get)
const entry = await kv.get<{ name: string; email: string }>(["users", "alice"]);
console.log(entry.key);       // ["users", "alice"]
console.log(entry.value);     // { name: "Alice", email: "alice@example.com" }
console.log(entry.versionstamp); // version for optimistic concurrency

// Read multiple keys at once
const [alice, bob] = await kv.getMany([
  ["users", "alice"],
  ["users", "bob"],
]);

// List entries by prefix
const users = kv.list<{ name: string }>({ prefix: ["users"] });
for await (const entry of users) {
  console.log(entry.key, entry.value);
}

// List with options
const paged = kv.list({ prefix: ["users"] }, { limit: 10, reverse: true });

// Delete
await kv.delete(["users", "alice"]);
```

### Atomic Transactions
```typescript
const kv = await Deno.openKv();

// Atomic operations with version checks (optimistic concurrency)
const entry = await kv.get(["account", "alice"]);
const result = await kv.atomic()
  .check(entry) // Fails if entry has been modified since read
  .set(["account", "alice"], { ...entry.value, balance: entry.value.balance - 100 })
  .set(["account", "bob"], { balance: bobBalance + 100 })
  .commit();

if (!result.ok) {
  console.log("Transaction failed due to conflict, retry needed");
}

// Atomic sum (counter increment)
await kv.atomic()
  .sum(["pageviews", "home"], 1n)
  .commit();

// Atomic min/max
await kv.atomic()
  .min(["stats", "min_latency"], 42n)
  .max(["stats", "max_latency"], 150n)
  .commit();

// Multiple operations in one atomic block
await kv.atomic()
  .set(["orders", orderId], order)
  .set(["orders_by_user", userId, orderId], order)
  .set(["orders_by_date", date, orderId], order)
  .sum(["stats", "order_count"], 1n)
  .commit();
```

### Queues
```typescript
const kv = await Deno.openKv();

// Enqueue a message
await kv.enqueue({ type: "send_email", to: "alice@example.com", subject: "Welcome" });

// Enqueue with delay
await kv.enqueue(
  { type: "reminder", userId: "alice" },
  { delay: 60000 }, // 60 seconds delay
);

// Enqueue within an atomic transaction
await kv.atomic()
  .set(["orders", orderId], order)
  .enqueue({ type: "process_order", orderId })
  .commit();

// Listen for queue messages
kv.listenQueue(async (message: unknown) => {
  const msg = message as { type: string; [key: string]: unknown };
  switch (msg.type) {
    case "send_email":
      await sendEmail(msg.to as string, msg.subject as string);
      break;
    case "process_order":
      await processOrder(msg.orderId as string);
      break;
  }
});
```

### Watch
```typescript
const kv = await Deno.openKv();

// Watch for changes to specific keys
const stream = kv.watch([
  ["config", "feature_flags"],
  ["config", "maintenance_mode"],
]);

for await (const entries of stream) {
  const [flags, maintenance] = entries;
  console.log("Feature flags:", flags.value);
  console.log("Maintenance mode:", maintenance.value);
}
```

## Fresh Framework

### Overview
Fresh is Deno's official full-stack web framework. It uses Islands Architecture for selective client-side hydration, Preact for rendering, and file-based routing. Pages are server-rendered by default with zero JavaScript shipped to the client unless an Island component is used.

### Project Structure
```
fresh-project/
├── deno.json
├── main.ts              # Entry point
├── dev.ts               # Development entry point
├── fresh.gen.ts         # Auto-generated manifest
├── routes/
│   ├── _app.tsx         # App wrapper (layout)
│   ├── _layout.tsx      # Shared layout
│   ├── _middleware.ts   # Route middleware
│   ├── index.tsx        # / route
│   ├── about.tsx        # /about route
│   ├── api/
│   │   └── users.ts    # /api/users API route
│   └── users/
│       └── [id].tsx     # /users/:id dynamic route
├── islands/
│   └── Counter.tsx      # Interactive island component
├── components/
│   └── Button.tsx       # Static server components
└── static/
    └── styles.css       # Static assets
```

### Route Handler
```tsx
// routes/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";

interface Data {
  message: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const data: Data = { message: "Hello from Fresh!" };
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <h1>{data.message}</h1>
      <Counter start={0} />
    </div>
  );
}
```

### Island Component
```tsx
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

interface CounterProps {
  start: number;
}

export default function Counter({ start }: CounterProps) {
  const count = useSignal(start);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count.value++}>+1</button>
      <button onClick={() => count.value--}>-1</button>
    </div>
  );
}
```

### API Route
```typescript
// routes/api/users.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const users = [{ id: 1, name: "Alice" }];
    return new Response(JSON.stringify(users), {
      headers: { "content-type": "application/json" },
    });
  },
  async POST(req, _ctx) {
    const body = await req.json();
    return new Response(JSON.stringify({ id: 2, ...body }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  },
};
```

## Oak Framework

### Overview
Oak is a middleware framework for Deno inspired by Koa (and Express). It provides a familiar middleware pipeline, router, and request/response abstractions for building HTTP servers.

### Basic Application
```typescript
import { Application, Router } from "jsr:@oak/oak@^17";

const app = new Application();
const router = new Router();

// Logger middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url.pathname} - ${ms}ms`);
});

// Routes
router.get("/", (ctx) => {
  ctx.response.body = { message: "Hello from Oak!" };
});

router.get("/users", (ctx) => {
  ctx.response.body = [{ id: 1, name: "Alice" }];
});

router.get("/users/:id", (ctx) => {
  const id = ctx.params.id;
  ctx.response.body = { id, name: "Alice" };
});

router.post("/users", async (ctx) => {
  const body = await ctx.request.body.json();
  ctx.response.status = 201;
  ctx.response.body = { id: 2, ...body };
});

// Apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
app.listen({ port: 8000 });
console.log("Oak server running on http://localhost:8000");
```

### Middleware
```typescript
import { Application, isHttpError, Status } from "jsr:@oak/oak@^17";

const app = new Application();

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      ctx.response.status = err.status;
      ctx.response.body = { error: err.message };
    } else {
      ctx.response.status = Status.InternalServerError;
      ctx.response.body = { error: "Internal Server Error" };
      console.error(err);
    }
  }
});

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});
```

### Static File Serving with Oak
```typescript
import { Application, send } from "jsr:@oak/oak@^17";

const app = new Application();

// Serve static files from ./public
app.use(async (ctx, next) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});
```

## Comparison with Node.js and Bun

| Feature | Deno | Node.js | Bun |
|---------|------|---------|-----|
| **TypeScript support** | Native, zero config | Requires transpilation (`tsc`, `tsx`, `ts-node`) | Native, zero config |
| **Security model** | Secure by default, explicit permissions | No sandbox, full system access | No sandbox, full system access |
| **Standard library** | Comprehensive `@std/` on JSR | Minimal built-in, relies on npm | Minimal built-in, relies on npm |
| **Package manager** | Built-in (deno add, deno install) | npm, yarn, pnpm (separate tools) | Built-in (bun install, fastest) |
| **Module system** | ESM-first, URL imports, import maps | CJS + ESM (dual system complexity) | ESM + CJS |
| **npm compatibility** | Full via `npm:` specifier and package.json (Deno 2.x) | Native | Native |
| **Built-in formatter** | `deno fmt` (Prettier-compatible) | None (use Prettier) | None (use Prettier) |
| **Built-in linter** | `deno lint` | None (use ESLint) | None (use ESLint) |
| **Built-in test runner** | `deno test` | `node --test` (basic) | `bun test` (Jest-compatible) |
| **Built-in benchmarking** | `deno bench` | None | None |
| **HTTP server** | `Deno.serve` (web standard) | `http.createServer` or frameworks | `Bun.serve` |
| **Web standard APIs** | Comprehensive (fetch, WebSocket, Web Crypto, Streams) | Partial (fetch in v18+, Web Crypto) | Comprehensive |
| **Cold start time** | Fast | Moderate | Fastest |
| **Edge/Deploy platform** | Deno Deploy | Various (Vercel, AWS Lambda, etc.) | None (self-hosted) |
| **Key-value store** | Built-in Deno KV | None built-in | Built-in Bun SQLite |
| **Single executable compile** | `deno compile` | `pkg`, `nexe`, or SEA (Node 20+) | `bun build --compile` |
| **Ecosystem size** | Full npm access + JSR | Largest (npm) | Full npm access |
| **REPL** | `deno` (with TypeScript) | `node` | `bun` |
| **Jupyter support** | `deno jupyter` | Via third-party kernels | None |

### When to Choose Deno Over Node.js
- You want native TypeScript with zero build configuration.
- Security is a priority and you need sandboxed execution with explicit permissions.
- You prefer web standard APIs (`fetch`, `Request`, `Response`, `Streams`) over Node-specific APIs.
- You want built-in formatting, linting, and testing without installing additional tools.
- You are deploying edge functions to Deno Deploy.
- You need a built-in key-value store (Deno KV).
- You want URL-based imports and a single lockfile without `node_modules` (optional).

### When to Choose Node.js Over Deno
- Your project has deep dependencies on Node.js-specific APIs or native addons (`.node` files).
- You need maximum compatibility with the npm ecosystem (though Deno 2.x closes this gap significantly).
- Your team and deployment infrastructure are built around Node.js tooling.
- You rely on Node.js-specific frameworks like Express middleware ecosystem or NestJS decorators.

### When to Choose Bun Over Deno
- Raw startup speed and throughput are the top priority.
- You want the fastest possible package manager for large `node_modules`.
- You need a Jest-compatible test runner with minimal migration.

## Best Practices

1. **Use explicit permissions** -- always specify the minimum required permissions instead of using `--allow-all` in production. Use granular paths and hosts.
   ```bash
   # Production
   deno run --allow-net=api.example.com:443 --allow-read=./config --allow-env=DATABASE_URL server.ts
   ```

2. **Use `deno.json` for project configuration** -- centralize imports, tasks, compiler options, and tool settings in a single configuration file.

3. **Prefer JSR (`jsr:`) over URL imports** -- the JSR registry provides versioned, documented packages with TypeScript-first support. Use `deno add` to manage dependencies.
   ```bash
   deno add jsr:@std/assert jsr:@oak/oak
   ```

4. **Use import maps for bare specifiers** -- define import maps in `deno.json` to avoid verbose URLs in source code.

5. **Use `Deno.serve` for HTTP servers** -- it provides automatic parallelism, follows web standards, and is the recommended HTTP server API.

6. **Run `deno fmt` and `deno lint` in CI** -- use the built-in formatter and linter as part of your continuous integration pipeline.
   ```bash
   deno fmt --check && deno lint && deno test --allow-read --allow-net
   ```

7. **Use `deno check` for type checking** -- run type checking separately from execution, especially in CI pipelines.

8. **Lock dependencies** -- use the built-in lock file (`deno.lock`) to ensure reproducible builds. It is enabled by default.

9. **Use `using` declarations for resource management** -- Deno supports the TC39 Explicit Resource Management proposal for automatic cleanup.
   ```typescript
   using file = await Deno.open("./data.txt");
   // file is automatically closed when scope exits
   ```

10. **Prefer `@std/` modules over third-party alternatives** -- the standard library is reviewed, tested, and maintained by the Deno team.

11. **Use Deno KV for simple data persistence** -- it works locally (SQLite) and on Deno Deploy (globally replicated) with the same API.

12. **Use `deno compile` for distribution** -- compile your application to a self-contained executable for easy deployment without requiring the Deno runtime on the target machine.

13. **Structure tests alongside source files** -- Deno conventionally uses `_test.ts` suffix or a `tests/` directory. Use `deno test --coverage` to track coverage.

14. **Use `deno task` instead of Makefiles or npm scripts** -- define project tasks in `deno.json` for a consistent developer experience.

15. **Migrate from Node.js incrementally** -- Deno 2.x supports `package.json` and `node_modules`, so you can migrate existing projects file by file while keeping npm dependencies working.
