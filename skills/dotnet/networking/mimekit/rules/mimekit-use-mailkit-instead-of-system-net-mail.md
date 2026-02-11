---
title: "Use MailKit instead of `System.Net.Mail`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Use MailKit instead of `System.Net.Mail`

Use MailKit instead of `System.Net.Mail`: because `SmtpClient` in `System.Net.Mail` is deprecated, does not support modern authentication (OAuth2), and has known security issues.
