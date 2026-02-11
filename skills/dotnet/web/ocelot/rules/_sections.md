# Ocelot Rules

Best practices and rules for Ocelot.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Split route configuration into environment-specific files | CRITICAL | [`ocelot-split-route-configuration-into-environment-specific-files.md`](ocelot-split-route-configuration-into-environment-specific-files.md) |
| 2 | Assign a unique `Key` property to routes used in aggregation | MEDIUM | [`ocelot-assign-a-unique-key-property-to-routes-used-in-aggregation.md`](ocelot-assign-a-unique-key-property-to-routes-used-in-aggregation.md) |
| 3 | Enable rate limiting per route with `RateLimitOptions` | MEDIUM | [`ocelot-enable-rate-limiting-per-route-with-ratelimitoptions.md`](ocelot-enable-rate-limiting-per-route-with-ratelimitoptions.md) |
| 4 | Use `LoadBalancerOptions` with `LeastConnection` for stateless services | MEDIUM | [`ocelot-use-loadbalanceroptions-with-leastconnection-for-stateless.md`](ocelot-use-loadbalanceroptions-with-leastconnection-for-stateless.md) |
| 5 | Configure `AuthenticationOptions.AuthenticationProviderKey` on routes that require authentication | HIGH | [`ocelot-configure-authenticationoptions-authenticationproviderkey.md`](ocelot-configure-authenticationoptions-authenticationproviderkey.md) |
| 6 | Use `RouteClaimsRequirement` on routes that need role-based access control | HIGH | [`ocelot-use-routeclaimsrequirement-on-routes-that-need-role-based.md`](ocelot-use-routeclaimsrequirement-on-routes-that-need-role-based.md) |
| 7 | Enable Consul or Eureka service discovery for dynamic environments | MEDIUM | [`ocelot-enable-consul-or-eureka-service-discovery-for-dynamic.md`](ocelot-enable-consul-or-eureka-service-discovery-for-dynamic.md) |
| 8 | Set `ReRoutesCaseSensitive` to `false` in `GlobalConfiguration` | MEDIUM | [`ocelot-set-reroutescasesensitive-to-false-in-globalconfiguration.md`](ocelot-set-reroutescasesensitive-to-false-in-globalconfiguration.md) |
| 9 | Use the caching feature with `FileCacheOptions` on read-heavy GET routes | MEDIUM | [`ocelot-use-the-caching-feature-with-filecacheoptions-on-read-heavy.md`](ocelot-use-the-caching-feature-with-filecacheoptions-on-read-heavy.md) |
| 10 | Deploy Ocelot behind a TLS-terminating reverse proxy | MEDIUM | [`ocelot-deploy-ocelot-behind-a-tls-terminating-reverse-proxy.md`](ocelot-deploy-ocelot-behind-a-tls-terminating-reverse-proxy.md) |
