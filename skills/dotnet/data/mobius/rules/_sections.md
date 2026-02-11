# Mobius Rules

Best practices and rules for Mobius.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use DataFrames and Spark SQL instead of RDDs for structured... | MEDIUM | [`mobius-use-dataframes-and-spark-sql-instead-of-rdds-for-structured.md`](mobius-use-dataframes-and-spark-sql-instead-of-rdds-for-structured.md) |
| 2 | Call `Cache()` on DataFrames that are reused across... | MEDIUM | [`mobius-call-cache-on-dataframes-that-are-reused-across.md`](mobius-call-cache-on-dataframes-that-are-reused-across.md) |
| 3 | Use `local[*]` master mode for development and unit testing... | CRITICAL | [`mobius-use-local-master-mode-for-development-and-unit-testing.md`](mobius-use-local-master-mode-for-development-and-unit-testing.md) |
| 4 | Partition output data with ` | MEDIUM | [`mobius-partition-output-data-with.md`](mobius-partition-output-data-with.md) |
| 5 | Filter data as early as possible in the pipeline (predicate... | MEDIUM | [`mobius-filter-data-as-early-as-possible-in-the-pipeline-predicate.md`](mobius-filter-data-as-early-as-possible-in-the-pipeline-predicate.md) |
| 6 | Avoid collecting large datasets to the driver with ` | HIGH | [`mobius-avoid-collecting-large-datasets-to-the-driver-with.md`](mobius-avoid-collecting-large-datasets-to-the-driver-with.md) |
| 7 | Monitor job execution through the Spark UI (port 4040) to... | MEDIUM | [`mobius-monitor-job-execution-through-the-spark-ui-port-4040-to.md`](mobius-monitor-job-execution-through-the-spark-ui-port-4040-to.md) |
| 8 | Use Parquet format for intermediate and output data because... | MEDIUM | [`mobius-use-parquet-format-for-intermediate-and-output-data-because.md`](mobius-use-parquet-format-for-intermediate-and-output-data-because.md) |
| 9 | Set `spark | MEDIUM | [`mobius-set-spark.md`](mobius-set-spark.md) |
| 10 | Keep .NET UDFs (user-defined functions) simple and... | MEDIUM | [`mobius-keep-net-udfs-user-defined-functions-simple-and.md`](mobius-keep-net-udfs-user-defined-functions-simple-and.md) |
