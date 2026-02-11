# TypeScript Runtimes

## Overview

The JavaScript/TypeScript server-side runtime ecosystem has evolved from a single dominant platform (Node.js) into a competitive landscape with three major runtimes: Node.js, Deno, and Bun. Each offers native or near-native TypeScript support, but they differ significantly in their security models, standard libraries, tooling philosophies, and deployment targets. This skill provides a high-level comparison to help choose the right runtime for a given project.

All three runtimes execute JavaScript via high-performance engines (V8 for Node.js and Deno, JavaScriptCore for Bun) and support modern ECMAScript features, async/await, and the event-driven programming model that defines server-side JavaScript.

## Runtime Comparison

| Feature | Node.js | Deno | Bun |
|---------|---------|------|-----|
| **Engine** | V8 (C++) | V8 (Rust) | JavaScriptCore (Zig/C++) |
| **TypeScript support** | Via transpiler (`tsx`, `ts-node`, `swc`, `esbuild`); experimental `--experimental-strip-types` in Node 22+ | Native -- runs `.ts` files with zero config | Native -- runs `.ts` files with zero config |
| **Package manager** | npm, yarn, pnpm (external tools) | Built-in (`deno add`, `deno install`) | Built-in (`bun install` -- fastest available) |
| **Security model** | No sandbox; full system access by default; experimental `--experimental-permission` in Node 20+ | Secure by default; explicit permission flags (`--allow-read`, `--allow-net`, etc.) | No sandbox; full system access by default |
| **Standard library** | Core modules (`fs`, `path`, `http`, `crypto`, etc.) | Comprehensive `@std/` on JSR (fs, path, http, async, testing, etc.) | Minimal; relies on npm ecosystem and Node.js compat |
| **npm compatibility** | Native (the canonical npm runtime) | Full via `npm:` specifier and `package.json` (Deno 2.x) | Native; drop-in Node.js replacement for most packages |
| **Module system** | CommonJS + ESM (dual system) | ESM-only; URL imports, import maps, JSR | ESM + CommonJS (transparent interop) |
| **HTTP server** | `http.createServer`, `http2` module | `Deno.serve` (web standard Request/Response) | `Bun.serve` (optimized, web standard Request/Response) |
| **Test runner** | Built-in `node --test` (basic, Node 18+) | Built-in `deno test` (full-featured, BDD, mocking, snapshots, coverage) | Built-in `bun test` (Jest-compatible API) |
| **Bundler** | None built-in (use esbuild, Vite, webpack, Rollup) | Built-in `deno bundle` (deprecated in favor of esbuild/Rollup) | Built-in `bun build` (fast, esbuild-compatible API) |
| **Formatter** | None built-in (use Prettier) | Built-in `deno fmt` | None built-in (use Prettier) |
| **Linter** | None built-in (use ESLint) | Built-in `deno lint` | None built-in (use ESLint) |
| **Edge deployment** | Various (Vercel, AWS Lambda, Cloudflare via adapters) | Deno Deploy (V8 isolates, global edge network) | None (self-hosted or via adapters) |
| **Single executable** | `--experimental-sea-config` (Node 20+) | `deno compile` (cross-platform) | `bun build --compile` |
| **Web standard APIs** | Partial (`fetch` in v18+, `crypto.subtle`, `AbortController`) | Comprehensive (`fetch`, `Request`, `Response`, Web Crypto, Streams, `URLPattern`, `BroadcastChannel`) | Comprehensive (`fetch`, `Request`, `Response`, Web Crypto, Streams) |
| **Watch mode** | `--watch` (Node 18+) | `--watch` flag on most commands | `--watch` flag |
| **REPL** | `node` | `deno` (TypeScript-aware) | `bun` |
| **Startup speed** | Moderate | Fast | Fastest |
| **Ecosystem size** | Largest (millions of npm packages) | Full npm access + JSR | Full npm access |
| **Maturity** | Most mature (since 2009) | Stable (since 2018, 2.x since 2024) | Rapidly maturing (since 2022, 1.0 in 2023) |

## Choosing a Runtime

### Choose Node.js When

- **Maximum ecosystem compatibility matters.** Node.js is the canonical npm runtime. Every npm package is designed and tested against Node.js first. Native addons (`.node` files compiled via `node-gyp` or N-API) only work in Node.js.
- **Your infrastructure is built around Node.js.** Existing CI/CD pipelines, Docker images, monitoring tools, and deployment platforms assume Node.js.
- **You need enterprise-grade frameworks.** NestJS, Express, Fastify, and the broader middleware ecosystem are most mature on Node.js.
- **Long-term support and stability are critical.** Node.js has a well-defined LTS schedule with predictable release cycles (even-numbered releases receive 30 months of LTS support).
- **Your team has deep Node.js expertise.** The debugging tools, profiling workflows, and operational knowledge are well established.

### Choose Deno When

- **Security is a priority.** Deno's explicit permission model prevents unauthorized file, network, and environment access by default.
- **You want zero-config TypeScript.** Deno runs `.ts` files natively with no transpilation step, no `tsconfig.json` required, and a built-in LSP.
- **You prefer web standard APIs.** Deno's API surface mirrors the browser (`fetch`, `Request`, `Response`, `ReadableStream`, `crypto.subtle`) making code portable between server and edge.
- **You want built-in tooling.** Formatter, linter, test runner, benchmarking, and documentation generation are all included.
- **You are deploying to Deno Deploy.** The Deno Deploy edge platform provides globally distributed V8 isolates with Deno KV for data persistence.
- **You want a modern module system.** ESM-only with import maps eliminates the CJS/ESM dual-module confusion.

### Choose Bun When

- **Startup speed and throughput are paramount.** Bun's JavaScriptCore engine and Zig implementation deliver the fastest cold starts and HTTP throughput among the three runtimes.
- **You want an all-in-one tool.** Bun combines runtime, package manager, bundler, and test runner into a single binary.
- **You need the fastest package manager.** `bun install` is significantly faster than npm, yarn, or pnpm for both clean installs and cached installs.
- **You want Jest-compatible testing without config.** `bun test` implements the Jest API natively, allowing existing test suites to run with minimal changes.
- **You are building performance-sensitive applications.** Bun's optimized HTTP server, SQLite bindings, and file I/O are designed for maximum throughput.
- **You need a drop-in Node.js replacement.** Bun aims for full Node.js API compatibility and can run most Node.js projects without modification.

### Decision Matrix

| Scenario | Recommended Runtime | Reason |
|----------|-------------------|--------|
| Enterprise REST API with Express/NestJS | **Node.js** | Widest framework support and deployment options |
| New TypeScript project with security requirements | **Deno** | Secure by default, native TypeScript, built-in tools |
| Edge functions with global data persistence | **Deno** | Deno Deploy + Deno KV |
| High-throughput microservice | **Bun** | Fastest HTTP server and startup time |
| Monorepo with many packages needing fast installs | **Bun** | Fastest package manager |
| CLI tool distributed as single binary | **Deno** or **Bun** | Both offer excellent single-executable compilation |
| Legacy Node.js project maintenance | **Node.js** | No migration risk |
| Greenfield full-stack web app | **Deno** or **Node.js** | Deno for Fresh/modern stack; Node.js for Next.js/Remix |
| Script/automation with minimal setup | **Deno** or **Bun** | Both run TypeScript with zero config |
| Jupyter notebook data exploration | **Deno** | Built-in `deno jupyter` kernel |

## Multi-Runtime Development

### Writing Runtime-Agnostic Code

Code that targets multiple runtimes should rely on web standard APIs and avoid runtime-specific globals.

```typescript
// Portable HTTP handler -- works in Node.js (with adapter), Deno, and Bun
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/hello") {
      return Response.json({ message: "Hello, World!" });
    }

    return new Response("Not Found", { status: 404 });
  },
};
```

### Shared APIs Across Runtimes

| API | Node.js | Deno | Bun |
|-----|---------|------|-----|
| `fetch` | v18+ (global) | Always available | Always available |
| `Request` / `Response` | v18+ (global) | Always available | Always available |
| `URL` / `URLSearchParams` | v10+ (global) | Always available | Always available |
| `AbortController` | v15+ (global) | Always available | Always available |
| `crypto.subtle` | v15+ (`globalThis.crypto`) | Always available | Always available |
| `ReadableStream` / `WritableStream` | v18+ (global) | Always available | Always available |
| `TextEncoder` / `TextDecoder` | v11+ (global) | Always available | Always available |
| `structuredClone` | v17+ (global) | Always available | Always available |
| `performance.now()` | v8+ (`perf_hooks` or global) | Always available | Always available |
| `setTimeout` / `setInterval` | Always available | Always available | Always available |
| `console` | Always available | Always available | Always available |

### Conditional Runtime Detection

```typescript
// Detect which runtime is executing
function detectRuntime(): "node" | "deno" | "bun" | "unknown" {
  if (typeof Deno !== "undefined") return "deno";
  if (typeof Bun !== "undefined") return "bun";
  if (typeof process !== "undefined" && process.versions?.node) return "node";
  return "unknown";
}

// Runtime-specific file reading
async function readFile(path: string): Promise<string> {
  const runtime = detectRuntime();
  switch (runtime) {
    case "deno":
      return await Deno.readTextFile(path);
    case "bun":
      return await Bun.file(path).text();
    case "node": {
      const { readFile } = await import("node:fs/promises");
      return await readFile(path, "utf-8");
    }
    default:
      throw new Error(`Unsupported runtime: ${runtime}`);
  }
}
```

### Frameworks That Abstract the Runtime

Several frameworks provide a unified API across runtimes, removing the need to write runtime-specific code:

| Framework | Runtimes Supported | Use Case |
|-----------|-------------------|----------|
| **Hono** | Node.js, Deno, Bun, Cloudflare Workers, AWS Lambda | Lightweight web framework with web standard APIs |
| **Elysia** | Bun (primary), Node.js (via adapter) | High-performance web framework optimized for Bun |
| **Nitro** | Node.js, Deno, Bun, Cloudflare, Vercel, Netlify | Universal server engine (powers Nuxt) |
| **h3** | Node.js, Deno, Bun, Cloudflare Workers | Minimal HTTP framework with universal compatibility |

## Best Practices

1. **Default to web standard APIs** when writing code that may run on multiple runtimes. Use `fetch`, `Request`, `Response`, `URL`, `crypto.subtle`, and `ReadableStream` instead of runtime-specific equivalents.

2. **Choose the runtime that matches your deployment target.** If deploying to Deno Deploy, use Deno. If deploying to AWS Lambda or Vercel, Node.js typically has the best support. If self-hosting for maximum performance, consider Bun.

3. **Use a cross-runtime framework** (Hono, Nitro, h3) if you anticipate needing to switch runtimes or deploy to multiple targets.

4. **Lock your runtime version in CI/CD** using version managers (`nvm`, `fnm`, `mise`, `asdf`) or Docker images to ensure reproducible builds.

5. **Test on your target runtime.** Even with high compatibility, subtle differences exist in behavior (especially around `node_modules` resolution, native addons, and edge cases in stream handling).

6. **Use TypeScript strict mode** regardless of runtime. All three runtimes benefit equally from stricter type checking.

7. **Follow each runtime's LTS/stability schedule** for production deployments. Node.js even-numbered releases get LTS; Deno 2.x has LTS releases; Bun follows semver.

8. **Evaluate the tooling story holistically.** Deno includes formatter, linter, and test runner. Node.js requires external tools for each. Bun includes a test runner and bundler but not a formatter or linter. Factor the total setup cost into your decision.

9. **Consider the security requirements of your environment.** If running untrusted code or operating in a compliance-sensitive context, Deno's permission model provides meaningful defense in depth.

10. **Benchmark with your actual workload** before choosing based on synthetic benchmarks. Real-world performance depends on I/O patterns, dependency graphs, and application architecture more than micro-benchmarks.
