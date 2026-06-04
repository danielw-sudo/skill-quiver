---
name: systematic-debugging
type: execution
category: code
source: hermes
model: any
description: >-
  4-phase root cause debugging: understand bugs before fixing. Enforces the iron
  law — no fixes without root cause investigation first. Covers test failures,
  production bugs, performance issues, and silent background process failures.
  TRIGGER when: any technical issue, test failure, unexpected behavior, or when
  multiple fix attempts have already failed.
pairs_with: [test/tdd-workflow, plan/writing-plans, ops/subagent-driven-development]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## When to Use

Use for ANY technical issue: test failures, production bugs, unexpected behavior, performance problems, build failures, integration issues.

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

**Don't skip when:**
- Issue seems simple (simple bugs have root causes too)
- You're in a hurry (systematic is faster than thrashing)
- Someone wants it fixed NOW

## The Four Phases

Complete each phase before proceeding to the next.

---

## Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

### 1. Read Error Messages Carefully

- Don't skip past errors or warnings — they often contain the exact solution
- Read stack traces completely
- Note line numbers, file paths, error codes

### 2. Reproduce Consistently

- Can you trigger it reliably?
- What are the exact steps?
- Does it happen every time?
- If not reproducible → gather more data, don't guess

```bash
# Run specific failing test
pytest tests/test_module.py::test_name -v --tb=long
```

### 3. Check Recent Changes

```bash
git log --oneline -10
git diff
git log -p --follow src/problematic_file.py | head -100
```

### 4. Gather Evidence in Multi-Component Systems

When the system has multiple components (API → service → database):

**BEFORE proposing fixes, add diagnostic instrumentation:**
- Log what data enters each component boundary
- Log what data exits each component boundary
- Verify environment/config propagation
- Check state at each layer

Run once to gather evidence showing WHERE it breaks. THEN analyze which component is failing.

### 5. Trace Data Flow

When error is deep in the call stack:
- Where does the bad value originate?
- What called this function with the bad value?
- Keep tracing upstream until you find the source
- Fix at the source, not at the symptom

### Phase 1 Completion Checklist

- [ ] Error messages fully read and understood
- [ ] Issue reproduced consistently
- [ ] Recent changes identified and reviewed
- [ ] Evidence gathered (logs, state, data flow)
- [ ] Problem isolated to specific component/code
- [ ] Root cause hypothesis formed

**STOP.** Do not proceed to Phase 2 until you understand WHY it's happening.

---

## Phase 2: Pattern Analysis

### 1. Find Working Examples

Locate similar working code in the same codebase. What works that's similar to what's broken?

### 2. Compare Against References

Read reference implementations **completely**. Don't skim — read every line.

### 3. Identify Differences

List every difference between working and broken, however small. Don't assume "that can't matter."

### 4. Understand Dependencies

What other components, config, environment does this need? What assumptions does it make?

---

## Phase 3: Hypothesis and Testing

### 1. Form a Single Hypothesis

State clearly: "I think X is the root cause because Y." Write it down. Be specific.

### 2. Test Minimally

Make the SMALLEST possible change to test the hypothesis. One variable at a time. Don't fix multiple things at once.

### 3. Verify Before Continuing

- Did it work? → Phase 4
- Didn't work? → Form NEW hypothesis
- DON'T add more fixes on top

### 4. When You Don't Know

Say "I don't understand X." Don't pretend. Ask the user or research more.

---

## Phase 4: Implementation

### 1. Create Failing Test Case

Simplest possible reproduction. Automated test if possible. MUST have before fixing.

### 2. Implement Single Fix

Address the root cause. ONE change at a time. No "while I'm here" improvements.

### 3. Verify Fix

```bash
pytest tests/test_module.py::test_regression -v
pytest tests/ -q  # no regressions
```

### 4. Rule of Three

- If < 3 fixes tried: Return to Phase 1 with new information
- **If ≥ 3 fixes tried: STOP — question the architecture**

### 5. If 3+ Fixes Failed: Question Architecture

Pattern indicating architectural problem:
- Each fix reveals new shared state/coupling in a different place
- Fixes require "massive refactoring"
- Each fix creates new symptoms elsewhere

**STOP and discuss with the user before attempting more fixes.**

---

## Red Flags — STOP and Return to Phase 1

If you catch yourself thinking any of these:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "It's probably X, let me fix that"
- "Here are the main problems: [lists fixes without investigation]"
- Proposing solutions before tracing data flow
- "One more fix attempt" (when already tried 2+)

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes. Process is fast for simple bugs. |
| "Emergency, no time" | Systematic is FASTER than guess-and-check thrashing. |
| "Just try this first" | First fix sets the pattern. Do it right from the start. |
| "I'll write test after confirming fix" | Untested fixes don't stick. Test first proves it. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Causes new bugs. |
| "One more fix attempt" | 3+ failures = architectural problem. Question the pattern. |

## Special Case: Silent Background Processes

When a background process fails silently (no output):

1. **Confirm state:** Check if process is running or exited
2. **Add file-based logging:** Add `logging.basicConfig(filename='service.log')` at startup
3. **Instrument key events:** Log startup, shutdown, each function boundary
4. **Relaunch and read log**
5. **Analyze:** Empty log = startup failure. Partial log = error after last log entry.

## Special Case: Hanging CLI Tools

1. **Check the wrapper script first** — read it before running CLI directly
2. **Understand the dependency chain** — many CLIs start a background daemon on first invocation
3. **Check for daemon/lock files:** `ls ~/.claude/` or similar
4. **Test minimal path:** Use `--bare` or `--no-daemon` flag if available
5. **Report bottleneck in one sentence**, don't run 10 more workarounds

## Special Case: Python Dependency Conflicts

When you see "A module compiled with NumPy 1.x cannot run in NumPy 2.x":

```bash
python3 -m venv .venv
cat > requirements.txt << 'EOF'
numpy<2.0
scikit-learn>=1.3
scipy>=1.11
EOF
./.venv/bin/pip install -r requirements.txt
./.venv/bin/python3 your_script.py
```

Never use `--break-system-packages`.

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, trace data flow | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare, identify differences | Know what's different |
| **3. Hypothesis** | Form theory, test minimally, one variable at a time | Confirmed or new hypothesis |
| **4. Implementation** | Create regression test, fix root cause, verify | Bug resolved, all tests pass |

**No shortcuts. No guessing. Systematic always wins.**
