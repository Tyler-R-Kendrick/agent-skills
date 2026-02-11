# GraphQL (Hot Chocolate) Rules

Best practices and rules for GraphQL (Hot Chocolate).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `[UseProjection]` on every query that returns `IQueryable<T>` | HIGH | [`graphql-use-useprojection-on-every-query-that-returns-iqueryable-t.md`](graphql-use-useprojection-on-every-query-that-returns-iqueryable-t.md) |
| 2 | Implement `BatchDataLoader<TKey, TValue>` for every foreign key relationship | MEDIUM | [`graphql-implement-batchdataloader-tkey-tvalue-for-every-foreign-key.md`](graphql-implement-batchdataloader-tkey-tvalue-for-every-foreign-key.md) |
| 3 | Use `AddDbContextFactory<T>()` instead of `AddDbContext<T>()` when using DataLoaders | MEDIUM | [`graphql-use-adddbcontextfactory-t-instead-of-adddbcontext-t-when.md`](graphql-use-adddbcontextfactory-t-instead-of-adddbcontext-t-when.md) |
| 4 | Define input types for mutations (`CreateProductInput`) and return payload types (`CreateProductPayload`) with optional `UserError` fields | MEDIUM | [`graphql-define-input-types-for-mutations-createproductinput-and.md`](graphql-define-input-types-for-mutations-createproductinput-and.md) |
| 5 | Enable `AddFiltering()` and `AddSorting()` on list queries but restrict the filterable/sortable fields | HIGH | [`graphql-enable-addfiltering-and-addsorting-on-list-queries-but.md`](graphql-enable-addfiltering-and-addsorting-on-list-queries-but.md) |
| 6 | Use cursor-based pagination with `[UsePaging]` instead of offset-based pagination | MEDIUM | [`graphql-use-cursor-based-pagination-with-usepaging-instead-of.md`](graphql-use-cursor-based-pagination-with-usepaging-instead-of.md) |
| 7 | Register GraphQL services using `AddGraphQLServer()` and call `MapGraphQL()` at a dedicated path | MEDIUM | [`graphql-register-graphql-services-using-addgraphqlserver-and-call.md`](graphql-register-graphql-services-using-addgraphqlserver-and-call.md) |
| 8 | Apply `[Authorize]` attributes on query/mutation resolvers that require authentication | HIGH | [`graphql-apply-authorize-attributes-on-query-mutation-resolvers-that.md`](graphql-apply-authorize-attributes-on-query-mutation-resolvers-that.md) |
| 9 | Use Hot Chocolate's `ITopicEventSender` and `ITopicEventReceiver` for subscriptions | MEDIUM | [`graphql-use-hot-chocolate-s-itopiceventsender-and.md`](graphql-use-hot-chocolate-s-itopiceventsender-and.md) |
| 10 | Monitor resolver execution times using Hot Chocolate's built-in instrumentation events | HIGH | [`graphql-monitor-resolver-execution-times-using-hot-chocolate-s.md`](graphql-monitor-resolver-execution-times-using-hot-chocolate-s.md) |
