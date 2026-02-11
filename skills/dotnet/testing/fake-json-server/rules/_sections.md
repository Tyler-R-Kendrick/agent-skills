# Fake JSON Server Rules

Best practices and rules for Fake JSON Server.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Choose the right approach for your test level | MEDIUM | [`fake-json-server-choose-the-right-approach-for-your-test-level.md`](fake-json-server-choose-the-right-approach-for-your-test-level.md) |
| 2 | Define fake responses in separate JSON files for complex payloads | MEDIUM | [`fake-json-server-define-fake-responses-in-separate-json-files-for-complex.md`](fake-json-server-define-fake-responses-in-separate-json-files-for-complex.md) |
| 3 | Test error responses and edge cases, not just happy paths | MEDIUM | [`fake-json-server-test-error-responses-and-edge-cases-not-just-happy-paths.md`](fake-json-server-test-error-responses-and-edge-cases-not-just-happy-paths.md) |
| 4 | Use WireMock.Net scenarios for stateful API simulation | MEDIUM | [`fake-json-server-use-wiremock-net-scenarios-for-stateful-api-simulation.md`](fake-json-server-use-wiremock-net-scenarios-for-stateful-api-simulation.md) |
| 5 | Dispose fake servers and HTTP clients in test teardown | MEDIUM | [`fake-json-server-dispose-fake-servers-and-http-clients-in-test-teardown.md`](fake-json-server-dispose-fake-servers-and-http-clients-in-test-teardown.md) |
| 6 | Verify request content in addition to response handling | MEDIUM | [`fake-json-server-verify-request-content-in-addition-to-response-handling.md`](fake-json-server-verify-request-content-in-addition-to-response-handling.md) |
| 7 | Isolate each test class with its own fake server port | HIGH | [`fake-json-server-isolate-each-test-class-with-its-own-fake-server-port.md`](fake-json-server-isolate-each-test-class-with-its-own-fake-server-port.md) |
| 8 | Simulate realistic latency in integration tests | MEDIUM | [`fake-json-server-simulate-realistic-latency-in-integration-tests.md`](fake-json-server-simulate-realistic-latency-in-integration-tests.md) |
| 9 | Use `HttpClientFactory` patterns in production code for testability | CRITICAL | [`fake-json-server-use-httpclientfactory-patterns-in-production-code-for.md`](fake-json-server-use-httpclientfactory-patterns-in-production-code-for.md) |
| 10 | Do not use fake servers as a substitute for contract tests | CRITICAL | [`fake-json-server-do-not-use-fake-servers-as-a-substitute-for-contract-tests.md`](fake-json-server-do-not-use-fake-servers-as-a-substitute-for-contract-tests.md) |
