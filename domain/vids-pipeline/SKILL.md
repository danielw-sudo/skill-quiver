---
name: vids-pipeline
description: 4-phase HITL video pipeline. Always use terminal() to run runner.sh. Never run raw python3 commands. Never message agent inboxes.
version: 4.2.0
metadata:
  hermes:
    tags: [video, content, pipeline, hitl]
---

# Vids Pipeline

## Rule: terminal() only. runner.sh only. Nothing else.

```bash
source /home/ubuntu/.hermes/.env && bash /home/ubuntu/agy-workspace/pipelines/vids/runner.sh <cmd> "<arg>"
```

```jsonc
terminal(background=true, notify_on_complete=true, timeout=600)
```

---

## Step 1 — Check phase (always do this first)

```bash
runner.sh status
```

Returns: `phase: script_review` (or none / storyboard_review / render_done)

---

## Step 2 — Route based on phase + what Daniel says

### phase: none — no active run

| Daniel says | Run |
|---|---|
| "advise topics" / "what topics" / "suggest" / "ideas for today" | `runner.sh today ""` |
| "write a script about [topic] for [date]" | `runner.sh custom "<date>\|<topic>"` |

### phase: script_review

| Daniel says | Run |
|---|---|
| "good" / "next" / "approve" / "go" / "proceed" | `runner.sh approve-script ""` |
| "revise" / "rewrite" / "change" / any notes | `runner.sh revise-script "<notes>"` |

### phase: storyboard_review

| Daniel says | Run |
|---|---|
| "good" / "render" / "go" / "approve" | `runner.sh approve ""` |
| "revise" / "redo" / "different" / any notes | `runner.sh revise "<notes>"` |

### phase: render_done

| Daniel says | Run |
|---|---|
| "publish" / "push" / "ship" | `runner.sh publish ""` |

---

## After terminal completes

Reply: "Done. Check Telegram."
