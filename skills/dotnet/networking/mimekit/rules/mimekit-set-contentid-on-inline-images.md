---
title: "Set `ContentId` on inline images"
impact: MEDIUM
impactDescription: "general best practice"
tags: mimekit, dotnet, networking, creating-and-parsing-mime-email-messages, sending-email-via-smtp-with-mailkit, reading-email-via-imappop3
---

## Set `ContentId` on inline images

Set `ContentId` on inline images: using `MimeUtils.GenerateMessageId()` and reference them in HTML via `cid:` URLs for reliable rendering across email clients.
