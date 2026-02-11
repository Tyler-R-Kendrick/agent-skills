---
name: mlnet
description: |
  Use when building custom machine learning models in .NET with ML.NET. Covers data loading, training pipelines, prediction engines, AutoML, model evaluation, and deployment for classification, regression, clustering, and anomaly detection.
  USE FOR: training custom ML models in .NET, binary and multi-class classification, regression and forecasting, clustering and anomaly detection, AutoML experimentation, model serialization and deployment
  DO NOT USE FOR: running pre-trained ONNX models (use onnx), calling cloud-hosted LLMs (use microsoft-extensions-ai or azure-ai-inference), building AI agent workflows (use agent-framework), deep learning with GPU training (use TorchSharp or Python)
license: MIT
metadata:
  displayName: "ML.NET"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "ML.NET Documentation"
    url: "https://learn.microsoft.com/dotnet/machine-learning"
  - title: "ML.NET GitHub Repository"
    url: "https://github.com/dotnet/machinelearning"
  - title: "Microsoft.ML NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.ML"
---

# ML.NET

## Overview
ML.NET is Microsoft's cross-platform machine learning framework for .NET developers. It provides a pipeline-based API for loading data, transforming features, training models, and making predictions without requiring deep ML expertise. ML.NET supports classification, regression, clustering, anomaly detection, recommendation, and time-series forecasting, with AutoML for automated model selection and hyperparameter tuning.

## NuGet Packages
```bash
dotnet add package Microsoft.ML
dotnet add package Microsoft.ML.AutoML           # AutoML experimentation
dotnet add package Microsoft.ML.TimeSeries       # Time-series forecasting
dotnet add package Microsoft.ML.Recommender      # Recommendation engine
dotnet add package Microsoft.ML.ImageAnalytics   # Image classification
```

## Data Classes
ML.NET uses POCOs (Plain Old C# Objects) to represent input data and predictions.

```csharp
using Microsoft.ML.Data;

public class HouseData
{
    [LoadColumn(0)] public float Size { get; set; }
    [LoadColumn(1)] public float Bedrooms { get; set; }
    [LoadColumn(2)] public float Bathrooms { get; set; }
    [LoadColumn(3)] public float Age { get; set; }
    [LoadColumn(4)] public float Price { get; set; }
}

public class HousePrediction
{
    [ColumnName("Score")]
    public float PredictedPrice { get; set; }
}

public class SentimentData
{
    [LoadColumn(0)] public string? Text { get; set; }
    [LoadColumn(1), ColumnName("Label")] public bool Sentiment { get; set; }
}

public class SentimentPrediction
{
    [ColumnName("PredictedLabel")]
    public bool Prediction { get; set; }
    public float Probability { get; set; }
    public float Score { get; set; }
}
```

## Regression (Price Prediction)
```csharp
using Microsoft.ML;

var mlContext = new MLContext(seed: 42);

// Load data
IDataView data = mlContext.Data.LoadFromTextFile<HouseData>(
    "houses.csv", separatorChar: ',', hasHeader: true);

// Split into training and test sets
var split = mlContext.Data.TrainTestSplit(data, testFraction: 0.2);

// Build pipeline: feature engineering + training algorithm
var pipeline = mlContext.Transforms.Concatenate(
        "Features", nameof(HouseData.Size), nameof(HouseData.Bedrooms),
        nameof(HouseData.Bathrooms), nameof(HouseData.Age))
    .Append(mlContext.Transforms.NormalizeMinMax("Features"))
    .Append(mlContext.Regression.Trainers.FastTree(
        labelColumnName: nameof(HouseData.Price),
        numberOfLeaves: 20,
        numberOfTrees: 100,
        minimumExampleCountPerLeaf: 10,
        learningRate: 0.2));

// Train the model
var model = pipeline.Fit(split.TrainSet);

// Evaluate on test set
var predictions = model.Transform(split.TestSet);
var metrics = mlContext.Regression.Evaluate(predictions, labelColumnName: nameof(HouseData.Price));

Console.WriteLine($"R-Squared: {metrics.RSquared:F4}");
Console.WriteLine($"RMSE: {metrics.RootMeanSquaredError:F2}");
Console.WriteLine($"MAE: {metrics.MeanAbsoluteError:F2}");

// Make a prediction
var predictor = mlContext.Model.CreatePredictionEngine<HouseData, HousePrediction>(model);
var prediction = predictor.Predict(new HouseData
{
    Size = 1500, Bedrooms = 3, Bathrooms = 2, Age = 10
});
Console.WriteLine($"Predicted price: ${prediction.PredictedPrice:N0}");
```

## Binary Classification (Sentiment Analysis)
```csharp
var mlContext = new MLContext(seed: 42);

IDataView data = mlContext.Data.LoadFromTextFile<SentimentData>(
    "sentiment.csv", separatorChar: ',', hasHeader: true);

var split = mlContext.Data.TrainTestSplit(data, testFraction: 0.2);

var pipeline = mlContext.Transforms.Text
    .FeaturizeText("Features", nameof(SentimentData.Text))
    .Append(mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(
        labelColumnName: "Label",
        featureColumnName: "Features"));

var model = pipeline.Fit(split.TrainSet);

var predictions = model.Transform(split.TestSet);
var metrics = mlContext.BinaryClassification.Evaluate(predictions, "Label");

Console.WriteLine($"Accuracy: {metrics.Accuracy:P2}");
Console.WriteLine($"AUC: {metrics.AreaUnderRocCurve:F4}");
Console.WriteLine($"F1 Score: {metrics.F1Score:F4}");

var predictor = mlContext.Model.CreatePredictionEngine<SentimentData, SentimentPrediction>(model);
var result = predictor.Predict(new SentimentData { Text = "This product is amazing!" });
Console.WriteLine($"Sentiment: {(result.Prediction ? "Positive" : "Negative")} ({result.Probability:P1})");
```

## Multi-Class Classification
```csharp
public class IssueData
{
    [LoadColumn(0)] public string? Title { get; set; }
    [LoadColumn(1)] public string? Description { get; set; }
    [LoadColumn(2)] public string? Area { get; set; }  // Label: bug, feature, docs
}

public class IssuePrediction
{
    [ColumnName("PredictedLabel")]
    public string? Area { get; set; }
    public float[] Score { get; set; } = [];
}

var pipeline = mlContext.Transforms.Conversion.MapValueToKey("Label", nameof(IssueData.Area))
    .Append(mlContext.Transforms.Text.FeaturizeText("TitleFeatures", nameof(IssueData.Title)))
    .Append(mlContext.Transforms.Text.FeaturizeText("DescFeatures", nameof(IssueData.Description)))
    .Append(mlContext.Transforms.Concatenate("Features", "TitleFeatures", "DescFeatures"))
    .Append(mlContext.MulticlassClassification.Trainers.SdcaMaximumEntropy())
    .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabel"));

var model = pipeline.Fit(trainData);
```

## AutoML
Let ML.NET automatically discover the best algorithm and hyperparameters.

```csharp
using Microsoft.ML.AutoML;

var mlContext = new MLContext(seed: 42);

var data = mlContext.Data.LoadFromTextFile<HouseData>(
    "houses.csv", separatorChar: ',', hasHeader: true);

var split = mlContext.Data.TrainTestSplit(data, testFraction: 0.2);

// Run AutoML experiment for up to 60 seconds
var experiment = mlContext.Auto()
    .CreateRegressionExperiment(maxExperimentTimeInSeconds: 60);

var result = experiment.Execute(
    split.TrainSet,
    labelColumnName: nameof(HouseData.Price));

Console.WriteLine($"Best algorithm: {result.BestRun.TrainerName}");
Console.WriteLine($"Best R-Squared: {result.BestRun.ValidationMetrics.RSquared:F4}");

// Use the best model
var bestModel = result.BestRun.Model;
var predictor = mlContext.Model.CreatePredictionEngine<HouseData, HousePrediction>(bestModel);
```

## Model Serialization and Loading
```csharp
// Save model to file
mlContext.Model.Save(model, data.Schema, "model.zip");

// Load model from file
ITransformer loadedModel = mlContext.Model.Load("model.zip", out DataViewSchema schema);

// Create prediction engine from loaded model
var predictor = mlContext.Model.CreatePredictionEngine<HouseData, HousePrediction>(loadedModel);
var prediction = predictor.Predict(new HouseData { Size = 2000, Bedrooms = 4 });
```

## Integration with ASP.NET Core
```csharp
var builder = WebApplication.CreateBuilder(args);

// Load model once at startup
var mlContext = new MLContext();
var model = mlContext.Model.Load("model.zip", out _);

builder.Services.AddSingleton(model);
builder.Services.AddSingleton(mlContext);

// PredictionEnginePool for thread-safe predictions
builder.Services.AddPredictionEnginePool<HouseData, HousePrediction>()
    .FromFile("model.zip");

var app = builder.Build();

app.MapPost("/predict", (
    HouseData input,
    PredictionEnginePool<HouseData, HousePrediction> pool) =>
{
    var prediction = pool.Predict(input);
    return Results.Ok(new { predictedPrice = prediction.PredictedPrice });
});

app.Run();
```

## Trainer Comparison

| Task | Trainer | Best For |
|------|---------|----------|
| Regression | `FastTree` | Non-linear relationships, large datasets |
| Regression | `Sdca` | Linear relationships, sparse features |
| Regression | `LightGbm` | High accuracy, gradient boosting |
| Binary Classification | `SdcaLogisticRegression` | Text classification, sparse features |
| Binary Classification | `FastTree` | Non-linear decision boundaries |
| Multi-class | `SdcaMaximumEntropy` | Many categories, text input |
| Clustering | `KMeans` | Customer segmentation, grouping |
| Anomaly Detection | `RandomizedPca` | Outlier detection in high-dimensional data |

## Best Practices
- Always set `MLContext(seed: 42)` (or any fixed seed) during development and evaluation to ensure reproducible results across training runs.
- Split data into training/test sets with `TrainTestSplit` (80/20 ratio) before fitting the pipeline; never evaluate a model on the same data it was trained on.
- Use `NormalizeMinMax` or `NormalizeMeanVariance` transforms before training when features have different scales (e.g., square footage vs. number of bedrooms).
- Use `PredictionEnginePool<TInput, TOutput>` instead of `PredictionEngine` in ASP.NET Core because `PredictionEngine` is not thread-safe and creates performance bottlenecks under concurrent requests.
- Run AutoML experiments with a time limit (`maxExperimentTimeInSeconds`) during exploration, then use the winning algorithm directly in production pipelines for faster startup.
- Examine feature importance with `model.GetFeatureWeights()` or permutation feature importance to identify which input columns drive predictions and remove noise features.
- Save trained models with `mlContext.Model.Save(model, schema, "model.zip")` and version them alongside your code so you can roll back to previous model versions.
- Log evaluation metrics (R-Squared, RMSE, F1 Score, AUC) in CI/CD pipelines and fail builds when metrics regress below established thresholds.
- Use `ColumnName` and `LoadColumn` attributes explicitly on data classes to decouple CSV column order from property names and prevent silent data misalignment.
- Preprocess text with `FeaturizeText` which handles tokenization, n-grams, and TF-IDF in one step rather than implementing custom text vectorization.
