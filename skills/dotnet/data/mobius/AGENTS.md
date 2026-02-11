# Mobius (C# Bindings for Apache Spark)

## Overview

Mobius provides C# and F# language bindings for Apache Spark, enabling .NET developers to write Spark applications for large-scale data processing without switching to Scala, Java, or Python. Mobius exposes the Spark RDD (Resilient Distributed Dataset) API, DataFrame API, and Spark SQL, allowing .NET code to execute distributed computations across a Spark cluster.

Note: Mobius was the original .NET binding for Spark and targets .NET Framework. For .NET Core and .NET 5+, Microsoft's official `.NET for Apache Spark` project (`Microsoft.Spark`) is the recommended alternative. Mobius remains relevant for teams on .NET Framework or those with existing Mobius codebases.

Mobius requires a running Spark cluster (standalone, YARN, or Mesos) and the Mobius interop layer deployed alongside the Spark workers.

## SparkSession and DataFrame Basics

```csharp
using Microsoft.Spark.CSharp.Core;
using Microsoft.Spark.CSharp.Sql;

public sealed class SparkDataProcessor
{
    public void ProcessSalesData()
    {
        SparkConf conf = new SparkConf()
            .SetAppName("SalesAnalysis")
            .SetMaster("spark://master:7077");

        SparkContext sc = new SparkContext(conf);
        SqlContext sqlContext = new SqlContext(sc);

        // Read structured data
        DataFrame salesDf = sqlContext.Read()
            .Format("csv")
            .Option("header", "true")
            .Option("inferSchema", "true")
            .Load("hdfs://data/sales.csv");

        // Show schema and sample data
        salesDf.PrintSchema();
        salesDf.Show(10);

        // Filter and aggregate
        DataFrame summary = salesDf
            .Filter(salesDf["amount"].Gt(100))
            .GroupBy(salesDf["region"])
            .Agg(new Dictionary<string, string>
            {
                { "amount", "sum" },
                { "orderId", "count" }
            });

        summary.Show();

        sc.Stop();
    }
}
```

## RDD Operations

RDDs are the fundamental distributed data structure in Spark. Use them for unstructured data and custom transformations.

```csharp
using Microsoft.Spark.CSharp.Core;

public sealed class WordCounter
{
    public void CountWords()
    {
        SparkConf conf = new SparkConf()
            .SetAppName("WordCount")
            .SetMaster("local[*]"); // Local mode for development

        SparkContext sc = new SparkContext(conf);

        // Read text file into an RDD
        RDD<string> lines = sc.TextFile("hdfs://data/documents.txt");

        // Word count pipeline
        RDD<KeyValuePair<string, int>> wordCounts = lines
            .FlatMap(line => line.Split(new[] { ' ', '\t', '\n' },
                StringSplitOptions.RemoveEmptyEntries))
            .Map(word => word.ToLowerInvariant().Trim())
            .Filter(word => word.Length > 2)
            .Map(word => new KeyValuePair<string, int>(word, 1))
            .ReduceByKey((a, b) => a + b);

        // Collect top 20 words
        var topWords = wordCounts
            .Map(kv => new KeyValuePair<int, string>(kv.Value, kv.Key))
            .SortByKey(ascending: false)
            .Take(20);

        foreach (var word in topWords)
        {
            Console.WriteLine($"{word.Value}: {word.Key}");
        }

        sc.Stop();
    }
}
```

## Spark SQL

Use Spark SQL for SQL-based analysis on DataFrames and registered temporary views.

```csharp
using Microsoft.Spark.CSharp.Core;
using Microsoft.Spark.CSharp.Sql;

public sealed class SqlAnalyzer
{
    public void RunAnalysis()
    {
        SparkConf conf = new SparkConf()
            .SetAppName("SqlAnalysis")
            .SetMaster("local[*]");

        SparkContext sc = new SparkContext(conf);
        SqlContext sqlContext = new SqlContext(sc);

        // Load data and register as a table
        DataFrame orders = sqlContext.Read()
            .Format("parquet")
            .Load("hdfs://data/orders.parquet");

        orders.RegisterTempTable("orders");

        DataFrame customers = sqlContext.Read()
            .Format("parquet")
            .Load("hdfs://data/customers.parquet");

        customers.RegisterTempTable("customers");

        // Run SQL query
        DataFrame result = sqlContext.Sql(@"
            SELECT c.name, c.region,
                   COUNT(o.order_id) AS order_count,
                   SUM(o.total) AS total_spent
            FROM orders o
            JOIN customers c ON o.customer_id = c.customer_id
            WHERE o.order_date >= '2024-01-01'
            GROUP BY c.name, c.region
            HAVING SUM(o.total) > 1000
            ORDER BY total_spent DESC");

        result.Show(20);

        // Save results
        result.Write()
            .Format("parquet")
            .Mode("overwrite")
            .Save("hdfs://output/customer_summary");

        sc.Stop();
    }
}
```

## ETL Pipeline Pattern

```csharp
using Microsoft.Spark.CSharp.Core;
using Microsoft.Spark.CSharp.Sql;

public sealed class EtlPipeline
{
    private readonly SparkContext _sc;
    private readonly SqlContext _sqlContext;

    public EtlPipeline(SparkContext sc)
    {
        _sc = sc;
        _sqlContext = new SqlContext(sc);
    }

    public void RunDailyEtl(string datePartition)
    {
        // Extract
        DataFrame rawEvents = _sqlContext.Read()
            .Format("json")
            .Load($"hdfs://data/events/date={datePartition}");

        // Transform
        DataFrame cleaned = rawEvents
            .Filter(rawEvents["event_type"].IsNotNull())
            .WithColumn("processed_at",
                Functions.CurrentTimestamp())
            .DropDuplicates(new[] { "event_id" });

        DataFrame enriched = cleaned
            .GroupBy(cleaned["user_id"], cleaned["event_type"])
            .Agg(new Dictionary<string, string>
            {
                { "event_id", "count" },
                { "duration_ms", "avg" }
            });

        // Load
        enriched.Write()
            .Format("parquet")
            .Mode("append")
            .PartitionBy("event_type")
            .Save("hdfs://warehouse/event_summary");
    }
}
```

## Caching and Persistence

```csharp
using Microsoft.Spark.CSharp.Core;
using Microsoft.Spark.CSharp.Sql;

// Cache a DataFrame that is reused multiple times
DataFrame frequently_used = sqlContext.Read()
    .Format("parquet")
    .Load("hdfs://data/reference.parquet");

frequently_used.Cache(); // Stores in memory across the cluster

// Use the cached DataFrame in multiple operations
DataFrame result1 = frequently_used.Filter(frequently_used["status"].EqualTo("active"));
DataFrame result2 = frequently_used.GroupBy("category").Count();

// Unpersist when no longer needed
frequently_used.Unpersist();
```

## Mobius vs Microsoft.Spark vs Other Approaches

| Aspect | Mobius | Microsoft.Spark | LINQ (in-memory) |
|---|---|---|---|
| .NET target | .NET Framework | .NET Core / .NET 5+ | Any |
| Scale | Distributed (TB+) | Distributed (TB+) | Single machine |
| Maintenance | Community | Microsoft (archived) | N/A |
| API coverage | RDD, DataFrame, SQL | DataFrame, SQL, UDFs | Collections |
| Deployment | Spark cluster required | Spark cluster required | None |

## Best Practices

1. Use DataFrames and Spark SQL instead of RDDs for structured data, as the Catalyst optimizer generates more efficient execution plans than hand-written RDD transformations.
2. Call `Cache()` on DataFrames that are reused across multiple actions (e.g., multiple aggregations on the same dataset) and `Unpersist()` when the cached data is no longer needed.
3. Use `local[*]` master mode for development and unit testing to run Spark in-process without requiring a cluster, then switch to the cluster URL for production.
4. Partition output data with `.PartitionBy()` on high-cardinality columns like date or region to enable partition pruning in downstream queries.
5. Filter data as early as possible in the pipeline (predicate pushdown) to reduce the volume of data shuffled across the cluster.
6. Avoid collecting large datasets to the driver with `.Collect()` or `.Take(n)` with large `n`; instead, write results to distributed storage and read them from downstream systems.
7. Monitor job execution through the Spark UI (port 4040) to identify slow stages, data skew, and excessive shuffles that degrade performance.
8. Use Parquet format for intermediate and output data because it supports columnar compression, predicate pushdown, and schema evolution.
9. Set `spark.serializer` to Kryo and register custom serializers for C# types that are shuffled across the network to reduce serialization overhead.
10. Keep .NET UDFs (user-defined functions) simple and stateless, because each UDF invocation incurs interop overhead between the JVM and the .NET process.
