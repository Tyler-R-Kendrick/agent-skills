---
name: ssr
description: |
    Server-Side Rendering, Static Site Generation, Incremental Static Regeneration, Islands Architecture, Streaming SSR, and React Server Components. Covers Next.js, Nuxt, Remix, SvelteKit, and Astro in depth.
    USE FOR: server-side rendering, SSG, ISR, Islands Architecture, streaming SSR, React Server Components, Next.js, Nuxt, Remix, SvelteKit, Astro, choosing between SSR vs SSG vs ISR
    DO NOT USE FOR: client-only SPAs (use spa), progressive web apps (use pwa), micro-frontend composition (use micro-frontends)
license: MIT
metadata:
  displayName: "Server-Side Rendering"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Server-Side Rendering (SSR)

## Overview
Server-Side Rendering generates HTML on the server for each request, sending a fully-formed page to the browser. The client then "hydrates" the HTML — attaching event listeners and making it interactive. SSR combines the SEO and fast First Contentful Paint of traditional server-rendered pages with the rich interactivity of Single Page Applications. Beyond classic SSR, the modern landscape includes SSG, ISR, Islands Architecture, Streaming SSR, and React Server Components — each a different point on the spectrum between server and client rendering.

## Rendering Strategies

```
┌──────────────────────────────────────────────────────────────────┐
│                    Rendering Strategy Spectrum                     │
│                                                                   │
│  SSG ──────▶ ISR ──────▶ SSR ──────▶ Streaming ──────▶ RSC      │
│                                                                   │
│  Build-time    Build-time    Per-request   Per-request   Server-  │
│  HTML          + revalidate  HTML on       HTML streamed  only     │
│  Static CDN    on demand     every req     progressively components│
└──────────────────────────────────────────────────────────────────┘
```

### SSR — Server-Side Rendering
HTML is rendered on the server for **every request**. The client receives a complete page, then hydrates it with JavaScript for interactivity.

```
Browser request → Server renders HTML → Browser displays HTML → JS loads → Hydration → Interactive
```

### SSG — Static Site Generation
HTML is rendered at **build time**. Pages are pre-generated as static files and served from a CDN. Content is only as fresh as the last build.

```
Build step → HTML files generated → Deployed to CDN → Browser requests static file → Instant response
```

### ISR — Incremental Static Regeneration
A hybrid of SSG and SSR. Pages are statically generated but **revalidated** in the background after a configurable time interval. First popularized by Next.js.

```
First request → Serve cached static page → Background revalidation → Next request gets fresh page
```

### Islands Architecture
The page is mostly **static HTML** with isolated "islands" of interactivity. Only the interactive components ship JavaScript and hydrate independently. The rest of the page is zero-JS static HTML.

```
┌───────────────────────────────────────────────────┐
│  Static HTML (no JS)                               │
│  ┌─────────────┐                ┌──────────────┐  │
│  │  Island:     │                │  Island:      │  │
│  │  Search Bar  │  Static text   │  Add to Cart  │  │
│  │  (hydrated)  │  and images    │  (hydrated)   │  │
│  └─────────────┘  (no JS)       └──────────────┘  │
│                                                    │
│  Static HTML (no JS)                               │
│  ┌──────────────────────────────────────────────┐  │
│  │  Island: Image Carousel (hydrated)            │  │
│  └──────────────────────────────────────────────┘  │
│  Static HTML (no JS)                               │
└───────────────────────────────────────────────────┘
```

### Streaming SSR
Instead of waiting for the entire page to render, the server **streams** HTML to the browser as it becomes ready. React 18 Suspense boundaries define streaming chunks — fast parts render first, slow parts (data fetching) stream in later.

```
Server starts streaming HTML →
  [Header renders immediately]
  [Main content streams as data resolves]
  [Suspense fallback replaced by real content]
  [JavaScript hydrates progressively]
```

### React Server Components (RSC)
A paradigm shift: components that run **only on the server** and never ship JavaScript to the client. RSC can directly access databases, filesystems, and server-only APIs. Client Components (marked with `'use client'`) handle interactivity and ship JS. The two compose seamlessly in the same component tree.

```
┌──────────────────────────────────────────────────────┐
│  Server Component Tree (zero JS to client)            │
│  ┌────────────────────────────────────────────────┐  │
│  │  ServerLayout                                   │  │
│  │    ├── ServerHeader (DB query for user)         │  │
│  │    ├── ServerArticle (filesystem read)          │  │
│  │    │     └── ClientLikeButton ('use client')   │  │
│  │    └── ServerSidebar (API call for related)     │  │
│  │          └── ClientSearch ('use client')        │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  Only ClientLikeButton and ClientSearch ship JS       │
└──────────────────────────────────────────────────────┘
```

## SSR vs SSG vs ISR Decision Table

| Criteria | SSR | SSG | ISR |
|----------|-----|-----|-----|
| **Content Freshness** | Always fresh (per-request) | Stale until rebuild | Fresh within revalidation window |
| **TTFB** | Slower (server compute per request) | Fastest (CDN-served static) | Fast (CDN-served, revalidates async) |
| **Server Cost** | Higher (compute per request) | Minimal (CDN only) | Low (occasional revalidation) |
| **Dynamic Content** | Full support | None (build-time only) | Partial (revalidation delay) |
| **Personalization** | Full (cookies, auth) | None without client JS | None without client JS |
| **Scale** | Requires server infrastructure | Infinite (CDN) | Near-infinite (CDN + edge revalidation) |
| **Build Time** | None | Grows with page count | Grows initially, then on-demand |
| **Best For** | Authenticated dashboards, personalized content | Blogs, docs, marketing | E-commerce catalogs, news sites |

## Framework Deep Dives

### Next.js (React)

Next.js App Router (v13+) uses React Server Components by default. Every component is a Server Component unless marked with `'use client'`.

```typescript
// app/products/page.tsx — Server Component (default)
// Runs on the server, never ships JS to the client
import { db } from '@/lib/db';

export default async function ProductsPage() {
  const products = await db.products.findMany(); // Direct DB access

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <AddToCartButton /> {/* Client Component */}
    </div>
  );
}

// Revalidation (ISR)
export const revalidate = 60; // revalidate every 60 seconds
```

```typescript
// app/products/[id]/page.tsx — Dynamic route with generateStaticParams (SSG)
export async function generateStaticParams() {
  const products = await db.products.findMany({ select: { id: true } });
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.products.findUnique({ where: { id: params.id } });
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
```

#### Server Actions (Next.js)
```typescript
// app/products/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function addToCart(productId: string) {
  await db.cart.add({ productId, userId: getCurrentUser().id });
  revalidatePath('/cart');
}

// Used in a Client Component
'use client';
import { addToCart } from './actions';

function AddToCartButton({ productId }: { productId: string }) {
  return (
    <form action={addToCart.bind(null, productId)}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

### Nuxt (Vue)

Nuxt 3 uses Nitro (universal server engine) and provides SSR, SSG, ISR, and hybrid rendering out of the box.

```vue
<!-- pages/products/index.vue -->
<script setup lang="ts">
// useFetch runs on server during SSR, deduplicates on client
const { data: products, pending, error } = await useFetch('/api/products', {
  transform: (response) => response.data,
});
</script>

<template>
  <div>
    <h1>Products</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
```

```typescript
// nuxt.config.ts — Hybrid rendering (per-route strategies)
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },                    // SSG at build time
    '/products/**': { swr: 3600 },               // ISR — revalidate hourly
    '/dashboard/**': { ssr: true },              // SSR per request
    '/admin/**': { ssr: false },                 // SPA (client-only)
    '/api/**': { cors: true, cache: { maxAge: 60 } },
  },
});
```

### Remix (React)

Remix embraces web fundamentals: loaders for data, actions for mutations, nested routes, and progressive enhancement. Forms work without JavaScript.

```typescript
// app/routes/products.tsx — Loader (server-side data fetching)
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const products = await db.products.findMany({
    where: category ? { category } : undefined,
  });
  return json({ products });
}

export default function Products() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div>
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} prefetch="intent">
          {product.name}
        </Link>
      ))}
    </div>
  );
}
```

```typescript
// app/routes/products.$id.tsx — Action (server-side mutation)
import { type ActionFunctionArgs, redirect } from '@remix-run/node';

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'add-to-cart') {
    await db.cart.add({
      productId: params.id!,
      userId: await requireUserId(request),
      quantity: Number(formData.get('quantity')),
    });
    return redirect('/cart');
  }

  throw new Response('Invalid intent', { status: 400 });
}

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>();
  return (
    <Form method="post">
      <input type="hidden" name="intent" value="add-to-cart" />
      <input type="number" name="quantity" defaultValue={1} min={1} />
      <button type="submit">Add to Cart</button>
      {/* Works without JavaScript enabled */}
    </Form>
  );
}
```

### SvelteKit (Svelte)

SvelteKit uses load functions for data fetching and form actions for mutations. It supports SSR, SSG, and SPA modes per route.

```typescript
// src/routes/products/+page.server.ts — Load function (server-only)
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const category = url.searchParams.get('category');
  const response = await fetch(`/api/products?category=${category}`);
  const products = await response.json();
  return { products };
};

export const actions: Actions = {
  addToCart: async ({ request, locals }) => {
    const data = await request.formData();
    const productId = data.get('productId');
    await db.cart.add({ productId, userId: locals.user.id });
    return { success: true };
  },
};
```

```svelte
<!-- src/routes/products/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>Products</h1>
{#each data.products as product}
  <div>
    <h2>{product.name}</h2>
    <form method="POST" action="?/addToCart" use:enhance>
      <input type="hidden" name="productId" value={product.id} />
      <button>Add to Cart</button>
    </form>
  </div>
{/each}
```

```typescript
// Per-route rendering strategy
// src/routes/blog/+page.ts
export const prerender = true;  // SSG — generate at build time

// src/routes/dashboard/+page.ts
export const ssr = false;       // SPA — client-only rendering

// src/routes/products/+page.ts
// Default: SSR per request
```

### Astro (Islands Architecture)

Astro renders pages as static HTML by default and ships **zero JavaScript** unless you explicitly opt in with interactive islands. Components from any framework (React, Vue, Svelte, Solid) can be used as islands.

```astro
---
// src/pages/products.astro — Server-side (runs at build/request time)
import Layout from '../layouts/Layout.astro';
import ProductCard from '../components/ProductCard.astro'; // Static, no JS
import SearchBar from '../components/SearchBar.tsx';       // React island
import CartWidget from '../components/CartWidget.vue';     // Vue island

const products = await fetch('https://api.example.com/products').then(r => r.json());
---

<Layout title="Products">
  <!-- This React component hydrates on the client (interactive island) -->
  <SearchBar client:load />

  <!-- Static HTML, no JavaScript shipped -->
  <div class="product-grid">
    {products.map((product) => (
      <ProductCard product={product} />
    ))}
  </div>

  <!-- Vue component hydrates only when visible in viewport -->
  <CartWidget client:visible />
</Layout>
```

#### Astro Client Directives
| Directive | Hydration Strategy |
|-----------|-------------------|
| `client:load` | Hydrate immediately on page load |
| `client:idle` | Hydrate when browser is idle (requestIdleCallback) |
| `client:visible` | Hydrate when component enters viewport (IntersectionObserver) |
| `client:media="(min-width: 768px)"` | Hydrate when media query matches |
| `client:only="react"` | Client-render only, skip SSR entirely |
| *(no directive)* | No hydration — renders as static HTML with zero JS |

## Streaming SSR (React 18+)

```typescript
// Next.js App Router — Streaming with Suspense
import { Suspense } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Streams immediately */}
      <Header />

      {/* Streams when data resolves */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>

      {/* Streams independently when its data resolves */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews id={params.id} />
      </Suspense>

      {/* Streams immediately */}
      <Footer />
    </div>
  );
}

// Each async component resolves independently
async function ProductDetail({ id }: { id: string }) {
  const product = await db.products.findUnique({ where: { id } }); // 100ms
  return <div>{product.name} — ${product.price}</div>;
}

async function ProductReviews({ id }: { id: string }) {
  const reviews = await db.reviews.findMany({ where: { productId: id } }); // 500ms
  return <ReviewList reviews={reviews} />;
}
```

The browser receives HTML progressively:
1. Header renders immediately
2. ProductSkeleton shows while product data loads
3. ProductDetail streams in when its data resolves (100ms)
4. ReviewsSkeleton shows while reviews load
5. ProductReviews streams in when reviews resolve (500ms)
6. Footer renders immediately

## Best Practices
- Default to SSG for content that does not change per request — it is the fastest and cheapest strategy.
- Use ISR for content that changes but does not need to be real-time (product catalogs, blog posts) — you get CDN speed with eventual freshness.
- Reserve full SSR for personalized or authenticated content that must be fresh on every request.
- Use streaming SSR to avoid blocking the entire page on the slowest data source — Suspense boundaries let fast parts render immediately.
- Prefer React Server Components for data fetching — they eliminate client-server waterfalls and ship zero JS for non-interactive UI.
- Consider Astro's Islands Architecture for content-heavy sites — shipping zero JS by default and hydrating only interactive components is a dramatic performance win.
- When using SSR, cache aggressively at the CDN/edge layer — not every request needs to hit your origin server.
- Avoid hydration mismatches — the server-rendered HTML and client render must produce identical output, or React will throw errors and re-render the entire tree.
- Test with JavaScript disabled to verify your SSR output is meaningful — if the page is blank without JS, your SSR is not doing its job.
