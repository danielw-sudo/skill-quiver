<!-- not every arrow made it into the quiver. -->

# skill-quiver

Curated library of 185 production-grade skills for AI coding agents. Covers engineering, design, testing, ops, security, domain tools, and agent meta-skills[.](vault/lost-arrow/SKILL.md)

**Primary target:** Claude Code. Compatible with Codex, Gemini CLI, and any tool that accepts skill injection.

---

## Quick Install

### Option A: CLI (Recommended)

No cloning needed. Install the CLI, search and use any skill instantly:

```bash
npm install -g skill-quiver
```

```bash
quiver list                        # Browse all 185 skills by category
quiver search tdd                  # Fuzzy search by name, category, or description
quiver draw tdd-workflow           # Output skill to stdout — pipe to any AI tool
quiver install fe-design           # Copy skill to .claude/skills/
quiver info backend-architect      # Show skill details
quiver inject tdd codex exec "write tests for auth.ts"  # Inject into any CLI
```

The CLI auto-syncs the skill index on first run and caches skill content locally (`~/.quiver/`). Works offline after first use.

---

### Option B: Claude Code Skill Loader

If you prefer staying inside Claude Code, install the `/quiver` manager skill:

```bash
curl -o .claude/skills/quiver/SKILL.md --create-dirs \
  https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/system/quiver/SKILL.md
```

Then in any session:
- `/quiver find <query>` — Search the catalog
- `/quiver draw <name>` — Load a skill into context
- `/quiver install <name>` — Save a skill locally

---

### Option C: Local Repository Clone

For offline access, private vault skills, or contributing:

```bash
git clone https://github.com/danielw-sudo/skill-quiver.git ~/projects/skill-quiver
export QUIVER_PATH=~/projects/skill-quiver  # add to ~/.bashrc or ~/.zshrc
```

```bash
# Install a skill manually
cp $QUIVER_PATH/test/tdd-workflow/SKILL.md .claude/skills/tdd-workflow/SKILL.md

# Inject into Codex / Gemini / any CLI
$QUIVER_PATH/bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"

# Browse the index
cat $QUIVER_PATH/MANIFEST.md
```

---

## Categories

| Folder | Purpose |
|---|---|
| `plan/` | Strategy, blueprints, multi-session planning |
| `code/` | Coding patterns and language standards (reference) |
| `code/tools/` | Hands-on execution tools — frontend, migrations, optimization |
| `test/` | TDD, verification, regression, E2E, accessibility, API testing |
| `ship/` | Deployment, Docker, DevOps automation |
| `design/core/` | Design principles, context setup, diagram generation |
| `design/verbs/` | Design actions — animate, colorize, distill, bolder, etc. |
| `design/quality/` | Design review — audit, critique, polish, typeset, etc. |
| `prompt/` | Content creation, research, prompt optimization |
| `ops/` | LLM cost management, agent ops, context management |
| `review/` | Code review, security review, skill safety scanning |
| `system/` | Skills that manage the quiver itself — curate, format, draw, audit, vault-sync |
| `domain/` | Document generation (DOCX/PDF/XLSX/PPTX), GLSL shaders |

Current counts: see [MANIFEST.md](MANIFEST.md)

---

## On-Call Pattern

The key design: keep each tool's default skill set minimal. Pull skills from the quiver as needed.

```
Your Tool
├── core skills (5-10 essentials, always loaded)
└── quiver-draw (one skill, indexes all 185)
     └── pulls any skill on demand → context injection
```

For non-Claude tools, the `quiver` CLI or `bin/quiver-inject` does the same thing from the command line.

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

## Private Vault

Clone or fork this repo and keep your own private skills in `vault/` — a gitignored directory that never leaves your machine.

You can manage your vault using the built-in `quiver-vault` CLI manager:

```bash
# Initialize the vault directory
$QUIVER_PATH/bin/quiver-vault init

# Create a new private skill from a standard template
$QUIVER_PATH/bin/quiver-vault create my-workflow

# Clone an existing public skill into the vault to customize it
$QUIVER_PATH/bin/quiver-vault clone codebase-inspection my-inspection

# List all skills currently in your vault
$QUIVER_PATH/bin/quiver-vault list
```

Vault skills work seamlessly with [quiver-inject](file:///mnt/d/cc/skill-quiver/bin/quiver-inject) and `quiver-draw` without appearing in the public `skills.json` or `MANIFEST.md` indexes. `quiver-inject` will automatically scan your `vault/` folder first, falling back to the public repository index if not found.

Use `/vault-sync` to compare your vault against the public library — it surfaces overlaps, gaps, and improvement opportunities without sharing your vault content with anyone.

```
vault/
  my-workflow/SKILL.md        ← your custom execution skill
  my-inspection/SKILL.md      ← your customized public clone
  NOTES.md                    ← vault-sync audit trail
```

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
