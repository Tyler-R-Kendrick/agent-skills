# Stripe

## Overview

Stripe.NET is the official .NET SDK for the Stripe payment platform. It provides strongly-typed service classes for every Stripe API resource including customers, payment intents, subscriptions, invoices, products, prices, and Connect accounts. The SDK handles serialization, error handling, retry logic, and idempotency. Stripe follows a payment intents workflow where the server creates a payment intent, the client confirms it with payment details, and webhooks notify the server of the final payment status. Stripe.NET targets .NET Standard 2.0+ and supports both synchronous and asynchronous operations.

## Payment Intent Flow

Create and confirm payments using the Payment Intents API.

```csharp
using Stripe;

namespace MyApp.Payments;

public class PaymentService
{
    private readonly PaymentIntentService _paymentIntentService;
    private readonly CustomerService _customerService;

    public PaymentService()
    {
        _paymentIntentService = new PaymentIntentService();
        _customerService = new CustomerService();
    }

    public async Task<PaymentIntent> CreatePaymentIntentAsync(
        string customerId,
        long amountInCents,
        string currency = "usd",
        string? paymentMethodId = null)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = amountInCents,
            Currency = currency,
            Customer = customerId,
            PaymentMethod = paymentMethodId,
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true
            },
            Metadata = new Dictionary<string, string>
            {
                ["order_id"] = Guid.NewGuid().ToString(),
                ["source"] = "web"
            }
        };

        return await _paymentIntentService.CreateAsync(options);
    }

    public async Task<PaymentIntent> ConfirmPaymentAsync(
        string paymentIntentId,
        string paymentMethodId)
    {
        var options = new PaymentIntentConfirmOptions
        {
            PaymentMethod = paymentMethodId
        };

        return await _paymentIntentService.ConfirmAsync(paymentIntentId, options);
    }

    public async Task<Customer> CreateCustomerAsync(
        string email,
        string name,
        string? paymentMethodId = null)
    {
        var options = new CustomerCreateOptions
        {
            Email = email,
            Name = name,
            PaymentMethod = paymentMethodId,
            InvoiceSettings = paymentMethodId is not null
                ? new CustomerInvoiceSettingsOptions
                {
                    DefaultPaymentMethod = paymentMethodId
                }
                : null
        };

        return await _customerService.CreateAsync(options);
    }
}
```

## ASP.NET Core Setup and Configuration

Configure Stripe in an ASP.NET Core application with proper key management.

```csharp
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Configure Stripe from app settings (never hardcode keys)
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"]
    ?? throw new InvalidOperationException("Stripe:SecretKey is not configured");

builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<SubscriptionService>();
builder.Services.AddScoped<WebhookService>();

var app = builder.Build();

// Create a payment intent (client gets clientSecret to confirm on frontend)
app.MapPost("/api/payments/create-intent", async (
    CreatePaymentRequest request,
    PaymentService paymentService) =>
{
    var intent = await paymentService.CreatePaymentIntentAsync(
        request.CustomerId,
        request.AmountInCents,
        request.Currency);

    return Results.Ok(new { clientSecret = intent.ClientSecret });
});

app.MapPost("/api/payments/webhook", async (
    HttpContext context,
    WebhookService webhookService) =>
{
    await webhookService.HandleWebhookAsync(context);
    return Results.Ok();
});

app.Run();

public record CreatePaymentRequest(
    string CustomerId,
    long AmountInCents,
    string Currency = "usd");
```

## Webhook Handling

Process Stripe webhook events securely with signature verification.

```csharp
using Stripe;
using Microsoft.Extensions.Options;

namespace MyApp.Payments;

public class WebhookService
{
    private readonly string _webhookSecret;
    private readonly IOrderService _orderService;
    private readonly ILogger<WebhookService> _logger;

    public WebhookService(
        IConfiguration configuration,
        IOrderService orderService,
        ILogger<WebhookService> logger)
    {
        _webhookSecret = configuration["Stripe:WebhookSecret"]
            ?? throw new InvalidOperationException("Stripe:WebhookSecret is not configured");
        _orderService = orderService;
        _logger = logger;
    }

    public async Task HandleWebhookAsync(HttpContext context)
    {
        var json = await new StreamReader(context.Request.Body).ReadToEndAsync();
        var signature = context.Request.Headers["Stripe-Signature"];

        Event stripeEvent;
        try
        {
            stripeEvent = EventUtility.ConstructEvent(json, signature, _webhookSecret);
        }
        catch (StripeException ex)
        {
            _logger.LogWarning("Webhook signature verification failed: {Message}", ex.Message);
            context.Response.StatusCode = 400;
            return;
        }

        _logger.LogInformation("Processing Stripe event: {EventType} ({EventId})",
            stripeEvent.Type, stripeEvent.Id);

        switch (stripeEvent.Type)
        {
            case EventTypes.PaymentIntentSucceeded:
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                await HandlePaymentSucceededAsync(paymentIntent!);
                break;

            case EventTypes.PaymentIntentPaymentFailed:
                var failedIntent = stripeEvent.Data.Object as PaymentIntent;
                await HandlePaymentFailedAsync(failedIntent!);
                break;

            case EventTypes.CustomerSubscriptionCreated:
                var subscription = stripeEvent.Data.Object as Subscription;
                await HandleSubscriptionCreatedAsync(subscription!);
                break;

            case EventTypes.CustomerSubscriptionDeleted:
                var canceledSub = stripeEvent.Data.Object as Subscription;
                await HandleSubscriptionCanceledAsync(canceledSub!);
                break;

            case EventTypes.InvoicePaid:
                var invoice = stripeEvent.Data.Object as Invoice;
                await HandleInvoicePaidAsync(invoice!);
                break;

            default:
                _logger.LogInformation("Unhandled event type: {EventType}", stripeEvent.Type);
                break;
        }
    }

    private async Task HandlePaymentSucceededAsync(PaymentIntent paymentIntent)
    {
        var orderId = paymentIntent.Metadata["order_id"];
        await _orderService.MarkAsPaidAsync(orderId, paymentIntent.Id);
        _logger.LogInformation("Payment succeeded for order {OrderId}", orderId);
    }

    private Task HandlePaymentFailedAsync(PaymentIntent paymentIntent)
    {
        _logger.LogWarning(
            "Payment failed for {PaymentIntentId}: {Error}",
            paymentIntent.Id,
            paymentIntent.LastPaymentError?.Message);
        return Task.CompletedTask;
    }

    private Task HandleSubscriptionCreatedAsync(Subscription subscription)
    {
        _logger.LogInformation("Subscription created: {SubscriptionId}", subscription.Id);
        return Task.CompletedTask;
    }

    private Task HandleSubscriptionCanceledAsync(Subscription subscription)
    {
        _logger.LogInformation("Subscription canceled: {SubscriptionId}", subscription.Id);
        return Task.CompletedTask;
    }

    private Task HandleInvoicePaidAsync(Invoice invoice)
    {
        _logger.LogInformation("Invoice paid: {InvoiceId}, Amount: {Amount}",
            invoice.Id, invoice.AmountPaid);
        return Task.CompletedTask;
    }
}
```

## Subscription Management

Create and manage recurring subscriptions with products and prices.

```csharp
using Stripe;

namespace MyApp.Payments;

public class SubscriptionManager
{
    private readonly ProductService _productService = new();
    private readonly PriceService _priceService = new();
    private readonly SubscriptionService _subscriptionService = new();
    private readonly SubscriptionItemService _subscriptionItemService = new();

    public async Task<Subscription> CreateSubscriptionAsync(
        string customerId,
        string priceId,
        int trialDays = 0)
    {
        var options = new SubscriptionCreateOptions
        {
            Customer = customerId,
            Items = new List<SubscriptionItemOptions>
            {
                new() { Price = priceId }
            },
            PaymentBehavior = "default_incomplete",
            PaymentSettings = new SubscriptionPaymentSettingsOptions
            {
                SaveDefaultPaymentMethod = "on_subscription"
            },
            Expand = new List<string> { "latest_invoice.payment_intent" }
        };

        if (trialDays > 0)
        {
            options.TrialPeriodDays = trialDays;
        }

        return await _subscriptionService.CreateAsync(options);
    }

    public async Task<Subscription> CancelSubscriptionAsync(
        string subscriptionId,
        bool atPeriodEnd = true)
    {
        if (atPeriodEnd)
        {
            return await _subscriptionService.UpdateAsync(subscriptionId,
                new SubscriptionUpdateOptions
                {
                    CancelAtPeriodEnd = true
                });
        }

        return await _subscriptionService.CancelAsync(subscriptionId);
    }

    public async Task<Subscription> ChangeSubscriptionPlanAsync(
        string subscriptionId,
        string newPriceId)
    {
        var subscription = await _subscriptionService.GetAsync(subscriptionId);
        var currentItem = subscription.Items.Data[0];

        await _subscriptionItemService.UpdateAsync(currentItem.Id,
            new SubscriptionItemUpdateOptions
            {
                Price = newPriceId,
                ProrationBehavior = "create_prorations"
            });

        return await _subscriptionService.GetAsync(subscriptionId);
    }

    public async Task<Product> CreateProductWithPriceAsync(
        string name,
        long unitAmountCents,
        string currency = "usd",
        string interval = "month")
    {
        var product = await _productService.CreateAsync(new ProductCreateOptions
        {
            Name = name,
            Active = true
        });

        await _priceService.CreateAsync(new PriceCreateOptions
        {
            Product = product.Id,
            UnitAmount = unitAmountCents,
            Currency = currency,
            Recurring = new PriceRecurringOptions
            {
                Interval = interval
            }
        });

        return product;
    }
}
```

## Error Handling

Handle Stripe-specific exceptions with proper error categorization.

```csharp
using Stripe;

namespace MyApp.Payments;

public class StripeErrorHandler
{
    private readonly ILogger<StripeErrorHandler> _logger;

    public StripeErrorHandler(ILogger<StripeErrorHandler> logger) => _logger = logger;

    public async Task<PaymentResult> SafeExecuteAsync(Func<Task<PaymentIntent>> action)
    {
        try
        {
            var intent = await action();
            return PaymentResult.Success(intent.Id, intent.ClientSecret);
        }
        catch (StripeException ex)
        {
            _logger.LogError(ex, "Stripe error: {Code} - {Message}", ex.StripeError.Code, ex.Message);

            return ex.StripeError.Type switch
            {
                "card_error" => PaymentResult.CardError(
                    ex.StripeError.Code,
                    ex.StripeError.Message),

                "invalid_request_error" => PaymentResult.InvalidRequest(
                    ex.StripeError.Message),

                "rate_limit_error" => PaymentResult.RateLimited(),

                "authentication_error" => PaymentResult.AuthenticationError(),

                _ => PaymentResult.UnexpectedError(ex.StripeError.Message)
            };
        }
    }
}

public record PaymentResult
{
    public bool IsSuccess { get; init; }
    public string? PaymentIntentId { get; init; }
    public string? ClientSecret { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }

    public static PaymentResult Success(string intentId, string clientSecret) =>
        new() { IsSuccess = true, PaymentIntentId = intentId, ClientSecret = clientSecret };

    public static PaymentResult CardError(string code, string message) =>
        new() { ErrorCode = code, ErrorMessage = message };

    public static PaymentResult InvalidRequest(string message) =>
        new() { ErrorCode = "invalid_request", ErrorMessage = message };

    public static PaymentResult RateLimited() =>
        new() { ErrorCode = "rate_limited", ErrorMessage = "Too many requests. Try again later." };

    public static PaymentResult AuthenticationError() =>
        new() { ErrorCode = "auth_error", ErrorMessage = "Stripe authentication failed." };

    public static PaymentResult UnexpectedError(string message) =>
        new() { ErrorCode = "unexpected", ErrorMessage = message };
}
```

## Stripe.NET vs Other Payment SDKs

| Feature | Stripe.NET | Braintree SDK | PayPal SDK | Square SDK |
|---|---|---|---|---|
| Payment intents | Yes | Transactions | Orders API | Payments API |
| Subscriptions | Built-in | Built-in | Billing plans | Subscriptions API |
| Webhooks | Signature verification | Webhook notifications | IPN / Webhooks | Webhooks |
| Connect / Marketplace | Stripe Connect | Marketplace | Commerce Platform | Not built-in |
| Idempotency | Built-in header | Request ID | Not built-in | Idempotency key |
| Strong typing | Full SDK | Full SDK | REST-based | Full SDK |
| .NET support | .NET Standard 2.0+ | .NET Standard 2.0+ | REST / unofficial | .NET Standard 2.0+ |
| Test mode | Separate keys | Sandbox | Sandbox | Sandbox |

## Best Practices

1. **Store Stripe secret keys in environment variables or a secret manager** (Azure Key Vault, AWS Secrets Manager) and never in `appsettings.json` or source code, using `builder.Configuration["Stripe:SecretKey"]` to load them at startup, because committed API keys grant full access to your Stripe account.

2. **Use Payment Intents instead of Charges** for all new payment flows, because Payment Intents handle SCA (Strong Customer Authentication), 3D Secure, and multi-step payment confirmations that Charges do not support, and Stripe recommends Payment Intents as the standard API.

3. **Verify webhook signatures using `EventUtility.ConstructEvent()`** with your webhook signing secret before processing any event, because unsigned webhooks can be forged by attackers to mark orders as paid without actual payment.

4. **Make webhook handlers idempotent** by checking whether the event has already been processed (store processed event IDs in a database) before performing side effects, because Stripe retries failed webhook deliveries and may send the same event multiple times.

5. **Use `Metadata` on Payment Intents, Customers, and Subscriptions** to store your application's identifiers (order IDs, user IDs, plan names) so that webhook handlers can correlate Stripe events back to your domain objects without additional database lookups.

6. **Set `PaymentBehavior = "default_incomplete"` on subscriptions** and expand `latest_invoice.payment_intent` to get the client secret for frontend confirmation, rather than using `allow_incomplete` which creates subscriptions without collecting payment.

7. **Handle `StripeException` by switching on `StripeError.Type`** to differentiate between card errors (show to user), invalid request errors (log and fix), rate limit errors (retry with backoff), and authentication errors (configuration problem), rather than showing raw Stripe error messages to end users.

8. **Cancel subscriptions with `CancelAtPeriodEnd = true`** rather than immediate cancellation, so that customers retain access until the end of their billing period and can reactivate without creating a new subscription.

9. **Use `RequestOptions` with `IdempotencyKey`** for payment-critical operations (creating payment intents, confirming payments, creating subscriptions) to prevent duplicate charges when retrying failed network requests, setting the key to a deterministic value derived from the order or transaction.

10. **Test with Stripe's test card numbers** (`4242424242424242` for success, `4000000000000002` for decline) and the Stripe CLI for webhook testing (`stripe listen --forward-to localhost:5000/api/payments/webhook`), rather than using live mode for development, because test mode operations do not process real charges and provide detailed error simulation.
