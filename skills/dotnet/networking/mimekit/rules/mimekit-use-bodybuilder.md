---
title: "Use `BodyBuilder`"
impact: MEDIUM
impactDescription: "general best practice"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Use `BodyBuilder`

Use `BodyBuilder`: to construct multipart messages with both text and HTML bodies, so email clients without HTML support fall back to the plain text version.
