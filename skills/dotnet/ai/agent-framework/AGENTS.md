# Agent Framework

## Overview
The Microsoft Semantic Kernel Agent Framework provides a structured way to build AI agents that can use tools, maintain conversation history, and collaborate in multi-agent workflows. It supports ChatCompletionAgent for LLM-backed agents, OpenAIAssistantAgent for the Assistants API, and AgentGroupChat for orchestrating conversations between multiple agents with configurable termination and selection strategies.

## NuGet Packages
```bash
dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.SemanticKernel.Agents.Core
dotnet add package Microsoft.SemanticKernel.Agents.OpenAI
dotnet add package Microsoft.SemanticKernel.Connectors.OpenAI
```

## ChatCompletionAgent
The simplest agent type wraps an `IChatCompletionService` with instructions and optional plugins.

```csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;

var builder = Kernel.CreateBuilder();
builder.AddOpenAIChatCompletion("gpt-4o", Environment.GetEnvironmentVariable("OPENAI_API_KEY")!);
var kernel = builder.Build();

var agent = new ChatCompletionAgent
{
    Name = "CodeReviewer",
    Instructions = """
        You are a senior .NET developer who reviews code for correctness,
        performance, and adherence to best practices. Provide specific,
        actionable feedback with code examples.
        """,
    Kernel = kernel
};

var history = new ChatHistory();
history.AddUserMessage("Review this code: public int Add(int a, int b) => a + b;");

await foreach (var message in agent.InvokeAsync(history))
{
    Console.WriteLine(message.Content);
}
```

## Agents with Plugins (Tools)
Plugins give agents the ability to call functions, access data, and interact with external systems.

```csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using System.ComponentModel;

public class WeatherPlugin
{
    [KernelFunction, Description("Gets the current weather for a city")]
    public string GetWeather(
        [Description("The city name")] string city)
    {
        // In production, call a real weather API
        return city.ToLower() switch
        {
            "seattle" => "62F, cloudy with rain expected",
            "new york" => "75F, sunny and clear",
            "london" => "58F, overcast with light drizzle",
            _ => $"Weather data not available for {city}"
        };
    }

    [KernelFunction, Description("Gets a 5-day forecast for a city")]
    public string GetForecast(
        [Description("The city name")] string city,
        [Description("Number of days (1-5)")] int days = 5)
    {
        return $"Forecast for {city}: next {days} days show moderate temperatures with occasional rain.";
    }
}

var builder = Kernel.CreateBuilder();
builder.AddOpenAIChatCompletion("gpt-4o", apiKey);
builder.Plugins.AddFromType<WeatherPlugin>();
var kernel = builder.Build();

var agent = new ChatCompletionAgent
{
    Name = "WeatherAssistant",
    Instructions = "You help users with weather information. Use the available tools to get real data.",
    Kernel = kernel,
    Arguments = new KernelArguments(
        new OpenAIPromptExecutionSettings { ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions })
};
```

## OpenAI Assistants Agent
Integrates with the OpenAI Assistants API for server-side conversation management, code interpreter, and file search.

```csharp
using Microsoft.SemanticKernel.Agents.OpenAI;
using OpenAI.Files;

var client = OpenAIAssistantAgent.CreateOpenAIClient(apiKey);

var agent = await OpenAIAssistantAgent.CreateAsync(
    client,
    new OpenAIAssistantDefinition("gpt-4o")
    {
        Name = "DataAnalyst",
        Instructions = "You analyze data files and produce insights with charts.",
        EnableCodeInterpreter = true
    });

var thread = await agent.CreateThreadAsync();

await agent.AddChatMessageAsync(thread.Id, new ChatMessageContent(
    AuthorRole.User, "Analyze the sales trends in the attached CSV"));

await foreach (var message in agent.InvokeAsync(thread.Id))
{
    Console.WriteLine($"{message.AuthorName}: {message.Content}");
}

// Cleanup
await agent.DeleteThreadAsync(thread.Id);
await agent.DeleteAsync();
```

## Multi-Agent Chat (AgentGroupChat)
AgentGroupChat orchestrates turn-based conversations between multiple agents with configurable selection and termination.

```csharp
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Agents.Chat;

var writer = new ChatCompletionAgent
{
    Name = "Writer",
    Instructions = """
        You write clear, concise technical documentation.
        When the Reviewer approves your content, respond with exactly: APPROVED.
        """,
    Kernel = kernel
};

var reviewer = new ChatCompletionAgent
{
    Name = "Reviewer",
    Instructions = """
        You review technical documentation for accuracy and clarity.
        Provide specific feedback. Say APPROVED when content meets standards.
        """,
    Kernel = kernel
};

var chat = new AgentGroupChat(writer, reviewer)
{
    ExecutionSettings = new AgentGroupChatSettings
    {
        TerminationStrategy = new ApprovalTerminationStrategy
        {
            Agents = [reviewer],
            MaximumIterations = 10
        },
        SelectionStrategy = new SequentialSelectionStrategy()
    }
};

chat.AddChatMessage(new ChatMessageContent(
    AuthorRole.User,
    "Write documentation for a REST API endpoint that creates a user account."));

await foreach (var message in chat.InvokeAsync())
{
    Console.WriteLine($"[{message.AuthorName}]: {message.Content}");
}
```

### Custom Termination Strategy
```csharp
public class ApprovalTerminationStrategy : TerminationStrategy
{
    protected override Task<bool> ShouldAgentTerminateAsync(
        Agent agent, IReadOnlyList<ChatMessageContent> history,
        CancellationToken cancellationToken = default)
    {
        var lastMessage = history.LastOrDefault()?.Content ?? "";
        return Task.FromResult(
            lastMessage.Contains("APPROVED", StringComparison.OrdinalIgnoreCase));
    }
}
```

## Agent Selection Strategies

| Strategy | Behavior |
|----------|----------|
| `SequentialSelectionStrategy` | Agents take turns in registration order |
| `KernelFunctionSelectionStrategy` | An LLM decides which agent speaks next based on context |

```csharp
// LLM-driven agent selection
var selectionFunction = KernelFunctionFactory.CreateFromPrompt("""
    Given the conversation history, determine which agent should respond next.
    Agents: Writer, Reviewer, FactChecker.
    Only return the agent name, nothing else.

    History:
    {{$history}}
    """);

var settings = new AgentGroupChatSettings
{
    SelectionStrategy = new KernelFunctionSelectionStrategy(selectionFunction, kernel)
    {
        ResultParser = (result) => result.GetValue<string>()?.Trim() ?? "Writer",
        InitialAgent = writer
    }
};
```

## Dependency Injection Integration
```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddOpenAIChatCompletion("gpt-4o", apiKey);
builder.Services.AddKernel();

builder.Services.AddKeyedTransient<ChatCompletionAgent>("support", (sp, _) =>
{
    var kernel = sp.GetRequiredService<Kernel>();
    return new ChatCompletionAgent
    {
        Name = "SupportAgent",
        Instructions = "You are a helpful customer support agent.",
        Kernel = kernel
    };
});

builder.Services.AddTransient<SupportService>();

var host = builder.Build();
host.Run();

public class SupportService(
    [FromKeyedServices("support")] ChatCompletionAgent agent)
{
    public async Task<string> HandleQueryAsync(string userMessage)
    {
        var history = new ChatHistory();
        history.AddUserMessage(userMessage);

        var response = new StringBuilder();
        await foreach (var msg in agent.InvokeAsync(history))
        {
            response.Append(msg.Content);
        }
        return response.ToString();
    }
}
```

## Best Practices
- Keep agent instructions focused on a single role or responsibility; create multiple specialized agents rather than one agent with broad, conflicting instructions.
- Use `KernelFunction` plugins for deterministic operations (database queries, API calls, calculations) rather than relying on the LLM to produce exact values.
- Set `MaximumIterations` on `AgentGroupChatSettings` to prevent runaway multi-agent conversations that consume unbounded tokens.
- Implement custom `TerminationStrategy` classes with explicit completion signals (like "APPROVED") rather than relying on LLM-generated signals that may be ambiguous.
- Register agents as keyed services in DI (`AddKeyedTransient<ChatCompletionAgent>`) so that consumers can resolve specific agents by name without tight coupling.
- Use `KernelFunctionSelectionStrategy` with a clear prompt listing agent names and roles when conversations require dynamic turn order based on context.
- Store `ChatHistory` externally (in a database or cache) for multi-request conversations rather than keeping it in memory, which is lost between HTTP requests.
- Pass `CancellationToken` through all `InvokeAsync` calls so that cancelled HTTP requests stop LLM inference and tool execution immediately.
- Test agents by mocking `IChatCompletionService` to return deterministic responses, verifying that tool calls are made with expected arguments.
- Log each agent turn including agent name, token usage, and tool calls invoked to monitor costs and debug unexpected conversation flows.
