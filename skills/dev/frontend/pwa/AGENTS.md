# Progressive Web Apps (PWA)

## Overview
A Progressive Web App is a web application that uses modern web APIs and a progressive enhancement strategy to deliver a native app-like experience. PWAs are installable, work offline, can receive push notifications, and run in their own window — all while being distributed via URL, not an app store. The three technical pillars are: HTTPS, a Service Worker, and a Web App Manifest.

## PWA Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                                                              │
│  ┌────────────────────┐    ┌──────────────────────────────┐ │
│  │  Web App            │    │  Service Worker (SW)          │ │
│  │  (HTML/CSS/JS)      │    │  (Background thread)          │ │
│  │                     │    │                                │ │
│  │  Registers SW ──────┼───▶│  Intercepts fetch requests    │ │
│  │  Requests data ─────┼───▶│  Manages cache                │ │
│  │  Receives push ◀────┼────│  Handles push notifications   │ │
│  │                     │    │  Background sync               │ │
│  └────────────────────┘    └──────────┬───────────────────┘ │
│                                       │                      │
│                              ┌────────▼────────┐             │
│                              │  Cache Storage    │             │
│                              │  (CacheAPI)       │             │
│                              └──────────────────┘             │
└───────────────────────────────────────┼──────────────────────┘
                                        │ Network (when available)
                               ┌────────▼────────┐
                               │  Server / CDN    │
                               └─────────────────┘
```

## Service Workers

### Lifecycle

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Register  │────▶│ Install   │────▶│ Activate  │────▶│ Running   │
│           │     │ (cache    │     │ (clean    │     │ (fetch    │
│           │     │  assets)  │     │  old      │     │  events)  │
│           │     │           │     │  caches)  │     │           │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                                    │
                      │ waitUntil()                        │ Can be
                      │ self.skipWaiting()                 │ terminated
                      ▼                                    │ and restarted
                 On failure:                               │ by browser
                 SW not installed                          ▼
                                                     ┌──────────┐
                                                     │ Idle /    │
                                                     │ Terminated│
                                                     └──────────┘
```

### Service Worker Registration
```javascript
// main.js — register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      console.log('SW registered:', registration.scope);

      // Check for updates periodically
      setInterval(() => registration.update(), 60 * 60 * 1000); // hourly
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}
```

### Service Worker Implementation
```javascript
// sw.js
const CACHE_NAME = 'app-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/app.js',
  '/images/logo.svg',
  '/offline.html',
];

// Install — precache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting(); // activate immediately
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // take control of all pages
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
```

## Caching Strategies

| Strategy | Description | Best For |
|----------|-------------|----------|
| **Cache First** | Check cache first, fall back to network | Static assets (CSS, JS, images, fonts) |
| **Network First** | Try network first, fall back to cache | API calls, dynamic content |
| **Stale-While-Revalidate** | Serve from cache immediately, update cache from network in background | Frequently updated but non-critical content |
| **Network Only** | Always fetch from network, never cache | Real-time data, authentication |
| **Cache Only** | Only serve from cache, never hit network | Precached app shell, offline-only assets |

### Cache First
```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open('images-v1').then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
  }
});
```

### Network First
```javascript
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
```

### Stale-While-Revalidate
```javascript
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then((response) => {
    cache.put(request, response.clone());
    return response;
  });

  return cached || networkFetch;
}
```

## Web App Manifest

### manifest.json
```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A production-ready progressive web application",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#1a73e8",
  "background_color": "#ffffff",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "shortcuts": [
    {
      "name": "New Task",
      "short_name": "New",
      "url": "/new",
      "icons": [{ "src": "/icons/new-task.png", "sizes": "96x96" }]
    }
  ],
  "categories": ["productivity"],
  "lang": "en-US",
  "dir": "ltr"
}
```

### Linking the Manifest
```html
<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#1a73e8" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="MyPWA" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
</head>
```

## Installability Criteria

For a PWA to be installable (show the browser's install prompt), it must meet these requirements:

1. **HTTPS** — Served over a secure connection (localhost is exempt for development)
2. **Web App Manifest** — Valid `manifest.json` with:
   - `name` or `short_name`
   - `start_url`
   - `display` set to `standalone`, `fullscreen`, or `minimal-ui`
   - At least one icon (192x192 and 512x512 recommended)
3. **Service Worker** — A registered service worker with a `fetch` event handler
4. **No blocking install criteria** — No already-installed version of the app

### Install Prompt Handling
```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton(); // show your custom UI
});

async function handleInstallClick() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User ${outcome === 'accepted' ? 'installed' : 'dismissed'} the app`);
  deferredPrompt = null;
}

window.addEventListener('appinstalled', () => {
  console.log('App installed successfully');
  hideInstallButton();
});
```

## App Shell Model

The app shell is the minimal HTML, CSS, and JavaScript required to render the UI "frame" — navigation, header, sidebar — without any content. Content is loaded dynamically after the shell renders.

```
┌─────────────────────────────────────┐
│  App Shell (cached, loads instantly) │
│  ┌───────────────────────────────┐  │
│  │  Header / Navigation          │  │
│  ├───────────────────────────────┤  │
│  │  Sidebar  │  ┌─────────────┐ │  │
│  │           │  │  Content     │ │  │
│  │           │  │  (loaded     │ │  │
│  │           │  │   from API   │ │  │
│  │           │  │   or cache)  │ │  │
│  │           │  └─────────────┘ │  │
│  ├───────────────────────────────┤  │
│  │  Footer                       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Push Notifications

### Subscribing
```javascript
async function subscribeToPush(registration) {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  // Send subscription to your server
  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });
}
```

### Handling Push Events (in Service Worker)
```javascript
// sw.js
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const { title, body, icon, url } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: icon || '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: { url },
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
});
```

## Background Sync

```javascript
// In your app — register a sync event
async function saveDataWithSync(data) {
  // Store data in IndexedDB first
  await saveToIndexedDB('outbox', data);

  // Register background sync
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('sync-outbox');
}

// sw.js — handle the sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-outbox') {
    event.waitUntil(syncOutbox());
  }
});

async function syncOutbox() {
  const items = await getFromIndexedDB('outbox');
  for (const item of items) {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      await deleteFromIndexedDB('outbox', item.id);
    } catch (error) {
      // Will retry on next sync opportunity
      throw error;
    }
  }
}
```

## Workbox

Workbox is Google's library for building production-ready service workers. It abstracts common caching patterns into a declarative API.

### Workbox Configuration (with Vite)
```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My App',
        short_name: 'App',
        theme_color: '#1a73e8',
        icons: [
          { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
```

### Workbox Strategies (Manual)
```javascript
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Precache build assets (injected by build tool)
precacheAndRoute(self.__WB_MANIFEST);

// Cache First for images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);

// Network First for API calls
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-responses',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

// Stale-While-Revalidate for CSS/JS
registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);
```

## Best Practices
- Start with the app shell model — cache the UI frame so the app loads instantly, even offline.
- Use Workbox instead of hand-coding service workers — it handles edge cases (cache versioning, routing, expiration) that are easy to get wrong.
- Choose caching strategies per resource type: Cache First for static assets, Network First for API data, Stale-While-Revalidate for non-critical content.
- Always provide an offline fallback page — users should see something meaningful, not a browser error.
- Handle service worker updates gracefully — show a "New version available" banner rather than silently updating, which can break in-flight state.
- Test offline behavior in Chrome DevTools (Application > Service Workers > Offline checkbox).
- Size your app shell for sub-second loads on 3G — the shell should be under 50KB gzipped.
- Use Background Sync for data that must reach the server eventually (form submissions, analytics) — do not lose user actions to network failures.
