# Humanizer Rules

Best practices and rules for Humanizer.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Humanizer only at presentation boundaries | CRITICAL | [`humanizer-use-humanizer-only-at-presentation-boundaries.md`](humanizer-use-humanizer-only-at-presentation-boundaries.md) |
| 2 | Cache compiled templates or precomputed humanized values | MEDIUM | [`humanizer-cache-compiled-templates-or-precomputed-humanized-values.md`](humanizer-cache-compiled-templates-or-precomputed-humanized-values.md) |
| 3 | Pass `CultureInfo` explicitly | MEDIUM | [`humanizer-pass-cultureinfo-explicitly.md`](humanizer-pass-cultureinfo-explicitly.md) |
| 4 | Use `.ToQuantity()` for count-dependent labels | MEDIUM | [`humanizer-use-toquantity-for-count-dependent-labels.md`](humanizer-use-toquantity-for-count-dependent-labels.md) |
| 5 | Annotate enums with `[Description]` | MEDIUM | [`humanizer-annotate-enums-with-description.md`](humanizer-annotate-enums-with-description.md) |
| 6 | Prefer `.Truncate()` with a word-based truncator | HIGH | [`humanizer-prefer-truncate-with-a-word-based-truncator.md`](humanizer-prefer-truncate-with-a-word-based-truncator.md) |
| 7 | Use `ByteSize` for file and bandwidth formatting | MEDIUM | [`humanizer-use-bytesize-for-file-and-bandwidth-formatting.md`](humanizer-use-bytesize-for-file-and-bandwidth-formatting.md) |
| 8 | Specify precision in `TimeSpan.Humanize(precision: N)` | MEDIUM | [`humanizer-specify-precision-in-timespan-humanize-precision-n.md`](humanizer-specify-precision-in-timespan-humanize-precision-n.md) |
| 9 | Avoid `.Humanize()` on untrusted user input strings | HIGH | [`humanizer-avoid-humanize-on-untrusted-user-input-strings.md`](humanizer-avoid-humanize-on-untrusted-user-input-strings.md) |
| 10 | Use `.Dehumanize()` and `.DehumanizeTo<T>()` | MEDIUM | [`humanizer-use-dehumanize-and-dehumanizeto-t.md`](humanizer-use-dehumanize-and-dehumanizeto-t.md) |
