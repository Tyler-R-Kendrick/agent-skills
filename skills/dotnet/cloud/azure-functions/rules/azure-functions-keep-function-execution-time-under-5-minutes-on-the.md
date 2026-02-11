---
title: "Keep function execution time under 5 minutes on the..."
impact: MEDIUM
impactDescription: "general best practice"
tags: azure-functions, dotnet, cloud, serverless-http-apis, event-driven-processing-queues, blobs
---

## Keep function execution time under 5 minutes on the...

Keep function execution time under 5 minutes on the Consumption plan; use the Premium or Dedicated plan for longer-running functions, and Durable Functions for workflows that span hours or days.
