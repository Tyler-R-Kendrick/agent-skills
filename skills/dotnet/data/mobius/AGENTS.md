# Mobius

## Overview
Mobius provides C# and F# bindings for Apache Spark, enabling .NET developers to use Spark for big data processing.

## Example
```csharp
var spark = SparkSession.Builder().AppName("MyApp").GetOrCreate();

var df = spark.Read().Json("data.json");
df.Show();

// RDD operations
var rdd = spark.SparkContext.TextFile("data.txt");
var words = rdd.FlatMap(line => line.Split(' '));
var counts = words.CountByValue();
```

## Best Practices
- Use DataFrames for structured data
- Leverage Spark SQL
- Partition data appropriately
- Monitor Spark UI
- Handle serialization carefully
