# ONNX Runtime Rules

Best practices and rules for ONNX Runtime.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Register `InferenceSession` as a singleton in DI because it... | MEDIUM | [`onnx-register-inferencesession-as-a-singleton-in-di-because-it.md`](onnx-register-inferencesession-as-a-singleton-in-di-because-it.md) |
| 2 | Inspect `session | MEDIUM | [`onnx-inspect-session.md`](onnx-inspect-session.md) |
| 3 | Use `GraphOptimizationLevel | MEDIUM | [`onnx-use-graphoptimizationlevel.md`](onnx-use-graphoptimizationlevel.md) |
| 4 | Set `OptimizedModelFilePath` on `SessionOptions` to save... | MEDIUM | [`onnx-set-optimizedmodelfilepath-on-sessionoptions-to-save.md`](onnx-set-optimizedmodelfilepath-on-sessionoptions-to-save.md) |
| 5 | Batch multiple inputs into a single tensor (e | MEDIUM | [`onnx-batch-multiple-inputs-into-a-single-tensor-e.md`](onnx-batch-multiple-inputs-into-a-single-tensor-e.md) |
| 6 | Pre-allocate `DenseTensor<T>` instances and reuse them... | HIGH | [`onnx-pre-allocate-densetensor-t-instances-and-reuse-them.md`](onnx-pre-allocate-densetensor-t-instances-and-reuse-them.md) |
| 7 | Add CUDA or DirectML execution providers with a CPU... | MEDIUM | [`onnx-add-cuda-or-directml-execution-providers-with-a-cpu.md`](onnx-add-cuda-or-directml-execution-providers-with-a-cpu.md) |
| 8 | Normalize input data consistently with the model's training... | MEDIUM | [`onnx-normalize-input-data-consistently-with-the-model-s-training.md`](onnx-normalize-input-data-consistently-with-the-model-s-training.md) |
| 9 | Use `session | CRITICAL | [`onnx-use-session.md`](onnx-use-session.md) |
| 10 | Monitor inference latency with `Stopwatch` or OpenTelemetry... | MEDIUM | [`onnx-monitor-inference-latency-with-stopwatch-or-opentelemetry.md`](onnx-monitor-inference-latency-with-stopwatch-or-opentelemetry.md) |
