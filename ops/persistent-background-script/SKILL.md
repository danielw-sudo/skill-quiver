---
name: persistent-background-script
type: execution
category: ops
source: hermes
model: any
description: >-
  Create, deploy, and manage long-running resilient background service scripts
  that persist across agent and system restarts. Covers PID file management,
  logging, systemd deployment, and verification. TRIGGER when: user asks to
  "run a script in background", "keep running after restart", "create a daemon",
  "background process", or "persistent service".
pairs_with: [code/tools/python-data-pipeline, ops/eco-audit]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# Persistent Background Script

Create and manage long-running background services that survive agent restarts. Different from cronjobs (scheduled, exit after run) — this is for processes that maintain an internal loop continuously.

## When to Use

- API pingers, file watchers, periodic data fetchers
- Services that need internal state over long periods
- Processes that must restart on failure or system reboot

## Step 1: Write the Service Script

A resilient background service needs:

**Logging** — log status, actions, and errors to a dedicated file (`~/.local/logs/my_service.log`). Primary debugging tool.

**PID File Management** — write process ID to a file (`~/.local/run/my_service.pid`) on startup. Prevents multiple instances. Allows external health checks.

**Restart Recovery Logic** — on startup, read own log to determine when last successful action occurred. Calculate wait before resuming loop to avoid drift.

## Step 2: Deploy the Service

**Create prerequisite directories first:**
```bash
mkdir -p ~/.local/logs ~/.local/run
```

**Correct launch (use nohup + disown or systemd):**
```bash
# Option 1: nohup (survives terminal close, not reboots)
nohup python3 ~/path/to/service.py > ~/.local/logs/my_service.log 2>&1 &
disown

# Option 2: systemd user service (survives reboots)
# Create ~/.config/systemd/user/my-service.service
```

**systemd user service template:**
```ini
[Unit]
Description=My Background Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /home/user/path/to/service.py
Restart=on-failure
RestartSec=10
StandardOutput=append:/home/user/.local/logs/my_service.log
StandardError=append:/home/user/.local/logs/my_service.log

[Install]
WantedBy=default.target
```

```bash
systemctl --user enable my-service
systemctl --user start my-service
systemctl --user status my-service
```

## Step 3: Verify and Debug

**Check process immediately after launch:**
```bash
ps aux | grep my_service.py
pgrep -f my_service.py
```

**If process exits immediately:**
```bash
cat ~/.local/logs/my_service.log  # check for startup errors
```

Most common startup failures:
- Missing directories (log/PID dirs don't exist)
- Python syntax errors
- Missing imports

## Pitfalls

| Problem | Root Cause | Fix |
|---------|-----------|-----|
| Exits immediately | Missing log/PID dirs | `mkdir -p` before launch |
| Doesn't survive SSH disconnect | Using `&` without `disown` | Use `nohup ... & disown` or systemd |
| Multiple instances | No PID file check | Check PID file on startup, exit if running |
| Drifts over time | No restart recovery | Read last-run timestamp from log on startup |
| No visibility | No file logging | Add `logging.basicConfig(filename=...)` at startup |

## FastAPI / uvicorn Services

For Python web services:
```bash
nohup uvicorn app:app --host 0.0.0.0 --port 8000 > ~/.local/logs/api.log 2>&1 &
disown
```

Common startup error: `NameError` on import or incorrect `ExecStart` path in systemd. Always verify with `systemctl --user status` immediately after enabling.
