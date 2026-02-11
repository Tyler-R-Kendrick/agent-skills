# Server-Side Rendering Rules

Best practices and rules for Server-Side Rendering.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Default to SSG for content that does not change per request | MEDIUM | [`ssr-default-to-ssg-for-content-that-does-not-change-per-request.md`](ssr-default-to-ssg-for-content-that-does-not-change-per-request.md) |
| 2 | Use ISR for content that changes but does not need to be... | MEDIUM | [`ssr-use-isr-for-content-that-changes-but-does-not-need-to-be.md`](ssr-use-isr-for-content-that-changes-but-does-not-need-to-be.md) |
| 3 | Reserve full SSR for personalized or authenticated content... | CRITICAL | [`ssr-reserve-full-ssr-for-personalized-or-authenticated-content.md`](ssr-reserve-full-ssr-for-personalized-or-authenticated-content.md) |
| 4 | Use streaming SSR to avoid blocking the entire page on the... | HIGH | [`ssr-use-streaming-ssr-to-avoid-blocking-the-entire-page-on-the.md`](ssr-use-streaming-ssr-to-avoid-blocking-the-entire-page-on-the.md) |
| 5 | Prefer React Server Components for data fetching | LOW | [`ssr-prefer-react-server-components-for-data-fetching.md`](ssr-prefer-react-server-components-for-data-fetching.md) |
| 6 | Consider Astro's Islands Architecture for content-heavy... | LOW | [`ssr-consider-astro-s-islands-architecture-for-content-heavy.md`](ssr-consider-astro-s-islands-architecture-for-content-heavy.md) |
| 7 | When using SSR, cache aggressively at the CDN/edge layer | MEDIUM | [`ssr-when-using-ssr-cache-aggressively-at-the-cdn-edge-layer.md`](ssr-when-using-ssr-cache-aggressively-at-the-cdn-edge-layer.md) |
| 8 | Avoid hydration mismatches | CRITICAL | [`ssr-avoid-hydration-mismatches.md`](ssr-avoid-hydration-mismatches.md) |
| 9 | Test with JavaScript disabled to verify your SSR output is... | MEDIUM | [`ssr-test-with-javascript-disabled-to-verify-your-ssr-output-is.md`](ssr-test-with-javascript-disabled-to-verify-your-ssr-output-is.md) |
