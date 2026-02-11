---
name: onnx
description: |
  Use when running pre-trained ONNX models for inference in .NET with ONNX Runtime. Covers session management, tensor inputs/outputs, execution providers (CPU/GPU/DirectML), model optimization, and integration with ASP.NET Core.
  USE FOR: running pre-trained ONNX models in .NET, image classification inference, NLP model inference, cross-framework model deployment (PyTorch/TensorFlow to .NET), GPU-accelerated inference with CUDA or DirectML
  DO NOT USE FOR: training ML models from scratch (use mlnet or Python), calling cloud-hosted LLMs (use microsoft-extensions-ai or azure-ai-inference), building agent workflows (use agent-framework), custom ML pipelines with feature engineering (use mlnet)
license: MIT
metadata:
  displayName: "ONNX Runtime"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "ONNX Runtime Documentation"
    url: "https://onnxruntime.ai"
  - title: "ONNX Runtime GitHub Repository"
    url: "https://github.com/microsoft/onnxruntime"
  - title: "Microsoft.ML.OnnxRuntime NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.ML.OnnxRuntime"
---

# ONNX Runtime

## Overview
ONNX Runtime is a high-performance inference engine for running models in the Open Neural Network Exchange (ONNX) format. It enables .NET applications to run models trained in PyTorch, TensorFlow, scikit-learn, or any framework that exports to ONNX. The runtime supports multiple execution providers (CPU, CUDA, DirectML, TensorRT) for hardware-accelerated inference with minimal code changes.

## NuGet Packages
```bash
dotnet add package Microsoft.ML.OnnxRuntime           # CPU inference
dotnet add package Microsoft.ML.OnnxRuntime.Gpu       # CUDA GPU inference
dotnet add package Microsoft.ML.OnnxRuntime.DirectML  # DirectML (Windows GPU)
```

## Basic Inference
```csharp
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;

using var session = new InferenceSession("model.onnx");

// Inspect model inputs and outputs
foreach (var input in session.InputMetadata)
{
    Console.WriteLine($"Input: {input.Key}, Shape: [{string.Join(",", input.Value.Dimensions)}], Type: {input.Value.ElementType}");
}
foreach (var output in session.OutputMetadata)
{
    Console.WriteLine($"Output: {output.Key}, Shape: [{string.Join(",", output.Value.Dimensions)}], Type: {output.Value.ElementType}");
}

// Create input tensor
var inputData = new float[] { 1.0f, 2.0f, 3.0f, 4.0f };
var inputTensor = new DenseTensor<float>(inputData, new[] { 1, 4 });

var inputs = new List<NamedOnnxValue>
{
    NamedOnnxValue.CreateFromTensor("input", inputTensor)
};

// Run inference
using IDisposableReadOnlyCollection<DisposableNamedOnnxValue> results = session.Run(inputs);
var output = results.First().AsTensor<float>();

Console.WriteLine($"Output shape: [{string.Join(",", output.Dimensions.ToArray())}]");
Console.WriteLine($"Values: [{string.Join(", ", output.ToArray())}]");
```

## Image Classification
```csharp
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

public class ImageClassifier : IDisposable
{
    private readonly InferenceSession _session;
    private readonly string[] _labels;

    public ImageClassifier(string modelPath, string labelsPath)
    {
        _session = new InferenceSession(modelPath);
        _labels = File.ReadAllLines(labelsPath);
    }

    public (string Label, float Confidence) Classify(string imagePath)
    {
        // Load and preprocess image (224x224 for typical classification models)
        using var image = Image.Load<Rgb24>(imagePath);
        image.Mutate(x => x.Resize(224, 224));

        // Convert to tensor: [1, 3, 224, 224] in NCHW format
        var tensor = new DenseTensor<float>(new[] { 1, 3, 224, 224 });

        for (int y = 0; y < 224; y++)
        {
            for (int x = 0; x < 224; x++)
            {
                var pixel = image[x, y];
                // Normalize to [0, 1] and apply ImageNet mean/std
                tensor[0, 0, y, x] = (pixel.R / 255f - 0.485f) / 0.229f; // Red
                tensor[0, 1, y, x] = (pixel.G / 255f - 0.456f) / 0.224f; // Green
                tensor[0, 2, y, x] = (pixel.B / 255f - 0.406f) / 0.225f; // Blue
            }
        }

        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor("input", tensor)
        };

        using var results = _session.Run(inputs);
        var probabilities = Softmax(results.First().AsTensor<float>().ToArray());

        int maxIndex = Array.IndexOf(probabilities, probabilities.Max());
        return (_labels[maxIndex], probabilities[maxIndex]);
    }

    private static float[] Softmax(float[] logits)
    {
        float max = logits.Max();
        var exps = logits.Select(x => MathF.Exp(x - max)).ToArray();
        float sum = exps.Sum();
        return exps.Select(x => x / sum).ToArray();
    }

    public void Dispose() => _session.Dispose();
}

// Usage
using var classifier = new ImageClassifier("resnet50.onnx", "imagenet_labels.txt");
var (label, confidence) = classifier.Classify("photo.jpg");
Console.WriteLine($"Predicted: {label} ({confidence:P1})");
```

## Execution Providers
Configure hardware acceleration by selecting execution providers.

```csharp
// CPU (default)
var cpuOptions = new SessionOptions();
using var cpuSession = new InferenceSession("model.onnx", cpuOptions);

// CUDA GPU
var cudaOptions = new SessionOptions();
cudaOptions.AppendExecutionProvider_CUDA(deviceId: 0);
using var gpuSession = new InferenceSession("model.onnx", cudaOptions);

// DirectML (Windows GPU - AMD, Intel, NVIDIA)
var dmlOptions = new SessionOptions();
dmlOptions.AppendExecutionProvider_DML(deviceId: 0);
using var dmlSession = new InferenceSession("model.onnx", dmlOptions);

// TensorRT (NVIDIA optimized)
var trtOptions = new SessionOptions();
trtOptions.AppendExecutionProvider_Tensorrt(deviceId: 0);
trtOptions.AppendExecutionProvider_CUDA(deviceId: 0); // Fallback
using var trtSession = new InferenceSession("model.onnx", trtOptions);
```

## Execution Provider Comparison

| Provider | Package | Platform | Best For |
|----------|---------|----------|----------|
| CPU | `OnnxRuntime` | All | Default, universally available |
| CUDA | `OnnxRuntime.Gpu` | Linux/Windows + NVIDIA | High-throughput GPU inference |
| DirectML | `OnnxRuntime.DirectML` | Windows | Cross-vendor GPU (AMD, Intel, NVIDIA) |
| TensorRT | `OnnxRuntime.Gpu` | Linux + NVIDIA | Maximum NVIDIA throughput |
| CoreML | `OnnxRuntime` | macOS/iOS | Apple Silicon optimization |

## Session Options and Optimization
```csharp
var options = new SessionOptions
{
    // Enable graph optimizations
    GraphOptimizationLevel = GraphOptimizationLevel.ORT_ENABLE_ALL,

    // Set number of intra-op threads (within a single operator)
    IntraOpNumThreads = Environment.ProcessorCount,

    // Set number of inter-op threads (between operators)
    InterOpNumThreads = 2,

    // Enable memory pattern optimization
    EnableMemoryPattern = true,

    // Save optimized model to disk for faster subsequent loads
    OptimizedModelFilePath = "model_optimized.onnx"
};

using var session = new InferenceSession("model.onnx", options);
```

## Batch Inference
```csharp
public class BatchPredictor : IDisposable
{
    private readonly InferenceSession _session;

    public BatchPredictor(string modelPath)
    {
        var options = new SessionOptions
        {
            GraphOptimizationLevel = GraphOptimizationLevel.ORT_ENABLE_ALL
        };
        _session = new InferenceSession(modelPath, options);
    }

    public float[][] PredictBatch(float[][] inputs, int featureCount)
    {
        int batchSize = inputs.Length;

        // Flatten batch into single tensor: [batchSize, featureCount]
        var flatInput = new float[batchSize * featureCount];
        for (int i = 0; i < batchSize; i++)
        {
            Array.Copy(inputs[i], 0, flatInput, i * featureCount, featureCount);
        }

        var tensor = new DenseTensor<float>(flatInput, new[] { batchSize, featureCount });
        var onnxInputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor("input", tensor)
        };

        using var results = _session.Run(onnxInputs);
        var outputTensor = results.First().AsTensor<float>();
        int outputSize = outputTensor.Dimensions[1];

        var outputs = new float[batchSize][];
        for (int i = 0; i < batchSize; i++)
        {
            outputs[i] = new float[outputSize];
            for (int j = 0; j < outputSize; j++)
            {
                outputs[i][j] = outputTensor[i, j];
            }
        }

        return outputs;
    }

    public void Dispose() => _session.Dispose();
}
```

## ASP.NET Core Integration
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(sp =>
{
    var options = new SessionOptions
    {
        GraphOptimizationLevel = GraphOptimizationLevel.ORT_ENABLE_ALL,
        IntraOpNumThreads = 4
    };
    return new InferenceSession("model.onnx", options);
});

var app = builder.Build();

app.MapPost("/predict", (PredictRequest request, InferenceSession session) =>
{
    var tensor = new DenseTensor<float>(
        request.Features, new[] { 1, request.Features.Length });

    var inputs = new List<NamedOnnxValue>
    {
        NamedOnnxValue.CreateFromTensor("input", tensor)
    };

    using var results = session.Run(inputs);
    var output = results.First().AsTensor<float>().ToArray();

    return Results.Ok(new { predictions = output });
});

app.Run();

record PredictRequest(float[] Features);
```

## Text Embedding with ONNX
```csharp
public class TextEmbedder : IDisposable
{
    private readonly InferenceSession _session;

    public TextEmbedder(string modelPath)
    {
        _session = new InferenceSession(modelPath);
    }

    public float[] Embed(long[] inputIds, long[] attentionMask)
    {
        var idsTensor = new DenseTensor<long>(inputIds, new[] { 1, inputIds.Length });
        var maskTensor = new DenseTensor<long>(attentionMask, new[] { 1, attentionMask.Length });

        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor("input_ids", idsTensor),
            NamedOnnxValue.CreateFromTensor("attention_mask", maskTensor)
        };

        using var results = _session.Run(inputs);
        var embeddings = results.First().AsTensor<float>();

        // Mean pooling over sequence dimension
        int seqLen = inputIds.Length;
        int hiddenSize = embeddings.Dimensions[2];
        var pooled = new float[hiddenSize];

        int validTokens = attentionMask.Sum(m => (int)m);
        for (int h = 0; h < hiddenSize; h++)
        {
            float sum = 0;
            for (int s = 0; s < seqLen; s++)
            {
                if (attentionMask[s] == 1)
                    sum += embeddings[0, s, h];
            }
            pooled[h] = sum / validTokens;
        }

        return pooled;
    }

    public void Dispose() => _session.Dispose();
}
```

## Best Practices
- Register `InferenceSession` as a singleton in DI because it is thread-safe for `Run()` calls and expensive to initialize; creating a session per request causes severe performance degradation.
- Inspect `session.InputMetadata` and `session.OutputMetadata` at startup to verify input/output names, shapes, and data types match your code rather than relying on documentation that may be outdated.
- Use `GraphOptimizationLevel.ORT_ENABLE_ALL` in `SessionOptions` to enable constant folding, node fusion, and memory planning optimizations that reduce inference latency by 10-30%.
- Set `OptimizedModelFilePath` on `SessionOptions` to save the optimized graph to disk; subsequent loads skip optimization and start faster.
- Batch multiple inputs into a single tensor (e.g., shape `[N, features]`) and call `session.Run` once rather than looping N times, reducing overhead from session lock acquisition and memory allocation.
- Pre-allocate `DenseTensor<T>` instances and reuse them across inference calls in hot paths to avoid repeated heap allocations that trigger garbage collection pauses.
- Add CUDA or DirectML execution providers with a CPU fallback (`AppendExecutionProvider_CUDA` followed by default CPU) so the application runs on any machine regardless of GPU availability.
- Normalize input data consistently with the model's training preprocessing (e.g., ImageNet mean/std for vision models, tokenizer for NLP models); mismatched normalization is the most common cause of incorrect predictions.
- Use `session.Run(inputs, outputNames)` with explicit output names when the model has multiple outputs to avoid deserializing outputs you do not need.
- Monitor inference latency with `Stopwatch` or OpenTelemetry and set up alerts for p99 latency regressions that may indicate model size issues or execution provider misconfiguration.
