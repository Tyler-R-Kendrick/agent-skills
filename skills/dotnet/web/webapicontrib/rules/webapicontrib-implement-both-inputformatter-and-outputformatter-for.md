---
title: "Implement both `InputFormatter` and `OutputFormatter` for binary formats"
impact: MEDIUM
impactDescription: "general best practice"
tags: webapicontrib, dotnet, web, extending-aspnet-core-web-api-with-custom-formatters, content-negotiation, and-media-type-handling-using-webapicontribcore-use-when-you-need-to-serve-or-consume-csv
---

## Implement both `InputFormatter` and `OutputFormatter` for binary formats

(MessagePack, Protobuf, BSON) to support both reading request bodies and writing response bodies, rather than only implementing output formatting which leaves POST/PUT endpoints unable to accept the same format.
