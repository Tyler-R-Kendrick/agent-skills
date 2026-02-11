---
title: "Validate email addresses"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Validate email addresses

Validate email addresses: using `MailboxAddress.TryParse()` before constructing messages to catch formatting errors early and avoid `SmtpClient` exceptions.
