---
name: writing-plans
type: execution
category: plan
source: hermes
model: any
description: >-
  Write architectural and implementation plans before any code. Two modes:
  top-down architectural specs (components, data contracts, batched plan) and
  bottom-up implementation plans (bite-sized TDD tasks, exact file paths,
  copy-pasteable code). TRIGGER when: user asks for "a plan", before
  multi-component work, or before delegating to subagents.
pairs_with: [ops/subagent-driven-development, test/tdd-workflow, review/requesting-code-review]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Writing Architectural & Implementation Plans

Two distinct but related planning modes:
1. **Architectural Planning (Top-Down):** High-level components, data contracts, workflows. *What* to build and *how it fits together*.
2. **Implementation Planning (Bottom-Up):** Bite-sized TDD tasks for a single component. *How to build a specific piece*.

**Default to Architectural Planning first.** Only move to a detailed Implementation Plan after the architecture is approved.

---

## Part 1: Architectural Planning

**Core Principle:** A good architecture makes dependencies explicit. Plan in independently verifiable batches.

### When to Use
- When asked to "make a plan" for a new feature, script, or system
- Before writing any code for a multi-component project
- When the request involves orchestrating multiple tools or services

### The Architectural Specification Document

The primary output is a spec document (e.g., `docs/Specification.md`). It contains the "why" and detailed "what".

**Key Architectural Principles:**
1. **Config-Driven Factories:** Generic factories over single-purpose solutions. Logic reusable, specificity from config.
2. **Decouple Collection from Processing:** Standalone collector services with minimal dependencies. Main agent as processor consuming from collector. Prevents bottlenecks.
3. **Preserve the "Why":** Design rationale, rejected alternatives, and discussion log are as valuable as the final spec. Always create and interlink three artifacts:
   - The Specification (`docs/Specification.md`)
   - The Batched Plan (`PLAN.md`)
   - The Discussion Log (`docs/discussion_log.md`)

**Key Sections of the Specification:**
1. **Context & Strategic Goal** — why are we building this?
2. **Architecture Overview** — major components and data flow
3. **Component Deep-Dive** — responsibilities, inputs, outputs per component
4. **Data Contracts** — schemas for data passing between components
5. **Multi-Model/Tool Strategy** — rationale for tool/model choices per task
6. **Error Handling & Recovery** — protocols for component failures

### The Batched Implementation Plan (`PLAN.md`)

**Structure:**
- **Link to Specification:** Must start with a link to the main architectural document
- **Batches:** 3-5 independently verifiable batches
- **Per Batch:**
  - **Objective:** What this batch accomplishes
  - **Key Tasks:** Specific action checklist
  - **Deliverables:** Tangible outputs that can be tested
  - **Verification Steps:** Explicit commands to prove deliverables work. Include adversarial tests.

### Writing Process

1. **Investigate & Consolidate** — Fully investigate request and available resources. Consolidate into detailed proposal.
2. **Present for Approval** — Present full proposal. **Do not proceed without approval.**
3. **Incorporate Feedback** — Refine based on corrections.
4. **Formalize Specification** — Save as permanent spec document.
5. **Create Batched Plan** — Create separate `PLAN.md` with link to spec.

---

## Part 2: Implementation Plans (Bottom-Up)

Write plans assuming the implementer has zero codebase context. Document everything: which files to touch, complete code, testing commands, verification steps. Bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

**Core principle:** A good plan makes implementation obvious. If someone has to guess, the plan is incomplete.

### When to Use

**Always use before:**
- Implementing multi-step features
- Breaking down complex requirements
- Delegating implementation to subagents

### Bite-Sized Task Granularity

**Each task = 2-5 minutes of focused work.**

Every step is one action:
- "Write the failing test" — step
- "Run it to verify it fails" — step
- "Implement minimal code to pass" — step
- "Run tests and verify pass" — step
- "Commit" — step

**Too big:**
```markdown
### Task 1: Build authentication system
[50 lines across 5 files]
```

**Right size:**
```markdown
### Task 1: Create User model with email field
[10 lines, 1 file]
### Task 2: Add password hash field to User
[8 lines, 1 file]
### Task 3: Create password hashing utility
[15 lines, 1 file]
```

### Plan Document Structure

**Required header:**
```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence — what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
```

**Task structure:**
````markdown
### Task N: [Descriptive Name]

**Objective:** What this task accomplishes (one sentence)

**Files:**
- Create: `exact/path/to/new_file.py`
- Modify: `exact/path/to/existing.py:45-67`
- Test: `tests/path/to/test_file.py`

**Step 1: Write failing test**
```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

**Step 2: Verify failure**
Run: `pytest tests/path/test.py::test_specific_behavior -v`
Expected: FAIL

**Step 3: Write minimal implementation**
```python
def function(input):
    return expected
```

**Step 4: Verify pass**
Run: `pytest tests/path/test.py::test_specific_behavior -v`
Expected: PASS

**Step 5: Commit**
```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
````

### Writing Process

1. Understand requirements — feature spec, acceptance criteria, constraints
2. Explore codebase — understand project structure, existing patterns, test setup
3. Design approach — architecture pattern, file organization, dependencies
4. Write tasks in order: setup → core functionality (TDD each) → edge cases → integration → cleanup
5. Add complete details per task: exact file paths, complete code, exact commands with expected output
6. Review: tasks sequential? bite-sized? file paths exact? code copy-pasteable? DRY/YAGNI/TDD applied?
7. Save: `docs/plans/YYYY-MM-DD-feature-name.md`

### Principles

**DRY:** Extract validation functions, don't copy-paste.

**YAGNI:** Implement only what's needed now. No `preferences = {}` "for the future".

**TDD:** Every code-producing task includes the full RED-GREEN cycle.

**Frequent Commits:** Commit after every task.

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| "Add authentication" | "Create User model with email and password_hash fields" |
| Incomplete code in steps | Include the complete function, not "add validation function" |
| "Test it works" | "`pytest tests/test_auth.py -v`, expected: 3 passed" |
| "Create the model file" | "Create: `src/models/user.py`" |

### Execution Handoff

After saving the plan:

> "Plan saved to `docs/plans/[name].md`. Ready to execute — dispatch a subagent per task with two-stage review (spec compliance then code quality)?"

Use the `subagent-driven-development` skill for execution.

### Remember

```
Bite-sized tasks (2-5 min each)
Exact file paths
Complete code (copy-pasteable)
Exact commands with expected output
Verification steps
DRY, YAGNI, TDD
Frequent commits
```
