---
name: opencode
type: reference
category: ops
source: hermes
model: any
description: >-
  OpenCode CLI reference — delegate coding tasks to OpenCode as an autonomous
  coding worker. Covers one-shot tasks, interactive background sessions, PR
  review, parallel work patterns, and session management. Requires OpenCode
  installed and auth configured.
pairs_with: [ops/subagent-driven-development]
reviewed_at: 2026-06-04
model_tested: claude-sonnet-4-6
---

# OpenCode CLI

Use [OpenCode](https://opencode.ai) as an autonomous coding worker. Provider-agnostic, open-source AI coding agent with a TUI and CLI.

## Prerequisites

```bash
npm i -g opencode-ai@latest  # or: brew install anomalyco/tap/opencode
opencode auth login           # or set provider env vars
opencode auth list            # verify at least one provider configured
```

## One-Shot Tasks

```bash
# Basic one-shot
opencode run 'Add retry logic to API calls and update tests'

# With context files
opencode run 'Review this config for security issues' -f config.yaml -f .env.example

# Show thinking
opencode run 'Debug why tests fail in CI' --thinking

# Force model
opencode run 'Refactor auth module' --model openrouter/anthropic/claude-sonnet-4
```

## Interactive Background Sessions

```bash
# Start TUI in background
opencode &  # start in background, note session ID

# Send prompt
# Type in terminal: your message then Enter

# Resume last session
opencode -c

# Resume specific session
opencode -s ses_abc123
```

## Common Flags

| Flag | Use |
|------|-----|
| `run 'prompt'` | One-shot, exits after completion |
| `--continue` / `-c` | Continue last session |
| `--session <id>` / `-s` | Continue specific session |
| `--model provider/model` | Force model |
| `--file <path>` / `-f` | Attach file(s) |
| `--thinking` | Show model thinking |
| `--title <name>` | Name the session |

## PR Review

```bash
opencode pr 42  # review PR #42 in current repo
```

Or review in isolation:
```bash
TMPDIR=$(mktemp -d)
git clone https://github.com/user/repo.git "$TMPDIR"
cd "$TMPDIR"
opencode run 'Review this PR vs main. Report bugs, security risks, test gaps.' \
  -f $(git diff origin/main --name-only | head -20 | tr '\n' ' ')
```

## Parallel Work Pattern

Use separate working directories to avoid conflicts:

```bash
# Terminal 1
cd /tmp/issue-101 && opencode run 'Fix issue #101 and commit'

# Terminal 2
cd /tmp/issue-102 && opencode run 'Add parser regression tests and commit'
```

## Session Management

```bash
opencode session list           # list past sessions
opencode stats                  # token usage and costs
opencode stats --days 7         # last 7 days
```

## Verification Smoke Test

```bash
opencode run 'Respond with exactly: OPENCODE_SMOKE_OK'
# Expect: output includes OPENCODE_SMOKE_OK, no provider errors
```

## Pitfalls

| Pitfall | Fix |
|---------|-----|
| Interactive TUI needs pty | Start via terminal that supports pty (not piped) |
| Wrong binary via PATH | Check `which -a opencode`, pin explicit path |
| Appears stuck | Check logs before killing; may be long-running task |
| Parallel sessions collide | Use separate workdirs per session |
| `/exit` doesn't work | Use Ctrl+C to exit TUI |

## Rules

1. Prefer `opencode run` for one-shot automation — simpler, no pty needed
2. Use interactive mode only when iteration is needed
3. Scope sessions to a single repo/workdir
4. For long tasks, check progress periodically via `opencode session list`
5. Report concrete outcomes: files changed, tests, remaining risks
6. Exit interactive sessions with Ctrl+C, never `/exit`
