# MimeKit and MailKit Rules

Best practices and rules for MimeKit and MailKit.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use MailKit instead of `System.Net.Mail` | CRITICAL | [`mimekit-use-mailkit-instead-of-system-net-mail.md`](mimekit-use-mailkit-instead-of-system-net-mail.md) |
| 2 | Always use `SecureSocketOptions.StartTls` | CRITICAL | [`mimekit-always-use-securesocketoptions-starttls.md`](mimekit-always-use-securesocketoptions-starttls.md) |
| 3 | Dispose `SmtpClient` after each send | MEDIUM | [`mimekit-dispose-smtpclient-after-each-send.md`](mimekit-dispose-smtpclient-after-each-send.md) |
| 4 | Use `BodyBuilder` | MEDIUM | [`mimekit-use-bodybuilder.md`](mimekit-use-bodybuilder.md) |
| 5 | Set `ContentId` on inline images | MEDIUM | [`mimekit-set-contentid-on-inline-images.md`](mimekit-set-contentid-on-inline-images.md) |
| 6 | Store SMTP credentials in configuration | CRITICAL | [`mimekit-store-smtp-credentials-in-configuration.md`](mimekit-store-smtp-credentials-in-configuration.md) |
| 7 | Validate email addresses | HIGH | [`mimekit-validate-email-addresses.md`](mimekit-validate-email-addresses.md) |
| 8 | Handle transient SMTP failures | MEDIUM | [`mimekit-handle-transient-smtp-failures.md`](mimekit-handle-transient-smtp-failures.md) |
| 9 | Use IMAP IDLE | MEDIUM | [`mimekit-use-imap-idle.md`](mimekit-use-imap-idle.md) |
| 10 | Set `message.MessageId` | HIGH | [`mimekit-set-message-messageid.md`](mimekit-set-message-messageid.md) |
