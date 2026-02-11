# Diagramming

Use when creating software architecture diagrams, system visualizations, or technical drawings. Covers text-based and visual diagramming approaches for architecture communication.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 6 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`archimate/`](archimate/) | Use when modeling enterprise architecture with ArchiMate, the Open Group standard visual notation (v3.2). Covers Busines... |
| [`c4-diagrams/`](c4-diagrams/) | Use when modeling software architecture using the C4 model (Context, Container, Component, Code) by Simon Brown. Covers ... |
| [`d2/`](d2/) | Use when creating architecture diagrams with the D2 declarative diagramming language by Terrastruct. D2 offers advanced ... |
| [`erd/`](erd/) | Use when creating entity-relationship diagrams for database design and data modeling. Covers entity types, attributes, r... |
| [`functional-diagrams/`](functional-diagrams/) | Use when creating data flow diagrams (DFD), functional decomposition trees, IDEF0 diagrams, or BPMN process models. Cove... |
| [`mermaidjs/`](mermaidjs/) | Use when creating text-based diagrams that render in Markdown environments. Mermaid.js is the most widely supported diag... |
| [`plantuml/`](plantuml/) | Use when creating UML and architecture diagrams using PlantUML's text-based DSL. Covers all major diagram types, syntax,... |
| [`togaf/`](togaf/) | Use when applying The Open Group Architecture Framework (TOGAF) for enterprise architecture development. Covers the Arch... |
| [`uml/`](uml/) | Use when modeling software systems using the Unified Modeling Language (UML) standard. Covers structural and behavioral ... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/specs/diagramming
```

## License

MIT
