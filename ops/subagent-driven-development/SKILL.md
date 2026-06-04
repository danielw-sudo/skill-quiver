---
name: subagent-driven-development
type: execution
category: ops
source: hermes
model: any
description: >-
  Execute implementation plans by dispatching fresh subagents per task with
  two-stage review (spec compliance then code quality). No agent verifies its
  own work. Fresh context per task prevents state pollution. TRIGGER when: you
  have an implementation plan ready and want to execute it task-by-task with
  systematic quality gates.
pairs_with: [plan/writing-plans, review/requesting-code-review, test/tdd-workflow]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Subagent-Driven Development

Execute implementation plans by dispatching fresh subagents per task with systematic two-stage review.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration.

> Note: Implementation examples below use Hermes `delegate_task` API. Adapt dispatch calls to your tool's subagent mechanism (Claude Code Task tool, Codex CLI, etc.).

## When to Use

- You have an implementation plan (from `writing-plans` or user requirements)
- Tasks are mostly independent
- Quality and spec compliance are important
- You want automated review between tasks

**vs. manual execution:**
- Fresh context per task — no confusion from accumulated state
- Automated review catches issues early
- Consistent quality checks across all tasks

## The Process

### 1. Parse the Plan

Read the plan file upfront. Extract ALL tasks with their full text. Create a task list before dispatching anything.

**Key:** Read the plan ONCE. Don't make subagents read it — provide the full task text directly in their context.

### 2. Per-Task Workflow (repeat for every task)

#### Step 1: Dispatch Implementer

Provide complete, self-contained context:

```
TASK: [full task text from plan]
CONTEXT: [project structure, tech stack, relevant files]
FOLLOW TDD:
  1. Write failing test
  2. Run to verify failure
  3. Write minimal implementation
  4. Run to verify pass
  5. Commit: git add [files] && git commit -m "feat: ..."
```

#### Step 2: Spec Compliance Review

After implementer completes, dispatch a fresh reviewer:

```
ORIGINAL SPEC:
  - [exact requirements from plan]

CHECK:
  - [ ] All requirements implemented?
  - [ ] File paths match spec?
  - [ ] Nothing extra added (no scope creep)?

OUTPUT: PASS or list of specific spec gaps.
```

If gaps found → dispatch a fix agent → re-run spec review. Continue only when PASS.

#### Step 3: Code Quality Review

After spec passes, dispatch a quality reviewer:

```
FILES TO REVIEW: [list]

CHECK:
  - [ ] Follows project conventions?
  - [ ] Proper error handling?
  - [ ] Clear variable/function names?
  - [ ] Adequate test coverage?
  - [ ] Security issues?

OUTPUT: APPROVED or REQUEST_CHANGES with specific issues.
```

If issues found → fix → review again. Continue only when APPROVED.

#### Step 4: Mark Task Complete

Update task list, proceed to next.

### 3. Final Review

After ALL tasks complete, dispatch a final integration reviewer:

```
All tasks from the plan are complete. Review full implementation:
- Do all components work together?
- Any inconsistencies between tasks?
- All tests passing?
- Ready for merge?
```

### 4. Final Verification

```bash
# Full test suite
pytest tests/ -q  # or equivalent

# Review all changes
git diff --stat
```

## Task Granularity

**Each task = 2-5 minutes of focused work.**

Too big: "Implement user authentication system"

Right size:
- "Create User model with email and password fields"
- "Add password hashing function"
- "Create login endpoint"
- "Add JWT token generation"

## Order That Matters

1. **Spec compliance FIRST**
2. **Code quality SECOND**

Never start quality review before spec compliance is PASS.

## Red Flags — Never Do These

- Start implementation without a plan
- Skip either review stage
- Proceed with unfixed critical/important issues
- Dispatch multiple implementers for tasks touching the same files
- Accept "close enough" on spec compliance
- Let implementer self-review replace actual review (both needed)

## Efficiency Notes

**Why fresh subagent per task:** Prevents context pollution from accumulated state. Each gets clean, focused context.

**Why two-stage review:** Spec catches under/over-building early. Quality ensures it's well-built. Cheaper to catch early than debug compounded problems.

## Integration

**With writing-plans:** This executes plans that `writing-plans` creates.

**With test-driven-development:** Include TDD instructions in every implementer context.

**With requesting-code-review:** The two-stage review IS the code review. For final integration, use `requesting-code-review` dimensions.
