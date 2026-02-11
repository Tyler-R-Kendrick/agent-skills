---
title: "Create one validator class per request/command DTO"
impact: MEDIUM
impactDescription: "general best practice"
tags: fluent-validations, dotnet, validation, building-strongly-typed-validation-rules-for-domain-models-and-dtos-using-fluentvalidations-fluent-api-use-for-form-validation, api-request-validation, and-business-rule-enforcement-with-composable
---

## Create one validator class per request/command DTO

(e.g., `CreateOrderRequestValidator` for `CreateOrderRequest`) and register validators using `AddValidatorsFromAssemblyContaining<T>()`, which scans the assembly and registers every `AbstractValidator<T>` implementation with the DI container automatically.
