# skill-quiver

Curated library of 68 production-grade skills for AI coding agents. Covers engineering, design, testing, ops, security, domain tools, and agent meta-skills.

**Primary target:** Claude Code. Compatible with Codex, Gemini CLI, and any tool that accepts skill injection.

---

## What is a skill?

A `SKILL.md` file loaded into an AI agent's context to give it a specific capability — an execution procedure, reference knowledge, role persona, or one-time setup. Skills are modular: install only what you need.

| Type | Behavior |
|---|---|
| `execution` | Agent follows steps autonomously — triggers immediately when loaded |
| `reference` | Passive knowledge injected during work |
| `persona` | Reshapes communication style and approach for the session |
| `setup` | Run once; output (config file, context doc) persists across sessions |

---

## Quick Install

### Claude Code
```bash
# Set once (add to ~/.bashrc)
export QUIVER_PATH=~/projects/skill-quiver

# Install a skill into your project
cp $QUIVER_PATH/test/tdd-workflow/SKILL.md .claude/skills/tdd-workflow/SKILL.md

# Or install quiver-draw globally — then pull any skill on demand
cp $QUIVER_PATH/system/quiver-draw/SKILL.md ~/.claude/skills/quiver-draw/SKILL.md
# Then in any session: /quiver-draw tdd-workflow
```

### Codex / Gemini CLI / other tools
```bash
# Inject a skill as context prefix to any CLI command
$QUIVER_PATH/bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"
$QUIVER_PATH/bin/quiver-inject api api-design gemini "design REST API for users"
```

### Browse the index
```bash
cat $QUIVER_PATH/skills.json   # machine-readable, full schema
cat $QUIVER_PATH/MANIFEST.md   # human-readable, grouped by category
```

---

## Categories

| Folder | Skills | Purpose |
|---|---|---|
| `plan/` | 2 | Strategy, blueprints, multi-session planning |
| `code/` | 7 | Coding patterns and language standards (reference) |
| `code/tools/` | 4 | Hands-on execution tools — frontend, migrations, optimization |
| `test/` | 6 | TDD, verification, regression, E2E, accessibility, API testing |
| `ship/` | 3 | Deployment, Docker, DevOps automation |
| `design/core/` | 3 | Design principles, context setup, diagram generation |
| `design/verbs/` | 8 | Design actions — animate, colorize, distill, bolder, etc. |
| `design/quality/` | 8 | Design review — audit, critique, polish, typeset, etc. |
| `prompt/` | 4 | Content creation, research, prompt optimization |
| `ops/` | 5 | LLM cost management, agent ops, context management |
| `review/` | 4 | Code review, security review, skill safety scanning |
| `system/` | 9 | Skills that manage the quiver itself — curate, format, draw, audit |
| `domain/` | 5 | Document generation (DOCX/PDF/XLSX/PPTX), GLSL shaders |

Full catalog: see [MANIFEST.md](MANIFEST.md)

---

## On-Call Pattern

The key design: keep each tool's default skill set minimal. Pull skills from the quiver as needed.

```
Your Tool
├── core skills (5-10 essentials, always loaded)
└── quiver-draw (one skill, indexes all 68)
     └── pulls any skill on demand → context injection
```

For non-Claude tools, `bin/quiver-inject` does the same thing from the command line.

### Always-loading skills (project-scoped)

To make specific skills load every session in a project, add `@import` lines to the project's `CLAUDE.md`:

```markdown
@system/quiver-draw/SKILL.md
@system/curate/SKILL.md
```

Claude Code reads `@path` in CLAUDE.md at session start and inlines the file into context — no commands needed, fires automatically.

**Hook alternative** (cross-project, any tool):
```json
// .claude/settings.json
{
  "hooks": {
    "UserPromptSubmit": [{ "command": "cat $QUIVER_PATH/system/quiver-draw/SKILL.md" }]
  }
}
```
Hook fires on every prompt — heavier, but works across all projects without touching their CLAUDE.md.

---

## Security

Every skill in this repo has been reviewed. For skills you're adding from external sources, use the built-in scanner:

```bash
# Scan before promoting — uses NVIDIA SkillSpector (64 vulnerability patterns)
$QUIVER_PATH/bin/skillspector-scan ./candidate-skill/SKILL.md

# Or load the scan skill in Claude Code
# /skill-scan path/to/candidate/SKILL.md
```

SkillSpector detects prompt injection, data exfiltration, harmful content, MCP poisoning, and 60+ other patterns. Score > 50/100 blocks promotion.

---

## Curation Pipeline

This repo has a built-in HITL curation system for adding new skills:

```
resources/_incoming/   ← drop candidates here
/skill-scan            ← security check (Step 0)
/curate                ← score + normalize + promote
/format                ← normalize frontmatter of existing skills
/stocktake             ← audit quality of all skills
```

Source pools (gitignored `resources/`) include symlinks to hermes-skills, agy-skills, and 9 cloned upstream repos. Promotion threshold: ≥ 7/10 composite score.

---

## Rebuild Index

```bash
# Regenerates skills.json + MANIFEST.md from SKILL.md frontmatter
./sync-manifest.sh
```

---

## Sources

Curated and synthesized from:
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) — engineering, testing, agentic patterns
- [impeccable](https://github.com/pbakaus/impeccable) — frontend design system, anti-AI-slop
- [gsap-skills](https://github.com/greensock/gsap-skills) — official GSAP animation skills
- [agency-agents](https://github.com/msitarzewski/agency-agents) — role-based engineering personas
- [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) — document generation, shaders
- [baoyu-skills](https://github.com/JimLiu/baoyu-skills) — productivity and content skills
- [ljg-skills](https://github.com/lijigang/ljg-skills) — research and thinking tools
- [fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph) — SVG/PNG diagram generation
- [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) — security scanner (tool, not skill source)

---

## License

MIT
