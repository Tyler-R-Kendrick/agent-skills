---
title: "Set `spark"
impact: MEDIUM
impactDescription: "general best practice"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Set `spark

Set `spark.serializer` to Kryo and register custom serializers for C# types that are shuffled across the network to reduce serialization overhead.
