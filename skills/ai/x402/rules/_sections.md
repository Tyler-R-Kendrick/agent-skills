# x402 (HTTP Payment Protocol) Rules

Best practices and rules for x402 (HTTP Payment Protocol).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use testnet (Base Sepolia) during development; switch to... | CRITICAL | [`x402-use-testnet-base-sepolia-during-development-switch-to.md`](x402-use-testnet-base-sepolia-during-development-switch-to.md) |
| 2 | Set prices in USD strings (`"$0 | MEDIUM | [`x402-set-prices-in-usd-strings-0.md`](x402-set-prices-in-usd-strings-0.md) |
| 3 | Use the public facilitator (`https | MEDIUM | [`x402-use-the-public-facilitator-https.md`](x402-use-the-public-facilitator-https.md) |
| 4 | For AI agents, wrap the x402 client in the agent's HTTP... | MEDIUM | [`x402-for-ai-agents-wrap-the-x402-client-in-the-agent-s-http.md`](x402-for-ai-agents-wrap-the-x402-client-in-the-agent-s-http.md) |
| 5 | Keep per-request prices low (fractions of a cent) for API... | MEDIUM | [`x402-keep-per-request-prices-low-fractions-of-a-cent-for-api.md`](x402-keep-per-request-prices-low-fractions-of-a-cent-for-api.md) |
| 6 | Add x402 middleware only to routes that need monetization,... | MEDIUM | [`x402-add-x402-middleware-only-to-routes-that-need-monetization.md`](x402-add-x402-middleware-only-to-routes-that-need-monetization.md) |
