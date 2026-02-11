---
title: "Always accept `[EnumeratorCancellation] CancellationToken` as the last parameter of async iterator methods"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: iasyncenumerable, dotnet, reactive, streaming-data-asynchronously-using-iasyncenumerablet-with-yield-return, including-database-result-streaming, api-pagination
---

## Always accept `[EnumeratorCancellation] CancellationToken` as the last parameter of async iterator methods

Always accept `[EnumeratorCancellation] CancellationToken` as the last parameter of async iterator methods: so that consumers can cancel enumeration; the attribute wires the token from `WithCancellation()` to the parameter automatically.
