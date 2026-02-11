---
name: craftsmanship
description: |
    Use when applying software craftsmanship principles — code quality, professional practices, and continuous improvement drawn from canonical works.
    USE FOR: code quality principles, Boy Scout Rule, DRY/KISS/YAGNI, craftsmanship practices, choosing quality improvement approaches
    DO NOT USE FOR: specific principle details (use clean-code, solid, refactoring sub-skills), architecture decisions (use dev/architecture), testing strategy (use testing)
license: MIT
metadata:
  displayName: "Software Craftsmanship"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Manifesto for Software Craftsmanship"
    url: "http://manifesto.softwarecraftsmanship.org/"
  - title: "The Pragmatic Programmer — pragprog.com"
    url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
---

# Software Craftsmanship

## Overview
Software craftsmanship is a movement that emphasizes the coding skills of developers themselves. It extends agile development by focusing not just on working software, but on *well-crafted* software. The Software Craftsmanship Manifesto (2009) declares:

> As aspiring Software Craftsmen we are raising the bar of professional software development by practicing it and helping others learn the craft. Through this work we have come to value:
>
> - Not only working software, but also **well-crafted software**
> - Not only responding to change, but also **steadily adding value**
> - Not only individuals and interactions, but also a **community of professionals**
> - Not only customer collaboration, but also **productive partnerships**

## The Boy Scout Rule

> "Leave the code better than you found it." — Robert C. Martin

Every time you touch code, improve it. Fix a name, extract a method, add a missing test, remove dead code. The cumulative effect of small, continuous improvements is a codebase that gets healthier over time rather than decaying.

**Applying the Boy Scout Rule:**
- Rename a variable to be more descriptive while fixing a bug nearby.
- Extract a duplicated block into a shared function when adding a feature.
- Delete commented-out code that has been dead for months.
- Add a missing null check or guard clause when reading through a function.
- Write a test for an untested path you discover while investigating an issue.

## The Pragmatic Programmer Principles

From *The Pragmatic Programmer* by Andrew Hunt and David Thomas:

| Principle | Meaning |
|-----------|---------|
| Care About Your Craft | There is no point in developing software unless you care about doing it well. |
| Think! About Your Work | Turn off the autopilot and take control — constantly critique and appraise your work. |
| DRY — Don't Repeat Yourself | Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. |
| Orthogonality | Eliminate effects between unrelated things. Changes in one area should not ripple into others. |
| Tracer Bullets | Use code that glows in the dark — build thin, end-to-end slices to validate architecture early. |
| Prototypes and Post-It Notes | Prototype to learn. Prototypes are disposable — make that clear. |
| Domain Languages | Program close to the problem domain. |
| Estimate | Learn to estimate to avoid surprises. "I'll get back to you" is always an acceptable answer. |
| Good-Enough Software | Know when to stop. Great software today is often preferable to perfect software tomorrow. |
| Invest Regularly in Your Knowledge Portfolio | Learn at least one new language every year. Read a technical book each month. |
| It's Both What You Say and the Way You Say It | Know your audience. Communicate effectively. |

## Principles Quick-Reference

| Principle | Definition | Violation Sign |
|-----------|-----------|----------------|
| **DRY** (Don't Repeat Yourself) | Every piece of knowledge has a single, unambiguous representation. | Copy-pasted logic, duplicated constants, repeated validation rules. |
| **KISS** (Keep It Simple, Stupid) | The simplest solution that works is the best solution. | Over-engineered abstractions, unnecessary design patterns, premature optimization. |
| **YAGNI** (You Aren't Gonna Need It) | Do not build functionality until it is needed. | Speculative features, unused abstractions, configuration for hypothetical scenarios. |
| **Separation of Concerns** | Each module addresses a distinct concern. | UI logic mixed with business logic, data access scattered across layers. |
| **Law of Demeter** | A method should only talk to its immediate friends. | Long chains like `order.getCustomer().getAddress().getCity()`. |
| **Principle of Least Surprise** | Software should behave in a way that users and developers expect. | A `save()` method that also sends an email; a getter that modifies state. |
| **Composition over Inheritance** | Favor assembling behavior from small parts over deep class hierarchies. | Deep inheritance trees, fragile base class problems. |
| **Fail Fast** | Report errors as soon as they are detected. | Swallowing exceptions, returning null instead of throwing, silent data corruption. |
| **Single Source of Truth** | Every data element is mastered in exactly one place. | Duplicated database columns, config in multiple files, competing state stores. |
| **Encapsulation** | Hide internal details and expose only what is necessary. | Public fields, leaking internal collections, exposing implementation types in APIs. |

## Canonical Works

| Book | Author(s) | Sub-Skill | Key Contribution |
|------|-----------|-----------|------------------|
| *Clean Code* | Robert C. Martin | `clean-code` | Naming, functions, formatting, comments, error handling |
| *Clean Architecture* | Robert C. Martin | `clean-architecture` | Dependency Rule, concentric layers, boundaries |
| *Refactoring* | Martin Fowler | `refactoring` | Code smells catalog, refactoring techniques, safe transformation |
| *SOLID Principles* | Robert C. Martin | `solid` | Five principles for maintainable object-oriented design |
| *The Twelve-Factor App* | Adam Wiggins | `twelve-factor` | Cloud-native application methodology |
| *The Pragmatic Programmer* | Hunt & Thomas | (this skill) | Professional mindset, pragmatic philosophy, career practices |
| *A Philosophy of Software Design* | John Ousterhout | — | Deep vs. shallow modules, complexity management |
| *Code Complete* | Steve McConnell | — | Construction practices, defensive programming, self-documenting code |
| *Working Effectively with Legacy Code* | Michael Feathers | — | Seam model, characterization tests, breaking dependencies |

## When to Use Which Sub-Skill

| Situation | Reach For |
|-----------|-----------|
| Code is hard to read, names are unclear, functions are long | `clean-code` |
| Dependencies flow in the wrong direction, layers are tangled | `clean-architecture` |
| Classes have too many responsibilities, changes break unrelated things | `solid` |
| Deploying to the cloud, configuring environments, managing processes | `twelve-factor` |
| Code smells accumulate, need systematic improvement without changing behavior | `refactoring` |
| General quality mindset, deciding which approach to take first | This skill (`craftsmanship`) |

## The Craftsmanship Mindset

1. **Practice deliberately.** Kata, code retreats, and mob programming sessions sharpen your skills outside of production pressure.
2. **Seek feedback.** Code reviews, pair programming, and retrospectives expose blind spots.
3. **Own your mistakes.** When something breaks, fix it, learn from it, and share the lesson.
4. **Mentor and be mentored.** Teaching deepens understanding; learning from others shortens the path.
5. **Measure and reflect.** Track defect rates, cycle times, and code churn — but remember that metrics are guides, not goals.

## Best Practices
- Apply the Boy Scout Rule on every commit — even a small improvement counts.
- Use DRY for knowledge, not just code — duplicated business rules in documentation, tests, and code are three bugs waiting to diverge.
- Apply KISS by asking "What is the simplest thing that could possibly work?" before reaching for a pattern.
- Apply YAGNI by deleting speculative code that has not been needed for two sprints.
- Treat the principles as guardrails, not laws — context always wins over dogma.
- Invest time in learning: read one canonical book per quarter, attend one conference or meetup per year.
- Prefer small, reversible decisions over big, irreversible ones.
