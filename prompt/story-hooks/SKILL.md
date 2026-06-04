---
name: story-hooks
description: Find interesting, positive, shareable story hooks from history, news, or data. Turns calendar anniversaries, current events, or raw facts into a narrative you can tell in 1 minute.
version: 1.0.0
author: local
argument-hint: 'story-hooks today in history | story-hooks June 3 anniversaries | story-hooks fun facts about space'
metadata:
  hermes:
    tags: [content, storytelling, hooks, history, social-media, ideas]
    category: creative
    related_skills: [article-pipeline, humanizer, ideation]
---

# Story Hooks — Find Shareable Angles

Take any date, event, or topic and find the **one weird/human/surprising detail** that makes a story worth retelling in 60 seconds.

---

## When to Use

- "what happened today in history"
- "find interesting anniversaries for [date]"
- "give me content ideas about [topic]"
- "make this interesting for social media"
- "I need a fun fact to share"

---

## The Filter (5 criteria, all must pass)

| # | Criterion | Why | Fail Examples |
|---|---|---|---|
| 1 | **Positive or neutral** | No wars, disasters, oppression, political drama | Opium War, volcano eruption, coup d'état |
| 2 | **Tell-able in 1 minute** | One clear arc, no multi-paragraph setup needed | Complex geopolitical disputes, multistep scientific discoveries |
| 3 | **Has a hook detail** | A weird/surprising/human touch people remember and retell | Mustard seeds in a spacewalk pocket, emoji came from a 1970s German font |
| 4 | **Not archival trivia** | Fun, catchy, interesting — not a fact dump | Obscure volcano stats, "this treaty was signed" |
| 5 | **No domain barrier** | Doesn't require deep expertise to appreciate | Particle physics theory, niche legal rulings |

---

## Workflow

### Step 1 — Gather candidates

Search for events associated with the date or topic:
- "June 3 historical events"
- "[topic] interesting facts"
- "on this day [topic]"

Get at least 5-8 raw candidates before filtering.

### Step 2 — Score each candidate

For each candidate, ask:
1. Is it positive or at worst neutral? (Opium War → ❌. First spacewalk → ✅.)
2. Can you explain it in 2 sentences to someone who knows nothing about the topic? (If yes, proceed.)
3. Does it have a weird/human detail? (A spacewalk is cool. A spacewalk where the guy carries **mustard seeds** and loses a **glove** is a story.)
4. Is the punchline "wow, that's interesting" not "huh, okay"?

**Kill the candidate if any question scores "no".**

### Step 3 — Find the hook

The hook is NOT the topic. The hook is the one specific detail that makes someone say "wait, really?" and want to tell someone else.

**Workmanlike framing (boring):** "On June 3, 1965, Gemini 4 launched — America's first multi-day space mission."

**Hooked framing:** "A guy floated out of a spaceship with a jet gun, mustard seeds in his pocket, lost a glove forever in orbit, and said it was 'the saddest moment of my life' when they told him to come back in."

**Method:** Find the one sensory, human, or absurd detail. Lead with it.

### Step 4 — Frame in 1-2 sentences

Format:

```
TOPIC: [event name]
DATE: [date]
ONE-LINER: [the hook-framed version in 1-2 sentences]
WHY IT WORKS: [which of the 5 criteria it hits hardest]
```

Present 1-2 options to the user with clear "why this works" reasoning. Do NOT dump a long list.

---

## Examples

**Good pick — Gemini 4 spacewalk:**
```
TOPIC: First American spacewalk (Gemini 4)
DATE: June 3, 1965
ONE-LINER: Dude floated outside a spaceship with mustard seeds in his pocket, said "I feel like a million dollars," lost a glove forever in space, and called it "the saddest moment of my life" when ordered back inside.
WHY IT WORKS: The mustard seeds and lost glove are the weird details people remember and retell. Zero background knowledge needed.
```

**Good pick — Internet proto-emoji (Unicode 1.1):**
```
TOPIC: Unicode 1.1 adds Dingbats block
DATE: June 3, 1993
ONE-LINER: A German font designer in the 1970s drew little symbols for fun. On June 3, 1993, those doodles got baked into Unicode — meaning every computer on earth could now display ✈ ✂ ✌ ❤ ✨. The word "emoji" didn't exist yet. 20 years later, 6 billion people send poop emojis daily.
WHY IT WORKS: The "emoji before emoji had a name" twist is the hook. No war, no politics, instantly relatable.
```

**Bad pick — any war/drama/trivia:**
```
TOPIC: [whatever war or obscure volcano]
WHY IT FAILS: Drama-filled, requires background, no shareable hook detail. Kill it.
```

---

## Pitfalls

- **Do not present more than 2 options.** The user is not an archivist. Three to eight options is a fact dump, not a recommendation.
- **"Fun" does not mean "whimsical."** A spacewalk is serious engineering. The *detail* is whimsical. The hook can sit inside a serious event.
- **Do not lead with the date.** "On this day in [year]..." is the boring framing. Lead with the weird detail, backfill the context.
- **"Positive" does not mean "Disney."** It means no active war/destruction/oppression. Tech milestones, scientific breakthroughs, cultural firsts, and "the first time humans did X" are all fair game.
- **Do not force a topic when none passes.** Say "Nothing interesting enough today" instead of scraping the barrel. The user will respect "skip" more than "here's a weak pick."
- **No China-related war/drug/opium topics without explicit user request.** The user has made this preference clear.
