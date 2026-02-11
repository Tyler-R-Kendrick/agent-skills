---
title: "Use `local[*]` master mode for development and unit testing..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Use `local[*]` master mode for development and unit testing...

Use `local[*]` master mode for development and unit testing to run Spark in-process without requiring a cluster, then switch to the cluster URL for production.
