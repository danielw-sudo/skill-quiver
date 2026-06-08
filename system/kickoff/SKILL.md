---
name: kickoff
type: execution
category: system
source: original
model: any
description: >-
  Session bootstrapper. Reads the consolidated handoff, README, development logs, and active baseline to establish session awareness and recommend next tasks. TRIGGER when: user says "/kickoff", "kickoff", "start session", or "boot session".
---

# /kickoff — Session Bootstrapper

Bootstrap the session context, report status, and verify active plans.

## Execution Steps

### 1. Read Project Files
Read the following files from the workspace root:
- `.antigravity/handoff.md` (active session handoff)
- `README.md` (project overview and details)
- `DEVLOG.md` (recent development logs and changes)
- `baseline.json` (active models, tools, and MCP servers)

### 2. Verify Vault
If a `vault/` directory exists:
- Check for custom vault skills via local directory listing or the `quiver-vault list` command output.

### 3. Establish Awareness
Consolidate the read information to determine:
- **Core Mission**: The high-level goal of the project.
- **System Status**: The latest changes that shipped and the state of the active baseline.
- **Active Plan**: Immediate tasks that need completion.

### 4. Kickoff Report
Present a structured kickoff report to the user:

```markdown
# Session Kickoff

## 1. Context & Mission
[Summarize the project mission and high-level goal]

## 2. Latest Accomplishments & Status
- **Latest Commit**: [State of git working tree / recent commit if available]
- **What Shipped**: [Brief summary of latest accomplishments from DEVLOG.md and handoff.md]
- **Active Environment**: Models: [Active models], MCPs: [Active MCPs], Tools: [Active tools]

## 3. Recommended Tasks
[List the next concrete steps from the active plan and prioritize them, asking the user which one they would like to tackle first]
```
