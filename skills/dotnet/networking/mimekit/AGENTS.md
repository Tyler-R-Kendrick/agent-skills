# MimeKit

## Overview
MimeKit is a cross-platform library for creating and parsing MIME messages and email.

## Example
```csharp
using MimeKit;
using MailKit.Net.Smtp;

var message = new MimeMessage();
message.From.Add(new MailboxAddress("Sender", "sender@example.com"));
message.To.Add(new MailboxAddress("Recipient", "recipient@example.com"));
message.Subject = "Hello!";

var builder = new BodyBuilder();
builder.TextBody = "This is the text body.";
builder.HtmlBody = "<p>This is the <b>HTML</b> body.</p>";
builder.Attachments.Add("file.pdf");

message.Body = builder.ToMessageBody();

using var client = new SmtpClient();
await client.ConnectAsync("smtp.example.com", 587);
await client.AuthenticateAsync("user", "password");
await client.SendAsync(message);
await client.DisconnectAsync(true);
```

## Best Practices
- Use MailKit for sending
- Handle attachments properly
- Support both text and HTML
- Validate email addresses
