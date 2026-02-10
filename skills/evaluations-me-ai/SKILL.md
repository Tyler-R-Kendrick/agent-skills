---
name: evaluations-me-ai
description: Guidance for using Microsoft.Extensions.AI.Evaluations for AI model evaluation. Use when evaluating AI models and LLM outputs.
license: MIT
metadata:
  displayName: "Evaluations (M.E.AI.Evaluations)"
  author: "Tyler-R-Kendrick"
---

# Microsoft.Extensions.AI.Evaluations

## Overview
Microsoft.Extensions.AI.Evaluations provides tools for evaluating AI model outputs, measuring quality metrics, and running systematic evaluations of LLM-based systems.

Package: `Microsoft.Extensions.AI.Evaluations`

## Installation

```bash
dotnet add package Microsoft.Extensions.AI.Evaluations
```

## Basic Evaluation

```csharp
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluations;

var evaluator = new AnswerRelevanceEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Question = "What is the capital of France?",
    Answer = "Paris",
    GroundTruth = "Paris is the capital of France."
});

Console.WriteLine($"Score: {result.Score}");
Console.WriteLine($"Reasoning: {result.Reasoning}");
```

## Built-in Evaluators

### Answer Relevance

```csharp
var evaluator = new AnswerRelevanceEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Question = "What is photosynthesis?",
    Answer = "Photosynthesis is the process by which plants convert light into energy."
});

// Score: 0-1 (higher is better)
Console.WriteLine($"Relevance Score: {result.Score}");
```

### Groundedness

```csharp
var evaluator = new GroundednessEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Context = "The Eiffel Tower is 330 meters tall.",
    Answer = "The Eiffel Tower is approximately 330 meters in height."
});

Console.WriteLine($"Groundedness Score: {result.Score}");
```

### Coherence

```csharp
var evaluator = new CoherenceEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Answer = "The sky is blue because of Rayleigh scattering. This phenomenon occurs when sunlight interacts with molecules in the atmosphere."
});

Console.WriteLine($"Coherence Score: {result.Score}");
```

### Fluency

```csharp
var evaluator = new FluencyEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Answer = "The quick brown fox jumps over the lazy dog."
});

Console.WriteLine($"Fluency Score: {result.Score}");
```

### Similarity

```csharp
var evaluator = new SimilarityEvaluator();

var result = await evaluator.EvaluateAsync(new EvaluationContext
{
    Answer = "Machine learning is a subset of AI.",
    GroundTruth = "Machine learning is part of artificial intelligence."
});

Console.WriteLine($"Similarity Score: {result.Score}");
```

## Custom Evaluators

```csharp
public class CustomEvaluator : IEvaluator
{
    public async Task<EvaluationResult> EvaluateAsync(
        EvaluationContext context,
        CancellationToken cancellationToken = default)
    {
        // Custom evaluation logic
        var score = CalculateScore(context.Answer);
        
        return new EvaluationResult
        {
            Score = score,
            Reasoning = "Custom evaluation reasoning",
            Metadata = new Dictionary<string, object>
            {
                ["CustomMetric"] = score * 100
            }
        };
    }
    
    private double CalculateScore(string answer)
    {
        // Implement scoring logic
        return answer.Length > 10 ? 1.0 : 0.5;
    }
}
```

## Batch Evaluation

```csharp
using Microsoft.Extensions.AI.Evaluations;

var testCases = new[]
{
    new EvaluationContext
    {
        Question = "What is AI?",
        Answer = "AI is artificial intelligence.",
        GroundTruth = "Artificial Intelligence (AI) refers to computer systems that can perform tasks requiring human intelligence."
    },
    new EvaluationContext
    {
        Question = "What is ML?",
        Answer = "ML is machine learning.",
        GroundTruth = "Machine Learning (ML) is a subset of AI that enables systems to learn from data."
    }
};

var evaluator = new AnswerRelevanceEvaluator();
var results = new List<EvaluationResult>();

foreach (var testCase in testCases)
{
    var result = await evaluator.EvaluateAsync(testCase);
    results.Add(result);
}

var averageScore = results.Average(r => r.Score);
Console.WriteLine($"Average Relevance: {averageScore:F2}");
```

## Evaluation Pipeline

```csharp
public class EvaluationPipeline
{
    private readonly List<IEvaluator> _evaluators;
    
    public EvaluationPipeline()
    {
        _evaluators = new List<IEvaluator>
        {
            new AnswerRelevanceEvaluator(),
            new GroundednessEvaluator(),
            new CoherenceEvaluator(),
            new FluencyEvaluator()
        };
    }
    
    public async Task<Dictionary<string, EvaluationResult>> EvaluateAsync(
        EvaluationContext context)
    {
        var results = new Dictionary<string, EvaluationResult>();
        
        foreach (var evaluator in _evaluators)
        {
            var result = await evaluator.EvaluateAsync(context);
            results[evaluator.GetType().Name] = result;
        }
        
        return results;
    }
}

// Usage
var pipeline = new EvaluationPipeline();
var results = await pipeline.EvaluateAsync(new EvaluationContext
{
    Question = "What is the speed of light?",
    Answer = "The speed of light is approximately 299,792,458 meters per second.",
    Context = "In physics, the speed of light in vacuum is a universal constant.",
    GroundTruth = "The speed of light in vacuum is exactly 299,792,458 m/s."
});

foreach (var (evaluatorName, result) in results)
{
    Console.WriteLine($"{evaluatorName}: {result.Score:F2}");
}
```

## RAG Evaluation

```csharp
public class RagEvaluator
{
    private readonly AnswerRelevanceEvaluator _relevanceEvaluator;
    private readonly GroundednessEvaluator _groundednessEvaluator;
    
    public RagEvaluator()
    {
        _relevanceEvaluator = new AnswerRelevanceEvaluator();
        _groundednessEvaluator = new GroundednessEvaluator();
    }
    
    public async Task<RagEvaluationResult> EvaluateAsync(
        string question,
        string retrievedContext,
        string generatedAnswer)
    {
        var relevanceResult = await _relevanceEvaluator.EvaluateAsync(
            new EvaluationContext
            {
                Question = question,
                Answer = generatedAnswer
            });
        
        var groundednessResult = await _groundednessEvaluator.EvaluateAsync(
            new EvaluationContext
            {
                Context = retrievedContext,
                Answer = generatedAnswer
            });
        
        return new RagEvaluationResult
        {
            RelevanceScore = relevanceResult.Score,
            GroundednessScore = groundednessResult.Score,
            OverallScore = (relevanceResult.Score + groundednessResult.Score) / 2
        };
    }
}

public class RagEvaluationResult
{
    public double RelevanceScore { get; set; }
    public double GroundednessScore { get; set; }
    public double OverallScore { get; set; }
}
```

## A/B Testing

```csharp
public class AbTestEvaluator
{
    private readonly IEvaluator _evaluator;
    
    public AbTestEvaluator(IEvaluator evaluator)
    {
        _evaluator = evaluator;
    }
    
    public async Task<ComparisonResult> CompareAsync(
        string question,
        string answerA,
        string answerB,
        string? groundTruth = null)
    {
        var resultA = await _evaluator.EvaluateAsync(new EvaluationContext
        {
            Question = question,
            Answer = answerA,
            GroundTruth = groundTruth
        });
        
        var resultB = await _evaluator.EvaluateAsync(new EvaluationContext
        {
            Question = question,
            Answer = answerB,
            GroundTruth = groundTruth
        });
        
        return new ComparisonResult
        {
            AnswerAScore = resultA.Score,
            AnswerBScore = resultB.Score,
            Winner = resultA.Score > resultB.Score ? "A" : resultB.Score > resultA.Score ? "B" : "Tie",
            Difference = Math.Abs(resultA.Score - resultB.Score)
        };
    }
}

public class ComparisonResult
{
    public double AnswerAScore { get; set; }
    public double AnswerBScore { get; set; }
    public string Winner { get; set; }
    public double Difference { get; set; }
}
```

## Metrics Aggregation

```csharp
public class MetricsAggregator
{
    public EvaluationMetrics Aggregate(IEnumerable<EvaluationResult> results)
    {
        var scores = results.Select(r => r.Score).ToList();
        
        return new EvaluationMetrics
        {
            Mean = scores.Average(),
            Median = CalculateMedian(scores),
            StandardDeviation = CalculateStdDev(scores),
            Min = scores.Min(),
            Max = scores.Max(),
            Count = scores.Count
        };
    }
    
    private double CalculateMedian(List<double> scores)
    {
        var sorted = scores.OrderBy(x => x).ToList();
        int mid = sorted.Count / 2;
        return sorted.Count % 2 == 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];
    }
    
    private double CalculateStdDev(List<double> scores)
    {
        var mean = scores.Average();
        var sumOfSquares = scores.Sum(x => Math.Pow(x - mean, 2));
        return Math.Sqrt(sumOfSquares / scores.Count);
    }
}

public class EvaluationMetrics
{
    public double Mean { get; set; }
    public double Median { get; set; }
    public double StandardDeviation { get; set; }
    public double Min { get; set; }
    public double Max { get; set; }
    public int Count { get; set; }
}
```

## Evaluation Report

```csharp
public class EvaluationReport
{
    public async Task GenerateReportAsync(
        IEnumerable<EvaluationResult> results,
        string outputPath)
    {
        var aggregator = new MetricsAggregator();
        var metrics = aggregator.Aggregate(results);
        
        var report = new StringBuilder();
        report.AppendLine("# Evaluation Report");
        report.AppendLine($"Generated: {DateTimeOffset.UtcNow}");
        report.AppendLine();
        report.AppendLine("## Summary");
        report.AppendLine($"- Total Evaluations: {metrics.Count}");
        report.AppendLine($"- Mean Score: {metrics.Mean:F2}");
        report.AppendLine($"- Median Score: {metrics.Median:F2}");
        report.AppendLine($"- Std Dev: {metrics.StandardDeviation:F2}");
        report.AppendLine($"- Min: {metrics.Min:F2}");
        report.AppendLine($"- Max: {metrics.Max:F2}");
        report.AppendLine();
        report.AppendLine("## Details");
        
        foreach (var (result, index) in results.Select((r, i) => (r, i)))
        {
            report.AppendLine($"### Evaluation {index + 1}");
            report.AppendLine($"- Score: {result.Score:F2}");
            report.AppendLine($"- Reasoning: {result.Reasoning}");
            report.AppendLine();
        }
        
        await File.WriteAllTextAsync(outputPath, report.ToString());
    }
}
```

## Guidance

- Use evaluators to measure quality of AI-generated outputs.
- Combine multiple evaluators (relevance, groundedness, coherence) for comprehensive assessment.
- Run batch evaluations on test sets to establish baselines.
- Use A/B testing to compare different prompts or models.
- Track metrics over time to detect regressions.
- Create custom evaluators for domain-specific requirements.
- Aggregate scores across test sets for statistical significance.
- Generate reports for stakeholder communication.
- Automate evaluations in CI/CD pipelines.
- Use RAG-specific evaluations (retrieval quality + generation quality).
- Set score thresholds for production readiness.
- Monitor evaluation scores in production with sampling.
- Combine automated evaluations with human review for edge cases.
