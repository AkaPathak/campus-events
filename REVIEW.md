# Campus Events — Technical review (v1)

Reviewed 2026-10-28 at commit `1d9917d`, before deploying to Railway for real users. Status: **recommendations awaiting approval; no changes made yet.**

**Bottom line:** the app code is in good shape for a prototype. The biggest risks come from how it's served on Railway, not from the app itself. The current setup puts every file in the project folder on the public web, including the planning docs, the code libraries the server uses, and possibly the git history. There are also two smaller issues, logged IP addresses and a vulnerable dependency, plus one product risk: events that look real but aren't. All are small fixes.

These findings were checked against the running app, not just by reading code. Anything marked **verify** needs a person to check it.

---

## 1. Security

**Exposed files: the most important finding.** The start command (`serve .`) publishes the entire project folder, not just the four files the app needs. Requesting these from the local server returned all of them:

| Address | What it is | Returned |
|---|---|---|
| `/PRD.md`, `/PLAN.md`, `/PROMPT.md`, `/CLAUDE.md` | Planning and instruction docs | 200 (visible) |
| `/node_modules/` | A browsable list of every code library the server uses | 200 |
| `/.git/config`, `/.git/HEAD` | Git internals. If present on Railway, someone could download the full commit history. | 200 locally |
| `/package-lock.json` | Exact versions of every library, which helps an attacker look up known weaknesses | 200 |

In plain English: anyone who guesses a filename can read it. Today nothing in there is secret, so the harm is mild. The real danger is the habit. Any file later dropped in this folder, such as a notes file, a data export or a `.env`, becomes public the moment it's deployed.

**Verify:** it's not yet known whether Railway's copy includes the `.git` folder. Once there's a public link, open `<link>/.git/HEAD` and `<link>/PRD.md` and check what comes back.

**API keys and credentials:** none. The code and the full git history contain no keys, tokens or passwords. `.gitignore` includes `.env`. Note that the GitHub repo is **public**, so the docs and code are already visible there. That's fine if intended (a portfolio piece, say), but confirm it.

**Vulnerable dependency:** `npm audit` reports **2 high-severity** issues. Both come from a library called `compression`, which `serve` uses. The flaw allows a denial-of-service: someone could deliberately make the server run out of memory and crash. Don't run the suggested `npm audit fix --force`. It would downgrade `serve` by four major versions and could break things. There's a cleaner fix (see A2).

**Login and permissions:** none needed, and that's correct for v1. There's nothing private to protect: no accounts, no stored user data, nothing to edit. Adding logins would be scope creep from the PRD's "Build later" list.

**Handling of user information:** the app itself handles it well:
- Preferences and saved events stay in browser memory and are gone on refresh.
- The app makes no outside network requests (confirmed in testing).
- It uses no cookies, local storage or analytics.

**One exception: the server logs IP addresses.** By default, `serve` writes a line for every request, including the visitor's IP address, for example `HTTP 10/28/2026 12:55:25 PM 127.0.0.1 GET /`. On Railway those lines go into the deploy logs. Privacy law in many places treats an IP address as personal information, and the PRD says "No personal information collected." One setting turns this off.

**Code-level injection risk:** low. All event text is inserted as plain text, never as HTML, and the web address is only used to look up an event by its ID. Nothing exploitable was found.

## 2. Data

| Information | Kept today | Should it be permanent? |
|---|---|---|
| Event list | Static file `events.js` | Yes. A static file is the right choice for v1. |
| Interests and availability | Browser memory | No. Temporary is correct and stays out of personal-data territory. |
| Saved events | Browser memory, lost on refresh | Not for v1, by PRD decision. Expect test users to find this surprising (see B3). |

**Is a database needed?** No. One would be needed only for "Build later" items: real event data that organisers update, saves that follow a student across devices, or accounts. If it gets there, the shape would be:
- an **events** table (much like today's fields, plus a real date instead of a weekday)
- a **saves** table linking a student ID to an event ID.

**Privacy and retention:** the only data retained anywhere is the server's IP request log (see Security). Railway keeps logs for a limited period that depends on the plan. **Verify** the current retention in Railway's settings.

## 3. Reliability

**Failed API requests:** there are none to fail. The app makes no API calls, which is a real strength. Once the page loads, it works offline.

**Missing error and fallback experiences:**
- **Partial page load:** if `events.js` or `app.js` doesn't load (spotty campus Wi-Fi), the preferences screen appears but the chips are empty and nothing works. There's no "something went wrong, please reload" message.
- **Fewer than three results:** with "Friday, evening only," the app shows 2 events with no explanation. That's fine, but a short "Only 2 events fit your times" would make it clear it isn't broken.
- **Non-matching events look like matches.** This is the most important product-reliability issue. Choosing Music when no Music events fall on the chosen day still shows other events on that day under "Recommended for you." That was the approved design, but a tester could reasonably think matching is broken, which directly muddies the assumption being tested. A label like "Also on your free days," or showing which interest matched, would fix it.

**What still needs testing:**
- **Real phones (verify).** Tests ran in a phone-sized Chrome window on a computer, not on an iPhone or Android. The sticky bottom button, the iPhone "home bar" spacing, and the back-swipe gesture need checking on a real iPhone (Safari) and a real Android (Chrome).
- **Repeatable automated tests.** The test script used for this review lives in a temporary folder, not in the project, so nobody can re-run it after the next change.
- **The live Railway link.** Section 5's "loads from a public link on a fresh browser" box is still unchecked.

**Accessibility issues** (each needs a check with a screen reader, VoiceOver on iPhone: **verify**):
1. **Screen changes aren't announced.** Tapping "Find events" changes the screen visually, but screen-reader focus stays on a button that's now hidden. A blind user hears nothing and doesn't know new results appeared. This is the most significant accessibility issue.
2. **The focus outline is hard to see.** The yellow outline shown when moving through the page with a keyboard has low contrast against the off-white background (below the recommended 3:1).
3. **The Save button gets announced twice.** Both its label ("Saved ✓ (tap to unsave)") and its on/off state change, so a screen reader says something like "Saved, tap to unsave, toggle button, pressed."

What's already good:
- Every tap target is at least 44px.
- Chips tell screen readers whether they're on or off.
- Text contrast is good.
- The page zooms properly.
- The "pick at least one day" hint is read aloud.

## 4. Infrastructure

**Services and tools:** GitHub (code), Railway (hosting), and Node.js running `serve`. That's everything. There's no database, no API and no third-party scripts.

**What costs money:** only Railway. Its free trial credit runs out, and after that a paid plan is needed. Its entry plan has been about $5/month, but **verify current pricing** on Railway's site. When the trial ends, the app goes offline. That's a reliability risk if testers have the link. Everything else is free.

**Where to host it:** Railway works, and it's what CLAUDE.md specifies. Worth knowing: this app is pure static files, so a free static host (GitHub Pages, Cloudflare Pages, Netlify) could serve it with no server at all. That would remove the exposed-files, vulnerability and IP-log problems in one move, cost nothing, and load faster worldwide. Switching away from Railway is a product decision and isn't part of these recommendations.

**Performance as usage grows:** the app is about 45 KB and does all its work in the browser, so a single Railway instance can easily handle hundreds or thousands of students. Scaling won't be the problem. The limits that will show up first:
- 20 hard-coded events
- no way for organisers to add events without editing code and redeploying.

Both are "Build later" problems.

---

## 5. Recommendations

### A. Must fix before real users get the link
1. **Publish only the app's files.** Move `index.html`, `app.js`, `events.js` and `styles.css` into a `public/` folder and have the server serve only that folder. This closes the doc, `node_modules` and `.git` exposure, and protects against future mistakes.
2. **Patch the vulnerable dependency.** Tell npm to use the fixed version of `compression` instead of downgrading `serve`. Then re-run `npm audit` to confirm 0 vulnerabilities.
3. **Stop logging visitor IP addresses.** Add serve's `--no-request-logging` flag. One-word change; brings the app in line with the PRD's no-personal-data promise.
4. **Label the data as fictional.** Add a small "Prototype: all events are fictional" line. The events have realistic names, times and places, and the purple is close to Northwestern's. A student could show up at "Ridgeway Amphitheater" or take it for an official university app. This protects testers and the project.

### B. Important for the next version
1. **Announce screen changes to screen readers** by moving focus to each new screen's heading. This is the biggest accessibility gap.
2. **Explain non-matching results** ("Also on your free days," or a "Matches: Music" tag). This matters for getting a clean read on the assumption being tested.
3. **Prepare testers for saves that vanish on refresh.** One line in the test script or on screen ("Saved for this visit") avoids confusion that could be mistaken for a bug.
4. **Fix the focus outline contrast and the Save button announcement.**
5. **Add a fallback message** if the app's scripts fail to load.
6. **Keep the acceptance-test script in the repo** so every future change can be re-checked the same way.

### C. Can wait
- A "Showing 2 of 3" note when fewer than three events fit.
- Cache settings so repeat visits load faster.
- Moving to a free static host. Optional; it would supersede A1–A3.
- A database, accounts, real event data and saves across devices. These are all PRD "Build later" items; none are needed to test the assumption.

### Needs human review or testing
- [ ] Confirm the GitHub repo is **meant to be public**.
- [ ] After deploy, open `<link>/.git/HEAD` and `<link>/PRD.md` to see what's exposed. Re-check after A1.
- [ ] Walk the "Done means" path on a **real iPhone (Safari)** and a **real Android (Chrome)**.
- [ ] Try the app with **VoiceOver**: pick interests, find events, save one.
- [ ] Check **Railway's current pricing and trial end date**, so the link doesn't go dead mid-test.
- [ ] Check Railway's **log retention** setting.
- [ ] Make sure no made-up event or venue name accidentally matches a real one on campus.
