# Campus Events — PRD (v1 prototype)

## Customer
College students looking for campus activities, on their phone, between classes.

## Problem
Events are scattered across different channels. Students miss things they'd have gone to.

## Solution
Personalized campus event recommendations based on interests and availability.

## Assumption we're testing
Students will find relevant events more easily when recommendations match their interests and availability.

## Input → Process → Output
- **Input:** a student selects interests (sports, music, entrepreneurship, social) and the days/times they're free.
- **Process:** compare selections against a fictional dataset of campus events; only recommend events in the selected availability, prioritizing matching interests.
- **Output:** up to three events, each with name, date and time, location, description, and a save button.

## Build now (v1)
- Select and deselect interests.
- Choose availability.
- Match students with events.
- View event details.
- Save an event (persists while the prototype is open).
- Helpful message when nothing matches.

## Build later
Student accounts, messaging, payments, club management tools, social integrations, real event data.

## Constraints
- Mobile-friendly.
- Three screens maximum: preferences, recommendations, event details.
- Fictional event data only. No logins, payments, or external APIs.
- No personal information collected.
- Saved state does not need to survive a refresh in v1.

## Done means
I open the link on a phone, pick two interests and one day, see up to three events that match, open one, save it, and see it marked saved. If I pick a day with no events, I see a message, not a blank screen.

## Decisions made after the plan (from the plan review)
- **Availability:** days + three time blocks (Morning / Afternoon / Evening), all blocks selected by default. One day and "Find events" still works in two taps.
- **Interests:** a ranking signal, not a hard filter. Availability is always respected; interests only reorder. "No match" means nothing on the selected days, not nothing matching interests.
- **More than three matches:** show the top three by interest overlap, earliest first on ties.
- **Save:** a Save/Unsave toggle, persists across screens within the session, not across refresh.
- **Not in v1:** analytics. Add instrumentation only when we're ready to measure the assumption.