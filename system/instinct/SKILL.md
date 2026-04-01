---
name: instinct
description: Instinct-based learning system that observes sessions via hooks, creates atomic instincts with confidence scoring, and evolves them into skills/commands/agents. v2.1 adds project-scoped instincts.
type: reference
category: system
source: everything-claude-code
model: any
version: 2.1.0
---

# Continuous Learning v2.1 — Instinct-Based Architecture

An advanced learning system that turns Claude Code sessions into reusable knowledge through atomic "instincts" — small learned behaviors with confidence scoring.

**v2.1** adds **project-scoped instincts** — React patterns stay in your React project, Python conventions stay in your Python project, universal patterns are shared globally.

## When to Activate

- Setting up automatic learning from Claude Code sessions
- Configuring instinct-based behavior extraction via hooks
- Tuning confidence thresholds for learned behaviors
- Reviewing, exporting, or importing instinct libraries
- Evolving instincts into full skills, commands, or agents
- Managing project-scoped vs global instincts

## The Instinct Model

An instinct is a small learned behavior:

```yaml
---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
domain: "code-style"
scope: project
project_id: "a1b2c3d4e5f6"
---
# Prefer Functional Style
## Action
Use functional patterns over classes when appropriate.
## Evidence
- Observed 5 instances of functional pattern preference
- User corrected class-based approach to functional on 2025-01-15
```

**Properties:** Atomic (one trigger, one action) | Confidence-weighted (0.3-0.9) | Domain-tagged | Evidence-backed | Scope-aware (project or global)

## Commands

| Command | Description |
|---------|-------------|
| `/instinct-status` | Show all instincts (project-scoped + global) with confidence |
| `/evolve` | Cluster related instincts into skills/commands, suggest promotions |
| `/instinct-export` | Export instincts (filterable by scope/domain) |
| `/instinct-import <file>` | Import instincts with scope control |
| `/promote [id]` | Promote project instincts to global scope |
| `/projects` | List all known projects and their instinct counts |

## Scope Decision Guide

| Pattern Type | Scope | Examples |
|-------------|-------|---------|
| Language/framework conventions | **project** | "Use React hooks", "Follow Django REST patterns" |
| File structure preferences | **project** | "Tests in `__tests__`/", "Components in src/components/" |
| Code style | **project** | "Use functional style", "Prefer dataclasses" |
| Security practices | **global** | "Validate user input", "Sanitize SQL" |
| General best practices | **global** | "Write tests first", "Always handle errors" |
| Tool workflow preferences | **global** | "Grep before Edit", "Read before Write" |
| Git practices | **global** | "Conventional commits", "Small focused commits" |

## Instinct Promotion (Project -> Global)

**Auto-promotion criteria:** Same instinct ID in 2+ projects, average confidence >= 0.8.

The `/evolve` command also suggests promotion candidates.

## Confidence Scoring

| Score | Meaning | Behavior |
|-------|---------|----------|
| 0.3 | Tentative | Suggested but not enforced |
| 0.5 | Moderate | Applied when relevant |
| 0.7 | Strong | Auto-approved for application |
| 0.9 | Near-certain | Core behavior |

**Increases:** Repeated observation, user doesn't correct, corroborating evidence.
**Decreases:** User corrects, pattern not observed, contradicting evidence.

## Why Hooks vs Skills?

Hooks fire **100% of the time**, deterministically. Skills fire ~50-80% based on Claude's judgment. Every tool call is observed, no patterns missed.

## Backward Compatibility

v2.1 is fully compatible with v2.0 and v1. Existing global instincts and v1 learned skills still work. Gradual migration supported.

## Privacy

Observations stay local. Only instincts (patterns) can be exported — not raw observations or code.

## Workbench

Hook setup, project detection, configuration, file structure, and scripts (`observe.sh`, `instinct-cli.py`, `detect-project.sh`) are in `workbench/continuous-learning-v2/`.
