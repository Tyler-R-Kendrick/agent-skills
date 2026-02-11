# Service Discovery Rules

Best practices and rules for Service Discovery.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `https+http | LOW | [`extensions-service-discovery-use-https-http.md`](extensions-service-discovery-use-https-http.md) |
| 2 | Apply `AddServiceDiscovery()` to... | HIGH | [`extensions-service-discovery-apply-addservicediscovery-to.md`](extensions-service-discovery-apply-addservicediscovery-to.md) |
| 3 | Define service endpoints in `appsettings | CRITICAL | [`extensions-service-discovery-define-service-endpoints-in-appsettings.md`](extensions-service-discovery-define-service-endpoints-in-appsettings.md) |
| 4 | Combine service discovery with... | MEDIUM | [`extensions-service-discovery-combine-service-discovery-with.md`](extensions-service-discovery-combine-service-discovery-with.md) |
| 5 | Use typed `HttpClient` classes (e | MEDIUM | [`extensions-service-discovery-use-typed-httpclient-classes-e.md`](extensions-service-discovery-use-typed-httpclient-classes-e.md) |
| 6 | Use `AddDnsSrvServiceEndpointProvider()` for Kubernetes or... | MEDIUM | [`extensions-service-discovery-use-adddnssrvserviceendpointprovider-for-kubernetes-or.md`](extensions-service-discovery-use-adddnssrvserviceendpointprovider-for-kubernetes-or.md) |
| 7 | Separate internal services (using service discovery) from... | MEDIUM | [`extensions-service-discovery-separate-internal-services-using-service-discovery-from.md`](extensions-service-discovery-separate-internal-services-using-service-discovery-from.md) |
| 8 | Let .NET Aspire handle service discovery configuration... | MEDIUM | [`extensions-service-discovery-let-net-aspire-handle-service-discovery-configuration.md`](extensions-service-discovery-let-net-aspire-handle-service-discovery-configuration.md) |
| 9 | Keep service names consistent across AppHost references,... | CRITICAL | [`extensions-service-discovery-keep-service-names-consistent-across-apphost-references.md`](extensions-service-discovery-keep-service-names-consistent-across-apphost-references.md) |
| 10 | Test service discovery in isolation by mocking... | MEDIUM | [`extensions-service-discovery-test-service-discovery-in-isolation-by-mocking.md`](extensions-service-discovery-test-service-discovery-in-isolation-by-mocking.md) |
