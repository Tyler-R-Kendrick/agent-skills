# ONNX

## Overview
ONNX (Open Neural Network Exchange) Runtime enables running ML models across different frameworks and platforms.

## Example
```csharp
using Microsoft.ML.OnnxRuntime;

var sessionOptions = new SessionOptions();
using var session = new InferenceSession("model.onnx", sessionOptions);

// Prepare input
var inputData = new float[] { 1.0f, 2.0f, 3.0f };
var tensor = new DenseTensor<float>(inputData, new[] { 1, 3 });

var inputs = new List<NamedOnnxValue>
{
    NamedOnnxValue.CreateFromTensor("input", tensor)
};

// Run inference
using var results = session.Run(inputs);
var output = results.First().AsTensor<float>().ToArray();
```

## Best Practices
- Optimize models before export
- Use appropriate execution providers (CPU/GPU)
- Batch inputs when possible
- Monitor inference performance
- Version your models
