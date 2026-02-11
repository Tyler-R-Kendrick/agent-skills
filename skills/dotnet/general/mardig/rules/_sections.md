# Markdig Rules

Best practices and rules for Markdig.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Build the `MarkdownPipeline` once and reuse it | MEDIUM | [`mardig-build-the-markdownpipeline-once-and-reuse-it.md`](mardig-build-the-markdownpipeline-once-and-reuse-it.md) |
| 2 | Use `DisableHtml()` for user-generated content | CRITICAL | [`mardig-use-disablehtml-for-user-generated-content.md`](mardig-use-disablehtml-for-user-generated-content.md) |
| 3 | Enable only the extensions you need | MEDIUM | [`mardig-enable-only-the-extensions-you-need.md`](mardig-enable-only-the-extensions-you-need.md) |
| 4 | Use `UseAutoIdentifiers()` for documentation sites | MEDIUM | [`mardig-use-useautoidentifiers-for-documentation-sites.md`](mardig-use-useautoidentifiers-for-documentation-sites.md) |
| 5 | Parse to AST with `Markdown.Parse()` when you need structured access | MEDIUM | [`mardig-parse-to-ast-with-markdown-parse-when-you-need-structured.md`](mardig-parse-to-ast-with-markdown-parse-when-you-need-structured.md) |
| 6 | Sanitize HTML output | MEDIUM | [`mardig-sanitize-html-output.md`](mardig-sanitize-html-output.md) |
| 7 | Cache rendered HTML | HIGH | [`mardig-cache-rendered-html.md`](mardig-cache-rendered-html.md) |
| 8 | Use `HtmlRenderer` with `EnableHtmlForBlock = false` | MEDIUM | [`mardig-use-htmlrenderer-with-enablehtmlforblock-false.md`](mardig-use-htmlrenderer-with-enablehtmlforblock-false.md) |
| 9 | Prefer `UsePipeTables()` over custom table parsing | LOW | [`mardig-prefer-usepipetables-over-custom-table-parsing.md`](mardig-prefer-usepipetables-over-custom-table-parsing.md) |
| 10 | Test Markdown rendering with edge cases | MEDIUM | [`mardig-test-markdown-rendering-with-edge-cases.md`](mardig-test-markdown-rendering-with-edge-cases.md) |
