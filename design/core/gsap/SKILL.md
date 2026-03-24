---
name: gsap
type: reference
category: design
source: gsap-skills
model: any
description: >-
  Consolidated GSAP reference — core API, timelines, ScrollTrigger, React/Vue/Svelte
  integration, plugins, performance, and utilities. Use when building or reviewing
  GSAP animations in any framework.
license: MIT
---

# GSAP — Consolidated Reference

Use GSAP when an application requires complex sequencing, scroll-driven animation, SVG morphing, or runtime control (pause, reverse, seek). GSAP is framework-agnostic and runs in React, Vue, Svelte, or vanilla JS.

---

## Core API

### Tween Methods

| Method | Purpose |
|--------|---------|
| `gsap.to(targets, vars)` | Animate to `vars` from current state |
| `gsap.from(targets, vars)` | Animate from `vars` to current state |
| `gsap.fromTo(targets, fromVars, toVars)` | Explicit start and end |
| `gsap.set(targets, vars)` | Apply immediately (duration 0) |

**Targets**: CSS selector, element, array, or NodeList. Use camelCase for CSS properties.

### Common Vars

- **duration** (default 0.5s), **delay**, **ease** (string), **stagger** (number or object)
- **repeat** (-1 for infinite), **yoyo**, **overwrite** (`false` | `true` | `"auto"`)
- **onComplete**, **onStart**, **onUpdate** — callbacks
- **immediateRender** — default `true` for from/fromTo; set `false` on stacked tweens

### Transform Aliases (prefer over raw CSS transform)

| GSAP | CSS equivalent |
|------|---------------|
| `x`, `y`, `z` | translateX/Y/Z (px) |
| `xPercent`, `yPercent` | translateX/Y in % |
| `scale`, `scaleX`, `scaleY` | scale |
| `rotation`, `rotationX`, `rotationY` | rotate (deg) |
| `skewX`, `skewY` | skew |

- **autoAlpha** — prefer over `opacity`; sets `visibility: hidden` at 0
- **clearProps** — remove inline styles on complete (`"all"` or property list)
- **Relative values**: `"+=20"`, `"-=30"`, `"*=2"`
- **Directional rotation**: `"_short"`, `"_cw"`, `"_ccw"`

### Easing

```
power1-4  .in / .out / .inOut
back      bounce    circ    elastic    expo    sine    none
```

Custom: `CustomEase.create("name", ".17,.67,.83,.67")` (requires plugin).

### Controlling Tweens

```javascript
const tween = gsap.to(".box", { x: 100 });
tween.pause() / .play() / .reverse() / .kill() / .progress(0.5)
```

### Defaults & Function Values

```javascript
gsap.defaults({ duration: 0.6, ease: "power2.out" });
gsap.to(".item", { x: (i) => i * 50, stagger: 0.1 }); // per-target
```

---

## Timelines

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "<")      // same start as previous
  .to(".c", { opacity: 0 }, "+=0.2"); // 0.2s after last end
```

### Position Parameter (3rd argument)

| Value | Meaning |
|-------|---------|
| `1` | At 1 second (absolute) |
| `"+=0.5"` | 0.5s after last end |
| `"-=0.2"` | 0.2s before last end |
| `"<"` | When previous starts |
| `"<0.2"` | 0.2s after previous starts |
| `"label"` | At label position |

### Labels & Nesting

```javascript
tl.addLabel("intro", 0);
tl.to(".a", { x: 100 }, "intro");
// Nest timelines:
master.add(childTimeline, 0);
```

### Playback

`tl.play()` / `.pause()` / `.reverse()` / `.restart()` / `.progress(0.5)` / `.kill()`

---

## ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);
```

### Basic Usage

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true,          // link progress to scroll (true or seconds for smoothing)
    toggleActions: "play reverse play reverse",
    pin: true,            // pin element during scroll range
    markers: true         // dev only — remove in production
  }
});
```

### Key Config

| Property | Purpose |
|----------|---------|
| `trigger` | Element defining start/end positions |
| `start` / `end` | `"triggerPos viewportPos"` e.g. `"top center"` |
| `scrub` | `true` or seconds — link animation to scroll |
| `toggleActions` | 4 actions: onEnter, onLeave, onEnterBack, onLeaveBack |
| `pin` | Pin element during active range |
| `snap` | Snap to progress values (number, array, or `"labels"`) |
| `containerAnimation` | For fake horizontal scroll (must use `ease: "none"`) |
| `once` | Kill after first trigger |

### Timeline + ScrollTrigger

```javascript
gsap.timeline({
  scrollTrigger: { trigger: ".section", start: "top top", end: "+=2000", scrub: 1, pin: true }
}).to(".a", { x: 100 }).to(".b", { y: 50 });
```

### Batch & Cleanup

```javascript
ScrollTrigger.batch(".box", {
  onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.15 })
});
ScrollTrigger.refresh(); // after DOM/layout changes
ScrollTrigger.getAll().forEach(t => t.kill()); // cleanup
```

---

## Framework Integration

### React (useGSAP)

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const containerRef = useRef(null);
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef }); // scoped selectors, auto-cleanup
```

- Pass `scope` to limit selectors to component
- Use `contextSafe` for event handlers
- No GSAP during SSR — useGSAP handles this

### Vue 3

```javascript
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, container.value);
});
onUnmounted(() => ctx?.revert());
```

### Svelte

```javascript
onMount(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, container);
  return () => ctx.revert();
});
```

**All frameworks**: scope selectors, create after mount, revert on unmount.

---

## Plugins (register before use)

```javascript
gsap.registerPlugin(ScrollToPlugin, Flip, Draggable);
```

| Plugin | Purpose |
|--------|---------|
| **ScrollToPlugin** | Animate scroll position: `gsap.to(window, { scrollTo: { y: "#section" } })` |
| **ScrollSmoother** | Smooth/momentum scroll wrapper |
| **Flip** | Layout transitions: `Flip.getState()` → change DOM → `Flip.from(state)` |
| **Draggable** | Drag, spin, throw: `Draggable.create(".box", { type: "x,y", inertia: true })` |
| **Observer** | Normalize pointer/scroll input for gestures |
| **SplitText** | Split text into chars/words/lines for animation |
| **DrawSVG** | Animate SVG stroke drawing |
| **MorphSVG** | Morph between SVG shapes |
| **MotionPath** | Animate along SVG path |
| **CustomEase** | Custom easing curves |
| **Physics2D** | 2D physics (velocity, gravity) |

---

## Performance

- Animate **transform** (`x`, `y`, `scale`, `rotation`) and **opacity** only — avoid `width`, `height`, `top`, `left`
- Use `will-change: transform` in CSS on animated elements
- Use `gsap.quickTo()` for frequently updated values (mouse followers)
- Use `stagger` instead of many separate tweens
- Kill off-screen animations; call `ScrollTrigger.refresh()` only on layout changes

---

## Utilities (gsap.utils)

All on `gsap.utils.*`. Omit last arg to get a reusable function.

| Utility | Signature | Purpose |
|---------|-----------|---------|
| `clamp` | `(min, max, value?)` | Constrain value to range |
| `mapRange` | `(inMin, inMax, outMin, outMax, value?)` | Map between ranges |
| `normalize` | `(min, max, value?)` | Normalize to 0-1 |
| `interpolate` | `(start, end, progress?)` | Lerp (numbers, colors, objects) |
| `snap` | `(increment\|array, value?)` | Snap to nearest |
| `random` | `(min, max, snap?, true?)` | Random value (pass `true` for function) |
| `wrap` | `(min, max, value?)` | Wrap value cyclically |
| `toArray` | `(value, scope?)` | Selector/NodeList to array |
| `pipe` | `(...fns)` | Compose functions |
| `selector` | `(scope)` | Scoped selector function |
| `distribute` | `(config)` | Distribute values across targets |

---

## Rules

**Do:**
- Register plugins before use
- Use transform aliases over raw CSS transform
- Use `autoAlpha` for fade in/out
- Use timelines for sequencing (not chained delays)
- Put ScrollTrigger on timeline, not child tweens
- Respect `prefers-reduced-motion` via `gsap.matchMedia()`
- Clean up: `ctx.revert()`, kill ScrollTriggers on unmount

**Don't:**
- Animate layout properties when transforms work
- Use `scrub` and `toggleActions` together
- Nest ScrollTriggers inside parent timelines
- Use `ease` other than `"none"` with `containerAnimation`
- Leave `markers: true` in production
- Skip cleanup — stray tweens cause leaks and jank

### Learn More

- https://gsap.com/docs/v3/
- https://gsap.com/resources/getting-started/
