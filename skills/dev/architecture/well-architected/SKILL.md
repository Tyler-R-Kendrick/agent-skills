---
name: well-architected
description: |
    Cloud well-architected frameworks from AWS, Azure, and GCP -- covering pillars, design principles, review processes, and cross-cloud comparison for building reliable, secure, cost-effective cloud workloads.
    USE FOR: well-architected reviews, cloud architecture evaluation, reliability/security/cost/performance pillar analysis, cross-cloud architecture comparison
    DO NOT USE FOR: cloud infrastructure provisioning (use iac/terraform, iac/bicep, etc.), specific cloud services, microservice patterns (use microservices)
license: MIT
metadata:
  displayName: "Well-Architected Frameworks"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "AWS Well-Architected Framework"
    url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
  - title: "Microsoft Azure Well-Architected Framework"
    url: "https://learn.microsoft.com/en-us/azure/well-architected/"
  - title: "Google Cloud Architecture Framework"
    url: "https://cloud.google.com/architecture/framework"
---

# Cloud Well-Architected Frameworks

## Overview
The major cloud providers each publish a Well-Architected Framework -- a set of pillars, design principles, and best practices for building reliable, secure, performant, and cost-effective workloads in the cloud. While the terminology and organization differ, the core concerns are remarkably consistent across all three.

This skill covers all three frameworks in a unified view, enabling cross-cloud comparison and provider-agnostic architecture reasoning.

## Cross-Cloud Pillar Comparison

| Concern | AWS (6 Pillars) | Azure (5 Pillars) | GCP (6 Pillars) |
|---------|-----------------|-------------------|-----------------|
| **Operations** | Operational Excellence | Operational Excellence | Operational Excellence |
| **Security** | Security | Security | Security, Privacy & Compliance |
| **Reliability** | Reliability | Reliability | Reliability |
| **Performance** | Performance Efficiency | Performance Efficiency | Performance Optimization |
| **Cost** | Cost Optimization | Cost Optimization | Cost Optimization |
| **Sustainability** | Sustainability | -- | -- |
| **System Design** | -- | -- | System Design |

**Key observation:** All three frameworks agree on the five core concerns (operations, security, reliability, performance, cost). AWS adds Sustainability; GCP adds System Design as an explicit pillar; Azure covers both implicitly within its five pillars.

---

## AWS Well-Architected Framework (6 Pillars)

### 1. Operational Excellence
Design, run, and monitor systems to deliver business value and continually improve processes and procedures.

**Key principles:**
- Perform operations as code (Infrastructure as Code)
- Make frequent, small, reversible changes
- Refine operations procedures frequently
- Anticipate failure; learn from all operational events
- Use managed services to reduce operational burden

### 2. Security
Protect data, systems, and assets through risk assessments, security controls, and automated security best practices.

**Key principles:**
- Implement a strong identity foundation (least privilege, IAM)
- Enable traceability (logging, auditing, monitoring)
- Apply security at all layers (edge, VPC, subnet, instance, OS, application)
- Automate security best practices
- Protect data in transit and at rest
- Keep people away from data (reduce direct access)
- Prepare for security events (incident response runbooks)

### 3. Reliability
Ensure a workload can recover from failures and meet demand through proper planning and design.

**Key principles:**
- Automatically recover from failure
- Test recovery procedures
- Scale horizontally to increase aggregate availability
- Stop guessing capacity (use auto-scaling)
- Manage change through automation

### 4. Performance Efficiency
Use computing resources efficiently and maintain that efficiency as demand changes and technologies evolve.

**Key principles:**
- Democratize advanced technologies (use managed services)
- Go global in minutes (multi-region)
- Use serverless architectures where possible
- Experiment more often
- Consider mechanical sympathy (understand how services are consumed)

### 5. Cost Optimization
Avoid unnecessary costs and understand where money is being spent.

**Key principles:**
- Implement cloud financial management
- Adopt a consumption model (pay for what you use)
- Measure overall efficiency
- Stop spending money on undifferentiated heavy lifting
- Analyze and attribute expenditure

### 6. Sustainability
Minimize environmental impact of cloud workloads.

**Key principles:**
- Understand your impact
- Establish sustainability goals
- Maximize utilization
- Anticipate and adopt new, more efficient offerings
- Use managed services (shared infrastructure is more efficient)
- Reduce downstream impact of your cloud workloads

---

## Azure Well-Architected Framework (5 Pillars)

### 1. Reliability
Ensure the application meets its availability commitments through resiliency and recovery design.

**Key principles:**
- Design for business requirements (define SLA/SLO/SLI)
- Design for failure (assume everything can fail)
- Observe application health (monitoring, alerting)
- Drive automation (minimize human error)
- Design for self-healing
- Design for scale-out

### 2. Security
Protect the confidentiality, integrity, and availability of the application and its data.

**Key principles:**
- Plan resources and how to harden them
- Automate and use least privilege
- Classify and encrypt data
- Guard with identity management (Zero Trust)
- Monitor security for the entire system
- Secure the supply chain

### 3. Cost Optimization
Balance business goals with budget to create a cost-effective workload while avoiding waste.

**Key principles:**
- Develop cost-management discipline
- Design with a cost-efficiency mindset
- Design for usage optimization (right-size, auto-scale)
- Continuously monitor and optimize

### 4. Operational Excellence
Reduce issues in production by building holistic observability and automated processes.

**Key principles:**
- Embrace DevOps culture
- Establish development standards (IaC, CI/CD)
- Evolve operations with observability
- Deploy with confidence (progressive rollout, rollback)
- Automate for efficiency
- Adopt safe deployment practices

### 5. Performance Efficiency
Efficiently scale your workload to meet demand without over-provisioning or under-provisioning.

**Key principles:**
- Negotiate realistic performance targets (SLAs/SLOs)
- Design to meet capacity requirements
- Achieve and sustain performance
- Improve efficiency through optimization
- Monitor and collect data to measure performance

---

## GCP Architecture Framework (6 Pillars)

### 1. System Design
Design systems that meet functional and non-functional requirements using cloud-native patterns.

**Key principles:**
- Design for change (loosely coupled components)
- Design for automation
- Design for managed services
- Design for portability where appropriate
- Design for observability

### 2. Operational Excellence
Deploy, operate, and monitor systems efficiently with minimal manual intervention.

**Key principles:**
- Automate deployments (CI/CD)
- Practice infrastructure as code
- Monitor and alert on SLIs
- Conduct game days and chaos engineering
- Implement progressive rollouts

### 3. Security, Privacy & Compliance
Protect data and systems, maintain privacy, and meet compliance requirements.

**Key principles:**
- Leverage shared responsibility model
- Apply defense in depth
- Automate security controls
- Classify data by sensitivity
- Implement identity federation and least privilege
- Manage compliance as code

### 4. Reliability
Design and operate a resilient, highly available service that meets availability targets.

**Key principles:**
- Define and measure SLOs/SLIs
- Build redundancy to handle failures
- Design for graceful degradation
- Implement health monitoring and automated remediation
- Test for reliability (disaster recovery, chaos engineering)

### 5. Cost Optimization
Manage and optimize costs while maintaining performance and reliability.

**Key principles:**
- Identify cost drivers
- Right-size and auto-scale resources
- Use committed use discounts and sustained use discounts
- Monitor and forecast costs
- Build a cost-aware culture

### 6. Performance Optimization
Design, validate, and tune resources for optimal performance.

**Key principles:**
- Define performance requirements early
- Benchmark and load-test
- Optimize at the application and infrastructure layers
- Use caching and CDNs
- Monitor performance continuously

---

## Well-Architected Review Process

A Well-Architected Review (WAR) is a structured assessment of a workload against the framework's pillars. All three clouds provide review tooling:

| Cloud | Tool | How It Works |
|-------|------|-------------|
| **AWS** | AWS Well-Architected Tool | Answer questions per pillar; generates findings and improvement plan |
| **Azure** | Azure Well-Architected Review (online assessment) | Self-service questionnaire; generates recommendations |
| **GCP** | Architecture Framework checklists + Cloud Architecture Center | Checklist-driven review; reference architectures |

### Review Steps

1. **Scope the workload** -- Define the boundary of what is being reviewed (a single application, a platform, a service).
2. **Assemble the team** -- Include architects, developers, operations, security, and finance.
3. **Walk through each pillar** -- Answer the framework's questions honestly. Identify gaps.
4. **Prioritize findings** -- Rank by business impact and effort. Focus on high-risk, high-impact items first.
5. **Create an improvement plan** -- Assign owners, set deadlines, track progress.
6. **Schedule regular reviews** -- Architecture is not a one-time activity. Review quarterly or after major changes.

### Review Frequency

| Trigger | Action |
|---------|--------|
| New workload launch | Full review before production |
| Major architecture change | Review affected pillars |
| Quarterly cadence | Lightweight review of all pillars |
| Incident or outage | Review Reliability and Operational Excellence pillars |
| Cost spike | Review Cost Optimization pillar |

## Pillar Tensions and Tradeoffs

The pillars are inherently in tension. Optimizing one often increases costs or complexity in another:

| Tradeoff | Example |
|----------|---------|
| Reliability vs. Cost | Multi-region deployment increases availability but doubles infrastructure cost |
| Security vs. Performance | Encryption at rest and in transit adds latency |
| Performance vs. Cost | Over-provisioning ensures headroom but wastes money |
| Operational Excellence vs. Speed | Comprehensive CI/CD and observability take time to set up but pay off long-term |
| Sustainability vs. Performance | Right-sizing reduces waste but may reduce performance headroom |

**Key principle:** Make tradeoffs explicitly. Document which pillars are prioritized and why (use Architecture Decision Records -- see `specs/documentation/adr`).

## Best Practices
- Use the well-architected framework as a common language between architects, developers, and stakeholders -- not as a compliance checklist.
- Conduct well-architected reviews early and often, not just before launch.
- Prioritize the pillars that matter most for your workload (e.g., a financial system prioritizes Security and Reliability; a data pipeline prioritizes Performance and Cost).
- Leverage the cloud provider's native review tooling to structure the assessment.
- Document all tradeoff decisions in Architecture Decision Records.
- Remember that well-architected is aspirational -- no workload scores perfectly on every pillar. The goal is continuous improvement.
- When working across clouds (multi-cloud or migration), use this cross-cloud comparison to map equivalent concerns and avoid gaps.
