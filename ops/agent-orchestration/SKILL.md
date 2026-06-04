---
name: agent-orchestration
type: execution
category: ops
source: hermes
model: any
description: >-
  Orchestrate multiple AI agents on the same host. Two modes: dispatch (one-shot
  tasks routed to specialist agents via CLI runners) and peer agent management
  (persistent processes with file-based inbox/outbox communication). Includes
  zombie hygiene, process monitoring, and parallel dispatch patterns. TRIGGER
  when: user asks to delegate to another agent, run parallel AI tasks, or manage
  long-running agent processes.
pairs_with: [ops/subagent-driven-development, plan/workflow-architect]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Agent Orchestration

Orchestrate other AI agents running on the same host. Two modes:

| Mode | Lifetime | Communication |
|------|----------|---------------|
| **Dispatch** | One-shot (spawn, run, exit) | CLI args via runner scripts |
| **Peer Agent** | Persistent (days/weeks) | File-based inbox/outbox, PTY |

> Note: Implementation examples reference Hermes-specific runner scripts (`claude-task.sh`, `gemini-task.sh`). Adapt paths and scripts to your environment.

---

## 1. Dispatch Pattern (One-Shot Tasks)

Route a task to a specialist agent runner and collect results.

### Hub-and-Spoke Architecture

```
Orchestrator (you)
  ├── coding/engineering agent  → code, ops, pipeline fixes
  ├── writing/research agent   → drafting, content, research
  └── specialist agents        → diagrams, images, specific domains
```

**Hub-and-Spoke:** One agent is the orchestration hub. Specialist agents are spokes. Never swap roles.

### Dispatch Rules

1. **Route by Domain, Not Availability** — content → writing agent; code/infra → engineering agent; never swap
2. **Trigger, Don't Invent** — pass the user's task verbatim. Do NOT add extra steps or elaboration. "Pass the prompt, stay out of their lanes."
3. **Subscription Model** — agents run on subscription/session, not per-request API. Model switching is managed by CLI config.
4. **Route by Auth Capability** — different agents have different auth scopes. If a task requires GitHub auth (clone private repos, push code), route to an agent that has it.

### Parallel Dispatch (Same Task to Multiple Agents)

When explicitly asked to send the same task to 2+ agents:

1. **Inject unique output filenames:** `consolidation-audit-agent1.md` and `consolidation-audit-agent2.md`
2. **Tell both agents about the parallel run** — include in prompt
3. **Dispatch concurrently** — both as background processes
4. **Report outcomes together** when both finish
5. **Do NOT coordinate intermediate steps** — they run independently

**When NOT to parallel-dispatch:**
- Tasks with side effects (deployments, DB writes, file mutations) — one write actor only
- User didn't ask for parallel
- Agents would read from same mutable file simultaneously

### What NOT to Do

- Assume you know the downstream pipeline better than the owning agent
- "Improve" dispatch by adding your own steps
- Mix agent roles (writing agent doing code fixes)
- Modify the target agent's workspace scripts as part of dispatch
- Keep persistent sessions — spawn on demand, exit on completion
- Answer on behalf of the dispatched agent

---

## 2. Peer Agent Management (Persistent Processes)

Peer agents are long-running AI processes on the same host. Unlike dispatched agents, they need file-based communication bridges.

### Communication Bridge Pattern

File-based inbox/outbox for reliable inter-agent messaging:

```
Agent A writes → /path/to/inbox.json → Agent B reads
Agent B writes → /path/to/outbox.json → Agent A reads
```

Direct writes are immediate. File-based sync may lag behind real-time.

### Process Lifecycle

**Survival patterns:**
- **systemd user service** — survives reboots AND SSH disconnects (recommended)
- **tmux/screen** — survives SSH drops but not reboots

**Quota Handling (LLM APIs):**
- On 429 (rate limit): wait for quota window reset (check error message for reset time)
- Model switching: use CLI's model command if supported
- Separate API keys = independent quota pools

### Direct PTY Communication

For agents running in a terminal:
```bash
# tmux sessions
tmux send-keys -t session_name "your message" Enter

# Direct pty (when agent is on pts/N)
echo "your message" | sudo tee /dev/pts/N
```

---

## 3. Zombie Hygiene (Critical)

Before dispatching or starting new sessions, check for stale processes:

```bash
# Check for lingering agent processes
pgrep -af "claude\|gemini\|codex\|opencode" | grep -v pgrep

# Kill stale processes
pkill -f "claude-task" 2>/dev/null
pkill -f "gemini" 2>/dev/null
```

**Why it matters:**
- Subscription CLIs (not API) run in session mode — multiple instances waste tokens and cause conflicts
- Zombie sessions from previous runs will interfere with new dispatch
- Don't kill/restart peer agents without checking for unsaved state

---

## 4. Proxy / Auth Environment

When dispatching to child agents:
- Child processes inherit parent environment variables
- SOCKS5 proxies (`socks5h://`) may break some CLIs that only support HTTP proxy
- If agent fails with proxy errors: `unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy` before CLI invocation
- Never source `.env` in runner scripts — it creates hidden coupling and can bleed incompatible vars

**Auth gaps:** Document which agents have access to which resources (GitHub, private APIs, databases). Route tasks to agents that have the required credentials rather than failing silently.
