# RestSharp Rules

Best practices and rules for RestSharp.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Create `RestClient` instances through `HttpClientFactory` | HIGH | [`restsharp-create-restclient-instances-through-httpclientfactory.md`](restsharp-create-restclient-instances-through-httpclientfactory.md) |
| 2 | Use `AddUrlSegment()` for path parameters | MEDIUM | [`restsharp-use-addurlsegment-for-path-parameters.md`](restsharp-use-addurlsegment-for-path-parameters.md) |
| 3 | Use `ExecuteGetAsync<T>()` / `ExecutePostAsync<T>()` instead of `GetAsync<T>()` / `PostAsync<T>()` | MEDIUM | [`restsharp-use-executegetasync-t-executepostasync-t-instead-of.md`](restsharp-use-executegetasync-t-executepostasync-t-instead-of.md) |
| 4 | Configure serialization explicitly | MEDIUM | [`restsharp-configure-serialization-explicitly.md`](restsharp-configure-serialization-explicitly.md) |
| 5 | Use built-in authenticators | MEDIUM | [`restsharp-use-built-in-authenticators.md`](restsharp-use-built-in-authenticators.md) |
| 6 | Pass `CancellationToken` to all async methods | HIGH | [`restsharp-pass-cancellationtoken-to-all-async-methods.md`](restsharp-pass-cancellationtoken-to-all-async-methods.md) |
| 7 | Use interceptors for cross-cutting concerns | HIGH | [`restsharp-use-interceptors-for-cross-cutting-concerns.md`](restsharp-use-interceptors-for-cross-cutting-concerns.md) |
| 8 | Use `AddJsonBody()` for JSON payloads and `AddFile()` for file uploads | MEDIUM | [`restsharp-use-addjsonbody-for-json-payloads-and-addfile-for-file.md`](restsharp-use-addjsonbody-for-json-payloads-and-addfile-for-file.md) |
| 9 | Handle errors by checking `response.IsSuccessful` before accessing `response.Data` | MEDIUM | [`restsharp-handle-errors-by-checking-response-issuccessful-before.md`](restsharp-handle-errors-by-checking-response-issuccessful-before.md) |
| 10 | Set `MaxTimeout` on `RestClientOptions` | MEDIUM | [`restsharp-set-maxtimeout-on-restclientoptions.md`](restsharp-set-maxtimeout-on-restclientoptions.md) |
