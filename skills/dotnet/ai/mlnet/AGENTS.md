# ML.NET

## Overview
ML.NET is a cross-platform machine learning framework for .NET developers to build custom ML models.

## Example
```csharp
using Microsoft.ML;

var mlContext = new MLContext();

// Load data
var data = mlContext.Data.LoadFromTextFile<HouseData>(
    "data.csv", separatorChar: ',', hasHeader: true);

// Build pipeline
var pipeline = mlContext.Transforms.Concatenate("Features", "Size", "Bedrooms")
    .Append(mlContext.Regression.Trainers.FastTree());

// Train model
var model = pipeline.Fit(data);

// Make prediction
var predictor = mlContext.Model.CreatePredictionEngine<HouseData, Prediction>(model);
var prediction = predictor.Predict(new HouseData { Size = 1200, Bedrooms = 3 });
```

## Scenarios
- Classification
- Regression
- Clustering
- Anomaly detection
- Recommendation

## Best Practices
- Split data for training/validation
- Use AutoML for experimentation
- Monitor model performance
- Version models
