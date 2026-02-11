---
name: mimekit
description: >
  Guidance for MimeKit and MailKit email libraries in .NET.
  USE FOR: creating and parsing MIME email messages, sending email via SMTP with MailKit, reading email via IMAP/POP3, attachments, HTML email, S/MIME and PGP signing/encryption.
  DO NOT USE FOR: SMS/voice messaging (use twilio), HTTP APIs (use ASP.NET Core), custom TCP protocols (use dotnetty), gRPC services (use grpc-dotnet).
license: MIT
metadata:
  displayName: "MimeKit and MailKit"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "MimeKit Documentation"
    url: "https://mimekit.net/"
  - title: "MimeKit GitHub Repository"
    url: "https://github.com/jstedfast/MimeKit"
  - title: "MailKit GitHub Repository"
    url: "https://github.com/jstedfast/MailKit"
  - title: "MimeKit NuGet Package"
    url: "https://www.nuget.org/packages/MimeKit"
---

# MimeKit and MailKit

## Overview

MimeKit is a .NET library for creating and parsing MIME messages (the format underlying email). MailKit is the companion transport library that sends messages via SMTP and retrieves them via IMAP and POP3. Together, they replace the deprecated `System.Net.Mail` with a modern, standards-compliant, cross-platform solution. MimeKit supports complex MIME structures including multipart messages, inline images, file attachments, S/MIME encryption, and PGP/MIME signing.

MailKit provides full support for OAuth2 authentication, STARTTLS, connection pooling, and progress reporting, making it suitable for both simple transactional email and advanced mail client applications.

## Sending a Simple Email

Create a message and send it via SMTP using MailKit.

```csharp
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;

public class EmailService
{
    public async Task SendSimpleEmailAsync()
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "Order System", "orders@example.com"));
        message.To.Add(new MailboxAddress(
            "John Doe", "john@example.com"));
        message.Subject = "Your order has shipped";

        message.Body = new TextPart("plain")
        {
            Text = "Your order #12345 has shipped "
                + "and will arrive in 3-5 business days."
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(
            "smtp.example.com", 587,
            SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(
            "smtp-user", "smtp-password");
        await client.SendAsync(message);
        await client.DisconnectAsync(quit: true);
    }
}
```

## HTML Email with Inline Images

Build multipart messages with both plain text and HTML alternatives, plus inline images.

```csharp
using MimeKit;
using MimeKit.Utils;
using System.IO;

public static class HtmlEmailBuilder
{
    public static MimeMessage CreateHtmlEmail(
        string toName, string toEmail,
        string subject, string htmlBody, string textBody)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "MyApp", "noreply@example.com"));
        message.To.Add(new MailboxAddress(toName, toEmail));
        message.Subject = subject;

        var builder = new BodyBuilder
        {
            TextBody = textBody,
            HtmlBody = htmlBody
        };

        // Inline image referenced in HTML as cid:logo
        var image = builder.LinkedResources.Add("images/logo.png");
        image.ContentId = MimeUtils.GenerateMessageId();
        builder.HtmlBody = htmlBody.Replace(
            "{{logo_cid}}", image.ContentId);

        message.Body = builder.ToMessageBody();
        return message;
    }
}
```

## File Attachments

Attach files with proper MIME types and content disposition.

```csharp
using MimeKit;
using System.IO;

public static class AttachmentEmailBuilder
{
    public static MimeMessage CreateWithAttachments(
        string to, string subject,
        string body, params string[] filePaths)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "Reports", "reports@example.com"));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;

        var builder = new BodyBuilder
        {
            HtmlBody = body
        };

        foreach (var path in filePaths)
        {
            builder.Attachments.Add(path);
        }

        message.Body = builder.ToMessageBody();
        return message;
    }

    public static MimeMessage CreateWithStreamAttachment(
        string to, string subject, string body,
        string fileName, Stream content, string mimeType)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "Reports", "reports@example.com"));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;

        var builder = new BodyBuilder
        {
            HtmlBody = body
        };

        builder.Attachments.Add(fileName, content,
            ContentType.Parse(mimeType));

        message.Body = builder.ToMessageBody();
        return message;
    }
}
```

## Reading Email via IMAP

Use MailKit's IMAP client to retrieve and process emails.

```csharp
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class InboxReader
{
    public async Task<List<MimeMessage>> GetUnreadMessagesAsync(
        string host, int port,
        string username, string password)
    {
        var messages = new List<MimeMessage>();

        using var client = new ImapClient();
        await client.ConnectAsync(host, port,
            SecureSocketOptions.SslOnConnect);
        await client.AuthenticateAsync(username, password);

        var inbox = client.Inbox;
        await inbox.OpenAsync(FolderAccess.ReadWrite);

        var uids = await inbox.SearchAsync(SearchQuery.NotSeen);

        foreach (var uid in uids)
        {
            var message = await inbox.GetMessageAsync(uid);
            messages.Add(message);

            // Mark as read
            await inbox.AddFlagsAsync(uid,
                MessageFlags.Seen, silent: true);
        }

        await client.DisconnectAsync(quit: true);
        return messages;
    }
}
```

## ASP.NET Core Integration

Register email services with DI and configuration.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Threading;
using System.Threading.Tasks;

public class SmtpSettings
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FromName { get; set; } = string.Empty;
    public string FromEmail { get; set; } = string.Empty;
}

public class SmtpEmailSender
{
    private readonly SmtpSettings _settings;

    public SmtpEmailSender(IOptions<SmtpSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task SendAsync(
        MimeMessage message, CancellationToken ct = default)
    {
        if (message.From.Count == 0)
        {
            message.From.Add(new MailboxAddress(
                _settings.FromName, _settings.FromEmail));
        }

        using var client = new SmtpClient();
        await client.ConnectAsync(
            _settings.Host, _settings.Port,
            SecureSocketOptions.StartTls, ct);
        await client.AuthenticateAsync(
            _settings.Username, _settings.Password, ct);
        await client.SendAsync(message, ct);
        await client.DisconnectAsync(quit: true, ct);
    }
}

// Registration
// builder.Services.Configure<SmtpSettings>(
//     builder.Configuration.GetSection("Smtp"));
// builder.Services.AddTransient<SmtpEmailSender>();
```

## MailKit Transport Comparison

| Protocol | Class | Port | Use Case |
|---|---|---|---|
| SMTP + STARTTLS | `SmtpClient` | 587 | Sending email (recommended) |
| SMTP + SSL | `SmtpClient` | 465 | Sending email (legacy) |
| IMAP + SSL | `ImapClient` | 993 | Reading email (full-featured) |
| POP3 + SSL | `Pop3Client` | 995 | Reading email (download-and-delete) |

## Best Practices

1. **Use MailKit instead of `System.Net.Mail`** because `SmtpClient` in `System.Net.Mail` is deprecated, does not support modern authentication (OAuth2), and has known security issues.
2. **Always use `SecureSocketOptions.StartTls`** or `SslOnConnect` when connecting to mail servers; never use `SecureSocketOptions.None` in production to prevent credential interception.
3. **Dispose `SmtpClient` after each send** (via `using`) rather than keeping a long-lived connection; SMTP connections are lightweight and servers may time out idle connections.
4. **Use `BodyBuilder`** to construct multipart messages with both text and HTML bodies, so email clients without HTML support fall back to the plain text version.
5. **Set `ContentId` on inline images** using `MimeUtils.GenerateMessageId()` and reference them in HTML via `cid:` URLs for reliable rendering across email clients.
6. **Store SMTP credentials in configuration** (`appsettings.json` or environment variables) via the options pattern, never hard-code them in source files.
7. **Validate email addresses** using `MailboxAddress.TryParse()` before constructing messages to catch formatting errors early and avoid `SmtpClient` exceptions.
8. **Handle transient SMTP failures** (connection timeouts, temporary 4xx errors) with a retry policy or background queue rather than failing the user's request synchronously.
9. **Use IMAP IDLE** (`ImapClient.IdleAsync`) instead of polling when building a mail-monitoring service to receive real-time notifications of new messages without repeated searches.
10. **Set `message.MessageId`** explicitly using `MimeUtils.GenerateMessageId()` for traceability and to prevent duplicate detection issues in recipient mail servers.
