# MCP (Model Context Protocol)

## Overview
The Model Context Protocol (MCP) is an open standard for connecting AI models to external tools, resources, and data. The official .NET SDK (`ModelContextProtocol`) provides server and client implementations that expose .NET methods as tools, serve resources and prompt templates, and communicate over stdio or SSE transports. MCP servers integrate directly with Claude Desktop, VS Code Copilot, and any MCP-compatible client.

## NuGet Packages
```bash
dotnet add package ModelContextProtocol
dotnet add package ModelContextProtocol.AspNetCore   # For HTTP/SSE transport
```

## MCP Server with Tools (Stdio Transport)
The simplest MCP server exposes tools via standard I/O, suitable for local integrations like Claude Desktop.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly(typeof(Program).Assembly);

var host = builder.Build();
await host.RunAsync();

[McpServerToolType]
public static class FileTools
{
    [McpServerTool, Description("Read the contents of a file at the given path")]
    public static string ReadFile(
        [Description("Absolute path to the file")] string path)
    {
        if (!File.Exists(path))
            throw new FileNotFoundException($"File not found: {path}");
        return File.ReadAllText(path);
    }

    [McpServerTool, Description("List files in a directory with optional pattern matching")]
    public static string[] ListFiles(
        [Description("Directory path to list")] string directory,
        [Description("Search pattern (e.g., *.cs)")] string pattern = "*")
    {
        if (!Directory.Exists(directory))
            throw new DirectoryNotFoundException($"Directory not found: {directory}");
        return Directory.GetFiles(directory, pattern, SearchOption.AllDirectories);
    }

    [McpServerTool, Description("Write text content to a file")]
    public static string WriteFile(
        [Description("Absolute path to the file")] string path,
        [Description("Content to write")] string content)
    {
        File.WriteAllText(path, content);
        return $"Successfully wrote {content.Length} characters to {path}";
    }
}
```

## MCP Server with HTTP/SSE Transport
For remote and web-based integrations, use the ASP.NET Core transport.

```csharp
using ModelContextProtocol.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMcpServer()
    .WithToolsFromAssembly(typeof(Program).Assembly);

var app = builder.Build();
app.MapMcp();
app.Run();
```

## Tools with Dependency Injection
MCP tools can receive services from DI by using non-static classes.

```csharp
[McpServerToolType]
public class DatabaseTools
{
    private readonly IDbConnection _db;
    private readonly ILogger<DatabaseTools> _logger;

    public DatabaseTools(IDbConnection db, ILogger<DatabaseTools> logger)
    {
        _db = db;
        _logger = logger;
    }

    [McpServerTool, Description("Execute a read-only SQL query and return results as JSON")]
    public async Task<string> QueryDatabase(
        [Description("SQL SELECT query to execute")] string query,
        CancellationToken cancellationToken = default)
    {
        if (!query.TrimStart().StartsWith("SELECT", StringComparison.OrdinalIgnoreCase))
            throw new ArgumentException("Only SELECT queries are allowed");

        _logger.LogInformation("Executing query: {Query}", query);

        using var command = _db.CreateCommand();
        command.CommandText = query;

        using var reader = await command.ExecuteReaderAsync(cancellationToken);
        var results = new List<Dictionary<string, object?>>();

        while (await reader.ReadAsync(cancellationToken))
        {
            var row = new Dictionary<string, object?>();
            for (int i = 0; i < reader.FieldCount; i++)
            {
                row[reader.GetName(i)] = reader.IsDBNull(i) ? null : reader.GetValue(i);
            }
            results.Add(row);
        }

        return JsonSerializer.Serialize(results, new JsonSerializerOptions { WriteIndented = true });
    }
}
```

## Resource Providers
Resources expose data that LLM clients can reference as context.

```csharp
[McpServerToolType]
public static class ResourceProviders
{
    [McpServerResource("config://app-settings"),
     Description("Current application configuration")]
    public static string GetAppSettings()
    {
        return JsonSerializer.Serialize(new
        {
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            version = typeof(Program).Assembly.GetName().Version?.ToString(),
            features = new { caching = true, rateLimit = 100 }
        });
    }

    [McpServerResource("docs://api-reference"),
     Description("API reference documentation for the service")]
    public static string GetApiDocs()
    {
        return """
            ## Endpoints
            - GET /api/users - List all users
            - GET /api/users/{id} - Get user by ID
            - POST /api/users - Create a new user
            - PUT /api/users/{id} - Update a user
            - DELETE /api/users/{id} - Delete a user
            """;
    }
}
```

## MCP Client
Connect to an MCP server to discover and call its tools.

```csharp
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol;

var client = await McpClientFactory.CreateAsync(
    new McpClientOptions
    {
        ClientInfo = new Implementation { Name = "MyApp", Version = "1.0.0" }
    },
    new StdioClientTransport(new StdioClientTransportOptions
    {
        Command = "dotnet",
        Arguments = ["run", "--project", "./MyMcpServer/MyMcpServer.csproj"]
    }));

// List available tools
var tools = await client.ListToolsAsync();
foreach (var tool in tools)
{
    Console.WriteLine($"Tool: {tool.Name} - {tool.Description}");
}

// Call a tool
var result = await client.CallToolAsync("ReadFile", new Dictionary<string, object?>
{
    ["path"] = "/tmp/example.txt"
});

Console.WriteLine(result.Content.OfType<TextContent>().FirstOrDefault()?.Text);
```

## Integration with Microsoft.Extensions.AI
Use MCP tools as `AIFunction` instances that can be passed to any `IChatClient`.

```csharp
using Microsoft.Extensions.AI;
using ModelContextProtocol.Client;

var mcpClient = await McpClientFactory.CreateAsync(clientOptions, transport);

// Get tools as AIFunctions
var tools = await mcpClient.ListToolsAsync();
var aiTools = tools.Select(t => t.AsAIFunction()).ToList();

var chatClient = new ChatCompletionsClient(endpoint, credential)
    .AsChatClient("gpt-4o");

var chatOptions = new ChatOptions
{
    Tools = aiTools.Cast<AITool>().ToList()
};

var messages = new List<ChatMessage>
{
    new(ChatRole.User, "List all C# files in the /src directory")
};

var response = await chatClient.GetResponseAsync(messages, chatOptions);
Console.WriteLine(response.Messages.Last().Text);
```

## Integration with Semantic Kernel
```csharp
using Microsoft.SemanticKernel;
using ModelContextProtocol.Client;

var mcpClient = await McpClientFactory.CreateAsync(clientOptions, transport);
var tools = await mcpClient.ListToolsAsync();

var kernelBuilder = Kernel.CreateBuilder();
kernelBuilder.AddOpenAIChatCompletion("gpt-4o", apiKey);
var kernel = kernelBuilder.Build();

// Register MCP tools as Kernel functions
foreach (var tool in tools)
{
    kernel.ImportPluginFromFunctions(tool.Name, [tool.AsKernelFunction()]);
}
```

## Claude Desktop Configuration
To connect your MCP server with Claude Desktop, add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "my-dotnet-server": {
      "command": "dotnet",
      "args": ["run", "--project", "C:/path/to/MyMcpServer.csproj"],
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## Best Practices
- Mark tool methods with `[Description]` attributes on both the method and each parameter to provide clear documentation that LLM clients use when deciding which tools to call and how to format arguments.
- Validate all tool inputs before execution; reject SQL queries that are not SELECT statements, validate file paths against allowed directories, and sanitize string inputs to prevent injection.
- Use `CancellationToken` parameters on async tool methods so that client disconnections and timeouts stop processing immediately rather than wasting resources.
- Return structured text (JSON, markdown) from tools rather than raw unformatted strings, so the LLM can parse and present results more effectively.
- Register tools from the assembly (`WithToolsFromAssembly`) for automatic discovery, but organize tool classes by domain (e.g., `FileTools`, `DatabaseTools`, `ApiTools`) for maintainability.
- Use the HTTP/SSE transport (`ModelContextProtocol.AspNetCore`) for remote deployments and multi-user scenarios; use stdio transport only for local, single-user integrations like Claude Desktop.
- Implement idempotent tool operations where possible (e.g., upsert instead of insert) because LLM clients may retry tool calls on ambiguous responses.
- Keep tool responses under 10,000 characters to avoid consuming excessive context window; paginate large result sets and return counts with partial data.
- Log every tool invocation with input parameters and execution duration to monitor usage patterns and identify slow or frequently-failing tools.
- Test MCP tools independently with unit tests that verify argument validation, error handling, and return format before connecting them to an LLM client.
