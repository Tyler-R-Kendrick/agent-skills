# Orchard CMS Rules

Best practices and rules for Orchard CMS.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define content types through code migrations (`DataMigration`) rather than through the admin UI | MEDIUM | [`orchard-cms-define-content-types-through-code-migrations-datamigration.md`](orchard-cms-define-content-types-through-code-migrations-datamigration.md) |
| 2 | Compose content types from small, reusable content parts | MEDIUM | [`orchard-cms-compose-content-types-from-small-reusable-content-parts.md`](orchard-cms-compose-content-types-from-small-reusable-content-parts.md) |
| 3 | Use `ContentPartHandler<T>` for lifecycle hooks | HIGH | [`orchard-cms-use-contentparthandler-t-for-lifecycle-hooks.md`](orchard-cms-use-contentparthandler-t-for-lifecycle-hooks.md) |
| 4 | Use `ISession` (YesSql) queries with typed indexes for read operations | MEDIUM | [`orchard-cms-use-isession-yessql-queries-with-typed-indexes-for-read.md`](orchard-cms-use-isession-yessql-queries-with-typed-indexes-for-read.md) |
| 5 | Create custom indexes by implementing `MapIndex<T>` for frequently queried fields | MEDIUM | [`orchard-cms-create-custom-indexes-by-implementing-mapindex-t-for.md`](orchard-cms-create-custom-indexes-by-implementing-mapindex-t-for.md) |
| 6 | Use the Liquid template engine for themes and display templates | HIGH | [`orchard-cms-use-the-liquid-template-engine-for-themes-and-display.md`](orchard-cms-use-the-liquid-template-engine-for-themes-and-display.md) |
| 7 | Implement recipes (JSON setup recipes) for seeding initial content and configuration | MEDIUM | [`orchard-cms-implement-recipes-json-setup-recipes-for-seeding-initial.md`](orchard-cms-implement-recipes-json-setup-recipes-for-seeding-initial.md) |
| 8 | Use `IContentManager.GetAsync(id, VersionOptions.Published)` for public-facing queries | CRITICAL | [`orchard-cms-use-icontentmanager-getasync-id-versionoptions-published.md`](orchard-cms-use-icontentmanager-getasync-id-versionoptions-published.md) |
| 9 | Register custom modules with `Startup : StartupBase` and declare module dependencies in the module manifest | MEDIUM | [`orchard-cms-register-custom-modules-with-startup-startupbase-and.md`](orchard-cms-register-custom-modules-with-startup-startupbase-and.md) |
| 10 | Enable the GraphQL module for headless frontends | MEDIUM | [`orchard-cms-enable-the-graphql-module-for-headless-frontends.md`](orchard-cms-enable-the-graphql-module-for-headless-frontends.md) |
