# YARP Rules

Best practices and rules for YARP.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Enable both active and passive health checks | MEDIUM | [`yarp-enable-both-active-and-passive-health-checks.md`](yarp-enable-both-active-and-passive-health-checks.md) |
| 2 | Use `PowerOfTwoChoices` load balancing | CRITICAL | [`yarp-use-poweroftwochoices-load-balancing.md`](yarp-use-poweroftwochoices-load-balancing.md) |
| 3 | Configure session affinity with `Cookie` policy | MEDIUM | [`yarp-configure-session-affinity-with-cookie-policy.md`](yarp-configure-session-affinity-with-cookie-policy.md) |
| 4 | Use transforms to strip route prefixes | MEDIUM | [`yarp-use-transforms-to-strip-route-prefixes.md`](yarp-use-transforms-to-strip-route-prefixes.md) |
| 5 | Implement `IProxyConfigProvider` for dynamic configuration | MEDIUM | [`yarp-implement-iproxyconfigprovider-for-dynamic-configuration.md`](yarp-implement-iproxyconfigprovider-for-dynamic-configuration.md) |
| 6 | Add custom middleware to the proxy pipeline using `MapReverseProxy(pipeline => ...)` | MEDIUM | [`yarp-add-custom-middleware-to-the-proxy-pipeline-using.md`](yarp-add-custom-middleware-to-the-proxy-pipeline-using.md) |
| 7 | Set `Active.Interval` and `Active.Timeout` on health checks | MEDIUM | [`yarp-set-active-interval-and-active-timeout-on-health-checks.md`](yarp-set-active-interval-and-active-timeout-on-health-checks.md) |
| 8 | Use route ordering with `Order` property | MEDIUM | [`yarp-use-route-ordering-with-order-property.md`](yarp-use-route-ordering-with-order-property.md) |
| 9 | Configure `MaxRequestBodySize` and timeouts on routes | MEDIUM | [`yarp-configure-maxrequestbodysize-and-timeouts-on-routes.md`](yarp-configure-maxrequestbodysize-and-timeouts-on-routes.md) |
| 10 | Deploy YARP with Kestrel in process | MEDIUM | [`yarp-deploy-yarp-with-kestrel-in-process.md`](yarp-deploy-yarp-with-kestrel-in-process.md) |
