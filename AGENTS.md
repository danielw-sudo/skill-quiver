# AGENTS.md — skill-quiver

Authoritative reference for any AI agent working in this repository.
Applies to: Claude Code, Codex, Gemini CLI, Hermes, or any future agent with repo access.

---

## What this repo is

A curated skill library. Each skill is a `SKILL.md` at `<category>/<name>/SKILL.md`.
The canonical index is `skills.json` — always read this before searching the filesystem.

**Single env var required:**
```bash
export QUIVER_PATH=~/projects/skill-quiver   # set in ~/.bashrc
```

---

## Read First

```bash
cat $QUIVER_PATH/skills.json      # full skill index — id, type, category, description, install
cat $QUIVER_PATH/baseline.json    # current models, active MCPs/tools
cat $QUIVER_PATH/CLAUDE.md        # operational guide + constraints
```

---

## Key Commands

```bash
# Rebuild index after adding/changing skills
./sync-manifest.sh

# Security scan a candidate skill before promoting
./bin/skillspector-scan <path-to-SKILL.md>

# Inject a skill into another CLI tool's context
./bin/quiver-inject <skill-name> <cli-command> [args...]
```

---

## Adding a Skill

1. Create `<category>/<name>/SKILL.md` — see frontmatter spec below
2. Optionally create `<category>/<name>/reference/*.md` for supporting docs
3. Run `./sync-manifest.sh` — index rebuilds automatically
4. Do NOT edit `skills.json` or `MANIFEST.md` by hand

**Frontmatter spec (all fields):**
```yaml
---
name: kebab-case-name           # required — must match directory name
type: execution                 # required — execution | reference | persona | setup
category: test                  # required — see taxonomy in CLAUDE.md
source: original                # required — upstream repo or "original"
model: any                      # required — any | sonnet | opus
description: >-                 # required — one paragraph; execution type MUST include TRIGGER when:
  TDD with 80%+ coverage. TRIGGER when: user asks to write tests or implement with tests.
pairs_with: [test/verify]       # optional — related skill ids
proven_on: [tools4all.ai]       # optional — projects where this skill was validated
reviewed_at: 2026-06-04         # optional — ISO date of last review
model_tested: claude-sonnet-4-6 # optional — model used during validation
---
```

**Weight** is auto-derived from line count: `light` <100, `standard` 100–250, `heavy` 250+.

---

## Source Repo Strategy: Clone → Curate → Remove

When adding a skill source repo:
1. `git clone --depth=1 <repo> resources/<name>`
2. Process ALL skills: promote (≥7/10) or log rejection to `resources/_rejected/log.md`
3. `rm -rf resources/<name>` after every skill is either promoted or rejected
4. No repo lingers after full processing

**Deduplication:** Skills already in quiver that appear in a source repo are marked "skip — already promoted" and counted as processed. The quiver version is canonical.

**Current pause (2026-06-04):** No new repos until backlog clears (~437 candidates across active sources).

## Curation Workflow (HITL)

For external candidates, go through the curation pipeline — do NOT skip:

```
1. bin/skillspector-scan <candidate>   ← security gate (score >50 = reject)
2. /curate <candidate>                 ← score QUALITY+FEASIBILITY+FRESHNESS (≥7/10 = promote)
3. /format <promoted-skill>            ← normalize frontmatter
4. ./sync-manifest.sh                  ← rebuild index
```

Candidate staging: drop files into `resources/_incoming/`. Never commit `resources/`.

---

## File Ownership

| Path | Who writes | Notes |
|------|-----------|-------|
| `skills.json` | `sync-manifest.sh` only | Never edit manually |
| `MANIFEST.md` | `sync-manifest.sh` only | Never edit manually |
| `baseline.json` | Human owner only | Update when models deprecate |
| `system/`, `review/`, `<categories>/` | Agent (with curation) | Follow frontmatter spec |
| `workbench/` | Agent freely | Experimental, not indexed |
| `resources/` | Never committed | Gitignored staging area |
| `bin/` | Agent (with care) | Scripts — test before committing |
| `CLAUDE.md` | Agent | Keep accurate and current |
| `README.md` | Agent | Update when skill count changes |
| `AGENTS.md` | Human or agent | This file |

---

## Do Not

- Edit `skills.json` or `MANIFEST.md` manually — run `sync-manifest.sh`
- Commit anything under `resources/`
- Auto-promote skills without security scan
- Auto-retire skills — retirement is manual (owner decision)
- Auto-sanitize skills — content changes are HITL only
- Add skills to `workbench/` to the MANIFEST — it is intentionally excluded

---

## Category Taxonomy

```
plan          — strategy, blueprints, multi-session planning
code          — coding patterns, language standards (reference)
code/tools    — hands-on execution tools (frontend, migrations, etc.)
test          — TDD, verification, regression, E2E, accessibility
ship          — deployment, CI/CD, Docker
design/core   — design principles, context setup, diagram generation
design/verbs  — design action skills (animate, colorize, distill, etc.)
design/quality — design review (audit, critique, polish, etc.)
prompt        — content creation, research, prompt optimization
ops           — LLM cost, agent ops, context management
review        — code review, security review, skill scanning
system        — skills that operate on the quiver itself
domain        — document generation (docx/pdf/xlsx/pptx), shaders
```

---

## On-Call Pattern for Other Tools

This repo supports skill injection for tools without a native skill system:

```bash
# Inject skill into Codex
$QUIVER_PATH/bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"

# Inject skill into Gemini CLI
$QUIVER_PATH/bin/quiver-inject api-design gemini "design REST API for users"
```

`quiver-inject` reads `skills.json`, resolves the skill by name, prepends content to the prompt.

---

## Source Pools (gitignored resources/)

| Symlink/Dir | Points to | Notes |
|---|---|---|
| `resources/hermes-skills` | `~/.hermes/skills/` | 200+ skills, primary curation source |
| `resources/agy-skills` | `~/agy-workspace/.agents/skills/` | specialized pipeline skills |
| `resources/gemini-skills` | `~/gemini-workspace/agents/` | Gemini agent skills |
| `resources/everything-claude-code` | cloned repo | 790 SKILL.md files |
| `resources/impeccable` | cloned repo | design system |
| `resources/gsap-skills` | cloned repo | GSAP animation |
| `resources/agency-agents` | cloned repo | plain .md format, needs conversion |
| `resources/baoyu-skills` | cloned repo | 22 skills |
| `resources/ljg-skills` | cloned repo | 21 skills |
| `resources/mini-max-skills` | cloned repo | 23 skills |
| `resources/skillspector` | cloned + installed | security scanner tool |

---

## Session End

After completing work in this repo:
1. Run `./sync-manifest.sh` if any SKILL.md was added or changed
2. Verify `skills.json` reflects changes
3. Commit with `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
