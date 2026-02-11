---
title: "Map `ExecutionResult.Errors` to HTTP `400 BadRequest` with a structured JSON body"
impact: MEDIUM
impactDescription: "general best practice"
tags: peasy, dotnet, validation, implementing-business-rules-as-composable, testable-rule-objects-using-the-peasy-framework-use-when-building-middle-tier-validation-pipelines-for-commands-and-services-that-require-rule-chaining, async-validation
---

## Map `ExecutionResult.Errors` to HTTP `400 BadRequest` with a structured JSON body

Map `ExecutionResult.Errors` to HTTP `400 BadRequest` with a structured JSON body: containing an `errors` array and use HTTP `422 UnprocessableEntity` when the request is syntactically valid but violates business rules, distinguishing between input format errors and domain logic rejections.
