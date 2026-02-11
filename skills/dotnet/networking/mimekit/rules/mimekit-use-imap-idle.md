---
title: "Use IMAP IDLE"
impact: MEDIUM
impactDescription: "general best practice"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Use IMAP IDLE

(`ImapClient.IdleAsync`) instead of polling when building a mail-monitoring service to receive real-time notifications of new messages without repeated searches.
