# Pact Rules

Best practices and rules for Pact.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Write consumer tests first, then verify on the provider | MEDIUM | [`pact-write-consumer-tests-first-then-verify-on-the-provider.md`](pact-write-consumer-tests-first-then-verify-on-the-provider.md) |
| 2 | Use provider states to set up test prerequisites | MEDIUM | [`pact-use-provider-states-to-set-up-test-prerequisites.md`](pact-use-provider-states-to-set-up-test-prerequisites.md) |
| 3 | Test only the contract, not business logic | MEDIUM | [`pact-test-only-the-contract-not-business-logic.md`](pact-test-only-the-contract-not-business-logic.md) |
| 4 | Use Pact Broker for sharing contracts between teams | CRITICAL | [`pact-use-pact-broker-for-sharing-contracts-between-teams.md`](pact-use-pact-broker-for-sharing-contracts-between-teams.md) |
| 5 | Run `can-i-deploy` before every deployment | MEDIUM | [`pact-run-can-i-deploy-before-every-deployment.md`](pact-run-can-i-deploy-before-every-deployment.md) |
| 6 | Version Pact files with the consumer's Git SHA | MEDIUM | [`pact-version-pact-files-with-the-consumer-s-git-sha.md`](pact-version-pact-files-with-the-consumer-s-git-sha.md) |
| 7 | Keep interactions minimal and focused | CRITICAL | [`pact-keep-interactions-minimal-and-focused.md`](pact-keep-interactions-minimal-and-focused.md) |
| 8 | Use consumer version selectors for branch-based testing | MEDIUM | [`pact-use-consumer-version-selectors-for-branch-based-testing.md`](pact-use-consumer-version-selectors-for-branch-based-testing.md) |
| 9 | Handle provider state cleanup between interactions | HIGH | [`pact-handle-provider-state-cleanup-between-interactions.md`](pact-handle-provider-state-cleanup-between-interactions.md) |
| 10 | Do not use Pact for performance or load testing | CRITICAL | [`pact-do-not-use-pact-for-performance-or-load-testing.md`](pact-do-not-use-pact-for-performance-or-load-testing.md) |
