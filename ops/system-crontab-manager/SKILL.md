---
name: system-crontab-manager
description: "Manage system-level cron jobs for the default user using the `crontab` command. Use for adding, listing, and removing scheduled tasks that are managed by the OS, not the agent's internal cron tool."
category: "devops"
---

## Summary

This skill provides a safe and reliable workflow for managing system-level cron jobs via the `crontab` command-line utility. It should be used when the user asks to schedule a recurring task, or to investigate existing scheduled tasks.

Always check this in addition to the agent's internal `cronjob` tool, as the system may have its own schedule.

## Workflow

**Reference example:** See `references/radar-factory-cron-example.md` for a real-world multi-cron pipeline (4 interdependent jobs, no_agent wrappers, mixed patterns).

### 1. List Existing Cron Jobs

To see what is currently scheduled, always start by listing the existing jobs.

```bash
crontab -l
```

### 2. Add a New Cron Job

To add a new job without losing existing ones, use this safe pipe-based approach. This avoids the need for temporary files.

**Replace `<cron_schedule_and_command>` with the actual entry, e.g., `0 10 * * * /path/to/script.sh`**

```bash
# Store the new job in a variable for clarity
NEW_CRON_JOB="<cron_schedule_and_command>"

# Read the current crontab, append the new job, and install the result.
# The 2>/dev/null suppresses the "no crontab for user" error if it's empty.
(crontab -l 2>/dev/null; echo "$NEW_CRON_JOB") | crontab -
```
After adding, always run `crontab -l` again to verify the new job was added correctly.

### 3. Remove a Cron Job

To remove a specific job, use `grep -v` to filter it out and install the result.

**Replace `<unique_pattern_of_job_to_remove>` with a string that uniquely identifies the line you want to delete (e.g., the script path).**

```bash
# Store the pattern to remove
PATTERN_TO_REMOVE="<unique_pattern_of_job_to_remove>"

# List the crontab, filter out the job to remove, and install the result
crontab -l | grep -v "$PATTERN_TO_REMOVE" | crontab -
```
After removing, always run `crontab -l` again to verify the job is gone.

## Hermes Cron vs OS Crontab — Choosing the Right Tool

Hermes has a built-in `cronjob()` tool that is often better than OS crontab for agent-managed tasks:

| Factor | Hermes cronjob() | OS crontab |
|---|---|---|
| **Telegram delivery** | Built-in — auto-delivers to the current chat | Silent by default — must script your own notification |
| **Failure alerts** | Automatic on non-zero exit | Must implement your own |
| **Monitoring** | Dashboard via `cronjob action='list'` | Must SSH and `crontab -l` |
| **Output handling** | Stdout auto-sent to user | Must redirect to file |
| **Scheduling syntax** | Same cron expressions | Same cron expressions |
| **Best for** | Any task where the user wants to hear about results | Tasks where the agent cannot modify the schedule, or host-level guarantees needed |

### `no_agent=True` Pattern for Fire-and-Forget Tasks

When you have a deterministic script (no LLM needed), use `no_agent=True` — it runs the script directly, zero LLM cost per tick, and the script's stdout is delivered verbatim as the Telegram message.

**Pattern — wrapper script that logs + notifies:**

```bash
#!/bin/bash
# Wrapper for a fire-and-forget cron task
set -euo pipefail

# 1. Log to file with timestamps
LOG=/path/to/logs/my_task.log
echo "[$(date '+%Y-%m-%dT%H:%M:%S')] Task start" >> "$LOG"

# 2. Run the actual work, tee to log in append mode
/path/to/actual_task.sh >> "$LOG" 2>&1
RC=$?

# 3. Log completion
echo "[$(date '+%Y-%m-%dT%H:%M:%S')] Task done (exit: $RC)" >> "$LOG"

# 4. Print a one-line summary to stdout → Telegram delivery
echo "[Cron] ✅ My task complete — exit code $RC"
exit $RC
```

**Register the cron:**

```
cronjob(action='create', schedule='0 */6 * * *', name='My task', no_agent=True,
        script='my_wrapper.sh', workdir='/path/to/project')
```

**When to NOT use `no_agent=True`:** Tasks that need reasoning — summarizing results, deciding what to do based on output, conditional actions, or multi-step LLM processing. For those, use agent-based cron with a `prompt` instead.

## Pitfalls

- **Permissions:** This operates on the crontab for the current user (`ubuntu`). If you need to edit the system-wide crontab or another user's, you may need `sudo`.
- **Syntax:** Cron syntax is notoriously tricky. Double-check the schedule (`* * * * *`). You can use websites like [crontab.guru](https://crontab.guru/) to verify.
- **Uniqueness for Removal:** When removing a job, ensure your `PATTERN_TO_REMOVE` is unique enough to not accidentally delete multiple jobs. Using the full script path is usually a safe bet.
- **Model-specific bug (DeepSeek Flash cronjob tool):** Some models reliably drop `schedule` and `script` params from `cronjob(action='create')` calls. See Troubleshooting section below for the direct-write workaround.

## Troubleshooting: Cronjob Tool Parameter-Drop Bug (Cross-Model)

**Symptoms:** Repeated `"schedule is required for create"` errors despite having written the param in your response. The tool call only contains `action`, `name`, `no_agent`, `workdir` — never `schedule` or `script`.

**Known affected models:** DeepSeek Flash, Mistral (via Pollinations), and likely others. This is a persistent tool-call construction issue across multiple providers, not a single-model bug.

**Workaround — Direct write to jobs.json:**

Bypass the cronjob tool and write the job record directly to `~/.hermes/cron/jobs.json` via `execute_code`. The scheduler re-reads this file every 60s on its next tick.

```python
import json, uuid
from datetime import datetime, timezone

with open("/home/ubuntu/.hermes/cron/jobs.json") as f:
    data = json.load(f)

new_job = {
    "id": uuid.uuid4().hex[:12],
    "name": "My Harvester",
    "prompt": "",
    "skills": [], "skill": None, "model": None, "provider": None, "base_url": None,
    "script": "my_wrapper.sh",                    # relative to ~/.hermes/scripts/
    "no_agent": True, "context_from": None,
    "schedule": {"kind": "cron", "expr": "0 */6 * * *", "display": "0 */6 * * *"},
    "schedule_display": "0 */6 * * *",
    "repeat": {"times": None, "completed": 0},
    "enabled": True, "state": "scheduled",
    "paused_at": None, "paused_reason": None,
    "created_at": datetime.now(timezone.utc).isoformat(),
    "next_run_at": None,
    "last_run_at": None, "last_status": None, "last_error": None,
    "last_delivery_error": None,
    "deliver": "origin",
    "origin": {"platform": "telegram", "chat_id": "8327212591",
               "chat_name": "Daniel W", "thread_id": None},
    "enabled_toolsets": None,
    "workdir": "/home/ubuntu/claude-workspace/radar"
}

data["jobs"].append(new_job)
data["updated_at"] = datetime.now(timezone.utc).isoformat()

with open("/home/ubuntu/.hermes/cron/jobs.json", "w") as f:
    json.dump(data, f, indent=2)
```

**Important:** The `origin` dict must match the user's Telegram chat context. Use `send_message(action='list')` to discover `chat_id` if unknown. The scheduler validates `origin` as a dict — strings or lists cause silent delivery failures.
