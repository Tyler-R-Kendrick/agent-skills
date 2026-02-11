---
title: "Use DataFrames and Spark SQL instead of RDDs for structured..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Use DataFrames and Spark SQL instead of RDDs for structured...

Use DataFrames and Spark SQL instead of RDDs for structured data, as the Catalyst optimizer generates more efficient execution plans than hand-written RDD transformations.
