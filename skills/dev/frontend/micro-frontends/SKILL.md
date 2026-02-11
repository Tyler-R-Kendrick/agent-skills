---
name: micro-frontends
description: |
    Micro-frontend architecture — composition approaches, Module Federation, single-spa, web components, shared state, and inter-app communication. Covers the patterns and tradeoffs for splitting a frontend across independent teams.
    USE FOR: micro-frontend architecture, Module Federation, single-spa, runtime composition, independent frontend deployment, cross-team frontend development
    DO NOT USE FOR: single-team SPA development (use spa), server-side rendering (use ssr), backend service decomposition (use dev/architecture/microservices)
license: MIT
metadata:
  displayName: "Micro-Frontend Architecture"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Martin Fowler — Micro Frontends"
    url: "https://martinfowler.com/articles/micro-frontends.html"
  - title: "Micro-Frontends — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Microfrontend"
---

# Micro-Frontend Architecture

## Overview
Micro-frontends extend the microservices idea to the frontend: independently developed, tested, and deployed frontend applications that are composed into a single, cohesive user experience. Each team owns a vertical slice of the product — from the UI layer down through the API — with autonomy over their tech stack, build pipeline, and release cadence. The approach trades simplicity for team scalability.

## Composition Approaches

```
┌──────────────────────────────────────────────────────────────────┐
│                  Micro-Frontend Composition                       │
│                                                                   │
│  Build-Time             Runtime                  Server-Side      │
│  ┌──────────────┐       ┌──────────────────┐     ┌────────────┐  │
│  │ npm packages │       │ Module Federation│     │ ESI / SSI  │  │
│  │ Monorepo     │       │ Import Maps      │     │ SSR Comp.  │  │
│  │ imports      │       │ iframes          │     │ Tailor /   │  │
│  │              │       │ Web Components   │     │ Podium     │  │
│  └──────────────┘       └──────────────────┘     └────────────┘  │
│                                                                   │
│  + Type safety            + Independent deploy    + SEO-friendly  │
│  + Optimized bundle       + Tech-stack freedom    + Fast FCP      │
│  - Coupled releases       - Runtime overhead      - Complexity    │
│  - Single deploy          - Larger bundles        - Server infra  │
└──────────────────────────────────────────────────────────────────┘
```

### Build-Time Composition
Each micro-frontend is published as an npm package and consumed by a host application at build time.

```json
// package.json of the host/shell application
{
  "dependencies": {
    "@org/header": "^2.1.0",
    "@org/product-catalog": "^3.4.0",
    "@org/checkout": "^1.8.0",
    "@org/user-profile": "^2.0.0"
  }
}
```

**Tradeoff**: Strong type safety and optimized bundles, but all micro-frontends must be built and deployed together — defeating much of the independence benefit.

### Runtime Composition — Module Federation
Webpack 5 Module Federation (and Rspack) allows applications to share code at runtime. A "host" application dynamically loads "remote" modules from independently deployed bundles.

```
┌──────────────────────────────────────────────────────────┐
│  Host (Shell Application)                                 │
│                                                           │
│  Loads at runtime:                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ Remote A     │  │ Remote B     │  │ Remote C     │      │
│  │ (Product)    │  │ (Cart)       │  │ (Profile)    │      │
│  │ React 18     │  │ Vue 3        │  │ React 18     │      │
│  │ Port 3001    │  │ Port 3002    │  │ Port 3003    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                           │
│  Shared: react, react-dom (singleton)                     │
└──────────────────────────────────────────────────────────┘
```

### Runtime Composition — Import Maps
Native browser import maps allow mapping bare module specifiers to URLs, enabling runtime loading without a bundler federation plugin.

```html
<script type="importmap">
{
  "imports": {
    "@org/header": "https://cdn.example.com/header/v2.1.0/index.js",
    "@org/product": "https://cdn.example.com/product/v3.4.0/index.js",
    "react": "https://cdn.example.com/react/18.2.0/react.production.min.js"
  }
}
</script>
```

### Runtime Composition — iframes
The simplest (and oldest) isolation approach. Each micro-frontend runs in its own iframe with full CSS and JS isolation. Drawbacks: no shared DOM, awkward communication, SEO-invisible, accessibility challenges.

### Server-Side Composition
Fragments are assembled on the server before sending HTML to the client. Approaches include Edge Side Includes (ESI), Server-Side Includes (SSI), and frameworks like Podium (Node.js) or Piral.

## Module Federation (Webpack 5 / Rspack)

### Remote Configuration
```javascript
// webpack.config.js — Remote (Product Team)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: 'https://product.example.com/',
    uniqueName: 'product',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'product',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
        './ProductDetail': './src/components/ProductDetail',
        './productApi': './src/api/products',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@tanstack/react-query': { singleton: true },
      },
    }),
  ],
};
```

### Host Configuration
```javascript
// webpack.config.js — Host (Shell Application)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        product: 'product@https://product.example.com/remoteEntry.js',
        cart: 'cart@https://cart.example.com/remoteEntry.js',
        profile: 'profile@https://profile.example.com/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        '@tanstack/react-query': { singleton: true },
      },
    }),
  ],
};
```

### Dynamic Remotes
```typescript
// Load remotes dynamically based on configuration
async function loadRemoteModule(scope: string, module: string) {
  // Initialize sharing scope
  await __webpack_init_sharing__('default');

  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(module);
  return factory();
}

// Usage — load a remote component at runtime
const ProductList = React.lazy(() =>
  loadRemoteModule('product', './ProductList')
);

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProductList />
    </Suspense>
  );
}
```

## single-spa

single-spa is a framework-agnostic micro-frontend orchestrator. It manages the lifecycle of multiple frontend applications (called "applications" or "parcels") within a single page.

### Core Concepts
- **Applications**: Full page-level micro-frontends mounted/unmounted based on URL routes
- **Parcels**: Framework-agnostic components that can be mounted anywhere, regardless of route
- **Layout Engine**: Declarative HTML-based routing for micro-frontends

### Root Config
```javascript
// root-config.js
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@org/navbar',
  app: () => System.import('@org/navbar'),
  activeWhen: () => true, // always active
});

registerApplication({
  name: '@org/products',
  app: () => System.import('@org/products'),
  activeWhen: '/products',
  customProps: { authToken: getAuthToken() },
});

registerApplication({
  name: '@org/checkout',
  app: () => System.import('@org/checkout'),
  activeWhen: '/checkout',
});

start();
```

### single-spa Application (React)
```javascript
// @org/products — single-spa-react wrapper
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err, info, props) {
    return <div>Error loading Products module</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

## Web Components as Micro-Frontend Boundaries

Web Components provide native browser encapsulation (Shadow DOM) that makes them excellent micro-frontend boundaries — each team ships a custom element that encapsulates its framework and styles.

```typescript
// Product team ships a custom element
class ProductCard extends HTMLElement {
  private root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const productId = this.getAttribute('product-id');
    // Mount React/Vue/Svelte inside the shadow DOM
    this.render(productId);
  }

  disconnectedCallback() {
    // Cleanup framework instance
  }

  static get observedAttributes() {
    return ['product-id'];
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === 'product-id') this.render(newVal);
  }

  private render(productId: string | null) {
    // Render framework component into shadow root
  }
}

customElements.define('product-card', ProductCard);
```

Usage in any framework or plain HTML:
```html
<product-card product-id="abc-123"></product-card>
```

## Shared State and Communication

Micro-frontends are independently deployed, so they cannot share in-memory state directly. Communication strategies:

### Custom Events (Recommended)
```typescript
// Publishing micro-frontend
window.dispatchEvent(
  new CustomEvent('cart:item-added', {
    detail: { productId: 'abc-123', quantity: 1 },
  })
);

// Consuming micro-frontend
window.addEventListener('cart:item-added', (event: CustomEvent) => {
  const { productId, quantity } = event.detail;
  updateCartBadge(productId, quantity);
});
```

### Shared Observable (Event Bus)
```typescript
// shared-state.ts — published as a shared package
import { BehaviorSubject } from 'rxjs';

export interface AppState {
  user: User | null;
  cartCount: number;
  theme: 'light' | 'dark';
}

export const appState$ = new BehaviorSubject<AppState>({
  user: null,
  cartCount: 0,
  theme: 'light',
});

// Any micro-frontend can subscribe
appState$.subscribe((state) => {
  console.log('Cart count:', state.cartCount);
});

// Any micro-frontend can update
appState$.next({ ...appState$.value, cartCount: 5 });
```

### URL-Based Communication
Use URL search params or path segments as shared state. Each micro-frontend reads from and writes to the URL — the URL becomes the single source of truth.

```typescript
// Product micro-frontend sets filter
const url = new URL(window.location.href);
url.searchParams.set('category', 'electronics');
url.searchParams.set('sort', 'price-asc');
window.history.pushState({}, '', url);

// Sidebar micro-frontend reads filter
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const sort = params.get('sort');
```

## Tradeoffs

| Dimension | Benefit | Cost |
|-----------|---------|------|
| **Team Autonomy** | Teams choose their own framework, tooling, release cadence | Inconsistent UX without strong design system governance |
| **Independent Deployment** | Ship features without coordinating with other teams | Versioning complexity, integration testing burden |
| **Tech-Stack Freedom** | Adopt new frameworks incrementally, avoid full rewrites | Multiple frameworks = larger aggregate bundle, more to learn |
| **Fault Isolation** | One micro-frontend crashing does not bring down the page | Error boundaries and fallbacks add complexity |
| **Bundle Size** | Each team optimizes their own bundle | Duplicate dependencies if sharing is not configured correctly |
| **Routing** | Each team owns their routes | Cross-app navigation, deep linking, and shared layouts are harder |
| **Shared Dependencies** | Module Federation singleton sharing reduces duplication | Version mismatches can cause subtle runtime errors |
| **Organizational Fit** | Scales with the number of teams (Conway's Law) | Overkill for small teams — adds overhead without benefit |

## When to Use Micro-Frontends

**Use when**:
- Multiple teams (3+) work on the same user-facing application
- Teams need independent deployment and release cadences
- You are migrating a large legacy frontend incrementally (strangler fig pattern)
- Different parts of the app have fundamentally different requirements (e.g., a dashboard vs. a content editor)

**Do not use when**:
- A single team owns the entire frontend
- The application is small to medium in scope
- You can solve the problem with a well-organized monorepo and code splitting
- You lack the infrastructure for independent builds, deployments, and integration testing

## Best Practices
- Establish a shared design system (component library, tokens, CSS variables) — team autonomy does not mean visual chaos.
- Use Module Federation's `singleton: true` for critical shared dependencies (React, router) to avoid duplicate instances.
- Define clear contracts between micro-frontends — custom events with typed payloads, not ad-hoc DOM coupling.
- Invest in integration testing — test the composed page, not just individual micro-frontends in isolation.
- Start with a monolith and extract micro-frontends only when organizational pain (release coordination, merge conflicts, team coupling) justifies the architectural complexity.
- Use a shell/host application that owns the layout, authentication, and top-level routing — micro-frontends own their content area only.
- Monitor aggregate bundle size — without vigilance, micro-frontends will independently add dependencies until the total payload dwarfs a monolith.
