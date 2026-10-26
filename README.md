# ThisMatters — a better you, every day

A polished, responsive **vanilla HTML + CSS + JavaScript** personal-growth dashboard inspired by the supplied minimalist editorial reference video. No React, bundler, npm dependencies, server-side JavaScript, or UI framework is required.

## Features

- **Daily quotes:** rotates automatically each local calendar day; users can request another perspective.
- **Skill studio:** 12 skills across Technology, Creativity, Communication, Life skills, and Wellbeing. Each contains a rotating sequence of small, concrete daily activities.
- **Real focus timer:** start/pause, shows elapsed time, pauses when the tab is hidden. **The Complete button remains disabled until the task’s minimum focus time is reached.** The next task unlocks only on a later calendar day after completion; incomplete tasks are carried forward even if several days pass. Multiple skills may be active.
- **Hobby corner:** choose from eight hobbies or add custom ones, log 10/20/30-minute sessions, view today/week totals.
- **Daily planner:** add activities by date, category, intensity, and time. Copy the previous day's schedule, or remove entries.
- **Schedule insights:** flags overlaps, days with >= 9h of non-rest activities, limited designated rest in a long stretch, extensive high-intensity work, and demanding activities after 9 PM. All scores are heuristic suggestions, not medical diagnoses.
- **Insights:** week-long time chart, skill milestones, completed tasks.
- **Firebase Authentication + Firestore:** Google sign-in and email/password; per-user documents with owner-only rules.
- **Interactive demo:** Works before configuration using localStorage. Data saved in demo remains local and does not automatically migrate to Firebase.
- **Light and dark mode**, responsive mobile navigation, accessible form controls, data export, profile settings.

## Run locally

1. Use any static web server from the project folder (ES modules will not reliably work through a `file://` URL):

   ```bash
   python -m http.server 5500
   ```

2. Visit `http://localhost:5500` in your browser. Without Firebase configuration, you'll see the seeded interactive demo with data stored in localStorage.

## Connect your Firebase project

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. In **Project settings → General → Your apps**, register a **Web app**. Copy the Web App configuration into `firebase-config.js` (replace all `YOUR_...` placeholders with actual values). Firebase's web config is public client configuration, not a service account private key.
3. In **Authentication → Sign-in method**, enable **Google** and/or **Email/Password**. In **Authentication → Settings → Authorized domains**, add your hosting domain (and localhost if needed).
4. In **Firestore Database**, create a database. Go to **Rules**, replace the contents with `firestore.rules`, and **Publish**. These rules restrict each signed-in user to their own `users/{uid}` document.
5. Serve the project again and sign in. The application creates a private `users/<your-auth-uid>` document and saves changes there.

**Important:** Firebase services, billing, project creation and security-rule publishing require your own Firebase project; they are not performed by copying this starter kit. You must use HTTP(S) when running the app. For production, review Firebase App Check, quotas, authentication settings, and time-keeping integrity.

## Storage model

One Firestore document per user:

```
users/{authUID} {
  version,
  profile: { name },
  activeSkills: [ { id, startedAt, tasks: [ { id, index, date, title, description, minMinutes, elapsedSeconds, completedAt } ] } ],
  hobbies: [ 'journaling', ... ],
  hobbyLogs: { journaling: { '2026-10-26': 15 } },
  schedule: { '2026-10-26': [ { id, title, start, end, type, intensity } ] },
  focusByDate: { '2026-10-26': 1200 }, // seconds
  settings: { theme, customHobbies },
  createdAt, updatedAt
}
```

### What this implementation is / isn't

This is a **functional frontend MVP**, not a tamper-proof fitness or habit-tracking backend. The timer counts while the webpage is visible and open. It uses client time, so device clocks and advanced manipulation cannot be independently verified. The app doesn't award multiple missed daily assignments on the next login; it holds the oldest unfinished task until completed. Daily rollover uses **the user's local calendar day**. Firestore uses simple whole-document writes, so editing the same account concurrently across multiple tabs/devices can result in last-write-wins data. For production scale, move tasks and logs into subcollections, use transactions/server timestamps, and validate unlocks server-side.

## Deploy

Host the folder with Firebase Hosting, Netlify, GitHub Pages or Vercel as a static site. There is no build command. Ensure the domain is authorized in Firebase Authentication.

## Design

Inspired by the supplied video’s understated cream/ink palette, large editorial typography, radial decorative shapes, considered spacing and single warm accent—adapted as a personal-growth product rather than copied directly.
