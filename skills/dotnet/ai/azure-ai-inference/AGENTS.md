# Azure.AI.Inference

## Overview
Azure.AI.Inference is the .NET SDK for calling models deployed in the Azure AI model catalog (including OpenAI, Mistral, Cohere, Meta Llama, and others) through a unified API. It provides `ChatCompletionsClient` for chat/text generation and `EmbeddingsClient` for vector embeddings, both supporting streaming, tool calling, and structured output with Azure credential integration.

## NuGet Packages
```bash
dotnet add package Azure.AI.Inference
dotnet add package Azure.Identity   # For managed identity / DefaultAzureCredential
```

## Chat Completions
```csharp
using Azure;
using Azure.AI.Inference;

var endpoint = new Uri("https://my-model.eastus.models.ai.azure.com");
var credential = new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_AI_KEY")!);

var client = new ChatCompletionsClient(endpoint, credential);

var requestOptions = new ChatCompletionsOptions
{
    Messages =
    {
        new ChatRequestSystemMessage("You are a helpful coding assistant specializing in C#."),
        new ChatRequestUserMessage("Write a method to validate an email address using regex.")
    },
    Temperature = 0.7f,
    MaxTokens = 1024
};

ChatCompletions response = await client.CompleteAsync(requestOptions);
Console.WriteLine(response.Choices[0].Message.Content);
Console.WriteLine($"Tokens used: {response.Usage.TotalTokens}");
```

## Streaming Chat Completions
```csharp
var requestOptions = new ChatCompletionsOptions
{
    Messages =
    {
        new ChatRequestSystemMessage("You are a technical writer."),
        new ChatRequestUserMessage("Explain async/await in C# with examples.")
    },
    Temperature = 0.5f
};

await foreach (StreamingChatCompletionsUpdate update in
    client.CompleteStreamingAsync(requestOptions))
{
    if (update.ContentUpdate is { } content)
    {
        Console.Write(content);
    }
}
Console.WriteLine();
```

## Using Azure Identity (Managed Identity / Entra ID)
```csharp
using Azure.Identity;
using Azure.AI.Inference;

var endpoint = new Uri("https://my-model.eastus.models.ai.azure.com");
var credential = new DefaultAzureCredential();

var client = new ChatCompletionsClient(endpoint, credential);

var response = await client.CompleteAsync(new ChatCompletionsOptions
{
    Messages =
    {
        new ChatRequestUserMessage("Summarize the benefits of managed identity in Azure.")
    }
});

Console.WriteLine(response.Choices[0].Message.Content);
```

## Embeddings
```csharp
using Azure;
using Azure.AI.Inference;

var endpoint = new Uri("https://my-embedding-model.eastus.models.ai.azure.com");
var credential = new AzureKeyCredential(apiKey);

var client = new EmbeddingsClient(endpoint, credential);

var request = new EmbeddingsOptions(new List<string>
{
    "The quick brown fox jumps over the lazy dog",
    "Azure AI provides enterprise-grade model hosting",
    "Semantic search uses vector embeddings for relevance"
});

EmbeddingsResult result = await client.EmbedAsync(request);

foreach (EmbeddingItem item in result.Data)
{
    Console.WriteLine($"Index {item.Index}: [{string.Join(", ", item.Embedding.ToArray().Take(5))}...]");
    Console.WriteLine($"  Dimensions: {item.Embedding.ToArray().Length}");
}
```

## Tool Calling (Function Calling)
```csharp
using System.Text.Json;

var getWeatherTool = new ChatCompletionsFunctionToolDefinition
{
    Name = "get_weather",
    Description = "Get current weather for a location",
    Parameters = BinaryData.FromObjectAsJson(new
    {
        type = "object",
        properties = new
        {
            location = new { type = "string", description = "City name" },
            unit = new { type = "string", @enum = new[] { "celsius", "fahrenheit" } }
        },
        required = new[] { "location" }
    })
};

var options = new ChatCompletionsOptions
{
    Messages =
    {
        new ChatRequestUserMessage("What's the weather in Seattle?")
    },
    Tools = { getWeatherTool }
};

var response = await client.CompleteAsync(options);
var choice = response.Choices[0];

if (choice.FinishReason == CompletionsFinishReason.ToolCalls)
{
    foreach (var toolCall in choice.Message.ToolCalls.OfType<ChatCompletionsFunctionToolCall>())
    {
        Console.WriteLine($"Function: {toolCall.Name}");
        Console.WriteLine($"Arguments: {toolCall.Arguments}");

        // Execute the function and return the result
        var weatherResult = JsonSerializer.Serialize(new { temperature = 62, condition = "cloudy" });

        options.Messages.Add(new ChatRequestAssistantMessage(choice.Message));
        options.Messages.Add(new ChatRequestToolMessage(toolCall.Id, weatherResult));
    }

    // Get the final response with tool results
    var finalResponse = await client.CompleteAsync(options);
    Console.WriteLine(finalResponse.Choices[0].Message.Content);
}
```

## Multi-Turn Conversation
```csharp
var conversationHistory = new List<ChatRequestMessage>
{
    new ChatRequestSystemMessage("You are a .NET architecture advisor.")
};

async Task<string> ChatAsync(string userMessage)
{
    conversationHistory.Add(new ChatRequestUserMessage(userMessage));

    var options = new ChatCompletionsOptions();
    foreach (var msg in conversationHistory)
    {
        options.Messages.Add(msg);
    }
    options.Temperature = 0.7f;
    options.MaxTokens = 2048;

    var response = await client.CompleteAsync(options);
    var assistantMessage = response.Choices[0].Message.Content;

    conversationHistory.Add(new ChatRequestAssistantMessage(assistantMessage));
    return assistantMessage;
}

Console.WriteLine(await ChatAsync("Should I use microservices or a monolith?"));
Console.WriteLine(await ChatAsync("What about for a team of 3 developers?"));
```

## Model Comparison on Azure AI

| Model Provider | Typical Use | Azure Endpoint Pattern |
|---------------|-------------|----------------------|
| OpenAI (GPT-4o) | General chat, code, reasoning | `*.openai.azure.com` |
| Mistral Large | Multilingual, code, reasoning | `*.models.ai.azure.com` |
| Cohere Command R+ | RAG, search-grounded generation | `*.models.ai.azure.com` |
| Meta Llama 3.1 | Open-weight general purpose | `*.models.ai.azure.com` |
| Phi-3 | Compact, on-device capable | `*.models.ai.azure.com` |

## Dependency Injection Integration
```csharp
using Azure.AI.Inference;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var endpoint = new Uri(config["AzureAI:Endpoint"]!);
    var credential = new DefaultAzureCredential();
    return new ChatCompletionsClient(endpoint, credential);
});

builder.Services.AddSingleton(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var endpoint = new Uri(config["AzureAI:EmbeddingsEndpoint"]!);
    var credential = new DefaultAzureCredential();
    return new EmbeddingsClient(endpoint, credential);
});

var app = builder.Build();

app.MapPost("/chat", async (ChatRequest request, ChatCompletionsClient client) =>
{
    var options = new ChatCompletionsOptions
    {
        Messages = { new ChatRequestUserMessage(request.Message) },
        MaxTokens = 1024
    };
    var response = await client.CompleteAsync(options);
    return Results.Ok(new { response = response.Choices[0].Message.Content });
});

app.Run();

record ChatRequest(string Message);
```

## Best Practices
- Use `DefaultAzureCredential` from `Azure.Identity` instead of API keys in production; it supports managed identity, Azure CLI, and Visual Studio credentials with automatic fallback.
- Register `ChatCompletionsClient` and `EmbeddingsClient` as singletons in DI since they are thread-safe and designed for reuse across requests.
- Set explicit `MaxTokens` on every request to prevent unexpectedly large responses that consume budget; pair this with `Temperature` tuning per use case (0.0 for deterministic, 0.7-1.0 for creative).
- Use `CompleteStreamingAsync` for user-facing chat interfaces to deliver partial responses in real time rather than waiting for full completion.
- Implement retry logic with exponential backoff for transient 429 (rate limit) and 503 (service unavailable) errors; `Azure.Core` provides built-in retry policies via `ChatCompletionsClientOptions`.
- Validate tool call arguments with `JsonSerializer.Deserialize` into strongly-typed models before executing functions to prevent injection of unexpected parameters.
- Trim conversation history to stay within model context windows by summarizing older messages or using a sliding window of recent turns.
- Store endpoint URLs and model deployment names in `IConfiguration` (appsettings, environment variables, or Key Vault) rather than hardcoding them.
- Monitor token usage from `response.Usage.TotalTokens` and log it per request to track costs and detect anomalous consumption patterns.
- Use separate `EmbeddingsClient` instances for different embedding models when your application needs both document embeddings and query embeddings with different dimensionality.
