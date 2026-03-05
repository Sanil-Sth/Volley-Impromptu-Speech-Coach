# 🎙 Volley — Precision Under Pressure.

>Impromptu speech coaching for the moments you can't script.

![Volley](https://img.shields.io/badge/status-live-brightgreen) ![HTML](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJS-C8F135) ![License](https://img.shields.io/badge/license-MIT-white)

---

## What is Volley?

Volley is a browser-based speech coaching tool that trains you to think and speak on your feet. No login. No setup. Just spin a topic, start the timer, and speak without a script.

It's built for anyone who wants to get better at interviews, presentations, debates, or just thinking clearly under pressure.

---

## How It Works

| Step | What happens |
|------|-------------|
| **01 — Spin** | Get a random topic from 6 categories across 3 difficulty tiers |
| **02 — Think** | 30 seconds to structure your thoughts. No notes. No script. |
| **03 — Speak** | Talk for 1–2 minutes under a live countdown timer |
| **04 — Rate** | Score your own performance and get a targeted coach's tip |

---

## Features

- 🎲 **Topic engine** — Hundreds of original topics across Career, Mindset, Society, Tech, Debate, and Storytelling
- ⏱ **Pressure timer** — Live countdown with visual danger state when time runs low
- 🔥 **Streak tracking** — Daily practice habit with streak counter persisted in localStorage
- 📊 **Session history** — Every session logged with topic, category, difficulty, duration, and self-rating
- 🧠 **Coach's tips** — Category-specific coaching advice after every session
- 🎵 **Sound design** — Subtle audio cues on spin, tick, and timer end
- ⚡ **Zero dependencies** — Pure HTML, CSS, and JavaScript. No frameworks, no build step.

---

## Pages

```
index.html      → Landing page + session history section
spin.html       → Topic spinner with category and difficulty filters
timer.html      → Countdown timer + post-session rating flow
history.html    → Full session history with stats and category filter
```

---

## Project Structure

```
volley/
├── index.html
├── spin.html
├── timer.html
├── history.html
├── assets/
│   ├── logo.png
│   └── icons/
├── css/
│   ├── tokens.css       ← Design tokens (colors, spacing, type)
│   ├── global.css       ← Shared layout: navbar, buttons, toast
│   ├── landing.css      ← Landing page + history section styles
│   ├── spin.css         ← Topic spinner styles
│   ├── timer.css        ← Timer page styles
│   └── history.css      ← Standalone history page styles
└── js/
    ├── topics.js        ← Topic pool, localStorage, streak, history
    ├── navbar.js        ← Shared navbar logic
    ├── landing.js       ← Demo rotator, scroll reveals, history render
    ├── spin.js          ← Reel animation, filter logic
    ├── timer.js         ← Countdown, rating flow, coach's tip
    └── history.js       ← Standalone history page logic
```

---

## Getting Started

No installation required. Just open the files in a browser:

```bash
git clone https://github.com/Sanil-Sth/Volley.git
cd Volley
# Open index.html in your browser
```

Or if you have VS Code, install the **Live Server** extension and click **Go Live** — it'll open automatically.

---

## Design System

Volley uses a custom design token system defined in `tokens.css`:

- **Accent color:** `#C8F135` (lime)
- **Background:** `#111111` (obsidian)
- **Type:** Barlow Condensed (display) + DM Sans (body) + DM Serif Display (topics)
- **Motion:** Custom easing curves with `cubic-bezier` springs

---

## Roadmap

- [ ] AI-generated coach feedback via API
- [ ] Record and playback sessions
- [ ] Shareable session cards
- [ ] Mobile app (PWA)
- [ ] Multiplayer / challenge a friend mode

---

## License

MIT — do whatever you want with it.

---

<p align="center">Built with 🎙 and <strong>precision under pressure.</strong></p>
