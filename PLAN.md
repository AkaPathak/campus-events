# Campus Events — Build plan (v1)

Approved 2026-10-28. Scope is PRD.md "Build now" only.

## Screens and user flow

1. **Preferences** — Interest chips (Sports, Music, Entrepreneurship, Social), multi-select, optional. Day chips (Mon–Sun), multi-select, at least one required. Time-block chips (Morning, Afternoon, Evening), all selected by default. "Find events" button disabled until one day is selected.
2. **Recommendations** — Up to three cards: name, day + date + time, location, one-line description, "Saved" badge when saved. Tap a card to open details. "Edit preferences" returns to Screen 1 with selections preserved. Empty state shows a message plus "Edit preferences" when nothing falls on the chosen days/blocks.
3. **Event details** — Full description, date/time, location, interest tags, Save/Unsave toggle. Back returns to Screen 2, which re-renders with the saved badge.

Flow: Preferences → Recommendations → Details, back-navigable. Preferences and saved state persist while the page is open; nothing survives a refresh.

## Data model

One static file, `events.js`, exporting an array of ~20 fictional events spread across all seven days and all three time blocks. At least one day is deliberately sparse so the empty state is reachable.

```
{ id, name, day: "Mon"…"Sun", date: "Thu, Nov 5", block: "Morning"|"Afternoon"|"Evening",
  time: "6:30 PM", location, description, tags: ["Music","Social"] }
```

Dates are a fixed fictional week so results never drift with the real calendar.

App state: `{ interests: Set, days: Set, blocks: Set, savedIds: Set, currentEventId }`.

## Matching logic

1. **Hard filter:** keep events whose `day` is in `days` and whose `block` is in `blocks`. Nothing outside availability ever appears.
2. **Score:** number of the event's tags the student selected.
3. **Sort:** score descending, then earliest date/time ascending.
4. **Take the top three.**

Interests are a ranking signal, not a filter. With no interests selected, the student sees the three earliest events on their free days. With interests selected but no tag matches on those days, they still see up to three score-0 events. The empty state appears only when availability yields zero events.

## Technical approach

Plain HTML/CSS/JS, no framework, no build step, no backend.

- `index.html` — three screens as sections, one visible at a time
- `styles.css` — mobile-first, verified at 390px, no horizontal scroll
- `app.js` — state, matching, rendering, navigation
- `events.js` — fictional dataset
- `package.json` — `start: npx serve .` for Railway (also deployable as a static site)
- `.gitignore` — includes `.env`
- `README.md` — three-line local run instructions

After build: walk ACCEPTANCE_CRITERIA.md sections 1–5 and report pass/fail per box.

## Assumptions

- Availability is weekdays + time blocks, not calendar dates.
- The four interests are fixed; no free text, no personal data collected.
- Save is a toggle (Save/Unsave).
- No analytics or instrumentation in v1.
- No external requests of any kind; the app works offline once loaded.
