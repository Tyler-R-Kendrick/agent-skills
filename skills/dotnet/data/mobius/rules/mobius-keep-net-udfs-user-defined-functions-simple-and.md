---
title: "Keep .NET UDFs (user-defined functions) simple and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: mobius, dotnet, data, running-apache-spark-jobs-from-c-or-f, distributed-big-data-processing-with-dataframes-and-rdds, spark-sql-queries-from-net
---

## Keep .NET UDFs (user-defined functions) simple and...

Keep .NET UDFs (user-defined functions) simple and stateless, because each UDF invocation incurs interop overhead between the JVM and the .NET process.
