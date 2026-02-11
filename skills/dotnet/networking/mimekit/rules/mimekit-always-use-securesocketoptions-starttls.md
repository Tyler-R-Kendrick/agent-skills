---
title: "Always use `SecureSocketOptions.StartTls`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Always use `SecureSocketOptions.StartTls`

Always use `SecureSocketOptions.StartTls`: or `SslOnConnect` when connecting to mail servers; never use `SecureSocketOptions.None` in production to prevent credential interception.
