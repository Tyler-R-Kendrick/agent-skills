# WebApiContrib Rules

Best practices and rules for WebApiContrib.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Set `options.ReturnHttpNotAcceptable = true` | MEDIUM | [`webapicontrib-set-options-returnhttpnotacceptable-true.md`](webapicontrib-set-options-returnhttpnotacceptable-true.md) |
| 2 | Set `options.RespectBrowserAcceptHeader = true` | CRITICAL | [`webapicontrib-set-options-respectbrowseracceptheader-true.md`](webapicontrib-set-options-respectbrowseracceptheader-true.md) |
| 3 | Use `[Produces("application/json", "text/csv")]` on controller actions | MEDIUM | [`webapicontrib-use-produces-application-json-text-csv-on-controller-actions.md`](webapicontrib-use-produces-application-json-text-csv-on-controller-actions.md) |
| 4 | Use `[FormatFilter]` with `FormatterMappings.SetMediaTypeMappingForFormat()` | MEDIUM | [`webapicontrib-use-formatfilter-with-formattermappings.md`](webapicontrib-use-formatfilter-with-formattermappings.md) |
| 5 | Register formatters in the correct order | MEDIUM | [`webapicontrib-register-formatters-in-the-correct-order.md`](webapicontrib-register-formatters-in-the-correct-order.md) |
| 6 | Use `[Consumes("application/json", "application/xml")]` | MEDIUM | [`webapicontrib-use-consumes-application-json-application-xml.md`](webapicontrib-use-consumes-application-json-application-xml.md) |
| 7 | Set `CsvFormatterOptions.CsvDelimiter` | HIGH | [`webapicontrib-set-csvformatteroptions-csvdelimiter.md`](webapicontrib-set-csvformatteroptions-csvdelimiter.md) |
| 8 | Implement both `InputFormatter` and `OutputFormatter` for binary formats | MEDIUM | [`webapicontrib-implement-both-inputformatter-and-outputformatter-for.md`](webapicontrib-implement-both-inputformatter-and-outputformatter-for.md) |
| 9 | Add `Content-Disposition: attachment; filename=report.csv` | MEDIUM | [`webapicontrib-add-content-disposition-attachment-filename-report-csv.md`](webapicontrib-add-content-disposition-attachment-filename-report-csv.md) |
| 10 | Write integration tests that send requests with different `Accept` headers | MEDIUM | [`webapicontrib-write-integration-tests-that-send-requests-with-different.md`](webapicontrib-write-integration-tests-that-send-requests-with-different.md) |
