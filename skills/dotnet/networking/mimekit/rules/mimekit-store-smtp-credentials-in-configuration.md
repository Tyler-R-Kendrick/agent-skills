---
title: "Store SMTP credentials in configuration"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Store SMTP credentials in configuration

(`appsettings.json` or environment variables) via the options pattern, never hard-code them in source files.
