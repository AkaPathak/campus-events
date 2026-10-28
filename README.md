# Campus Events (v1 prototype)

Recommends up to three fictional campus events based on a student's interests and free days/times. No backend, no logins, no external APIs.

## Run locally

1. `npm install`
2. `npm start`
3. Open http://localhost:3000 (narrow the browser to ~390px or use device mode to preview on a phone size).

The app's files live in `public/`. Only that folder is served, so docs and other repo files are never published.

## Deploy (Railway)

Connect the repo to Railway. It runs `npm start`, which serves `public/` on Railway's `PORT` with request logging off (no visitor IPs in logs). No environment variables needed.
