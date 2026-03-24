---
name: strategize
type: execution
category: plan
source: skill-quiver
model: any
tags: [strategy, autonomous, analysis, decision-making]
description: >-
  Deep autonomous strategic analysis. Reads codebase, researches prior art,
  evaluates trade-offs, and produces a decision document — without asking
  questions until the analysis is complete.
---

# Strategize — Autonomous Strategic Analysis

Perform deep, autonomous strategic analysis before presenting findings. Research first, recommend second, ask questions last.

## When to Use

- Starting a new project or major feature with unclear direction
- Evaluating architectural decisions with multiple viable options
- Needing to assess build-vs-buy, technology selection, or migration strategy
- Any task where "what should we do?" precedes "how do we do it?"

## Core Principle

**Do not ask the user questions during analysis.** Research autonomously, form a recommendation, and present the full analysis. The user reviews your output, not your intermediate questions. Questions come after — to refine, not to start.

## Procedure

### 1. Codebase Reconnaissance

Read before thinking. Gather hard facts:

- **Project structure**: directory layout, package.json/pyproject.toml, config files
- **Tech stack**: frameworks, languages, dependencies, deployment targets
- **Recent history**: `git log --oneline -20`, recent PRs, DEVLOG/CHANGELOG
- **Existing patterns**: how similar problems were solved before
- **Constraints**: CI/CD pipeline, test infrastructure, team size signals

Capture findings as structured notes. Do not skip this step.

### 2. Prior Art Research

Search for existing solutions before proposing new ones:

- **In the codebase**: grep for related patterns, utilities, prior attempts
- **In the ecosystem**: npm/PyPI packages, MCP servers, community skills
- **In documentation**: README, ADRs, design docs, issue trackers

For each candidate found, note: what it solves, what it doesn't, maintenance status, license.

### 3. Trade-off Analysis

For the top 2-3 viable approaches, evaluate against:

| Dimension | Question |
|-----------|----------|
| Simplicity | Which has the least moving parts? |
| Reversibility | Which is easiest to change later? |
| Time to value | Which ships soonest? |
| Maintenance | Which creates the least ongoing burden? |
| Risk | What's the worst failure mode of each? |

Score each approach. Name what you're giving up, not just what you're gaining.

### 4. Decomposition

Break the recommended approach into executable units:

- Each unit independently verifiable (clear done condition)
- Each unit completable in ~15 minutes of agent work
- Dependency order explicit (what blocks what)
- Model routing: flag units needing strongest model (architecture, multi-file invariants) vs default (implementation, boilerplate)

### 5. Output: Strategy Document

Present a single document with:

```markdown
## Context
[What prompted this analysis — the problem or opportunity]

## Recommendation
[Your recommended approach in 2-3 sentences]

## Analysis
[Trade-off table from step 3]

## Rejected Alternatives
[What you considered and why you rejected it]

## Execution Plan
[Ordered list of units from step 4, with dependencies noted]

## Open Questions
[What you couldn't determine autonomously — NOW ask the user]

## Risk & Rollback
[Biggest risk and how to recover if the approach fails]
```

### 6. Engage

Only after presenting the full analysis:
- Ask the user to review the recommendation
- Surface your open questions
- Propose next step (proceed with plan, or investigate an alternative)

## Anti-Patterns

- **Asking questions before researching** — You can answer most questions by reading the codebase
- **Presenting options without a recommendation** — The user wants your judgment, not a menu
- **Skipping prior art** — Always check what exists before proposing new
- **Single-option analysis** — Always evaluate at least 2 approaches to prove you considered alternatives
- **Scope creep** — Analyze the stated problem, not adjacent problems you noticed
