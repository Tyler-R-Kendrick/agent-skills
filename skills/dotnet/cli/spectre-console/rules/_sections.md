# Spectre.Console Rules

Best practices and rules for Spectre.Console.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `AnsiConsole | MEDIUM | [`spectre-console-use-ansiconsole.md`](spectre-console-use-ansiconsole.md) |
| 2 | Call `.EscapeMarkup()` on any user-provided strings before... | CRITICAL | [`spectre-console-call-escapemarkup-on-any-user-provided-strings-before.md`](spectre-console-call-escapemarkup-on-any-user-provided-strings-before.md) |
| 3 | Use `SelectionPrompt<T>` and `MultiSelectionPrompt<T>` for... | MEDIUM | [`spectre-console-use-selectionprompt-t-and-multiselectionprompt-t-for.md`](spectre-console-use-selectionprompt-t-and-multiselectionprompt-t-for.md) |
| 4 | Use `AnsiConsole | MEDIUM | [`spectre-console-use-ansiconsole-3.md`](spectre-console-use-ansiconsole-3.md) |
| 5 | Override `Validate()` on `CommandSettings` subclasses to... | CRITICAL | [`spectre-console-override-validate-on-commandsettings-subclasses-to.md`](spectre-console-override-validate-on-commandsettings-subclasses-to.md) |
| 6 | Use `config | MEDIUM | [`spectre-console-use-config.md`](spectre-console-use-config.md) |
| 7 | Set `AutoClear(false)` on `Progress` and `Live` renderers... | MEDIUM | [`spectre-console-set-autoclear-false-on-progress-and-live-renderers.md`](spectre-console-set-autoclear-false-on-progress-and-live-renderers.md) |
| 8 | Use `Table | HIGH | [`spectre-console-use-table.md`](spectre-console-use-table.md) |
| 9 | Add the `Spectre | MEDIUM | [`spectre-console-add-the-spectre.md`](spectre-console-add-the-spectre.md) |
| 10 | Use `new ExceptionSettings { Format = ExceptionFormats | CRITICAL | [`spectre-console-use-new-exceptionsettings-format-exceptionformats.md`](spectre-console-use-new-exceptionsettings-format-exceptionformats.md) |
