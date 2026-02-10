---
name: rfc
description: |
    Use when writing RFC (Request for Comments) design documents to propose significant technical changes for team review and feedback. Covers RFC structure, motivation, detailed design, alternatives analysis, risk assessment, the RFC workflow, and when to use RFC vs ADR.
    USE FOR: design proposals, technical change proposals, architecture proposals seeking feedback, RFC workflow management, lightweight and heavyweight RFC formats, cross-team design alignment, pre-decision design documents
    DO NOT USE FOR: recording final decisions (use adr), product requirements (use prd), business justification (use brd), executable specs (use gherkin)
license: MIT
metadata:
  displayName: "RFC (Request for Comments)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# RFC (Request for Comments) / Design Documents

## Overview
An RFC (Request for Comments) is a design document that proposes a significant technical change and solicits structured feedback from the team before a decision is made. Unlike an ADR, which records a decision already taken, an RFC is a *proposal* -- it invites discussion, critique, and refinement.

RFCs are the primary mechanism for making large-scale technical decisions collaboratively. They ensure that significant changes are well-thought-out, that alternatives are considered, and that the team has an opportunity to surface concerns before implementation begins.

## When to Write an RFC

Write an RFC when:
- A change affects multiple teams, services, or systems
- The implementation will take more than a few days of effort
- There are multiple viable approaches and the trade-offs are not obvious
- The change introduces new infrastructure, frameworks, or patterns
- You need buy-in from stakeholders outside your immediate team
- The decision is hard to reverse once implemented

Do NOT write an RFC for:
- Small, easily reversible changes
- Bug fixes or minor improvements
- Changes that are already decided by organizational policy
- Decisions that a single engineer can make independently

## RFC Workflow

```
Draft  -->  Review  -->  Accepted  -->  Implementation
                 |                            |
                 |                            v
                 +------>  Rejected       ADR(s) Created
                 |
                 +------>  Withdrawn
```

### Workflow Stages

| Stage | Description | Duration |
|-------|-------------|----------|
| **Draft** | Author writes the RFC and shares it for early informal feedback | 1-5 days |
| **Review** | RFC is formally submitted for team review. Comments, questions, and suggestions are collected | 3-10 business days |
| **Accepted** | The proposal is approved. Implementation can begin. Final decisions are recorded as ADRs | Decision point |
| **Rejected** | The proposal is declined with documented reasoning. May be revised and resubmitted | Decision point |
| **Withdrawn** | The author withdraws the RFC (context changed, better approach found, no longer needed) | Any time |

### Review Process

1. **Author submits the RFC** as a pull request or shared document.
2. **Reviewers are assigned** -- typically tech leads, architects, and affected team members.
3. **Review period opens** -- minimum duration (e.g., 5 business days) to ensure everyone has time to read and respond.
4. **Discussion happens** -- inline comments, meeting discussions, or async threads.
5. **Author addresses feedback** -- revises the RFC or explains why feedback was not incorporated.
6. **Decision is made** -- the designated decision-maker (tech lead, architecture council) accepts or rejects.
7. **Outcome is recorded** -- if accepted, create ADRs for the key decisions. If rejected, document the reasoning.

## Standard RFC Structure

### 1. Metadata
Title, author, status, reviewers, and dates.

### 2. Summary
A concise (1-3 sentence) description of the proposal.

### 3. Motivation
Why is this change needed? What problem does it solve?

### 4. Detailed Design
The core of the RFC -- how the proposed change works.

### 5. Alternatives Considered
Other approaches that were evaluated and why they were not chosen.

### 6. Risks
What could go wrong? What are the unknowns?

### 7. Open Questions
Unresolved issues that need team input.

### 8. Timeline
Estimated implementation schedule.

## Complete RFC Template

```markdown
# RFC: [Title]

| Field          | Value                                      |
|----------------|--------------------------------------------|
| Author         | [Name]                                     |
| Status         | Draft / In Review / Accepted / Rejected    |
| Created        | YYYY-MM-DD                                 |
| Last Updated   | YYYY-MM-DD                                 |
| Review Deadline| YYYY-MM-DD                                 |
| Reviewers      | [Names]                                    |
| Decision Maker | [Name/Group]                               |
| ADRs Created   | [Links to ADRs, filled in after acceptance]|

## Summary

[1-3 sentences describing the proposal. A reader should understand
the core idea after reading only this section.]

## Motivation

### Problem Statement
[What problem exists today? What pain points are we experiencing?
Include data, metrics, or incidents that illustrate the problem.]

### Why Now?
[Why does this need to be addressed now rather than later?
What is the cost of inaction?]

### Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

### Non-Goals
- [Explicitly state what this RFC does NOT address]
- [Scope boundaries]

## Detailed Design

### Overview
[High-level description of the proposed approach.
Include architecture diagrams where helpful.]

### Component Design

#### [Component 1]
[Detailed description of the component, its responsibilities,
interfaces, and behavior.]

#### [Component 2]
[Detailed description.]

### API Changes
[New or modified API endpoints, request/response formats,
breaking changes.]

### Data Model Changes
[Schema changes, new tables, migration strategy.]

### Migration Strategy
[How do we get from the current state to the proposed state?
Big-bang vs incremental migration. Feature flags. Data migration.]

### Security Considerations
[Authentication, authorization, data protection implications.]

### Performance Implications
[Expected impact on latency, throughput, resource consumption.
Benchmarks if available.]

### Observability
[Logging, metrics, tracing, alerting changes needed.]

### Testing Strategy
[How will the change be tested? Unit, integration, e2e, load testing.]

## Alternatives Considered

### Alternative 1: [Name]
**Description:** [Brief description of the approach]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why not chosen:** [Explanation]

### Alternative 2: [Name]
**Description:** [Brief description of the approach]

**Pros:**
- [Pro 1]

**Cons:**
- [Con 1]
- [Con 2]

**Why not chosen:** [Explanation]

### Alternative 3: Do Nothing
**Description:** Maintain the status quo.

**Pros:**
- No development cost or risk

**Cons:**
- [Existing problems persist]
- [Cost of inaction]

**Why not chosen:** [Explanation]

## Risks

| Risk                              | Likelihood | Impact | Mitigation                  |
|-----------------------------------|------------|--------|-----------------------------|
| [Risk 1]                         | High/Med/Low| High/Med/Low | [Mitigation strategy] |
| [Risk 2]                         | High/Med/Low| High/Med/Low | [Mitigation strategy] |
| [Risk 3]                         | High/Med/Low| High/Med/Low | [Mitigation strategy] |

## Open Questions

- [ ] [Question 1 -- what input do you need from reviewers?]
- [ ] [Question 2]
- [ ] [Question 3]

## Timeline

| Phase                  | Duration    | Description                          |
|------------------------|-------------|--------------------------------------|
| RFC Review             | X weeks     | Team review and feedback             |
| Prototype / Spike      | X weeks     | Validate assumptions                 |
| Phase 1: [Description] | X weeks    | [Deliverables]                       |
| Phase 2: [Description] | X weeks    | [Deliverables]                       |
| Migration / Rollout    | X weeks     | [Strategy]                           |
| Post-Launch Review     | X weeks     | Validate success metrics             |

## References

- [Link to related PRD]
- [Link to related TRD]
- [Link to related ADRs]
- [Link to relevant research, benchmarks, or prior art]
```

## RFC Example: Migrate from REST to GraphQL

```markdown
# RFC: Migrate Customer Portal API from REST to GraphQL

| Field          | Value                     |
|----------------|---------------------------|
| Author         | Jordan Developer          |
| Status         | In Review                 |
| Created        | 2025-01-10                |
| Review Deadline| 2025-01-24                |
| Reviewers      | Frontend Team, API Team, Tech Lead |
| Decision Maker | VP Engineering            |

## Summary

Migrate the Customer Portal's backend-for-frontend (BFF) API from
REST to GraphQL to reduce over-fetching, eliminate the need for
multiple round-trips on dashboard pages, and improve frontend
developer productivity.

## Motivation

### Problem Statement
The Customer Portal dashboard currently makes 7 separate REST API
calls to render the main page. This causes:
- **Slow page loads**: average 2.8s FCP due to sequential API calls
- **Over-fetching**: the /users endpoint returns 42 fields when the
  dashboard only needs 6
- **Tight coupling**: every new UI component requires a new REST
  endpoint or BFF aggregation layer change
- **Mobile performance**: mobile users on slow connections experience
  5s+ load times due to payload size

### Why Now?
The Customer Portal redesign (PRD-042) adds 3 new dashboard widgets
that would require 4 additional REST endpoints. This is the right
time to address the underlying architectural issue.

### Goals
- Reduce dashboard FCP from 2.8s to < 1.5s
- Enable frontend teams to query exactly the data they need
- Eliminate the need for new REST endpoints for UI changes

### Non-Goals
- Migrating internal service-to-service APIs (those remain REST/gRPC)
- Replacing the existing public REST API (external consumers keep REST)

## Detailed Design

### Overview
Introduce a GraphQL gateway (Apollo Server) as the BFF layer between
the React frontend and the existing microservices. The gateway
federates data from User Service, Order Service, and Product Service.

### Schema Design
```graphql
type Query {
  me: User!
  orders(first: Int, after: String): OrderConnection!
  product(id: ID!): Product
}

type User {
  id: ID!
  name: String!
  email: String!
  recentOrders(first: Int): [Order!]!
}

type Order {
  id: ID!
  status: OrderStatus!
  total: Money!
  items: [OrderItem!]!
  createdAt: DateTime!
}
```

### Migration Strategy
1. Deploy GraphQL gateway alongside existing REST BFF (weeks 1-2)
2. Migrate dashboard page to GraphQL (weeks 3-4)
3. Migrate remaining pages incrementally (weeks 5-8)
4. Deprecate REST BFF endpoints with sunset headers (week 9)
5. Decommission REST BFF (week 12)

## Alternatives Considered

### Alternative 1: Optimize REST with Sparse Fieldsets
Use JSON:API sparse fieldsets (`?fields[user]=id,name,email`).

Pros: No new technology; smaller change.
Cons: Does not solve N+1 round-trip problem; limited query flexibility.
Why not chosen: Addresses over-fetching but not under-fetching or
round-trip issues.

### Alternative 2: BFF Aggregation Endpoints
Create purpose-built aggregation endpoints (e.g., /dashboard-data).

Pros: Simple; no new technology.
Cons: Tight coupling between UI and API; every UI change needs a
backend change.
Why not chosen: Does not scale with the rate of UI iteration planned
for the portal redesign.

### Alternative 3: Do Nothing
Maintain current REST BFF.

Why not chosen: Dashboard performance will worsen as new widgets
are added, and frontend team velocity will decrease.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| N+1 query performance in resolvers | High | Medium | DataLoader batching from day 1 |
| Team unfamiliar with GraphQL | Medium | Medium | 2-day workshop + pair programming |
| Cache invalidation complexity | Medium | Medium | Apollo cache policies + persisted queries |

## Open Questions

- [ ] Should we use Apollo Federation or schema stitching?
- [ ] Do we need a persisted query allowlist for production?
- [ ] What is the deprecation timeline for the REST BFF?

## Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| RFC Review | 2 weeks | Team feedback |
| Prototype | 1 week | Validate Apollo Federation with 2 services |
| Phase 1 | 2 weeks | GraphQL gateway + dashboard migration |
| Phase 2 | 4 weeks | Remaining page migrations |
| Deprecation | 4 weeks | REST BFF sunset period |
```

## Lightweight vs Heavyweight RFC

### Lightweight RFC
For smaller, team-scoped decisions. Shorter template, faster review cycle.

```markdown
# RFC: [Title]
**Author:** [Name] | **Status:** Draft | **Date:** YYYY-MM-DD

## Problem
[2-3 sentences]

## Proposal
[Description of the proposed approach]

## Alternatives
- [Alternative 1]: [Why not]
- [Alternative 2]: [Why not]

## Risks
- [Risk 1]

## Questions
- [Question 1]
```

Best for:
- Single-team decisions
- Technology choices within a service
- Process changes
- Convention adoption

### Heavyweight RFC
For cross-team, high-impact decisions. Full template with detailed design.

Best for:
- Architecture changes affecting multiple services
- New infrastructure or platform decisions
- Breaking changes to public APIs
- Security model changes
- Major technology migrations

### Choosing the Right Weight

| Signal | Lightweight | Heavyweight |
|--------|-------------|-------------|
| Teams affected | 1 | 2+ |
| Reversibility | Days to reverse | Weeks/months to reverse |
| Implementation effort | < 2 weeks | > 2 weeks |
| Risk level | Low-medium | Medium-high |
| Stakeholders | Engineering only | Engineering + product + leadership |

## RFC vs ADR

| Aspect | RFC | ADR |
|--------|-----|-----|
| **Purpose** | Propose a change for discussion | Record a decision that was made |
| **Timing** | Before the decision | At or after the decision |
| **Audience** | Reviewers who will provide feedback | Future developers who need context |
| **Tone** | Proposing ("We could...") | Deciding ("We will...") |
| **Length** | 3-10 pages (detailed design) | 1-2 pages (concise record) |
| **Lifecycle** | Draft -> Review -> Accepted/Rejected | Proposed -> Accepted -> Deprecated/Superseded |
| **Output** | One or more ADRs | The final record |

### Common Workflow
```
RFC (proposal + discussion)
  |
  v
Decision made by team/decision-maker
  |
  v
ADR(s) created to record the decision(s)
  |
  v
Implementation begins
```

An RFC may produce multiple ADRs. For example, an RFC proposing a migration to microservices might result in:
- ADR-0010: Adopt microservices architecture
- ADR-0011: Use Kubernetes for container orchestration
- ADR-0012: Use RabbitMQ for inter-service messaging

## Managing RFCs

### Where to Store RFCs

| Location | Convention |
|----------|-----------|
| `docs/rfcs/` | Dedicated RFC directory |
| `docs/design/` | Combined with other design documents |
| Pull requests | RFC as a PR -- discussion happens in PR comments |
| Wiki | Confluence, Notion, or GitHub Wiki |

### RFC as a Pull Request

A popular pattern is to submit the RFC as a PR to the `docs/rfcs/` directory:

1. Create a branch: `rfc/graphql-migration`
2. Add the RFC file: `docs/rfcs/2025-01-graphql-migration.md`
3. Open a PR with the RFC content
4. Team reviews and comments on the PR
5. Author revises based on feedback
6. PR is merged when the RFC is accepted (or closed if rejected)

This approach leverages existing code review tools for RFC review.

### Numbering and Naming

```
docs/rfcs/
  001-adopt-graphql-for-bff.md
  002-migrate-to-kubernetes.md
  003-implement-event-sourcing.md
```

or date-based:

```
docs/rfcs/
  2025-01-graphql-migration.md
  2025-02-kubernetes-migration.md
  2025-03-event-sourcing.md
```

## Best Practices

- **Start with the problem, not the solution** -- the Motivation section should clearly explain why the change is needed. If the problem is not compelling, the solution does not matter.
- **Always include "Do Nothing" as an alternative** -- explicitly documenting the cost of inaction gives reviewers a baseline for comparison.
- **Be specific about trade-offs** -- every design decision has trade-offs. Acknowledging them builds trust and invites constructive feedback.
- **Set a review deadline** -- without a deadline, RFCs linger indefinitely. A clear deadline (e.g., 5-10 business days) ensures timely decisions.
- **Designate a decision-maker** -- someone (tech lead, architecture council) must have the authority to make the final call. Consensus is ideal but not always achievable.
- **Address all review comments** -- even if you disagree, explain your reasoning. Unaddressed comments signal that feedback is not valued.
- **Convert accepted RFCs into ADRs** -- the RFC captures the discussion; the ADR captures the decision. Do not skip the ADR step.
- **Keep RFCs scoped** -- an RFC that tries to solve everything at once is harder to review and more likely to be rejected. Break large proposals into focused RFCs.
- **Include a migration strategy** -- proposals that address how to get from here to there are far more likely to be accepted than those that only describe the end state.
- **Use diagrams liberally** -- architecture diagrams, sequence diagrams, and data flow diagrams make proposals easier to understand and review.
- **Write for a skeptical reader** -- assume the reviewer's first reaction is "why should we change what works?" and address that concern proactively.
- **Prototype when possible** -- a working spike alongside the RFC dramatically increases confidence in the proposal.
