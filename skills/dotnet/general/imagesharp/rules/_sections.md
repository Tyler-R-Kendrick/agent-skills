# ImageSharp Rules

Best practices and rules for ImageSharp.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always wrap `Image` instances in `using` statements | CRITICAL | [`imagesharp-always-wrap-image-instances-in-using-statements.md`](imagesharp-always-wrap-image-instances-in-using-statements.md) |
| 2 | Use `Image.LoadAsync` and `SaveAsync` | HIGH | [`imagesharp-use-image-loadasync-and-saveasync.md`](imagesharp-use-image-loadasync-and-saveasync.md) |
| 3 | Chain operations in a single `Mutate` call | MEDIUM | [`imagesharp-chain-operations-in-a-single-mutate-call.md`](imagesharp-chain-operations-in-a-single-mutate-call.md) |
| 4 | Resize before applying effects | CRITICAL | [`imagesharp-resize-before-applying-effects.md`](imagesharp-resize-before-applying-effects.md) |
| 5 | Configure `MemoryAllocator` limits in production | CRITICAL | [`imagesharp-configure-memoryallocator-limits-in-production.md`](imagesharp-configure-memoryallocator-limits-in-production.md) |
| 6 | Validate image dimensions before processing | HIGH | [`imagesharp-validate-image-dimensions-before-processing.md`](imagesharp-validate-image-dimensions-before-processing.md) |
| 7 | Use `ResizeMode.Max` for responsive thumbnails | MEDIUM | [`imagesharp-use-resizemode-max-for-responsive-thumbnails.md`](imagesharp-use-resizemode-max-for-responsive-thumbnails.md) |
| 8 | Prefer WebP output for web delivery | LOW | [`imagesharp-prefer-webp-output-for-web-delivery.md`](imagesharp-prefer-webp-output-for-web-delivery.md) |
| 9 | Avoid loading images from untrusted sources without size limits | HIGH | [`imagesharp-avoid-loading-images-from-untrusted-sources-without-size.md`](imagesharp-avoid-loading-images-from-untrusted-sources-without-size.md) |
| 10 | Use `SixLabors.ImageSharp.Drawing` for text and shape rendering | MEDIUM | [`imagesharp-use-sixlabors-imagesharp-drawing-for-text-and-shape.md`](imagesharp-use-sixlabors-imagesharp-drawing-for-text-and-shape.md) |
