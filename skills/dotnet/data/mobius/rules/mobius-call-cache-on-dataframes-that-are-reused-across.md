---
title: "Call `Cache()` on DataFrames that are reused across..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Call `Cache()` on DataFrames that are reused across...

Call `Cache()` on DataFrames that are reused across multiple actions (e.g., multiple aggregations on the same dataset) and `Unpersist()` when the cached data is no longer needed.
