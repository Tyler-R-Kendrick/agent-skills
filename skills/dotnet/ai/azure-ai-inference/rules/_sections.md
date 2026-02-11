# Azure.AI.Inference Rules

Best practices and rules for Azure.AI.Inference.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `DefaultAzureCredential` from `Azure | CRITICAL | [`azure-ai-inference-use-defaultazurecredential-from-azure.md`](azure-ai-inference-use-defaultazurecredential-from-azure.md) |
| 2 | Register `ChatCompletionsClient` and `EmbeddingsClient` as... | MEDIUM | [`azure-ai-inference-register-chatcompletionsclient-and-embeddingsclient-as.md`](azure-ai-inference-register-chatcompletionsclient-and-embeddingsclient-as.md) |
| 3 | Set explicit `MaxTokens` on every request to prevent... | HIGH | [`azure-ai-inference-set-explicit-maxtokens-on-every-request-to-prevent.md`](azure-ai-inference-set-explicit-maxtokens-on-every-request-to-prevent.md) |
| 4 | Use `CompleteStreamingAsync` for user-facing chat... | MEDIUM | [`azure-ai-inference-use-completestreamingasync-for-user-facing-chat.md`](azure-ai-inference-use-completestreamingasync-for-user-facing-chat.md) |
| 5 | Implement retry logic with exponential backoff for... | MEDIUM | [`azure-ai-inference-implement-retry-logic-with-exponential-backoff-for.md`](azure-ai-inference-implement-retry-logic-with-exponential-backoff-for.md) |
| 6 | Validate tool call arguments with `JsonSerializer | CRITICAL | [`azure-ai-inference-validate-tool-call-arguments-with-jsonserializer.md`](azure-ai-inference-validate-tool-call-arguments-with-jsonserializer.md) |
| 7 | Trim conversation history to stay within model context... | MEDIUM | [`azure-ai-inference-trim-conversation-history-to-stay-within-model-context.md`](azure-ai-inference-trim-conversation-history-to-stay-within-model-context.md) |
| 8 | Store endpoint URLs and model deployment names in... | MEDIUM | [`azure-ai-inference-store-endpoint-urls-and-model-deployment-names-in.md`](azure-ai-inference-store-endpoint-urls-and-model-deployment-names-in.md) |
| 9 | Monitor token usage from `response | MEDIUM | [`azure-ai-inference-monitor-token-usage-from-response.md`](azure-ai-inference-monitor-token-usage-from-response.md) |
| 10 | Use separate `EmbeddingsClient` instances for different... | MEDIUM | [`azure-ai-inference-use-separate-embeddingsclient-instances-for-different.md`](azure-ai-inference-use-separate-embeddingsclient-instances-for-different.md) |
