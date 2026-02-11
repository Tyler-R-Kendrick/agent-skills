# Playwright Rules

Best practices and rules for Playwright.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `data-testid` attributes for element selection | LOW | [`playwright-use-data-testid-attributes-for-element-selection.md`](playwright-use-data-testid-attributes-for-element-selection.md) |
| 2 | Implement the Page Object Model for all page interactions | HIGH | [`playwright-implement-the-page-object-model-for-all-page-interactions.md`](playwright-implement-the-page-object-model-for-all-page-interactions.md) |
| 3 | Run tests in headless mode in CI/CD | MEDIUM | [`playwright-run-tests-in-headless-mode-in-ci-cd.md`](playwright-run-tests-in-headless-mode-in-ci-cd.md) |
| 4 | Use `WaitForURLAsync` and `WaitForLoadStateAsync` instead of `Task.Delay` | MEDIUM | [`playwright-use-waitforurlasync-and-waitforloadstateasync-instead-of.md`](playwright-use-waitforurlasync-and-waitforloadstateasync-instead-of.md) |
| 5 | Intercept network requests to isolate frontend tests from backends | CRITICAL | [`playwright-intercept-network-requests-to-isolate-frontend-tests-from.md`](playwright-intercept-network-requests-to-isolate-frontend-tests-from.md) |
| 6 | Capture screenshots on test failure for debugging | MEDIUM | [`playwright-capture-screenshots-on-test-failure-for-debugging.md`](playwright-capture-screenshots-on-test-failure-for-debugging.md) |
| 7 | Test across all three browser engines at least once per release | CRITICAL | [`playwright-test-across-all-three-browser-engines-at-least-once-per.md`](playwright-test-across-all-three-browser-engines-at-least-once-per.md) |
| 8 | Set explicit timeouts instead of relying on defaults | HIGH | [`playwright-set-explicit-timeouts-instead-of-relying-on-defaults.md`](playwright-set-explicit-timeouts-instead-of-relying-on-defaults.md) |
| 9 | Use browser contexts for test isolation | HIGH | [`playwright-use-browser-contexts-for-test-isolation.md`](playwright-use-browser-contexts-for-test-isolation.md) |
| 10 | Install browser binaries in CI with `playwright install` | HIGH | [`playwright-install-browser-binaries-in-ci-with-playwright-install.md`](playwright-install-browser-binaries-in-ci-with-playwright-install.md) |
