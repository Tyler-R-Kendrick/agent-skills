# RDF Contract

Each steering entry lives in `~/.agents/.steering/<category>/<id>.ttl` and links a strategy to its evidence. Use Turtle syntax.

## Prefixes

```turtle
@prefix steering: <https://agents.local/steering#> .
@prefix learn: <https://agents.local/steering/learning/> .
@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
```

## Required Predicates

| Predicate | Value |
|-----------|-------|
| `a` | `steering:Learning` |
| `dcterms:title` | Human title |
| `steering:category` | Slug used as folder name |
| `steering:trigger` | IF condition for the index |
| `steering:correction` | The user correction |
| `steering:preferredStrategy` | What to do instead |
| `steering:generalizedRule` | The reusable rule |
| `steering:zpdScaffold` | The teaching scaffold |
| `steering:confidence` | Decimal confidence |
| `prov:wasDerivedFrom` | One or more evidence IRIs |

## Evidence URI Schemes

Use `memory://`, `conversation://`, `doc://`, `file://`, `web://`, `http://`, or `https://`. Evidence should point to inspectable sources, not duplicate their content.

## Example

```turtle
learn:deployment-proof-boundary a steering:Learning ;
  dcterms:title "Verify platform proof before provider evidence" ;
  steering:category "proof" ;
  steering:trigger "deployment proof claims" ;
  steering:correction "Provider resources alone do not prove the platform path worked." ;
  steering:preferredStrategy "Exercise the logged-in platform API or CLI path before claiming live deployment proof." ;
  steering:generalizedRule "Claim deployment success only after platform and provider boundaries are both verified." ;
  steering:zpdScaffold "Pause before summarizing evidence and check which boundary produced it." ;
  steering:confidence "0.90"^^xsd:decimal ;
  steering:scope "global" ;
  steering:status "active" ;
  prov:wasDerivedFrom <memory://MEMORY.md#deployment-proof> .
```
