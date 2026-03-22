---
name: autonomous-loops
category: plan
source: everything-claude-code
model: any
tags: [automation, loops, pipelines, multi-agent, orchestration]
description: >-
  Patterns and architectures for autonomous agent loops — from simple
  sequential pipelines to RFC-driven multi-agent DAG systems.
---

# Autonomous Loops

Patterns, architectures, and reference implementations for running coding agents autonomously in loops. Covers everything from simple `claude -p` pipelines to full RFC-driven multi-agent DAG orchestration.

## When to Use

- Setting up autonomous development workflows that run without human intervention
- Choosing the right loop architecture for your problem (simple vs complex)
- Building CI/CD-style continuous development pipelines
- Running parallel agents with merge coordination
- Implementing context persistence across loop iterations
- Adding quality gates and cleanup passes to autonomous workflows

## Loop Pattern Spectrum

From simplest to most sophisticated:

| Pattern | Complexity | Best For |
|---------|-----------|----------|
| Sequential Pipeline | Low | Daily dev steps, scripted workflows |
| Infinite Agentic Loop | Medium | Parallel content generation, spec-driven work |
| Continuous PR Loop | Medium | Multi-day iterative projects with CI gates |
| De-Sloppify Pattern | Add-on | Quality cleanup after any Implementer step |
| RFC-Driven DAG | High | Large features, multi-unit parallel work with merge queue |

---

## 1. Sequential Pipeline

**The simplest loop.** Break daily development into a sequence of non-interactive calls. Each call is a focused step with a clear prompt.

```bash
#!/bin/bash
set -e

# Step 1: Implement the feature
claude -p "Read the spec in docs/auth-spec.md. Implement OAuth2 login. Write tests first (TDD)."

# Step 2: De-sloppify (cleanup pass)
claude -p "Review all files changed by the previous commit. Remove unnecessary type tests, overly defensive checks, or testing of language features. Keep real business logic tests. Run the test suite after cleanup."

# Step 3: Verify
claude -p "Run the full build, lint, type check, and test suite. Fix any failures. Do not add new features."

# Step 4: Commit
claude -p "Create a conventional commit for all staged changes."
```

### Key Principles

1. **Each step is isolated** — A fresh context window per call means no context bleed.
2. **Order matters** — Steps execute sequentially. Each builds on filesystem state from previous.
3. **Negative instructions are dangerous** — Don't say "don't test type systems." Add a separate cleanup step.
4. **Exit codes propagate** — `set -e` stops the pipeline on failure.

### Variations

**Model routing:**
```bash
claude -p --model opus "Analyze architecture and write a plan..."
claude -p "Implement according to the plan..."
claude -p --model opus "Review all changes for security issues..."
```

**Tool restrictions:**
```bash
claude -p --allowedTools "Read,Grep,Glob" "Audit codebase for vulnerabilities..."
claude -p --allowedTools "Read,Write,Edit,Bash" "Implement fixes from audit..."
```

---

## 2. Infinite Agentic Loop

**A two-prompt system** that orchestrates parallel sub-agents for specification-driven generation.

### Architecture

```
PROMPT 1 (Orchestrator)              PROMPT 2 (Sub-Agents)
┌─────────────────────┐             ┌──────────────────────┐
│ Parse spec file      │             │ Receive full context  │
│ Scan output dir      │  deploys   │ Read assigned number  │
│ Plan iteration       │────────────│ Follow spec exactly   │
│ Assign creative dirs │  N agents  │ Generate unique output │
│ Manage waves         │             │ Save to output dir    │
└─────────────────────┘             └──────────────────────┘
```

**Key Insight**: Don't rely on agents to self-differentiate. The orchestrator **assigns** each agent a specific creative direction and iteration number.

| Count | Strategy |
|-------|----------|
| 1-5 | All agents simultaneously |
| 6-20 | Batches of 5 |
| infinite | Waves of 3-5, progressive sophistication |

---

## 3. Continuous PR Loop

**A production-grade loop** that creates PRs, waits for CI, and merges automatically.

```
┌─────────────────────────────────────────────────────┐
│  1. Create branch (continuous-claude/iteration-N)   │
│  2. Run claude -p with enhanced prompt              │
│  3. (Optional) Reviewer pass — separate claude -p   │
│  4. Commit changes                                  │
│  5. Push + create PR                                │
│  6. Wait for CI checks (poll)                       │
│  7. CI failure? → Auto-fix pass                     │
│  8. Merge PR                                        │
│  9. Return to main → repeat                         │
└─────────────────────────────────────────────────────┘
```

### Cross-Iteration Context: SHARED_TASK_NOTES.md

The critical innovation: a shared notes file persists across iterations. The agent reads it at iteration start and updates it at iteration end, bridging context between independent invocations.

### Key Configuration

| Flag | Purpose |
|------|---------|
| `--max-runs N` | Stop after N iterations |
| `--max-cost $X` | Stop after spending $X |
| `--max-duration 2h` | Stop after time elapsed |
| `--worktree <name>` | Parallel execution via git worktrees |
| `--review-prompt "..."` | Add reviewer pass per iteration |

---

## 4. The De-Sloppify Pattern

**An add-on for any loop.** A dedicated cleanup step after each implementation step.

### The Problem

When you ask an LLM to implement with TDD, it takes "write tests" too literally:
- Tests that verify the type system works
- Overly defensive runtime checks the type system already guarantees
- Tests for framework behavior rather than business logic

### The Solution: Separate Pass

Instead of constraining the Implementer, let it be thorough. Then add a focused cleanup agent:

```bash
# Step 1: Implement (let it be thorough)
claude -p "Implement the feature with full TDD. Be thorough with tests."

# Step 2: De-sloppify (separate context, focused cleanup)
claude -p "Review all changes. Remove:
- Tests that verify language/framework behavior rather than business logic
- Redundant type checks the type system already enforces
- Over-defensive error handling for impossible states
- Console.log statements and commented-out code
Keep all business logic tests. Run the test suite after cleanup."
```

> Two focused agents outperform one constrained agent.

---

## 5. RFC-Driven DAG Orchestration

**The most sophisticated pattern.** Decomposes a spec into a dependency DAG, runs each unit through a tiered quality pipeline, and lands them via a merge queue.

### Architecture

```
RFC/PRD Document
       │
       ▼
  DECOMPOSITION (AI)
  Break RFC into work units with dependency DAG
       │
       ▼
  For each DAG layer (sequential, by dependency):
    Quality Pipelines (parallel per unit, each in own worktree):
      Research → Plan → Implement → Test → Review
    Merge Queue:
      Rebase onto main → Run tests → Land or evict
      Evicted units re-enter with conflict context
```

### Complexity Tiers

| Tier | Pipeline Stages |
|------|----------------|
| **trivial** | implement → test |
| **small** | implement → test → code-review |
| **medium** | research → plan → implement → test → PRD-review + code-review → review-fix |
| **large** | research → plan → implement → test → PRD-review + code-review → review-fix → final-review |

### Key Principles

1. **Deterministic execution** — Upfront decomposition locks in parallelism and ordering
2. **Separate concerns** — Each stage in a separate context window with a separate agent
3. **Author-bias elimination** — The reviewer never wrote the code it reviews
4. **Conflict recovery with context** — Full eviction context enables intelligent re-runs
5. **Tier-driven depth** — Trivial changes skip research/review; large changes get maximum scrutiny

---

## Choosing the Right Pattern

```
Is the task a single focused change?
├─ Yes → Sequential Pipeline
└─ No → Is there a written spec/RFC?
         ├─ Yes → Do you need parallel implementation?
         │        ├─ Yes → RFC-Driven DAG
         │        └─ No → Continuous PR Loop
         └─ No → Do you need many variations of the same thing?
                  ├─ Yes → Infinite Agentic Loop
                  └─ No → Sequential Pipeline + De-Sloppify
```

## Anti-Patterns

1. **Infinite loops without exit conditions** — Always have max-runs, max-cost, or completion signal.
2. **No context bridge between iterations** — Use shared notes or filesystem state to bridge context.
3. **Retrying the same failure** — Capture error context and feed it to the next attempt.
4. **Negative instructions instead of cleanup passes** — Add a separate pass that removes slop.
5. **All agents in one context window** — Separate concerns into different agent processes.
6. **Ignoring file overlap in parallel work** — If two agents might edit the same file, you need a merge strategy.
