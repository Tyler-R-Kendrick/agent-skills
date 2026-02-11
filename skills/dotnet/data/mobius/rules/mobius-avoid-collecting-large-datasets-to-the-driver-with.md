---
title: "Avoid collecting large datasets to the driver with `"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Avoid collecting large datasets to the driver with `

Avoid collecting large datasets to the driver with `.Collect()` or `.Take(n)` with large `n`; instead, write results to distributed storage and read them from downstream systems.
