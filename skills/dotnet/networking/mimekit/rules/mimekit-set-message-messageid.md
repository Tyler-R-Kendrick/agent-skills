---
title: "Set `message.MessageId`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Set `message.MessageId`

Set `message.MessageId`: explicitly using `MimeUtils.GenerateMessageId()` for traceability and to prevent duplicate detection issues in recipient mail servers.
