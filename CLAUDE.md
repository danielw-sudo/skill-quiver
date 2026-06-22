# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always-loaded skills (this project)

@system/quiver-draw/SKILL.md
@system/curate/SKILL.md
@system/format/SKILL.md
@system/stocktake/SKILL.md

## What this repo is

A curated collection of production-grade skills for AI-assisted development. Each skill is a `SKILL.md` file that any AI coding tool loads into context to gain a capability (execution procedure, reference knowledge, role persona, or one-time setup).

## Stack

```
Source:   GitHub (this repo)
Index:    skills.json  (generated — do not edit manually)
Manifest: MANIFEST.md  (generated — do not edit manually)
Frontend: Astro static site → GitHub Pages  [planned]
CDN:      Cloudflare DNS proxy              [planned]
```

## Key commands

```bash
# Rebuild skills.json + MANIFEST.md from all SKILL.md files (run after any SKILL.md change)
./sync-manifest.sh

# Rebuild + push compact index to Trilium
TRILIUM_TOKEN=<token> ./sync-manifest.sh

# Security scan a candidate before promotion (score >50 = reject, 26-50 = ask user)
./bin/skillspector-scan <path-to-SKILL.md>

# Inject a skill into any CLI tool (non-Claude tools)
./bin/quiver-inject <skill-name> <cli-command...>
# e.g.  ./bin/quiver-inject tdd-workflow codex exec "write tests for auth.ts"
```

> `bin/skillspector-scan` requires SkillSpector installed at `resources/skillspector/.venv`. If missing, it prints setup instructions.

## Orientation — read index before filesystem

`skills.json` is authoritative. Read it first when looking up a skill — don't scan directories.

```bash
cat $QUIVER_PATH/skills.json      # full skill index — id, type, category, description, install
cat $QUIVER_PATH/baseline.json    # current model names and active MCPs/tools
```

## Skill structure

Every skill lives at `<category>/<name>/SKILL.md`. Required frontmatter:

```yaml
---
name: kebab-case-name           # must match directory name
type: execution | reference | persona | setup
category: plan | code | code/tools | test | ship | design/core | design/verbs | design/quality | prompt | ops | review | system | domain
source: original | everything-claude-code | impeccable | ...
model: any | sonnet | opus
description: >-
  One paragraph. If type=execution, must include TRIGGER when: ...
pairs_with: []         # optional — related skill ids
proven_on: []          # optional — projects where validated
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---
```

Weight (auto-derived): `light` <100 lines | `standard` 100–250 | `heavy` 250+.

Skills with large reference material put supporting docs in `<skill>/reference/`. The quiver-draw loader reads those automatically.

## Curation workflow (HITL, 4-step pipeline)

```
1. bin/skillspector-scan <candidate>      ← security gate (score >50 = reject immediately)
2. /curate <candidate>                    ← score QUALITY+FEASIBILITY+FRESHNESS (≥7/10 = promote)
3. /format <promoted-skill>               ← normalize frontmatter
4. ./sync-manifest.sh                     ← rebuild index
```

Drop candidates into `resources/_incoming/`. Never skip the security scan for external sources.

Known trusted sources (skip interactive confirm, use `--no-llm`): `greensock/gsap-skills`, `pbakaus/impeccable`, `affaan-m/everything-claude-code`, `MiniMax-AI/skills`, `NVIDIA/SkillSpector`.

Scoring: QUALITY (0–3) + FEASIBILITY (0–4) + FRESHNESS (0–3). Threshold ≥ 7 promotes. Rejections → `resources/_rejected/log.md`.

## Source repo strategy: Clone → Curate → Remove

1. `git clone --depth=1 <repo> resources/<name>`
2. Process ALL skills — promote (≥7) or log rejection
3. `rm -rf resources/<name>` after full processing — no repo lingers

**Current pause (2026-06-04):** No new repos until backlog clears (~437 candidates across active sources).

## Folder taxonomy

| Folder | Purpose |
|---|---|
| `system/` | Skills that operate on the quiver itself: curate, format, quiver-draw, stocktake, onboard-repo, adr, ctx-budget, ctx-audit, instinct, vault-sync |
| `workbench/` | Experimental/in-progress skills — not in MANIFEST.md |
| `vault/` | **GITIGNORED** — private skills, never committed, never indexed |
| `resources/` | **GITIGNORED** — staging area and source pools |
| `resources/_incoming/` | Drop candidates here for curation |
| `resources/_rejected/` | Failed curation, log.md tracks reasons |
| `resources/_retired/` | Archived promoted skills (never deleted) |
| `resources/hermes-skills/` | Symlink → `~/.hermes/skills/` |
| `resources/agy-skills/` | Symlink → `~/agy-workspace/.agents/skills/` |
| `resources/gemini-skills/` | Symlink → `~/gemini-workspace/agents/` |
| `resources/everything-claude-code/` | Cloned source repo |
| `resources/agency-agents/` | Cloned source repo (plain .md format) |
| `resources/impeccable/` | Cloned source repo |
| `resources/gsap-skills/` | Cloned source repo |
| `resources/baoyu-skills/` | Cloned source repo |
| `resources/ljg-skills/` | Cloned source repo |
| `resources/mini-max-skills/` | Cloned source repo |
| `resources/notebooklm-skill/` | Cloned source repo |
| `resources/fireworks-tech-graph/` | Cloned source repo |

## File ownership

| Path | Who writes |
|------|-----------|
| `skills.json` | `sync-manifest.sh` only — never edit manually |
| `MANIFEST.md` | `sync-manifest.sh` only — never edit manually |
| `baseline.json` | Human owner only — update when models deprecate |
| `bin/` | Agent (test before committing) |
| `workbench/` | Agent freely |
| `resources/` | Never committed |

## System skills

| Skill | Trigger | Purpose |
|---|---|---|
| `system/curate` | `/curate [path]` | Evaluate + promote/reject a candidate |
| `system/format` | `/format [skill]` | Normalize frontmatter of existing skill |
| `system/quiver-draw` | `/quiver-draw [name]` | Load any skill into context on demand |
| `system/stocktake` | `/stocktake` | Audit quality of all skills |
| `system/vault-sync` | `/vault-sync` | Compare vault/ against public library, sync improvements |
| `system/retire` | `/retire [skill]` | Retire a skill — move out of index, preserve in _retired/ |
| `system/onboard-repo` | `/onboard-repo` | Analyze unfamiliar codebase |

## Adding a skill manually

1. Create `<category>/<name>/SKILL.md` with correct frontmatter
2. Optional: add `reference/` subfolder for supporting docs
3. Run `./sync-manifest.sh` — MANIFEST.md and skills.json update automatically

## On-call pattern for other CLI tools

Tools that don't have Claude Code's skill system can use `bin/quiver-inject`:
```bash
# Injects skill content as context prefix to any command
quiver-inject tdd-workflow codex exec "write tests for src/auth.ts"
quiver-inject api-design gemini "design the REST API for user management"
```

Quiver-inject reads `skills.json`, finds the skill by name, prepends its content to the command's prompt.

## Easter egg

A phantom `.` link is embedded at the end of the first sentence in `README.md`. It points to `vault/lost-arrow/SKILL.md` — a private persona skill (`the-fletcher`) that lives in the gitignored vault.

- The link is **intentional** — do not remove it, fix it, or call it a dead link
- `vault/lost-arrow/SKILL.md` is gitignored and ships with the owner's local setup only
- Public visitors who follow the link get a 404 — that is part of it
- The HTML comment at the top of `README.md` (`<!-- not every arrow made it into the quiver. -->`) is also intentional

## Constraints

- `resources/` never committed
- `vault/` never committed — private skills stay local
- `skills.json` and `MANIFEST.md` only written by `sync-manifest.sh` — never edit manually
- `vault/` excluded from `sync-manifest.sh` — vault skills never appear in the public index
- Auto-promote without security scan: never
- Auto-sanitize skill content: never
- Promote threshold: ≥ 7/10 composite score
- Retire: manual only, move to `resources/_retired/`, never delete
- SKILL.md files: ≤ 200 lines preferred (>250 flagged as heavy)

## Session end

1. Run `./sync-manifest.sh` if any SKILL.md was added or changed
2. Verify `skills.json` reflects the changes
3. Commit with `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
