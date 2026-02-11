# MediatR Rules

Best practices and rules for MediatR.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Keep handlers focused on a single responsibility | MEDIUM | [`mediatr-keep-handlers-focused-on-a-single-responsibility.md`](mediatr-keep-handlers-focused-on-a-single-responsibility.md) |
| 2 | Use `IPipelineBehavior<,>` for cross-cutting concerns... | MEDIUM | [`mediatr-use-ipipelinebehavior-for-cross-cutting-concerns.md`](mediatr-use-ipipelinebehavior-for-cross-cutting-concerns.md) |
| 3 | Separate commands (`IRequest<TResponse>`) from queries... | MEDIUM | [`mediatr-separate-commands-irequest-tresponse-from-queries.md`](mediatr-separate-commands-irequest-tresponse-from-queries.md) |
| 4 | Use `INotification` and `INotificationHandler<>` for... | MEDIUM | [`mediatr-use-inotification-and-inotificationhandler-for.md`](mediatr-use-inotification-and-inotificationhandler-for.md) |
| 5 | Register pipeline behaviors in the correct order (e | MEDIUM | [`mediatr-register-pipeline-behaviors-in-the-correct-order-e.md`](mediatr-register-pipeline-behaviors-in-the-correct-order-e.md) |
| 6 | Inject `IMediator` or `ISender` into controllers/endpoints,... | MEDIUM | [`mediatr-inject-imediator-or-isender-into-controllers-endpoints.md`](mediatr-inject-imediator-or-isender-into-controllers-endpoints.md) |
| 7 | Use `CancellationToken` consistently by passing it through... | MEDIUM | [`mediatr-use-cancellationtoken-consistently-by-passing-it-through.md`](mediatr-use-cancellationtoken-consistently-by-passing-it-through.md) |
| 8 | Prefer `ISender` (for `Send`) or `IPublisher` (for... | LOW | [`mediatr-prefer-isender-for-send-or-ipublisher-for.md`](mediatr-prefer-isender-for-send-or-ipublisher-for.md) |
| 9 | Validate command inputs in a `ValidationBehavior` pipeline... | HIGH | [`mediatr-validate-command-inputs-in-a-validationbehavior-pipeline.md`](mediatr-validate-command-inputs-in-a-validationbehavior-pipeline.md) |
| 10 | Avoid using MediatR for inter-service communication; it is... | HIGH | [`mediatr-avoid-using-mediatr-for-inter-service-communication-it-is.md`](mediatr-avoid-using-mediatr-for-inter-service-communication-it-is.md) |
