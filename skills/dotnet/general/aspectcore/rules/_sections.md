# AspectCore Rules

Best practices and rules for AspectCore.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Keep interceptors focused on a single concern | MEDIUM | [`aspectcore-keep-interceptors-focused-on-a-single-concern.md`](aspectcore-keep-interceptors-focused-on-a-single-concern.md) |
| 2 | Apply interceptors via attributes for explicit control | MEDIUM | [`aspectcore-apply-interceptors-via-attributes-for-explicit-control.md`](aspectcore-apply-interceptors-via-attributes-for-explicit-control.md) |
| 3 | Inject services into interceptors using `[FromServiceContext]` | CRITICAL | [`aspectcore-inject-services-into-interceptors-using-fromservicecontext.md`](aspectcore-inject-services-into-interceptors-using-fromservicecontext.md) |
| 4 | Order interceptors deliberately | MEDIUM | [`aspectcore-order-interceptors-deliberately.md`](aspectcore-order-interceptors-deliberately.md) |
| 5 | Avoid intercepting hot-path methods | HIGH | [`aspectcore-avoid-intercepting-hot-path-methods.md`](aspectcore-avoid-intercepting-hot-path-methods.md) |
| 6 | Always call `await next(context)` | CRITICAL | [`aspectcore-always-call-await-next-context.md`](aspectcore-always-call-await-next-context.md) |
| 7 | Use `Predicates` in `ConfigureDynamicProxy` | MEDIUM | [`aspectcore-use-predicates-in-configuredynamicproxy.md`](aspectcore-use-predicates-in-configuredynamicproxy.md) |
| 8 | Test interceptors in isolation | MEDIUM | [`aspectcore-test-interceptors-in-isolation.md`](aspectcore-test-interceptors-in-isolation.md) |
| 9 | Prefer interface-based services | LOW | [`aspectcore-prefer-interface-based-services.md`](aspectcore-prefer-interface-based-services.md) |
| 10 | Register the `DynamicProxyServiceProviderFactory` | CRITICAL | [`aspectcore-register-the-dynamicproxyserviceproviderfactory.md`](aspectcore-register-the-dynamicproxyserviceproviderfactory.md) |
