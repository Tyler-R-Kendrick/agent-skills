---
name: twilio
description: >
  Guidance for Twilio .NET SDK for communications APIs.
  USE FOR: sending SMS and MMS, making voice calls, Twilio Verify for phone verification, WhatsApp messaging, webhook handling for incoming messages/calls, Twilio programmable video.
  DO NOT USE FOR: email sending (use mimekit), HTTP APIs (use ASP.NET Core), gRPC services (use grpc-dotnet), custom socket protocols (use dotnetty).
license: MIT
metadata:
  displayName: "Twilio"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Twilio

## Overview

Twilio provides cloud communications APIs for SMS, MMS, voice calls, WhatsApp messaging, video, and phone number verification. The `Twilio` NuGet package offers a .NET SDK that wraps the Twilio REST API with strongly-typed resource classes. Each communication channel (SMS, voice, WhatsApp) uses the same `MessageResource` or `CallResource` pattern, differing only in the phone number format and configuration.

Twilio uses a webhook-based architecture: when a message arrives or a call connects, Twilio sends an HTTP request to your application with the event details. Your application responds with TwiML (Twilio Markup Language) to control the call flow or message response.

## SDK Initialization and Configuration

Initialize the Twilio client with credentials from configuration, never hard-coded.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Clients;

public class TwilioSettings
{
    public string AccountSid { get; set; } = string.Empty;
    public string AuthToken { get; set; } = string.Empty;
    public string FromPhoneNumber { get; set; } = string.Empty;
    public string FromWhatsAppNumber { get; set; } = string.Empty;
}

// Registration in Program.cs
// builder.Services.Configure<TwilioSettings>(
//     builder.Configuration.GetSection("Twilio"));
// builder.Services.AddSingleton<ITwilioRestClient>(sp =>
// {
//     var settings = sp.GetRequiredService<IOptions<TwilioSettings>>().Value;
//     return new TwilioRestClient(settings.AccountSid, settings.AuthToken);
// });
// builder.Services.AddTransient<SmsService>();
```

## Sending SMS Messages

Send SMS using `MessageResource.CreateAsync` with the injected client.

```csharp
using Microsoft.Extensions.Options;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System.Threading.Tasks;

public class SmsService
{
    private readonly ITwilioRestClient _client;
    private readonly TwilioSettings _settings;

    public SmsService(
        ITwilioRestClient client,
        IOptions<TwilioSettings> settings)
    {
        _client = client;
        _settings = settings.Value;
    }

    public async Task<string> SendSmsAsync(
        string toPhoneNumber, string body)
    {
        var message = await MessageResource.CreateAsync(
            to: new PhoneNumber(toPhoneNumber),
            from: new PhoneNumber(_settings.FromPhoneNumber),
            body: body,
            client: _client);

        return message.Sid;
    }

    public async Task<string> SendMmsAsync(
        string toPhoneNumber, string body, string mediaUrl)
    {
        var message = await MessageResource.CreateAsync(
            to: new PhoneNumber(toPhoneNumber),
            from: new PhoneNumber(_settings.FromPhoneNumber),
            body: body,
            mediaUrl: new List<Uri> { new Uri(mediaUrl) },
            client: _client);

        return message.Sid;
    }
}
```

## Making Voice Calls

Initiate outbound calls with TwiML instructions for what happens when the call connects.

```csharp
using Microsoft.Extensions.Options;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System;
using System.Threading.Tasks;

public class VoiceService
{
    private readonly ITwilioRestClient _client;
    private readonly TwilioSettings _settings;

    public VoiceService(
        ITwilioRestClient client,
        IOptions<TwilioSettings> settings)
    {
        _client = client;
        _settings = settings.Value;
    }

    public async Task<string> MakeCallAsync(
        string toPhoneNumber, string twimlUrl)
    {
        var call = await CallResource.CreateAsync(
            to: new PhoneNumber(toPhoneNumber),
            from: new PhoneNumber(_settings.FromPhoneNumber),
            url: new Uri(twimlUrl),
            client: _client);

        return call.Sid;
    }

    public async Task<string> MakeCallWithMessageAsync(
        string toPhoneNumber, string message)
    {
        var twiml = new Twilio.TwiML.VoiceResponse()
            .Say(message, voice: "Polly.Amy", language: "en-US")
            .Pause(length: 1)
            .Say("Goodbye.");

        var call = await CallResource.CreateAsync(
            to: new PhoneNumber(toPhoneNumber),
            from: new PhoneNumber(_settings.FromPhoneNumber),
            twiml: twiml.ToString(),
            client: _client);

        return call.Sid;
    }
}
```

## WhatsApp Messaging

Send WhatsApp messages using the `whatsapp:` prefix on phone numbers.

```csharp
using Microsoft.Extensions.Options;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System.Threading.Tasks;

public class WhatsAppService
{
    private readonly ITwilioRestClient _client;
    private readonly TwilioSettings _settings;

    public WhatsAppService(
        ITwilioRestClient client,
        IOptions<TwilioSettings> settings)
    {
        _client = client;
        _settings = settings.Value;
    }

    public async Task<string> SendWhatsAppAsync(
        string toPhoneNumber, string body)
    {
        var message = await MessageResource.CreateAsync(
            to: new PhoneNumber($"whatsapp:{toPhoneNumber}"),
            from: new PhoneNumber(
                $"whatsapp:{_settings.FromWhatsAppNumber}"),
            body: body,
            client: _client);

        return message.Sid;
    }
}
```

## Phone Verification with Twilio Verify

Use Twilio Verify for OTP-based phone number verification.

```csharp
using Twilio.Clients;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

public class PhoneVerificationService
{
    private readonly ITwilioRestClient _client;
    private readonly string _verifyServiceSid;

    public PhoneVerificationService(
        ITwilioRestClient client, string verifyServiceSid)
    {
        _client = client;
        _verifyServiceSid = verifyServiceSid;
    }

    public async Task<string> SendVerificationCodeAsync(
        string phoneNumber)
    {
        var verification = await VerificationResource.CreateAsync(
            to: phoneNumber,
            channel: "sms",
            pathServiceSid: _verifyServiceSid,
            client: _client);

        return verification.Status; // "pending"
    }

    public async Task<bool> CheckVerificationCodeAsync(
        string phoneNumber, string code)
    {
        var check = await VerificationCheckResource.CreateAsync(
            to: phoneNumber,
            code: code,
            pathServiceSid: _verifyServiceSid,
            client: _client);

        return check.Status == "approved";
    }
}
```

## Webhook Handling for Incoming Messages

Handle incoming SMS/WhatsApp messages via Twilio webhooks in ASP.NET Core.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Core;
using Twilio.TwiML;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/webhooks/sms", (
    [FromForm] string From,
    [FromForm] string Body) =>
{
    var response = new MessagingResponse();

    if (Body.Trim().Equals("STATUS", StringComparison.OrdinalIgnoreCase))
    {
        response.Message("Your order is being processed.");
    }
    else
    {
        response.Message(
            $"Thanks for your message! We received: {Body}");
    }

    return Results.Content(
        response.ToString(), "application/xml");
});

app.MapPost("/webhooks/voice", () =>
{
    var response = new VoiceResponse();
    response.Say("Welcome to our support line.", voice: "Polly.Amy");
    response.Gather(
        numDigits: 1,
        action: new Uri("/webhooks/voice/menu", UriKind.Relative),
        input: new List<Twilio.TwiML.Gather.InputEnum>
        {
            Twilio.TwiML.Gather.InputEnum.Dtmf
        })
        .Say("Press 1 for sales. Press 2 for support.");

    return Results.Content(
        response.ToString(), "application/xml");
});

app.Run();
```

## Twilio Communication Channels

| Channel | From Format | To Format | Resource |
|---|---|---|---|
| SMS | `+15551234567` | `+15558675309` | `MessageResource` |
| MMS | `+15551234567` | `+15558675309` | `MessageResource` (with mediaUrl) |
| WhatsApp | `whatsapp:+15551234567` | `whatsapp:+15558675309` | `MessageResource` |
| Voice | `+15551234567` | `+15558675309` | `CallResource` |
| Verify (OTP) | Managed by Twilio | `+15558675309` | `VerificationResource` |

## Best Practices

1. **Store `AccountSid` and `AuthToken` in secure configuration** (environment variables, Azure Key Vault, or user secrets) and inject via the options pattern; never hard-code credentials.
2. **Inject `ITwilioRestClient`** rather than calling `TwilioClient.Init()` globally, so services are testable and multiple Twilio accounts can coexist in the same application.
3. **Validate webhook requests** using `Twilio.Security.RequestValidator` to verify that incoming HTTP requests are genuinely from Twilio, preventing spoofed webhook calls.
4. **Handle Twilio API exceptions** by catching `Twilio.Exceptions.ApiException` and inspecting the `Code` and `MoreInfo` properties for actionable error details.
5. **Use Twilio Verify** for phone number verification instead of building custom OTP logic; Verify handles rate limiting, fraud detection, and carrier lookup automatically.
6. **Set status callbacks** on `MessageResource.CreateAsync` via the `statusCallback` parameter to receive delivery receipts and update message status in your database.
7. **Use E.164 format** for all phone numbers (e.g., `+15558675309`) to ensure consistent behavior across countries and avoid formatting errors.
8. **Implement rate limiting** on your side for user-triggered messages (e.g., OTP resend) to prevent abuse and unexpected Twilio charges; Twilio enforces its own limits but your costs still accrue.
9. **Test with Twilio's test credentials** (`ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` and test auth token) to validate integration without sending real messages or incurring charges.
10. **Monitor usage via the Twilio console** or the `UsageRecord` API to track costs, detect anomalies (sudden spike in messages), and set billing alerts to prevent budget overruns.
