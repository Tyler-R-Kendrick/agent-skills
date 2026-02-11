---
name: project-system
description: |
  Use when configuring TypeScript projects, tsconfig.json, build tools, bundlers, and compilation pipelines. Covers compiler options, module systems, project references, and declaration files.
  USE FOR: tsconfig.json configuration, compiler options, build tool selection, bundler setup, monorepo project references, path aliases, declaration files, module resolution
  DO NOT USE FOR: package manager selection (use package-management), CLI tool development (use cli), specific library usage (use packages)
license: MIT
metadata:
  displayName: "TypeScript Project System"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "TypeScript TSConfig Reference"
    url: "https://www.typescriptlang.org/tsconfig"
  - title: "TypeScript Documentation"
    url: "https://www.typescriptlang.org"
  - title: "TypeScript GitHub Repository"
    url: "https://github.com/microsoft/TypeScript"
---

# TypeScript Project System

## Overview

The TypeScript project system controls how TypeScript code is compiled, type-checked, and bundled. At its core is `tsconfig.json`, which defines compiler behavior, file inclusion, module resolution, and output configuration. This skill covers everything from basic compiler options to advanced monorepo setups with project references and modern bundler pipelines.

## tsconfig.json Anatomy

A `tsconfig.json` file has four main sections:

```jsonc
{
  // Compiler behavior — the bulk of configuration
  "compilerOptions": {
    "target": "ES2022",               // JavaScript version to emit
    "module": "NodeNext",             // Module system for output
    "moduleResolution": "NodeNext",   // How imports are resolved
    "strict": true,                   // Enable all strict type-checking
    "esModuleInterop": true,          // Allow default imports from CJS
    "declaration": true,              // Generate .d.ts files
    "declarationMap": true,           // Source maps for .d.ts files
    "sourceMap": true,                // Source maps for .js files
    "outDir": "./dist",              // Output directory
    "rootDir": "./src",              // Root of source files
    "baseUrl": ".",                   // Base for non-relative imports
    "paths": {                        // Path aliases
      "@/*": ["./src/*"]
    },
    "lib": ["ES2022"],               // Runtime library type definitions
    "isolatedModules": true,          // Ensure each file can be transpiled independently
    "verbatimModuleSyntax": true,     // Enforce explicit type-only imports
    "noUncheckedIndexedAccess": true, // Index signatures include undefined
    "skipLibCheck": true              // Skip .d.ts type checking for speed
  },

  // Files to include in compilation
  "include": ["src/**/*.ts", "src/**/*.tsx"],

  // Files to exclude from compilation
  "exclude": ["node_modules", "dist", "**/*.test.ts"],

  // Project references for monorepos
  "references": [
    { "path": "../shared" },
    { "path": "../utils" }
  ]
}
```

## Key Compiler Options

| Option | Values / Type | Purpose |
|--------|--------------|---------|
| `target` | `ES5`, `ES2015`..`ES2024`, `ESNext` | JavaScript version for emitted code. Use `ES2022` for modern Node.js, `ES2015` for wide browser support. |
| `module` | `CommonJS`, `ES2015`, `ES2020`, `ES2022`, `Node16`, `NodeNext`, `Preserve` | Module system for output files. `NodeNext` for Node.js, `Preserve` for bundlers. |
| `moduleResolution` | `node`, `node16`, `nodenext`, `bundler` | Algorithm for resolving import specifiers. Must match `module` setting. |
| `strict` | `boolean` | Master switch for all strict checks. Always enable. |
| `esModuleInterop` | `boolean` | Emit `__importDefault` helpers for CJS default imports. Required for most npm packages. |
| `declaration` | `boolean` | Generate `.d.ts` declaration files alongside `.js` output. |
| `sourceMap` | `boolean` | Generate `.js.map` files for debugger support. |
| `paths` | `Record<string, string[]>` | Path alias mappings (e.g., `@/*` to `./src/*`). Requires `baseUrl`. |
| `baseUrl` | `string` | Base directory for resolving non-relative module names. |
| `outDir` | `string` | Redirect output to this directory. |
| `rootDir` | `string` | Specifies the root folder of source files (controls output directory structure). |
| `lib` | `string[]` | Which built-in API declarations to include (e.g., `DOM`, `ES2022`). |
| `jsx` | `preserve`, `react`, `react-jsx`, `react-jsxdev` | JSX emit mode. Use `react-jsx` for React 17+ automatic runtime. |
| `isolatedModules` | `boolean` | Ensure each file can be safely transpiled by non-tsc tools (esbuild, swc). |
| `verbatimModuleSyntax` | `boolean` | Require explicit `import type` for type-only imports. Replaces `importsNotUsedAsValues`. |
| `noUncheckedIndexedAccess` | `boolean` | Add `undefined` to index signature results, catching unsafe property access. |
| `incremental` | `boolean` | Save compilation state to `.tsbuildinfo` for faster rebuilds. |
| `composite` | `boolean` | Required for project references. Implies `declaration` and `incremental`. |
| `resolveJsonModule` | `boolean` | Allow importing `.json` files as modules. |
| `allowImportingTsExtensions` | `boolean` | Allow `.ts` / `.tsx` in import specifiers (requires `noEmit` or `emitDeclarationOnly`). |

## Module Systems: CommonJS vs ESM

### Comparison

| Aspect | CommonJS (CJS) | ES Modules (ESM) |
|--------|---------------|-------------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| Tree-shaking | Not possible | Supported by bundlers |
| Top-level await | Not supported | Supported |
| File extension | `.cjs` or `.js` (default in Node) | `.mjs` or `.js` (with `"type": "module"`) |
| `__dirname` / `__filename` | Available | Not available (use `import.meta.url`) |
| Interop | Can `require()` CJS, cannot `require()` ESM | Can `import` both CJS and ESM |

### Node16 / NodeNext Resolution

When using `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`:

- TypeScript follows Node.js native ESM resolution rules.
- File extensions are **required** in relative imports: `import { foo } from "./utils.js"` (even though the source is `.ts`).
- The `package.json` `"type"` field determines whether `.js` files are CJS or ESM.
- Use `"type": "module"` for ESM-first projects.
- Dual CJS/ESM packages use `"exports"` with conditional exports.

### Bundler Resolution

When using `"moduleResolution": "bundler"`:

- Allows extensionless imports like `import { foo } from "./utils"`.
- Designed for projects processed by Vite, esbuild, webpack, or similar tools.
- Does **not** require `"type": "module"` in `package.json`.
- Best choice when you never run `tsc` for emit and use a bundler instead.

## Build Tools Comparison

| Tool | Speed | Tree-Shaking | HMR | Config Complexity | Type Checking | Best For |
|------|-------|-------------|-----|-------------------|---------------|----------|
| **tsc** | Slow | No | No | Low (tsconfig) | Yes | Type checking, declaration generation |
| **esbuild** | Very Fast | Yes | No (needs plugin) | Low | No | Fast builds, simple bundling |
| **swc** | Very Fast | No (alone) | No | Low | No | Fast transpilation, Jest transform |
| **Vite** | Fast | Yes (Rollup) | Yes (native) | Medium | No (uses esbuild) | Frontend apps, dev servers |
| **Rollup** | Medium | Yes (best) | Plugin-based | Medium | No | Libraries, tree-shaken bundles |
| **webpack** | Slow | Yes | Yes (native) | High | Via ts-loader/fork-ts-checker | Complex apps, legacy projects |
| **tsup** | Very Fast | Yes | No | Very Low | No (uses esbuild) | Library bundling, dual CJS/ESM |
| **unbuild** | Fast | Yes (Rollup) | No | Very Low | No | Library bundling, auto-config |

### Common Pattern: tsc for Types + Bundler for Output

Most projects use `tsc` only for type-checking (`tsc --noEmit`) and a faster tool for actual compilation:

```bash
# Type-check only
tsc --noEmit

# Build with a bundler
vite build        # for apps
tsup src/index.ts # for libraries
```

## Bundler Configuration Examples

### Vite (Frontend Apps)

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // resolves tsconfig paths aliases
  ],
  build: {
    target: "ES2022",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

### tsup (Library Bundling)

```typescript
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],      // dual output
  dts: true,                    // generate .d.ts
  sourcemap: true,
  clean: true,                  // clean dist/ before build
  splitting: false,             // no code splitting for libraries
  target: "ES2022",
  outDir: "dist",
  treeshake: true,
  // External dependencies (not bundled)
  external: ["react", "react-dom"],
});
```

### unbuild (Auto-Configured Library Bundling)

```typescript
// build.config.ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: ["react"],
});
```

## Project References for Monorepos

Project references allow TypeScript to understand multi-package monorepos and build them incrementally.

### Setup

Each package needs `composite: true` in its tsconfig:

```jsonc
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,        // required for project references
    "declaration": true,       // implied by composite
    "declarationMap": true,    // enables "go to definition" across packages
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

The root tsconfig references all packages:

```jsonc
// tsconfig.json (root)
{
  "files": [],                  // root does not compile anything itself
  "references": [
    { "path": "packages/shared" },
    { "path": "packages/api" },
    { "path": "packages/web" }
  ]
}
```

Packages that depend on other packages add their own references:

```jsonc
// packages/api/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../shared" }
  ],
  "include": ["src/**/*.ts"]
}
```

### Building

```bash
# Build all referenced projects in dependency order
tsc --build

# Build with verbose output
tsc --build --verbose

# Clean all build outputs
tsc --build --clean

# Force full rebuild
tsc --build --force
```

## Path Aliases

Path aliases replace long relative imports (`../../../utils`) with clean absolute-style imports (`@/utils`).

### tsconfig.json

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```

### Bundler Resolution

Path aliases in `tsconfig.json` only affect TypeScript's understanding. Bundlers need their own configuration or a plugin:

- **Vite**: Use `vite-tsconfig-paths` plugin (reads tsconfig paths automatically).
- **webpack**: Configure `resolve.alias` in `webpack.config.js`.
- **esbuild**: Use `esbuild-plugin-tsc` or `tsconfig-paths` at runtime.
- **Jest**: Configure `moduleNameMapper` in `jest.config.ts`.
- **tsup**: Reads tsconfig paths automatically.
- **Node.js**: Use `--loader tsx` or `tsconfig-paths/register` at runtime.

## Declaration Files

### Generation

```jsonc
{
  "compilerOptions": {
    "declaration": true,         // emit .d.ts files
    "declarationMap": true,      // emit .d.ts.map for "go to source"
    "declarationDir": "./dist",  // where to put .d.ts files
    "emitDeclarationOnly": true  // only emit .d.ts, no .js (when bundler handles JS)
  }
}
```

### Package Exports for Types

```jsonc
// package.json
{
  "name": "my-lib",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "types": "./dist/index.d.ts",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs"
}
```

The `"types"` condition must come **first** in the exports map so TypeScript resolves it before the runtime entry.

## Type Checking Strategies

### CI Pipeline

```bash
# Type-check without emitting — fastest way to validate types in CI
tsc --noEmit

# With incremental caching for faster re-runs
tsc --noEmit --incremental
```

### Incremental Builds

```jsonc
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

The `.tsbuildinfo` file caches compilation state. Subsequent runs skip unchanged files. Add it to `.gitignore`.

### Watch Mode

```bash
# Watch and type-check continuously during development
tsc --noEmit --watch

# Watch with project references
tsc --build --watch
```

### Parallel Type Checking

For large projects, run type checking in parallel with the build:

```bash
# In package.json scripts
{
  "scripts": {
    "build": "tsup src/index.ts",
    "typecheck": "tsc --noEmit",
    "ci": "npm run typecheck && npm run build && npm run test"
  }
}
```

## Best Practices

1. **Always enable `strict: true`** — it is the single most impactful compiler option. Never disable individual strict checks without a documented reason.

2. **Use `isolatedModules: true`** when using any transpiler other than `tsc` (esbuild, swc, Babel). It ensures your code is compatible with single-file transpilation.

3. **Use `verbatimModuleSyntax: true`** in new projects to enforce explicit `import type` declarations and prevent runtime import of type-only modules.

4. **Enable `noUncheckedIndexedAccess`** to catch undefined access on objects with index signatures and arrays.

5. **Separate type-checking from building** — use `tsc --noEmit` for type safety and a faster tool (esbuild, swc, Vite) for actual output.

6. **Use `skipLibCheck: true`** to speed up compilation by not type-checking `node_modules/.d.ts` files. This is safe for most projects.

7. **Pin your TypeScript version** in `package.json` to avoid surprises when new versions ship stricter checks.

8. **Use project references** for monorepos to get incremental builds and clear dependency boundaries.

9. **Always generate declaration maps** (`declarationMap: true`) so consumers can navigate to your source instead of compiled `.d.ts` files.

10. **Use `"moduleResolution": "bundler"`** for frontend projects and `"NodeNext"` for Node.js libraries that will be consumed directly without a bundler.
