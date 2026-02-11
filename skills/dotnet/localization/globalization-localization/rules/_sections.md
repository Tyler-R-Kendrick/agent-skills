# Globalization and Localization Rules

Best practices and rules for Globalization and Localization.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always pass an explicit `CultureInfo` | CRITICAL | [`globalization-localization-always-pass-an-explicit-cultureinfo.md`](globalization-localization-always-pass-an-explicit-cultureinfo.md) |
| 2 | Use `CultureInfo.InvariantCulture` | HIGH | [`globalization-localization-use-cultureinfo-invariantculture.md`](globalization-localization-use-cultureinfo-invariantculture.md) |
| 3 | Register `RequestLocalizationMiddleware` early | MEDIUM | [`globalization-localization-register-requestlocalizationmiddleware-early.md`](globalization-localization-register-requestlocalizationmiddleware-early.md) |
| 4 | Limit supported cultures | CRITICAL | [`globalization-localization-limit-supported-cultures.md`](globalization-localization-limit-supported-cultures.md) |
| 5 | Store culture-neutral data | MEDIUM | [`globalization-localization-store-culture-neutral-data.md`](globalization-localization-store-culture-neutral-data.md) |
| 6 | Test with cultures that use different decimal separators | MEDIUM | [`globalization-localization-test-with-cultures-that-use-different-decimal-separators.md`](globalization-localization-test-with-cultures-that-use-different-decimal-separators.md) |
| 7 | Use `StringComparison.OrdinalIgnoreCase` | MEDIUM | [`globalization-localization-use-stringcomparison-ordinalignorecase.md`](globalization-localization-use-stringcomparison-ordinalignorecase.md) |
| 8 | Set `SupportedCultures` and `SupportedUICultures` together | HIGH | [`globalization-localization-set-supportedcultures-and-supporteduicultures-together.md`](globalization-localization-set-supportedcultures-and-supporteduicultures-together.md) |
| 9 | Validate culture names | HIGH | [`globalization-localization-validate-culture-names.md`](globalization-localization-validate-culture-names.md) |
| 10 | Prefer `DateTimeOffset` over `DateTime` | HIGH | [`globalization-localization-prefer-datetimeoffset-over-datetime.md`](globalization-localization-prefer-datetimeoffset-over-datetime.md) |
