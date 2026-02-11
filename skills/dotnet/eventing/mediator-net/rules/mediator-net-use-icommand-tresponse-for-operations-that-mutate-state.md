---
title: "Use `ICommand<TResponse>` for operations that mutate state..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mediator-net, dotnet, eventing, source-generated-mediator-pattern, in-process-command-dispatch, query-handling
---

## Use `ICommand<TResponse>` for operations that mutate state...

Use `ICommand<TResponse>` for operations that mutate state and `IQuery<TResponse>` for read-only operations, leveraging the semantic distinction that Mediator.NET provides over MediatR's single `IRequest<T>`.
