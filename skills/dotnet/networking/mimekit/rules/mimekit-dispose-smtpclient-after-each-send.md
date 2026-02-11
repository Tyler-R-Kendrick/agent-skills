---
title: "Dispose `SmtpClient` after each send"
impact: MEDIUM
impactDescription: "general best practice"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Dispose `SmtpClient` after each send

(via `using`) rather than keeping a long-lived connection; SMTP connections are lightweight and servers may time out idle connections.
