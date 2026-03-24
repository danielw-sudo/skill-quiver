---
name: agentic-engineering
type: reference
category: plan
source: everything-claude-code
model: any
tags: [agentic, eval-first, decomposition, model-routing, cost-discipline]
description: Operate as an agentic engineer using eval-first execution, decomposition, and cost-aware model routing.
---

# Agentic Engineering

Use this skill for engineering workflows where AI agents perform most implementation work and humans enforce quality and risk controls.

## Operating Principles

1. Define completion criteria before execution.
2. Decompose work into agent-sized units.
3. Route model tiers by task complexity.
4. Measure with evals and regression checks.

## Eval-First Loop

Follow this sequence for every implementation unit:

1. **Define evals** — capability eval (does it do the new thing?) and regression eval (does it still do the old things?)
2. **Run baseline** — capture current failure signatures before changing anything
3. **Execute implementation** — make the change
4. **Re-run evals** — compare deltas. If capability improved and regression held, ship. If not, iterate.

## Task Decomposition

Apply the 15-minute unit rule:
- each unit should be independently verifiable
- each unit should have a single dominant risk
- each unit should expose a clear done condition

## Model Routing

- Haiku: classification, boilerplate transforms, narrow edits
- Sonnet: implementation and refactors
- Opus: architecture, root-cause analysis, multi-file invariants

## Session Strategy

- Continue session for closely-coupled units.
- Start fresh session after major phase transitions.
- Compact after milestone completion, not during active debugging.

## Review Focus for AI-Generated Code

Prioritize:
- invariants and edge cases
- error boundaries
- security and auth assumptions
- hidden coupling and rollout risk

Do not waste review cycles on style-only disagreements when automated format/lint already enforce style.

## Cost Discipline

Track per task:
- model
- token estimate
- retries
- wall-clock time
- success/failure

Escalate model tier only when lower tier fails with a clear reasoning gap.
