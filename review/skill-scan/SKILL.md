---
name: skill-scan
type: execution
category: review
source: original
model: any
description: >-
  Security scan a SKILL.md using NVIDIA SkillSpector before curation or
  promotion. Detects 64 vulnerability patterns across 16 categories including
  prompt injection, data exfiltration, harmful content, MCP poisoning.
  TRIGGER when: user says "/skill-scan [path]", "scan this skill", or
  "is this skill safe". Also called automatically by /curate as Step 0.
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# /skill-scan — Skill Security Scanner

Runs NVIDIA SkillSpector against a SKILL.md to detect malicious patterns before promotion.

## Step 1: Locate

Accept a path, skill name, or URL. Resolve to an absolute path if local.

If no argument, ask: "Which skill to scan? Provide path, skill name, or GitHub URL."

## Step 2: Run Scanner

```bash
$QUIVER_PATH/bin/skillspector-scan <target>
```

With `ANTHROPIC_API_KEY` set: runs full LLM-enhanced scan (static + semantic).
Without key: runs static analysis only (still catches 64 pattern categories).

To get JSON output (for programmatic use or audit logging):
```bash
$QUIVER_PATH/bin/skillspector-scan <target> --format json --output /tmp/scan-report.json
```

## Step 3: Interpret Result

| Score | Severity | Action |
|-------|----------|--------|
| 0–25 | LOW / SAFE | Proceed with curation |
| 26–50 | MEDIUM / CAUTION | Review findings, fix before promoting |
| 51–74 | HIGH | Do not promote — requires manual remediation |
| 75–100 | CRITICAL | Reject immediately, log to _rejected/ |

**Always report:**
- Risk score and severity label
- Each issue: category, location (file:line), confidence %, remediation hint
- Whether LLM analysis was active or static-only

## Step 4: Decision

**Score ≤ 25 (SAFE):**
Report clean result. If called from /curate, continue to scoring step.

**Score 26–50 (CAUTION):**
Show findings. Ask: "Fix issues then re-scan, or reject?"
If user wants to fix: show the flagged lines, suggest remediation, let user edit, then re-scan.

**Score > 50 (HIGH/CRITICAL):**
```
REJECTED (security): [skill-name] — Score [N]/100, [severity]
Issues: [list]
```
Log to `resources/_rejected/log.md`:
```
[date] [skill-name] REJECTED:SECURITY SCORE:[N] ISSUES:[categories]
```
Do NOT proceed to /curate scoring.

## What SkillSpector Detects

Static patterns (always active):
- Prompt injection / jailbreak triggers
- Data exfiltration (URLs, webhooks, encoded payloads)
- Privilege escalation attempts
- Harmful content injection (like the cyanide-in-recipe pattern)
- Trigger abuse (hidden activation phrases)
- Supply chain risks (external package installs in skill body)
- MCP tool poisoning / least-privilege violations

LLM-enhanced (requires API key):
- Semantic intent analysis
- Novel phrasing variants of known attacks
- Scope creep detection
- System prompt leakage

## Constraints
- Never skip scan for skills from unknown/untrusted sources
- Skills from curated known repos (greensock/gsap-skills, pbakaus/impeccable, affaan-m/everything-claude-code) can use static-only for speed
- Always log scan results for audit trail
- Score thresholds are guidelines — CRITICAL findings always block promotion regardless of score
