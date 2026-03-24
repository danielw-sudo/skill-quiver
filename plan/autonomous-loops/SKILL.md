---
name: autonomous-loops
type: reference
category: plan
source: everything-claude-code
model: any
tags: [automation, loops, pipelines, multi-agent, orchestration]
description: >-
  Patterns for autonomous agent loops — from simple sequential pipelines
  to RFC-driven multi-agent DAG systems. Reference for choosing and
  implementing the right loop architecture.
---

# Autonomous Loops

Reference for running coding agents autonomously in loops. Choose the right pattern for your problem.

## Loop Pattern Spectrum

| Pattern | Complexity | Best For |
|---------|-----------|----------|
| Sequential Pipeline | Low | Daily dev steps, scripted workflows |
| Infinite Agentic Loop | Medium | Parallel content generation, spec-driven work |
| Continuous PR Loop | Medium | Multi-day iterative projects with CI gates |
| De-Sloppify Pattern | Add-on | Quality cleanup after any implementation step |
| RFC-Driven DAG | High | Large features, multi-unit parallel work with merge queue |

## 1. Sequential Pipeline

Break work into a sequence of non-interactive `claude -p` calls. Each step has a focused prompt and fresh context.

```bash
claude -p "Implement feature per docs/spec.md. Write tests first (TDD)."
claude -p "Review changes. Remove slop: type tests, over-defensive checks. Run test suite."
claude -p "Run full build, lint, type check, tests. Fix failures. No new features."
```

**Model routing**: Use `--model opus` for architecture/review, default for implementation.
**Tool restrictions**: Use `--allowedTools` to constrain each step.

## 2. Infinite Agentic Loop

Orchestrator + parallel sub-agents for spec-driven generation. The orchestrator assigns each agent a specific creative direction — don't rely on agents to self-differentiate.

| Count | Strategy |
|-------|----------|
| 1-5 | All simultaneously |
| 6-20 | Batches of 5 |
| Infinite | Waves of 3-5, progressive sophistication |

## 3. Continuous PR Loop

Creates branches, runs `claude -p`, pushes PRs, waits for CI, auto-merges.

Key: **SHARED_TASK_NOTES.md** persists context across iterations.

| Flag | Purpose |
|------|---------|
| `--max-runs N` | Stop after N iterations |
| `--max-cost $X` | Stop after spending $X |
| `--max-duration 2h` | Stop after time elapsed |
| `--worktree <name>` | Parallel execution via git worktrees |

## 4. De-Sloppify Pattern

Two focused agents outperform one constrained agent. Let the implementer be thorough, then add a cleanup pass:

1. **Implement** — full TDD, be thorough
2. **De-sloppify** — remove tests of language/framework behavior, redundant type checks, over-defensive error handling, dead code. Run test suite after.

## 5. RFC-Driven DAG

Decompose a spec into a dependency DAG. Each unit goes through a tiered quality pipeline, then lands via merge queue.

| Tier | Pipeline |
|------|----------|
| Trivial | implement → test |
| Small | implement → test → code-review |
| Medium | research → plan → implement → test → review → fix |
| Large | research → plan → implement → test → review → fix → final-review |

**Principles**: Deterministic execution, separate concerns per context window, author-bias elimination (reviewer never wrote the code), conflict recovery with context.

## Choosing the Right Pattern

- Single focused change → **Sequential Pipeline**
- Written spec + parallel work → **RFC-Driven DAG**
- Written spec + serial work → **Continuous PR Loop**
- Many variations of same thing → **Infinite Agentic Loop**
- Any of the above + quality issues → **Add De-Sloppify**

## Anti-Patterns

1. **No exit conditions** — always set max-runs, max-cost, or completion signal
2. **No context bridge** — use shared notes or filesystem state between iterations
3. **Retrying same failure** — capture error context and feed it to next attempt
4. **Negative instructions** — add a separate cleanup pass instead
5. **All agents in one context** — separate concerns into different processes
6. **Ignoring file overlap** — parallel agents editing the same file need a merge strategy
