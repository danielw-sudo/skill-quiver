<!-- not every arrow made it into the quiver. -->

# skill-quiver

Curated library of 178 production-grade skills for AI coding agents. Covers engineering, design, testing, ops, security, domain tools, and agent meta-skills[.](vault/lost-arrow/SKILL.md)

**Primary target:** Claude Code. Compatible with Codex, Gemini CLI, and any tool that accepts skill injection.

---

## Quick Install

You can install skill-quiver using either the lightweight **Zero-Clone method (Recommended)** or by **Cloning the repository locally**.

### Option A: Zero-Clone Install (Recommended)

If you only want to browse, search, and load/install skills directly from the remote GitHub registry without cloning the entire repository:

1. Download the single `/quiver` manager skill into your project's local skills directory (or globally):
   ```bash
   # For a local project:
   curl -o .claude/skills/quiver/SKILL.md --create-dirs https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/system/quiver/SKILL.md

   # Or globally for all projects:
   curl -o ~/.claude/skills/quiver/SKILL.md --create-dirs https://raw.githubusercontent.com/danielw-sudo/skill-quiver/main/system/quiver/SKILL.md
   ```

2. Start your Claude Code session and run:
   * `/quiver find <query>` — Search the entire public skill catalog.
   * `/quiver draw <name>` — Load any skill's content directly into your active context on-the-fly.
   * `/quiver install <name>` — Download and save a skill locally to `.claude/skills/` in your current project.

---

### Option B: Local Repository Clone

If you want local offline access, custom private skills via the `vault`, or command-line injection for other CLI tools:

#### 1. Clone this repository
Clone the repository to your local machine (e.g., under `~/projects/`):
```bash
git clone https://github.com/danielw-sudo/skill-quiver.git ~/projects/skill-quiver
```

#### 2. Configure the environment variable
Add `QUIVER_PATH` to your shell profile (`~/.bashrc` or `~/.zshrc`) so that agent loader scripts and CLI tools can locate your local library copy:
```bash
export QUIVER_PATH=~/projects/skill-quiver
```
Then reload your shell configuration (e.g., `source ~/.bashrc`).

#### 3. Load or inject skills

##### For Claude Code
To install a specific skill into your active project workspace:
```bash
mkdir -p .claude/skills/tdd-workflow
cp $QUIVER_PATH/test/tdd-workflow/SKILL.md .claude/skills/tdd-workflow/SKILL.md
```
Or install the local `quiver-draw` loader globally so you can pull any skill on-demand:
```bash
mkdir -p ~/.claude/skills/quiver-draw
cp $QUIVER_PATH/system/quiver-draw/SKILL.md ~/.claude/skills/quiver-draw/SKILL.md
# Then in any active Claude Code session, run:
# /quiver-draw tdd-workflow
```

##### For Codex / Gemini CLI / other tools
Use the built-in CLI wrapper `quiver-inject` to prepend any skill as a context prefix before running your CLI agent commands:
```bash
$QUIVER_PATH/bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"
$QUIVER_PATH/bin/quiver-inject api-design gemini "design REST API for users"
```

##### Browse the index
To search and view cataloged skills:
```bash
cat $QUIVER_PATH/skills.json   # Machine-readable schema index
cat $QUIVER_PATH/MANIFEST.md   # Human-readable categorized list
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
└── quiver-draw (one skill, indexes all 167)
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
