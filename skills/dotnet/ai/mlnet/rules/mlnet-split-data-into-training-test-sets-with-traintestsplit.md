---
title: "Split data into training/test sets with `TrainTestSplit`..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mlnet, dotnet, ai, training-custom-ml-models-in-net, binary-and-multi-class-classification, regression-and-forecasting
---

## Split data into training/test sets with `TrainTestSplit`...

Split data into training/test sets with `TrainTestSplit` (80/20 ratio) before fitting the pipeline; never evaluate a model on the same data it was trained on.
