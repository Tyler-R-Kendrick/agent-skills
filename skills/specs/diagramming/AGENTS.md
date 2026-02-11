# Diagramming

## Overview
Architecture diagrams communicate system structure, behavior, and relationships visually. Modern "diagrams as code" tools let you version, diff, and automate diagram generation alongside your source code.

## Diagram Types

### Structural Diagrams
| Type | Purpose | Tools |
|------|---------|-------|
| C4 (Context, Container, Component, Code) | Hierarchical system decomposition | Structurizr DSL, Mermaid |
| Class diagrams | Object structure and relationships | UML, Mermaid, PlantUML |
| Component diagrams | Internal structure of containers | UML, C4 Level 3 |
| Entity-Relationship (ERD) | Data model relationships | Mermaid, dbdiagram.io |
| Package / Module diagrams | Code organization | UML, Mermaid |

### Behavioral Diagrams
| Type | Purpose | Tools |
|------|---------|-------|
| Sequence diagrams | Interaction order between actors | Mermaid, PlantUML |
| Activity / Flowcharts | Process and decision flows | Mermaid, D2, BPMN |
| State diagrams | State machine transitions | Mermaid, PlantUML |
| Functional / Data flow | Data transformation pipelines | DFD, Mermaid |

### Enterprise Architecture
| Type | Purpose | Tools |
|------|---------|-------|
| TOGAF ADM views | Enterprise architecture phases | Archi, Sparx EA |
| ArchiMate models | Business-application-technology layers | Archi, Sparx EA |

## Diagrams-as-Code Tools

| Tool | Language | Rendering | Best For |
|------|----------|-----------|----------|
| **Mermaid** | Markdown-like DSL | SVG (browser, GitHub) | Inline docs, PRs, wikis |
| **D2** | Declarative DSL | SVG, PNG, PDF | Architecture diagrams |
| **PlantUML** | Text DSL | PNG, SVG | UML diagrams |
| **Structurizr DSL** | C4-specific DSL | SVG, PNG | C4 model diagrams |

## Best Practices
- Use "diagrams as code" tools (Mermaid, D2, PlantUML, Structurizr) so diagrams are version-controlled, diffable, and CI-renderable.
- Start with C4 Level 1 (Context) to establish boundaries, then zoom in to Level 2 (Container) and Level 3 (Component) as needed.
- Use Mermaid for diagrams inside Markdown files — GitHub, GitLab, and most documentation platforms render it natively.
- Use D2 or Structurizr for standalone architecture diagrams that need advanced layout control.
- Keep diagrams close to the code they describe — in the same repo, ideally the same directory.
- Include a legend or title on every diagram so readers understand the notation without prior knowledge.
