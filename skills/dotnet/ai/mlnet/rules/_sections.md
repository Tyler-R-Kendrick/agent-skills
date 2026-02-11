# ML.NET Rules

Best practices and rules for ML.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set `MLContext(seed | CRITICAL | [`mlnet-always-set-mlcontext-seed.md`](mlnet-always-set-mlcontext-seed.md) |
| 2 | Split data into training/test sets with `TrainTestSplit`... | CRITICAL | [`mlnet-split-data-into-training-test-sets-with-traintestsplit.md`](mlnet-split-data-into-training-test-sets-with-traintestsplit.md) |
| 3 | Use `NormalizeMinMax` or `NormalizeMeanVariance` transforms... | MEDIUM | [`mlnet-use-normalizeminmax-or-normalizemeanvariance-transforms.md`](mlnet-use-normalizeminmax-or-normalizemeanvariance-transforms.md) |
| 4 | Use `PredictionEnginePool<TInput, TOutput>` instead of... | MEDIUM | [`mlnet-use-predictionenginepool-tinput-toutput-instead-of.md`](mlnet-use-predictionenginepool-tinput-toutput-instead-of.md) |
| 5 | Run AutoML experiments with a time limit... | CRITICAL | [`mlnet-run-automl-experiments-with-a-time-limit.md`](mlnet-run-automl-experiments-with-a-time-limit.md) |
| 6 | Examine feature importance with `model | MEDIUM | [`mlnet-examine-feature-importance-with-model.md`](mlnet-examine-feature-importance-with-model.md) |
| 7 | Save trained models with `mlContext | MEDIUM | [`mlnet-save-trained-models-with-mlcontext.md`](mlnet-save-trained-models-with-mlcontext.md) |
| 8 | Log evaluation metrics (R-Squared, RMSE, F1 Score, AUC) in... | MEDIUM | [`mlnet-log-evaluation-metrics-r-squared-rmse-f1-score-auc-in.md`](mlnet-log-evaluation-metrics-r-squared-rmse-f1-score-auc-in.md) |
| 9 | Use `ColumnName` and `LoadColumn` attributes explicitly on... | HIGH | [`mlnet-use-columnname-and-loadcolumn-attributes-explicitly-on.md`](mlnet-use-columnname-and-loadcolumn-attributes-explicitly-on.md) |
| 10 | Preprocess text with `FeaturizeText` which handles... | MEDIUM | [`mlnet-preprocess-text-with-featurizetext-which-handles.md`](mlnet-preprocess-text-with-featurizetext-which-handles.md) |
