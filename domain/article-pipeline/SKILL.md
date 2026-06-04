---
name: article-pipeline
description: Run the article writing pipeline via runner.sh — research, draft, diagrams, and Payload CMS publish.
version: 1.1.0
metadata:
  hermes:
    tags: [writing, content, pipeline, articles, publish, payload]
    related_skills: [claude-code]
---

# Article Pipeline — runner.sh

## Trigger

```
article: <topic-slug> | <audience> | <angle>
```

## Parse Input

From the user message, extract three pipe-delimited fields:

- **topic-slug** — text before first `|`, trimmed, max 80 chars, lowercase `a-z0-9_-` only
- **audience** — text between first and second `|`, trimmed, max 200 chars
- **angle** — text after second `|`, trimmed, max 400 chars

### Examples

```
article: ai-agents-overhyped | developers | agents fail because of orchestration not models
article: agentic-ai-eating-software | solo founders and CTOs | why agentic AI replaces SaaS within 3 years
```

## Execute

Run a single `terminal()` call in background mode — the pipeline can run 8-18 min, which exceeds the 600s foreground cap:

```bash
~/claude-workspace/pipelines/article/runner.sh "<topic-slug>" "<audience>" "<angle>"
```

```jsonc
terminal(background=true, notify_on_complete=true, timeout=1200)
```

The runner.sh:
1. Validates all three inputs
2. Spawns `claude -p` with the orchestrator skill at `~/claude-workspace/pipelines/article/SKILL.md`
3. After Claude succeeds → runs `diagram_worker.sh` for diagrams + uploads
4. Writes log to `~/claude-workspace/logs/article-<timestamp>-<topic>.log`

## Output

The final log line prints:

```
[article] done claude=0 diagrams=0 → ~/claude-workspace/logs/article-20260602-152030-ai-agents-overhyped.log
```

Reply to the user with:

```
✅ Article pipeline complete
📄 Log: ~/claude-workspace/logs/article-<timestamp>-<topic>.log
🔗 Preview: <Payload CMS preview URL>
```

The Payload CMS preview URL is printed by `publish.py` during the Claude phase — look for a line like `Draft: https://...` or `post ID: ...` in the output.

## Validation Rules

- **topic-slug:** max 80 chars, pattern `^[a-zA-Z0-9_-]{1,80}$`
- **audience:** max 200 chars, plain text
- **angle:** max 400 chars, plain text

**Reject** any input that doesn't match with a clear error message.

## Error Handling

- **`FAIL:` in output** — Input validation failed. Check constraints, re-request from user.
- **`claude exit=non-zero`** — Claude rate-limited or max-turns hit. Check log, retry with timeout=900 if near 60 turns.
- **`state.json missing`** — Publish phase failed inside Claude. Check log for Payload 400 errors, malformed markdown.
- **5+ min no output** — Diagram phase running (60-120s per SVG). Normal — let it finish.
- **`API Error: UnsupportedProxyProtocol`** — Environment has `HTTP_PROXY=socks5h://localhost:40000` which Claude CLI doesn't support. Already handled in runner.sh — if you see this, the fix line `unset HTTP_PROXY HTTPS_PROXY` isn't in the script yet. Same fix applies to `strategist.sh` and `editor.sh` if they ever spawn `claude` standalone.
- **`API Error: 529 Overloaded`** — Anthropic server-side overload. Transient — retry later when traffic subsides. Confirms proxy fix is working (otherwise you'd see `UnsupportedProxyProtocol` instead).
- **Foreground 600s timeout cap** — Foreground max is 600s. Pipeline is 8-18 min. Always use `background=true, notify_on_complete=true`. Never foreground mode, even with a high timeout.

## Pitfalls & Field Notes

### Proxy env vars
The box runs with `HTTP_PROXY=socks5h://localhost:40000` and `HTTPS_PROXY=socks5h://localhost:40000`. Claude CLI's HTTP client rejects this protocol. `runner.sh` now unsets them before calling `claude -p`. If you ever invoke `claude` directly (tests, ad-hoc), prefix with `HTTP_PROXY= HTTPS_PROXY= claude ...`.

### Two-phase image delivery
The pipeline has two phases that the user may experience as one:
1. **Claude phase** — creates the Payload draft post (no heroImage, raw `<!-- DIAGRAM -->` markers in content)
2. **Diagram worker phase** — generates SVGs → rsvg-convert → PNGs → upload to Payload → patch post with heroImage + inline URLs

If the user reports "blank black" or missing images, they likely checked the post during the gap between phases. The images aren't wired until diagram_worker finishes. Point them to check again after the full pipeline completes.

### Payload tags
Tags that don't exist in Payload cause 400s. `publish.py` omits the `tags` key entirely when empty (bare `[]` also 400s). If tags are needed, run `payload_ensure_tags` first, or skip and let the diagram_worker add them via post-patch. Tags skipped in this run: "pipelines", "devops", "testing" — none existed in Payload.

### Workspace MCPs unavailable from claude -p
`claude -p` subprocess doesn't inherit workspace MCPs (`mcp__payload__*`, `fireworks-diagram`). The pipeline handles this via script fallbacks:
- Payload: `scripts/publish.py` bypasses MCP, works directly
- Diagrams: `diagram_worker.py` calls the MCP server as a subprocess

Expected and handled. No action needed.

### Multiple failure modes in one session
Smoke testing hit: `UnsupportedProxyProtocol` → (fix proxy) → `529 Overloaded` → (retry) → success. Proxy fix is confirmed effective (529 proved Claude reached the API), and the pipeline itself was sound throughout — failures were environment + transient API load, not pipeline bugs.

## Relationship to content-pipeline

The older `content-pipeline` skill has been **deleted** and absorbed into this one. It used `~/claude-workspace/scripts/claude-writer.sh` — that script is deprecated. All article pipeline traffic routes here via `runner.sh`.

If someone references the old `content-pipeline` skill name, route them here instead.

