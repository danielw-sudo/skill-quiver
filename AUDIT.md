# Skill-Quiver Audit

**Date**: 2026-03-31  
**Scope**: Full quiver — 63 skills across 13 directories  
**Context**: AIGC-portfolio build — aggregator + butler + publish workflow, three agents: Content, Asset, Finance Alert

---

## 1. Complete Skill Inventory

| # | Skill | Path | Type | Weight |
|---|-------|------|------|--------|
| 1 | blueprint | plan/blueprint/ | execution | light |
| 2 | search-first | plan/search-first/ | execution | light |
| 3 | api-design | code/patterns/api-design/ | reference | heavy |
| 4 | backend-patterns | code/patterns/backend-patterns/ | reference | heavy |
| 5 | coding-standards | code/patterns/coding-standards/ | reference | heavy |
| 6 | frontend-patterns | code/patterns/frontend-patterns/ | reference | heavy |
| 7 | postgres-patterns | code/patterns/postgres-patterns/ | reference | standard |
| 8 | frontend-dev | code/tools/frontend-dev/ | execution | heavy |
| 9 | mcp-server-patterns | code/tools/mcp-server-patterns/ | reference | light |
| 10 | database-migrations | code/tools/database-migrations/ | reference | heavy |
| 11 | harden | code/tools/harden/ | execution | heavy |
| 12 | optimize | code/tools/optimize/ | execution | heavy |
| 13 | extract | code/tools/extract/ | execution | light |
| 14 | frontend-design | design/core/frontend-design/ | reference | standard |
| 15 | teach-impeccable | design/core/teach-impeccable/ | setup | light |
| 16 | adapt | design/verbs/adapt/ | execution | standard |
| 17 | animate | design/verbs/animate/ | execution | standard |
| 18 | arrange | design/verbs/arrange/ | execution | standard |
| 19 | bolder | design/verbs/bolder/ | execution | standard |
| 20 | clarify | design/verbs/clarify/ | execution | standard |
| 21 | colorize | design/verbs/colorize/ | execution | standard |
| 22 | delight | design/verbs/delight/ | execution | heavy |
| 23 | distill | design/verbs/distill/ | execution | standard |
| 24 | audit | design/quality/audit/ | execution | standard |
| 25 | critique | design/quality/critique/ | execution | standard |
| 26 | normalize | design/quality/normalize/ | execution | light |
| 27 | onboard | design/quality/onboard/ | execution | heavy |
| 28 | overdrive | design/quality/overdrive/ | execution | standard |
| 29 | polish | design/quality/polish/ | execution | standard |
| 30 | quieter | design/quality/quieter/ | execution | standard |
| 31 | typeset | design/quality/typeset/ | execution | standard |
| 32 | tdd-workflow | test/tdd-workflow/ | execution | heavy |
| 33 | verification-loop | test/verification-loop/ | execution | standard |
| 34 | e2e-testing | test/e2e-testing/ | execution | heavy |
| 35 | ai-regression-testing | test/ai-regression-testing/ | reference | heavy |
| 36 | accessibility-auditor | test/accessibility-auditor/ | persona | heavy |
| 37 | api-tester | test/api-tester/ | persona | heavy |
| 38 | deployment-patterns | ship/deployment-patterns/ | reference | heavy |
| 39 | devops-automator | ship/devops-automator/ | persona | heavy |
| 40 | docker-patterns | ship/docker-patterns/ | reference | heavy |
| 41 | deep-research | prompt/deep-research/ | execution | standard |
| 42 | prompt-optimizer | prompt/prompt-optimizer/ | execution | heavy |
| 43 | article-writing | prompt/article-writing/ | reference | light |
| 44 | content-engine | prompt/content-engine/ | reference | light |
| 45 | cost-aware-llm-pipeline | ops/cost-aware-llm-pipeline/ | reference | standard |
| 46 | enterprise-agent-ops | ops/enterprise-agent-ops/ | reference | light |
| 47 | strategic-compact | ops/strategic-compact/ | reference | standard |
| 48 | security-review | review/security-review/ | execution | heavy |
| 49 | security-scan | review/security-scan/ | execution | standard |
| 50 | code-reviewer | review/code-reviewer/ | persona | light |
| 51 | security-engineer | review/security-engineer/ | persona | heavy |
| 52 | context-audit | meta/context-audit/ | execution | standard |
| 53 | context-budget | meta/context-budget/ | execution | standard |
| 54 | quiver-draw | meta/quiver-draw/ | execution | standard |
| 55 | skill-stocktake | meta/skill-stocktake/ | execution | standard |
| 56 | architecture-decision-records | meta/architecture-decision-records/ | reference | standard |
| 57 | codebase-onboarding | meta/codebase-onboarding/ | setup | standard |
| 58 | continuous-learning-v2 | meta/continuous-learning-v2/ | reference | heavy |
| 59 | minimax-docx | domain/minimax-docx/ | execution | heavy |
| 60 | minimax-pdf | domain/minimax-pdf/ | execution | standard |
| 61 | minimax-xlsx | domain/minimax-xlsx/ | execution | standard |
| 62 | pptx-generator | domain/pptx-generator/ | execution | standard |
| 63 | shader-dev | domain/shader-dev/ | execution | heavy |

---

## 2. Categorization — Five Buckets

### CORE — Always relevant, any coding session (7 skills)

Always-on. Should be in global context or the first skills drawn.

| Skill | Path | Rationale |
|-------|------|-----------|
| blueprint | plan/blueprint/ | Universal planning primitive — any complex multi-step work |
| search-first | plan/search-first/ | Universal due-diligence before writing code |
| quiver-draw | meta/quiver-draw/ | The beacon itself — needed to load every other skill |
| context-audit | meta/context-audit/ | Periodic hygiene — directly relevant every active workspace |
| context-budget | meta/context-budget/ | Session health — relevant any time context pressure builds |
| code-reviewer | review/code-reviewer/ | Every code change benefits from a review pass |
| strategic-compact | ops/strategic-compact/ | Session management — prevents arbitrary auto-compaction |

### PIPELINES — Orchestration / workflow definitions (6 skills)

Not interactive prompts. Define sequences, routing, and agent lifecycle.

| Skill | Path | Rationale |
|-------|------|-----------|
| skill-stocktake | meta/skill-stocktake/ | Orchestrates scan + batch-eval + consolidation scripts |
| cost-aware-llm-pipeline | ops/cost-aware-llm-pipeline/ | Defines model routing + budget + retry + cache composition |
| enterprise-agent-ops | ops/enterprise-agent-ops/ | Long-lived agent lifecycle patterns |
| continuous-learning-v2 | meta/continuous-learning-v2/ | Hook-driven observation + instinct evolution pipeline |
| devops-automator | ship/devops-automator/ | CI/CD orchestration persona |
| deployment-patterns | ship/deployment-patterns/ | Deployment workflow reference |

### WORKBENCH — Scripts or automations, not prompts (4 + 1 existing)

The value lives in code, not the prompt. Should be executed as scripts, not pasted as context.

| Skill | Path | Rationale |
|-------|------|-----------|
| strategic-compact | ops/strategic-compact/ | Core value is `suggest-compact.js` hook — prompt is just setup docs |
| continuous-learning-v2 | meta/continuous-learning-v2/ | Core value is `observe.sh` + `instinct-cli.py` — prompt is CLI docs |
| security-scan | review/security-scan/ | Wraps `npx ecc-agentshield` CLI — it's a runner, not a prompt |
| skill-stocktake | meta/skill-stocktake/ | Orchestrates `scan.sh`, `quick-diff.sh`, `save-results.sh` scripts |
| sync-manifest.sh | sync-manifest.sh | Already a script at repo root |

> **Note:** strategic-compact and continuous-learning-v2 appear in both PIPELINES and WORKBENCH intentionally — their prompt wrapper belongs in pipelines, their scripts belong in workbench.

### SITUATIONAL — Context-specific, pull from Cairn on demand (41 skills)

Do not load globally. Draw when the specific context applies.

**Design — verbs** (pull when UI work is in flight):  
adapt · animate · arrange · bolder · clarify · colorize · delight · distill

**Design — quality** (pull for UI quality passes):  
audit · critique · normalize · onboard · overdrive · polish · quieter · typeset

**Design — core** (pull when establishing visual system):  
frontend-design · teach-impeccable

**Code patterns** (pull per language/stack):  
api-design · backend-patterns · coding-standards · frontend-patterns · postgres-patterns

**Code tools** (pull per task):  
frontend-dev · mcp-server-patterns · database-migrations · harden · optimize · extract

**Test** (pull per test activity):  
tdd-workflow · verification-loop · e2e-testing · ai-regression-testing · accessibility-auditor · api-tester

**Ship** (pull per deployment context):  
docker-patterns

**Prompt / content** (pull for writing tasks):  
deep-research · prompt-optimizer · article-writing · content-engine

**Review** (pull for security work):  
security-review · security-engineer

**Meta** (pull at project start or decision points):  
architecture-decision-records · codebase-onboarding

**Domain** (pull for file-type specific tasks):  
minimax-docx · minimax-pdf · minimax-xlsx · pptx-generator · shader-dev

### ARCHIVED — Redundant, superseded, or unused (2 skills)

| Skill | Path | Reason |
|-------|------|--------|
| security-engineer | review/security-engineer/ | 11KB persona that duplicates security-review (also heavy) and code-reviewer. Overlap is near-total: threat modeling, STRIDE, OWASP Top 10, secure code patterns. No unique execution logic not covered by security-review + code-reviewer combined. |
| enterprise-agent-ops | ops/enterprise-agent-ops/ | 1,264 bytes — stub level. Contains no actionable patterns beyond 5 bullet points. Superseded by continuous-learning-v2 (lifecycle management) + cost-aware-llm-pipeline (budget, retry). If genuinely needed, content should be absorbed into cost-aware-llm-pipeline. |

---

## 3. Core Skill Prompt Quality Ratings

### SHARP — Clear trigger, clear output, no bloat

| Skill | Evidence |
|-------|----------|
| **blueprint** | Explicit TRIGGER / DO NOT TRIGGER guards in frontmatter. Output is a file at `plans/`. Five-phase pipeline is precise. Anti-pattern catalog prevents scope creep. |
| **context-audit** | Five enumerated when-to-use conditions. Produces a structured report table. Four named phases with clear phase contracts. Asks before acting. |
| **context-budget** | Clear token estimation method (`words × 1.3`). Produces a dashboard-style report with savings quantified. Verbose mode is opt-in. |
| **search-first** | Decision matrix is crisp (Adopt / Extend / Compose / Build). Quick-mode inline flow takes 5 steps. Anti-patterns are specific. |

### MEDIOCRE — Compensating for missing orchestration

| Skill | Evidence |
|-------|----------|
| **quiver-draw** | Logic is correct but the path `D:\cc\skill-quiver` is hardcoded Windows path — breaks on every other machine. The skill compensates for the absence of a config file or env var. Should be `$QUIVER_PATH` or relative to a settings key. |
| **code-reviewer** | Trigger condition is absent from frontmatter — no TRIGGER clause. The emoji-heavy checklist (🔴/🟡/💭) is fine stylistically but the persona framing (`## 🧠 Your Identity & Memory`) pads the file without adding execution value. Doing work a clear system prompt would do better. |
| **strategic-compact** | Mixes three concerns: hook setup docs, a compaction decision guide, and token optimization patterns. The latter two are good; the first belongs in workbench. A reader drawing this skill gets ~40% setup instructions they can't act on without installing the script first. |

### NEEDS REWRITE — Vague or overlapping with another skill

| Skill | Evidence |
|-------|----------|
| **skill-stocktake** | Trigger is missing from frontmatter (no `name:` field either — frontmatter is headless). Depends on three external bash scripts (`scan.sh`, `quick-diff.sh`, `save-results.sh`) that are not in the quiver and whose paths are assumed. The skill compensates for missing tooling by describing what those scripts should do. If the scripts exist, this should be a 20-line wrapper, not a 200-line spec. |

---

## 4. The Load-Bearing 15 — AIGC-Portfolio Workflow

Aggregator + butler + publish workflow. Three agents: **Content**, **Asset**, **Finance Alert**.

| # | Skill | Serves | Role |
|---|-------|--------|------|
| 1 | prompt/deep-research | Content Agent | Research ingestion — pulls multi-source cited inputs |
| 2 | prompt/content-engine | Content Agent | Platform-native drafting (X, LinkedIn, newsletter, YouTube) |
| 3 | prompt/article-writing | Content Agent | Long-form drafting with voice capture + quality gate |
| 4 | prompt/prompt-optimizer | Content Agent | Prompt quality for pipeline prompts passed to sub-agents |
| 5 | ops/cost-aware-llm-pipeline | Aggregator | Model routing (Haiku vs Sonnet), budget limits, retry, caching |
| 6 | domain/minimax-pdf | Asset Agent | PDF ingestion and generation |
| 7 | domain/minimax-docx | Asset Agent | DOCX ingestion and generation |
| 8 | domain/minimax-xlsx | Asset Agent + Finance Alert | Spreadsheet reads — financial data, budget tables |
| 9 | domain/pptx-generator | Asset Agent | Presentation generation for portfolio deliverables |
| 10 | ops/enterprise-agent-ops | Aggregator | Long-lived agent lifecycle, incident pattern, metrics to track |
| 11 | plan/blueprint | Aggregator / Butler | Multi-session construction planning for build phases |
| 12 | meta/quiver-draw | Aggregator / Butler | On-demand skill dispatch — the beacon mechanism |
| 13 | ship/deployment-patterns | Publish workflow | CI/CD, health checks, rollback for the publish pipeline |
| 14 | ops/strategic-compact | Aggregator | Context management across long multi-agent sessions |
| 15 | meta/context-budget | Aggregator | Context hygiene — tracks token overhead per loaded agent/skill |

**Coverage:**
- Content Agent: #1–4
- Asset Agent: #6–9 (+#8 shared)
- Finance Alert: #8, #10, #5 (budget alerts)
- Aggregator layer: #5, #10, #11, #12, #14, #15
- Publish: #13

**Gap identified:** There is no existing skill for the Finance Alert agent's alerting logic itself (threshold detection, notification dispatch). That is a Workbench script gap, not a skill gap — a `finance-alert.py` or similar automation should be created in workbench, not a prompt.

---

## 5. Skills That Should Become Workbench Scripts

These are prompts whose real value is a deterministic script, not language model reasoning.

| Skill | Current Form | What It Should Be | Migration Note |
|-------|-------------|-------------------|----------------|
| **ops/strategic-compact** | SKILL.md with hook setup + compaction guide | `suggest-compact.js` in workbench + thin reference stub | The JS hook is the product. Keep a 20-line SKILL.md pointing to the script. Remove the token-optimization appendix (duplicates context-budget). |
| **meta/continuous-learning-v2** | SKILL.md as CLI docs for `observe.sh` + `instinct-cli.py` | Both scripts in workbench + thin SKILL.md as setup guide | The instinct model is a data pipeline, not a prompt. The SKILL.md is 300+ lines of CLI reference that belongs in a README next to the scripts. |
| **review/security-scan** | SKILL.md wrapping `npx ecc-agentshield` | `security-scan.sh` in workbench + install check | All execution paths are CLI invocations. The SKILL.md contributes zero reasoning — it's a cheat sheet for a tool. Move to workbench, keep a one-liner beacon. |
| **meta/skill-stocktake** | SKILL.md specifying three external bash scripts | The bash scripts themselves in workbench | The skill describes scripts that should exist but may not. Invert: write the scripts, reduce the SKILL.md to a short trigger wrapper. |

---

## Summary

| Bucket | Count |
|--------|-------|
| core | 7 |
| pipelines | 6 |
| workbench | 4 (+ sync-manifest.sh already exists) |
| situational | 41 |
| archived | 2 |
| **Total** | **63** |

**Highest-priority actions:**
1. Fix `quiver-draw` hardcoded path → `$QUIVER_PATH` env var
2. Archive `security-engineer` (redundant with security-review + code-reviewer)
3. Absorb or delete `enterprise-agent-ops` stub into cost-aware-llm-pipeline
4. Migrate `strategic-compact`, `continuous-learning-v2`, `security-scan` scripts to workbench
5. Add trigger frontmatter to `code-reviewer` and `skill-stocktake`
6. Create missing `finance-alert` Workbench automation for AIGC-portfolio Finance Alert agent
