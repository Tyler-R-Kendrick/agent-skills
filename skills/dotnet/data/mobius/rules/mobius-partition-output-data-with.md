---
title: "Partition output data with `"
impact: MEDIUM
impactDescription: "general best practice"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Partition output data with `

Partition output data with `.PartitionBy()` on high-cardinality columns like date or region to enable partition pruning in downstream queries.
