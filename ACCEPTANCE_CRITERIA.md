# Campus Events — Acceptance criteria

These are the clicks that prove each piece works. Walk them in order after every build.

## 1. Preferences screen
- [ ] I can select more than one interest.
- [ ] I can deselect an interest and it stays deselected.
- [ ] I can pick at least one day. I cannot continue with zero days selected.
- [ ] The screen is usable at phone width with no horizontal scroll.

## 2. Recommendations screen
- [ ] At most three events appear.
- [ ] Every event shown falls on a day I selected.
- [ ] Changing availability changes the results.
- [ ] Changing interests changes the order or set of results.
- [ ] Selecting a day with no events shows a message, not an empty screen.
- [ ] Each card shows name, date and time, location, description.

## 3. Event details screen
- [ ] Tapping a card opens its details.
- [ ] Save marks the event as saved.
- [ ] Going back and returning, the event is still marked saved.
- [ ] I can get back to preferences and change them.

## 4. Data and scope
- [ ] All event data is fictional and lives in one static file.
- [ ] No login, no payments, no external API calls.
- [ ] No personal information is collected or sent anywhere.

## 5. Deploy
- [ ] The app loads from a public link on a fresh browser.
- [ ] No API keys or secrets exist in the repo. (.gitignore includes .env.)
- [ ] README says how to run it locally in three lines.
