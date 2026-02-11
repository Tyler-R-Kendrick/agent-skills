---
title: "Handle transient SMTP failures"
impact: MEDIUM
impactDescription: "general best practice"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Handle transient SMTP failures

(connection timeouts, temporary 4xx errors) with a retry policy or background queue rather than failing the user's request synchronously.
