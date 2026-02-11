# Population.NET Rules

Best practices and rules for Population.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Validate requested field names against an allowlist of... | HIGH | [`population-net-validate-requested-field-names-against-an-allowlist-of.md`](population-net-validate-requested-field-names-against-an-allowlist-of.md) |
| 2 | Limit the maximum number of fields per request (e | HIGH | [`population-net-limit-the-maximum-number-of-fields-per-request-e.md`](population-net-limit-the-maximum-number-of-fields-per-request-e.md) |
| 3 | Return the full object when no `fields` parameter is... | CRITICAL | [`population-net-return-the-full-object-when-no-fields-parameter-is.md`](population-net-return-the-full-object-when-no-fields-parameter-is.md) |
| 4 | Use `PropertyInfo` caching with a `ConcurrentDictionary`... | HIGH | [`population-net-use-propertyinfo-caching-with-a-concurrentdictionary.md`](population-net-use-propertyinfo-caching-with-a-concurrentdictionary.md) |
| 5 | Document available fields and nesting paths in your API... | MEDIUM | [`population-net-document-available-fields-and-nesting-paths-in-your-api.md`](population-net-document-available-fields-and-nesting-paths-in-your-api.md) |
| 6 | Strip sensitive fields (e | CRITICAL | [`population-net-strip-sensitive-fields-e.md`](population-net-strip-sensitive-fields-e.md) |
| 7 | Combine field projection with proper EF Core ` | HIGH | [`population-net-combine-field-projection-with-proper-ef-core.md`](population-net-combine-field-projection-with-proper-ef-core.md) |
| 8 | Cache projected responses with a cache key that includes... | MEDIUM | [`population-net-cache-projected-responses-with-a-cache-key-that-includes.md`](population-net-cache-projected-responses-with-a-cache-key-that-includes.md) |
| 9 | Return a `400 Bad Request` with a descriptive error message... | MEDIUM | [`population-net-return-a-400-bad-request-with-a-descriptive-error-message.md`](population-net-return-a-400-bad-request-with-a-descriptive-error-message.md) |
| 10 | Prefer dedicated DTOs for stable, well-known API shapes and... | LOW | [`population-net-prefer-dedicated-dtos-for-stable-well-known-api-shapes-and.md`](population-net-prefer-dedicated-dtos-for-stable-well-known-api-shapes-and.md) |
