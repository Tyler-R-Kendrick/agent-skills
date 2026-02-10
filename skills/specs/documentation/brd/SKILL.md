---
name: brd
description: |
    Use when writing Business Requirements Documents that justify why a project should be undertaken. Covers executive summaries, business objectives, stakeholder analysis, current state analysis, proposed solutions, business rules, cost-benefit analysis, success criteria, timelines, and risk assessment.
    USE FOR: business case documentation, cost-benefit analysis, stakeholder alignment, business objectives, ROI justification, project proposals, business rules documentation, executive-level project summaries
    DO NOT USE FOR: technical design (use trd), product feature details (use prd), architecture decisions (use adr), test specifications (use gherkin or gauge)
license: MIT
metadata:
  displayName: "BRD (Business Requirements Document)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Business Requirements Document (BRD)

## Overview
A Business Requirements Document (BRD) answers the fundamental question: *"Should we build this, and why?"* It captures the business rationale, objectives, stakeholders, costs, benefits, and success criteria for a proposed initiative. The BRD is typically the first formal document in the requirements lifecycle, written before the PRD and TRD.

The BRD speaks to leadership and business stakeholders in business language, not technical jargon:
```
BRD ("Should we build this?") --> PRD ("What are we building?") --> TRD ("How do we build it?")
```

## Standard BRD Structure

### 1. Executive Summary
A concise overview (1-2 paragraphs) of the business need, proposed solution, and expected outcomes. This section should stand alone -- a reader should understand the essence of the proposal after reading only this section.

### 2. Business Objectives
Specific, measurable business goals the initiative aims to achieve.

### 3. Stakeholders
All individuals and groups affected by or involved in the initiative.

### 4. Current State Analysis
Description of the existing situation, pain points, and limitations.

### 5. Proposed Solution (High-Level)
Overview of the recommended approach without technical implementation details.

### 6. Business Rules
Policies, regulations, and organizational rules that govern the solution.

### 7. Cost-Benefit Analysis
Financial justification including investment required and expected returns.

### 8. Success Criteria
Measurable outcomes that determine whether the initiative achieved its goals.

### 9. Timeline
Major phases and milestones with estimated durations.

### 10. Risks and Assumptions
Known risks with mitigation strategies and assumptions that underpin the analysis.

## Complete BRD Template

```markdown
# BRD: [Initiative Name]

| Field            | Value                          |
|------------------|--------------------------------|
| Author           | [Name]                         |
| Status           | Draft / In Review / Approved   |
| Created          | YYYY-MM-DD                     |
| Last Updated     | YYYY-MM-DD                     |
| Business Sponsor | [Name, Title]                  |
| Department       | [Department]                   |
| Reviewers        | [Names]                        |
| Approvers        | [Names]                        |

## 1. Executive Summary

[1-2 paragraphs summarizing the business need, proposed solution at a high
level, expected benefits, estimated investment, and timeline. This section
should be self-contained for executive readers who may not read further.]

## 2. Business Objectives

| ID    | Objective                              | Measurable Target           |
|-------|----------------------------------------|-----------------------------|
| BO-1  | [Objective 1]                         | [Quantified target]         |
| BO-2  | [Objective 2]                         | [Quantified target]         |
| BO-3  | [Objective 3]                         | [Quantified target]         |

### Alignment with Strategic Goals
[How this initiative aligns with the organization's strategic plan,
OKRs, or annual priorities.]

## 3. Stakeholders

### Stakeholder Matrix

| Stakeholder       | Role           | Interest Level | Influence | Involvement          |
|-------------------|----------------|----------------|-----------|----------------------|
| [Name/Group]      | Business Sponsor| High          | High      | Approval authority   |
| [Name/Group]      | End User       | High           | Medium    | Requirements input   |
| [Name/Group]      | IT Operations  | Medium         | Medium    | Technical feasibility|
| [Name/Group]      | Finance        | Medium         | High      | Budget approval      |
| [Name/Group]      | Legal/Compliance| Low           | High      | Regulatory sign-off  |

### RACI Matrix

| Activity               | Sponsor | Product | Engineering | QA   | Legal |
|------------------------|---------|---------|-------------|------|-------|
| Requirements approval  | A       | R       | C           | I    | C     |
| Budget approval        | A       | I       | I           | I    | I     |
| Technical design       | I       | C       | R           | C    | I     |
| User acceptance testing| I       | A       | C           | R    | I     |
| Go-live decision       | A       | R       | C           | C    | C     |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

## 4. Current State Analysis

### Current Process
[Describe the existing process, workflow, or system. Include a
process flow diagram if helpful.]

### Pain Points

| # | Pain Point                           | Impact                        | Affected Users |
|---|--------------------------------------|-------------------------------|----------------|
| 1 | [Pain point 1]                      | [Business impact]             | [Count/group]  |
| 2 | [Pain point 2]                      | [Business impact]             | [Count/group]  |
| 3 | [Pain point 3]                      | [Business impact]             | [Count/group]  |

### Current Costs
[Annual cost of the current process/system including labor, licensing,
maintenance, opportunity cost, and cost of errors or inefficiency.]

## 5. Proposed Solution

### Solution Overview
[High-level description of the proposed solution. Focus on capabilities
and business value, not technical implementation.]

### In Scope
- [Capability 1]
- [Capability 2]
- [Capability 3]

### Out of Scope
- [Excluded item 1 -- rationale]
- [Excluded item 2 -- rationale]

### Alternatives Considered

| Alternative          | Pros                    | Cons                      | Why Not Selected          |
|----------------------|-------------------------|---------------------------|---------------------------|
| Do Nothing           | No cost                 | Pain points persist       | Unacceptable status quo   |
| [Alternative 1]     | [Pros]                  | [Cons]                    | [Reason]                  |
| [Alternative 2]     | [Pros]                  | [Cons]                    | [Reason]                  |
| **Recommended**      | [Pros]                  | [Cons]                    | **Best fit for objectives**|

## 6. Business Rules

| ID    | Rule                                                  | Source              |
|-------|-------------------------------------------------------|---------------------|
| BR-1  | [Business rule 1]                                    | [Policy/regulation] |
| BR-2  | [Business rule 2]                                    | [Policy/regulation] |
| BR-3  | [Business rule 3]                                    | [Policy/regulation] |

### Regulatory and Compliance Requirements
[GDPR, HIPAA, SOX, PCI-DSS, industry-specific regulations that
constrain the solution.]

## 7. Cost-Benefit Analysis

### Investment Required

| Category              | One-Time Cost | Annual Cost | Notes                    |
|-----------------------|---------------|-------------|--------------------------|
| Software/Licensing    | $XX,XXX       | $XX,XXX     |                          |
| Development           | $XX,XXX       | --          | [Duration]               |
| Infrastructure        | $XX,XXX       | $XX,XXX     |                          |
| Training              | $XX,XXX       | $X,XXX      |                          |
| Change Management     | $XX,XXX       | --          |                          |
| **Total**             | **$XXX,XXX**  | **$XX,XXX** |                          |

### Expected Benefits

| Benefit               | Annual Value  | Type          | Realization Timeline     |
|-----------------------|---------------|---------------|--------------------------|
| [Benefit 1]          | $XX,XXX       | Cost saving   | [When]                   |
| [Benefit 2]          | $XX,XXX       | Revenue gain  | [When]                   |
| [Benefit 3]          | Qualitative   | Risk reduction| [When]                   |
| **Total Annual**      | **$XXX,XXX**  |               |                          |

### ROI Summary

| Metric                         | Value         |
|--------------------------------|---------------|
| Total Investment (3-year)      | $XXX,XXX      |
| Total Benefits (3-year)        | $XXX,XXX      |
| Net Present Value (NPV)        | $XXX,XXX      |
| Return on Investment (ROI)     | XX%           |
| Payback Period                  | X months      |
| Break-Even Point                | YYYY-MM       |

## 8. Success Criteria

| ID    | Criterion                              | Target          | Measurement         | Timeline      |
|-------|----------------------------------------|-----------------|---------------------|---------------|
| SC-1  | [Success criterion 1]                 | [Target value]  | [How measured]      | [When]        |
| SC-2  | [Success criterion 2]                 | [Target value]  | [How measured]      | [When]        |
| SC-3  | [Success criterion 3]                 | [Target value]  | [How measured]      | [When]        |

## 9. Timeline

### Major Phases

| Phase                  | Duration      | Start        | End          | Key Deliverables         |
|------------------------|---------------|--------------|--------------|--------------------------|
| Discovery & Planning   | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | PRD, TRD approved        |
| Design                 | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | UX designs, API specs    |
| Development            | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | Working software         |
| Testing & QA           | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | Test reports, sign-off   |
| Deployment & Rollout   | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | Production launch        |
| Post-Launch Review     | X weeks       | YYYY-MM-DD   | YYYY-MM-DD   | Success metrics report   |

### Key Milestones

| Milestone              | Target Date  | Decision Gate?  |
|------------------------|--------------|-----------------|
| BRD Approved           | YYYY-MM-DD   | Yes             |
| PRD Approved           | YYYY-MM-DD   | Yes             |
| Design Complete        | YYYY-MM-DD   | No              |
| Development Complete   | YYYY-MM-DD   | No              |
| UAT Complete           | YYYY-MM-DD   | Yes             |
| Go-Live                | YYYY-MM-DD   | Yes             |

## 10. Risks and Assumptions

### Risks

| ID   | Risk                    | Likelihood | Impact | Mitigation                      | Owner      |
|------|-------------------------|------------|--------|---------------------------------|------------|
| R-1  | [Risk 1]               | High/Med/Low| High/Med/Low | [Mitigation strategy]    | [Name]     |
| R-2  | [Risk 2]               | High/Med/Low| High/Med/Low | [Mitigation strategy]    | [Name]     |
| R-3  | [Risk 3]               | High/Med/Low| High/Med/Low | [Mitigation strategy]    | [Name]     |

### Assumptions

| ID   | Assumption                                              | Impact if Invalid            |
|------|---------------------------------------------------------|------------------------------|
| A-1  | [Assumption 1]                                         | [Consequence]                |
| A-2  | [Assumption 2]                                         | [Consequence]                |
| A-3  | [Assumption 3]                                         | [Consequence]                |

### Constraints
- [Constraint 1: budget, timeline, regulatory, organizational]
- [Constraint 2]
- [Constraint 3]

## 11. Approval

| Role              | Name          | Signature     | Date         |
|-------------------|---------------|---------------|--------------|
| Business Sponsor  | [Name]        |               |              |
| Finance           | [Name]        |               |              |
| IT Leadership     | [Name]        |               |              |
| Legal/Compliance  | [Name]        |               |              |

## Appendix

### A. Glossary
[Business terms and acronyms used in this document.]

### B. Supporting Data
[Market research, survey results, analytics data, competitive analysis.]

### C. Related Documents
- PRD: [link, if already started]
- Strategic Plan: [link]
- Competitive Analysis: [link]
```

## BRD Example: Customer Self-Service Portal

```markdown
# BRD: Customer Self-Service Portal

| Field            | Value                    |
|------------------|--------------------------|
| Author           | Maria Business           |
| Status           | In Review                |
| Business Sponsor | VP of Customer Success   |

## 1. Executive Summary

Customer support costs have increased 35% year-over-year while
satisfaction scores have declined from 4.2 to 3.6. Analysis shows
that 62% of support tickets are routine requests (password resets,
billing inquiries, order status) that customers could resolve
independently. We propose a self-service portal that would reduce
ticket volume by 40%, save $1.2M annually in support costs, and
improve customer satisfaction by enabling 24/7 instant resolution.
Estimated investment: $450K over 6 months with a 4.5-month payback.

## 2. Business Objectives

| ID   | Objective                                | Target              |
|------|------------------------------------------|---------------------|
| BO-1 | Reduce support ticket volume             | -40% within 6 months|
| BO-2 | Reduce annual support costs              | -$1.2M              |
| BO-3 | Improve customer satisfaction (CSAT)     | 3.6 -> 4.3          |
| BO-4 | Enable 24/7 customer self-service        | 99.9% availability  |
```

## Relationship to PRD

```
BRD (Business Requirements)  <-- YOU ARE HERE
 |  Answers: "Should we build this?"
 |  Contains: Business case, ROI, stakeholders, costs, success criteria
 |  Audience: Leadership, finance, business stakeholders
 |
 v
PRD (Product Requirements)
 |  Answers: "What are we building?"
 |  Contains: Features, user stories, acceptance criteria, milestones
 |  Audience: Product, engineering, design
 |
 v
TRD (Technical Requirements)
    Answers: "How do we build it?"
    Contains: Architecture, APIs, data models, deployment
    Audience: Engineering
```

### BRD vs PRD

| Aspect | BRD | PRD |
|--------|-----|-----|
| **Primary question** | Should we build this? | What are we building? |
| **Audience** | Business leadership, finance | Product, engineering, design |
| **Language** | Business language, financials | Product language, user stories |
| **Contains** | ROI, cost-benefit, business rules | Features, UX, acceptance criteria |
| **Approved by** | Business sponsors, finance | Product and engineering leads |
| **When written** | Before PRD (project justification) | After BRD approval (feature definition) |
| **Level of detail** | High-level solution description | Detailed feature requirements |

## Best Practices

- **Lead with the executive summary** -- many decision-makers will only read this section. Make it compelling, concise, and self-contained.
- **Quantify everything possible** -- "improve efficiency" is vague; "reduce average ticket resolution time from 4 hours to 15 minutes" is actionable.
- **Always include a "Do Nothing" alternative** -- explicitly documenting the cost of inaction strengthens the case for investment.
- **Separate business requirements from product requirements** -- the BRD should not contain UI mockups, user stories, or technical specifications. Those belong in the PRD and TRD.
- **Identify all stakeholders early** -- missed stakeholders cause late-stage scope changes and delays. Use a RACI matrix to clarify roles.
- **Be honest about risks** -- underplaying risks erodes trust. Present risks with realistic assessments and credible mitigation plans.
- **Validate assumptions explicitly** -- every cost-benefit calculation rests on assumptions. Document them so they can be challenged and verified.
- **Use a consistent format** -- a standardized BRD template ensures nothing is overlooked and makes documents comparable across initiatives.
- **Get formal sign-off** -- the BRD is a commitment. Require signatures from the business sponsor, finance, and IT leadership before proceeding to PRD.
- **Keep it business-focused** -- resist the temptation to include technical details. If someone asks "how will it work?", point them to the TRD.
- **Review with finance** -- the cost-benefit analysis should be validated by someone with financial expertise, not just the project team.
- **Plan for post-launch measurement** -- define how and when success criteria will be measured. A BRD without a measurement plan is a wish list.
