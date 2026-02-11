# Package Management

## Overview

JavaScript/TypeScript package managers handle dependency installation, version resolution, lockfile management, script execution, and workspace orchestration. Choosing the right one affects install speed, disk usage, monorepo workflow, and CI performance. This skill covers the four major package managers and their ecosystems.

## Tool Comparison

| Feature | npm | Yarn Classic (1.x) | Yarn Berry (3+) | pnpm | Bun |
|---------|-----|-------------------|-----------------|------|-----|
| **Lockfile** | `package-lock.json` | `yarn.lock` | `yarn.lock` | `pnpm-lock.yaml` | `bun.lockb` (binary) |
| **Install Speed** | Moderate | Moderate | Fast (PnP) | Fast | Fastest |
| **Disk Usage** | High (flat `node_modules`) | High (hoisted) | Low (PnP, no `node_modules`) | Low (content-addressable store) | Moderate |
| **Monorepo Support** | Workspaces (basic) | Workspaces | Workspaces + constraints | Workspaces + filtering | Workspaces |
| **Plug'n'Play** | No | No | Yes (default) | No | No |
| **Strictness** | Loose (phantom deps) | Loose | Strict (PnP) | Strict (no hoisting) | Loose |
| **Patching** | `overrides` (npm 8+) | `resolutions` | `resolutions` + `yarn patch` | `pnpm patch` | `overrides` |
| **Built-in Runner** | `npx` | N/A | `yarn dlx` | `pnpm dlx` / `pnpx` | `bunx` |
| **Offline Mode** | `--prefer-offline` | `--offline` | Yes (zero-installs) | `--offline` | No |
| **Corepack** | Yes | Yes | Yes | Yes | No |

## npm Essentials

npm is the default package manager shipped with Node.js.

### Core Commands

```bash
# Install all dependencies from package.json
npm install

# Install with clean lockfile (CI-optimized, fails if lockfile is outdated)
npm ci

# Add a dependency
npm install express
npm install -D typescript          # devDependency
npm install -g tsx                 # global

# Remove a dependency
npm uninstall express

# Run a script from package.json
npm run build
npm test                            # shorthand for npm run test
npm start                           # shorthand for npm run start

# Execute a one-off package binary
npx tsx src/index.ts
npx create-next-app@latest

# View dependency tree
npm ls
npm ls --depth=0                    # top-level only

# Audit for vulnerabilities
npm audit
npm audit fix
```

### package-lock.json

- Always commit `package-lock.json` to version control.
- Use `npm ci` in CI pipelines (faster, deterministic, fails on lockfile mismatch).
- Never manually edit the lockfile.

### Overrides (npm 8.3+)

Force a transitive dependency version:

```jsonc
// package.json
{
  "overrides": {
    "lodash": "4.17.21",
    "foo": {
      "bar": "1.0.0"          // override bar only within foo
    }
  }
}
```

## pnpm Deep Dive

pnpm uses a content-addressable store and strict symlink structure to save disk space and prevent phantom dependencies.

### How It Works

- All packages are stored in a global content-addressable store (`~/.pnpm-store`).
- Each project's `node_modules` contains symlinks to the store instead of copies.
- Each package can only access its declared dependencies (strict mode), eliminating phantom dependency bugs.

### Core Commands

```bash
# Install
pnpm install
pnpm add express
pnpm add -D typescript
pnpm add -g tsx

# Remove
pnpm remove express

# Run scripts
pnpm run build
pnpm test
pnpm exec tsx src/index.ts
pnpm dlx create-next-app@latest

# Workspace filtering
pnpm --filter @myorg/api install
pnpm --filter @myorg/api run build
pnpm --filter "./packages/**" run test
pnpm -r run build                          # run in all packages recursively

# Store management
pnpm store status
pnpm store prune                           # remove unreferenced packages
```

### pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
  - "apps/*"
  - "!**/test/**"          # exclude test directories
```

### Patching Dependencies

```bash
# Create a patch for a dependency
pnpm patch express@4.18.2

# Apply patches (creates patches/ directory)
pnpm patch-commit ./path-to-modified-package
```

Patches are stored in a `patches/` directory and applied automatically on install.

### Configuration (.npmrc for pnpm)

```ini
# .npmrc
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false          # keep strict mode (default)
node-linker=hoisted             # opt into flat node_modules (escape hatch)
```

## Yarn Berry (3+)

Yarn Berry is a complete rewrite of Yarn with Plug'n'Play, constraints, and plugin extensibility.

### Plug'n'Play (PnP)

PnP eliminates `node_modules` entirely. Dependencies are stored as compressed archives in `.yarn/cache`, and a `.pnp.cjs` file maps import requests to the correct archive.

```bash
# Enable PnP (default in Yarn Berry)
yarn set version berry
yarn install

# Generated files
.pnp.cjs            # module resolution map
.yarn/cache/         # dependency archives
.yarnrc.yml          # configuration
```

### .yarnrc.yml

```yaml
nodeLinker: pnp                    # or "node-modules" for compatibility
enableGlobalCache: false
compressionLevel: mixed

plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-typescript.cjs
    spec: "@yarnpkg/plugin-typescript"

npmScopes:
  myorg:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAlwaysAuth: true
```

### Constraints

Yarn Berry constraints enforce rules across all workspace packages:

```javascript
// .yarn/constraints.pro (Prolog-based)
% All packages must have a license field
gen_enforced_field(WorkspaceCwd, 'license', 'MIT').

% All packages must use the same TypeScript version
gen_enforced_dependency(WorkspaceCwd, 'typescript', '~5.4.0', 'devDependencies').
```

```bash
yarn constraints          # check
yarn constraints --fix    # auto-fix
```

### Zero-Installs

With PnP, the entire `.yarn/cache` directory can be committed to git, enabling zero-install: cloning the repo gives you a working project with no `yarn install` needed.

```gitattributes
# .gitattributes for zero-installs
.yarn/cache/** binary
.yarn/releases/** binary
.yarn/plugins/** binary
```

### Core Commands

```bash
yarn add express
yarn add -D typescript
yarn remove express
yarn dlx create-next-app@latest
yarn workspaces foreach run build
yarn workspaces foreach --topological run build    # respect dependency order
yarn up express                                     # interactive upgrade
yarn patch express                                  # create a patch
```

## Bun as Package Manager

Bun's package manager is built in Zig for maximum speed.

### Core Commands

```bash
# Install all dependencies
bun install

# Add dependencies
bun add express
bun add -d typescript              # devDependency
bun add -g tsx                     # global

# Remove
bun remove express

# Run scripts
bun run build
bun test

# Execute one-off packages
bunx create-next-app@latest

# Generate lockfile without installing
bun install --dry-run
```

### bun.lockb

Bun uses a binary lockfile (`bun.lockb`) for speed. To inspect it:

```bash
bun install --yarn                 # generate a yarn.lock for readability
```

### Workspaces

```jsonc
// package.json (root)
{
  "workspaces": ["packages/*", "apps/*"]
}
```

```bash
# Run a script in a specific workspace
bun run --filter @myorg/api build
```

### Key Differences

- Bun is the fastest installer by a significant margin (often 10-30x faster than npm).
- Binary lockfile is not human-readable but is smaller and faster to parse.
- Compatible with `package.json`, `node_modules`, and most npm packages.
- Does not support Plug'n'Play or content-addressable store.

## Monorepo Workspace Patterns

### Workspace Configuration

All major package managers support workspaces via `package.json`:

```jsonc
// package.json (root)
{
  "private": true,              // root must be private
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

For pnpm, use `pnpm-workspace.yaml` instead of `package.json` workspaces.

### Internal Package References

```jsonc
// apps/web/package.json
{
  "dependencies": {
    "@myorg/shared": "workspace:*",      // pnpm/yarn syntax
    "@myorg/utils": "*"                   // npm resolves from workspace
  }
}
```

### Turborepo Integration

Turborepo orchestrates builds across workspaces with caching and parallelism:

```jsonc
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],    // build dependencies first
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

```bash
# Run build across all packages in dependency order with caching
turbo run build

# Run in specific packages
turbo run build --filter=@myorg/api

# Run dev servers in parallel
turbo run dev
```

## package.json Anatomy

```jsonc
{
  // Identity
  "name": "@myorg/my-package",      // scoped package name
  "version": "1.2.3",               // semver version
  "description": "A brief description",
  "license": "MIT",
  "author": "Your Name <you@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/myorg/my-package"
  },

  // Module system
  "type": "module",                  // treat .js as ESM (omit for CJS)

  // Entry points
  "main": "./dist/index.cjs",       // CJS entry (Node.js require)
  "module": "./dist/index.mjs",     // ESM entry (bundlers)
  "types": "./dist/index.d.ts",     // TypeScript types

  // Modern exports map (preferred over main/module/types)
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",     // must come first
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.cjs"
    }
  },

  // What gets published
  "files": ["dist", "README.md", "LICENSE"],

  // Runtime requirements
  "engines": {
    "node": ">=18.0.0"
  },

  // Dependencies
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "~5.4.0",
    "vitest": "^1.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true }
  },

  // Override transitive dependency versions
  "overrides": {                     // npm
    "lodash": "4.17.21"
  },
  "resolutions": {                   // yarn
    "lodash": "4.17.21"
  },

  // Scripts
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm run test"
  }
}
```

### Key Fields Explained

| Field | Purpose |
|-------|---------|
| `type: "module"` | Treat `.js` files as ESM. Without it, Node.js treats them as CJS. |
| `exports` | Modern entry point map. Supports conditional exports for CJS/ESM/types. |
| `files` | Whitelist of files to include in the published package. Reduces package size. |
| `engines` | Declare minimum Node.js version. Enforced by `npm` with `engine-strict=true`. |
| `peerDependencies` | Dependencies the consumer must provide. Common for plugins and frameworks. |
| `overrides` / `resolutions` | Force specific versions of transitive dependencies for security patches or compatibility. |

## Publishing Packages

### Pre-publish Checklist

1. Set `"files"` in `package.json` to include only necessary files.
2. Set `"prepublishOnly"` script to build and test before publish.
3. Verify the package contents: `npm pack --dry-run`.
4. Ensure `"types"` or `"exports"` types conditions point to valid `.d.ts` files.
5. Test the package locally: `npm link` or `npm pack && npm install ./my-package-1.0.0.tgz`.

### Publishing Commands

```bash
# Log in to npm
npm login

# Publish a public scoped package
npm publish --access public

# Publish with provenance (links package to source commit)
npm publish --provenance --access public

# Publish a pre-release version
npm version prerelease --preid=beta
npm publish --tag beta

# Deprecate a version
npm deprecate @myorg/my-package@1.0.0 "Use v2 instead"

# View published package info
npm view @myorg/my-package
```

### Provenance

npm provenance (npm 9.5+) cryptographically links a published package to its source commit and build environment via Sigstore. Enable it in CI:

```yaml
# GitHub Actions
- run: npm publish --provenance --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Consumers can verify provenance on npmjs.com or with `npm audit signatures`.

## Private Registries

### .npmrc Configuration

```ini
# .npmrc (project-level)

# Scoped registry — all @myorg packages come from GitHub Packages
@myorg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

# Scoped registry — Artifactory
@internal:registry=https://artifactory.example.com/api/npm/npm-local/
//artifactory.example.com/api/npm/npm-local/:_authToken=${ARTIFACTORY_TOKEN}

# Default registry for everything else
registry=https://registry.npmjs.org/
```

### GitHub Packages

```jsonc
// package.json
{
  "name": "@myorg/my-package",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

```bash
npm login --registry=https://npm.pkg.github.com --scope=@myorg
npm publish
```

### Artifactory / Verdaccio

```bash
# Set registry for a scope
npm config set @internal:registry https://artifactory.example.com/api/npm/npm-local/

# Authenticate
npm login --registry=https://artifactory.example.com/api/npm/npm-local/
```

## Best Practices

1. **Choose one package manager per project** and commit its lockfile. Do not mix lockfiles.

2. **Use `npm ci` (or `pnpm install --frozen-lockfile`)** in CI pipelines for deterministic installs.

3. **Pin exact TypeScript versions** (`~5.4.0`) in devDependencies. TypeScript minor versions can introduce stricter checks that break builds.

4. **Use `workspace:*` protocol** (pnpm/yarn) for internal package references so they always resolve to the local version.

5. **Enable `engine-strict`** in `.npmrc` to enforce the `engines` field and catch Node.js version mismatches early.

6. **Use `"files"` in `package.json`** to explicitly whitelist published files. This prevents accidentally shipping source, tests, or credentials.

7. **Set up `prepublishOnly`** to build and test before every publish.

8. **Use `"exports"` instead of `"main"`** for new packages. It provides explicit entry points and prevents deep imports into private modules.

9. **Audit dependencies regularly** with `npm audit` or `pnpm audit`. Configure `audit-level=moderate` in `.npmrc` for CI gates.

10. **Use Corepack** to pin the package manager version across your team:
    ```bash
    corepack enable
    corepack use pnpm@9
    ```
    This adds a `"packageManager"` field to `package.json` that Corepack enforces.
