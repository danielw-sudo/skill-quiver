---
name: spike
type: execution
category: plan
source: hermes
model: any
description: >-
  Throwaway experiments to validate an idea before committing to a build.
  Validates feasibility, compares approaches, surfaces unknowns that research
  alone won't answer. Spikes are disposable by design. TRIGGER when: user says
  "let me try this", "spike this out", "is this even possible?", "compare A vs B",
  or "before I commit to Y".
pairs_with: [plan/writing-plans, ops/subagent-driven-development]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Spike

Use when the user wants to feel out an idea before committing to a real build — validating feasibility, comparing approaches, or surfacing unknowns. Spikes are disposable by design. Throw them away once they've paid their debt.

## When NOT to Use

- Answer is knowable from docs or reading code — just research, don't build
- Work is on the production path — use `writing-plans` instead
- Idea is already validated — jump straight to implementation

## Core Method

Every spike follows this loop:

```
decompose → research → build → verdict
   ↑__________________________________↓
              iterate on findings
```

### 1. Decompose

Break the user's idea into **2-5 independent feasibility questions**. Each question is one spike.

| # | Spike | Validates (Given/When/Then) | Risk |
|---|-------|----------------------------|------|
| 001 | websocket-streaming | Given WS connection, when LLM streams tokens, then client receives chunks <100ms | High |
| 002a | pdf-parse-pdfjs | Given multi-page PDF, when parsed with pdfjs, then structured text extractable | Medium |
| 002b | pdf-parse-camelot | Given multi-page PDF, when parsed with camelot, then structured text extractable | Medium |

**Spike types:**
- **standard** — one approach, one question
- **comparison** — same question, different approaches (shared number, letter suffix `a`/`b`/`c`)

**Order by risk.** The spike most likely to kill the idea runs first. No point prototyping easy parts if the hard part doesn't work.

**Skip decomposition** only if the user already knows exactly what they want to spike.

### 2. Align (for multi-spike ideas)

Present the spike table. Ask: "Build all in this order, or adjust?" Let the user drop, reorder, or re-frame before writing any code.

### 3. Research (per spike)

Per spike:
1. **Brief it.** 2-3 sentences: what this spike is, why it matters, key risk.
2. **Surface competing approaches:**

   | Approach | Tool/Library | Pros | Cons | Status |
   |----------|-------------|------|------|--------|
   | ... | ... | ... | ... | maintained/abandoned/beta |

3. **Pick one.** State why. If 2+ are credible, build quick variants within the spike.
4. **Skip research** for pure logic with no external dependencies.

Research tools:
- Web search for candidates and library comparison
- Read official docs and examples
- Check what's already installed: `pip show <lib>` or `npm list <pkg>`

### 4. Build

One directory per spike. Standalone:

```
spikes/
├── 001-websocket-streaming/
│   ├── README.md
│   └── main.py
├── 002a-pdf-parse-pdfjs/
│   ├── README.md
│   └── parse.js
└── 002b-pdf-parse-camelot/
    ├── README.md
    └── parse.py
```

**Bias toward something the user can interact with.** In order of preference:
1. Runnable CLI that takes input and prints observable output
2. Minimal HTML page demonstrating the behavior
3. Small web server with one endpoint
4. Unit test that exercises the question with recognizable assertions

**Depth over speed.** Never declare "it works" after one happy-path run. Test edge cases. Follow surprising findings. Verdict is only trustworthy when investigation was honest.

**Avoid unless required:** complex package management, bundlers, Docker, env files, config systems. Hardcode everything — it's a spike.

**Parallel comparison spikes:** When two approaches need real engineering in parallel, run them concurrently (two terminals or separate sessions) and compare results.

### 5. Verdict

Each spike's `README.md` closes with:

```markdown
## Verdict: VALIDATED | PARTIAL | INVALIDATED

### What worked
- ...

### What didn't
- ...

### Surprises
- ...

### Recommendation for the real build
- ...
```

**VALIDATED** — core question answered yes, with evidence.
**PARTIAL** — works under constraints X, Y, Z — document them.
**INVALIDATED** — doesn't work, for this reason. This is a successful spike.

## Comparison Spikes

When two approaches answer the same question (002a / 002b), do a head-to-head:

```markdown
## Head-to-head: pdfjs vs camelot

| Dimension | pdfjs (002a) | camelot (002b) |
|-----------|--------------|----------------|
| Extraction quality | 9/10 structured | 7/10 table-only |
| Setup complexity | npm install, 1 line | pip + ghostscript |
| Perf on 100-page PDF | 3s | 18s |

**Winner:** pdfjs for our use case.
```

## Frontier Mode

If spikes exist and user asks "what should I spike next?", scan directories and look for:
- **Integration risks** — two validated spikes touching the same resource, tested independently
- **Data handoffs** — spike A's output assumed compatible with spike B's input, never proven
- **Gaps in the vision** — capabilities assumed but unproven

Propose 2-4 candidates as Given/When/Then. Let the user pick.

## Output

- Create `spikes/` in repo root (or `.planning/spikes/` if using GSD conventions)
- One dir per spike: `NNN-descriptive-name/`
- `README.md` per spike: question, approach, results, verdict
- Keep code throwaway — a spike that takes 2 days to "clean up" was a bad spike

*Adapted from the GSD (Get Shit Done) project's `/gsd-spike` workflow — MIT © 2025 Lex Christopherson.*
