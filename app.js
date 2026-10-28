// Campus Events prototype: state, matching, rendering, navigation.
// Everything lives in memory; a refresh starts over (by design for v1).

const INTERESTS = ["Sports", "Music", "Entrepreneurship", "Social"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BLOCKS = ["Morning", "Afternoon", "Evening"];
const MAX_RESULTS = 3;

const state = {
  interests: new Set(),
  days: new Set(),
  blocks: new Set(BLOCKS), // all time blocks on by default
  savedIds: new Set(),
  currentEventId: null,
};

const $ = (id) => document.getElementById(id);

// ---------- Matching ----------

// "6:30 PM" -> minutes since midnight, for sorting.
function minutesOf(time) {
  const [, h, m, ampm] = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = Number(h) % 12;
  if (ampm.toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(m);
}

function chronoKey(event) {
  return DAYS.indexOf(event.day) * 24 * 60 + minutesOf(event.time);
}

function recommend() {
  return EVENTS
    // 1. Hard filter: only the student's days and time blocks.
    .filter((e) => state.days.has(e.day) && state.blocks.has(e.block))
    // 2. Score: how many of the event's tags the student picked.
    .map((e) => ({ event: e, score: e.tags.filter((t) => state.interests.has(t)).length }))
    // 3. Sort: best match first, earliest first on ties.
    .sort((a, b) => b.score - a.score || chronoKey(a.event) - chronoKey(b.event))
    // 4. Top three.
    .slice(0, MAX_RESULTS)
    .map((r) => r.event);
}

// ---------- Preferences screen ----------

function renderChips(containerId, options, selected) {
  const container = $(containerId);
  container.innerHTML = "";
  for (const option of options) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = option;
    btn.setAttribute("aria-pressed", String(selected.has(option)));
    btn.addEventListener("click", () => {
      if (selected.has(option)) selected.delete(option);
      else selected.add(option);
      btn.setAttribute("aria-pressed", String(selected.has(option)));
      updateFindButton();
    });
    container.appendChild(btn);
  }
}

function updateFindButton() {
  const btn = $("find-btn");
  const hint = $("find-hint");
  if (state.days.size === 0) {
    btn.disabled = true;
    hint.textContent = "Pick at least one day to continue.";
  } else if (state.blocks.size === 0) {
    btn.disabled = true;
    hint.textContent = "Pick at least one time of day to continue.";
  } else {
    btn.disabled = false;
    hint.textContent = "";
  }
}

function renderPrefs() {
  renderChips("interest-chips", INTERESTS, state.interests);
  renderChips("day-chips", DAYS, state.days);
  renderChips("block-chips", BLOCKS, state.blocks);
  updateFindButton();
}

// ---------- Recommendations screen ----------

function inOrder(list, set) {
  return list.filter((x) => set.has(x));
}

function renderResults() {
  const results = recommend();
  const list = $("results-list");
  list.innerHTML = "";

  const days = inOrder(DAYS, state.days).join(", ");
  const blocks = state.blocks.size === BLOCKS.length ? "any time" : inOrder(BLOCKS, state.blocks).join(", ").toLowerCase();
  const interests = state.interests.size ? ` · ${inOrder(INTERESTS, state.interests).join(", ")}` : "";
  $("results-summary").textContent = `${days} · ${blocks}${interests}`;

  $("results-empty").hidden = results.length > 0;
  list.hidden = results.length === 0;

  for (const event of results) {
    const li = document.createElement("li");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.innerHTML = `
      <span class="card-top">
        <span class="card-name"></span>
        ${state.savedIds.has(event.id) ? '<span class="badge">Saved</span>' : ""}
      </span>
      <span class="card-when"></span>
      <span class="card-where"></span>
      <span class="card-desc"></span>`;
    card.querySelector(".card-name").textContent = event.name;
    card.querySelector(".card-when").textContent = `${event.date} · ${event.time}`;
    card.querySelector(".card-where").textContent = event.location;
    card.querySelector(".card-desc").textContent = event.description;
    card.addEventListener("click", () => navigate("details", event.id));
    li.appendChild(card);
    list.appendChild(li);
  }
}

// ---------- Details screen ----------

function renderDetails() {
  const event = EVENTS.find((e) => e.id === state.currentEventId);
  if (!event) return navigate("results", null, true);

  const saved = state.savedIds.has(event.id);
  $("details-title").textContent = event.name;
  $("details-when").textContent = `${event.date} · ${event.time}`;
  $("details-where").textContent = event.location;
  $("details-description").textContent = event.description;
  $("details-badge").hidden = !saved;

  const tags = $("details-tags");
  tags.innerHTML = "";
  for (const tag of event.tags) {
    const li = document.createElement("li");
    li.textContent = tag;
    tags.appendChild(li);
  }

  const btn = $("save-btn");
  btn.textContent = saved ? "Saved ✓ (tap to unsave)" : "Save event";
  btn.setAttribute("aria-pressed", String(saved));
  btn.classList.toggle("is-saved", saved);
}

$("save-btn").addEventListener("click", () => {
  const id = state.currentEventId;
  if (state.savedIds.has(id)) state.savedIds.delete(id);
  else state.savedIds.add(id);
  renderDetails();
});

// ---------- Navigation ----------
// Screens are tied to the URL hash so the phone's back button/gesture
// moves between screens instead of leaving the page.

const SCREENS = { prefs: "screen-prefs", results: "screen-results", details: "screen-details" };

function currentScreen() {
  return location.hash.slice(1).split("/")[0];
}

function navigate(screen, eventId = null, replace = false) {
  const hash = screen === "details" ? `#details/${eventId}` : `#${screen}`;
  if (replace) history.replaceState(history.state, "", hash);
  else history.pushState({ prev: currentScreen() }, "", hash);
  show();
}

// In-app back buttons: step back in history when that's where we came from,
// so the browser's back button stays in sync.
function goBack(screen) {
  if (history.state && history.state.prev === screen) history.back();
  else navigate(screen);
}

function show() {
  let [screen, eventId] = location.hash.slice(1).split("/");
  // Can't show results without at least one day and time block.
  if ((screen === "results" || screen === "details") && (state.days.size === 0 || state.blocks.size === 0)) {
    screen = "prefs";
    history.replaceState(null, "", "#prefs");
    eventId = null;
  }
  if (!SCREENS[screen]) screen = "prefs";
  if (screen === "details") state.currentEventId = eventId;

  for (const [name, id] of Object.entries(SCREENS)) $(id).hidden = name !== screen;

  if (screen === "prefs") renderPrefs();
  if (screen === "results") renderResults();
  if (screen === "details") renderDetails();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-nav]").forEach((btn) =>
  btn.addEventListener("click", () => goBack(btn.dataset.nav))
);
$("find-btn").addEventListener("click", () => navigate("results"));
window.addEventListener("popstate", show);

// Always start fresh on the preferences screen.
history.replaceState(null, "", "#prefs");
show();
