---
name: spa
description: |
    Single Page Application architecture — client-side routing, state management, data fetching, bundle optimization, and the SPA vs MPA tradeoff. Covers React, Vue, Angular, Svelte, and Solid ecosystems.
    USE FOR: SPA architecture, client-side routing, state management patterns, data fetching strategies, bundle optimization, code splitting, lazy loading
    DO NOT USE FOR: server-side rendering (use ssr), progressive web apps (use pwa), micro-frontend composition (use micro-frontends)
license: MIT
metadata:
  displayName: "Single Page Applications"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Single Page Applications (SPA)

## Overview
A Single Page Application loads a single HTML shell, then uses JavaScript to dynamically render content and handle navigation entirely in the browser. The server provides JSON APIs; the client handles routing, rendering, and state. SPAs deliver rich, app-like experiences — think Gmail, Figma, or Notion — but come with tradeoffs in SEO, initial load performance, and complexity.

## SPA Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                      │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Router   │  │  State   │  │  Component Tree       │  │
│  │  (URL ↔   │  │  Store   │  │  (Virtual DOM /       │  │
│  │   View)   │  │          │  │   Reactive Updates)   │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│       │              │               │                    │
│       └──────────────┼───────────────┘                    │
│                      │                                    │
│              ┌───────▼───────┐                            │
│              │  Data Fetching │                            │
│              │  (API Client)  │                            │
│              └───────┬───────┘                            │
└──────────────────────┼────────────────────────────────────┘
                       │ HTTP/WebSocket
              ┌────────▼────────┐
              │   Backend API    │
              │  (REST/GraphQL)  │
              └─────────────────┘
```

### How It Works
1. Browser requests `index.html` — a minimal shell with a `<div id="root">` and a `<script>` tag
2. JavaScript bundle loads, initializes the router, and renders the initial view
3. User clicks a link — the router intercepts it, updates the URL (History API), and renders the new view without a page reload
4. Data is fetched asynchronously from APIs and rendered into the component tree
5. All subsequent navigation happens client-side — the server is never contacted for HTML again

## SPA vs MPA Decision

| Factor | SPA | MPA (Multi-Page App) |
|--------|-----|---------------------|
| **Navigation** | Instant (client-side) | Full page reload |
| **Initial Load** | Slower (large JS bundle) | Faster (server HTML) |
| **SEO** | Challenging (needs prerendering or SSR) | Native |
| **Interactivity** | Rich, app-like | Page-based, simpler |
| **Offline** | Possible (with Service Workers) | Difficult |
| **State Persistence** | Survives navigation | Lost on page reload |
| **Complexity** | Higher (routing, state, hydration) | Lower |
| **Best For** | Dashboards, SaaS, tools | Content sites, blogs, e-commerce |

**Rule of thumb**: If your app feels like a *document*, use an MPA or SSR. If it feels like an *application*, use a SPA.

## Client-Side Routing

### React Router (v6+)
```tsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Nested route renders here */}
    </div>
  );
}
```

### Vue Router
```typescript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    {
      path: '/dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        { path: '', component: () => import('./views/Overview.vue') },
        { path: 'settings', component: () => import('./views/Settings.vue') },
      ],
    },
  ],
});
```

### Angular Router
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
```

## State Management

### State Management Landscape

| Library | Ecosystem | Philosophy |
|---------|-----------|-----------|
| **Redux Toolkit** | React | Single store, immutable, actions + reducers |
| **Zustand** | React | Minimal, hook-based, no boilerplate |
| **Jotai** | React | Atomic state, bottom-up, derived atoms |
| **Valtio** | React | Proxy-based, mutable API, reactive |
| **Pinia** | Vue | Composition API-friendly, modular stores |
| **NgRx** | Angular | RxJS-based Redux for Angular, effects |
| **Angular Signals** | Angular | Fine-grained reactivity, no RxJS needed |
| **Svelte Stores** | Svelte | Built-in writable/readable/derived stores |

### Zustand (Modern React State)
```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        login: async (credentials) => {
          const { user, token } = await api.login(credentials);
          set({ user, token });
        },
        logout: () => set({ user: null, token: null }),
      }),
      { name: 'auth-storage' }
    )
  )
);

// Usage in component
function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  // ...
}
```

### Pinia (Vue State)
```typescript
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  function addItem(product: Product) {
    const existing = items.value.find((i) => i.id === product.id);
    if (existing) existing.qty++;
    else items.value.push({ ...product, qty: 1 });
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  return { items, total, addItem, removeItem };
});
```

## Data Fetching

### The Server State Problem
Server data is not the same as client state. Server data is:
- **Asynchronous** — fetched over the network
- **Shared** — multiple components may need the same data
- **Stale** — can be outdated the moment it arrives
- **Cacheable** — often the same data is requested repeatedly

Libraries like TanStack Query and SWR solve these problems with caching, deduplication, background refetching, and optimistic updates.

### TanStack Query (React Query)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function TodoList() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => api.getTodos(),
    staleTime: 5 * 60 * 1000,     // consider fresh for 5 min
    gcTime: 30 * 60 * 1000,       // garbage collect after 30 min
  });

  const addTodo = useMutation({
    mutationFn: (newTodo: NewTodo) => api.createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    // Optimistic update
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], (old: Todo[]) => [
        ...old,
        { ...newTodo, id: 'temp' },
      ]);
      return { previous };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['todos'], context?.previous);
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  // render todos...
}
```

### SWR (Vercel)
```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  // mutate() to trigger revalidation
  // mutate(newData, false) for optimistic update
}
```

### Apollo Client (GraphQL)
```typescript
import { useQuery, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos($status: Status) {
    todos(status: $status) {
      id
      title
      completed
    }
  }
`;

function TodoList({ status }: { status: Status }) {
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { status },
    pollInterval: 30000, // refetch every 30s
  });
  // ...
}
```

## Code Splitting and Lazy Loading

### Route-Based Splitting (React)
```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

### Component-Level Splitting
```tsx
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### Prefetching on Hover
```tsx
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const prefetch = () => {
    // Trigger dynamic import on hover — browser caches the chunk
    if (to === '/analytics') import('./pages/Analytics');
    if (to === '/settings') import('./pages/Settings');
  };

  return (
    <Link to={to} onMouseEnter={prefetch}>
      {children}
    </Link>
  );
}
```

## Bundle Optimization

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // warn if chunk > 500KB
    sourcemap: true,
  },
});
```

### Tree Shaking Best Practices
- Use ES module imports (`import { map } from 'lodash-es'` not `import _ from 'lodash'`)
- Mark packages as `sideEffects: false` in `package.json` when safe
- Avoid barrel files (`index.ts` re-exports) in large libraries — they defeat tree shaking
- Use `import()` for anything not needed on initial render

## SEO Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Empty HTML (JS-rendered content) | Prerendering at build time (react-snap, prerender-spa-plugin) |
| Search engines can't crawl SPA routes | SSG fallback for public pages |
| No meta tags until JS loads | React Helmet, Vue Meta, or SSR |
| Slow FCP hurts rankings | Code splitting + skeleton screens |
| Dynamic content not indexed | Server-side rendering for critical pages |

### Hybrid Approach
Many modern apps use a hybrid: SSR or SSG for public-facing pages (marketing, docs, blog) and SPA for authenticated dashboard/application pages. Frameworks like Next.js make this easy with per-page rendering strategies.

## Performance Considerations

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| **First Contentful Paint (FCP)** | < 1.8s | User perceives the page is loading |
| **Time to Interactive (TTI)** | < 3.5s | User can actually interact with the page |
| **Total Blocking Time (TBT)** | < 200ms | Main thread responsiveness |
| **Bundle Size (initial, gzipped)** | < 150KB | Directly impacts FCP and TTI |
| **Largest Contentful Paint (LCP)** | < 2.5s | Core Web Vital — primary content visible |

### Performance Checklist
- [ ] Route-based code splitting enabled
- [ ] Vendor chunks separated from application code
- [ ] Images lazy-loaded below the fold
- [ ] Tree shaking verified (no dead code in bundle)
- [ ] Compression enabled (gzip or Brotli)
- [ ] Service Worker caching static assets (see `dev/frontend/pwa`)
- [ ] Bundle analyzer run (webpack-bundle-analyzer or rollup-plugin-visualizer)
- [ ] Core Web Vitals measured with real user data (CrUX, web-vitals library)

## Best Practices
- Treat server data as a cache, not as state — use TanStack Query or SWR instead of putting API responses in Redux.
- Split state by concern: URL state (router), server state (query library), UI state (local component state), global UI state (theme, auth — Zustand/Context).
- Code-split at the route level at minimum; split large components and heavy libraries on demand.
- Prefetch likely next routes on hover or viewport proximity to make navigation feel instant.
- Measure bundle size in CI — set budgets and fail the build if they are exceeded.
- Consider SSR or SSG for any pages that need SEO — a pure SPA is almost never the right choice for public content.
