# skill-quiver

A curated collection of 77 production-grade skills for AI-assisted development.

Claude Code primary. Model-agnostic where possible.

## Categories

| Folder | Count | Purpose |
|---|---|---|
| `plan/` | 6 | Architecture, blueprints, agentic engineering, autonomous loops |
| `code/` | 11 | Language patterns, frameworks, API design, standards |
| `test/` | 7 | TDD, verification loops, regression, e2e, accessibility |
| `ship/` | 3 | Deployment, Docker, DevOps automation |
| `design/` | 29 | Impeccable design system, GSAP animation, frontend polish |
| `prompt/` | 4 | Content creation, research, prompt optimization |
| `ops/` | 3 | Cost-aware pipelines, context management, operations |
| `review/` | 4 | Code review, security review, security scan |
| `meta/` | 5 | Continuous learning, ADRs, onboarding, skill management |
| `domain/` | 5 | Document generation (DOCX/PDF/XLSX/PPTX), shaders |

## Usage

Copy a skill into your project's `.claude/skills/` directory:

```bash
cp skill-quiver/code/api-design/SKILL.md .claude/skills/api-design/SKILL.md
```

Or use the `/quiver` loader skill (install at `~/.claude/skills/quiver/SKILL.md`) to search, preview, and install skills interactively.

## Sources

Curated from:
- [everything-claude-code](https://github.com/anthropics/courses) — engineering, testing, agentic patterns
- [impeccable](https://github.com/impeccable) — frontend design system
- [gsap-skills](https://github.com/gsap) — GSAP animation patterns
- [agency-agents](https://github.com/agency) — role-based engineering personas
- Mini-max skills — document generation, native dev

## Skill Format

```markdown
---
name: skill-name
category: code
source: everything-claude-code
model: any
tags: [typescript, react]
description: One-line description.
---

# Skill content...
```

## License

MIT
